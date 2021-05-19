<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-warehouses-output-list-search @onClickSearchButton="onClickSearchButton" />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <b-form class="bg-white rounded shadow rounded my-1">
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
            class="rounded btn-brand-1"
            variant="someThing"
          >
            <b-icon-printer-fill class="mr-05" />
            In
          </b-button>
          <b-button
            class="ml-1 rounded btn-brand-1"
            variant="someThing"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="differencePrices"
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

          <!-- START - Custom filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ info.totalQuantity || '' }}
            </b-row>
            <b-row
              v-if="props.column.field === 'totalInput'"
              class="mx-0"
              align-h="end"
            >
              {{ info.totalPriceInput || '' }}
            </b-row>
          </template>
          <!-- END - Custom filter -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Report Output list -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  formatNumberToLocale,
  formatDateToLocale,
  reverseVniDate,
} from '@/@core/utils/filter'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import ReportsWarehousesOutputListSearch from './components/ReportsWarehousesOutputListSearch.vue'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
} from '../store-module/type'

export default {
  components: {
    ReportsWarehousesOutputListSearch,
  },

  data() {
    return {
      searchOptions: {
        code: '',
        fromOrderDate: null,
        fromTransDate: null,
        toOrderDate: null,
        toTransDate: null,
        ids: '',
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'orderDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã nhập hàng',
          field: 'receptCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá đầu vào (VAT)',
          field: 'inputPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền vào',
          field: 'totalInput',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá đầu ra (VAT)',
          field: 'outputPrice',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền ra',
          field: 'totalOutput',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Chênh lệch',
          field: 'priceChange',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER,
    ]),

    differencePrices() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.differencePrices) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.differencePrices.map(data => ({
          id: data.id,
          redInvoiceNo: data.redInvoiceNo,
          poNumber: data.poNumber,
          internalNumber: data.internalNumber,
          transDate: formatDateToLocale(data.transDate),
          orderDate: formatDateToLocale(data.orderDate),
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: formatNumberToLocale(Number(data.quantity)),
          inputPrice: formatNumberToLocale(Number(data.inputPrice)),
          totalInput: formatNumberToLocale(Number(data.totalInput)),
          outputPrice: formatNumberToLocale(Number(data.outputPrice)),
          totalOutput: formatNumberToLocale(Number(data.totalOutput)),
          priceChange: formatNumberToLocale(Number(data.priceChange)),
        }))
      }
      return {}
    },
    info() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.info) {
        return {
          totalQuantity: formatNumberToLocale(Number(this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.info.totalQuantity)),
          totalPriceInput: formatNumberToLocale(Number(this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_GETTER.info.totalPriceInput)),
        }
      }
      return {
        totalQuantity: 0,
        totalPriceInput: 0,
      }
    },
  },

  mounted() {
    resizeAbleTable()
    this.searchOptions.toTransDate = reverseVniDate(this.$nowDate)
    this.searchOptions.fromTransDate = reverseVniDate(this.$earlyMonth)
    this.searchOptions.toOrderDate = reverseVniDate(this.$nowDate)
    this.searchOptions.fromOrderDate = reverseVniDate(this.$earlyMonth)

    this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION({
      ...this.decentralization,
      ...this.searchOptions,
    })
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
    ]),

    onClickSearchButton(searchValue) {
      const {
        fromDate,
        toDate,
        fromOrderDate,
        toOrderDate,
        licenseNumber,
        productCode,
      } = searchValue

      this.searchOptions.code = licenseNumber
      this.searchOptions.toTransDate = reverseVniDate(toDate)
      this.searchOptions.fromTransDate = reverseVniDate(fromDate)
      this.searchOptions.toOrderDate = reverseVniDate(toOrderDate)
      this.searchOptions.fromOrderDate = reverseVniDate(fromOrderDate)
      this.searchOptions.ids = productCode

      this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION({
        ...this.decentralization,
        code: licenseNumber,
        fromTransDate: reverseVniDate(fromDate),
        toTransDate: reverseVniDate(toDate),
        fromOrderDate: reverseVniDate(fromOrderDate),
        toOrderDate: reverseVniDate(toOrderDate),
        ids: productCode,
      })
    },
  },
}
</script>
