<template>
  <div
    id="print-form-sale-receipt-v2"
    ref="printSaleReceiptV2"
    style="max-width: 95%; margin: 0 auto;"
    class="d-none d-print-block text-brand-3"
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
          width="240px"
        />
        <div
          class="mb-50"
          style="font-size: 28px"
        >
          CTY CP SUA VIET NAM - VINAMILK
        </div>
        <strong style="font-size: 34px">
          {{ printSalesReceiptData.shopName }}
        </strong>
        <div style="font-size: 28px">
          Tel: {{ printSalesReceiptData.shopPhone }}
        </div>
        <div style="font-size: 28px">
          Add: {{ printSalesReceiptData.shopAddress }}
        </div>

        <strong class="mt-1">
          <div style="font-size: 28px">
            BIÊN NHẬN THANH TOÁN
          </div>
          <div style="font-size: 28px">
            KIÊM PHIẾU GIAO HÀNG
          </div>
          <div style="font-size: 28px">
            (CÓ GIÁ TRỊ NHƯ HÓA ĐƠN)
          </div>
        </strong>
      </div>
    </b-row>
    <!-- END - Header -->

    <!-- START - Order info -->
    <div>
      <div style="font-size: 28px">
        Số HĐ: <strong>{{ printSalesReceiptData.orderNumber }}</strong>
      </div>
      <b-row
        class="mx-0"
        style="font-size: 28px"
      >
        <div class="mr-20">
          KH:
        </div>
        <b-col class="px-0">
          {{ printSalesReceiptData.customerName }} - {{ printSalesReceiptData.customerPhone }}
        </b-col>
      </b-row>
      <b-row
        class="mx-0"
        style="font-size: 28px"
      >
        <div class="mr-20">
          DC:
        </div>
        <b-col class="px-0">
          {{ printSalesReceiptData.customerAddress }}
        </b-col>
      </b-row>
      <div style="font-size: 28px">
        Loại giao hàng: {{ printSalesReceiptData.deliveryType }}
      </div>
      <div style="font-size: 28px">
        Doanh số tích lũy: {{ $formatNumberToLocale(printSalesReceiptData.customerPurchase) }}
      </div>
      <div style="font-size: 28px">
        Ngày: {{ $formatPrintDate(printSalesReceiptData.orderDate) }}
      </div>
      <div style="font-size: 28px">
        NV: {{ printSalesReceiptData.userName }}
      </div>
    </div>
    <!-- END - Order info -->

    <!-- START - Tables -->
    <table id="table-header">
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
      id="table-body"
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
          <td>
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
          <td>
            Giảm giá
          </td>
          <td class="text-right">
            {{ $formatNumberToLocale(item.totalDiscountPrice) }}
          </td>
        </tr>
      </tbody>
      <tbody v-show="Boolean(Number(product.displayType))">
        <td>
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
          <td>
            {{ item.promotionName }}
          </td>
        </tr>
        <tr>
          <td>
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
        style="font-size: 28px"
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
          style="font-size: 28px"
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
    <div style="font-size: 28px">
      Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng ngày mua hàng.
    </div>
    <div class="text-center mt-50 text-nowrap">
      <strong style="font-size: 26px">Vinamilk online: <ins>www.giacmosuaviet.com.vn</ins></strong>
      <div
        style="font-size: 28px"
        class="html2pdf__page-break"
      >
        Cảm ơn Quý khách. Hẹn gặp lại
      </div>
    </div>
    <!-- END - Footer -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JSPM from 'jsprintmanager'
import {
  // printActions,
  jspmCheckStatus,
  // printTest,
} from '@core/utils/filter'
// eslint-disable-next-line import/no-extraneous-dependencies
import jsPDF from 'jspdf'
import 'jspdf-autotable'

