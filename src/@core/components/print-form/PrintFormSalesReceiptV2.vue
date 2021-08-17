<template>
  <div
    id="print-form-sale-receipt-v2"
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
      <b-row class="mx-0">
        <div class="mr-20">
          KH:
        </div>
        <b-col class="px-0">
          {{ printSalesReceiptData.customerName }} - {{ printSalesReceiptData.customerPhone }}
        </b-col>
      </b-row>
      <b-row class="mx-0">
        <div class="mr-20">
          DC:
        </div>
        <b-col class="px-0">
          {{ printSalesReceiptData.customerAddress }}
        </b-col>
      </b-row>
      <div>
        Loại giao hàng: {{ printSalesReceiptData.deliveryType }}
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

    <!-- START - Tables -->
    <table>
      <thead>
        <tr>
          <th class="width-15-per">
            SP
          </th>
          <th class="text-center width-15-per">
            SL
          </th>
          <th class="text-center width-30-per">
            Giá
          </th>
          <th class="text-right width-40-per">
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
      <thead class="border-0">
        <tr>
          <th class="width-15-per" />
          <th class="text-center width-15-per" />
          <th class="text-center width-30-per" />
          <th class="width-40-per" />
        </tr>
      </thead>
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
            {{ $formatNumberToLocale(item.quantity) }}
          </td>
          <td class="text-center">
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
        <td valign="top">
          KM
        </td>
        <td
          class="text-right"
          valign="top"
        >
          {{ item.quantity }}
        </td>
        <td
          colspan="2"
          valign="top"
          class="pl-1"
        >
          {{ item.productName }}
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
          <td class="text-right">
            {{ $formatNumberToLocale( item.amount ) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - lstZM -->

    <!-- END - Tables -->

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
            {{ $formatNumberToLocale( printSalesReceiptData.amount ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.amountNotVAT ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.promotionAmountNotVat ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.promotionAmount ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.accumulatedAmount ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.voucherAmount ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.totalNotVat ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.total ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.paymentAmount ) || 0 }}
          </div>
          <div>
            {{ $formatNumberToLocale( printSalesReceiptData.extraAmount ) || 0 }}
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
import JSPM from 'jsprintmanager'
import {
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'
// import { printBillInvoiceActions } from '@core/utils/filter'
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

import toasts from '@/@core/utils/toasts/toasts'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printSalesReceiptData: {
        shopName: 'shop name',
        shopPhone: '0123456789',
        shopAddress: '123 Đường - Tinh',
        shopEmail: 'shop@gamil.com',
        customerName: 'customer name',
        customerPhone: '123456789',
        customerAddress: '123, Phường, Quận, Tỉnh/Thành',
        deliveryType: 8, // 8 = Giao tại cửa hàng, 9 = Giao tại nhà
        customerPurchase: 6.2162596E7,
        orderNumber: 'SAL.SHOP1.21070300001',
        orderDate: '2021-07-03T09:50:28.450',
        userName: 'staff name',
        products: [
          {
            displayType: 1,
            groupName: 'ZV19_001, ZV20_001',
            listOrderItems: [
              {
                productId: 1,
                productName: 'Product name',
                productCode: 'SP0000',
                price: 5500000.0,
                quantity: 10,
                totalPrice: 55000000.0,
                totalDiscountPrice: -10000,
              },
            ],
            listFreeItems: [
              {
                productName: 'Product name',
                productCode: 'SP0000',
                quantity: 2,
              },
            ],
          },
          {
            displayType: 1,
            groupName: 'ZV19_001, ZV20_001',
            listOrderItems: [
              {
                productId: 1,
                productName: 'Product name',
                productCode: 'SP0000',
                price: 5500000.0,
                quantity: 10,
                totalPrice: 55000000.0,
                totalDiscountPrice: -10000,
              },
            ],
            listFreeItems: [
              {
                productName: 'Product name',
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
        amount: 1727000.0, // Tổng tiền sản phẩm (Có thuế)
        amountNotVAT: 1299001.0,
        promotionAmountNotVat: -140900.1,
        promotionAmount: -389483.0,
        accumulatedAmount: -0.0, // Tiền tích lũy
        voucherAmount: -0.0,
        totalNotVat: 1158100.9,
        total: 1337517.0, // Tổng tiền sản phẩm (Có thuế)
        paymentAmount: 2000000.0, // Tiền khách đưa
        extraAmount: 662483.0, // Tiền trả lại khách
      },
    }
  },

  computed: {
    ...mapGetters(SALESRECEIPTS, [PRINT_SALES_RECEIPT_GETTER]),
    ...mapGetters(SALES, [PRINT_SALES_TEMP_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
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
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
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
    JSPM.JSPrintManager.auto_reconnect = true
    const printerName = this.printerOptions.billPrinterName
    if (printerName === '' || printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
        .then(() => {
          const element = document.getElementById('print-form-sale-receipt-v2')
          const options = {
            fileName: 'hoa_don_ban_hang',
            scale: 3,
          }
          if (jspmCheckStatus()) {
            printActions(element, printerName, options)
          }
        })
        .catch(() => {
          toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
        })
    }
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
thead {
 border-top: 1.5px dashed black;
 border-bottom: 1.5px dashed black;
}
.th {
 border-top: 2.2px dashed black;
 border-bottom: 2.2px dashed black;
}
</style>
<style type="text/scss" media="print">
   @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  tbody {
    line-height: 1.2 !important;
  }
</style>
