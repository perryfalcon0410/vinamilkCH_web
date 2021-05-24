<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-warehouses-promotion-list-search
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - Search -->

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách hàng khuyến mãi
        </label>
        <b-button-group>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            In
          </b-button>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
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
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="getPromotionLists"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          line-numbers
        >
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalAmount }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'payment'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPayment }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <!-- <template
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
                  {{ (elementSize * pageNumber) > promotionPagination.totalElements ?
                    promotionPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ promotionPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="promotionPagination.totalElements"
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
          </template> -->
          <!-- END - Pagination -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
  </b-container>
</template>
<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import reportData from '@/@db/report'
import {
  formatDateToLocale,
  formatNumberToLocale,
  reverseVniDate,
} from '@core/utils/filter'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import ReportsWarehousesPromotionListSearch from './components/ReportsWarehousesPromotionListSearch.vue'
import {
  REPORT_WAREHOUSES_PROMOTIONS,
  REPORT_WAREHOUSES_PROMOTIONS_GETTER,
  GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesPromotionListSearch,
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,

      paginationOptions: commonData.pagination,
      panigationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        onlineNumber: '',
        fromDate: null,
        toDate: null,
        productCodes: '',
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      promotionRows: [],

      columns: [
        {
          label: 'Ngày bán',
          field: 'orderDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'payment',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'dvt',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã CTKM',
          field: 'promotionCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số đơn online',
          field: 'onlineCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Kênh Bán',
          field: 'channel',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },

      ],
    }
  },

  computed: {
    getPromotionLists() {
      return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER().promotionLists.map(data => ({
        orderNumber: data.orderNumber,
        industry: data.industry,
        productCode: data.productCode,
        productName: data.productName,
        dvt: data.uom,
        quantity: data.quantity,
        price: formatNumberToLocale(data.price),
        payment: formatNumberToLocale(data.payment),
        orderDate: formatDateToLocale(data.orderDate),
        billType: data.billType,
        promotionCode: data.promotionCode,
      }))
    },
    totalAmount() {
      return reportData.totalInfo.totalAmount
    },
    totalPayment() {
      return reportData.totalInfo.totalPayment
    },
    // promotionPagination() {
    //   return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER().promotionPagination
    // },
    promotionPagination() {
      if (this.REPORT_WAREHOUSES_PROMOTIONS_GETTER().promotionPagination) {
        return this.REPORT_WAREHOUSES_PROMOTIONS_GETTER().promotionPagination
      }
      return {}
    },

  },
  watch: {
    getPromotionLists() {
      this.promotionRows = [...this.getPromotionLists]
    },
  },
  mounted() {
    resizeAbleTable()
    this.searchOptions.fromDate = reverseVniDate(this.$earlyMonth)
    this.searchOptions.toDate = reverseVniDate(this.$nowDate)
    this.GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS({
      ...this.searchOptions,
      ...this.decentralization,
    })
  },

  methods: {
    ...mapGetters(REPORT_WAREHOUSES_PROMOTIONS, [
      REPORT_WAREHOUSES_PROMOTIONS_GETTER,
    ]),
    ...mapActions(REPORT_WAREHOUSES_PROMOTIONS, [
      GET_REPORT_WAREHOUSES_PROMOTIONS_ACTIONS,
    ]),
  },
}
</script>
