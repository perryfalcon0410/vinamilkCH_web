<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px;">
          {{ reportSalesShopData.shopName }}
        </strong>
        <p class="mt-1">
          Add : {{ reportSalesShopData.address }}
        </p>
        <p>
          Tel : {{ reportSalesShopData.tel }}
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px;">
          Báo cáo bán hàng
        </strong>
        <p class="my-1">
          Từ ngày: {{ reportSalesInfoData.fromDate }} Đến ngày: {{ reportSalesInfoData.toDate }}
        </p>
        <p>
          Ngày in : {{ reportSalesInfoData.dateOfPrinting }}
        </p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px;">
          CH GTSP Hải Dương
        </strong>
      </div>
      <!-- END - Invisible element to align title -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Total view -->
    <b-row
      class="ml-0 background-lightgray"
      align-h="around"
      align-v="end"
    >
      <div class="col-5">
        Tổng số HĐ: <strong>{{ reportSalesInfoData.someBills }}</strong>
      </div>
      <div class="col-4">
        Tổng cộng: <strong>{{ reportSalesInfoData.totalQuantity }}</strong>
      </div>
      <strong class="text-right">{{ reportSalesInfoData.totalTotal }}</strong>
      <strong class="text-right">{{ reportSalesInfoData.totalPromotion }}</strong>
      <strong class="text-right">{{ reportSalesInfoData.totalPay }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 1 -->

    <table
      class="mt-1"
    >
      <thead>
        <!-- START - Header -->
        <tr>
          <th
            style="width: 1%"
            class="px-1"
          >
            STT
          </th>
          <th class="px-1">
            Mã HĐ
          </th>
          <th class="px-1">
            Mã KH
          </th>
          <th class="px-1">
            Tên KH
          </th>
          <th class="text-right px-1">
            Ngành
          </th>
          <th class="text-right px-1">
            Mã SP
          </th>
          <th class="text-right px-1">
            Tên SP
          </th>
          <th class="text-right px-1">
            ĐVT
          </th>
          <th class="text-right px-1">
            SL
          </th>
          <th class="text-right px-1">
            Giá
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            KM chưa VAT
          </th>
          <th class="text-right px-1">
            Thanh toán
          </th>
        </tr>
        <!-- END - Header -->
      </thead>
      <tbody>
        <tr
          v-for="(products, index) in reportSalesData"
          :key="index"
        >
          <td class="px-1">
            {{ index + 1 }}
          </td>
          <td class="px-1">
            {{ products.orderNumber }}
          </td>
          <td class="px-1">
            {{ products.customerCode }}
          </td>
          <td class="px-1">
            {{ products.customerName }}
          </td>
          <td class="px-1">
            {{ products.industry }}
          </td>
          <td class="px-1">
            {{ products.productCode }}
          </td>
          <td class="px-1">
            {{ products.productName }}
          </td>
          <td class="px-1">
            {{ products.unit }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.price) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.total) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.promotion) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.pay) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table 1 -->

    <!-- START - Fotter -->
    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <strong>Người in</strong>

      <div class="d-flex flex-column align-items-center">
        <p>....., Ngày.....Tháng.....Năm.....</p>
        <strong>Cửa hàng trưởng</strong>
      </div>

    </b-row>
    <!-- END - Fotter -->

  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  REPORT_SALES,
  // Getters
  PRINT_REPORT_SALES_GETTER,
} from '@/views/reports/reports-sales/reports-sales/store-module/type'

export default {
  computed: {
    ...mapGetters(REPORT_SALES, [PRINT_REPORT_SALES_GETTER]),

    reportSalesShopData() {
      if (this.PRINT_REPORT_SALES_GETTER.info) {
        return this.PRINT_REPORT_SALES_GETTER.info
      }
      return {
        shopName: 'name',
        address: 'addres',
        phone: 'phone',
      }
    },
    reportSalesInfoData() {
      if (this.PRINT_REPORT_SALES_GETTER.info) {
        return this.PRINT_REPORT_SALES_GETTER.info
      }
      return {
        fromDate: 'fromDate',
        toDate: 'toDate',
        dateOfPrinting: 'dateOfPrinting',
        someBills: 'someBills',
        totalQuantity: 'totalQuantity',
        totalTotal: 'totalTotal',
        totalPromotion: 'totalPromotion',
        totalPay: 'totalPay',
      }
    },
    reportSalesData() {
      if (this.PRINT_REPORT_SALES_GETTER.response) {
        return this.PRINT_REPORT_SALES_GETTER.response
      }
      return null
    },
  },

  updated() {
    window.print()
  },

}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th {
  border-style: solid;
  border-width: 2px;
}
td, .td {
  border-style: dotted;
  border-width: 2px;
}
.background-lightgray {
  background-color: lightgray !important;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
