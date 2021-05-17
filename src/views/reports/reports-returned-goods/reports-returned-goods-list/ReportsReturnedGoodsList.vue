<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-returned-goods-list-search
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách khách hàng
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="onClickPrintExportButton"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
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
          :rows="reportReturnedgoodLists"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
        >
          >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
              />
            </div>

            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                v-b-popover.hover="'Chỉnh sửa'"
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
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
              {{ totalQuantity || '' }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'amount'"
              class="mx-0"
              align-h="end"
            >
              {{ totalRefunds || '' }}
            </b-row>
          </template>
          <!-- END - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
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
                  Hiển thị 1 đến
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
                > trong {{ reportReturnedgoodsPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="reportReturnedgoodsPagination.totalElements"
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
    <!-- END - Customer list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatDateToLocale, formatNumberToLocale, reverseVniDate } from '@core/utils/filter'
import {
  getReportReasonTypeslabel,
} from '@core/utils/utils'

import ReportsReturnedGoodsListSearch from './components/ReportsReturnedGoodsListSearch.vue'
import {
  REPORT_RETURNED_GOODS,

  // Getters
  REPORT_RETURNED_GOODS_GETTER,

  // Actions
  GET_REPORT_RETURNED_GOODS_ACTION,
  EXPORT_REPORT_RETURNED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsReturnedGoodsListSearch,
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationData: {},

      paginationOptions: commonData.pagination,
      searchOptions: {
        code: '',
        fromDate: null,
        toDate: null,
        reasonSelected: null,
        ids: '',
      },

      columns: [
        {
          label: 'Mã trả hàng',
          field: 'returnCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Hóa đơn mua hàng',
          field: 'reciept',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'fullName',
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
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },

        {
          label: 'ĐVT',
          field: 'unit',
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
          label: 'Giá bán',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tiền trả lại',
          field: 'refunds',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Ngày trả',
          field: 'payDay',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Lý do trả',
          field: 'reasonForPayment',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thông tin phản hồi',
          field: 'feedback',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },

      ],
    }
  },
  computed: {
    reportReturnedgoodLists() {
      return this.REPORT_RETURNED_GOODS_GETTER().reportReturnedgoodLists.map(data => ({
        returnCode: data.returnCode,
        reciept: data.reciept,
        customerCode: data.customerCode,
        fullName: data.fullName,
        industry: data.industry,
        productCode: data.productCode,
        productName: data.productName,
        unit: data.unit,
        quantity: data.quantity,
        price: formatNumberToLocale(Number(data.price)),
        amount: formatNumberToLocale(Number(data.amount)),
        refunds: formatNumberToLocale(Number(data.refunds)),
        payDay: formatDateToLocale(data.payDay),
        reasonForPayment: getReportReasonTypeslabel(String(data.reasonForPayment)),
        feedback: data.feedback,
      }))
    },
    totalQuantity() {
      return formatNumberToLocale(Number(this.REPORT_RETURNED_GOODS_GETTER().reportReturnedgoodsTotalInfo.totalQuantity))
    },
    totalRefunds() {
      return formatNumberToLocale(Number(this.REPORT_RETURNED_GOODS_GETTER().reportReturnedgoodsTotalInfo.totalRefunds))
    },

    reportReturnedgoodsPagination() {
      return this.REPORT_RETURNED_GOODS_GETTER().reportReturnedgoodsPagination
    },
  },
  watch: {
    pageNumber() {
      this.onPaginationChange()
    },
    elementSize() {
      this.onPaginationChange()
    },
  },

  mounted() {
    this.searchOptions.fromDate = reverseVniDate(this.$earlyMonth)
    this.searchOptions.toDate = reverseVniDate(this.$nowDate)

    this.GET_REPORT_RETURNED_GOODS_ACTION({
      ...this.searchOptions,
      formId: 5,
      ctrlId: 7,
    })
  },
  methods: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      REPORT_RETURNED_GOODS_GETTER,
    ]),
    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_REPORT_RETURNED_GOODS_ACTION,
      EXPORT_REPORT_RETURNED_GOODS_ACTION,
    ]),

    onClickExcelExportButton() {
      this.EXPORT_REPORT_RETURNED_GOODS_ACTION({ formId: 5, ctrlId: 7 })
    },

    onClickSearchButton(searchValue) {
      const {
        reciept, fromDate, toDate, reason, ids,
      } = searchValue

      this.searchOptions.code = reciept
      this.searchOptions.toDate = reverseVniDate(toDate)
      this.searchOptions.fromDate = reverseVniDate(fromDate)
      this.searchOptions.reasonSelected = reason
      this.searchOptions.ids = ids

      this.GET_REPORT_RETURNED_GOODS_ACTION({
        reciept,
        fromDate: reverseVniDate(fromDate),
        toDate: reverseVniDate(toDate),
        reason,
        productCodes: ids,
      })
    },

    onPaginationChange() {
      this.GET_REPORT_RETURNED_GOODS_ACTION({
        ...this.searchOptions,
        size: this.elementSize,
        page: this.pageNumber - 1,
        formId: 1,
        ctrlId: 7,
      })
    },
  },
}
</script>
