<template>
  <b-container
    id="print-report-cat"
    fluid
    class="d-none d-print-block px-3 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 25px"> {{ printInfo.shopName }} </strong>
        <p
          class="my-1"
          style="font-size: 20px;"
        >
          Add: {{ printInfo.shopAddress }}
        </p>
        <p
          class="my-1"
          style="font-size: 20px;"
        >Tel: {{ printInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 36px"> Báo cáo doanh số theo CAT </strong>
        <p
          class="my-1"
          style="font-size: 20px;"
        >
          Từ ngày: {{ $formatISOtoVNI(printInfo.fromDate) }} đến ngày: {{ $formatISOtoVNI(printInfo.toDate) }}
        </p>
        <p
          class="my-1"
          style="font-size: 20px;"
        >Ngày in: {{ $formatPrintDate(printInfo.printDate) }}</p>
      </div>
      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 25px;">
          CH GTSP Hải Dương
        </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 2 -->
          <tr
            style="background: rgb(192, 186, 186)"
          >
            <th
              class="text-right font-italic border-0"
              colspan="4"
            >
              Tổng cộng:
            </th>
            <th
              v-for="(item) in totalDetails"
              :key="item"
              class="text-right font-italic border-0"
            >
              <u>{{ $formatNumberToLocale(item) }}</u>
            </th>
          </tr>
          <tr>
            <th
              v-for="(item) in columnList"
              :key="item[0]"
              class="text-center text-nowrap"
            >
              {{ item }}
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(rowData, index) in reportData"
            :key="index"
          >
            <td class="px-1">
              {{ index + 1 }}
            </td>
            <td
              v-for="(data, idx) in rowData"
              :key="idx"
              :class="{'text-right': (idx > 3), 'name-width': (idx === 2)}"
              class="px-1"
            >
              <div v-if="idx <= 3">
                {{ data }}
              </div>
              <div v-else>
                {{ $formatNumberToLocale(data) }}
              </div>
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 1 -->
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JSPM from 'jsprintmanager'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import {
  hostName,
} from '@core/utils/filter'
import { printFile } from '@/@core/utils/utils'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_SALES_CAT,
  // Getters
  PRINT_REPORT_GETTER,
} from '@/views/reports/reports-sales/reports-sales-cat/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      titles: ['STT', 'Mã KH', 'Tên KH', 'Địa chỉ', 'Tần suất'],
      ipAddress: '',
      printerName: '',
      bodyData: [],
      count: 1,
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES_CAT, [
      PRINT_REPORT_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    printInfo() {
      return {
        shopName: this.PRINT_REPORT_GETTER.shopName,
        shopAddress: this.PRINT_REPORT_GETTER.shopAddress,
        shopTel: this.PRINT_REPORT_GETTER.shopTel,
        fromDate: this.PRINT_REPORT_GETTER.fromDate,
        toDate: this.PRINT_REPORT_GETTER.toDate,
        printDate: this.PRINT_REPORT_GETTER.printDate,
      }
    },

    columnList() {
      const titles = this.titles.concat(this.PRINT_REPORT_GETTER.category)
      titles[titles.length] = 'Tổng cộng'
      return titles
    },

    // get data print
    reportData() {
      if (this.PRINT_REPORT_GETTER.reportData) {
        return this.PRINT_REPORT_GETTER.reportData
      }
      return [
        'string',
        'string',
        'string',
        0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
      ]
    },
    // get total info price
    totalDetails() {
      if (this.PRINT_REPORT_GETTER.total) {
        return (this.PRINT_REPORT_GETTER.total || []).slice(3)
      }
      return {}
    },
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    ipAddress() {
      this.GET_PRINTER_CLIENT_ACTIONS({
        data: {
          clientId: this.ipAddress,
        },
        onSuccess: () => {},
      })
    },
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  mounted() {
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null || this.printerName === undefined) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Báo cáo doanh số theo CAT', 120, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.printInfo.shopName}`, 10, 10)
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.printInfo.shopAddress}`, 10, 16)
      pdf.text(this.printInfo.shopTel === null ? 'Tel:' : `Tel: ${this.printInfo.shopTel}`, 10, 22)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.printInfo.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.printInfo.toDate)}`, 120, 16)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.printInfo.printDate)}`, 126, 22)

      const totalRow = [
        {
          content: '',
          styles: {
            font: 'Ario-Bold', lineWidth: 0, fillColor: [211, 211, 211], halign: 'right',
          },
        },
        {
          content: '',
          styles: {
            font: 'Ario-Bold', lineWidth: 0, fillColor: [211, 211, 211], halign: 'right',
          },
        },
        {
          content: '',
          styles: {
            font: 'Ario-Bold', lineWidth: 0, fillColor: [211, 211, 211], halign: 'right',
          },
        },
        {
          content: 'Tổng cộng :',
          styles: {
            font: 'Ario-Bold', lineWidth: 0, fillColor: [211, 211, 211], halign: 'right',
          },
        },
      ]

      this.totalDetails.forEach(item => {
        totalRow.push({
          content: `${item === null || item === 0 ? '' : this.$formatNumberToLocale(item)}`,
          styles: {
            font: 'Ario-Bold', lineWidth: 0, fillColor: [211, 211, 211], halign: 'right',
          },
        })
      })

      const header = []

      this.columnList.forEach(column => {
        if (column === this.columnList[0]
      || column === this.columnList[1]
      || column === this.columnList[2]
      || column === this.columnList[3]) {
          header.push({ content: column, styles: { font: 'Ario-Bold' } })
        } else {
          header.push({ content: column, styles: { font: 'Ario-Bold', halign: 'center' } })
        }
      })
      header.push({ content: 'Tổng cộng', styles: { font: 'Ario-Bold', halign: 'center' } })

      this.bodyData.push(totalRow)
      this.bodyData.push(header)

      if (this.reportData && this.reportData.length > 0) {
        this.reportData.forEach(data => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { cellWidth: 8 } },
            { content: `${data[0]}`, styles: { cellWidth: 26 } },
            { content: `${data[1]}`, styles: { cellWidth: 33 } },
            { content: `${data[2]}`, styles: { cellWidth: this.columnList.length < 13 ? 70 : 40 } },
            { content: data[3] === null || data[3] === 0 ? '' : `${this.$formatNumberToLocale(data[3])}`, styles: { cellWidth: 16, halign: 'right' } },
            { content: data[4] === null || data[4] === 0 ? '' : `${this.$formatNumberToLocale(data[4])}`, styles: { halign: 'right' } },
            { content: data[5] === null || data[5] === 0 ? '' : `${this.$formatNumberToLocale(data[5])}`, styles: { halign: 'right' } },
            { content: data[6] === null || data[6] === 0 ? '' : `${this.$formatNumberToLocale(data[6])}`, styles: { halign: 'right' } },
            { content: data[7] === null || data[7] === 0 ? '' : `${this.$formatNumberToLocale(data[7])}`, styles: { halign: 'right' } },
            { content: data[8] === null || data[8] === 0 ? '' : `${this.$formatNumberToLocale(data[8])}`, styles: { halign: 'right' } },
            { content: data[9] === null || data[9] === 0 ? '' : `${this.$formatNumberToLocale(data[9])}`, styles: { halign: 'right' } },
            { content: data[10] === null || data[10] === 0 ? '' : `${this.$formatNumberToLocale(data[10])}`, styles: { halign: 'right' } },
            { content: data[11] === null || data[11] === 0 ? '' : `${this.$formatNumberToLocale(data[11])}`, styles: { halign: 'right' } },
            { content: data[12] === null || data[12] === 0 ? '' : `${this.$formatNumberToLocale(data[12])}`, styles: { halign: 'right' } },
            { content: data[13] === null || data[13] === 0 ? '' : `${this.$formatNumberToLocale(data[13])}`, styles: { halign: 'right' } },
            { content: data[14] === null || data[14] === 0 ? '' : `${this.$formatNumberToLocale(data[14])}`, styles: { halign: 'right' } },
            { content: data[15] === null || data[15] === 0 ? '' : `${this.$formatNumberToLocale(data[15])}`, styles: { halign: 'right' } },
            { content: data[16] === null || data[16] === 0 ? '' : `${this.$formatNumberToLocale(data[16])}`, styles: { halign: 'right' } },
          ])
          this.count += 1
        })
      }

      pdf.autoTable({
        theme: 'grid',
        startY: 28,
        margin: {
          right: 7,
          left: 7,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: this.columnList.length < 16 ? 7 : 6.5,
          textColor: 'black',
        },
        didDrawCell: key => {
          if (key.section === 'body' && key.row.index === 1) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
          }
          if (key.section === 'body' && key.row.index === 2) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
          }
          if (key.section === 'body' && key.column.index === 0 && key.row.index !== 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
          }
          if (key.section === 'body' && key.column.index === this.columnList.length - 1 && key.row.index !== 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
          }
          if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
          }
        },
        body: [...this.bodyData],
      })
      this.bodyData = []
      this.count = 1

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      printFile('Bao_cao_doanh_so_cat.pdf', this.printerName, pdf)
      // for (let i = 0; i < 3; i += 1) {
      //   if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
      //     this.printerName = this.printerOptions.reportPrinterName
      //     const options = {
      //       fileName: 'bao_cao_doanh_so_cat',
      //       pageSizing: 'Fit',
      //       rotate: 'Rot90',
      //     }
      //     if (jspmCheckStatus()) {
      //       if (this.printerName.includes('PDF')) {
      //         pdf.save('bao_cao_doanh_so_cat.pdf')
      //       } else {
      //         jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
      //       }
      //     }
      //     break
      //   } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed && i === 2) {
      //     toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
      //     window.print()
      //   }
      // }
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
  border-style: solid;
  border-width: 2px;
  font-size: 17px;
}
td {
  border-style: dotted;
  border-width: 2px;
  font-size: 17px;
}

</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: landscape;
    }
body {
  -webkit-print-color-adjust: exact !important;
}
</style>
