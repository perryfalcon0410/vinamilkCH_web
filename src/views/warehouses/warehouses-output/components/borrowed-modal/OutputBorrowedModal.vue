<template>
  <b-modal
    id="output-borrowed-modal"
    size="xl"
    title="Chọn phiếu xuất vay mượn"
    title-class="text-uppercase font-weight-bold text-brand-1"
    footer-border-variant="light"
    hide-footer
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Delivery Bill list -->
      <b-form class="bg-white rounded shadow rounded">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-brand-1">
            <strong>
              Danh sách phiếu xuất vay mượn
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="borrowedTrans"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: false,
              perPage: elementSize,
              setCurrentPage: pageNumber,
            }"
            compact-mode
            line-numbers
            :total-rows="getBorrowedTrans.totalElements"
            :sort-options="{
              enabled: false,
              multipleColumns: true,
              initialSortBy: [{field: 'borrowDate', type: 'desc'}]
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
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-search
                  class="cursor-pointer"
                  scale="1.3"
                  @click="() => onBorrowedItemSelected(props.row.id)"
                />
                <b-button
                  variant="someThing"
                  class="btn-brand-1 ml-1"
                  @click="() => choonsenTrans(props.row)"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Row -->
            <!-- START - Pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                v-show="getBorrowedTrans.totalElements"
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
                  <span class="text-nowrap">{{ paginationDetailContent }}</span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="getBorrowedTrans.totalElements"
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
      <!-- END - Delivery Bill list -->

      <!-- START - Product list -->
      <b-form
        v-if="productDetailTable"
        class="bg-white rounded shadow rounded mt-1"
      >
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-brand-1">
            <strong>
              Danh sách sản phẩm
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table Products -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columnsProducts"
            :rows="productOfBorrowed"
            style-class="vgt-table bordered"
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
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-search
                  class="cursor-pointer"
                />
                <b-button
                  size="sm"
                  variant="info"
                  class="ml-1"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
          <!-- END - Row -->
          </vue-good-table>

        </b-col>
      <!-- END - Table Products-->

      </b-form>
      <!-- END - Product list -->

    </b-container>
  </b-modal>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatISOtoVNI, formatNumberToLocale } from '@core/utils/filter'
import {
  WAREHOUSES_OUTPUT,
  // Getters
  GET_EXPORT_BORROWINGS_DETAIL_GETTER,
  GET_EXPORT_BORROWINGS_GETTER,
  // Actions
  GET_EXPORT_BORROWINGS_ACTION,
  GET_EXPORT_BORROWINGS_DETAIL_ACTION,
} from '../../store-module/type'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      productDetailTable: false,

      elementSize: commonData.perPageSizes[0],
      pageNumber: commonData.pageNumber,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },

      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      borrowedTrans: [],
      productOfBorrowed: [],
      columns: [
        {
          label: 'Số chứng từ',
          field: 'poBorrowCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày',
          field: 'borrowDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_BORROWINGS_GETTER,
      GET_EXPORT_BORROWINGS_DETAIL_GETTER,
    ]),

    getBorrowedTrans() {
      if (this.GET_EXPORT_BORROWINGS_GETTER) {
        return this.GET_EXPORT_BORROWINGS_GETTER
      }
      return []
    },

    getExportBorrowingDetail() {
      if (this.GET_EXPORT_BORROWINGS_DETAIL_GETTER) {
        return this.GET_EXPORT_BORROWINGS_DETAIL_GETTER
      }
      return []
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.getBorrowedTrans.totalElements
        ? this.getBorrowedTrans.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.getBorrowedTrans.totalElements} mục`
    },
  },
  watch: {
    getBorrowedTrans() {
      if (this.getBorrowedTrans) {
        this.borrowedTrans = this.getBorrowedTrans.map(data => ({
          id: data.id,
          poBorrowCode: data.poBorrowCode,
          borrowDate: formatISOtoVNI(data.borrowDate),
          billDate: data.borrowDate,
          note: data.note,
        }))
      }
    },
    getExportBorrowingDetail() {
      if (this.getExportBorrowingDetail.response) {
        this.productOfBorrowed = this.getExportBorrowingDetail.response.map(data => ({
          id: data.id,
          productCode: data.productCode,
          productName: data.productName,
          price: formatNumberToLocale(data.price),
          unit: data.unit,
          totalPrice: formatNumberToLocale(data.totalPrice),
          quantity: data.quantity,
          productReturnAmount: data.quantity,
          productReturnAmountOriginal: data.quantity,
        }))
      }
    },
  },
  mounted() {
    this.GET_EXPORT_BORROWINGS_ACTION()
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_BORROWINGS_ACTION,
      GET_EXPORT_BORROWINGS_DETAIL_ACTION,
    ]),
    onBorrowedItemSelected(id) {
      this.GET_EXPORT_BORROWINGS_DETAIL_ACTION({
        id,
        onSuccess: () => {
          this.productDetailTable = true
        },
      })
    },
    choonsenTrans(trans) {
      this.GET_EXPORT_BORROWINGS_DETAIL_ACTION({
        id: trans.id,
        onSuccess: borrowedProducts => {
          this.borrowedTrans = borrowedProducts.response.map(data => ({
            id: data.id,
            productCode: data.productCode,
            productName: data.productName,
            price: formatNumberToLocale(data.price),
            unit: data.unit,
            totalPrice: formatNumberToLocale(data.totalPrice),
            productReturnAmount: 0,
            productReturnAmountOriginal: data.quantity,
          }))
          const borrowedTranData = {
            tranInfo: trans,
            products: this.borrowedTrans,
          }
          this.$emit('choonsenTrans', borrowedTranData)
          this.$root.$emit('bv::hide::modal', 'output-borrowed-modal')
        },
      })
    },
    onPaginationChange() {
      this.GET_EXPORT_PO_TRANS_ACTION(this.paginationData)
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
