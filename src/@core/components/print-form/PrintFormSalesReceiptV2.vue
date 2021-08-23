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
          <th>
            SP
          </th>
          <th class="text-center">
            SL
          </th>
          <th class="text-center">
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
            // format UI bill
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF('p', 'px', [1000, 410]) // portrait, heigth x width
            const marginLeft = 10
            let marginTop = 10
            const spaceRowTwoCluster = 25
            const spaceRowInCluster = 18
            // const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight()
            const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth()
            const fontSize = 20
            pdf.setFontSize(fontSize)
            pdf.addFileToVFS('PTSans.ttf', myFont)
            pdf.addFont('PTSans.ttf', 'PTSans', 'normal')
            pdf.setFont('PTSans')

            // body bill
            pdf.text('CTY CP SUA VIET NAM - VINAMILK', pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowTwoCluster
            pdf.text(`${this.printSalesReceiptData.shopName}`, pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowInCluster
            pdf.text(`Tel: ${this.printSalesReceiptData.shopPhone}`, pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowInCluster
            pdf.text(`Add: ${this.printSalesReceiptData.shopAddress}`, pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowTwoCluster
            pdf.text('BIÊN NHẬN THANH TOÁN', pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowInCluster
            pdf.text('KIÊM PHIẾU GIAO HÀNG', pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowInCluster
            pdf.text('(CÓ GIÁ TRỊ NHƯ HÓA ĐƠN)', pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowTwoCluster
            pdf.text(`Số HĐ: ${this.printSalesReceiptData.orderNumber}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`KH: ${this.printSalesReceiptData.customerName} - ${this.printSalesReceiptData.customerPhone}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`DC: ${this.printSalesReceiptData.customerAddress}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`Loại giao hàng: ${this.printSalesReceiptData.deliveryType}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`Doanh số tích lũy: ${this.$formatNumberToLocale(this.printSalesReceiptData.customerPurchase)}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`Ngày: 03/07/2021 - ${this.$formatPrintDate(this.printSalesReceiptData.orderDate)}`, marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`NV: ${this.printSalesReceiptData.userName}`, marginLeft, marginTop)
            marginTop += 5

            pdf.autoTable({
              html: '#table-header',
              margin: { top: marginTop, left: 5 },
              theme: 'plain',
              styles: {
                font: 'PTSans',
                fontSize,
                fontStyle: 'bold',
              },
            })
            pdf.autoTable({
              html: '#table-body',
              margin: { top: marginTop, left: 5 },
              theme: 'plain',
              styles: {
                font: 'PTSans',
              },
            })
            marginTop += 100
            const marginValueCalculate = pageWidth - 10
            let maxLengthCalculate = 0
            if (this.printSalesReceiptData.amount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.amount.toString().length
            if (this.printSalesReceiptData.amountNotVAT.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.amountNotVAT.toString().length
            if (this.printSalesReceiptData.promotionAmountNotVat.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.promotionAmountNotVat.toString().length
            // if (this.printSalesReceiptData.promotionAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.promotionAmount.toString().length
            // if (this.printSalesReceiptData.accumulatedAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.accumulatedAmount.toString().length
            // if (this.printSalesReceiptData.voucherAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.voucherAmount.toString().length
            if (this.printSalesReceiptData.totalNotVat.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.totalNotVat.toString().length
            if (this.printSalesReceiptData.total.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.total.toString().length
            if (this.printSalesReceiptData.paymentAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.paymentAmount.toString().length
            if (this.printSalesReceiptData.extraAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.extraAmount.toString().length
            const marginLabelCalculate = pageWidth - ((maxLengthCalculate * fontSize) / 2)
            pdf.text('Tổng cộng (bao gồm VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.amount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Tổng tiền (chưa VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.amountNotVAT) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Giảm giá (chưa VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.promotionAmountNotVat) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Giảm giá (bao gồm VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.promotionAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Tiền tích lũy: ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.accumulatedAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Voucher:', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.voucherAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Thanh toán (chưa VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.totalNotVat) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Thanh toán (bao gồm VAT): ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.total) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('KH đưa: ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.paymentAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowInCluster
            pdf.text('Trả lại: ', marginLabelCalculate, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.extraAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
            marginTop += spaceRowTwoCluster
            pdf.text('Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng', marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text('ngày mua hàng.', marginLeft, marginTop)
            marginTop += spaceRowTwoCluster
            pdf.text('Vinamilk online: www.giacmosuaviet.com.vn', pageWidth / 2, marginTop, { align: 'center' })
            marginTop += spaceRowInCluster
            pdf.text('Cảm ơn Quý khách. Hẹn gặp lại', pageWidth / 2, marginTop, { align: 'center' })
            const cpj = new JSPM.ClientPrintJob()
            cpj.clientPrinter = new JSPM.InstalledPrinter(this.printerName) // get printer
            // convert data
            const printContent = new JSPM.PrintFilePDF(pdf.output('datauristring'), JSPM.FileSourceType.URL, 'hoa_don_ban_hang.pdf', 1)
            printContent.printAsGrayscale = true // Options print black/white(=true) and color(=false)
            printContent.pageSizing = JSPM.Sizing.Fit
            cpj.files.push(printContent)
            // cpj.sendToClient()
            pdf.save('test.pdf')
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
