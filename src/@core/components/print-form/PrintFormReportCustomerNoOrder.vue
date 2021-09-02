<template>
  <b-container
    id="report-customers-no-order"
    fluid
    class="d-none d-print-block px-2 py-2 text-black report-customers py-2"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 19px"> {{ commonInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px">Báo cáo Khách hàng không có giao dịch</strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(commonInfo.fromDate) }} đến {{ $formatISOtoVNI(commonInfo.toDate) }}
        </p>
        <p>Ngày in : {{ $formatPrintDate(commonInfo.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 15px"> {{ commonInfo.shopName }} </strong>
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
          <tr>
            <th
              class="text-center"
              style="width: 5%"
            >
              STT
            </th>
            <th
              class="text-center"
              style="width:17%"
            >
              Mã KH
            </th>
            <th
              class="text-center"
              style="width: 30%;"
            >
              Tên KH
            </th>
            <th
              class="text-center"
              style="width: 48%;"
            >
              Địa chỉ
            </th>
          </tr>
          <!-- END - Header 2 -->
        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(customer,index) in reportData"
            :key="index"
          >
            <td class="text-right pr-50">
              {{ index + 1 }}
            </td>
            <td
              class="pl-40"
              style="width: 17%;"
            >
              {{ customer.customerCode }}
            </td>
            <td
              class="pl-40"
              style="width: 30%;"
            >
              {{ customer.customerName }}
            </td>
            <td
              class="pl-40"
              style="width: 48%;"
            >
              {{ customer.address }}
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
import {
  hostName,
} from '@core/utils/filter'
import { printFile } from '@/@core/utils/utils'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_CUSTOMERS_NON_TRANSACTIONAL,
  PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
} from '@/views/reports/reports-customers/reports-customers-non-transactional/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      ipAddress: '',
      bodyData: [],
      count: 1,
    }
  },
  computed: {
    ...mapGetters(REPORT_CUSTOMERS_NON_TRANSACTIONAL, [PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    commonInfo() {
      if (this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER) {
        return this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER
      }
      return {}
    },
    reportData() {
      if (this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.data) {
        return this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.data
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
    ipAddress() {
      this.GET_PRINTER_CLIENT_ACTIONS({
        data: {
          clientId: this.ipAddress,
        },
        onSuccess: () => {},
      })
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
    this.printerName = this.printerOptions.reportPrinterName
    if (this.printerName === '' || this.printerName === null || this.printerName === undefined) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      // END - add font family

      // START - hearder page
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Báo cáo KH không có giao dịch', 85, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.commonInfo.shopName}`, 10, 10)
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.commonInfo.address}`, 10, 17)
      pdf.text(`Tel: ${this.commonInfo.shopTel || ''}`, 10, 24)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.commonInfo.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.commonInfo.toDate)}`, 88, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.commonInfo.printDate)}`, 96, 24)
      // END - hearder page

      if (this.reportData && this.reportData.length > 0) {
        this.reportData.forEach(data => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { cellWidth: 15, halign: 'right' } },
            { content: `${data.customerCode}`, styles: { cellWidth: 35 } },
            { content: `${data.customerName}`, styles: { cellWidth: 45 } },
            { content: `${data.address}`, styles: { cellWidth: 95 } },
          ])
          this.count += 1
        })
        pdf.autoTable({
          theme: 'grid',
          showHead: 'firstPage',
          margin: {
            right: 10,
            left: 10,
          },
          startY: 37,
          headStyles: {
            fillColor: 'white',
            font: 'Ario-Bold',
            textColor: 'black',
            fontSize: 9,
            lineWidth: 0.1,
            lineColor: 'black',
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          didDrawCell: key => {
            if (key.section === 'body' && key.column.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
            }
            if (key.section === 'body' && key.column.index === 3) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
            }
            if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
            }
            if (key.section === 'body' && key.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y, key.cell.x + key.cell.width, key.cell.y)
            }
          },
          columns: [
            { header: 'STT', dataKey: 'STT', cellWidth: 15 },
            { header: 'Mã KH', dataKey: 'Mã KH', cellWidth: 35 },
            { header: 'Tên KH', dataKey: 'Tên KH', cellWidth: 45 },
            { header: 'Địa chỉ', dataKey: 'Địa chỉ', cellWidth: 95 },
          ],
          body: [...this.bodyData],
        })
        this.bodyData = []
      }

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      printFile('Bao_cao_khach_hang_khong_giao_dich.pdf', this.printerName, pdf)
      // for (let i = 0; i < 3; i += 1) {
      //   if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
      //     const options = {
      //       fileName: 'bao_cao_khach_hang_khong_giao_dich',
      //       pageSizing: 'Fit',
      //     }
      //     if (jspmCheckStatus()) {
      //       if (this.printerName.includes('PDF')) {
      //         pdf.save('bao_cao_khach_hang_khong_giao_dich.pdf')
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
  font-size: 14px;
}
td {
  border-style: dotted;
  border-width: 2px;
  word-wrap:break-word;
  font-size: 14px;
}
table {
  width:100%;
  table-layout:fixed;
}
</style>
<style type="text/scss" media="print">
    @page {
      margin-top: 2%;
      margin-bottom: 2%;
    }
</style>
