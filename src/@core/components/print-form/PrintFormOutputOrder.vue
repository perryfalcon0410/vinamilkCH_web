<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1 border-bottom-dark"
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
        <b-row class="mx-0">
          <div class="w-35">
            Loại xuất hàng:
          </div>  <strong>{{ inputOrderInfoData.type }}</strong>
        </b-row>
        <b-row class="mx-0">
          <div class="w-35">
            Mã xuất hàng:
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

      <div class="d-flex flex-column w-25">
        <b-row class="mx-0">
          <div class="w-50">
            Ngày xuất hàng:
          </div>  <strong>{{ $formatISOtoVNI(inputOrderInfoData.orderDate) }}</strong>
        </b-row>
        <b-row class="mx-0">
          <div class="w-50">
            Số nội bộ:
          </div>  <strong>{{ inputOrderInfoData.internalNumber }}</strong>
        </b-row>
        <b-row class="mx-0">
          <div class="w-50">
            Ngày hóa đơn:
          </div>  <strong>{{ $formatISOtoVNI(inputOrderInfoData.transDate) }}</strong>
        </b-row>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table 1 -->
    <p class="mt-1">
      <strong>Hàng bán</strong>
    </p>

    <table
      v-for="item in inputOrderSaleProductsData"
      :key="item.type"
      class="mt-1"
    >
      <thead>
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
            <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
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
          <th
            style="width: 1%"
            class="px-1"
          >
            STT
          </th>
          <th class="px-1">
            Mã SP
          </th>
          <th class="px-1">
            Tên SP
          </th>
          <th class="px-1">
            ĐVT
          </th>
          <th class="text-right px-2">
            SL
          </th>
          <th class="text-right px-1 w-15">
            Giá
          </th>
          <th class="text-right px-1">
            T.Tiền
          </th>
        </tr>
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
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.quantity) }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.price) }}
          </td>
          <td class="text-right px-1">
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
        <strong>Tổng SL</strong> <strong class="ml-2 mr-4">{{ $formatNumberToLocale(inputOrderInfoData.totalQuantity) }}</strong>
      </div>

      <div>
        <strong>Tổng T.Tiền</strong> <strong class="ml-2">{{ $formatNumberToLocale(inputOrderInfoData.totalPrice) }}</strong>
      </div>
    </b-row>

    <b-col
      class="mx-0"
      style="width: 550px; word-wrap: break-word"
    >
      <ins>Ghi chú:</ins>
      {{ inputOrderInfoData.note }}
    </b-col>

    <b-row
      class="m-5 text-uppercase"
      align-h="between"
    >
      <div>
        <p>Người nhận hàng</p>
        <p>..................................</p>
      </div>
      <div>
        <p>Người xuất hàng</p>
        <p>..................................</p>
      </div>
    </b-row>
    <!-- END - Fotter -->
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  WAREHOUSES_OUTPUT,
  // Getters
  PRINT_OUT_IN_PUT_ORDER_GETTER,
} from '@/views/warehouses/warehouses-output/store-module/type'

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
  },

  updated() {
    window.print()
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
