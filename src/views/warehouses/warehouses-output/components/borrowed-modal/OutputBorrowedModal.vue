<template>
  <b-modal
    id="output-borrowed-modal"
    size="xl"
    title="Chọn phiếu xuất vay mượn"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
    >
      <!-- START - Delivery Bill list -->
      <b-row class="mx-0">
        <!-- START - Header -->
        <b-col
          xl="4"
          class="d-flex flex-column px-0"
          max-height="200px"
        >
          <strong
            class="text-dark mx-1 mb-1 "
          >
            Danh sách nhập/xuất hàng
          </strong>
          <b-col
            class="bg-white shadow rounded text-dark"
          >
            <!-- START - Header -->
            <b-row class="py-1">
              <b-col cols="1" />
              <b-col>
                <strong>
                  Số chứng từ
                </strong>
              </b-col>
              <b-col>
                <strong>
                  Ngày
                </strong>
              </b-col>
              <b-col>
                <strong>
                  Ghi chú
                </strong>
              </b-col>
            </b-row>
            <!-- END - Header -->

            <!-- START - List -->
            <b-row
              v-for="(item, index) in borrowedTrans"
              :key="item.id"
              class="border-bottom border-white bg-light py-1 cursor-pointer"
              :class="{ 'text-brand-1': current == item.id }"
              @click="onBorrowedItemSelected(item.id, item.borrowDate, item.note)"
            >
              <b-col cols="1">
                {{ index + 1 }}
              </b-col>
              <b-col>
                {{ item.poBorrowCode }}
              </b-col>
              <b-col>
                {{ item.borrowDate }}
              </b-col>
              <b-col
                class="text-wrap"
              >
                {{ item.note }}
              </b-col>
            </b-row>
            <!-- END - List -->
          </b-col>
        </b-col>
        <!-- START - Product list -->
        <b-col
          class="d-flex flex-column  px-0 ml-xl-1 mt-1 mt-xl-0"
        >
          <strong
            class="text-dark mb-1 mx-1"
          >
            Chi tiết nhập/xuất hàng
          </strong>

          <!-- END - Header -->

          <!-- START - Table Products -->
          <b-col class="bg-white rounded shadow py-1">
            <vue-good-table
              :columns="columnsProducts"
              :rows="productOfBorrowed"
              max-height="150px"
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
        </b-col>
      <!-- END - Table Products-->

      <!-- END - Product list -->

      </b-row>
    </b-container>
    <!-- START - Footer -->
    <template #modal-footer="{}">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        @click="choonsenTrans"
      >
        <b-icon
          icon="download"
        />
        Lưu ĐC
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
        @click="close"
      >
        <b-icon
          icon="x"
          scale="1.5"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->
  </b-modal>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatISOtoVNI } from '@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
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
      current: null,

      elementSize: commonData.perPageSizes[0],
      pageNumber: commonData.pageNumber,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      totalQuantity: 0,

      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      borrowedTrans: [],
      productOfBorrowed: [],
      trans: {},
      columnsProducts: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-center',
        },
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
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Giá (VAT)',
          field: 'price',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPrice',
          formatFn: this.$formatNumberToLocale,
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
      return this.GET_EXPORT_BORROWINGS_GETTER
    },

    getExportBorrowingDetail() {
      return this.GET_EXPORT_BORROWINGS_DETAIL_GETTER
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
      if (this.borrowedTrans) {
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
      const products = []
      if (this.getExportBorrowingDetail.response) {
        this.getExportBorrowingDetail.response.forEach(item => {
          products.push(item)
        })
        this.productOfBorrowed = products
      }
      if (this.getExportBorrowingDetail.info) {
        this.totalQuantity = this.getExportBorrowingDetail.info.totalQuantity
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
    onBorrowedItemSelected(id, date, note) {
      this.current = id
      this.trans.id = id
      this.trans.borrowDate = date
      this.trans.note = note
      this.GET_EXPORT_BORROWINGS_DETAIL_ACTION({
        id,
        onSuccess: () => {
          this.productDetailTable = true
        },
      })
    },
    choonsenTrans() {
      if (this.productOfBorrowed.length > 0) {
        const borrowedTranData = {
          tranInfo: this.trans,
          products: this.productOfBorrowed,
          totalQuantity: this.totalQuantity,
        }
        this.$emit('choonsenTrans', borrowedTranData)
        this.$bvModal.hide('output-borrowed-modal')
      } else {
        toasts.warning('Bạn cần chọn tối thiểu 1 bản ghi')
      }
    },
    close() {
      this.$bvModal.hide('output-borrowed-modal')
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
