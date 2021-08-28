<template>
  <b-container
    id="rp-input-order"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 20px"> CÔNG TY CP SỮA VIỆT NAM </strong>
        <strong style="font-size: 17px"> {{ reportInfos.shopName }} </strong>
        <strong>{{ reportInfos.address }} </strong>
        <strong> Ngày in: {{ reportInfos.dateOfPrinting }} </strong>
      </div>
      <b-img
        src="@/assets/images/logo/VinamilkLogo.png"
        alt="logo"
        width="200px"
      />
    </b-row>
    <!-- END - Header -->

    <!-- START - Title -->
    <b-row
      class="mx-0"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px">
          BẢNG KÊ CHI TIẾT CÁC HOÁ ĐƠN NHẬP HÀNG
        </strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(reportInfos.fromDate) }} <span class="pl-1">đến {{ $formatISOtoVNI(reportInfos.toDate) }}</span>
        </p>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table -->
    <table id="input-orders-detail">
      <thead>
        <tr>
          <th
            style="width: 1%"
            class="px-1"
          >
            STT
          </th>
          <th class="px-1">
            Số PO
          </th>
          <th class="px-1">
            Số nội bộ
          </th>
          <th class="px-1">
            Số hóa đơn
          </th>
          <th class=" px-1">
            Ngày xuất HĐ
          </th>
          <th class=" px-1">
            Ngày ĐHTT
          </th>
          <th class="text-right px-1">
            Tiền HĐ
          </th>
          <th class="t px-1">
            HĐ khuyến mãi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(products, index) in reportData"
          :key="index"
        >
          <td
            class="text-right px-40"
            style="width: 4%"
          >
            {{ index + 1 }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.poNumber }}
          </td>
          <td class="px-1">
            {{ products.internalNumber }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.redInvoiceNo }}
          </td>
          <td
            class="px-1"
            style="width: 10%"
          >
            {{ products.billDate }}
          </td>
          <td
            class="px-1"
            style="width: 10%"
          >
            {{ products.dateOfPayment }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.totalAmount) || '' }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.promotionalOrders }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table -->

    <!-- START - Fotter -->
    <b-row
      class="mx-0"
      style="width: 85%"
      align-h="end"
    >
      <strong> <i>Tổng cộng:<i> <ins class="ml-5">{{ $formatNumberToLocale(reportInfos.totalAmount) }}</ins> </i></i></strong>
    </b-row>

    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <p>Nhân viên nhập hàng</p>

      <div class="d-flex flex-column align-items-center">
        <p>Cửa hàng trưởng</p>
      </div>
    </b-row>
    <!-- END - Fotter -->
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { vinamilkLogo } from '@/assets/images/logo/vinamilkLogo'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import jsPDF from 'jspdf'
import {
// printActions
  jsPdfPrint,
  jspmCheckStatus,
} from '@core/utils/filter'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_PURCHASES,
  // Getters
  PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER,
} from '@/views/reports/reports-purchases/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printerName: null,
    }
  },

  computed: {
    ...mapGetters(REPORT_PURCHASES, [PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    reportInfos() {
      if (this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.info) {
        return this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.info
      }
      return {
        fromDate: 'fromDate',
        toDate: 'toDate',
        dateOfPrinting: 'dateOfPrinting',
        shopName: 'shopName',
        address: 'address',
        totalAmount: 'totalAmount',
      }
    },
    reportData() {
      if (this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.response) {
        return this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.response
      }
      return {
        poNumber: 'poNumber',
        internalNumber: 'internalNumber',
        redInvoiceNo: 'redInvoiceNo',
        billDate: 'billDate',
        dateOfPayment: 'dateOfPayment',
        amount: 'amount',
        totalAmount: 'totalAmount',
        promotionalOrders: 'promotionalOrders',
      }
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
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      for (let i = 0; i < 3; i += 1) {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
          this.generatePdf(vinamilkLogo)
          break
        } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed && i === 2) {
          toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
          window.print()
        }
      }
    }
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

    generatePdf(img) {
      const x = 8
      const y = 10
      JSPM.JSPrintManager.start()
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      pdf.setFont('Ario-Bold')
      // END - add font family
      pdf.addImage(img, 'PNG', x + 149, y - 5)
      pdf.setFontSize(13)
      pdf.text('CÔNG TY CP SỮA VIỆT NAM', x, y)
      pdf.setFontSize(11)
      pdf.text(this.reportInfos.shopName, x, y + 5)
      pdf.text(`Add: ${this.reportInfos.address}`, x, y + 10)
      pdf.text(`Ngày in: ${this.reportInfos.dateOfPrinting}`, x, y + 15)
      pdf.setFontSize(20)
      pdf.text('Bảng kê chi tiết các hóa đơn nhập hàng', x + 33, y + 25)
      pdf.setFont('Ario-Regular')
      pdf.setFontSize(10)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.reportInfos.fromDate)}         đến: ${this.$formatISOtoVNI(this.reportInfos.toDate)}`, x + 60, y + 30)
      const res = pdf.autoTableHtmlToJson(document.getElementById('input-orders-detail'))
      pdf.autoTable(res.columns, res.data, {
        showHead: 'firstPage',
        startY: y + 35,
        theme: 'plain',
        margin: {
          right: 10,
          left: 7,
        },
        styles: {
          font: 'Ario-Regular',
          Color: [255, 0, 0],
          fontSize: 9,
          textColor: 'black',
        },
        headStyles: {
          fillColor: 'white',
          font: 'Ario-Bold',
          textColor: 'black',
          fontSize: 10,
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 28 },
          4: { cellWidth: 26 },
          5: { cellWidth: 26 },
          6: { cellWidth: 25 },
          7: { cellWidth: 29 },
        },
        didDrawCell: data => {
          if (data.section === 'head') {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.5)
            pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height)
          }
          if (data.section === 'body') {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.5)
            pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height)
          }
        },
      })
      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`Trang ${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 25, pdf.internal.pageSize.getHeight() - 10)
      }
      pdf.autoTable({
        theme: 'plain',
        startY: pdf.previousAutoTable.finalY,
        margin: {
          right: 10,
          left: 7.5,
        },
        body: [
          [
            { content: 'Tổng cộng:', styles: { halign: 'right', font: 'Ario-Bold', cellWidth: 136 } },
            { content: `${this.$formatNumberToLocale(this.reportInfos.totalAmount || 0)}`, styles: { halign: 'right', font: 'Ario-Bold', cellWidth: 30 } },
          ],
        ],
        didDrawCell: data => {
          if (data.column.index === 1) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.5)
            pdf.line(data.cell.x + (data.cell.width - data.cell.contentWidth) + 1, data.cell.y + data.cell.height - 2, data.cell.x + data.cell.width - 1, data.cell.y + data.cell.height - 2)
          }
        },
      })
      pdf.setFont('Ario-Regular')
      pdf.setFontSize(10)
      pdf.text('Nhân viên nhập hàng', x + 20, pdf.previousAutoTable.finalY + 12)
      pdf.text('Cửa hàng trưởng', x + 150, pdf.previousAutoTable.finalY + 12)
      const options = {
        fileName: 'bao_cao_ban_hang',
        pageSizing: 'Fit',
      }
      if (jspmCheckStatus()) {
        jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th, td{
  border-style: solid;
  border-width: 2px;
}
td {
  font-size: 14px;
}

</style>
