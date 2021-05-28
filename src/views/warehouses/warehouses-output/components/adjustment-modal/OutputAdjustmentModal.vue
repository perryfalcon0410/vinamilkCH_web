<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu xuất điều chỉnh"
    title-class="text-uppercase font-weight-bold text-brand-1"
    centered
    scrollable
    @hidden="onModalHidden"
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
            :rows="ajustments"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true,
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
            >
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
                  @click="() => onShowProductsClick(props.row.id)"
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
            <!-- <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                v-show="outputPagination.totalElements"
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
                    {{ (elementSize * pageNumber) > outputPagination.totalElements ?
                      outputPagination.totalElements : (elementSize * pageNumber) }}
                    của {{ outputPagination.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="outputPagination.totalElements"
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
            </template> -->
          <!-- END - Pagination -->

          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </b-form>
      <!-- END - Delivery Bill list -->

      <!-- START - Product list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
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
            :rows="getExportAdjustmentDetail"
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
import { formatISOtoVNI } from '@core/utils/filter'
import {
  WAREHOUSES_OUTPUT,
  // Getters
  GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
  GET_EXPORT_AJUSTMENTS_GETTER,
  // Actions
  GET_EXPORT_AJUSTMENT_ACTION,
  GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
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
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
        reasonId: this.reasonSelected,
      },

      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],

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
      GET_EXPORT_AJUSTMENTS_GETTER,
      GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
    ]),
    ajustments() {
      if (this.GET_EXPORT_AJUSTMENTS_GETTER) {
        return this.GET_EXPORT_AJUSTMENTS_GETTER.map(data => ({
          id: data.id,
          createdAt: formatISOtoVNI(data.createdAt),
          adjustmentDate: formatISOtoVNI(data.adjustmentDate),
          adjustmentCode: data.adjustmentCode,
          description: data.description,
          billDate: data.adjustmentDate,
        }))
      }
      return []
    },

    getExportAdjustmentDetail() {
      if (this.GET_EXPORT_AJUSTMENTS_DETAIL_GETTER.response) {
        return this.GET_EXPORT_AJUSTMENTS_DETAIL_GETTER.response.map(data => ({
          id: data.id,
          productCode: data.productCode,
          productName: data.productName,
          price: data.price,
          unit: data.unit,
          totalPrice: data.totalPrice,
          quantity: data.quantity,
        }))
      } return []
    },
    // outputPagination() {
    //   if (this.GET_EXPORT_PO_TRANS_GETTER) {
    //     return this.GET_EXPORT_PO_TRANS_GETTER
    //   }
    //   return {}
    // },
  },
  mounted() {
    this.GET_EXPORT_AJUSTMENT_ACTION()
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_AJUSTMENT_ACTION,
      GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
    ]),
    onShowProductsClick(id) {
      this.GET_EXPORT_AJUSTMENT_DETAIL_ACTION(id)
    },
    onModalHidden() {
      this.$emit('onModalHidden')
    },
    choonsenTrans(trans) {
      this.$emit('choonsenTrans', trans)
      this.$emit('onModalHidden', trans.id)
    },
    // onPaginationChange() {
    //   this.GET_EXPORT_PO_TRANS_ACTION(this.paginationData)
    // },
    // updatePaginationData(newProps) {
    //   this.paginationData = { ...this.paginationData, ...newProps }
    // },
    // onPageChange(params) {
    //   this.updatePaginationData({ page: params.currentPage - 1 })
    //   this.onPaginationChange()
    // },
    // onPerPageChange(params) {
    //   this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
    //   this.onPaginationChange()
    // },
  },
}
</script>
