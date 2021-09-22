<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <sales-returned-goods-list-search
      @onClickSearchButton="onClickSearchButton"
    />
    <!-- END - Search -->

    <!-- START - List of orders returned -->
    <div class="bg-white rounded shadow rounded my-1">
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách đơn trả hàng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusCreateButton().show"
            :disabled="statusCreateButton().disabled"
            class="btn-brand-1 h8 align-items-button-center"
            variant="someThing"
            @click="showSalesReturnedGoodsCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-50"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>

      <!-- Start table -->
      <b-col class="py-1">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="oderReturns"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: searchData.size,
            setCurrentPage: searchData.page + 1,
          }"
          compact-mode
          :total-rows="orderReturnPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: false,
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
            <b-row v-else-if="props.column.field === 'index'" />
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
              <v-icon-detail
                :disabled="statusCreateButton().disabled"
                @click="navigateToDetail(props.row.idDetail)"
              />
            </div>
            <div
              v-if="props.column.field === 'amount' ||
                props.column.field === 'totalPromotion' ||
                props.column.field === 'total' "
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'index'"
            >
              {{ searchData.page === 0 || isNaN(searchData.page) ? props.index + 1 : searchData.page*searchData.size + (props.index + 1) }}
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
              v-show="orderReturnPagination.totalElements"
              v-if="props.column.field === 'amount'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalAmount) }}
            </b-row>

            <b-row
              v-show="orderReturnPagination.totalElements"
              v-else-if="props.column.field === 'totalPromotion'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalPromo) }}
            </b-row>

            <b-row
              v-show="orderReturnPagination.totalElements"
              v-else-if="props.column.field === 'total'"
              class="mx-50 h7 text-brand-3"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalQuantity) }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="orderReturnPagination.totalElements"
              class="v-pagination px-1 mx-0 d-print-none"
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
                  v-model="searchData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="orderReturnPagination.totalElements"
                :per-page="searchData.size"
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
    <!-- End table -->

    </div>
    <!-- END - List of orders returned -->

    <!-- START - Modal -->
    <!-- <order-details-modal
      :productdetails="detailReturnProducts"
      :sale-off-details="detailReturnPromotions"
      :information="detailReturnInfo"
      :info-total-product="infoProduct"
      :info-total-promotion="infoPromotion"
      :visible="isOrderDetailsModal"
      @close="isOrderDetailsModal = false"
    /> -->
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
// import {
//   resizeAbleTable,
// } from '@core/utils/utils'
import VIconDetail from '@core/components/v-icons/IconDetail.vue'
import commonData from '@/@db/common'
// import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import SalesReturnedGoodsListSearch from './components/SalesReturnedGoodsListSearch.vue'
import {
  // GETTERS
  RETURNEDGOODS,
  RETURNED_GOODS_GETTER,
  // ACTION
  GET_RETURNED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    // OrderDetailsModal,
    VIconDetail,
    SalesReturnedGoodsListSearch,
  },

  data() {
    return {
      isOrderDetailsModal: false,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber - 1,
        sort: null,
      },
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      oderReturns: [],
      detailReturnProducts: [],
      detailReturnPromotions: [],

      columns: [
        {
          label: 'index',
          field: 'index',
          sortable: false,
        },
        {
          label: 'Mã trả hàng',
          thClass: 'align-middle',
          field: 'orderNumber',
          sortable: true,
        },
        {
          label: 'Đơn hàng tham chiếu',
          field: 'fromSaleOrderId',
          sortable: true,
        },
        {
          label: 'Mã khách hàng',
          thClass: 'align-middle',
          field: 'customerNumber',
        },
        {
          label: 'Họ tên',
          thClass: 'align-middle',
          field: 'customerName',
        },
        {
          thClass: 'align-middle',
          label: 'Ngày trả hàng',
          field: 'orderDate',
          sortable: true,
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Tổng giá trị',
          field: 'amount',
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          thClass: 'align-middle',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền giảm giá',
          field: 'totalPromotion',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền thanh toán',
          field: 'total',
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Nhân viên',
          thClass: 'align-middle',
          field: 'createdBy',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          width: '40px',
          hidden: !this.statusCreateButton().show,
          thClass: 'text-center align-middle',
          tdClass: 'text-center',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOODS_GETTER,
    ]),
    orderReturnPagination() {
      if (this.RETURNED_GOODS_GETTER.response) {
        return this.RETURNED_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const { size } = this.searchData
      const { totalElements } = this.orderReturnPagination

      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * size) - size + 1
      const maxPageSize = (size * this.pageNumber) > totalElements
        ? totalElements : (size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
    getOderReturns() {
      if (this.RETURNED_GOODS_GETTER.response && this.RETURNED_GOODS_GETTER.response.content) {
        return this.RETURNED_GOODS_GETTER.response.content.map(data => ({
          id: data.id,
          idDetail: data.id,
          orderNumber: data.orderNumber,
          fromSaleOrderId: data.orderNumberRef,
          createdBy: data.createdBy,
          customerNumber: data.customerNumber,
          customerName: data.customerName,
          orderDate: data.dateReturn,
          total: data.total,
          totalPromotion: data.totalPromotion,
          amount: data.amount,
        }))
      }
      return []
    },
    totalQuantity() {
      if (this.RETURNED_GOODS_GETTER.info) {
        return Number(this.RETURNED_GOODS_GETTER.info.allTotal)
      }
      return 0
    },
    totalPromo() {
      if (this.RETURNED_GOODS_GETTER.info) {
        return Number(this.RETURNED_GOODS_GETTER.info.allPromotion)
      }
      return 0
    },
    totalAmount() {
      if (this.RETURNED_GOODS_GETTER.info) {
        return Number(this.RETURNED_GOODS_GETTER.info.totalAmount)
      }
      return 0
    },
  },

  watch: {
    getOderReturns() {
      this.oderReturns = [...this.getOderReturns]
    },
  },

  mounted() {
    // resizeAbleTable()
  },

  methods: {
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOODS_ACTION,
    ]),

    statusCreateButton() {
      return this.$permission('SalesReturnedGoods', 'SalesReturnedGoodsCreate')
    },
    statusDetailButton() {
      return this.$permission('SalesReturnedGoods', 'SalesReturnedGoodsDetail')
    },

    showSalesReturnedGoodsCreate() {
      this.$router.push({ name: 'sales-returned-goods-create' })
    },
    formatter(value) {
      return value.toLowerCase()
    },
    navigateToDetail(id) {
      this.$router.push({
        name: 'sales-returned-goods-detail',
        params: {
          id,
        },
      })
    },
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },
    onClickSearchButton(event) {
      this.updateSearchData({
        ...event,
      })
      this.onPaginationChange()
    },
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      this.GET_RETURNED_GOODS_ACTION({ ...this.searchData, ...params })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
      })
      this.onPaginationChange()
    },
    onSortChange(params) {
      params.forEach((item, index) => {
        if (item.type === 'none') {
          params.splice(index, 1)
        }
      })
      if (params.length === 1) {
        this.updateSearchData({
          sort: `${params[0].field},${params[0].type}`,
        })
      } else {
        this.updateSearchData({
          sort: null,
        })
      }
      if (params.length >= 2) {
        this.updateSearchData({
          sort: [...params],
        })
      }
      this.onPaginationChange()
    },
  },
}
</script>
