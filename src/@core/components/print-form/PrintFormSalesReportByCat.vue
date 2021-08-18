<template>
  <b-container
    id="print-report-cat"
    fluid
    class="d-none d-print-block px-3 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 25px"> {{ printInfo.shopName }} </strong>
        <p
          class="my-1"
          style="font-size: 20px;"
        >
          Add: {{ printInfo.shopAddress }}
        </p>
        <p
          class="my-1"
          style="font-size: 20px;"
        >Tel: {{ printInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 36px"> Báo cáo doanh số theo CAT </strong>
        <p
          class="my-1"
          style="font-size: 20px;"
        >
          Từ ngày: {{ $formatISOtoVNI(printInfo.fromDate) }} đến ngày: {{ $formatISOtoVNI(printInfo.toDate) }}
        </p>
        <p
          class="my-1"
          style="font-size: 20px;"
        >Ngày in: {{ $formatPrintDate(printInfo.printDate) }}</p>
      </div>
      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 25px;">
          CH GTSP Hải Dương
        </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 2 -->
          <tr
            style="background: rgb(192, 186, 186)"
          >
            <th
              class="text-right font-italic border-0"
              colspan="4"
            >
              Tổng cộng:
            </th>
            <th
              v-for="(item) in totalDetails"
              :key="item"
              class="text-right font-italic border-0"
            >
              <u>{{ $formatNumberToLocale(item) }}</u>
            </th>
          </tr>
          <tr>
            <th
              v-for="(item) in columnList"
              :key="item[0]"
              class="text-center text-nowrap"
            >
              {{ item }}
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(rowData, index) in reportData"
            :key="index"
          >
            <td class="px-1">
              {{ index + 1 }}
            </td>
            <td
              v-for="(data, idx) in rowData"
              :key="idx"
              :class="{'text-right': (idx > 3), 'name-width': (idx === 2)}"
              class="px-1"
            >
              <div v-if="idx <= 3">
                {{ data }}
              </div>
              <div v-else>
                {{ $formatNumberToLocale(data) }}
              </div>
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 1 -->
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
  REPORT_SALES_CAT,
  // Getters
  PRINT_REPORT_GETTER,
} from '@/views/reports/reports-sales/reports-sales-cat/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      titles: ['STT', 'Mã KH', 'Tên KH', 'Địa chỉ', 'Tần suất'],
    }
  },
  computed: {
    ...mapGetters(REPORT_SALES_CAT, [
      PRINT_REPORT_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    printInfo() {
      return {
        shopName: this.PRINT_REPORT_GETTER.shopName,
        shopAddress: this.PRINT_REPORT_GETTER.shopAddress,
        shopTel: this.PRINT_REPORT_GETTER.shopTel,
        fromDate: this.PRINT_REPORT_GETTER.fromDate,
        toDate: this.PRINT_REPORT_GETTER.toDate,
        printDate: this.PRINT_REPORT_GETTER.printDate,
      }
    },

    columnList() {
      const titles = this.titles.concat(this.PRINT_REPORT_GETTER.category)
      titles[titles.length] = 'Tổng cộng'
      return titles
    },

    // get data print
    reportData() {
      if (this.PRINT_REPORT_GETTER.reportData) {
        return this.PRINT_REPORT_GETTER.reportData
      }
      return [
        'string',
        'string',
        'string',
        0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
        // 0,
      ]
    },
    // get total info price
    totalDetails() {
      if (this.PRINT_REPORT_GETTER.total) {
        return (this.PRINT_REPORT_GETTER.total || []).slice(3)
      }
      return {}
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
          const element = document.getElementById('print-report-cat')
          const options = {
            fileName: 'Bao_cao_cat',
            format: 'a2',
            orientation: 'landscape',
            rotate: 'Rot90',
            pageSizing: 'Fit',
            scale: 2.5,
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
  font-size: 17px;
}
td {
  border-style: dotted;
  border-width: 2px;
  font-size: 17px;
}

</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: landscape;
    }
body {
  -webkit-print-color-adjust: exact !important;
}
</style>
