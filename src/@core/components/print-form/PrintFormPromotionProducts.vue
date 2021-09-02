<template>
  <b-container
    id="rp-promotion-products"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ shopInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ shopInfo.address }}
        </p>
        <p>Tel: {{ shopInfo.phone }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng khuyến mãi </strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(commonInfo.fromDate) }} đến {{ $formatISOtoVNI(commonInfo.toDate) }}
        </p>
        <p>Ngày in : {{ $formatISOtoVNI(commonInfo.reportDate, true) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ shopInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section -->
    <b-row
      class="mx-0 mb-50 width-100-per total-header"
      align-v="end"
    >
      <div
        class="text-right"
        style="width: 99.1%"
      >
        <strong class="pr-5 font-italic">Tổng Cộng:</strong>
        <strong>{{ $formatNumberToLocale(commonInfo.totalQuantity) }}</strong>
      </div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col
      v-for="(item,index) in reportData"
      :key="index"
      class="px-0 pb-1"
    >
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="12"
            >
              <b-row
                class="mx-0 width-100-per"
              >
                <div
                  style="width: 30%"
                  class="pl-1"
                ><i>Ngành hàng:</i> <strong class="pl-2">{{ item.productCatName }}</strong>
                </div>
                <div
                  class="text-right"
                  style="width: 60.7%"
                ><i>Tổng Cộng:</i>
                </div>
                <div
                  class="text-right"
                  style="width: 8.7%"
                >
                  <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="stt px-50"
              style="width: 1%"
            >
              STT
            </th>
            <th
              class="dotted px-50"
              style="width: 20%"
            >
              Ngày bán
            </th>
            <th
              class="dotted px-50"
              style="width: 20%"
            >
              Hóa đơn
            </th>
            <th
              class="dotted px-50"
              style="width: 8%"
            >
              Mã SP
            </th>
            <th
              class="dotted px-50"
              style="width: 38.5%"
            >
              Tên SP
            </th>
            <th
              class="dotted px-50"
              style="width: 4%"
            >
              ĐVT
            </th>
            <th
              class="dotted px-50 sl text-right"
              style="width: 8%"
            >
              SL
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="product in reportData[index].productCats"
            :key="product.id"
          >
            <td class="text-center px-1">
              {{ product.len + 1 }}
            </td>
            <td class="px-50">
              {{ $moment(product.orderDate).locale('en').format('DD/MM/YYYY HH:mm:ss A') }}
            </td>
            <td class="px-50">
              {{ product.orderNumber }}
            </td>
            <td class="px-50">
              {{ product.productCode }}
            </td>
            <td class="px-50">
              {{ product.productName }}
            </td>
            <td class="px-50">
              {{ product.uom }}
            </td>
            <td class="text-right px-50">
              {{ product.quantity }}
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
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
import { printFile } from '@/@core/utils/utils'
import JSPM from 'jsprintmanager'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_WAREHOUSES_PROMOTIONS,

  PRINT_REPORT_PROMOTION_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-promotion/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printerName: null,
      bodyData: [],
      headerData: [],
      count: 1,
      checkHeight: true,
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_PROMOTIONS, [PRINT_REPORT_PROMOTION_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    commonInfo() {
      if (this.PRINT_REPORT_PROMOTION_GETTER) {
        return this.PRINT_REPORT_PROMOTION_GETTER
      }
      return {}
    },
    shopInfo() {
      if (this.PRINT_REPORT_PROMOTION_GETTER.shop) {
        return this.PRINT_REPORT_PROMOTION_GETTER.shop
      }
      return {}
    },

    reportData() {
      if (this.PRINT_REPORT_PROMOTION_GETTER.productCats) {
        return this.PRINT_REPORT_PROMOTION_GETTER.productCats
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
    reportData() {
      this.reportProductData = [...this.reportData]
      let i = 0
      this.reportProductData.forEach(item => {
        item.productCats.forEach(j => {
          // eslint-disable-next-line no-param-reassign
          j.len = i
          i += 1
        })
      })
    },
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
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
      this.createHeader(pdf)
      this.createTableFirst(pdf)
      this.createTableSecond(pdf)
      this.createFooter(pdf)
      printFile('Bao_cao_hang_khuyen_mai.pdf', this.printerName, pdf)
      // for (let i = 0; i < 3; i += 1) {
      //   if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {

      //     const options = {
      //       fileName: 'bao_cao_hang_khuyen_mai',
      //       pageSizing: 'Fit',
      //     }
      //     if (jspmCheckStatus()) {
      //       if (this.printerName.includes('PDF')) {
      //         pdf.save('bao_cao_hang_khuyen_mai.pdf')
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
    createHeader(pdf) {
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13.5)
      pdf.text('Hàng khuyến mãi', 90, 10)
      pdf.setFontSize(9.5)
      pdf.text(`${this.shopInfo.shopName}`, 5, 10)
      pdf.setFontSize(8.5)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.shopInfo.address || ''}`, 5, 16)
      pdf.text(`Tel: ${this.shopInfo.phone || ''}`, 5, 22)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.commonInfo.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.commonInfo.toDate)}`, 80, 16)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.commonInfo.printDate)}`, 87, 22)
    },
    createTableFirst(pdf) {
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 5,
          left: 5,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 9,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng Cộng:',
              styles: {
                halign: 'right', fillColor: [211, 211, 211], lineWidth: 0, cellWidth: 187,
              },
            },
            {
              content: `${this.$formatNumberToLocale(this.commonInfo.totalQuantity)}`,
              styles: {
                halign: 'right', font: 'Ario-Bold', fillColor: [211, 211, 211], lineWidth: 0,
              },
            },
          ],
        ],
      })
    },
    createTableSecond(pdf) {
      this.reportData.forEach(item => {
        const header1 = [
          {
            content: '',
            styles: { lineWidth: 0 },
          },
          {
            content: 'Ngành hàng:',
            styles: { lineWidth: 0 },
          },
          {
            content: `${item.productCatName}`,
            styles: { lineWidth: 0, font: 'Ario-Bold' },
          },
          {
            content: 'Tổng cộng:',
            colSpan: 3,
            styles: { lineWidth: 0, halign: 'right' },
          },
          {
            content: `${this.$formatNumberToLocale(item.totalQuantity)}`,
            styles: { lineWidth: 0, font: 'Ario-Bold', halign: 'right' },
          },
        ]
        this.bodyData.push(header1)
        const title = [
          { content: 'STT', styles: { font: 'Ario-Bold', cellWidth: 10 } },
          { content: 'Ngày bán', styles: { font: 'Ario-Bold', cellWidth: 40 } },
          { content: 'Hóa đơn', styles: { font: 'Ario-Bold', halign: 'center', cellWidth: 40 } },
          {
            content: 'Mã SP', styles: { font: 'Ario-Bold', cellWidth: 15 },
          },
          {
            content: 'Tên SP', styles: { font: 'Ario-Bold', cellWidth: 70 },
          },
          {
            content: 'ĐVT', styles: { font: 'Ario-Bold', cellWidth: 12 },
          },
          {
            content: 'SL', styles: { font: 'Ario-Bold', halign: 'center' },
          },
        ]
        this.bodyData.push(title)
        item.productCats.forEach(pro => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { } },
            { content: `${this.$moment(pro.orderDate).locale('en').format('DD/MM/YYYY HH:mm:ss A')}`, styles: { } },
            { content: `${pro.orderNumber}`, styles: { } },
            { content: `${pro.productCode}`, styles: { } },
            { content: `${pro.productName}`, styles: { } },
            { content: `${pro.uom}`, styles: { } },
            { content: `${this.$formatNumberToLocale(pro.quantity) || ''}`, styles: { halign: 'right' } },
          ])
          this.count += 1
        })
        const startY = this.checkHeight ? { startY: pdf.previousAutoTable.finalY } : { }
        pdf.autoTable({
          theme: 'grid',
          ...startY,
          rowPageBreak: 'avoid',
          margin: {
            right: 5,
            left: 5,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 8,
            textColor: 'black',
          },
          body: [...this.bodyData],
          didDrawCell: key => {
            if (key.section === 'body' && key.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              if (key.column.index === 5) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              }
            }
            if (key.section === 'body' && key.column.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
            }
            if (key.section === 'body' && key.row.index === 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              if (key.column.index === 1 || key.column.index === 2 || key.column.index === 3 || key.column.index === 4 || key.column.index === 5 || key.column.index === 6) {
                pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
              }
            }
            if (key.section === 'body' && key.row.index === 2) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
            }
            if (key.section === 'body' && key.column.index === 6) {
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
        })
        this.bodyData = []
        this.checkHeight = false
      })
      this.checkHeight = true
      this.count = 1
    },
    createFooter(pdf) {
      if (pdf.previousAutoTable.finalY + 40 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage()
        pdf.setFontSize(9)
        pdf.setFont('Ario-Regular')
        pdf.text('........, Ngày..... tháng..... năm.......', 135, 14)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, 18)
        pdf.text('Cửa hàng trưởng', 147, 18)
      } else {
        pdf.setFontSize(9)
        pdf.setFont('Ario-Regular')
        pdf.text('........, Ngày..... tháng..... năm.......', 135, pdf.previousAutoTable.finalY + 10)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, pdf.previousAutoTable.finalY + 14)
        pdf.text('Cửa hàng trưởng', 147, pdf.previousAutoTable.finalY + 14)
      }

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.setFont('Ario-Regular')
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 13, pdf.internal.pageSize.getHeight() - 10)
      }
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
  border-width: 1px;
}
td {
  border-style: dashed;
  border-width: 1px;
}
thead tr{
  border-style: solid;
  border-color: black;
  border-width: 2px;
  font-weight: bold;
  border-radius: 2px;
}
.dotted {
  border-left-style: dashed;
  border-right-style: dashed;
}
.stt {
  border-right-style: dashed;
}
.sl{
  border-right-style: solid;
  border-right-width: 2px;
}
.total {
  border-left-style: dashed;
}
.total-header {
    background: rgb(192, 186, 186);
    border-radius: 3px;
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
