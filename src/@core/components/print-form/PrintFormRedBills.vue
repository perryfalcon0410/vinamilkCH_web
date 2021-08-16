<template>
  <div
    id="report-sales-redbill"
    class="d-none d-print-block text-brand-3 mx-0 mt-5"
  >
    <div style="min-height: 800px;">
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
          {{ $moment().format('DD') }}
        </div>
        <div>
          {{ $moment().format('MM') }}
        </div>
        <div>
          {{ $moment().format('YYYY') }}
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
        <div style="width: 6%;">
          <!-- {{ $formatNumberToLocale(redBillInfoData.amount) }} -->
        </div>
      </b-row>

      <table class="mt-5 align-text-bottom">
        <tbody>
          <tr
            v-for="(item,index) in redBillData"
            :key="item.productCode"
          >
            <td>{{ index + 1 }}</td>
            <td
              style="max-width:150px;"
            >{{ item.productName }}</td>
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
        <div
          class="width-50-per"
        >
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
        <div
          class="width-45-per"
        >
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
        <div
          class="text-right width-60-per"
        >
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

import { mapGetters } from 'vuex'
import {
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'

import {
  RED_INVOICE,
  // Getters
  PRINT_RED_INVOICES_GETTER,
} from '@/views/sales/sales-red-bills/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      count: 0,
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
  },
  updated() {
    const printerName = this.printerOptions.reportPrinterName
    const element = document.getElementById('report-sales-redbill')
    const options = {
      fileName: 'bao_cao_ban_hang',
      // orientation: 'landscape',
      // rotate: 'Rot90',
      pageSizing: 'Fit',
      scale: 3,
    }
    if (jspmCheckStatus()) {
      printActions(element, printerName, options)
    }
  },

}
</script>

<style>
table {
  width: 100%;
}
</style>
