<template>
  <b-container
    id="rp-inventory"
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
          {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Tồn kho cửa hàng </strong>
        <p class="my-1">
          Ngày : {{ $formatISOtoVNI(commonInfo.date) }}
        </p>
        <p>Ngày in : {{ $formatPrintDate(commonInfo.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonInfo.shopName }}  </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section -->
    <b-row
      class="mx-0 mb-50 total-header"
      align-v="end"
    >
      <div
        class="ml-1"
        style="width: 44%"
      >
        <strong> {{ commonInfo.shopName }}  </strong>
      </div>
      <div
        style="width: 16.6%;"
        class="text-right font-italic"
      >Tổng SL:
      </div>
      <div
        style="width: 8%;"
        class="text-right"
      >
        <strong><ins> {{ $formatNumberToLocale(totalInfo.stockQuantity) }} </ins></strong>
      </div>
      <div
        style="width: 13%;"
        class="text-right font-italic"
      >Tổng T.Tiền:
      </div>
      <div
        style="width: 16.5%;"
        class="text-right"
      >
        <strong><ins> {{ $formatNumberToLocale(totalInfo.totalAmount) }} </ins></strong>
      </div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col
      v-for="(item,index) in reportData"
      :key="index"
      class="px-0 pb-1"
    >
      <b-row
        class="mx-0 width-100-per"
        style="border-width: 2px 2px 0 2px; border-style: solid;"
      >
        <div
          class="ml-1 font-italic"
          style="width: 10%"
        >Ngành hàng:
        </div>
        <div
          style="width: 34%;"
        >
          <strong>{{ item.category }}</strong>
        </div>
        <div
          style="width: 16.6%;"
          class="text-right font-italic"
        >
          Tổng SL:
        </div>
        <div
          style="width: 8%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
        </div>
        <div
          style="width: 13%;"
          class="text-right font-italic"
        >Tổng T.Tiền:
        </div>
        <div
          style="width: 16.5%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(item.totalAmount) }} </strong>
        </div>
      </b-row>
      <table>
        <!-- START - Header  -->
        <tr>
          <th
            class="stt px-50"
            style="width: 1%"
          >
            STT
          </th>
          <th
            class="px-50 dashed"
            style="width: 10%"
          >
            Mã SP
          </th>
          <th
            class="px-50 dashed"
            style="width: 34%"
          >
            Tên SP
          </th>
          <th
            class="px-50 dashed"
            style="width: 5%"
          >
            ĐVT
          </th>
          <th
            style="width: 7%"
            class="px-50 dashed text-right"
          >
            SL
          </th>
          <th
            class="text-right dashed px-50"
            style="width: 10%"
          >
            Giá
          </th>
          <th
            style="width: 15%"
            class="text-right total px-50"
          >
            T.Tiền
          </th>
        </tr>
        <!-- END - Header 2 -->
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(product,stt) in reportData[index].data"
            :key="stt"
          >
            <td
              class="px-1"
            >
              {{ product.len + 1 }}
            </td>
            <td class="pl-50">
              {{ product.productCode }}
            </td>
            <td class="px-50">
              {{ product.productName }}
            </td>
            <td class="px-50">
              {{ product.unit }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.stockQuantity) }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.price) }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.totalAmount) }}
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
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import JSPM from 'jsprintmanager'
import { printFile } from '@/@core/utils/utils'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_WAREHOUSES_INVENTORY,
  PRINT_REPORT_INVENTORY_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-inventory/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      count: 1,
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
      printerName: [],
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [PRINT_REPORT_INVENTORY_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    commonInfo() {
      if (this.PRINT_REPORT_INVENTORY_GETTER) {
        return this.PRINT_REPORT_INVENTORY_GETTER
      }
      return {}
    },
    totalInfo() {
      if (this.PRINT_REPORT_INVENTORY_GETTER.totalInfo) {
        return this.PRINT_REPORT_INVENTORY_GETTER.totalInfo
      }
      return {}
    },
    reportData() {
      if (this.PRINT_REPORT_INVENTORY_GETTER.dataByCat) {
        return this.PRINT_REPORT_INVENTORY_GETTER.dataByCat
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
        item.data.forEach(j => {
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
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Tồn Kho cửa hàng', 95, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.commonInfo.shopName}`, 10, 10)
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.commonInfo.address || ''}`, 10, 17)
      pdf.text(`Tel: ${this.commonInfo.shopTel || ''}`, 10, 24)
      pdf.text(`Ngày: ${this.$formatISOtoVNI(this.commonInfo.date)}`, 98, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.commonInfo.printDate)}`, 92, 24)
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 10,
          left: 10,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 8,
          textColor: 'black',
        },
        body: [
          [
            { content: `${this.commonInfo.shopName}`, styles: { font: 'Ario-Bold', cellWidth: 88, fillColor: [211, 211, 211] } },
            { content: 'Tổng SL :', styles: { cellWidth: 18, fillColor: [211, 211, 211] } },
            {
              content: `${this.$formatNumberToLocale(this.totalInfo.stockQuantity)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', cellWidth: 25, fillColor: [211, 211, 211],
              },
            },
            { content: 'Tổng T.Tiền :', styles: { halign: 'right', cellWidth: 25, fillColor: [211, 211, 211] } },
            {
              content: `${this.$formatNumberToLocale(this.totalInfo.totalAmount)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fillColor: [211, 211, 211],
              },
            },
          ],
        ],
      })

      if (this.reportData && this.reportData.length > 0) {
        this.reportData.forEach(data => {
          const startYTotal = (data === this.reportData[0]) ? { startY: pdf.previousAutoTable.finalY } : {}
          const row = [
            { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
            { content: `${data.category}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
            { content: 'Tổng SL :', styles: { lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            { content: 'Tổng T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(data.totalAmount)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
          ]
          this.bodyData.push(row)
          const title = [
            { content: 'STT', dataKey: 'STT', styles: { font: 'Ario-Bold' } },
            {
              content: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Tên SP', dataKey: 'Tên SP', cellWidth: 53, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'ĐVT', dataKey: 'ĐVT', cellWidth: 18, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'SL', dataKey: 'SL', cellWidth: 25, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Giá', dataKey: 'Giá', cellWidth: 25, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'T.Tiền', dataKey: 'T.Tiền', styles: { font: 'Ario-Bold' },
            },
          ]
          this.bodyData.push(title)
          data.data.forEach(pro => {
            this.bodyData.push([
              { content: `${this.count}`, styles: { cellWidth: 10 } },
              { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
              { content: `${pro.productName}`, styles: { cellWidth: 53 } },
              { content: `${pro.unit}`, styles: { cellWidth: 18, halign: 'center' } },
              { content: `${pro.stockQuantity}`, styles: { cellWidth: 25, halign: 'right' } },
              { content: pro.price === null ? '' : `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 25, halign: 'right' } },
              { content: pro.totalAmount === null ? '' : `${this.$formatNumberToLocale(pro.totalAmount)}`, styles: { halign: 'right' } },
            ])
            this.count += 1
          })
          pdf.autoTable({
            theme: 'grid',
            ...startYTotal,
            margin: {
              right: 10,
              left: 10,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 8,
              textColor: 'black',
            },
            didDrawCell: key => {
              if (key.section === 'body' && key.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cursor.y, key.cell.x + key.cell.width, key.cursor.y)
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
              if (key.section === 'body' && key.row.index === key.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(key.cell.x, key.cell.y + key.cell.height, key.cell.x + key.cell.width, key.cell.y + key.cell.height)
              }
            },
            body: [...this.bodyData],
          })
          this.bodyData = []
        })
        this.count = 1
      }

      if (pdf.previousAutoTable.finalY + 50 > pdf.internal.pageSize.getHeight()) {
        pdf.addPage()
        pdf.setFontSize(9)
        pdf.text('........, Ngày..... tháng..... năm.......', 135, 14)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, 18)
        pdf.text('Cửa hàng trưởng', 147, 18)
      } else {
        pdf.setFontSize(9)
        pdf.text('........, Ngày..... tháng..... năm.......', 135, pdf.previousAutoTable.finalY + 10)
        pdf.setFont('Ario-Bold')
        pdf.text('Người in', 20, pdf.previousAutoTable.finalY + 14)
        pdf.text('Cửa hàng trưởng', 147, pdf.previousAutoTable.finalY + 14)
      }

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      printFile('Bao_cao_ton_kho.pdf', this.printerName, pdf)
      // for (let i = 0; i < 3; i += 1) {
      //   if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {

      //     const options = {
      //       fileName: 'bao_cao_ton_kho',
      //       pageSizing: 'Fit',
      //     }
      //     if (jspmCheckStatus()) {
      //       if (this.printerName.includes('PDF')) {
      //         pdf.save('bao_cao_ton_kho.pdf')
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
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th {
  border-style: solid;
  border-width: 2px 1px;
}
td {
  border-style: dashed;
  border-width: 1px;
}
.dashed {
  border-left-style: dashed;
  border-right-style: dashed;
}
.stt {
  border-right-style: dashed;
  border-left-width: 2px;
}
.total {
  border-left-style: dashed;
  border-right-width: 2px;
}
.total-header{
  background: rgb(192, 186, 186);
  border-radius: 3px;
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 2%;
        size: portrait;
    }
    @page:bottom {
      content: counter(page) ' of ' counter(pages);
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
