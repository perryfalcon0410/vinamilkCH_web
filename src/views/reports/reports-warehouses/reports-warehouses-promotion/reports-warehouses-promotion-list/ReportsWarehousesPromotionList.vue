<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-warehouses-promotion-list-search
      class="d-print-none"
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - Search -->

    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách hàng khuyến mãi
        </strong>
        <b-button-group>
          <b-button
            v-show="$componentPermission(statusPrintButton(), 0)"
            :disabled="$componentPermission(statusPrintButton()) || promotionRows.length === 0"
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickPrintButton"
          >
            <b-icon-printer-fill class="mr-50" />
            In
          </b-button>
          <b-button
            v-show="$componentPermission(statusExcelButton(), 0)"
            :disabled="$componentPermission(statusExcelButton()) || promotionRows.length === 0"
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-50" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="promotionRows"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="promotionPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
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
          <!-- START - Table rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field ==='productName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Table row -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ totalInfo.totalQuantity }}
            </b-row>

          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="promotionPagination.totalElements"
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
                  v-model="paginationData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="promotionPagination.totalElements"
                :per-page="paginationData.size"
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
    </div>
    <print-form-report-promotion />
  </b-container>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import {
  required,
} from '@/@core/utils/validations/validations'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import PrintFormReportPromotion from '@core/components/print-form/PrintFormPromotionProducts.vue'
import ReportsWarehousesPromotionListSearch from './components/ReportsWarehousesPromotionListSearch.vue'
import {
  REPORT_WAREHOUSES_PROMOTIONS,

  REPORT_WAREHOUSES_PROMOTIONS_GETTER,

  GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
  EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION,
  PRINT_REPORT_PROMOTION_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesPromotionListSearch,
    PrintFormReportPromotion,
  },
  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      searchOptions: {
      },
      promotionDatas: [],
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      required,
      promotionRows: [],
      promotionPagination: {},
      totalInfo: {},

      columns: [
        {
          label: 'Ngày bán',
          field: 'orderDate',
          sortable: false,
          formatFn: value => this.$formatISOtoVNI(value, true),
          thClass: 'text-nowrap',
        },
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'ĐVT',
          field: 'dvt',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã CTKM',
          field: 'promotionCode',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Số đơn online',
          field: 'onlineNumber',
          sortable: false,
          thClass: 'text-nowrap',
        },
        {
          label: 'Kênh Bán',
          field: 'orderType',
          sortable: false,
          thClass: 'text-nowrap',
        },

      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_PROMOTIONS, [
      REPORT_WAREHOUSES_PROMOTIONS_GETTER,
    ]),
    getPromotionLists() {
      if (this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.response && this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.response.content) {
        return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.response.content.map(data => ({
          orderNumber: data.orderNumber,
          industry: data.productCatName,
          productCode: data.productCode,
          productName: data.productName,
          dvt: data.uom,
          quantity: data.quantity,
          orderDate: data.orderDate,
          billType: data.billType,
          promotionCode: data.promotionCode,
          onlineNumber: data.onlineNumber,
          orderType: data.orderType,
        }))
      }
      return []
    },
    getTotalInfo() {
      if (this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.info) {
        return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.info
      }
      return {}
    },
    getPromotionPagination() {
      if (this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.response) {
        return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.promotionPagination.totalElements
        ? this.promotionPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.promotionPagination.totalElements} mục`
    },

  },
  watch: {
    getPromotionLists() {
      this.promotionRows = [...this.getPromotionLists]
    },
    getTotalInfo() {
      this.totalInfo = { ...this.getTotalInfo }
    },
    getPromotionPagination() {
      this.promotionPagination = { ...this.getPromotionPagination }
    },
  },
  mounted() {
    resizeAbleTable()
    this.statusExcelButton()
    this.statusPrintButton()
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_PROMOTIONS, [
      GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
      EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION,
      PRINT_REPORT_PROMOTION_ACTION,
    ]),

    // START - permission
    statusExcelButton() {
      return this.$permission('ReportsWarehousesPromotions', 'ReportsWarehousesPromotionsExcel').showStatus
    },
    statusPrintButton() {
      return this.$permission('ReportsWarehousesPromotions', 'ReportsWarehousesPromotionsPrint').showStatus
    },

    // END - permission
    onClickPrintButton() {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_REPORT_PROMOTION_ACTION({
        ...this.searchOptions,
        ...this.decentralization,
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    // Start - xuat excel
    onClickExcelExportButton() {
      this.EXPORT_REPORT_WAREHOUSES_PROMOTIONS_ACTION({ ...this.decentralization, ...this.searchOptions })
    },
    // End - xuat excel

    // Start - pagination
    updateSearchData(event) {
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
      this.searchOptions = event
    },
    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS({ ...this.paginationData, ...this.decentralization })
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
    onClickSearchButton() {
      this.pageNumber = 1
    },
  // End - pagination
  },
}
</script>
