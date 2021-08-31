<template>
  <b-container
    id="print-form-input-order"
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
        <strong style="font-size: 17px; font-style: italic"> {{ inputOrderShopData.shopName }} </strong>
        <div> {{ inputOrderShopData.address }} </div>
        <div> Tel: {{ inputOrderShopData.phone }} - Fax: {{ inputOrderShopData.fax }}</div>
      </div>
      <div class="d-flex flex-column">
        <strong style="font-size: 20px; font-style: italic"> CÔNG TY CP SỮA VIỆT NAM </strong>
        <i> Số 10 Tân Trào, Phường Tân Phú, Q7, Tp.HCM </i>
        <i> Tel: (84.8) 54 155 555 - Fax: (84.8) 54 161 226 </i>
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
          HOÁ ĐƠN NHẬP HÀNG
        </strong>
        <div class="font-italic">
          <b-row class="mx-0">
            <div class="w-35">
              Loại nhập hàng:
            </div>  <strong>{{ $getInputTypeslabel(inputOrderInfoData.transType) }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="w-35">
              Mã nhập hàng:
            </div>  <strong>{{ inputOrderInfoData.transCode }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="w-35">
              Số PO:
            </div>  <strong>{{ inputOrderInfoData.poNumber }}</strong>
          </b-row>
          <b-row class="mx-0">
            <div class="w-35">
              Số hóa đơn:
            </div>  <strong>{{ inputOrderInfoData.invoiceNumber }}</strong>
          </b-row>
        </div>
      </div>

      <div class="d-flex flex-column w-50 font-italic">
        <b-row class="mx-0">
          <div class="w-25">
            Ngày nhập:
          </div>  <strong>{{ $formatISOtoVNI(inputOrderInfoData.transDate, true) }}</strong>
        </b-row>
        <b-row class="mx-0">
          <div class="w-25">
            Số nội bộ:
          </div>  <strong>{{ inputOrderInfoData.internalNumber }}</strong>
        </b-row>
        <b-row class="mx-0">
          <div class="w-25">
            Ngày hóa đơn:
          </div>  <strong>{{ $formatISOtoVNI(inputOrderInfoData.orderDate) }}</strong>
        </b-row>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table 1 -->
    <p class="mt-1">
      <strong style="font-size: 18px">Hàng bán</strong>
    </p>

    <table
      v-for="item in inputOrderSaleProductsData"
      :key="item.type"
      class="mt-1 w-100"
    >
      <thead>
        <!-- START - Header 1 -->
        <tr>
          <td
            colspan="3"
            class="pl-1 border-right-0 font-italic"
          >
            <div>Ngành hàng: <strong>{{ item.type }}</strong>
            </div>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic"
          >
            Tổng SL:
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic width-1-per"
          >
            <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic"
          >
            Tổng T.Tiền:
          </td>
          <td
            colspan="1"
            class="text-right pr-50 border-left-0 font-italic width-1-per"
          >
            <strong>{{ $formatNumberToLocale(inputOrderInfoData.transType === 0 ? item.totalPriceNotVat : item.totalPrice) }}</strong>
          </td>
        </tr>
        <!-- END - Header 1 -->

        <!-- START - Header 2 -->
        <tr class="font-italic">
          <th
            class="px-1 w-5"
          >
            STT
          </th>
          <th class="px-1 w-10">
            Mã SP
          </th>
          <th class="px-1 w-40">
            Tên SP
          </th>
          <th class="px-1 w-10">
            ĐVT
          </th>
          <th class="text-right px-50 w-5">
            SL
          </th>
          <th class="text-right px-50 w-15">
            Giá
          </th>
          <th class="text-right px-50 w-15">
            T.Tiền
          </th>
        </tr>
        <!-- END - Header 2 -->
      </thead>
      <tbody>
        <tr
          v-for="products in item.products"
          :key="products.productCode"
        >
          <td class="px-1">
            1
          </td>
          <td class="px-1">
            {{ products.productCode }}
          </td>
          <td class="px-1">
            {{ products.productName }}
          </td>
          <td class="px-1">
            {{ products.unit }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale( inputOrderInfoData.transType === 0 ? products.priceNotVat : products.price ) }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale( inputOrderInfoData.transType === 0 ? products.totalPriceNotVat : products.totalPrice ) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table 1 -->

    <!-- START - Table 2 -->
    <p class="mt-1">
      <strong style="font-size: 18px">Hàng khuyến mãi</strong>
    </p>

    <table
      v-for="item in inputOrderPromotionProductsData"
      :key="item.type"
      class="mt-1"
    >
      <thead>
        <!-- START - Header 1 -->
        <tr>
          <td
            colspan="3"
            class="pl-1 border-right-0 font-italic"
          >
            <div>Ngành hàng: <strong>{{ item.type }}</strong>
            </div>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic"
          >
            Tổng SL:
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic width-1-per"
          >
            <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
          </td>
          <td
            colspan="1"
            class="text-right border-right-0 border-left-0 font-italic"
          >
            Tổng T.Tiền:
          </td>
          <td
            colspan="1"
            class="text-right pr-50 border-left-0 font-italic width-1-per"
          >
            <strong>{{ $formatNumberToLocale(item.totalPrice) }}</strong>
          </td>
        </tr>
        <!-- END - Header 1 -->

        <!-- START - Header 2 -->
        <tr class="font-italic">
          <th
            class="px-1 w-5"
          >
            STT
          </th>
          <th class="px-1 w-10">
            Mã SP
          </th>
          <th class="px-1 w-40">
            Tên SP
          </th>
          <th class="px-1 w-10">
            ĐVT
          </th>
          <th class="text-right px-50 w-5">
            SL
          </th>
          <th
            class="text-right px-50 w-15"
          >
            Giá
          </th>
          <th class="text-right px-50 w-15">
            T.Tiền
          </th>
        </tr>
        <!-- END - Header 2 -->

      </thead>
      <tbody>
        <tr
          v-for="products in item.products"
          :key="products.productCode"
        >
          <td class="px-1">
            2
          </td>
          <td class="px-1">
            {{ products.productCode }}
          </td>
          <td class="px-1">
            {{ products.productName }}
          </td>
          <td class="px-1">
            {{ products.unit }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale(products.priceNotVat) }}
          </td>
          <td class="text-right px-50">
            {{ $formatNumberToLocale(products.totalPriceNotVat) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table 2 -->
    <!-- START - Fotter 1 -->
    <b-row
      class="mt-2"
      align-v="center"
    >
      <!-- START - Note -->
      <b-col
        cols="5"
        style="word-wrap: break-word"
        class="width-550"
      >
        <ins class="font-italic">Ghi chú:</ins>
        {{ inputOrderInfoData.note }}
      </b-col>
      <!-- END - Note -->
      <!-- START - Big total section -->
      <b-col>
        <b-row
          class="mx-0 width-100-per"
        >
          <div
            class="mx-0 font-italic text-right"
            style="width: 37%"
            align-v="center"
          >
            <div>
              <strong>Tổng SL</strong>
            </div>
          </div>
          <div
            class="mx-0 font-italic width-10-per text-right"
            align-v="center"
          >
            <strong
              style="font-size: 18px"
              class="ml-1"
            >
              {{ $formatNumberToLocale(inputOrderInfoData.totalQuantity) }}
            </strong>
          </div>

          <div
            style="width: 26.5%"
          >
            <div
              class="mx-0 font-italic"
              align-h="end"
              align-v="center"
            >
              <div class="d-flex flex-column justify-content-center">
                <strong class="text-right">Cộng tiền hàng</strong>
                <strong class="text-right my-50">Tiền thuế GTGT</strong>
                <strong class="text-right">Tổng cộng</strong>
              </div>
            </div>
          </div>

          <div class="w-25">
            <div
              class="mx-0 font-italic"
              align-h="end"
              align-v="center"
            >
              <div
                class="d-flex flex-column text-right ml-50"
                style="font-size: 18px"
              >
                <strong>
                  {{ $formatNumberToLocale(inputOrderInfoData.totalPriceNotVat) }}
                </strong>
                <strong>
                  {{ $formatNumberToLocale(inputOrderInfoData.totalPriceVat) }}
                </strong>
                <strong>
                  {{ $formatNumberToLocale(inputOrderInfoData.totalPrice) }}
                </strong>
              </div>
            </div>
          </div>
        </b-row>
      </b-col>
      <!-- END - Big total section -->

    </b-row>
    <!-- END - Fotter 1 -->

    <!-- START - Fotter 2 -->
    <b-row
      class="mx-5 my-2"
      align-h="end"
    >
      <p>NGƯỜI NHẬP</p>
    </b-row>
    <!-- END - Fotter  2-->
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
import {
  hostName,
  jspmCheckStatus,
  jsPdfPrint,
} from '@core/utils/filter'

import {
  WAREHOUSEINPUT,
  // Getters
  PRINT_OUT_IN_PUT_ORDER_GETTER,
} from '@/views/warehouses/warehouses-input/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      dataPrintOptions: {},
      ipAddress: '',
      printerName: '',
      bodyData: [],
      count: 1,
      align: 10,
    }
  },
  computed: {
    ...mapGetters(WAREHOUSEINPUT, [PRINT_OUT_IN_PUT_ORDER_GETTER]),
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
        type: 'type',
        transCode: 'transCode',
        poNumber: 'poNumber',
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
    ipAddress() {
      this.GET_PRINTER_CLIENT_ACTIONS({
        data: {
          clientId: this.ipAddress,
        },
        onSuccess: () => {},
      })
    },
  },

  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    this.printerName = this.printerOptions.reportPrinterName
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
      pdf.setFont('Ario-Bold')
      this.createTable1(pdf)
      this.createTable2(pdf)
      // pdf.text('Hàng bán', 10, pdf.previousAutoTable.finalY + this.align)
      // this.align += 10

      // Hàng bán
      pdf.autoTable({
        theme: 'plain',
        // startY: pdf.previousAutoTable.finalY,
        margin: {
          top: 3,
          right: 10,
          left: 10,
          bottom: 0,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 10,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Hàng bán',
              styles: {
                font: 'Ario-Bold', fontSize: 13, cellPadding: 0.5, valign: 'middle',
              },
            },
          ],
        ],
      })
      if (this.inputOrderSaleProductsData && this.inputOrderSaleProductsData.length > 0) {
        this.inputOrderSaleProductsData.forEach(data => {
          const row = [
            { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
            { content: `${data.type}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
            { content: 'Tổng SL :', styles: { lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? data.totalPriceNotVat : data.totalPrice)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
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
              content: 'SL', dataKey: 'SL', cellWidth: 15, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Giá', dataKey: 'Giá', cellWidth: 20, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30, styles: { font: 'Ario-Bold' },
            },
          ]
          this.bodyData.push(title)
          data.products.forEach(pro => {
            this.bodyData.push([
              { content: `${this.count}`, styles: { cellWidth: 10 } },
              { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
              { content: `${pro.productName}`, styles: { cellWidth: 60 } },
              { content: `${pro.unit}`, styles: { cellWidth: 20, halign: 'center' } },
              { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? pro.priceNotVat : pro.price)}`, styles: { cellWidth: 30, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? pro.priceNotVat : pro.totalPrice)}`, styles: { cellWidth: 30, halign: 'right' } },
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

      // Hàng khuyến mãi
      pdf.autoTable({
        theme: 'plain',
        margin: {
          top: 3,
          right: 10,
          left: 10,
          bottom: 0,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 10,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Hàng khuyến mãi',
              styles: {
                font: 'Ario-Bold', fontSize: 13, cellPadding: 0.5, valign: 'middle',
              },
            },
          ],
        ],
      })
      if (this.inputOrderPromotionProductsData && this.inputOrderPromotionProductsData.length > 0) {
        this.inputOrderPromotionProductsData.forEach(data => {
          const row = [
            { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
            { content: `${data.type}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
            { content: 'Tổng SL :', styles: { lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
            { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? data.totalPriceNotVat : data.totalPrice)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
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
              content: 'SL', dataKey: 'SL', cellWidth: 15, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'Giá', dataKey: 'Giá', cellWidth: 20, styles: { font: 'Ario-Bold' },
            },
            {
              content: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30, styles: { font: 'Ario-Bold' },
            },
          ]
          this.bodyData.push(title)
          data.products.forEach(pro => {
            this.bodyData.push([
              { content: `${this.count}`, styles: { cellWidth: 10 } },
              { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
              { content: `${pro.productName}`, styles: { cellWidth: 60 } },
              { content: `${pro.unit}`, styles: { cellWidth: 20, halign: 'center' } },
              { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? pro.priceNotVat : pro.price)}`, styles: { cellWidth: 30, halign: 'right' } },
              { content: `${this.$formatNumberToLocale(this.inputOrderInfoData.transType === 0 ? pro.priceNotVat : pro.totalPrice)}`, styles: { cellWidth: 30, halign: 'right' } },
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
      pdf.text(`Ghi chú: ${this.inputOrderInfoData.note}`, 10, startYNote + 24, {
        maxWidth: 60,
      })
      pdf.setFontSize(10)
      pdf.setFont('Ario-Regular')
      pdf.text('NGƯỜI NHẬP', 163, pdf.previousAutoTable.finalY + 7)

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }

      const options = {
        fileName: 'Bao_cao_xuat_hang',
        pageSizing: 'Fit',
      }
      JSPM.JSPrintManager.start()
      if (jspmCheckStatus()) {
        if (this.printerName.includes('PDF')) {
          pdf.save('bao_cao_ban_hang.pdf')
        } else {
          jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
        }
      }
    }
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
  methods: {
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),

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
          fontSize: 10,
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
              content: 'CÔNG TY CP SỮA VIỆT NAM',
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
              content: 'Số 10 Tân Trào, Phường Tân Phú, Q7, Tp.HCM', styles: { ...styleDef },
            },
          ],
          [
            { content: '', styles: { cellWidth: 20, ...cellPadding } },
            {
              content: `Tel: ${this.inputOrderShopData.phone} - Fax: ${this.inputOrderShopData.fax}`, styles: { ...cellPadding },
            },
            { content: '', styles: { cellWidth: 10, ...cellPadding } },
            {
              content: 'Tel: (84.8) 54 155 555 - Fax: (84.8) 54 161 226', styles: { ...cellPadding },
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
          fontSize: 10,
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
            { content: 'HÓA ĐƠN NHẬP HÀNG', colSpan: 4, styles: { font: 'Ario-Bold', fontSize: 20, cellPadding: { left: 0.5, top: 3, bottom: 2 } } },
          ],
          [
            { content: 'Loại nhập hàng:', styles: { cellWidth: 30, ...styleDef } },
            {
              content: `${this.$getInputTypeslabel(this.inputOrderInfoData.transType)}`,
              styles: {
                cellWidth: 50, font: 'Ario-Bold', ...styleDef,
              },
            },
            { content: '', styles: { cellWidth: 25, ...styleDef } },
            { content: '', styles: { ...styleDef } },
          ],
          [
            { content: 'Mã nhập hàng:', styles: { ...styleDef } },
            { content: `${this.inputOrderInfoData.transCode}`, styles: { font: 'Ario-Bold', ...styleDef } },
            { content: 'Ngày nhập:', styles: { ...styleDef } },
            { content: `${this.$formatISOtoVNI(this.inputOrderInfoData.transDate, true)}`, styles: { font: 'Ario-Bold', ...styleDef } },
          ],
          [
            { content: 'Số PO:', styles: { ...styleDef } },
            { content: `${this.inputOrderInfoData.transCode}`, styles: { font: 'Ario-Bold', ...styleDef } },
            { content: 'Số nội bộ:', styles: { ...styleDef } },
            { content: `${this.inputOrderInfoData.internalNumber}`, styles: { font: 'Ario-Bold', ...styleDef } },
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
              content: 'Cộng tiền hàng',
              styles: { halign: 'right', cellWidth: 29, lineWidth: 0 },
            },
            {
              content: `${this.$formatNumberToLocale(this.inputOrderInfoData.totalPriceNotVat)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fontSize: 11, cellWidth: 31, lineWidth: 0,
              },
            },
          ],
          [
            {
              content: 'Tiền thuế GTGT',
              colSpan: 3,
              styles: { halign: 'right', cellWidth: 29, lineWidth: 0 },
            },
            {
              content: `${this.$formatNumberToLocale(this.inputOrderInfoData.totalPriceVat)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fontSize: 11, cellWidth: 31, lineWidth: 0,
              },
            },
          ],
          [
            {
              content: 'Tổng cộng',
              colSpan: 3,
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
  border-width: 2px;
}
td, .td {
  border-style: dotted;
  border-width: 2px;
}
</style>
