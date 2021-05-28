<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <sales-returned-goods-list-search
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
      @updatePageElement="updatePageNumber"
    />
    <!-- END - Search -->

    <!-- START - List of orders returned -->
    <b-form class="bg-white rounded shadow rounded my-1">
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
            class="btn-brand-1 h9 align-items-button-center"
            variant="someThing"
            @click="showSalesReturnedGoodsCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-05"
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
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="orderReturnPagination.totalElements"
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
              <b-icon-eye-fill
                v-b-popover.hover="'Xem chi tiết'"
                class="text-brand-1 cursor-pointer"
                scale="1.5"
                @click="showOrderDetailsModal(props.row.idDetail)"
              />
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
              class="mx-0"
              align-h="end"
            >
              {{ totalAmount }}
            </b-row>

            <b-row
              v-show="orderReturnPagination.totalElements"
              v-else-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ totalQuantity }}
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
                  {{ (elementSize * pageNumber) > orderReturnPagination.totalElements ?
                    orderReturnPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ orderReturnPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="orderReturnPagination.totalElements"
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
    <!-- End table -->

    </b-form>
    <!-- END - List of orders returned -->

    <!-- START - Modal -->
    <order-details-modal
      :productdetails="detailReturnProducts"
      :sale-off-details="detailReturnPromotions"
      :information="detailReturnInfo"
      :info-total-product="infoProduct"
      :info-total-promotion="infoPromotion"
      :visible="isOrderDetailsModal"
      @close="isOrderDetailsModal = false"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import {
  formatNumberToLocale,
  replaceDotWithComma,
  formatISOtoVNI,
} from '@/@core/utils/filter'
import commonData from '@/@db/common'
import lodash from 'lodash'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import SalesReturnedGoodsListSearch from './components/SalesReturnedGoodsListSearch.vue'
import {
  // GETTERS
  RETURNEDGOODS,
  RETURNED_GOODS_GETTER,
  RETURN_GOODS_DETAIL_GETTER,
  // ACTION
  GET_RETURNED_GOODS_ACTION,
  GET_RETURN_GOODS_DETAIL_ACTION,
} from '../store-module/type'

export default {
  components: {
    OrderDetailsModal,
    SalesReturnedGoodsListSearch,
  },
  data() {
    return {
      isOrderDetailsModal: false,
      selectedRow: 0,
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
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
          label: 'Mã trả hàng',
          field: 'orderReturnNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Đơn hàng tham chiếu',
          field: 'orderNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhân viên',
          field: 'userName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã khách hàng',
          field: 'customerNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày trả hàng',
          field: 'dateReturn',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tổng giá trị',
          field: 'amount',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tiền giảm giá',
          field: 'discount',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền thanh toán',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
          width: '40px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOODS_GETTER,
      RETURN_GOODS_DETAIL_GETTER,
    ]),
    orderReturnPagination() {
      if (this.RETURNED_GOODS_GETTER.response) {
        return this.RETURNED_GOODS_GETTER.response
      }
      return {}
    },
    getOderReturns() {
      if (this.RETURNED_GOODS_GETTER.response && this.RETURNED_GOODS_GETTER.response.content) {
        return this.RETURNED_GOODS_GETTER.response.content.map(data => ({
          id: data.id,
          idDetail: data.id,
          createdAt: formatISOtoVNI(data.createdAt),
          orderReturnNumber: data.orderNumber,
          orderNumber: data.orderNumberRef,
          userName: data.userName,
          customerNumber: data.customerNumber,
          customerName: data.customerName,
          dateReturn: formatISOtoVNI(data.dateReturn),
          orderDate: formatISOtoVNI(data.orderDate),
          quantity: this.$formatNumberToLocale(data.total),
          discount: this.$formatNumberToLocale(data.totalPromotion),
          amount: this.$formatNumberToLocale(data.amount),
          feature: '',
        }))
      }
      return []
    },
    totalQuantity() {
      if (this.RETURNED_GOODS_GETTER.info) {
        return replaceDotWithComma(formatNumberToLocale(Number(this.RETURNED_GOODS_GETTER.info.allTotal)))
      }
      return 0
    },
    totalAmount() {
      if (this.RETURNED_GOODS_GETTER.info) {
        return replaceDotWithComma(formatNumberToLocale(Number(this.RETURNED_GOODS_GETTER.info.totalAmount)))
      }
      return 0
    },

    // return goods detail
    getDetailReturnProducts() {
      if (this.RETURN_GOODS_DETAIL_GETTER.productReturn && this.RETURN_GOODS_DETAIL_GETTER.productReturn.response) {
        return this.RETURN_GOODS_DETAIL_GETTER.productReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          paymentReturn: this.$formatNumberToLocale(data.paymentReturn),
        }))
      }
      return []
    },

    getDetailReturnPromotions() {
      if (this.RETURN_GOODS_DETAIL_GETTER.promotionReturn && this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.response) {
        return this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          paymentReturn: this.$formatNumberToLocale(data.paymentReturn),
        }))
      }
      return []
    },
    detailReturnInfo() {
      if (this.RETURN_GOODS_DETAIL_GETTER.infos) {
        return lodash.mapValues(this.RETURN_GOODS_DETAIL_GETTER.infos, value => value)
      }
      return {}
    },
    infoProduct() {
      if (this.RETURN_GOODS_DETAIL_GETTER.productReturn && this.RETURN_GOODS_DETAIL_GETTER.productReturn.info) {
        return lodash.mapValues(this.RETURN_GOODS_DETAIL_GETTER.productReturn.info, value => this.$formatNumberToLocale(value))
      }
      return {}
    },
    infoPromotion() {
      if (this.RETURN_GOODS_DETAIL_GETTER.promotionReturn && this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.info) {
        return lodash.mapValues(this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.info, value => this.$formatNumberToLocale(value))
      }
      return {}
    },
  },
  watch: {
    getOderReturns() {
      this.oderReturns = [...this.getOderReturns]
    },
    getDetailReturnPromotions() {
      this.detailReturnPromotions = [...this.getDetailReturnPromotions]
    },
    getDetailReturnProducts() {
      this.detailReturnProducts = [...this.getDetailReturnProducts]
    },
  },
  mounted() {
    resizeAbleTable()
  },
  methods: {
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOODS_ACTION,
      GET_RETURN_GOODS_DETAIL_ACTION,
    ]),
    showSalesReturnedGoodsCreate() {
      this.$router.push({ name: 'sales-returned-goods-create' })
    },
    formatter(value) {
      return value.toLowerCase()
    },

    updatePageNumber() {
      this.pageNumber = 1
    },
    showOrderDetailsModal(idDetail) {
      this.isOrderDetailsModal = !this.isOrderDetailsModal
      this.GET_RETURN_GOODS_DETAIL_ACTION({
        id: idDetail,
        ...this.decentralization,
      })
    },
    onPaginationChange() {
      this.GET_RETURNED_GOODS_ACTION(this.paginationData)
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
