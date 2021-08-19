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
import {
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
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
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
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

  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    const printerName = this.printerOptions.reportPrinterName
    if (printerName === '' || printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      for (let i = 0; i < 3; i += 1) {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
          const element = document.getElementById('warehouses-output')
          const options = {
            fileName: 'Kho xuat hang',
            format: 'a4',
            // orientation: 'landscape',
            // rotate: 'Rot90',
            pageSizing: 'Fit',
            scale: 2.5,
            // isPaging: true,
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
