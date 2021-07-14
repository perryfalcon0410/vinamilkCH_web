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
      class="mx-0 background-lightgray width-100-per"
      style=""
    >
      <i
        class="text-right"
        style="width: 43%;"
      >
        Tổng Số HĐ:
      </i>
      <strong
        class="text-right"
        style="width: 8%;"
      >{{ reportSalesInfoData.someBills }}</strong>
      <span
        class="text-right"
        style="width: 15.5%;"
      >
        Tổng cộng:
      </span>
      <strong
        class="text-right"
        style="width: 4.9%;"
      >{{ reportSalesInfoData.totalQuantity }}</strong>
      <strong
        class="text-right"
        style="width: 11.5%;"
      >{{ reportSalesInfoData.totalTotal }}</strong>
      <strong
        class="text-right"
        style="width: 8.7%;"
      >{{ reportSalesInfoData.totalPromotion }}</strong>
      <strong
        class="text-right"
        style="width: 7.9%;"
      >{{ reportSalesInfoData.totalPay }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 1 -->

    <table>
      <thead>
        <!-- START - Header -->
        <tr>
          <th
            class="px-20"
            style="width: 3.5%"
          >
            STT
          </th>
          <th
            class="px-20"
            style="width: 12%"
          >
            Mã HĐ
          </th>
          <th
            class="px-20"
            style="width: 11%"
          >
            Mã KH
          </th>
          <th
            class="px-20"
            style="width: 11%"
          >
            Tên KH
          </th>
          <th
            class="text-right px-20"
            style="width: 5%"
          >
            Ngành
          </th>
          <th
            class="text-right px-20"
            style="width: 6%"
          >
            Mã SP
          </th>
          <th
            class="text-left px-20"
            style="width: 10%"
          >
            Tên SP
          </th>
          <th
            class="text-right px-20"
            style="width: 4%"
          >
            ĐVT
          </th>
          <th
            class="text-right px-20"
            style="width: 4%"
          >
            SL
          </th>
          <th
            class="text-right px-20"
            style="width: 6%"
          >
            Giá
          </th>
          <th
            class="text-right px-20"
            style="width: 7%"
          >
            T.Tiền
          </th>
          <th
            class="text-right px-20 ws-nowrap"
            style="width: 10.5%"
          >
            KM chưa VAT
          </th>
          <th
            class="text-right px-20 ws-nowrap"
            style="width: 9%"
          >
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
          <td
            class="px-20"
          >
            {{ index + 1 }}
          </td>
          <td class="px-20">
            {{ products.orderNumber }}
          </td>
          <td class="px-20">
            {{ products.customerCode }}
          </td>
          <td
            class="px-20"
          >
            {{ products.customerName }}
          </td>
          <td class="px-20">
            {{ products.industry }}
          </td>
          <td
            class="px-20"
          >
            {{ products.productCode }}
          </td>
          <td
            class="px-20"
          >
            {{ products.productName }}
          </td>
          <td class="px-20">
            {{ products.unit }}
          </td>
          <td class="text-right px-20">
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td class="text-right px-20">
            {{ $formatNumberToLocale(products.price) }}
          </td>
          <td class="text-right px-20">
            {{ $formatNumberToLocale(products.total) }}
          </td>
          <td class="text-right px-20">
            {{ $formatNumberToLocale(products.promotion) }}
          </td>
          <td class="text-right px-20">
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
  border-collapse: collapse;
  border: 2px solid;
  table-layout: fixed;
}
th {
  border-style: solid;
  border-width: 2px;
}
td, .td {
  border-style: dotted;
  border-width: 2px;
  word-wrap: break-word;
  font-size: 12px;
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
