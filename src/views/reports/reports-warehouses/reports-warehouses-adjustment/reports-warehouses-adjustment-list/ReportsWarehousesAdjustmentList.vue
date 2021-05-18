<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-warehouses-adjustment-list-search />
    <!-- END - Search -->

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách nhập xuất chuyển đổi
        </label>
        <b-button-group>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rowsProduct"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          line-numbers
        >
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
              {{ totalAmount }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'payment'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPayment }}
            </b-row>
          </template>
        <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
  </b-container>
</template>
<script>
import reportData from '@/@db/report'
import {
  formatDateToLocale,
  formatNumberToLocale,
} from '@core/utils/filter'
import ReportsWarehousesAdjustmentListSearch from './components/ReportsWarehousesAdjustmentListSearch.vue'

export default {
  components: {
    ReportsWarehousesAdjustmentListSearch,
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã cửa hàng',
          field: 'shopCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'billCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày hóa đơn',
          field: 'billDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Loại hóa đơn',
          field: 'billType',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngành hàng',
          field: 'industry',
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
          field: 'dvt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Đơn giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thanh toán',
          field: 'payment',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },

      ],
    }
  },
  computed: {
    rowsProduct() {
      return reportData.products.map(data => ({
        shopCode: data.shopCode,
        billCode: data.billCode,
        customerCode: data.CustomerCode,
        industry: data.industry,
        productCode: data.productCode,
        productName: data.productName,
        dvt: data.dvt,
        amount: data.amount,
        price: formatNumberToLocale(data.price),
        payment: formatNumberToLocale(data.payment),
        billDate: formatDateToLocale(data.billDate),
        billType: data.billType,
      }))
    },
    totalAmount() {
      return reportData.totalInfo.totalAmount
    },
    totalPayment() {
      return reportData.totalInfo.totalPayment
    },

  },
  mounted() {
    console.log(reportData.totalInfo.totalAmount)
  },

  methods: {
  },
}
</script>
