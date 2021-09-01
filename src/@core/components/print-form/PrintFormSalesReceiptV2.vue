<template>
  <div
    id="print-form-sale-receipt-v2"
    ref="printSaleReceiptV2"
    style="max-width: 95%; margin: 0 auto;"
    class="d-none d-print-block text-brand-3"
  >
    <div id="testHeight">
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
            <td
              style="width: 100px; text-align: left"
            >
              {{ item.productCode }}
            </td>
            <td
              style="width: 100px; text-align: center"
            >
              {{ $formatNumberToLocale(item.quantity) }}
            </td>
            <td
              style="width: 100px; text-align: center"
            >
              {{ $formatNumberToLocale(item.price) }}
            </td>
            <td
              style="width: 100px; text-align: right"
            >
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JSPM from 'jsprintmanager'
// eslint-disable-next-line import/no-extraneous-dependencies
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { printFile } from '@core/utils/utils'
// eslint-disable-next-line import/no-extraneous-dependencies
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
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
  // GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printerName: '',
      ipAddress: null,
      printSalesReceiptData: {},
      isRemoveVNTones: true,
      pdfsrc: null,
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
      this.isRemoveVNTones = this.printerOptions.removeAccent
    },
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      const element = document.getElementById('print-form-sale-receipt-v2')
      element.classList.remove('d-none')
      const heightPage = Number(element.offsetHeight) * 0.28
      element.classList.add('d-none')
      // format UI bill
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'px', [heightPage, 143]) // portrait, heigth x width (287.24409449)
      const marginLeft = 5
      let marginTop = 0
      const spaceRowTwoCluster = 10
      const spaceRowInCluster = 10
      // const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight()
      const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth()
      const fontSize = 9
      pdf.setFontSize(fontSize)
      pdf.addFileToVFS('Arimo-Bold.ttf', myFontBold)
      pdf.addFileToVFS('Arimo-Regular.ttf', myFontNormal)
      pdf.addFont('Arimo-Bold.ttf', 'Arimo', 'bold')
      pdf.addFont('Arimo-Regular.ttf', 'Arimo', 'normal')
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('Arimo')
      pdf.setFontType('normal')
      // body bill
      const logo = 'data:image/png;base64,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'
      pdf.addImage(logo, 'PNG', pageWidth * 0.3, 0, 56, 10.5)
      marginTop += spaceRowInCluster + 10
      pdf.text('CTY CP SUA VIET NAM - VINAMILK', pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowTwoCluster
      pdf.setFontType('bold')
      pdf.text(this.removeVietnameseTones(`${this.printSalesReceiptData.shopName}`, this.isRemoveVNTones), pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowInCluster
      pdf.setFontType('normal')
      pdf.text(`Tel: ${this.printSalesReceiptData.shopPhone}`, pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowInCluster
      pdf.text(this.removeVietnameseTones(`${this.printSalesReceiptData.shopAddress}`, this.isRemoveVNTones), pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowTwoCluster
      pdf.setFontType('bold')
      pdf.text(this.removeVietnameseTones('BIÊN NHẬN THANH TOÁN', this.isRemoveVNTones), pageWidth / 2, marginTop, { align: 'center' })
      marginTop += 8
      pdf.text(this.removeVietnameseTones('KIÊM PHIẾU GIAO HÀNG', this.isRemoveVNTones), pageWidth / 2, marginTop, { align: 'center' })
      marginTop += 8
      pdf.text(`(${this.removeVietnameseTones('CÓ GIÁ TRỊ NHƯ HÓA ĐƠN', this.isRemoveVNTones)})`, pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowTwoCluster + 5
      pdf.setFontType('normal')
      pdf.text(`${this.removeVietnameseTones('Số HĐ', this.isRemoveVNTones)}:`, marginLeft, marginTop)
      if (this.printSalesReceiptData.orderNumber) {
        pdf.setFontType('bold')
        pdf.text(`${this.printSalesReceiptData.orderNumber}`, marginLeft + 25, marginTop)
        pdf.setFontType('normal')
      }
      marginTop += spaceRowInCluster
      pdf.text(`KH: ${this.removeVietnameseTones(`${this.printSalesReceiptData.customerName}`, this.isRemoveVNTones)} - ${this.printSalesReceiptData.customerPhone}`, marginLeft, marginTop)
      marginTop += spaceRowInCluster
      const splitTitle = pdf.splitTextToSize(`DC: ${this.removeVietnameseTones(`${this.printSalesReceiptData.customerAddress}`, this.isRemoveVNTones)}`, pageWidth - marginLeft - 10)
      pdf.text(splitTitle, marginLeft, marginTop)
      if (splitTitle.length === 1) {
        marginTop += spaceRowInCluster
      } else {
        marginTop += (spaceRowInCluster * splitTitle.length) - 5
      }
      pdf.text(`${this.removeVietnameseTones('Loại giao hàng', this.isRemoveVNTones)}: ${this.removeVietnameseTones(`${this.printSalesReceiptData.deliveryType}`, this.isRemoveVNTones)}`, marginLeft, marginTop)
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Doanh số tích luỹ', this.isRemoveVNTones)}: ${this.$formatNumberToLocale(this.printSalesReceiptData.customerPurchase)}`, marginLeft, marginTop)
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Ngày', this.isRemoveVNTones)}: ${this.$formatPrintDate(this.printSalesReceiptData.orderDate)}`, marginLeft, marginTop)
      marginTop += spaceRowInCluster
      pdf.text(`NV: ${this.removeVietnameseTones(`${this.printSalesReceiptData.userName}`, this.isRemoveVNTones)}`, marginLeft, marginTop)
      marginTop += spaceRowInCluster
      pdf.text('-----------------------------------------------------------------------------------', 0, marginTop)
      const columnWidth1 = pageWidth * 0.15
      const columnWidth2 = pageWidth * 0.15
      const columnWidth3 = pageWidth * 0.3
      const columnWidth4 = pageWidth * 0.35
      pdf.autoTable({
        // html: '#table-header',
        startY: marginTop,
        margin: { left: 0 },
        theme: 'plain',
        styles: {
          font: 'Arimo',
          fontSize,
          fontStyle: 'bold',
          textColor: [0, 0, 0],
        },
        body: [
          [
            { content: 'SP', styles: { halign: 'left', cellWidth: columnWidth1 } },
            { content: 'SL', styles: { halign: 'center', cellWidth: columnWidth2 } },
            { content: this.removeVietnameseTones('Giá', this.isRemoveVNTones), styles: { halign: 'center', cellWidth: columnWidth3 } },
            { content: this.removeVietnameseTones('T.Tiền', this.isRemoveVNTones), styles: { halign: 'right', cellWidth: columnWidth4 } },
          ],
        ],
      })
      marginTop += spaceRowTwoCluster + 5
      pdf.text('-----------------------------------------------------------------------------------', 0, marginTop)
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(fontSize - 1)
      this.printSalesReceiptData.products.forEach(product => {
        if (product.listOrderItems !== null) {
          product.listOrderItems.forEach(item => {
            // sản phẩm bán
            marginTop += 10
            pdf.text(this.removeVietnameseTones(`${item.productName}`, this.isRemoveVNTones), marginLeft, marginTop)
            marginTop += spaceRowInCluster
            pdf.text(`${item.productCode}`, marginLeft, marginTop)
            pdf.text(`${this.$formatNumberToLocale(item.quantity)}`, (columnWidth1 + columnWidth2) - 5, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(item.price)}`, (columnWidth1 + columnWidth2 + columnWidth3) - 5, marginTop, { align: 'right' })
            pdf.text(`${this.$formatNumberToLocale(item.totalPrice)}`, (columnWidth1 + columnWidth2 + columnWidth3 + columnWidth4) - 3, marginTop, { align: 'right' })
            if (item.totalDiscountPrice) {
              // giảm giá
              marginTop += spaceRowInCluster
              pdf.text(this.removeVietnameseTones('Giảm giá', this.isRemoveVNTones), marginLeft, marginTop)
              pdf.text(`${this.$formatNumberToLocale(item.totalDiscountPrice)}`, (columnWidth1 + columnWidth2 + columnWidth3 + columnWidth4) - 3, marginTop, { align: 'right' })
            }
          })
        }
        if (Boolean((Number(product.displayType))) === true) {
          // CTKM
          marginTop += spaceRowInCluster
          pdf.text(this.removeVietnameseTones(`${product.groupName}`, this.isRemoveVNTones), marginLeft, marginTop)
        }
        if (product.listFreeItems !== null) {
          product.listFreeItems.forEach(freeItem => {
            // sản phẩm của CTKM
            marginTop += spaceRowInCluster
            pdf.text('KM:', marginLeft, marginTop)
            pdf.text(`${this.$formatNumberToLocale(freeItem.quantity)}`, (columnWidth1 + columnWidth2) - 5, marginTop, { align: 'right' })
            pdf.text(`${this.removeVietnameseTones(freeItem.productName, this.isRemoveVNTones)}`, (columnWidth1 + columnWidth2 + columnWidth3 + columnWidth4) - 3, marginTop, { align: 'right' })
          })
        }
      })
      if (this.printSalesReceiptData.lstZM !== null) {
        this.printSalesReceiptData.lstZM.forEach(zm => {
          // CTKM tay
          marginTop += spaceRowInCluster
          pdf.text(this.removeVietnameseTones(`${zm.promotionName}`, this.isRemoveVNTones), marginLeft, marginTop)
          marginTop += spaceRowInCluster
          pdf.text(`${zm.promotionCode}`, marginLeft, marginTop)
          pdf.text(`${this.$formatNumberToLocale(zm.amount)}`, (columnWidth1 + columnWidth2 + columnWidth3 + columnWidth4) - 3, marginTop, { align: 'right' })
        })
      }
      marginTop += spaceRowInCluster
      pdf.setFontSize(fontSize)
      pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, marginTop)
      marginTop += spaceRowInCluster
      const marginValueCalculate = pageWidth - 10
      let maxLengthCalculate = 0
      if (this.printSalesReceiptData.amount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.amount.toString().length
      if (this.printSalesReceiptData.amountNotVAT.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.amountNotVAT.toString().length
      if (this.printSalesReceiptData.promotionAmountNotVat.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.promotionAmountNotVat.toString().length
      if (this.printSalesReceiptData.promotionAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.promotionAmount.toString().length
      if (this.printSalesReceiptData.accumulatedAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.accumulatedAmount.toString().length
      if (this.printSalesReceiptData.voucherAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.voucherAmount.toString().length
      if (this.printSalesReceiptData.totalNotVat.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.totalNotVat.toString().length
      if (this.printSalesReceiptData.total.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.total.toString().length
      if (this.printSalesReceiptData.paymentAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.paymentAmount.toString().length
      if (this.printSalesReceiptData.extraAmount.toString().length > maxLengthCalculate) maxLengthCalculate = this.printSalesReceiptData.extraAmount.toString().length
      const marginLabelCalculate = pageWidth - ((maxLengthCalculate * fontSize) / 2) - 15
      pdf.text(`${this.removeVietnameseTones('Tổng cộng (bao gồm VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.amount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Tổng tiền (chưa VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.amountNotVAT) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Giảm giá (chưa VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.promotionAmountNotVat) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Giảm giá (bao gồm VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.promotionAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Tiền tích lũy', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.accumulatedAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text('Voucher: ', marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.voucherAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Thanh toán (chưa VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.totalNotVat) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Thanh toán (bao gồm VAT)', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.total) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('KH đưa:', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.paymentAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text(`${this.removeVietnameseTones('Trả lại:', this.isRemoveVNTones)}: `, marginLabelCalculate, marginTop, { align: 'right' })
      pdf.text(`${this.$formatNumberToLocale(this.printSalesReceiptData.extraAmount) || 0}`, marginValueCalculate, marginTop, { align: 'right' })
      marginTop += spaceRowInCluster
      pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ', 0, marginTop)
      marginTop += spaceRowInCluster
      const splitRequest = pdf.splitTextToSize(this.removeVietnameseTones('Quý khách có thể yêu cầu cửa hàng xuất hóa đơn tài chính cùng ngày mua hàng.', this.isRemoveVNTones), pageWidth - 10)
      pdf.text(splitRequest, marginLeft, marginTop)
      marginTop += spaceRowInCluster * splitRequest.length
      pdf.setFontType('bold')
      pdf.text('Vinamilk online', pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowInCluster
      pdf.text('www.giacmosuaviet.com.vn', pageWidth / 2, marginTop, { align: 'center' })
      marginTop += spaceRowInCluster
      pdf.setFontType('normal')
      pdf.text(this.removeVietnameseTones('Cảm ơn Quý khách. Hẹn gặp lại', this.isRemoveVNTones), pageWidth / 2, marginTop, { align: 'center' })
      printFile('hoa_don_ban_hang.pdf', this.printerName, pdf)
    }
  },
  methods: {
    // ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
    removeVietnameseTones(str, isRemove) {
      let stringRemove = str
      if (!isRemove) {
        return stringRemove
      }

      stringRemove = stringRemove.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      stringRemove = stringRemove.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      stringRemove = stringRemove.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      stringRemove = stringRemove.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      stringRemove = stringRemove.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      stringRemove = stringRemove.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      stringRemove = stringRemove.replace(/đ/g, 'd')
      stringRemove = stringRemove.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      stringRemove = stringRemove.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      stringRemove = stringRemove.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      stringRemove = stringRemove.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      stringRemove = stringRemove.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      stringRemove = stringRemove.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      stringRemove = stringRemove.replace(/Đ/g, 'D')
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      stringRemove = stringRemove.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      stringRemove = stringRemove.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      stringRemove = stringRemove.replace(/ + /g, ' ')
      stringRemove = stringRemove.trim()
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      // eslint-disable-next-line no-useless-escape
      stringRemove = stringRemove.replace(/!|@|%|\^|\*|\+|\=|\<|\>|\?|\/|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, '')
      return stringRemove
    },
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
