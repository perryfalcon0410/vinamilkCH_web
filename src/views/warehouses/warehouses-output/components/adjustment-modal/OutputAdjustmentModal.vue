<template>
  <b-modal
    id="output-adjustment-modal"
    size="xl"
    title="Chọn phiếu xuất điều chỉnh"
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
              v-for="(item, index) in ajustmentTrans"
              :key="item.id"
              class="border-bottom border-white bg-light py-1 cursor-pointer"
              :class="{ 'text-brand-1': current == item.id }"
              @click="onAdjustmentItemSelected(item.id, item.adjustmentDate, item.description)"
            >
              <b-col cols="1">
                {{ index + 1 }}
              </b-col>
              <b-col>
                {{ item.adjustmentCode }}
              </b-col>
              <b-col>
                {{ item.adjustmentDate }}
              </b-col>
              <b-col
                class="text-wrap"
              >
                {{ item.description }}
              </b-col>
            </b-row>
            <!-- END - List -->
          </b-col>
        </b-col>
        <!-- START - Product list -->
        <b-col
          class="d-flex flex-column  px-0 ml-xl-1 mt-1 mt-xl-0"
        >
          <!-- START - Header -->
          <strong
            class="text-dark mb-1 mx-1"
          >Chi tiết nhập/xuất hàng
          </strong>

          <b-col
            class="bg-white rounded shadow py-1"
          >
            <vue-good-table
              :columns="columnsProducts"
              :rows="productsOfAjustment"
              max-height="500px"
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
            </vue-good-table>

          </b-col>
          <!-- END - Table Products-->

        </b-col>
      <!-- END - Product list -->
      </b-row>
      <!-- END - Delivery Bill list -->

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
  GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER,
  GET_EXPORT_ADJUSTMENTS_GETTER,
  // Actions
  GET_EXPORT_ADJUSTMENT_ACTION,
  GET_EXPORT_ADJUSTMENT_DETAIL_ACTION,
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
      ajustmentTrans: [],
      trans: {},
      productsOfAjustment: [],

      columnsProducts: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
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
      GET_EXPORT_ADJUSTMENTS_GETTER,
      GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER,
    ]),
    getAjustmentTrans() {
      return this.GET_EXPORT_ADJUSTMENTS_GETTER
    },

    getExportAdjustmentDetail() {
      return this.GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.getAjustmentTrans.totalElements
        ? this.getAjustmentTrans.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.getAjustmentTrans.totalElements} mục`
    },
  },
  watch: {
    getAjustmentTrans() {
      if (this.getAjustmentTrans) {
        this.ajustmentTrans = this.getAjustmentTrans.map(data => ({
          id: data.id,
          createdAt: formatISOtoVNI(data.createdAt),
          adjustmentDate: formatISOtoVNI(data.adjustmentDate),
          adjustmentCode: data.adjustmentCode,
          description: data.description,
          billDate: data.adjustmentDate,
        }))
      }
    },
    getExportAdjustmentDetail() {
      if (this.getExportAdjustmentDetail) {
        const products = []
        if (this.getExportAdjustmentDetail.response) {
          this.getExportAdjustmentDetail.response.forEach(item => {
            const index = products.findIndex(i => i.productCode === item.productCode)
            if (index === -1) {
              products.push(item)
            } else {
              products[index].quantity += item.quantity
              products[index].totalPrice += item.totalPrice
            }
          })
          this.productsOfAjustment = products
        }
        if (this.getExportAdjustmentDetail.info) {
          this.totalQuantity = this.getExportAdjustmentDetail.info.totalQuantity
        }
      }
    },
  },
  mounted() {
    this.GET_EXPORT_ADJUSTMENT_ACTION()
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_ADJUSTMENT_ACTION,
      GET_EXPORT_ADJUSTMENT_DETAIL_ACTION,
    ]),
    onAdjustmentItemSelected(id, date, description) {
      this.current = id
      this.trans.id = id
      this.trans.adjustmentDate = date
      this.trans.description = description
      this.GET_EXPORT_ADJUSTMENT_DETAIL_ACTION({
        id,
        onSuccess: () => {
          this.productDetailTable = true
        },
      })
    },
    choonsenTrans() {
      if (this.productsOfAjustment.length > 0) {
        const adjustmentTranData = {
          tranInfo: this.trans,
          products: this.productsOfAjustment,
          totalQuantity: this.totalQuantity,
        }
        this.$emit('choonsenTrans', adjustmentTranData)
        this.$root.$emit('bv::hide::modal', 'output-adjustment-modal')
      } else {
        toasts.warning('Bạn cần chọn tối thiểu 1 bản ghi')
      }
    },
    close() {
      this.$root.$emit('bv::hide::modal', 'output-adjustment-modal')
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
