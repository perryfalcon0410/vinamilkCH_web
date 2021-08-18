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
import { mapGetters } from 'vuex'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import {
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'

import {
  WAREHOUSEINPUT,
  // Getters
  PRINT_OUT_IN_PUT_ORDER_GETTER,
} from '@/views/warehouses/warehouses-input/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      dataPrintOptions: {},
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

  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    const printerName = this.printerOptions.reportPrinterName
    if (printerName === '' || printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      for (let i = 0; i < 3; i += 1) {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
          const element = document.getElementById('print-form-input-order')
          const options = {
            fileName: 'nhap_hang',
            pageSizing: 'Fit',
            format: 'a4',
            isPaging: true,
          }
          if (jspmCheckStatus()) {
            printActions(element, printerName, options)
          }
        } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed && i === 2) {
          toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
        }
      }
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
  border-width: 2px;
}
td, .td {
  border-style: dotted;
  border-width: 2px;
}
</style>
