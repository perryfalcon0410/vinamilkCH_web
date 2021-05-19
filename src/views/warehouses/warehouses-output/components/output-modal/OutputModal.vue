<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
    @hidden="onModalHidden"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <search-component @onSearch="onSearch" />
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-primary">
            <strong>
              Danh sách phiếu nhập hàng
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="poTrans"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true
            }"
            compact-mode
            line-numbers
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
                  @click="() => onPoItemSelected(props.row.id)"
                />
                <b-button
                  size="sm"
                  variant="info"
                  class="ml-1"
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

          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </b-form>
      <!-- END - Coupon list -->

      <!-- START - Product list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-primary">
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
            :rows="poProducts"
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
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import SearchComponent from './components/SearchComponent.vue'
import {
  WAREHOUSES_OUTPUT,
  GET_EXPORT_PO_TRANS_GETTER,
  GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  GET_EXPORT_PO_TRANS_DETAIL_ACTION,
  GET_EXPORT_PO_TRANS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    SearchComponent,
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
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      columns: [
        {
          label: 'Ngày nhập',
          field: 'createdAt',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'transCode',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ngày hóa đơn',
          field: 'transDate',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'PO No',
          field: 'poNumber',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
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
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'export',
          sortable: false,
        },
        {
          label: 'Còn lại/Tổng nhập',
          field: 'quantity',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    poTrans() {
      return this.GET_EXPORT_PO_TRANS_GETTER().map(data => ({
        id: data.id,
        productCode: formatDateToLocale(data.formatDateToLocale),
        transDate: formatDateToLocale(data.transDate),
        transCode: data.transCode,
        redInvoiceNo: data.redInvoiceNo,
        internalNumber: data.internalNumber,
        poNumber: data.poNumber,
        billDate: data.transDate,
      }))
    },

    poProducts() {
      return this.GET_EXPORT_PO_TRANS_DETAIL_GETTER().map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        unit: data.unit,
        totalPrice: data.totalPrice,
        export: `${data.export}/${data.quantity}`,
        quantity: `${data.quantity - data.export}/${data.quantity}`,
      }))
    },
  },
  mounted() {
    this.GET_EXPORT_PO_TRANS_ACTION()
  },
  methods: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_GETTER,
      GET_EXPORT_PO_TRANS_DETAIL_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_ACTION,
      GET_EXPORT_PO_TRANS_DETAIL_ACTION,
    ]),
    onSearch(search) {
      this.GET_EXPORT_PO_TRANS_ACTION(search)
    },
    onPoItemSelected(id) {
      this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(id)
    },
    onModalHidden() {
      this.$emit('onModalHidden')
    },
    choonsenTrans(trans) {
      this.$emit('choonsenTrans', trans)
      this.$emit('onModalHidden', trans.id)
    },
  },
}
</script>
