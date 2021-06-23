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
          Tel : {{ reportSalesShopData.phone }}
        </p>
      </div>

      <div class="d-flex flex-column">
        <strong style="font-size: 30px;">
          Báo cáo Xuất nhập Tồn
        </strong>
        <p class="mt-1">
          Từ ngày: {{ $formatISOtoVNI(reportDateData.fromDate) }} đến {{ $formatISOtoVNI(reportDateData.toDate) }}
        </p>
        <p>
          Ngày in : {{ $formatISOtoVNI(reportDateData.reportDate, true) }}
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
      class="mx-0"
      align-h="end"
      align-v="end"
    >
      <div>
        Tổng cộng: <strong>{{ reportTotalInfoData.beginningAmount }}</strong>
      </div>
      <strong class="text-right mx-4">{{ reportTotalInfoData.beginningQty }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.impTotalQty }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.impAmount }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.expTotalQty }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.expSalesAmount }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.expAdjustmentAmount }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.endingQty }}</strong>
      <strong class="text-right mx-4">{{ reportTotalInfoData.endingAmount }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 1 -->

    <table
      class="mt-1"
      style="width: 100%"
    >
      <thead>
        <!-- START - Header -->
        <tr>
          <th colspan="4" />
          <th
            colspan="3"
            class="text-center"
          >
            Đầu kỳ
          </th>
          <th
            colspan="5"
            class="text-center"
          >
            Nhập trong kỳ
          </th>
          <th
            colspan="8"
            class="text-center"
          >
            Xuất trong kỳ
          </th>
          <th
            colspan="3"
            class="text-center"
          >
            Cuối kỳ
          </th>
        </tr>
        <tr>
          <th
            style="width: 1%"
            class="px-1"
          >
            STT
          </th>
          <th class="px-1">
            Mã SP
          </th>
          <th class="px-1">
            Tên SP
          </th>
          <th class="px-1">
            ĐVT
          </th>
          <th class="text-right px-2">
            SL
          </th>
          <th class="text-right px-1">
            Giá
          </th>
          <th class="text-right px-1 w-15">
            T.Tiền
          </th>
          <th class="text-right px-1">
            Tổng
          </th>
          <th class="text-right px-1">
            SL
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            ĐC
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            Tổng
          </th>
          <th class="text-right px-1">
            BH
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            KM
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            ĐC
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
          <th class="text-right px-1">
            ĐH
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
        </tr>
        <tr>
          <th colspan="23">
            <b-row
              class="mx-0 py-1"
              align-h="end"
              align-v="end"
            >
              <div>
                Tổng cộng: <strong>{{ reportTotalInfoData.beginningAmount }}</strong>
              </div>
              <strong class="text-right mx-4">{{ reportTotalInfoData.beginningQty }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.impTotalQty }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.impAmount }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.expTotalQty }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.expSalesAmount }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.expAdjustmentAmount }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.endingQty }}</strong>
              <strong class="text-right mx-4">{{ reportTotalInfoData.endingAmount }}</strong>
            </b-row>
          </th>
        </tr>
        <!-- END - Header -->
      </thead>
      <tbody>
        <tr
          v-for="(products, index) in reportInputOutputinventoryData"
          :key="products.productCode"
        >
          <td class="px-1">
            {{ index + 1 }}
          </td>
          <td class="px-1">
            {{ products.productCode }}
          </td>
          <td class="px-1">
            {{ products.productName }}
          </td>
          <td class="px-1">
            {{ products.uom }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.beginningQty) }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.beginningPrice) }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.beginningAmount) }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.impTotalQty) }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.impQty) }}
          </td>
          <td class="px-1">
            {{ $formatNumberToLocale(products.impAmount) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.impAdjustmentQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.impAdjustmentAmount) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expTotalQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expSalesQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expSalesAmount) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expPromotionQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expPromotionAmount) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expAdjustmentQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expAdjustmentAmount) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.expExchangeQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.endingQty) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.endingPrice) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.endingAmount) }}
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
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY,
  // Getters
  PRINT_INPUT_OUTPUT_INVENTORY_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-input-output-inventory/store-module/type'

export default {
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [PRINT_INPUT_OUTPUT_INVENTORY_GETTER]),

    reportSalesShopData() {
      if (this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.shop) {
        return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.shop
      }
      return {
        shopName: 'name',
        address: 'addres',
        phone: 'phone',
      }
    },
    reportDateData() {
      if (this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER) {
        return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER
      }
      return {
        fromDate: 'fromDate',
        toDate: 'toDate',
        reportDate: 'reportDate',
      }
    },
    reportTotalInfoData() {
      if (this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.total) {
        return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.total
      }
      return {}
    },
    reportInputOutputinventoryData() {
      if (this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.products) {
        return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.products
      }
      return []
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
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: landscape;
    }
</style>