// import { autoTable } from 'jspdf-autotable'
// eslint-disable-next-line import/no-extraneous-dependencies
import { myFont } from '@/@core/libs/PTSans'
// import { Roboto } from '@/@core/libs/Roboto-Regular-normal'
// import '@/@core/libs/jspdf.customfonts.min.js'
// import '@/@core/libs/default_vfs.js'
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
  GET_PRINTER_CLIENT_ACTIONS,
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
      printerName: '',
      ipAddress: null,
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
    printerOptions() {
      this.printerName = this.printerOptions.billPrinterName
      this.ipAddress = this.printerOptions.clientIp || null
    },
  },
  mounted() {
    this.GET_PRINTER_CLIENT_ACTIONS({
      data: {
        clientId: this.ipAddress,
      },
      onSuccess: () => {},
    })
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      for (let i = 0; i < 3; i += 1) {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
          // const element = document.getElementById('print-form-sale-receipt-v2')
          // element.classList.remove('d-none')
          // const options = {
          //   fileName: 'hoa_don_ban_hang',
          //   pageSizing: 'Fit',
          //   scale: 3,
          //   pageBreak: '',
          //   format: [210, 600],
          // }
          if (jspmCheckStatus()) {
            // printActions(element, printerName, options)
            // printTest(element, printerName)
            const fontSize = 24
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF('p', 'mm', [100, 76]) // portrait, heigth x width
            pdf.setLineCap(2)
            // element.classList.add('d-none')
            pdf.setFontSize(fontSize)
            pdf.addFileToVFS('PTSans.ttf', myFont)
            pdf.addFont('PTSans.ttf', 'PTSans', 'normal')
            pdf.setFont('PTSans')
            // pdf.addFont('Arimo-Regular.ttf', 'Arimo', 'normal')
            // pdf.setFont('Arimo')
            // doc.fromHTML(element)
            pdf.text('CTY CP SUA VIET NAM - VINAMILK', 20, 25)
            pdf.text(`${this.printSalesReceiptData.shopName}`, 20, 45)
            pdf.text(`${this.printSalesReceiptData.shopPhone}`, 20, 65)
            pdf.text(`${this.printSalesReceiptData.shopAddress}`, 20, 85)
            pdf.text('BIÊN NHẬN THANH TOÁN', 20, 105)
            pdf.text('KIÊM PHIẾU GIAO HÀNG', 20, 125)
            pdf.text('(CÓ GIÁ TRỊ NHƯ HÓA ĐƠN)', 20, 145)
            pdf.text(`Số HĐ: ${this.printSalesReceiptData.orderNumber}`, 20, 165)
            pdf.text(`KH: ${this.printSalesReceiptData.customerName} - ${this.printSalesReceiptData.customerPhone}`, 20, 185)
            pdf.text(`DC: ${this.printSalesReceiptData.customerAddress}`, 20, 205)
            pdf.text(`Loại giao hàng: ${this.printSalesReceiptData.deliveryType}`, 20, 225)
            pdf.text(`Doanh số tích lũy: ${this.$formatNumberToLocale(this.printSalesReceiptData.customerPurchase)}`, 20, 245)
            pdf.text(`Ngày: 03/07/2021 - ${this.$formatPrintDate(this.printSalesReceiptData.orderDate)}`, 20, 265)
            pdf.text(`NV: ${this.printSalesReceiptData.userName}`, 20, 285)
            // pdf.autoTable({
            //   head: [['SP', 'SL', 'Giá', 'T.Tiền']],
            //   body: [
            //     ['Sữa chua tổng hợp', '5', '163,647', '818,253'],
            //     ['Sữa ông thọ', '1', '10,000', '10,000'],
            //     // ...
            //   ],
            //   startY: 305,
            //   styles: {
            //     font: 'PTSans',
            //   },
            // })
            pdf.autoTable({
              html: '#table-header',
              startY: 305,
              theme: 'plain',
              styles: {
                font: 'PTSans',
                fontSize,
              },
            })
            pdf.autoTable({
              html: '#table-body',
              startY: 315,
              theme: 'plain',
              styles: {
                font: 'PTSans',
              },
            })
            pdf.text('Tổng cộng (bao gồm VAT):', 20, 405)
            pdf.text('Tổng tiền (chưa VAT):', 20, 425)
            pdf.text('Giảm giá (chưa VAT):', 20, 445)
            pdf.text('Giảm giá (bao gồm VAT):', 20, 465)
            pdf.text('Tiền tích lũy:', 20, 485)
            pdf.text('Voucher:', 20, 505)
            pdf.text('Thanh toán (chưa VAT):', 20, 525)
            pdf.text('Thanh toán (bao gồm VAT):', 20, 545)
            pdf.text('KH đưa:', 20, 565)
            pdf.text('Trả lại:', 20, 585)

            pdf.text('Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng ngày mua hàng.', 20, 605)
            pdf.text('Vinamilk online: www.giacmosuaviet.com.vn', 20, 625)
            pdf.text('Cảm ơn Quý khách. Hẹn gặp lại', 20, 645)
            const cpj = new JSPM.ClientPrintJob()
            cpj.clientPrinter = new JSPM.InstalledPrinter(this.printerName) // get printer
            // convert data
            const printContent = new JSPM.PrintFilePDF(pdf.output('datauristring'), JSPM.FileSourceType.URL, 'hoa_don_ban_hang.pdf', 1)
            printContent.printAsGrayscale = true // Options print black/white(=true) and color(=false)
            printContent.pageSizing = JSPM.Sizing.Fit
            cpj.files.push(printContent)
            cpj.sendToClient()
            // pdf.save('test.pdf')
            break
          }
        } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed && i === 2) {
          toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
        }
      }
    }
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th {
  font-size: 28px;
}
td {
  font-size: 28px;
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
