<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn hóa đơn cần trả"
    title-class="font-weight-bolder text-brand-1"
    content-class="bg-light"
    footer-class="justify-content-center"
    footer-border-variant="light"
    @hidden="onCloseModal"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <search-component @onSearchClick="onSearchClick" />
      <!-- END - Search -->

      <!-- START - Product list -->
      <!-- START - Coupon list -->
      <div class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-brand-1">
            <strong>
              Danh sách hóa đơn
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="saleOders"
            style-class="vgt-table"
            max-height="600px"
            :pagination-options="{
              enabled: false,
              perPage: elementSize,
              setCurrentPage: pageNumber,
            }"
            compact-mode
            line-numbers
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
              v-if="totalAmount"
              slot="table-row"
              slot-scope="props"
            >
              <div
                v-if="props.column.field === 'manipulation'"
              >
                <b-button
                  size="sm"
                  class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
                  variant="someThing"
                  @click="choosenRecept(props.row)"
                >
                  <b-icon-hand-index-thumb class="mr-50" />
                  Chọn đơn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Row -->
            <!-- START - Column filter -->
            <template
              slot="column-filter"
              slot-scope="props"
            >
              <b-row
                v-if="props.column.field === 'total'"
                class="mx-0 h7 text-brand-3 text-right"
                align-h="end"
              >
                {{ $formatNumberToLocale(totalAmount) }}
              </b-row>
            </template>
            <!-- START - Column filter -->
          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </div>
      <!-- END - Coupon list -->
    </b-container>

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="secondary"
        class="d-flex align-items-center text-uppercase h8"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->
  </b-modal>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import commonData from '@/@db/common'
import SearchComponent from './SelectReceptSearch.vue'
import { RETURNEDGOODS, RETURNED_GOOD_CHOOSE_GETTER, GET_RETURNED_GOOD_CHOOSE_ACTION } from '../../store-module/type'

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
    // eslint-disable-next-line vue/require-default-prop
    selectSuccess: Function,
  },
  data() {
    return {
      isModalShow: false,
      selectedRow: 0,
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },

      saleOders: [],

      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày bán',
          field: 'orderDate',
          formatFn: value => this.$formatISOtoVNI(value),
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Nhân viên',
          field: 'salesManName',
          sortable: false,
        },
        {
          label: 'Khách hàng',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'total',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '',
          field: 'manipulation',
          sortable: false,
          width: '150px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOOD_CHOOSE_GETTER,
    ]),
    getSaleOders() {
      if (this.RETURNED_GOOD_CHOOSE_GETTER.response) {
        return this.RETURNED_GOOD_CHOOSE_GETTER.response.map(data => ({
          id: data.id,
          orderDate: data.orderDate,
          orderNumber: data.orderNumber,
          customerName: data.customerName,
          total: data.total,
          salesManName: data.salesManName,
          oderDate: data.orderDate,
        }))
      }
      return []
    },
    totalAmount() {
      if (this.RETURNED_GOOD_CHOOSE_GETTER.info && this.RETURNED_GOOD_CHOOSE_GETTER.info.allTotal) {
        return this.RETURNED_GOOD_CHOOSE_GETTER.info.allTotal
      }
      return ''
    },
  },
  watch: {
    getSaleOders() {
      this.saleOders = [...this.getSaleOders]
    },
  },
  mounted() {
    resizeAbleTable()
  },
  methods: {
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOOD_CHOOSE_ACTION,
    ]),
    choosenRecept(value) {
      this.$emit('choosenRecept', { value })
      this.$emit('onCloseModal')
      this.saleOders = []
    },
    onCloseModal() {
      this.$emit('onCloseModal')
      this.saleOders = []
    },
    onSearchClick(search) {
      this.GET_RETURNED_GOOD_CHOOSE_ACTION(search)
    },
    onPaginationChange() {
      this.GET_CUSTOMERS_ACTION(this.paginationData)
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
