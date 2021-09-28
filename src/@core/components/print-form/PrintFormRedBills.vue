<template>
  <div
    id="rp-sales-redbill"
    class="d-none d-print-block text-black mx-0 mt-5"
  >
    <div style="min-height: 800px">
      <b-row
        align-h="around"
        class="mb-5"
      >
        <div class="text-center">
          <p>MT1008</p>
          <div>CÔNG TY CỔ PHẦN SỮA VIỆT NAM</div>
          <div>Số 10 Tân Trào, Phường Tân Phú, Quận 7, TP.HCM</div>
          <div class="text-left">
            0300588569
          </div>
        </div>

        <div>
          {{ $moment().format("DD") }}
        </div>
        <div>
          {{ $moment().format("MM") }}
        </div>
        <div>
          {{ $moment().format("YYYY") }}
        </div>
        <!-- <div>tháng {{ $moment().format('MM') }}</div>
        <div>năm {{ $moment().format('YYYY') }}</div> -->
        <div>Số HĐ: {{ redBillInfoData.redInvoiceNumber }}</div>
      </b-row>

      <b-row
        class="mx-0 mt-5 mb-5"
        align-h="around"
        align-v="center"
      >
        <div>
          <div>{{ redBillInfoData.shopName }}</div>
          <div>{{ redBillInfoData.shopAddress }}</div>
          <div>{{ redBillInfoData.shopTel }}</div>
        </div>
        <div>Tiền mặt</div>
        <div style="width: 6%">
          <!-- {{ $formatNumberToLocale(redBillInfoData.amount) }} -->
        </div>
      </b-row>

      <table
        id="red-bill-table"
        class="mt-5 align-text-bottom"
      >
        <tbody>
          <tr
            v-for="(item, index) in redBillData"
            :key="item.productCode"
          >
            <td>{{ index + 1 }}</td>
            <td style="max-width: 150px">
              {{ item.productName }}
            </td>
            <td>{{ item.productCode }}</td>
            <td>{{ item.uom1 }}</td>
            <td class="text-right">
              {{ item.quantity }}
            </td>
            <td class="text-right">
              {{ $formatNumberToLocale(item.price) }}
            </td>
            <td class="text-right">
              {{ $formatNumberToLocale(item.intoMoney) }}
            </td>
            <td class="text-left pl-1">
              {{ item.note }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-row
        class="mx-0 mt-5 text-center"
        align-v="end"
      >
        <div class="width-50-per">
          <div class="d-flex text-right">
            <div class="width-80-per" />
            <div class="width-20-per pr-5">
              10
            </div>
          </div>
          <div class="d-flex text-left">
            <div class="width-70-per" />
            <div class="width-30-per pl-4">
              {{ count }}
            </div>
          </div>
        </div>
        <div class="width-45-per">
          <div class="text-right">
            {{ $formatNumberToLocale(redBillInfoData.amount) }}
          </div>
          <div class="text-right">
            {{ $formatNumberToLocale(redBillInfoData.valueAddedTax) }}
          </div>
          <div class="text-right">
            {{ $formatNumberToLocale(redBillInfoData.totalAmountNumber) }}
          </div>
        </div>
      </b-row>
      <b-row
        class="mx-0 text-center"
        align-v="end"
      >
        <div class="text-right width-60-per">
          {{ redBillInfoData.totalAmountString }}
        </div>
      </b-row>
      <b-row
        class="mx-0 mt-5 text-center"
        align-h="end"
        align-v="end"
      >
        <b-col
          class="text-center width-60-per"
          cols="4"
        >
          Nguyễn Thị Thu Vân
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { printFile } from '@/@core/utils/utils'
import { formatDotNumberToLocale } from '@/@core/utils/filter'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import {
  RED_INVOICE,
  // Getters
  PRINT_RED_INVOICES_GETTER,
} from '@/views/sales/sales-red-bills/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      count: 0,
      printerName: '',
      bodyData: [],
    }
  },
  computed: {
    ...mapGetters(RED_INVOICE, [PRINT_RED_INVOICES_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    redBillInfoData() {
      if (this.PRINT_RED_INVOICES_GETTER.info) {
        return this.PRINT_RED_INVOICES_GETTER.info
      }
      return {}
    },
    redBillData() {
      if (this.PRINT_RED_INVOICES_GETTER.response) {
        return this.PRINT_RED_INVOICES_GETTER.response
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
    redBillData() {
      this.count = this.redBillData.length
    },
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  updated() {
    this.generatePdf()
    this.bodyData = []
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

    generatePdf() {
      const x = 10
      const y = 20
      this.redBillData.forEach((item, index) => {
        const row = [
          { content: index + 1, styles: { lineWidth: 0 } },
          { content: item.productName, styles: { lineWidth: 0 } },
          { content: item.productCode, styles: { lineWidth: 0 } },
          { content: item.uom1, styles: { lineWidth: 0 } },
          { content: formatDotNumberToLocale(item.quantity), styles: { lineWidth: 0 } },
          { content: formatDotNumberToLocale(item.price), styles: { lineWidth: 0 } },
          { content: formatDotNumberToLocale(item.intoMoney), styles: { lineWidth: 0 } },
          { content: item.note, styles: { lineWidth: 0 } },
        ]
        this.bodyData.push(row)
      })
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      // END - add font family
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`${this.redBillInfoData.parentShopCode}`, x + 40, y)
      pdf.text(`${this.$moment().format('DD')}`, x + 95, y)
      pdf.text(`${this.$moment().format('MM')}`, x + 110, y)
      pdf.text(`${this.$moment().format('YYYY')}`, x + 125, y)
      pdf.text(`Số HĐ: ${this.redBillInfoData.redInvoiceNumber}`, x + 140, y)
      pdf.text('CÔNG TY CỔ PHẦN SỮA VIỆT NAM', x + 25, y + 10)
      pdf.text(
        `${this.redBillInfoData.parentShopAddress}`,
        x + 15,
        y + 15,
      )
      pdf.text(`${this.redBillInfoData.parentShopTel || ''}`, x + 15, y + 20)
      pdf.text(`${this.redBillInfoData.shopName}`, x + 15, y + 52)
      pdf.text(`${this.redBillInfoData.shopAddress}`, x + 15, y + 57)
      pdf.text(`${this.redBillInfoData.shopTel || ''}`, x + 20, y + 62)
      pdf.text('Tiền mặt', x + 90, y + 62)
      pdf.autoTable({
        startY: y + 90,
        theme: 'plain',
        margin: {
          right: 15,
          left: 15,
        },
        styles: {
          font: 'Ario-Regular',
          Color: [255, 0, 0],
          fontSize: 8,
          textColor: 'black',
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 40 },
          2: { cellWidth: 25 },
          3: { cellWidth: 12 },
          4: { cellWidth: 15 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
          7: { cellWidth: 29 },
          8: { cellWidth: 29 },
        },
        body: [...this.bodyData],
      })
      pdf.text(`${formatDotNumberToLocale(this.redBillInfoData.totalQuantity)}`, x + 90, pdf.previousAutoTable.finalY + 75)
      pdf.text(`${this.count}`, x + 40, pdf.previousAutoTable.finalY + 80)
      pdf.text(
        `${this.redBillInfoData.totalAmountString}`,
        x + 30,
        pdf.previousAutoTable.finalY + 85,
      )
      pdf.text(
        `${formatDotNumberToLocale(this.redBillInfoData.amount)}`,
        x + 150,
        pdf.previousAutoTable.finalY + 75,
      )
      pdf.text(
        `${formatDotNumberToLocale(this.redBillInfoData.valueAddedTax)}`,
        x + 150,
        pdf.previousAutoTable.finalY + 80,
      )
      pdf.text(
        `${formatDotNumberToLocale(this.redBillInfoData.totalAmountNumber)}`,
        x + 150,
        pdf.previousAutoTable.finalY + 85,
      )
      // const options = {
      //   fileName: 'Hoa_don_do',
      //   pageSizing: 'Fit',
      // }
      printFile('Hoa_don_do.pdf', this.printerName, pdf)
      // if (jspmCheckStatus()) {
      //   if (this.printerName.includes('PDF')) {
      //     pdf.save('Hoa_don_do.pdf')
      //   } else { jsPdfPrint(pdf.output('datauristring'), this.printerName, options) }
      // }
      this.bodyData = []
    },
  },
}
</script>

<style>
table {
  width: 100%;
}
</style>
