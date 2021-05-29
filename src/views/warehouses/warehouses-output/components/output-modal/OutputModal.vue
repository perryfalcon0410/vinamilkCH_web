<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu nhập hàng"
    title-class="text-uppercase font-weight-bold text-brand-1"
    footer-border-variant="light"
    hide-footer
    @hidden="onModalHidden"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <search-component
        @updateSearchData="paginationData = {
          ...paginationData,
          ...$event }"
      />
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-brand-1">
            <strong>
              Danh sách phiếu nhập hàng
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="poTrans"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true,
              perPage: elementSize,
              setCurrentPage: pageNumber,
            }"
            compact-mode
            line-numbers
            :total-rows="outputPagination.totalElements"
            :sort-options="{
              enabled: false,
              multipleColumns: true,
              initialSortBy: [{field: 'transCode', type: 'desc'}]
            }"
            @on-sort-change="onSortChange"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange"
          >
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
            <!-- START - Column  -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-bricks />
              </div>
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>
            <!-- END - Column -->

            <!-- START - Row -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-search
                  class="cursor-pointer"
                  scale="1.3"
                  @click="() => onPoItemSelected(props.row.id)"
                />
                <b-button
                  variant="someThing"
                  class="btn-brand-1 ml-1"
                  @click="() => choonsenTrans(props.row)"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Row -->

            <!-- START - Pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                v-show="outputPagination.totalElements"
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
                    {{ (elementSize * pageNumber) > outputPagination.totalElements ?
                      outputPagination.totalElements : (elementSize * pageNumber) }}
                    của {{ outputPagination.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="outputPagination.totalElements"
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
      <!-- END - Coupon list -->

      <!-- START - Product list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-brand-1">
            <strong>
              Danh sách sản phẩm
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table Products -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columnsProducts"
            :rows="productDetail"
            style-class="vgt-table bordered"
            compact-mode
            line-numbers
          >
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
            <!-- START - Column  -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-bricks />
              </div>
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>
            <!-- END - Column -->
          </vue-good-table>
        </b-col>
      <!-- END - Table Products-->

      </b-form>
      <!-- END - Product list -->
    </b-container>
  </b-modal>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatISOtoVNI } from '@core/utils/filter'
import SearchComponent from './components/SearchComponent.vue'
import {
  WAREHOUSES_OUTPUT,
  // Getters
  GET_EXPORT_PO_TRANS_GETTER,
  GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  // Actions
  GET_EXPORT_PO_TRANS_DETAIL_ACTION,
  GET_EXPORT_PO_TRANS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    SearchComponent,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
        reasonId: this.reasonSelected,
      },

      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      productDetail: [],
      columns: [
        {
          label: 'Ngày nhập',
          field: 'createdAt',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'transDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'PO No',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],

      columnsProducts: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'export',
          sortable: false,
        },
        {
          label: 'Còn lại/Tổng nhập',
          field: 'quantity',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_GETTER,
      GET_EXPORT_PO_TRANS_DETAIL_GETTER,
    ]),
    poTrans() {
      if (this.GET_EXPORT_PO_TRANS_GETTER.content) {
        return this.GET_EXPORT_PO_TRANS_GETTER.content.map(data => ({
          id: data.id,
          productCode: formatISOtoVNI(data.formatISOtoVNI),
          transDate: formatISOtoVNI(data.transDate),
          transCode: data.transCode,
          redInvoiceNo: data.redInvoiceNo,
          internalNumber: data.internalNumber,
          poNumber: data.poNumber,
          billDate: data.transDate,
        }))
      }
      return []
    },

    getExportPoTransDetail() {
      if (this.GET_EXPORT_PO_TRANS_DETAIL_GETTER.info) {
        return this.GET_EXPORT_PO_TRANS_DETAIL_GETTER.info.map(data => ({
          id: data.id,
          productCode: data.productCode,
          productName: data.productName,
          price: data.price,
          unit: data.unit,
          totalPrice: data.totalPrice,
          export: `${data.export}/${data.quantity}`,
          quantity: `${data.quantity - data.export}/${data.quantity}`,
        }))
      }
      return []
    },

    outputPagination() {
      if (this.GET_EXPORT_PO_TRANS_GETTER) {
        return this.GET_EXPORT_PO_TRANS_GETTER
      }
      return {}
    },
  },
  watch: {
    getExportPoTransDetail() {
      this.productDetail = [...this.getExportPoTransDetail]
    },
  },
  mounted() {
    this.GET_EXPORT_PO_TRANS_ACTION()
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_ACTION,
      GET_EXPORT_PO_TRANS_DETAIL_ACTION,
    ]),
    onSearch(search) {
      this.GET_EXPORT_PO_TRANS_ACTION(search)
    },
    onPoItemSelected(id) {
      this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(id)
    },
    onModalHidden() {
      this.$emit('onModalHidden')
    },
    choonsenTrans(trans) {
      this.onPoItemSelected(trans.id)
      this.$emit('choonsenTrans', [trans, this.productDetail])
      this.$emit('onModalHidden')
    },
    onPaginationChange() {
      this.GET_EXPORT_PO_TRANS_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
  },
}
</script>
