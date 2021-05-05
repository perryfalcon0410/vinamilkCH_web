<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- STart - List of orders returned -->
    <b-card
      no-body
      class="mb-1"
    >
      <label
        for="v-search-form"
        class="text-primary m-1"
      >
        Tìm kiếm
      </label>

      <!-- START - Search -->
      <b-form-row
        class="v-search-form border-top mx-0 p-1"
      >
        <b-col
          xl
          sm="4"
          md="3"
          class="mt-1"
        >
          <b-form-group
            label="Khách hàng"
            label-for="form-input-customer"
          >
            <b-form-input
              :key="index"
              v-model="searchKeywords"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
          class="mt-1"
        >
          <b-form-group
            label="Mã trả hàng"
            label-for="form-input-customer"
          >
            <b-input
              v-model="searchOderReturnNumber"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
          class="mt-1"
        >
          <b-form-group
            label="Từ ngày"
            label-for="form-input-date-from"
          >
            <b-form-datepicker
              id="form-input-date-from"
              v-model="valueDateFrom"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
          class="mt-1"
        >
          <b-form-group
            label="Đến ngày"
            label-for="form-input-date-to"
          >
            <b-form-datepicker
              id="form-input-date-to"
              v-model="valueDateTo"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
          class="mt-1"
        >
          <b-form-group
            label="Tìm kiếm"
            label-for="form-button-search"
          >
            <b-button
              id="form-button-search"
              variant="primary"
              @click="onClickSearchButton()"
            >
              <b-icon-search />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- END - Search -->
    </b-card>

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách đơn trả hàng
        </label>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
            @click="showSalesReturnedGoodsCreate"
          >
            <b-icon-plus />
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
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks class="ml-1" />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field == 'Press'">
              <div v-if="props.row.Press == 'Chỉnh sửa'">
                <b-button
                  variant="light"
                  class="rounded-circle px-1"
                  @click="showOrderDetailsModal"
                >
                  <b-icon-hand-index-thumb />
                </b-button>
              </div>
            </div>
          </template>
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
    <order-details-modal :visible="isOrderDetailsModal " />
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale, formatNumberToLocale } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import OrderDetailsModal from '../components/OrderDetailsModal.vue'
import { RETURNEDGOODS, RETURNED_GOODS_GETTER, GET_RETURNED_GOODS_ACTION } from '../store-module/type'

export default {
  components: {
    OrderDetailsModal,
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,

      isOrderDetailsModal: false,
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      searchTerm: '',
      searchKeywords: '',
      searchOderReturnNumber: '',
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
          field: 'Press',
          sortable: false,
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
        id: data.Id,
        createdAt: formatDateToLocale(data.createdAt),
        orderReturnNumber: data.orderReturnNumber,
        orderNumber: data.orderNumber,
        userName: data.userName,
        customerNumber: data.customerNumber,
        customerName: data.customerName,
        dateReturn: formatDateToLocale(data.dateReturn),
        orderDate: formatDateToLocale(data.orderDate),
        total: formatNumberToLocale(Number(data.total)),
        discount: formatNumberToLocale(Number(data.discount)),
        amount: formatNumberToLocale(Number(data.amount)),
      }))
    },
    totalPayment() {
      return formatNumberToLocale(Number(this.RETURNED_GOODS_GETTER().info.totalPayment))
    },
    totalAmount() {
      return formatNumberToLocale(Number(this.RETURNED_GOODS_GETTER().info.totalAmount))
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
    ]),
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOODS_ACTION,
    ]),
    showSalesReturnedGoodsCreate() {
      this.$router.push({ name: 'sales-returned-goods-create' })
    },
    formatter(value) {
      return value.toLowerCase()
    },
    showOrderDetailsModal() {
      this.isOrderDetailsModal = !this.isOrderDetailsModal
    },
    onClickSearchButton() {
      this.GET_RETURNED_GOODS_ACTION({
        searchKeywords: this.searchKeywords.trim(),
        orderReturnNumber: this.searchOderReturnNumber,
        formDate: this.valueDateFrom,
        toDate: this.valueDateTo,
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
