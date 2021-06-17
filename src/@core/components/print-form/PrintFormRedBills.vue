<template>
  <div
    class="d-none d-print-block text-brand-3 mx-0"
  >
    <b-row
      align-h="around"
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
        Ngày {{ $moment().format('DD') }} tháng {{ $moment().format('MM') }} năm {{ $moment().format('YYYY') }}
      </div>
      <!-- <div>tháng {{ $moment().format('MM') }}</div>
      <div>năm {{ $moment().format('YYYY') }}</div> -->
      <div>Số HĐ: {{ redBillInfoData.redInvoiceNumber }}</div>
    </b-row>

    <b-row
      class="mx-0 mt-5"
      align-h="around"
      align-v="center"
    >
      <div>
        <div>{{ redBillInfoData.shopName }}</div>
        <div>{{ redBillInfoData.shopAddress }}</div>
        <div>{{ redBillInfoData.shopTel }}</div>
      </div>
      <div>Tiền mặt</div>
      <div>{{ $formatNumberToLocale(redBillInfoData.amount) }}</div>
    </b-row>

    <table class="mt-5 align-text-bottom">
      <tbody>
        <tr
          v-for="(item,index) in redBillData"
          :key="item.productCode"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.productCode }}</td>
          <td>{{ item.uom1 }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ $formatNumberToLocale(item.price) }}</td>
          <td>{{ $formatNumberToLocale(item.intoMoney) }}</td>
          <td>{{ item.note }}</td>
        </tr>
      </tbody>
    </table>

    <b-row
      class="mx-0 mt-5"
      align-h="end"
      align-v="end"
    >
      <b-col cols="5">
        {{ redBillInfoData.totalAmountString }}
      </b-col>
      <b-col cols="4">
        <div>{{ $formatNumberToLocale(redBillInfoData.amount) }}</div>
        <div>{{ $formatNumberToLocale(redBillInfoData.valueAddedTax) }}</div>
        <div>{{ $formatNumberToLocale(redBillInfoData.totalAmountNumber) }}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import {
  RED_INVOICE,
  // Getters
  PRINT_RED_INVOICES_GETTER,
} from '@/views/sales/sales-red-bills/store-module/type'

export default {
  computed: {
    ...mapGetters(RED_INVOICE, [PRINT_RED_INVOICES_GETTER]),

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
  },
  updated() {
    window.print()
  },

}
</script>

<style>
table {
  width: 100%;
}
</style>
