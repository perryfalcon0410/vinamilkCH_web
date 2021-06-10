<template>
  <b-modal
    id="output-adjustment-modal"
    size="xl"
    title="Chọn phiếu xuất điều chỉnh"
    title-class="text-uppercase font-weight-bold text-brand-1"
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
              Danh sách phiếu xuất điều chỉnh
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="ajustmentTrans"
            max-height="400px"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: false,
              perPage: elementSize,
              setCurrentPage: pageNumber,
            }"
            compact-mode
            line-numbers
            :total-rows="getAjustmentTrans.totalElements"
            :sort-options="{
              enabled: false,
              multipleColumns: true,
              initialSortBy: [{field: 'adjustmentDate', type: 'desc'}]
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
                  v-b-popover.hover.top="'Xem chi tiết'"
                  class="cursor-pointer"
                  scale="1.3"
                  @click="() => onAdjustmentItemSelected(props.row.id)"
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
                v-show="getAjustmentTrans.totalElements"
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
                  :total-rows="getAjustmentTrans.totalElements"
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
            :rows="productsOfAjustment"
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
import { formatISOtoVNI } from '@core/utils/filter'
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

      ajustmentTrans: [],
      productsOfAjustment: [],
      columns: [
        {
          label: 'Số chứng từ',
          field: 'adjustmentCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày',
          field: 'adjustmentDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ghi chú',
          field: 'description',
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
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Giá',
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
          label: 'Thành tiền',
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
      return this.GET_EXPORT_ADJUSTMENTS_DETAIL_GETTER.response
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
        this.getAjustmentTrans.totalElements = this.ajustmentTrans.lenght
      }
    },
    getExportAdjustmentDetail() {
      const products = []
      if (this.getExportAdjustmentDetail) {
        this.getExportAdjustmentDetail.forEach(item => {
          const index = products.findIndex(product => product.productCode === item.productCode)
          if (index === -1) {
            products.push(item)
          } else {
            products[index].quantity += item.quantity
            products[index].totalPrice += item.totalPrice
          }
        })
        this.productsOfAjustment = products
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
    onAdjustmentItemSelected(id) {
      this.GET_EXPORT_ADJUSTMENT_DETAIL_ACTION({
        id,
        onSuccess: () => {
          this.productDetailTable = true
        },
      })
    },
    choonsenTrans(trans) {
      this.GET_EXPORT_ADJUSTMENT_DETAIL_ACTION({
        id: trans.id,
        onSuccess: adjustmentProducts => {
          const products = []
          adjustmentProducts.response.forEach(item => {
            const index = products.findIndex(product => product.productCode === item.productCode)
            if (index === -1) {
              products.push(item)
            } else {
              products[index].quantity += item.quantity
              products[index].totalPrice += item.totalPrice
            }
          })
          this.productsOfAjustment = products
          const adjustmentTranData = {
            tranInfo: trans,
            products: this.productsOfAjustment,
          }
          this.$emit('choonsenTrans', adjustmentTranData)
          this.$root.$emit('bv::hide::modal', 'output-adjustment-modal')
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
