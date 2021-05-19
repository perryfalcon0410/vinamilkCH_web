<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu xuất điều chỉnh"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
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
          <div class="text-primary">
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
              enabled: true
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
                  @click="() => onShowProductsClick(props.row.id)"
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
      <!-- END - Delivery Bill list -->

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

import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import {
  WAREHOUSES_OUTPUT,
  GET_EXPORT_AJUSTMENT_ACTION,
  GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
  GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
  GET_EXPORT_AJUSTMENTS_GETTER,
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
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],

      columns: [
        {
          label: 'Số chứng từ',
          field: 'adjustmentCode',
          sortable: false,
        },
        {
          label: 'Ngày',
          field: 'adjustmentDate',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'description',
          type: 'number',
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
    ajustments() {
      return this.GET_EXPORT_AJUSTMENTS_GETTER().map(data => ({
        id: data.id,
        createdAt: formatDateToLocale(data.formatDateToLocale),
        adjustmentDate: formatDateToLocale(data.adjustmentDate),
        adjustmentCode: data.adjustmentCode,
        description: data.description,
        billDate: data.adjustmentDate,
      }))
    },

    poProducts() {
      return this.GET_EXPORT_AJUSTMENTS_DETAIL_GETTER().map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        unit: data.unit,
        totalPrice: data.totalPrice,
        quantity: data.quantity,
      }))
    },
  },
  mounted() {
    this.GET_EXPORT_AJUSTMENT_ACTION()
  },
  methods: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_AJUSTMENTS_GETTER,
      GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_AJUSTMENT_ACTION,
      GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
    ]),
    onSearch(search) {
      this.GET_EXPORT_PO_TRANS_ACTION(search)
    },
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
  },
}
</script>
