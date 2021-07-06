<template>
  <div
    class="d-none d-print-block text-brand-3"
    style="width: 340px"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1 text-center"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <b-img
          src="@/assets/images/logo/VinamilkLogo.png"
          width="120px"
        />
        <div class="mb-50">
          CTY CP SUA VIET NAM - VINAMILK
        </div>
        <strong style="font-size: 17px">
          {{ printSalesReceiptData.shopName }}
        </strong>
        <div>Tel: {{ printSalesReceiptData.shopPhone }}</div>
        <div>Add: {{ printSalesReceiptData.shopAddress }}</div>

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

    <!-- START - Order info -->
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
        Ngày: {{ $formatPrintDate(printSalesReceiptData.orderDate) }}
      </div>
      <div>
        NV: {{ printSalesReceiptData.userName }}
      </div>
    </div>
    <!-- END - Order info -->

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
      <tbody v-show="Boolean(Number(product.displayType))">
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
          <td
            colspan="1"
            class="text-right"
          >
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

import {
  SALES,
  // GETTERS
  PRINT_SALES_TEMP_GETTER,
} from '@/views/sales/sales/store-module/type'

export default {
  data() {
    return {
      printSalesReceiptData: {
        shopName: 'CH CTSP Hải Dương',
        shopPhone: '0887444226',
        shopAddress: '9 Hoàng Hoa Thám - Hải Dương',
        shopEmail: 'shop1@gamil.com',
        customerName: 'KHÁCH HÀNG MẶC ĐINH',
        customerPhone: '0341356686',
        customerAddress: '123, Phường Cô Giang, Quận 1, TP Hồ Chí Minh',
        deliveryType: 8,
        customerPurchase: 6.2162596E7,
        orderNumber: 'SAL.SHOP1.21070300001',
        orderDate: '2021-07-03T09:50:28.450',
        userName: 'Tuấn Nguyễn',
        products: [
          {
            displayType: 1,
            groupName: 'ZV19_001, ZV20_001',
            listOrderItems: [
              {
                productId: 1,
                productName: 'Sữa dinh dưỡng không đường vị tự nhiên - Hộp 1L',
                productCode: 'SP0001',
                price: 55000.0,
                quantity: 10,
                totalPrice: 550000.0,
                totalDiscountPrice: -10000,
              },
            ],
            listFreeItems: [
              {
                productName: 'Sữa dinh dưỡng không đường vị tự nhiên - Hộp 1L',
                productCode: 'SP0001',
                quantity: 2,
              },
            ],
          },
        ],
        lstZM: [
          {
            promotionName: 'Chương trình ZV19 V1, Chương trình ZV20 V1',
            promotionCode: 'ZV19_001, ZV20_001',
            amount: -62333.16948699951,
          },
        ],
        amount: 1727000.0,
        amountNotVAT: 1299001.0,
        promotionAmountNotVat: -140900.1,
        promotionAmount: -389483.0,
        discountAmount: -0.0,
        accumulatedAmount: -0.0,
        voucherAmount: -0.0,
        totalNotVat: 1158100.9,
        total: 2000000.0,
        paymentAmount: 1337517.0,
        extraAmount: 662483.0,
      },
    }
  },

  computed: {
    ...mapGetters(SALESRECEIPTS, [PRINT_SALES_RECEIPT_GETTER]),
    ...mapGetters(SALES, [PRINT_SALES_TEMP_GETTER]),

    getPrintSalesReceiptData() {
      if (this.PRINT_SALES_RECEIPT_GETTER) {
        return this.PRINT_SALES_RECEIPT_GETTER
      }
      return null
    },

    getPrintSalesReceiptTempData() {
      if (this.PRINT_SALES_TEMP_GETTER) {
        return this.PRINT_SALES_TEMP_GETTER
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

  watch: {
    getPrintSalesReceiptData() {
      this.printSalesReceiptData = { ...this.getPrintSalesReceiptData }
    },
    getPrintSalesReceiptTempData() {
      this.printSalesReceiptData = { ...this.getPrintSalesReceiptTempData }
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
