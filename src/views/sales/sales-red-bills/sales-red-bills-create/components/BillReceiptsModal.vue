<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <b-form class="bg-white rounded shadow">
        <label
          for="v-search-form"
          class="text-primary m-1"
        >
          Tìm kiếm
        </label>
        <b-form-row
          class="v-search-form border-top mx-0 p-1"
        >

          <b-col
            xl
            sm="4"
            md="3"
          >
            <div>
              {{ 'Mã nhập hàng' }}
            </div>
            <b-form-input
              v-model="customer"
              trim
            />
          </b-col>

          <b-col
            xl
            sm="4"
            md="3"
          >
            <div>
              {{ 'Số hóa đơn' }}
            </div>
            <b-form-input
              v-model="customer"
              trim
            />
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Từ ngày
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <vue-flat-pickr
                v-model="fromDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
                data-toggle
              >
                <b-icon-calendar />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Đến ngày
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <vue-flat-pickr
                v-model="toDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
                data-toggle
              >
                <b-icon-calendar />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            xl
            sm="6"
            md="12"
          >
            <div
              class="h8 text-white"
            >
              Tìm kiếm
            </div>
            <b-button
              id="form-button-search"
              class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
              variant="someThing"
              @click="onClickSearchButton()"
            >
              <b-icon-search class="mr-05" />
              Tìm kiếm
            </b-button>
          </b-col>

        </b-form-row>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <h2>
            Danh sách hóa đơn bán hàng
          </h2>
        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            ref="bill-of-sales-table"
            :columns="columns"
            :rows="billOfSales"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            compact-mode
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
              multipleColumns: true,
            }"
            @on-selected-rows-change="selectionChanged"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field == 'billNumber'">
                <span>
                  {{ props.row.billNumber }}
                </span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
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
                  > trong {{ paging.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="paging.totalElements"
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
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <h2>Danh sách sản phẩm</h2>
        </b-row>
        <!-- END - Header -->

        <!-- START - Table Products -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columnsProducts"
            :rows="products"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            compact-mode
            line-numbers
          />
        </b-col>
      <!-- END - Table Products-->
      </b-form>
      <!-- END - Product list -->
    </b-container>
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex'
import { formatDateToLocale, reverseVniDate } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import {
  REDINVOICE,
  // GETTER
  GET_BILL_OF_SALES_GETTER,
  GET_BILL_OF_SALES_SELECTED_PRODUCTS_GETTER,
  // MUTATIONS
  CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
  CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
  // ACTION
  GET_BILL_OF_SALES_ACTION,
  GET_BILL_OF_SALE_SELECTED_PRODUCT_ACTION,
} from '../../store-module/type'

export default {
  components: {
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
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      fromDate: null,
      toDate: null,
      searchKeywords: '',
      BillOfSalesSelectedRows: [],
      orderCode: '',
      columns: [
        {
          label: 'STT',
          field: 'stt',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'customerNumber',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'orderDate',
          sortable: false,
        },
        {
          label: 'Tiền giảm giá',
          field: 'totalPromotion',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Tiền tích lũy',
          field: 'customerPurchase',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tiền phải trả',
          field: 'total',
          type: 'number',
          sortable: false,
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
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
        },
        {
          label: 'Đơn giá',
          field: 'unitPrice',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'intoMoney',
          sortable: false,
        },
      ],
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },
  computed: {
    billOfSales() {
      return this.GET_BILL_OF_SALES_GETTER().billOfSales.map((data, index) => ({
        orderNumber: data.orderNumber,
        customerNumber: data.customerNumber,
        customerName: data.customerName,
        orderDate: formatDateToLocale(data.orderDate),
        totalPromotion: data.totalPromotion,
        customerPurchase: data.customerPurchase,
        amount: data.amount,
        total: data.total,
        stt: index + 1,
      }))
    },
    paging() {
      return this.GET_BILL_OF_SALES_GETTER().billOfSalesPaging
    },
    products() {
      return this.GET_BILL_OF_SALES_SELECTED_PRODUCTS_GETTER().map(data => ({
        productCode: data.item.productCode,
        productName: data.item.productName,
        quantity: data.item.quantity,
        unitPrice: data.item.unitPrice,
        intoMoney: data.item.intoMoney,
      }))
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
    this.GET_BILL_OF_SALES_ACTION({
      formId: 1, // hard code
      ctrlId: 7, // hard code
    })
    this.fromDate = new Date(this.$earlyMonth).toLocaleDateString()
    this.toDate = new Date(this.$nowDate).toLocaleDateString()
  },
  methods: {
    ...mapGetters(REDINVOICE, [
      GET_BILL_OF_SALES_GETTER,
      GET_BILL_OF_SALES_SELECTED_PRODUCTS_GETTER,
    ]),
    ...mapActions(REDINVOICE, [
      GET_BILL_OF_SALES_ACTION,
      GET_BILL_OF_SALE_SELECTED_PRODUCT_ACTION,
    ]),
    ...mapMutations(REDINVOICE, [
      CLEAR_ALL_BILL_OF_SALES_PRODUCTS,
      CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED,
    ]),
    onPaginationChange() {
      const searchStr = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        searchKeywords: this.searchKeywords,
        invoiceNumber: this.orderCode,
      }

      this.GET_BILL_OF_SALES_ACTION({
        ...searchStr,
        size: this.elementSize,
        page: this.pageNumber - 1,
        formId: 1, // hard code
        ctrlId: 7, // hard code
      })
    },
    onClickSearchButton() {
      const searchStr = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        searchKeywords: this.searchKeywords,
        invoiceNumber: this.orderCode,
      }

      this.GET_BILL_OF_SALES_ACTION({
        ...searchStr,
        size: this.elementSize,
        page: this.pageNumber - 1,
        formId: 1, // hard code
        ctrlId: 7, // hard code
      })
    },
    selectionChanged() {
      if (this.$refs['bill-of-sales-table'].selectedRows.length === 0) {
        this.CLEAR_ALL_BILL_OF_SALES_PRODUCTS()
      }
      if (this.BillOfSalesSelectedRows.length < this.$refs['bill-of-sales-table'].selectedRows.length) {
        this.$refs['bill-of-sales-table'].selectedRows.forEach(item => {
          if (!this.BillOfSalesSelectedRows.find(i => i.orderNumber === item.orderNumber)) {
            this.GET_BILL_OF_SALE_SELECTED_PRODUCT_ACTION({
              orderCode: item.orderNumber,
              formId: 1, // hard code
              ctrlId: 7, // hard code
            })
          }
        })
      } else {
        this.BillOfSalesSelectedRows.forEach(item => {
          if (!this.$refs['bill-of-sales-table'].selectedRows.find(i => i.orderNumber === item.orderNumber)) {
            this.CLEAR_BILL_OF_SALE_PRODUCTS_UNCHECKED(item.orderNumber)
          }
        })
      }

      this.BillOfSalesSelectedRows = this.$refs['bill-of-sales-table'].selectedRows
    },
  },
}
</script>
