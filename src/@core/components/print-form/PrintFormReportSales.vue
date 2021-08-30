<template>
  <b-container
    id="report-sales"
    fluid
    class="d-none d-print-block px-3 py-2 text-black"
  >
    <!-- START - Header -->
    <b-row
      id="report-sales-header"
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
        <strong style="font-size: 28px;">
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
        <strong style="font-size: 15px;">
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
        style="width: 40%;"
      >
        Tổng Số HĐ:
      </i>
      <strong
        class="text-right"
        style="width: 6%;"
      >{{ $formatNumberToLocale(reportSalesInfoData.someBills) }}</strong>
      <span
        class="text-right"
        style="width: 15.5%;"
      >
        Tổng cộng:
      </span>
      <strong
        class="text-right"
        style="width: 9%;"
      >{{ $formatNumberToLocale(reportSalesInfoData.totalQuantity) }}</strong>
      <strong
        class="text-right"
        style="width: 12.5%;"
      >{{ $formatNumberToLocale(reportSalesInfoData.totalTotal) }}</strong>
      <strong
        class="text-right"
        style="width: 8%;"
      >{{ $formatNumberToLocale(reportSalesInfoData.totalPromotionNotVat) }}</strong>
      <strong
        class="text-right"
        style="width: 9%; padding-right: 0.1rem;"
      >{{ $formatNumberToLocale(reportSalesInfoData.totalPay) }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 1 -->

    <table
      id="report-sales-table"
    >
      <thead>
        <!-- START - Header -->
        <tr>
          <th
            class="px-20"
            style="width: 3%"
          >
            STT
          </th>
          <th
            class="px-20"
            style="width: 13%"
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
            style="width: 10%"
          >
            Tên KH
          </th>
          <th
            class="px-20"
            style="width: 5%"
          >
            Ngành
          </th>
          <th
            class=" px-20"
            style="width: 5%"
          >
            Mã SP
          </th>
          <th
            class="text-left px-20"
            style="width: 15%"
          >
            Tên SP
          </th>
          <th
            class="px-20"
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
            style="width: 5%"
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
            style="width: 8%"
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
            {{ $formatNumberToLocale(products.promotionNotVAT) }}
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
import JSPM from 'jsprintmanager'
import { myFont } from '@/@core/libs/PTSans'
import toasts from '@/@core/utils/toasts/toasts'
// eslint-disable-next-line import/no-extraneous-dependencies
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import {
// printActions,
  jsPdfPrint,
  jspmCheckStatus,
} from '@core/utils/filter'
import {
  REPORT_SALES,
  // Getters
  PRINT_REPORT_SALES_GETTER,
} from '@/views/reports/reports-sales/reports-sales/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  components: {
  },
  data() {
    return {
      dataPrintOptions: {},
      printerName: null,
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES, [PRINT_REPORT_SALES_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

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
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
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
  watch: {
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addFileToVFS('Roboto-Bold.ttf', myFont)
      pdf.addFont('Roboto-Bold.ttf', 'myFont', 'normal')
      pdf.setFont('myFont')
      pdf.setFontSize(18)
      pdf.text('Báo cáo bán hàng', 120, 10)
      pdf.setFontSize(13)
      pdf.text(`${this.reportSalesShopData.shopName}`, 15, 8)
      pdf.setFontSize(9)
      pdf.text(`Add: ${this.reportSalesShopData.address}`, 15, 17)
      pdf.text(`Tel: ${this.reportSalesShopData.tel}`, 15, 24)
      pdf.text(`Từ ngày: ${this.reportSalesShopData.fromDate}                Đến ngày: ${this.reportSalesShopData.toDate}`, 110, 17)
      pdf.text(`Ngày in: ${this.reportSalesShopData.dateOfPrinting}`, 119, 24)
      // total table
      pdf.autoTable({
        startY: 30,
        styles: {
          font: 'myFont',
          fontSize: 9,
          textColor: 'black',
          fontStyle: 'bold',
        },
        body: [
          [
            { content: 'Tổng Số HĐ:', halign: 'right', styles: { halign: 'right', cellWidth: 120, fillColor: [211, 211, 211] } },
            { content: `${this.$formatNumberToLocale(this.reportSalesInfoData.someBills)}`, styles: { halign: 'right', cellWidth: 19, fillColor: [211, 211, 211] } },
            { content: 'Tổng cộng:', styles: { halign: 'right', cellWidth: 35, fillColor: [211, 211, 211] } },
            { content: `${this.$formatNumberToLocale(this.reportSalesInfoData.totalQuantity)}`, styles: { halign: 'right', cellWidth: 18, fillColor: [211, 211, 211] } },
            { content: `${this.$formatNumberToLocale(this.reportSalesInfoData.totalTotal)}`, styles: { halign: 'right', cellWidth: 34, fillColor: [211, 211, 211] } },
            { content: `${this.$formatNumberToLocale(this.reportSalesInfoData.totalPromotionNotVat)}`, styles: { halign: 'right', cellWidth: 23, fillColor: [211, 211, 211] } },
            { content: `${this.$formatNumberToLocale(this.reportSalesInfoData.totalPay)}`, styles: { halign: 'right', fillColor: [211, 211, 211] } },
          ],
        ],
      })
      const res = pdf.autoTableHtmlToJson(document.getElementById('report-sales-table'))
      pdf.autoTable(res.columns, res.data, {
        showHead: 'firstPage',
        startY: 38,
        theme: 'grid',
        styles: {
          font: 'myFont',
          Color: [255, 0, 0],
          fontSize: 8,
          textColor: 'black',
        },
        headStyles: {
          fillColor: 'white',
          font: 'myFont',
          textColor: 'black',
          fontSize: 9,
          lineWidth: 0.1,
          lineColor: 'black',
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 35 },
          2: { cellWidth: 28 },
          3: { cellWidth: 35 },
          4: { cellWidth: 18 },
          5: { cellWidth: 13 },
          6: { cellWidth: 30 },
          7: { cellWidth: 10 },
          8: { halign: 'right', cellWidth: 12 },
          9: { halign: 'right', cellWidth: 15 },
          10: { halign: 'right', cellWidth: 20 },
          11: { halign: 'right', cellWidth: 23 },
          12: { halign: 'right' },
        },
        didDrawCell: data => {
          if (data.section === 'head') {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.5)
            pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
          }
          if (data.section === 'body' && data.column.index === 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
          }
          if (data.section === 'body' && data.column.index === 12) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
          }
          if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
          }
        },
      })
      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      // pdf.save()
      const options = {
        fileName: 'bao_cao_ban_hang',
        pageSizing: 'Fit',
        rotate: 'Rot90',
      }
      if (jspmCheckStatus()) {
        if (this.printerName.includes('PDF')) {
          pdf.save('bao_cao_ban_hang.pdf')
        } else {
          jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  // border: 1px solid;
  table-layout: fixed;
}
th {
  border-style: solid;
  border-width: 1px;
  font-size: 12px;
}
td, .td {
  border-style: dotted;
  border-width: 1px;
  word-wrap: break-word;
  font-size: 10px;
}
.background-lightgray {
  background-color: lightgray !important;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 2%;
        margin-bottom: 0;
        size: landscape;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
