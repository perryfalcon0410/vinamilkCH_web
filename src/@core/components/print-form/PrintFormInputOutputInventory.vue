<template>
  <b-container
    id="print-form-input-output-inventory"
    fluid
    class="d-none d-print-block px-1 text-brand-3"
    style="font-size: 12px !important; color: black"
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
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import { printFile } from '@/@core/utils/utils'

import {
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY,
  // Getters
  PRINT_INPUT_OUTPUT_INVENTORY_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-input-output-inventory/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      dataPrintOptions: {},
      bodyData: [],
      count: 1,
      header: [],
      checkheader: true,
      printerName: null,
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [PRINT_INPUT_OUTPUT_INVENTORY_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

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
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },

  updated() {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('l', 'mm', 'a4')
    // START - add font family
    pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
    pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
    pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
    pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
    // content
    this.createHeader(pdf)
    this.createTableFirst(pdf)
    this.createTableSecond(pdf)
    // content
    printFile('Bao_cao_xuat_nhap_ton.pdf', this.printerName, pdf)
    this.count = 1
    this.header = []
    this.checkheader = true
  },

  methods: {
    createHeader(pdf) {
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Báo cáo Xuất nhập Tồn', 125, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.reportSalesShopData.shopName}`, 15, 9)
      pdf.setFont('Ario-Regular')
      pdf.setFontSize(8)
      pdf.text(`Add: ${this.reportSalesShopData.address}`, 15, 16)
      pdf.text(`Tel: ${this.reportSalesShopData.phone || ''}`, 15, 22)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.reportDateData.fromDate)}    đến    ${this.$formatISOtoVNI(this.reportDateData.toDate)}`, 125, 16)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.reportDateData.reportDate)}`, 129, 22)
    },

    createFooter(pdf) {
      if (pdf.previousAutoTable.finalY + 40 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage()
        pdf.setFont('Ario-Regular')
        pdf.setFontSize(9)
        pdf.text('........, Ngày..... tháng..... năm.......', 135, 10)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, 14)
        pdf.text('Cửa hàng trưởng', 147, 14)
      } else {
        pdf.setFont('Ario-Regular')
        pdf.setFontSize(9)
        pdf.text('........, Ngày..... tháng..... năm.......', 135, pdf.previousAutoTable.finalY + 10)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, pdf.previousAutoTable.finalY + 14)
        pdf.text('Cửa hàng trưởng', 147, pdf.previousAutoTable.finalY + 14)
      }
    },

    createTableFirst(pdf) {
      pdf.autoTable({
        startY: 25,
        margin: {
          right: 4,
          left: 4,
        },
        styles: {
          font: 'Ario-Bold',
          fontSize: 6,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng cộng:',
              styles: { halign: 'right', cellWidth: 35 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.beginningQty) || ''}`,
              styles: { halign: 'right', cellWidth: 24 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.beginningAmount) || ''}`,
              styles: { halign: 'right', cellWidth: 26 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.impTotalQty) || ''}`,
              styles: { halign: 'right', cellWidth: 12 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.impAdjustmentAmount) || ''}`,
              styles: { halign: 'right', cellWidth: 51 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.expTotalQty) || ''}`,
              styles: { halign: 'right', cellWidth: 11 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.expSalesAmount) || ''}`,
              styles: { halign: 'right', cellWidth: 27 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.expExchangeAmount) || ''}`,
              styles: { halign: 'right', cellWidth: 49 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.expExchangeQty) || ''}`,
              styles: { halign: 'right', cellWidth: 10 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.endingQty) || ''}`,
              styles: { cellWidth: 18 },
            },
            {
              content: `${this.$formatNumberToLocale(this.reportTotalInfoData.endingAmount) || ''}`,
              styles: { halign: 'right' },
            },
          ],
        ],
      })
    },
    createTableSecond(pdf) {
      const header1 = [
        {
          content: '',
          colSpan: 4,
          styles: { },
        },
        {
          content: 'Đầu kỳ',
          colSpan: 3,
          styles: { },
        },
        {
          content: 'Nhập trong kỳ',
          colSpan: 5,
          styles: { },
        },
        {
          content: 'Xuất trong kỳ',
          colSpan: 8,
          styles: { },
        },
        {
          content: 'Cuối kỳ',
          colSpan: 3,
          styles: { },
        },
      ]
      this.header.push(header1)
      const padding = {
        cellPadding: {
          top: 2, bottom: 2, left: 1, right: 1,
        },
      }
      const header2 = [
        { content: 'STT', styles: { cellWidth: 7.5 } },
        { content: 'Mã SP', styles: { cellWidth: 10 } },
        { content: 'Tên SP', styles: { cellWidth: 20 } },
        { content: 'ĐVT', styles: { cellWidth: 7.5 } },
        { content: 'SL', styles: { cellWidth: 14 } },
        { content: 'Giá', styles: { cellWidth: 10 } },
        { content: 'T.Tiền', styles: { cellWidth: 16 } },
        { content: 'Tổng', styles: { cellWidth: 12 } },
        { content: 'SL', styles: { cellWidth: 9 } },
        { content: 'T.Tiền', styles: { cellWidth: 15 } },
        { content: 'ĐC', styles: { cellWidth: 11 } },
        { content: 'T.Tiền', styles: { cellWidth: 16 } },
        { content: 'Tổng', styles: { cellWidth: 11 } },
        { content: 'BH', styles: { cellWidth: 11 } },
        { content: 'T.Tiền', styles: { cellWidth: 16 } },
        { content: 'KM', styles: { cellWidth: 7 } },
        { content: 'T.Tiền', styles: { cellWidth: 15 } },
        { content: 'ĐC', styles: { cellWidth: 11 } },
        { content: 'T.Tiền', styles: { cellWidth: 16 } },
        { content: 'ĐH', styles: { cellWidth: 10 } },
        { content: 'SL', styles: { cellWidth: 14 } },
        { content: 'Giá', styles: { cellWidth: 10 } },
        { content: 'T.Tiền', styles: { } },
      ]
      this.header.push(header2)
      this.reportInputOutputinventoryData.forEach(item => {
        const halign = { halign: 'right' }
        const valign = { valign: 'middle' }
        const styleDef = { font: 'Ario-Bold', lineWidth: 0, ...halign }
        const row = [
          { content: 'Ngàng hàng:', colSpan: 2, styles: { font: 'Ario-Bold', lineWidth: 0, ...valign } },
          {
            content: `${item.catName}`,
            styles: {
              font: 'Ario-Bold', lineWidth: 0, halign: 'center', ...valign,
            },
          },
          { content: `${this.$formatNumberToLocale(item.beginningQty)}`, colSpan: 2, styles: { ...styleDef, ...valign } },
          { content: `${this.$formatNumberToLocale(item.beginningAmount)}`, colSpan: 2, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.impTotalQty)}`, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.impAdjustmentAmount)}`, colSpan: 4, styles: { ...styleDef, ...padding, ...valign } },
          // { content: '', colSpan: 3, styles: { ...styleDef } },
          { content: `${this.$formatNumberToLocale(item.expTotalQty)}`, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.expSalesAmount)}`, colSpan: 2, styles: { ...styleDef, ...padding, ...valign } },
          { content: '', colSpan: 2, styles: { ...styleDef } },
          { content: `${this.$formatNumberToLocale(item.expExchangeAmount)}`, colSpan: 2, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.expExchangeQty)}`, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.endingQty)}`, styles: { ...styleDef, ...padding, ...valign } },
          { content: `${this.$formatNumberToLocale(item.endingAmount)}`, colSpan: 2, styles: { ...styleDef, ...padding, ...valign } },
        ]
        this.bodyData.push(row)
        item.products.forEach(pro => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { ...padding, ...valign } },
            { content: `${pro.productCode}`, styles: { ...padding, ...valign } },
            { content: `${pro.productName}`, styles: { ...padding, ...valign } },
            { content: `${pro.uom}`, styles: { ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.beginningQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.beginningPrice) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.beginningAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.impTotalQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.impQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.impAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.impAdjustmentQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.impAdjustmentAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expTotalQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expSalesQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expSalesAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expPromotionQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expPromotionAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expAdjustmentQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expAdjustmentAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.expExchangeQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.endingQty) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.endingPrice) || ''}`, styles: { ...halign, ...padding, ...valign } },
            { content: `${this.$formatNumberToLocale(pro.endingAmount) || ''}`, styles: { ...halign, ...padding, ...valign } },
          ])
          this.count += 1
        })
        const startY = this.checkheader ? { startY: pdf.previousAutoTable.finalY } : {}
        pdf.autoTable({
          ...startY,
          theme: 'grid',
          rowPageBreak: 'avoid',
          showHead: 'firstPage',
          pageBreak: 'auto',
          margin: {
            right: 4,
            left: 4,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 6,
            textColor: 'black',
          },
          headStyles: {
            fillColor: 'white',
            font: 'Ario-Bold',
            textColor: 'black',
            lineWidth: 0.1,
            lineColor: 'black',
            halign: 'center',
          },
          head: [...this.header],
          body: [...this.bodyData],
          didDrawCell: key => {
            // if (key.section === 'head' && key.row.index === 1) {
            //   pdf.setDrawColor('black')
            //   pdf.setLineWidth(0.7)
            //   pdf.line(key.cell.x, key.cursor.y + key.cell.height, key.cell.x + key.cell.width, key.cursor.y + key.cell.height)
            // }
            if (key.section === 'body' && key.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
              if (key.section === 'body' && key.column.index === 21) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              } // sai chỗ này khác à rồi ... hiểu
            }
            if (key.section === 'body' && key.row.index === 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
            }
            if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
            }
            if (key.section === 'body' && key.column.index === 22) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
            }
            if (key.section === 'body' && key.column.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
            }
          },
        })
        this.bodyData = []
        this.checkheader = false
      })
      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      this.count = 1
      this.header = []
    },
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
