<template>
  <b-container
    id="warehouses-output"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1 border-bottom-dark font-italic"
      align-h="around"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ inputOrderShopData.shopName }} </strong>
        <div> {{ inputOrderShopData.address }} </div>
        <div> Tel: {{ inputOrderShopData.phone }} - Fax: {{ inputOrderShopData.fax }}</div>
      </div>
      <div class="d-flex flex-column">
        <strong style="font-size: 20px"> CÔNG TY CP SỮA VIỆT NAM </strong>
        <div> Số 10 Tân Trào, Phường Tân Phú, Q7, Tp.HCM </div>
        <div> Tel: (84.8) 54 155 555 - Fax: (84.8) 54 161 226 </div>
      </div>
    </b-row>
    <!-- END - Header -->

    <!-- START - Title -->
    <b-row
      class="mx-0"
      align-h="start"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 30px">
          HOÁ ĐƠN XUẤT HÀNG
        </strong>
        <div class="font-italic">
          <b-row class="mx-0">
            <div class="width-100">
              Loại xuất hàng:
            </div>  <strong>{{ $getOutputTypeslabel( inputOrderInfoData.transType) }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="width-100">
              Mã xuất hàng:
            </div>  <strong>{{ inputOrderInfoData.transCode }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="width-100">
              Số PO:
            </div>  <strong>{{ inputOrderInfoData.poNumber }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="width-100">
              Số hóa đơn:
            </div>  <strong>{{ inputOrderInfoData.invoiceNumber }}</strong>
          </b-row>
        </div>
      </div>

      <div class="d-flex flex-column font-italic">
        <b-row
          class="mx-0"
        >
          <div class="width-120">
            Ngày xuất hàng:
          </div>
          <strong>{{ $formatISOtoVNI(inputOrderInfoData.transDate, true) }}</strong>
        </b-row>
        <b-row
          class="mx-0"
        >
          <div class="width-120">
            Số nội bộ:
          </div>
          <strong>{{ inputOrderInfoData.internalNumber }}</strong>
        </b-row>
        <b-row
          class="mx-0"
        >
          <div class="width-120">
            Ngày hóa đơn:
          </div>
          <strong>{{ $formatISOtoVNI(inputOrderInfoData.orderDate, true) }}</strong>
        </b-row>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table 1 -->
    <table
      v-for="item in inputOrderSaleProductsData"
      :key="item.type"
      class="mt-1"
    >
      <thead class="oblique">
        <tr>
          <td
            colspan="3"
            class="pl-1 border-right-0"
          >
            <div>Ngành hàng: <strong>{{ item.type }}</strong>
            </div>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0"
          >
            Tổng SL:
          </td>
          <td
            colspan="1"
            style="width: 1%"
            class="text-right border-right-0 border-left-0"
          >
            <strong class="pr-50">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0"
          >
            Tổng T.Tiền:
          </td>
          <td
            colspan="1"
            style="width: 1%"
            class="text-right pr-1 border-left-0"
          >
            <strong>{{ $formatNumberToLocale(item.totalPrice ) }}</strong>
          </td>
        </tr>
        <tr>
          <th>
            STT
          </th>
          <th
            class="px-50"
            style="width: 10%"
          >
            Mã SP
          </th>
          <th
            class="px-50"
            style="width: 40%"
          >
            Tên SP
          </th>
          <th
            class="px-50"
            style="width: 5%"
          >
            ĐVT
          </th>
          <th
            class="text-right px-50"
            style="width: 7%"
          >
            SL
          </th>
          <th
            class="text-right px-50"
            style="width: 15%"
          >
            Giá
          </th>
          <th
            class="text-right px-50"
            style="width: 30%"
          >
            T.Tiền
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(products, index) in item.products"
          :key="products.productCode"
        >
          <td class="px-1">
            {{ index + 1 }}
          </td>
          <td
            class="pl-50"
          >
            {{ products.productCode }}
          </td>
          <td
            class="px-50"
          >
            {{ products.productName }}
          </td>
          <td
            class="px-50"
          >
            {{ products.unit }}
          </td>
          <td
            class="text-right px-50"
          >
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td
            class="text-right px-50"
          >
            {{ $formatNumberToLocale(products.price) }}
          </td>
          <td
            class="text-right px-50"
          >
            {{ $formatNumberToLocale(products.totalPrice) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table 1 -->

    <!-- START - Fotter -->
    <b-row
      class="mx-0 mt-3"
      align-v="center"
      align-h="end"
    >
      <div>
        <strong class="oblique">Tổng SL</strong> <strong class="ml-2 mr-4">{{ $formatNumberToLocale(inputOrderInfoData.totalQuantity) }}</strong>
      </div>

      <div>
        <strong class="oblique">Tổng T.Tiền</strong> <strong class="ml-2">{{ $formatNumberToLocale(inputOrderInfoData.totalPrice) }}</strong>
      </div>
    </b-row>

    <b-col
      class="mx-0"
      style="width: 550px; word-wrap: break-word"
    >
      <ins class="oblique">Ghi chú:</ins>
      {{ inputOrderInfoData.note }}
    </b-col>

    <b-row
      class="m-5 text-uppercase"
      align-h="between"
    >
      <div>
        <p>Người nhận hàng</p>
        <br>
        <p>..................................</p>
      </div>
      <div>
        <p>Người xuất hàng</p>
        <br>
        <p>..................................</p>
      </div>
    </b-row>
    <!-- END - Fotter -->
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { printFile } from '@/@core/utils/utils'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import {
  WAREHOUSES_OUTPUT,
  // Getters
  PRINT_OUT_IN_PUT_ORDER_GETTER,
} from '@/views/warehouses/warehouses-output/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      printerName: '',
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      bodyData: [],
      count: 1,
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [PRINT_OUT_IN_PUT_ORDER_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    inputOrderShopData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.shop) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.shop
      }
      return {
        shopName: 'name',
        address: 'addres',
        phone: 'phone',
        fax: 'fax',
      }
    },
    inputOrderInfoData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.info) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.info
      }
      return {
        transType: 'type',
        transCode: 'transCode',
        pocoNumber: 'pocoNumber',
        invoiceNumber: 'invoiceNumber',
        transDate: 'transDate',
        internalNumber: 'internalNumber',
        orderDate: 'orderDate',
        totalQuantity: 'totalQuantity',
        totalPriceNotVat: 'totalPriceNotVat',
        totalPrice: 'totalPrice',
        totalPriceVat: 'totalPriceVat',
        note: 'note',
      }
    },
    inputOrderSaleProductsData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.saleProducts) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.saleProducts
      }
      return null
    },
    inputOrderPromotionProductsData() {
      if (this.PRINT_OUT_IN_PUT_ORDER_GETTER.promotionProducts) {
        return this.PRINT_OUT_IN_PUT_ORDER_GETTER.promotionProducts
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
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  mounted() {
  },
  updated() {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('p', 'mm', 'a4')
    // START - add font family
    pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
    pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
    pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
    pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
    pdf.setFont('Ario-Bold')
    this.createTable1(pdf)
    this.createTable2(pdf)

    if (this.inputOrderSaleProductsData && this.inputOrderSaleProductsData.length > 0) {
      this.inputOrderSaleProductsData.forEach(data => {
        const row = [
          { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
          { content: `${data.type}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
          { content: 'Tổng SL :', styles: { lineWidth: 0 } },
          { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
          { content: 'Tổng T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
          { content: `${this.$formatNumberToLocale(data.totalPrice)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
        ]
        this.bodyData.push(row)
        const title = [
          { content: 'STT', dataKey: 'STT', styles: { font: 'Ario-Bold' } },
          {
            content: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35, styles: { font: 'Ario-Bold' },
          },
          {
            content: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60, styles: { font: 'Ario-Bold' },
          },
          {
            content: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15, styles: { font: 'Ario-Bold' },
          },
          {
            content: 'SL', dataKey: 'SL', cellWidth: 15, styles: { font: 'Ario-Bold', halign: 'right' },
          },
          {
            content: 'Giá', dataKey: 'Giá', cellWidth: 20, styles: { font: 'Ario-Bold', halign: 'right' },
          },
          {
            content: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30, styles: { font: 'Ario-Bold', halign: 'right' },
          },
        ]
        this.bodyData.push(title)
        data.products.forEach(pro => {
          this.bodyData.push([
            { content: `${this.count}`, styles: { cellWidth: 10 } },
            { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
            { content: `${pro.productName}`, styles: { cellWidth: 60 } },
            { content: `${pro.unit}`, styles: { cellWidth: 20, halign: 'center' } },
            { content: `${pro.quantity}`, styles: { cellWidth: 15, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 30, halign: 'right' } },
            { content: `${this.$formatNumberToLocale(pro.totalPrice)}`, styles: { cellWidth: 30, halign: 'right' } },
          ])
          this.count += 1
        })
        pdf.autoTable({
          theme: 'grid',
          startY: pdf.previousAutoTable.finalY + 5,
          margin: {
            right: 10,
            left: 10,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 10,
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
    }

    const startYNote = pdf.previousAutoTable.finalY

    this.createTable3(pdf)
    pdf.setFontSize(10)
    pdf.setFont('Ario-Regular')
    pdf.text(`Ghi chú: ${this.inputOrderInfoData.note || ''}`, 10, startYNote + 24, {
      maxWidth: 60,
    })
    pdf.setFontSize(10)
    pdf.setFont('Ario-Regular')
    pdf.text('NGƯỜI NHẬN HÀNG', 25, pdf.previousAutoTable.finalY + 30)
    pdf.text('NGƯỜI XUẤT HÀNG', 163, pdf.previousAutoTable.finalY + 30)

    for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
      pdf.setPage(j)
      pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
    }
    printFile('Hoa_don_xuat_hang.pdf', this.printerName, pdf)
    this.count = 1
  },
  methods: {
    // Table 1
    createTable1(pdf) {
      const cellPadding = { cellPadding: 0.5 }
      const valignDef = { valign: 'middle' }
      const styleDef = { ...valignDef, ...cellPadding }
      pdf.autoTable({
        startY: 5,
        theme: 'plain',
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
        // title
          [
            { content: '', styles: { cellWidth: 20, ...cellPadding } },
            {
              content: `${this.inputOrderShopData.shopName}`,
              styles: {
                cellWidth: 70, font: 'Ario-Bold', fontSize: 12, ...styleDef,
              },
            },
            { content: '', styles: { cellWidth: 10, ...cellPadding } },
            {
              content: `${this.inputOrderShopData.parentShop.shopName}`,
              styles: {
                font: 'Ario-Bold', fontSize: 15, ...styleDef,
              },
            },
          ],
          // title
          [
            { content: '', styles: { cellWidth: 20, ...cellPadding } },
            {
              content: `${this.inputOrderShopData.address}`, styles: { ...styleDef },
            },
            { content: '', styles: { cellWidth: 10, ...cellPadding } },
            {
              content: `${this.inputOrderShopData.parentShop.address}`, styles: { ...styleDef },
            },
          ],
          [
            { content: '', styles: { cellWidth: 20, ...cellPadding } },
            {
              content: `Tel: ${this.inputOrderShopData.phone || ''} - Fax: ${this.inputOrderShopData.fax || ''}`, styles: { ...cellPadding },
            },
            { content: '', styles: { cellWidth: 10, ...cellPadding } },
            {
              content: `Tel: ${this.inputOrderShopData.parentShop.phone || ''} - Fax: ${this.inputOrderShopData.parentShop.fax || ''}`, styles: { ...cellPadding },
            },
          ],
        ],
      })
    },
    // Table 1

    // Table 2
    createTable2(pdf) {
      const cellPadding = { cellPadding: 0.5 }
      const valignDef = { valign: 'middle' }
      const styleDef = { ...valignDef, ...cellPadding }
      pdf.autoTable({
        startY: pdf.previousAutoTable.finalY,
        theme: 'plain',
        margin: {
          right: 10,
          left: 10,
        },
        Padding: 0,
        styles: {
          font: 'Ario-Regular',
          fontSize: 9,
          textColor: 'black',
        },
        didDrawCell: data => {
          if (data.section === 'body' && data.row.index === 0) {
            pdf.setDrawColor('black')
            pdf.setLineWidth(0.1)
            pdf.line(data.cell.x, data.cursor.y, data.cell.x + data.cell.width, data.cursor.y)
          }
        },
        body: [
        // title
          [
            { content: 'HÓA ĐƠN XUẤT HÀNG', colSpan: 4, styles: { font: 'Ario-Bold', fontSize: 20, cellPadding: { left: 0.5, top: 3, bottom: 2 } } },
          ],
          [
            { content: 'Loại xuất hàng:', styles: { cellWidth: 30, ...styleDef } },
            {
              content: `${this.$getOutputTypeslabel(this.inputOrderInfoData.transType)}`,
              styles: {
                cellWidth: 50, font: 'Ario-Bold', ...styleDef,
              },
            },
            { content: '', styles: { cellWidth: 30, ...styleDef } },
            { content: '', styles: { ...styleDef } },
          ],
          [
            { content: 'Mã xuất hàng:', styles: { ...styleDef } },
            { content: `${this.inputOrderInfoData.transCode}`, styles: { font: 'Ario-Bold', ...styleDef } },
            { content: 'Ngày xuất hàng:', styles: { ...styleDef } },
            { content: `${this.$formatISOtoVNI(this.inputOrderInfoData.transDate, true)}`, styles: { font: 'Ario-Bold', ...styleDef } },
          ],
          [
            { content: 'Số PO:', styles: { ...styleDef } },
            { content: this.inputOrderInfoData.poNumber === null ? '' : `${this.inputOrderInfoData.poNumber}`, styles: { font: 'Ario-Bold', ...styleDef } },
            { content: 'Số nội bộ:', styles: { ...styleDef } },
            { content: this.inputOrderInfoData.internalNumber === null ? '' : `${this.inputOrderInfoData.internalNumber}`, styles: { font: 'Ario-Bold', ...styleDef } },
          ],
          [
            { content: 'Số hóa đơn:', styles: { ...styleDef } },
            { content: `${this.inputOrderInfoData.invoiceNumber}`, styles: { font: 'Ario-Bold', ...styleDef } },
            { content: 'Ngày hóa đơn:', styles: { ...styleDef } },
            { content: `${this.$formatISOtoVNI(this.inputOrderInfoData.orderDate)}`, styles: { font: 'Ario-Bold', ...styleDef } },
          ],
        ],
      })
    },
    // Table 2

    // Table 3
    createTable3(pdf) {
      pdf.autoTable({
        theme: 'grid',
        startY: pdf.previousAutoTable.finalY + 10,
        margin: {
          right: 10,
          left: 10,
        },
        styles: {
          font: 'Ario-Bold',
          fontSize: 10,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng SL',
              styles: { halign: 'right', cellWidth: 112, lineWidth: 0 },
            },
            {
              content: `${this.$formatNumberToLocale(this.inputOrderInfoData.totalQuantity)}`,
              styles: {
                halign: 'right', font: 'Ario-Bold', fontSize: 11, cellWidth: 18, lineWidth: 0,
              },
            },
            {
              content: 'Tổng T.Tiền',
              styles: { halign: 'right', cellWidth: 29, lineWidth: 0 },
            },
            {
              content: `${this.$formatNumberToLocale(this.inputOrderInfoData.totalPrice)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fontSize: 11, cellWidth: 31, lineWidth: 0,
              },
            },
          ],
        ],
      })
    },
    // Table 3
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
td, .td {
  border-style: dotted;
  border-width: 1px;
}
.oblique {
  font-style: oblique;
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin: 2% 0;
        size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
