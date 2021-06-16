<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-warehouses-output-list-search />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <div class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách phiếu xuất hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded bg-brand-1 text-white"
            variant="someThing"
            size="sm"
            @click="onClickPrintExportButton"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="ml-1 rounded bg-brand-1 text-white"
            variant="someThing"
            size="sm"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="getOutputGoods"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
        >
          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
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
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalQuantity) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'packetQuantity'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalPacketQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'outpacketQuantity'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalUnitQuantity) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'intoPrice'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalAmountNotVat) }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'finalPrice'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalAmount) }}
            </b-row>
          </template>
          <!-- END - Column filter -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </div>
    <!-- END - Report Output list -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatISOtoVNI } from '@/@core/utils/filter'
import {
  REPORT_OUTPUT_GOODS,
  // Getters
  OUTPUT_GOODS_GETTER,
  // Actions
  GET_OUTPUT_GOODS_ACTION,
} from '../store-module/type'
import ReportsWarehousesOutputListSearch from './components/ReportsWarehousesOutputListSearch.vue'

export default {
  components: {
    ReportsWarehousesOutputListSearch,
  },
  data() {
    return {
      isShowDeleteModal: false,
      decentralization: {
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },
      columns: [
        {
          label: 'Ngày xuất',
          field: 'transDate',
          sortable: false,
        },
        {
          label: 'Loại xuất',
          field: 'transType',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
        },
        {
          label: 'Ngày hóa đơn',
          field: 'recieptDate',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'group',
          sortable: false,
        },
        {
          label: 'Mã sản phẩm',
          field: 'productId',
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
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng lẻ',
          field: 'outpacketQuantity',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá trước thế',
          field: 'preTaxPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'intoPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá sau thuế',
          field: 'afTaxPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Tổng cộng',
          field: 'finalPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Quy cách',
          field: 'specifications',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'importId',
          sortable: false,
        },
        {
          label: 'Cửa hàng',
          field: 'store',
          sortable: false,
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'chainStore',
          sortable: false,
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
        {
          label: 'Số đơn nhập PO',
          field: 'poNo',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_OUTPUT_GOODS, [
      OUTPUT_GOODS_GETTER,
    ]),
    getOutputGoods() {
      if (this.OUTPUT_GOODS_GETTER.response) {
        return this.OUTPUT_GOODS_GETTER.response.content.map(data => ({
          id: data.id,
          transDate: formatISOtoVNI(data.exportDate),
          billNumber: data.tranCode,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          recieptDate: formatISOtoVNI(data.orderDate),
          group: null,
          productId: data.productId,
          productName: data.productName,
          quantity: data.quantity,
          packetQuantity: data.packetQuantity,
          outpacketQuantity: data.unitQuantity,
          preTaxPrice: data.priceNotVat,
          intoPrice: data.price,
          afTaxPrice: data.amountNotVat,
          finalPrice: data.totalAmount,
          specifications: `${data.packetUnit} ${data.convfact} ${data.unit}`,
          importId: data.orderNumber,
          store: data.shopName,
          chainStore: data.shopType,
          productGroup: data.productGroupCategory,
          note: data.noted,
          poNo: null,
        }))
      }
      return []
    },
    getTotalValues() {
      if (this.OUTPUT_GOODS_GETTER.info) {
        return this.OUTPUT_GOODS_GETTER.info
      }
      return {}
    },
  },
  mounted() {
    this.GET_OUTPUT_GOODS_ACTION({
      ...this.decentralization,
    })
  },
  methods: {
    ...mapActions(REPORT_OUTPUT_GOODS, [
      GET_OUTPUT_GOODS_ACTION,
    ]),
    navigateToCreate() {
      this.$router.push({ name: 'sales-customers-create' })
    },
    navigateToUpdate(id) {
      this.$router.push({
        name: 'sales-customers-update',
        params: {
          id,
        },
      })
    },
    onClickExcelExportButton() {
    },
    onClickPrintExportButton() {
    },
  },
}
</script>
