<template>
  <b-container
    id="popover"
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 20px"> CÔNG TY CP SỮA VIỆT NAM </strong>
        <strong style="font-size: 17px"> {{ reportInfos.shopName }} </strong>
        <strong>{{ reportInfos.address }} </strong>
        <strong> Ngày in: {{ reportInfos.dateOfPrinting }} </strong>
      </div>
      <b-img
        src="@/assets/images/logo/VinamilkLogo.png"
        alt="logo"
        width="200px"
      />
    </b-row>
    <!-- END - Header -->

    <!-- START - Title -->
    <b-row
      class="mx-0"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px">
          BẢNG KÊ CHI TIẾT CÁC HOÁ ĐƠN NHẬP HÀNG
        </strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(reportInfos.fromDate) }} <span class="pl-1">đến {{ $formatISOtoVNI(reportInfos.toDate) }}</span>
        </p>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table -->
    <table>
      <thead>
        <tr>
          <th
            style="width: 1%"
            class="px-1"
          >
            STT
          </th>
          <th class="px-1">
            Số PO
          </th>
          <th class="px-1">
            Số nội bộ
          </th>
          <th class="px-1">
            Số hóa đơn
          </th>
          <th class=" px-1">
            Ngày xuất HĐ
          </th>
          <th class=" px-1">
            Ngày ĐHTT
          </th>
          <th class="text-right px-1">
            Tiền HĐ
          </th>
          <th class="t px-1">
            HĐ khuyến mãi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(products, index) in reportData"
          :key="index"
        >
          <td
            class="text-right px-40"
            style="width: 4%"
          >
            {{ index + 1 }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.poNumber }}
          </td>
          <td class="px-1">
            {{ products.internalNumber }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.redInvoiceNo }}
          </td>
          <td
            class="px-1"
            style="width: 10%"
          >
            {{ products.billDate }}
          </td>
          <td
            class="px-1"
            style="width: 10%"
          >
            {{ products.dateOfPayment }}
          </td>
          <td class="text-right px-1">
            {{ $formatNumberToLocale(products.totalAmount) || '' }}
          </td>
          <td
            class="px-1"
            style="width: 15% ;word-break: break-all"
          >
            {{ products.promotionalOrders }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- END - Table -->

    <!-- START - Fotter -->
    <b-row
      class="mx-0"
      style="width: 85%"
      align-h="end"
    >
      <strong> <i>Tổng cộng:<i> <ins class="ml-5">{{ $formatNumberToLocale(reportInfos.totalAmount) }}</ins> </i></i></strong>
    </b-row>

    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <p>Nhân viên nhập hàng</p>

      <div class="d-flex flex-column align-items-center">
        <p>Cửa hàng trưởng</p>
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

import {
  REPORT_PURCHASES,
  // Getters
  PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER,
} from '@/views/reports/reports-purchases/store-module/type'
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
    ...mapGetters(REPORT_PURCHASES, [PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    reportInfos() {
      if (this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.info) {
        return this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.info
      }
      return {
        fromDate: 'fromDate',
        toDate: 'toDate',
        dateOfPrinting: 'dateOfPrinting',
        shopName: 'shopName',
        address: 'address',
        totalAmount: 'totalAmount',
      }
    },
    reportData() {
      if (this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.response) {
        return this.PRINT_REPORT_INPUT_RECEIPT_DETAILS_GETTER.response
      }
      return {
        poNumber: 'poNumber',
        internalNumber: 'internalNumber',
        redInvoiceNo: 'redInvoiceNo',
        billDate: 'billDate',
        dateOfPayment: 'dateOfPayment',
        amount: 'amount',
        totalAmount: 'totalAmount',
        promotionalOrders: 'promotionalOrders',
      }
    },
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  updated() {
    const printerName = this.printerOptions.reportPrinterName
    const element = document.getElementById('popover')
    const options = {
      fileName: 'bao_cao_ban_hang',
      // orientation: 'landscape',
      // rotate: 'Rot90',
      pageSizing: 'Fit',
      format: 'a3',
    }
    if (jspmCheckStatus()) {
      printActions(element, printerName, options)
    }
  },
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
th, td{
  border-style: solid;
  border-width: 2px;
}
td {
  font-size: 14px;
}

</style>
