<template>
  <div
    class="d-none d-print-block text-brand-3"
    style="width: 400px"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1 text-center"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <b-img
          src="https://www.ngoisaoso.vn/uploads/news/2016/05/12/he-thong-nhan-dien-thuong-hieu-vinamilk-3.png"
          width="100px"
        />
        <div class="mb-50">
          CTY CP SUA VIET NAM - VINAMILK
        </div>
        <strong style="font-size: 17px">
          {{ printSalesReceiptData.shopName }}
        </strong>
        <div>Tel: {{ printSalesReceiptData.shopPhone }}</div>
        <div>{{ printSalesReceiptData.shopAddress }}</div>

        <strong class="mt-1">
          <div>
            BIÊN NHẬN THANH TOÁN
          </div>
          <div>
            KIÊM PHIẾU GIAO HÀNG
          </div>
          <div>
            (CÓ GIÁ TRỊ NHƯ HÓA ĐƠN)
          </div>
        </strong>
      </div>
    </b-row>
    <!-- END - Header -->

    <!-- START - Customer info -->
    <div>
      <div>
        Số HĐ: <strong>{{ printSalesReceiptData.orderNumber }}</strong>
      </div>
      <div>
        KH: {{ printSalesReceiptData.customerName }} - {{ printSalesReceiptData.customerPhone }}
      </div>
      <div>
        DC: {{ printSalesReceiptData.customerAddress }}
      </div>
      <div>
        Loại giao hàng: {{ deliveryTypeLabel }}
      </div>
      <div>
        Doanh số tích lũy: {{ $formatNumberToLocale(printSalesReceiptData.customerPurchase) }}
      </div>
      <div>
        Ngày: {{ $formatISOtoVNI( printSalesReceiptData.orderDate, true) }}
      </div>
    </div>
    <!-- END - Customer info -->

    <!-- START - Table -->
    <table>
      <thead>
        <tr>
          <th>
            SP
          </th>
          <th class="text-right">
            SL
          </th>
          <th class="text-right">
            Giá
          </th>
          <th class="text-right">
            T.Tiền
          </th>
        </tr>
      </thead>
    </table>

    <!-- START - Products -->
    <table
      v-for="(product,itemIndex) in printSalesReceiptData.products"
      :key="itemIndex"
    >
      <tbody
        v-for="item in product.listOrderItems"
        :key="item.productId"
      >
        <tr>
          <td colspan="4">
            {{ item.productName }}
          </td>
        </tr>
        <tr>
          <td>
            {{ item.productCode }}
          </td>
          <td class="text-right">
            {{ item.quantity }}
          </td>
          <td class="text-right">
            {{ $formatNumberToLocale(item.price) }}
          </td>
          <td class="text-right">
            {{ $formatNumberToLocale(item.totalPrice) }}
          </td>
        </tr>
        <tr v-show="item.totalDiscountPrice">
          <td colspan="3">
            Giảm giá
          </td>
          <td class="text-right">
            {{ $formatNumberToLocale(item.totalDiscountPrice) }}
          </td>
        </tr>
      </tbody>
      <tbody v-show="product.displayType">
        <td colspan="4">
          {{ product.groupName }}
        </td>
      </tbody>
      <tbody
        v-for="item in product.listFreeItems"
        :key="item.productCode"
      >
        <td colspan="3">
          {{ item.productName }}
        </td>
        <td class="text-right">
          {{ item.quantity }}
        </td>
      </tbody>
    </table>
    <!-- END - Products -->

    <!-- START - lstZM -->
    <table
      v-for="item in printSalesReceiptData.lstZM"
      :key="item.promotionCode"
    >
      <tbody>
        <tr>
          <td colspan="4">
            {{ item.promotionName }}
          </td>
        </tr>
        <tr>
          <td colspan="3">
            {{ item.promotionCode }}
          </td>
          <td colspan="1">
            {{ $formatNumberToLocale( item.amount ) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - lstZM -->

    <!-- END - Table -->

    <!-- STAT - Total section -->
    <div class="text-right th my-1">
      <b-row
        class="mx-0 "
        align-h="end"
        align-v="center"
      >
        <div>
          <div>
            Tổng cộng (bao gồm VAT):
          </div>
          <div>
            Tổng tiền (chưa VAT):
          </div>
          <div>
            Giảm giá (chưa VAT):
          </div>
          <div>
            Giảm giá (bao gồm VAT):
          </div>
          <div>
            Tiền tích lũy:
          </div>
          <div>
            Voucher:
          </div>
          <div>
            Thanh toán (chưa VAT):
          </div>
          <div>
            Thanh toán (bao gồm VAT):
          </div>
          <div>
            KH đưa:
          </div>
          <div>
            Trả lại:
          </div>
        </div>
        <div
          class="ml-50"
        >
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.amount ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.amountNotVAT ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.promotionAmountNotVat ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.promotionAmount ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.accumulatedAmount ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.voucherAmount ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.totalNotVat ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.total ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.paymentAmount ) }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.extraAmount ) }}
          </div>
        </div>
      </b-row>
    </div>
    <!-- END - Total section -->

    <!-- START - Footer -->
    <div>
      Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng ngày mua hàng.
    </div>
    <div class="text-center mt-50 text-nowrap">
      <strong style="font-size: 13px">Vinamilk online: <ins>www.giacmosuaviet.com.vn</ins></strong>
      <div>
        Cảm ơn Quý khách. Hẹn gặp lại
      </div>
    </div>
    <!-- END - Footer -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSaleDeliveryTypeslabel } from '@core/utils/utils'

import {
  SALESRECEIPTS,
  // Getters
  PRINT_SALES_RECEIPT_GETTER,
} from '@/views/sales/sales-receipts/store-module/type'

export default {
  computed: {
    ...mapGetters(SALESRECEIPTS, [PRINT_SALES_RECEIPT_GETTER]),

    printSalesReceiptData() {
      if (this.PRINT_SALES_RECEIPT_GETTER) {
        return this.PRINT_SALES_RECEIPT_GETTER
      }
      return null
    },

    deliveryTypeLabel() {
      if (this.printSalesReceiptData.deliveryType) {
        return getSaleDeliveryTypeslabel(this.printSalesReceiptData.deliveryType)
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
 border-top: 1.5px dashed black;
 border-bottom: 1.5px dashed black;
}
.th {
 border-top: 2.2px dashed black;
 border-bottom: 2.2px dashed black;
}
</style>
