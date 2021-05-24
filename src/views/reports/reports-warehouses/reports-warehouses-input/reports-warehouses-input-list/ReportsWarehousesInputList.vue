<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-warehouses-input-list-search
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <b-form class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách phiếu nhập hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded btn-brand-1"
            variant="someThing"
          >
            <b-icon-printer-fill class="mr-05" />
            In
          </b-button>
          <b-button
            class="ml-1 rounded btn-brand-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehousesInputs"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesInputPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'transDate', type: 'desc'}]
          }"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesInputPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalQuantity }}
            </b-row>

            <b-row
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'packetQuantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPacketQuantity }}
            </b-row>
            <b-row
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'oddQuantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalOddQuantity }}
            </b-row>
            <b-row
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'amount'"
              class="mx-0"
              align-h="end"
            >
              {{ amount }}
            </b-row>
            <b-row
              v-show="warehousesInputPagination.totalElements"
              v-else-if="props.column.field === 'total'"
              class="mx-0"
              align-h="end"
            >
              {{ total }}
            </b-row>
          </template>
          <!-- START - Column filter -->
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesInputPagination.totalElements"
              class="v-pagination px-1 mx-0"
              align-h="between"
              align-v="center"
            >
              <div
                class="d-flex align-items-center"
              >
                <span
                  class="text-nowrap"
                >
                  Số hàng hiển thị
                </span>
                <b-form-select
                  v-model="elementSize"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                >{{ pageNumber === 1 ? 1 : (pageNumber * elementSize) - elementSize +1 }}
                  -
                  {{ (elementSize * pageNumber) > warehousesInputPagination.totalElements ?
                    warehousesInputPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ warehousesInputPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehousesInputPagination.totalElements"
                :per-page="elementSize"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1"
                @input="(value)=>props.pageChanged({currentPage: value})"
              >
                <template slot="prev-text">
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template slot="next-text">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </b-row>
          </template>
          <!-- END - Pagination -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Report Output list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  formatISOtoVNI, formatNumberToLocale, reverseVniDate, replaceDotWithComma, formatVniDateToGlobal,
} from '@core/utils/filter'
import ReportsWarehousesInputListSearch from './components/ReportsWarehousesInputListSearch.vue'
import {
  REPORT_WAREHOUSES_INPUT,
  // GETTERS
  REPORT_WAREHOUSES_INPUT_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
  EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesInputListSearch,
  },

  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        productCodes: null,
        internalNumber: null,
        importType: null,
        fromOrderDate: null,
        fromTransDate: null,
        toOrderDate: null,
        toTransDate: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Ngày nhập',
          field: 'transDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Loại nhập',
          field: 'inputType',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'orderDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng lẻ',
          field: 'oddQuantity',
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá trước thuế',
          field: 'priceNotVat',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá sau thuế',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tổng cộng',
          field: 'total',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Quy cách',
          field: 'convfact',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Cửa hàng',
          field: 'shopName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'shopType',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số đơn trả PO',
          field: 'returnCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      warehousesInputs: [],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT, [
      REPORT_WAREHOUSES_INPUT_GETTER,
    ]),
    getWarehousesInputs() {
      if (this.REPORT_WAREHOUSES_INPUT_GETTER.content) {
        return this.REPORT_WAREHOUSES_INPUT_GETTER.content.map(data => ({
          transDate: formatISOtoVNI(data.transDate),
          inputType: data.importType,
          redInvoiceNo: data.redInvoiceNo,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          orderDate: formatISOtoVNI(data.orderDate),
          industry: data.productGroup,
          productCode: data.productCode,
          productName: data.productName,
          quantity: data.quantity,
          packetQuantity: data.wholesale,
          oddQuantity: data.retail,
          priceNotVat: data.priceNotVat,
          amount: data.amount,
          price: data.price,
          total: data.total,
          convfact: data.convfact,
          transCode: data.transCode,
          shopName: data.shopName,
          typeShop: data.typeShop,
          productGroup: data.productGroup,
          note: data.note,
          returnCode: data.returnCode,
        }))
      }
      return []
    },
    totalQuantity() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.warehousesInputs.reduce((accum, item) => accum + Number(item.quantity), 0))))
    },
    totalPacketQuantity() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.warehousesInputs.reduce((accum, item) => accum + Number(item.packetQuantity), 0))))
    },
    totalOddQuantity() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.warehousesInputs.reduce((accum, item) => accum + Number(item.oddQuantity), 0))))
    },
    amount() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.warehousesInputs.reduce((accum, item) => accum + Number(item.amount), 0))))
    },
    total() {
      return replaceDotWithComma(formatNumberToLocale(Number(this.warehousesInputs.reduce((accum, item) => accum + Number(item.total), 0))))
    },
    warehousesInputPagination() {
      if (this.REPORT_WAREHOUSES_INPUT_GETTER) {
        return this.REPORT_WAREHOUSES_INPUT_GETTER
      }
      return {}
    },
  },

  watch: {
    getWarehousesInputs() {
      this.warehousesInputs = [...this.getWarehousesInputs]
    },
  },

  mounted() {
    this.GET_REPORT_WAREHOUSES_INPUT_ACTION({
      productCodes: this.productCodes?.trim(),
      fromDate: reverseVniDate(this.fromDate),
      toDate: reverseVniDate(this.toDate),
      fromOrderDate: reverseVniDate(this.fromOrderDate),
      toOrderDate: reverseVniDate(this.toOrderDate),
      importType: this.inputTypesSelected,
      internalNumber: this.licenseNumber?.trim(),
      formId: 1,
      ctrlId: 1,
    })
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT, [
      GET_REPORT_WAREHOUSES_INPUT_ACTION,
      EXPORT_REPORT_WAREHOUSES_INPUT_ACTION,
    ]),

    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_INPUT_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onClickExcelExportButton() {
      console.log(this.paginationData)
      console.log(this.paginationData.fromTransDate)
      this.EXPORT_REPORT_WAREHOUSES_INPUT_ACTION({
        productCodes: this.paginationData.productCodes,
        internalNumber: this.paginationData.internalNumber,
        importType: this.paginationData.importType,
        fromOrderDate: formatVniDateToGlobal(reverseVniDate(this.paginationData.fromOrderDate)),
        fromDate: formatVniDateToGlobal(reverseVniDate(this.paginationData.fromDate)),
        toOrderDate: formatVniDateToGlobal(reverseVniDate(this.paginationData.toOrderDate)),
        toDate: formatVniDateToGlobal(reverseVniDate(this.paginationData.toDate)),
      })
    },
  },
}
</script>
