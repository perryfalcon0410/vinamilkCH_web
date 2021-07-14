<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
    style="font-size: 12px !important"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-0"
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

    <!-- START - Table 1 -->

    <div
      v-for="cats in reportInputOutputinventoryData"
      :key="cats.catId"
    >
      <table
        class="mt-1"
        style="width: 100%"
      >
        <thead>
          <tr
            v-if="cats.catId === reportInputOutputinventoryData[0].catId"
            class="font-italic"
          >
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-center border-0"
            >
              Tổng cộng:
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right mx-2 border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.beginningQty) }}
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.beginningAmount) }}
            </th>
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.impTotalQty) }}
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.impAdjustmentAmount) }}
            </th>
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.expTotalQty) }}
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.expSalesAmount) }}
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.expExchangeAmount) }}
            </th>
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.expExchangeQty) }}
            </th>
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.endingQty) }}
            </th>
            <th
              colspan="1"
              class="border-0"
            />
            <th
              colspan="1"
              class="text-right border-0"
            >
              {{ $formatNumberToLocale(reportTotalInfoData.endingAmount) }}
            </th>
          </tr>
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
              class="pl-50"
            >
              STT
            </th>
            <th class="pl-50">
              Mã SP
            </th>
            <th class="pl-50 w-40">
              Tên SP
            </th>
            <th class="pl-50">
              ĐVT
            </th>
            <th class="pl-50">
              SL
            </th>
            <th class="pl-50">
              Giá
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              Tổng
            </th>
            <th class="pl-50">
              SL
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              ĐC
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              Tổng
            </th>
            <th class="pl-50">
              BH
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              KM
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              ĐC
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
            <th class="pl-50">
              ĐH
            </th>
            <th class="pl-50">
              SL
            </th>
            <th class="pl-50">
              Giá
            </th>
            <th class="pl-50">
              T.Tiền
            </th>
          </tr>
        <!-- END - Header -->
        </thead>
        <tr class="font-italic">
          <th
            colspan="1"
            class="border-right-0 border-dotted"
          />
          <th
            colspan="1"
            class="text-right border-0 text-nowrap"
          >
            Ngành hàng:
          </th>
          <th
            colspan="1"
            class="text-center border-0"
          >
            {{ cats.catName }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right mx-2 border-0"
          >
            {{ $formatNumberToLocale(cats.beginningQty) }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.beginningAmount) }}
          </th>
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.impTotalQty) }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.impAdjustmentAmount) }}
          </th>
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.expTotalQty) }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.expSalesAmount) }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.expExchangeAmount) }}
          </th>
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.expExchangeQty) }}
          </th>
          <th
            colspan="1"
            class="text-right border-0"
          >
            {{ $formatNumberToLocale(cats.endingQty) }}
          </th>
          <th
            colspan="1"
            class="border-0"
          />
          <th
            colspan="1"
            class="text-right border-left-0 border-dotted"
          >
            {{ $formatNumberToLocale(cats.endingAmount) }}
          </th>
        </tr>
        <tbody>
          <tr
            v-for="(products, index) in cats.products"
            :key="index"
          >
            <td class="pl-50">
              {{ index + 1 }}
            </td>
            <td class="pl-50">
              {{ products.productCode }}
            </td>
            <td class="pl-50">
              {{ products.productName }}
            </td>
            <td class="pl-50">
              {{ products.uom }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.beginningQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.beginningPrice) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.beginningAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.impTotalQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.impQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.impAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.impAdjustmentQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.impAdjustmentAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expTotalQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expSalesQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expSalesAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expPromotionQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expPromotionAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expAdjustmentQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expAdjustmentAmount) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.expExchangeQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.endingQty) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.endingPrice) }}
            </td>
            <td class="pl-50 text-right">
              {{ $formatNumberToLocale(products.endingAmount) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
      if (this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.cats) {
        return this.PRINT_INPUT_OUTPUT_INVENTORY_GETTER.cats
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
td, .td, .border-dotted {
  border-style: dotted;
  border-width: 1px;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: A3 landscape;
    }
    thead {
      display: table-row-group;
    }
</style>
