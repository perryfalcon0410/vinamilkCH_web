<template>
  <b-container
    id="print-form-diff-price"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.phone }} </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> BÁO CÁO CHÊNH LỆCH GIÁ </strong>
        <p class="my-1">
          Từ ngày: {{ $formatISOtoVNI(totalData.fromDate) }} <span class="pl-1">Đến ngày: {{ $formatISOtoVNI(totalData.toDate) }}</span>
        </p>
        <p>Ngày in: {{ $formatPrintDate(totalData.reportDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total view -->
    <b-row
      class="mx-0 width-100-per text-right"
      style="background: rgb(192, 186, 186)"
    >
      <span style="width: 51.8%; font-size: 15px">
        <i>Tổng cộng:</i>
      </span>
      <strong style="width: 8%">{{ $formatNumberToLocale(totalData.totalQuantity) }}</strong>
      <strong style="width: 14.9%">{{ $formatNumberToLocale(totalData.totalPriceInput) }}</strong>
      <strong style="width: 14.9%">{{ $formatNumberToLocale(totalData.totalPriceOutput) }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 2 -->
    <div
      v-for="(item,index) in reportData"
      :key="index"
    >
      <b-col class="px-0 mx-0 pb-1">
        <table>
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.response.redInvoiceNo }} - Ngày HĐ: {{ $formatISOtoVNI(item.response.orderDate) }} - Số PO: {{ item.response.poNumber }} - Số nội bộ: {{ item.response.internalNumber }} - Mã nhập hàng: {{ item.response.transCode }}
                </strong>
                <b-row
                  class="mx-0 width-100-per text-right"
                >
                  <span style="width: 51.9%;">
                    <i
                      style="font-weigth: normal;"
                      class="normal-font"
                    >Tổng cộng:</i>
                  </span>
                  <span
                    style="width: 8%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalQuantity) }}
                  </span>
                  <span
                    style="width: 15%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalPriceInput) }}
                  </span>
                  <span
                    style="width: 15%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalPriceOutput) }}
                  </span>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 10%"
              >
                Mã SP
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 35%"
              >
                Tên SP
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                ĐVT
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                SL
              </th>
              <th
                colspan="2"
                class="text-center"
                style="width: 15%"
              >
                Đầu vào
              </th>
              <th
                colspan="2"
                class="text-center"
                style="width: 15%"
              >
                Đầu ra
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                Chênh lệch
              </th>
            </tr>
            <!-- END - Header 2 -->

            <!-- START - Header 3 -->
            <tr>
              <!-- Đầu vào -->
              <th
                class="text-center"
                style="width: 7%"
              >
                Giá
              </th>
              <th
                class="text-center"
                style="width: 8%"
              >
                T.Tiền
              </th>
              <!-- Đầu ra -->
              <th
                class="text-center"
                style="width: 7%"
              >
                Giá
              </th>
              <th
                class="text-center"
                style="width: 8%"
              >
                T.Tiền
              </th>
            </tr>
          <!-- END - Header 3 -->
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in reportData[index].info"
              :key="product.id"
            >
              <td
                class="text-right pr-40"
              >
                {{ stt + 1 }}
              </td>
              <td>
                {{ product.productCode }}
              </td>
              <td>
                {{ product.productName }}
              </td>
              <td>
                {{ product.unit }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.inputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalInput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.outputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalOutput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.priceChange) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import JSPM from 'jsprintmanager'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import toasts from '@/@core/utils/toasts/toasts'
import { printFile } from '@/@core/utils/utils'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,

  PRINT_REPORT_DIFFERENCE_GETTER,
} from '@/views/reports/reports-warehouses/report-warehouses-price-difference/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dataPrintOptions: {},
      printerName: '',
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          width: '140px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          type: 'date',
          dateInputFormat: 'dd/MM/yyyy',
          dateOutputFormat: 'dd/MM/yyyy',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      bodyData: [],
      count: 1,
      checkHeader: true,
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [PRINT_REPORT_DIFFERENCE_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    reportData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.details
      }
      return []
    },
    totalData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER
      }
      return {}
    },
    commonInfo() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER.shop) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.shop
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
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },

  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null || this.printerName === undefined) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      // END - add font family
      // START - hearder page
      this.createHeader(pdf)
      // END - hearder page
      this.createTableFirst(pdf)
      this.createTableSecond(pdf)
      printFile('Bao_cao_chenh_lech_gia.pdf', this.printerName, pdf)
      // for (let i = 0; i < 3; i += 1) {
      //   if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {

      //     pdf.save()
      //     const options = {
      //       fileName: 'Bao_cao_chenh_lech_gia',
      //       pageSizing: 'Fit',
      //     }
      //     if (jspmCheckStatus()) {
      //       if (this.printerName.includes('PDF')) {
      //         pdf.save('Bao_cao_chenh_lech_gia.pdf')
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
      pdf.text('BÁO CÁO CHÊNH LỆCH GIÁ', 90, 10)
      pdf.setFontSize(9.5)
      pdf.text(`${this.commonInfo.shopName}`, 5, 10)
      pdf.setFontSize(8.5)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.commonInfo.address || ''}`, 5, 17)
      pdf.text(`Tel: ${this.commonInfo.phone || ''}`, 5, 24)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.totalData.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.totalData.toDate)}`, 91, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.totalData.printDate)}`, 98, 24)
    },
    createTableFirst(pdf) {
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 5,
          left: 5,
        },
        styles: {
          font: 'Ario-Bold',
          fontSize: 8.5,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng cộng:',
              styles: {
                halign: 'right', fillColor: [211, 211, 211], cellWidth: 88, lineWidth: 0,
              },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalData.totalQuantity) || ''}`,
              styles: {
                halign: 'right', fillColor: [211, 211, 211], lineWidth: 0, cellWidth: 17,
              },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalData.totalPriceInput) || ''}`,
              styles: {
                halign: 'right', fillColor: [211, 211, 211], lineWidth: 0, cellWidth: 37,
              },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalData.totalPriceOutput) || ''}`,
              styles: {
                halign: 'right', fillColor: [211, 211, 211], lineWidth: 0, cellWidth: 37,
              },
            },
            {
              content: '',
              styles: {
                halign: 'right', fillColor: [211, 211, 211], lineWidth: 0,
              },
            },
          ],
        ],
      })
    },
    createTableSecond(pdf) {
      this.reportData.forEach(order => {
        const row1 = [
          {
            content: `Số HĐ:${order.response.redInvoiceNo} - Ngày HĐ: ${this.$formatISOtoVNI(order.response.orderDate)} - Số PO: ${order.response.poNumber} - Số nội bộ: ${order.response.internalNumber} - Mã nhập hàng: ${order.response.transCode}`,
            colSpan: 10,
            styles: { lineWidth: 0, font: 'Ario-Bold' },
          },
        ]
        this.bodyData.push(row1)
        const border = { lineColor: 'black', lineWidth: 0.1 }
        const row2 = [
          {
            content: 'Tổng cộng:',
            colSpan: 4,
            styles: { lineWidth: 0, halign: 'right' },
          },
          {
            content: `${this.$formatNumberToLocale(order.response.totalQuantity)}`,
            styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
          },
          {
            content: `${this.$formatNumberToLocale(order.response.totalPriceInput)}`,
            colSpan: 2,
            styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
          },
          {
            content: `${this.$formatNumberToLocale(order.response.totalPriceOutput)}`,
            colSpan: 2,
            styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
          },
          {
            content: '',
            styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
          },
        ]
        this.bodyData.push(row2)
        const title = [
          {
            content: 'STT',
            rowSpan: 2,
            styles: {
              ...border, font: 'Ario-Bold', halign: 'center', valign: 'middle',
            },
          },
          {
            content: 'Mã SP', rowSpan: 2, styles: { ...border, font: 'Ario-Bold', valign: 'middle' },
          },
          {
            content: 'Tên SP', rowSpan: 2, styles: { ...border, font: 'Ario-Bold', valign: 'middle' },
          },
          {
            content: 'ĐVT', rowSpan: 2, styles: { ...border, font: 'Ario-Bold', valign: 'middle' },
          },
          {
            content: 'SL',
            rowSpan: 2,
            styles: {
              ...border, font: 'Ario-Bold', halign: 'right', valign: 'middle',
            },
          },
          {
            content: 'Đầu vào', colSpan: 2, styles: { ...border, font: 'Ario-Bold', halign: 'center' },
          },
          {
            content: 'Đầu ra', colSpan: 2, styles: { ...border, font: 'Ario-Bold', halign: 'center' },
          },
          {
            content: 'Chênh lệch',
            rowSpan: 2,
            styles: {
              ...border, font: 'Ario-Bold', halign: 'center', valign: 'middle',
            },
          },
        ]
        this.bodyData.push(title)
        const title1 = [
          {
            content: 'Giá', styles: { ...border, font: 'Ario-Bold', halign: 'right' },
          },
          {
            content: 'T.Tiền', styles: { ...border, font: 'Ario-Bold', halign: 'right' },
          },
          {
            content: 'Giá', styles: { ...border, font: 'Ario-Bold', halign: 'right' },
          },
          {
            content: 'T.Tiền', styles: { ...border, font: 'Ario-Bold', halign: 'right' },
          },
        ]
        this.bodyData.push(title1)
        order.info.forEach(pro => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { cellWidth: 9 } },
            { content: `${pro.productCode}`, styles: { cellWidth: 18 } },
            { content: `${pro.productName}`, styles: { cellWidth: 48 } },
            { content: `${pro.unit}`, styles: { cellWidth: 13, halign: 'center' } },
            { content: `${this.$formatNumberToLocale(pro.quantity) || ''}`, styles: { cellWidth: 17, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.inputPrice) || ''}`, styles: { cellWidth: 17, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.totalInput) || ''}`, styles: { cellWidth: 20, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.outputPrice) || ''}`, styles: { cellWidth: 17, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.totalOutput) || ''}`, styles: { cellWidth: 20, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.priceChange) || ''}`, styles: { halign: 'right' } },
          ])
          this.count += 1
        })
        const startY = this.checkHeader ? { startY: pdf.previousAutoTable.finalY + 1 } : { }
        pdf.autoTable({
          theme: 'grid',
          ...startY,
          pageBreak: 'avoid',
          margin: {
            right: 5,
            left: 5,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 8.5,
            textColor: 'black',
          },
          body: [...this.bodyData],
          didDrawCell: key => {
            if (key.section === 'body' && key.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              if (key.column.index === 0) {
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              }
            }
            if (key.section === 'body' && key.column.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
            }
            if (key.section === 'body' && key.column.index === 9) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
            }
            if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
            }

            if (key.section === 'body' && key.row.index === 4) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
            }
          },
        })
        this.bodyData = []
        this.checkHeader = false
      })
      this.checkHeader = true
      this.count = 1

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
th {
  border-style: solid;
  border-width: 2px;
}
td {
  border-style: dotted;
  border-width: 2px;
  word-wrap: break-word;
}
table {
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
}
.normal-font {
  font-weight: normal;
}
</style>
