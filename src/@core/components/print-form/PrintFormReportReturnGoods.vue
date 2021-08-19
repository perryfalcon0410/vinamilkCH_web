<template>
  <b-container
    id="rp-return-goods"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 mt-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong
          style="font-size: 17px"
          class="mt-1"
        > {{ commonData.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonData.address }}
        </p>
        <p>
          Tel: {{ commonData.shopTel }}
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng trả lại </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày :{{ $formatISOtoVNI(commonData.fromDate) }}
          </p>
          <p>
            Đến ngày :{{ $formatISOtoVNI(commonData.toDate) }}
          </p>
        </b-row>
        <p>Ngày in : {{ $formatPrintDate(commonData.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonData.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0 second-sector width-100-per total"
      align-v="end"
      style="border-style: dashed; border-width: 1px 1px 0 1px"
    >
      <div
        style="visibility: hidden; width: 40%;"
      ><strong>Ngành hàng: A </strong>
      </div>
      <div
        style="width: 10.1%;"
        class="text-right text-nowrap italic"
      >Tổng SL:
      </div>
      <div
        style="width: 6.8%;"
        class="text-right"
      >
        <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</ins></strong>
      </div>
      <div
        style="width: 9.8%;"
        class="text-right text-nowrap italic"
      >Tổng T.Tiền:

      </div>
      <div
        style="width: 14%;"
        class="text-right"
      >
        <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</ins></strong>
      </div>
      <div
        style="width: 7.7%;"
        class="text-right text-nowrap italic"
      >Tổng TTL:

      </div>
      <div
        style="width: 10.9%;"
        class="text-right"
      > <strong><ins>{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</ins></strong></div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <div
      v-for="(item,index) in reportProductData"
      :key="index"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per avoid-break"
        align-v="end"
        style="border-style: dashed; border-width: 1px 1px 0 1px"
      >
        <div
          style="width: 39.5%;"
          class="ml-50"
        ><strong><i>Ngành hàng: {{ item.category }} </i></strong>
        </div>
        <div
          style="width: 9.9%;"
          class="text-right text-nowrap italic"
        >Tổng SL:
        </div>
        <div
          style="width: 6.8%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
        </div>
        <div
          style="width: 9.8%;"
          class="text-right text-nowrap italic"
        >Tổng T.Tiền:

        </div>
        <div
          style="width: 14%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalAmount) }}</strong>
        </div>
        <div
          style="width: 7.7%;"
          class="text-right text-nowrap italic"
        > Tổng TTL:
        </div>
        <div
          style="width: 10.9%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalRefunds) }}</strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="order in item.orderReturnGoods"
        :key="order.returnNumber"
        class="px-0 pb-1"
      >
        <table>
          <!-- START - Header -->
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="10"
            >
              <b-row class="mx-0 width-100-per">
                <i class="mb-1 ml-50">
                  Mã trả hàng:{{ order.returnNumber }} - Mã hóa đơn:{{ order.orderNumber }} - KH: {{ order.customerName }}
                </i>
              </b-row>
              <b-row
                class="mx-0 width-100-per"
              >
                <div
                  style="width: 40%;"
                />
                <div
                  style="width: 10.1%;"
                  class="text-right text-nowrap italic"
                >Tổng SL:
                </div>
                <div
                  style="width: 6.8%;"
                  class="text-right"
                ><strong class="text-right">{{ $formatNumberToLocale(order.orderQuantity) }}</strong>
                </div>
                <div
                  style="width: 9.8%;"
                  class="text-right text-nowrap italic"
                >Tổng T.Tiền:
                </div>
                <div
                  style="width: 14%;"
                  class="text-right"
                ><strong>{{ $formatNumberToLocale(order.orderAmount) }}</strong>
                </div>
                <div
                  style="width: 7.7%;"
                  class="text-right text-nowrap italic"
                >
                  Tổng&nbsp;TTL:
                </div>
                <div
                  style="width: 10.9%;"
                  class="text-right"
                >
                  <strong> {{ $formatNumberToLocale(order.orderRefund) }}</strong>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->
          <!-- START - Header 2 -->
          <tr class="second-tr">
            <th
              style="width: 1%"
              class="px-50"
            >
              STT
            </th>
            <th
              style="width: 10%"
              class="px-50"
            >
              Mã SP
            </th>
            <th
              style="width: 27%"
              class="px-50"
            >
              Tên SP
            </th>
            <th
              style="width: 6%"
              class="px-50"
            >
              ĐVT
            </th>
            <th
              style="width: 7%"
              class="text-right px-50"
            >
              SL
            </th>
            <th
              style="width: 8.5%"
              class="text-right px-50 "
            >
              Giá
            </th>
            <th
              style="width: 14%"
              class="text-right px-50"
            >
              T.Tiền
            </th>
            <th
              style="width: 17%"
              class="text-right px-50 "
            >
              Tiền trả lại
            </th>
          </tr>
          <!-- END - Header 2 -->

          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product, stt) in order.reportPrintProductDTOS"
              :key="stt"
            >
              <td class="px-1">
                {{ product.len + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.unit }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.totalAmount) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.totalRefunds) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
    </div>
    <!-- END - Table 1 -->

    <!-- START - Fotter -->
    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <strong>Người in</strong>

      <div class="d-flex flex-column align-items-center">
        <p>....., Ngày.....Tháng.....Năm.....</p>
        <strong>Cửa hàng trưởng</strong>
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
  REPORT_RETURNED_GOODS,
  // Getters
  PRINT_INPUT_ORDER_DETIAL_GETTER,
  PRINT_RETURN_GOODS_GETTER,
} from '@/views/reports/reports-returned-goods/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      reportProductData: [],
    }
  },
  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      PRINT_INPUT_ORDER_DETIAL_GETTER,
      PRINT_RETURN_GOODS_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    // get data print
    commonData() {
      if (this.PRINT_RETURN_GOODS_GETTER) {
        return this.PRINT_RETURN_GOODS_GETTER
      }
      return []
    },
    // get total info price
    totalInfoReturnedGood() {
      if (this.PRINT_RETURN_GOODS_GETTER.totalInfo) {
        return this.PRINT_RETURN_GOODS_GETTER.totalInfo
      }
      return {}
    },
    // get info print
    reportData() {
      if (this.PRINT_RETURN_GOODS_GETTER.data) {
        return this.PRINT_RETURN_GOODS_GETTER.data
      }
      return []
    },
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    reportData() {
      this.reportProductData = [...this.reportData]
      let i = 0
      this.reportProductData.forEach(item => {
        item.orderReturnGoods.forEach(j => {
          // eslint-disable-next-line no-param-reassign
          j.len = i
          i += 1
        })
      })
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
          const element = document.getElementById('rp-return-goods')
          const options = {
            fileName: 'Bao cao hang tra lai',
            format: 'a3',
            // orientation: 'landscape',
            // rotate: 'Rot90',
            pageSizing: 'Fit',
            scale: 2.5,
            isPaging: true,
            margin: [5, 1, 5, 1],
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
  border-style: dashed;
  border-width: 1px;
  font-weight: normal;
}
.italic {
  font-style: italic;
}
td {
  border-style: dashed;
  border-width: 1px;
}
.second-tr th{
  border-style: solid;
  border-width: 2px;
  font-weight: bold;
}
.second-sector {
  border-top-style: none;
  border-right-style: dashed;
  border-left-style: dashed;
  border-width: 1px;
}
.total {
    background: rgb(192, 186, 186)
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 10px;
        margin-bottom: 0;
        size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
    table {
      page-break-inside: avoid;
      page-break-before: avoid;
    }
    .avoid-break {
      page-break-inside: avoid;
      page-break-after: avoid;
    }
</style>
