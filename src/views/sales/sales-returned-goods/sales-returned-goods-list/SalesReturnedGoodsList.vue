<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Full Name -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="searchKeywords"
            class="h8 text-brand-3"
            placeholder="Nhập MÃ/SĐT/TÊN khách hàng"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="searchKeywords"
              class="cursor-pointer text-gray"
              @click="searchKeywords = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Full Name -->

      <!-- START - Order return code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Mã trả hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="derReturnCode"
            class="h8 text-brand-3"
            placeholder="Nhập mã trả hàng"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="derReturnCode"
              class="cursor-pointer text-gray"
              @click="derReturnCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Order return code -->

      <!-- START - to date -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
        >
          <b-icon-x
            v-show="fromDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromDate"
            :config="configDate"
            class="form-control h8 text-brand-3"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - to date -->

      <!-- START - from date -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Đến ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
        >
          <b-icon-x
            v-show="toDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toDate"
            :config="configDate"
            class="form-control h8 text-brand-3"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - from date -->

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <!--"onmousedown" is prevent hightlight text -->
        <div
          class="h8 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-05" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->

    </v-card-actions>
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
          :columns="columns"
          :rows="oderReturns"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
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
              v-if="props.column.field === 'amount'"
              class="mx-0"
              align-h="end"
            >
              {{ totalAmount || '' }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'total'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPayment || '' }}
            </b-row>
          </template>
          <!-- START - Column filter -->

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
                  class="mx-1 mt-1 mb-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong {{ customerPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-if="customerPagination.totalPages > 1"
                v-model="pageNumber"
                :total-rows="customerPagination.totalElements"
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
      :productdetails="productReturns"
      :sale-off-details="promotionReturns"
      :information="totalInfo"
      :visible="isOrderDetailsModal"
    />
    <!-- END - Modal -->

  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  formatDateToLocale,
} from '@/@core/utils/filter'
import commonData from '@/@db/common'
import lodash from 'lodash'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import {
  // GETTERS
  RETURNEDGOODS,
  RETURNED_GOODS_GETTER,
  RETURN_GOODS_DETAIL_PRODUCTS_GETTER,
  RETURN_GOODS_DETAIL_SALES_OFF_GETTER,
  RETURN_GOODS_DETAIL_TOTAL_INFO_GETTER,
  // ACTION
  GET_RETURNED_GOODS_ACTION,
  GET_RETURN_GOODS_DETAIL_ACTION,
} from '../store-module/type'

export default {
  components: {
    OrderDetailsModal,
    VCardActions,
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,

      isOrderDetailsModal: false,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      searchTerm: null,
      searchKeywords: null,
      derReturnCode: null,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },

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
          field: 'total',
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
    customerPagination() {
      return this.RETURNED_GOODS_GETTER().paging
    },
    oderReturns() {
      return this.RETURNED_GOODS_GETTER().oderReturns.map(data => ({
        id: data.id,
        idDetail: data.id,
        createdAt: formatDateToLocale(data.createdAt),
        orderReturnNumber: data.orderReturnNumber,
        orderNumber: data.orderNumber,
        userName: data.userName,
        customerNumber: data.customerNumber,
        customerName: data.customerName,
        dateReturn: formatDateToLocale(data.dateReturn),
        orderDate: formatDateToLocale(data.orderDate),
        total: this.$formatNumberToLocale(data.total),
        discount: this.$formatNumberToLocale(data.discount),
        amount: this.$formatNumberToLocale(data.amount),
        feature: '',
      }))
    },
    totalPayment() {
      return this.$formatNumberToLocale(this.RETURNED_GOODS_GETTER().info.totalPayment)
    },
    totalAmount() {
      return this.$formatNumberToLocale(this.RETURNED_GOODS_GETTER().info.totalAmount)
    },

    // return goods detail
    productReturns() {
      return this.RETURN_GOODS_DETAIL_PRODUCTS_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.ProductName,
        unit: data.unit,
        quantity: this.$formatNumberToLocale(data.quantity),
        pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
        totalPrice: this.$formatNumberToLocale(data.totalPrice),
        discount: this.$formatNumberToLocale(data.discount),
        paymentReturn: this.$formatNumberToLocale(data.paymentReturn),
      }))
    },

    promotionReturns() {
      return this.RETURN_GOODS_DETAIL_SALES_OFF_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.ProductName,
        unit: data.unit,
        quantity: this.$formatNumberToLocale(data.quantity),
        pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
        totalPrice: this.$formatNumberToLocale(data.totalPrice),
        discount: this.$formatNumberToLocale(data.discount),
        paymentReturn: this.$formatNumberToLocale(data.paymentReturn),

      }))
    },

    totalInfo() {
      return lodash.mapValues(this.RETURN_GOODS_DETAIL_TOTAL_INFO_GETTER(), value => this.$formatNumberToLocale(value))
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
    this.GET_RETURNED_GOODS_ACTION()
  },
  methods: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOODS_GETTER,
      RETURN_GOODS_DETAIL_PRODUCTS_GETTER,
      RETURN_GOODS_DETAIL_SALES_OFF_GETTER,
      RETURN_GOODS_DETAIL_TOTAL_INFO_GETTER,
    ]),
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
    showOrderDetailsModal(idDetail) {
      this.isOrderDetailsModal = !this.isOrderDetailsModal
      this.GET_RETURN_GOODS_DETAIL_ACTION({ id: idDetail, formId: 4, ctrlId: 1 })
    },
    onClickSearchButton() {
      this.GET_RETURNED_GOODS_ACTION({
        searchKeywords: this.searchKeywords.trim(),
        orderReturnNumber: this.derReturnCode,
        formDate: this.fromDate,
        toDate: this.toDate,
        size: this.elementSize,
        page: this.pageNumber - 1,
      })
    },
    onPaginationChange() {
      const paginationData = {
        size: this.elementSize,
        page: this.pageNumber - 1,
      }

      this.GET_RETURNED_GOODS_ACTION(paginationData)
    },
  },
}
</script>
