<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <list-search
      @updateSearchData="updateSearchData"
      @onClickSearchButton="onClickSearchButton($event)"
    />
    <!-- END - Search -->

    <!-- START - List -->
    <div class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách biên bản đổi hàng hỏng
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
            size="sm"
            @click="exportExcel"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          :total-rows="reportExchangePagnigation.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          compact-mode
          line-numbers
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
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
              {{ $formatNumberToLocale(total[7]) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'amount'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(total[8]) }}
            </b-row>
          </template>
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="reportExchangePagnigation.totalElements"
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
                >
                  {{ paginationDetailContent }}
                </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="reportExchangePagnigation.totalElements"
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
          <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
    <!-- END - Table -->
    </div>
    <!-- END - List -->

  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatISOtoVNI } from '@/@core/utils/filter'
import ListSearch from './components/ListSearch.vue'
import {
  REPORT_EXCHANGE_DAMAGED_GOODS,
  // GETTERS
  REPORT_EXCHANGE_DAMAGED_GOODS_GETTER,
  // ACTIONS
  EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      pageNumber: 1,
      elementSize: commonData.perPageSizes[0],
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      formId: 1,
      ctrlId: 1,
      searchData: {},
      columns: [
        {
          label: 'Ngày biên bản',
          field: 'transDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số biên bản',
          field: 'transNumber',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
          field: 'customerName',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩn',
          field: 'productCode',
          type: 'number',
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
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Lý do',
          field: 'reason',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Điện thoại',
          field: 'phoneNumber',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rows: [],
    }
  },
  computed: {
    ...mapGetters(REPORT_EXCHANGE_DAMAGED_GOODS, [
      REPORT_EXCHANGE_DAMAGED_GOODS_GETTER,
    ]),
    reportInventory() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response.content.map(data => ({
          transDate: formatISOtoVNI(data[0]),
          transNumber: data[1],
          customerCode: data[2],
          customerName: data[3],
          address: data[4],
          productCode: data[5],
          productName: data[6],
          quantity: this.$formatNumberToLocale(data[7]),
          amount: this.$formatNumberToLocale(data[8]),
          reason: data[9],
          phoneNumber: data[10],
        }))
      }
      return {}
    },
    total() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.totals) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.totals
      }
      return []
    },
    reportExchangePagnigation() {
      if (this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.REPORT_EXCHANGE_DAMAGED_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.reportExchangePagnigation.totalElements
        ? this.reportExchangePagnigation.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.reportExchangePagnigation.totalElements} mục`
    },
  },
  watch: {
    reportInventory() {
      this.rows = [...this.reportInventory]
    },
  },
  methods: {
    exportExcel() {
      console.log(this.total[7])
      this.EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION(this.searchData)
    },
    ...mapActions(REPORT_EXCHANGE_DAMAGED_GOODS, [
      EXPORT_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),
    // pagnigation funcs
    updateSearchData(event) {
      this.paginationData = {
        ...this.paginationData,
        ...event,
      }
      this.searchData = { ...event }
    },
    onPaginationChange() {
      this.GET_REPORT_WAREHOUSES_INVENTORY_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onClickSearchButton() {
      this.pageNumber = 1
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    // pagnigation funcs
  },
}
</script>
