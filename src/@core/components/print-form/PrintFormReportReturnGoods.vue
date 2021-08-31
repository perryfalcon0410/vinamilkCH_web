<template>
  <b-container
    id="rp-return-goods"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 mt-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong
          style="font-size: 17px"
          class="mt-1"
        > {{ commonData.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonData.address }}
        </p>
        <p>
          Tel: {{ commonData.shopTel }}
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng trả lại </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày :{{ $formatISOtoVNI(commonData.fromDate) }}
          </p>
          <p>
            Đến ngày :{{ $formatISOtoVNI(commonData.toDate) }}
          </p>
        </b-row>
        <p>Ngày in : {{ $formatPrintDate(commonData.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonData.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0 second-sector width-100-per total"
      align-v="end"
      style="border-style: dashed; border-width: 1px 1px 0 1px"
    >
      <div
        style="visibility: hidden; width: 40%;"
      ><strong>Ngành hàng: A </strong>
      </div>
      <div
        style="width: 10.1%;"
        class="text-right text-nowrap italic"
      >Tổng SL:
      </div>
      <div
        style="width: 6.8%;"
        class="text-right"
      >
        <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</ins></strong>
      </div>
      <div
        style="width: 9.8%;"
        class="text-right text-nowrap italic"
      >Tổng T.Tiền:

      </div>
      <div
        style="width: 14%;"
        class="text-right"
      >
        <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</ins></strong>
      </div>
      <div
        style="width: 7.7%;"
        class="text-right text-nowrap italic"
      >Tổng TTL:

      </div>
      <div
        style="width: 10.9%;"
        class="text-right"
      > <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</ins></strong></div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <div
      v-for="(item,index) in reportProductData"
      :key="index"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per avoid-break"
        align-v="end"
        style="border-style: dashed; border-width: 1px 1px 0 1px"
      >
        <div
          style="width: 39.5%;"
          class="ml-50"
        ><strong><i>Ngành hàng: {{ item.category }} </i></strong>
        </div>
        <div
          style="width: 9.9%;"
          class="text-right text-nowrap italic"
        >Tổng SL:
        </div>
        <div
          style="width: 6.8%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
        </div>
        <div
          style="width: 9.8%;"
          class="text-right text-nowrap italic"
        >Tổng T.Tiền:

        </div>
        <div
          style="width: 14%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalAmount) }}</strong>
        </div>
        <div
          style="width: 7.7%;"
          class="text-right text-nowrap italic"
        > Tổng TTL:
        </div>
        <div
          style="width: 10.9%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalRefunds) }}</strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="order in item.orderReturnGoods"
        :key="order.returnNumber"
        class="px-0 pb-1"
      >
        <table>
          <!-- START - Header -->
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="10"
            >
              <b-row class="mx-0 width-100-per">
                <i class="mb-1 ml-50">
                  Mã trả hàng:{{ order.returnNumber }} - Mã hóa đơn:{{ order.orderNumber }} - KH: {{ order.customerName }}
                </i>
              </b-row>
              <b-row
                class="mx-0 width-100-per"
              >
                <div
                  style="width: 40%;"
                />
                <div
                  style="width: 10.1%;"
                  class="text-right text-nowrap italic"
                >Tổng SL:
                </div>
                <div
                  style="width: 6.8%;"
                  class="text-right"
                ><strong class="text-right">{{ $formatNumberToLocale(order.orderQuantity) }}</strong>
                </div>
                <div
                  style="width: 9.8%;"
                  class="text-right text-nowrap italic"
                >Tổng T.Tiền:
                </div>
                <div
                  style="width: 14%;"
                  class="text-right"
                ><strong>{{ $formatNumberToLocale(order.orderAmount) }}</strong>
                </div>
                <div
                  style="width: 7.7%;"
                  class="text-right text-nowrap italic"
                >
                  Tổng&nbsp;TTL:
                </div>
                <div
                  style="width: 10.9%;"
                  class="text-right"
                >
                  <strong> {{ $formatNumberToLocale(order.orderRefund) }}</strong>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->
          <!-- START - Header 2 -->
          <tr class="second-tr">
            <th
              style="width: 1%"
              class="px-50"
            >
              STT
            </th>
            <th
              style="width: 10%"
              class="px-50"
            >
              Mã SP
            </th>
            <th
              style="width: 27%"
              class="px-50"
            >
              Tên SP
            </th>
            <th
              style="width: 6%"
              class="px-50"
            >
              ĐVT
            </th>
            <th
              style="width: 7%"
              class="text-right px-50"
            >
              SL
            </th>
            <th
              style="width: 8.5%"
              class="text-right px-50 "
            >
              Giá
            </th>
            <th
              style="width: 14%"
              class="text-right px-50"
            >
              T.Tiền
            </th>
            <th
              style="width: 17%"
              class="text-right px-50 "
            >
              Tiền trả lại
            </th>
          </tr>
          <!-- END - Header 2 -->

          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product, stt) in order.reportPrintProductDTOS"
              :key="stt"
            >
              <td class="px-1">
                {{ product.len + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.unit }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.totalAmount) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.totalRefunds) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
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
import {
  jspmCheckStatus,
  jsPdfPrint,
} from '@core/utils/filter'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_RETURNED_GOODS,
  // Getters
  PRINT_INPUT_ORDER_DETIAL_GETTER,
  PRINT_RETURN_GOODS_GETTER,
} from '@/views/reports/reports-returned-goods/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printerName: null,
      reportProductData: [],
      bodyData: [],
      count: 1,
      checkHeight: true,
      checkHeader: true,
    }
  },
  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      PRINT_INPUT_ORDER_DETIAL_GETTER,
      PRINT_RETURN_GOODS_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    // get data print
    commonData() {
      if (this.PRINT_RETURN_GOODS_GETTER) {
        return this.PRINT_RETURN_GOODS_GETTER
      }
      return []
    },
    // get total info price
    totalInfoReturnedGood() {
      if (this.PRINT_RETURN_GOODS_GETTER.totalInfo) {
        return this.PRINT_RETURN_GOODS_GETTER.totalInfo
      }
      return {}
    },
    // get info print
    reportData() {
      if (this.PRINT_RETURN_GOODS_GETTER.data) {
        return this.PRINT_RETURN_GOODS_GETTER.data
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
    reportData() {
      this.reportProductData = [...this.reportData]
      let i = 0
      this.reportProductData.forEach(item => {
        item.orderReturnGoods.forEach(j => {
          j.reportPrintProductDTOS.forEach(x => {
            // eslint-disable-next-line no-param-reassign
            x.len = i
            i += 1
          })
        })
      })
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
      // END - add font family

      // START - hearder page
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13.5)
      pdf.text('Hàng trả lại', 110, 10)
      pdf.setFontSize(9.5)
      pdf.text(`${this.commonData.shopName}`, 5, 10)
      pdf.setFontSize(8.5)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.commonData.address}`, 5, 17)
      pdf.text(`Tel: ${this.commonData.shopTel}`, 5, 24)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.commonData.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.commonData.toDate)}`, 93, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.commonData.printDate)}`, 101, 24)
      // END - hearder page

      // START - table tổng đầu tiên
      this.createTable1(pdf)
      // END - table tổng đầu tiên

      // table 3
      this.createTable2(pdf)
      // table 3
      // end pager
      pdf.setFontSize(9)
      pdf.text('........, Ngày..... tháng..... năm.......', 135, pdf.previousAutoTable.finalY + 10)
      pdf.setFont('Ario-Bold')
      pdf.text('Người in', 20, pdf.previousAutoTable.finalY + 14)
      pdf.text('Cửa hàng trưởng', 147, pdf.previousAutoTable.finalY + 14)
      // end pager

      this.checkHeight = true
      const options = {
        fileName: 'Bao_cao_hang_tra_lai',
        pageSizing: 'Fit',
      }
      if (jspmCheckStatus()) {
        if (this.printerName.includes('PDF')) {
          pdf.save('Bao_cao_hang_tra_lai.pdf')
        } else {
          jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
        }
      }
    }
  },
  methods: {
    // tablle 1
    createTable1(pdf) {
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 5,
          left: 5,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 8,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng SL:',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 92 },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalInfoReturnedGood.totalQuantity)}`,
              styles: {
                halign: 'right', font: 'Ario-Bold', fillColor: [211, 211, 211], cellWidth: 15,
              },
            },
            {
              content: 'T.Tiền:',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 25 },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalInfoReturnedGood.totalAmount)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fillColor: [211, 211, 211], cellWidth: 30,
              },
            },
            {
              content: 'T.TL:',
              styles: { fillColor: [211, 211, 211], cellWidth: 20 },
            },
            {
              content: `${this.$formatNumberToLocale(this.totalInfoReturnedGood.totalRefunds)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fillColor: [211, 211, 211],
              },
            },
          ],
        ],
        didDrawCell: key => {
          if (key.section === 'body' && key.row.index === 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
          }
          if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
          }
          if (key.section === 'body' && key.column.index === 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
          }
          if (key.section === 'body' && key.column.index === 5) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
          }
        },
      })
    },
    // table 1
    // table 2
    createTable2(pdf) {
      this.reportProductData.forEach(item => {
        const startHeight = this.checkHeight ? { startY: pdf.previousAutoTable.finalY } : { }
        pdf.autoTable({
          ...startHeight,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 8,
            textColor: 'black',
          },
          body: [
            [
              {
                content: `Ngành hàng:  ${item.category}`,
                styles: { font: 'Ario-Bold', cellWidth: 77 },
              },
              {
                content: 'Tổng SL:',
                styles: { halign: 'right', cellWidth: 15 },
              },
              {
                content: `${this.$formatNumberToLocale(item.totalQuantity)}`,
                styles: {
                  halign: 'right', font: 'Ario-Bold', cellWidth: 15,
                },
              },
              {
                content: 'T.Tiền :',
                styles: { halign: 'right', cellWidth: 25 },
              },
              {
                content: `${this.$formatNumberToLocale(item.totalAmount)}`,
                styles: {
                  font: 'Ario-Bold', halign: 'right', cellWidth: 30,
                },
              },
              {
                content: 'T.TL:',
                styles: { cellWidth: 20 },
              },
              {
                content: `${this.$formatNumberToLocale(item.totalRefunds)}`,
                styles: {
                  font: 'Ario-Bold', halign: 'right',
                },
              },
            ],
          ],
          didDrawCell: key => {
            if (key.section === 'body' && key.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
            }
            if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
            }
            if (key.section === 'body' && key.column.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
            }
            if (key.section === 'body' && key.column.index === 6) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
            }
          },
        })
        item.orderReturnGoods.forEach(order => {
          const row1 = [
            {
              content: `Mã trả hàng:${order.returnNumber} - Mã hóa đơn:${order.orderNumber} - KH: ${order.customerName}`,
              colSpan: 9,
              styles: { lineWidth: 0 },
            },
          ]
          this.bodyData.push(row1)
          const row2 = [
            {
              content: '',
              colSpan: 3,
              styles: { lineWidth: 0 },
            },
            {
              content: 'Tổng SL:',
              styles: { lineWidth: 0, halign: 'right' },
            },
            {
              content: `${this.$formatNumberToLocale(order.orderQuantity)}`,
              styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
            },
            {
              content: 'Tổng T.Tiền:',
              styles: { lineWidth: 0, halign: 'right' },
            },
            {
              content: `${this.$formatNumberToLocale(order.orderAmount)}`,
              styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
            },
            {
              content: 'Tổng TTL:',
              styles: { lineWidth: 0, cellWidth: 20 },
            },
            {
              content: `${this.$formatNumberToLocale(order.orderRefund)}`,
              styles: { font: 'Ario-Bold', lineWidth: 0, halign: 'right' },
            },
          ]
          this.bodyData.push(row2)
          const title = [
            { content: 'STT', dataKey: 'STT', styles: { font: 'Ario-Bold' } },
            {
              content: 'Mã SP', dataKey: 'Mã SP', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Tên SP', dataKey: 'Tên SP', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'ĐVT', dataKey: 'ĐVT', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'SL', dataKey: 'SL', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Giá', dataKey: 'Giá', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'T.Tiền', dataKey: 'T.Tiền', styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Tiền trả lại', colSpan: 2, dataKey: 'T.Tiền', styles: { font: 'Ario-Bold' },
            },
          ]
          this.bodyData.push(title)
          order.reportPrintProductDTOS.forEach(pro => {
            this.bodyData.push([
              { content: `${this.count}`, styles: { cellWidth: 9 } },
              { content: `${pro.productCode}`, styles: { cellWidth: 18 } },
              { content: `${pro.productName}`, styles: { cellWidth: 50 } },
              { content: `${pro.unit}`, styles: { cellWidth: 15, halign: 'center' } },
              { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 25, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(pro.totalAmount)}`, styles: { cellWidth: 30, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(pro.totalRefunds)}`, colSpan: 2, styles: { halign: 'right' } },
            ])
            this.count += 1
          })
          const startY = this.checkHeader ? { startY: pdf.previousAutoTable.finalY } : { }
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
              fontSize: 8,
              textColor: 'black',
            },
            body: [...this.bodyData],
            didDrawCell: key => {
              if (key.section === 'body' && key.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              }
              if (key.section === 'body' && key.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              }
              if (key.section === 'body' && key.column.index === 8) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              }
              if (key.section === 'body' && key.column.index === 7 && key.row.index !== 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x + key.cell.width, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y)
              }
              if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
              }
              if (key.section === 'body' && key.row.index === 2) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
                if (key.column.index === 1 || key.column.index === 2 || key.column.index === 3 || key.column.index === 4 || key.column.index === 5 || key.column.index === 6 || key.column.index === 7) {
                  pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x, key.cell.y)
                }
              }
              if (key.section === 'body' && key.row.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
              }
            },
          })
          this.checkHeight = false
          this.checkHeader = false
          this.bodyData = []
        })
        this.checkHeader = true
      })
    },
    // table 2
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th {
  border-style: dashed;
  border-width: 1px;
  font-weight: normal;
}
.italic {
  font-style: italic;
}
td {
  border-style: dashed;
  border-width: 1px;
}
.second-tr th{
  border-style: solid;
  border-width: 2px;
  font-weight: bold;
}
.second-sector {
  border-top-style: none;
  border-right-style: dashed;
  border-left-style: dashed;
  border-width: 1px;
}
.total {
    background: rgb(192, 186, 186)
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 10px;
        margin-bottom: 0;
        size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
    table {
      page-break-inside: avoid;
      page-break-before: avoid;
    }
    .avoid-break {
      page-break-inside: avoid;
      page-break-after: avoid;
    }
</style>
