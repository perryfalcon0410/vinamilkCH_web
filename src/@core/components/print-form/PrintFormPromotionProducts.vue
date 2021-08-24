<template>
  <b-container
    id="rp-promotion-products"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ shopInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ shopInfo.address }}
        </p>
        <p>Tel: {{ shopInfo.phone }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng khuyến mãi </strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(commonInfo.fromDate) }} đến {{ $formatISOtoVNI(commonInfo.toDate) }}
        </p>
        <p>Ngày in : {{ $formatISOtoVNI(commonInfo.reportDate, true) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ shopInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section -->
    <b-row
      class="mx-0 mb-50 width-100-per total-header"
      align-v="end"
    >
      <div
        class="text-right"
        style="width: 99.1%"
      >
        <strong class="pr-5 font-italic">Tổng Cộng:</strong>
        <strong>{{ $formatNumberToLocale(commonInfo.totalQuantity) }}</strong>
      </div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col
      v-for="(item,index) in reportData"
      :key="index"
      class="px-0 pb-1"
    >
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="12"
            >
              <b-row
                class="mx-0 width-100-per"
              >
                <div
                  style="width: 30%"
                  class="pl-1"
                ><i>Ngành hàng:</i> <strong class="pl-2">{{ item.productCatName }}</strong>
                </div>
                <div
                  class="text-right"
                  style="width: 60.7%"
                ><i>Tổng Cộng:</i>
                </div>
                <div
                  class="text-right"
                  style="width: 8.7%"
                >
                  <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="stt px-50"
              style="width: 1%"
            >
              STT
            </th>
            <th
              class="dotted px-50"
              style="width: 20%"
            >
              Ngày bán
            </th>
            <th
              class="dotted px-50"
              style="width: 20%"
            >
              Hóa đơn
            </th>
            <th
              class="dotted px-50"
              style="width: 8%"
            >
              Mã SP
            </th>
            <th
              class="dotted px-50"
              style="width: 38.5%"
            >
              Tên SP
            </th>
            <th
              class="dotted px-50"
              style="width: 4%"
            >
              ĐVT
            </th>
            <th
              class="dotted px-50 sl text-right"
              style="width: 8%"
            >
              SL
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="product in reportData[index].productCats"
            :key="product.id"
          >
            <td class="text-center px-1">
              {{ product.len + 1 }}
            </td>
            <td class="px-50">
              {{ $moment(product.orderDate).locale('en').format('DD/MM/YYYY HH:mm:ss A') }}
            </td>
            <td class="px-50">
              {{ product.orderNumber }}
            </td>
            <td class="px-50">
              {{ product.productCode }}
            </td>
            <td class="px-50">
              {{ product.productName }}
            </td>
            <td class="px-50">
              {{ product.uom }}
            </td>
            <td class="text-right px-50">
              {{ product.quantity }}
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
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
import { mapGetters, mapActions } from 'vuex'
import {
  hostName,
  printActions,
  jspmCheckStatus,
} from '@core/utils/filter'
import JSPM from 'jsprintmanager'
import toasts from '@/@core/utils/toasts/toasts'
import {
  REPORT_WAREHOUSES_PROMOTIONS,

  PRINT_REPORT_PROMOTION_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-promotion/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_PROMOTIONS, [PRINT_REPORT_PROMOTION_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    commonInfo() {
      if (this.PRINT_REPORT_PROMOTION_GETTER) {
        return this.PRINT_REPORT_PROMOTION_GETTER
      }
      return {}
    },
    shopInfo() {
      if (this.PRINT_REPORT_PROMOTION_GETTER.shop) {
        return this.PRINT_REPORT_PROMOTION_GETTER.shop
      }
      return {}
    },

    reportData() {
      if (this.PRINT_REPORT_PROMOTION_GETTER.productCats) {
        return this.PRINT_REPORT_PROMOTION_GETTER.productCats
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
        item.productCats.forEach(j => {
          // eslint-disable-next-line no-param-reassign
          j.len = i
          i += 1
        })
      })
    },
    ipAddress() {
      this.GET_PRINTER_CLIENT_ACTIONS({
        data: {
          clientId: this.ipAddress,
        },
        onSuccess: () => {},
      })
    },
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
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    const printerName = this.printerOptions.reportPrinterName
    if (printerName === '' || printerName === null) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      JSPM.JSPrintManager.start()
      for (let i = 0; i < 3; i += 1) {
        if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {
          const element = document.getElementById('rp-promotion-products')
          const options = {
            fileName: 'Bao cao hang khuyen mai',
            format: 'a4',
            // orientation: 'landscape',
            // rotate: 'Rot90',
            pageSizing: 'Fit',
            scale: 2.5,
            isPaging: true,
            margin: [10, 1, 10, 1],
            x: 1.1,
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
  methods: {
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
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
td {
  border-style: dashed;
  border-width: 1px;
}
thead tr{
  border-style: solid;
  border-color: black;
  border-width: 2px;
  font-weight: bold;
  border-radius: 2px;
}
.dotted {
  border-left-style: dashed;
  border-right-style: dashed;
}
.stt {
  border-right-style: dashed;
}
.sl{
  border-right-style: solid;
  border-right-width: 2px;
}
.total {
  border-left-style: dashed;
}
.total-header {
    background: rgb(192, 186, 186);
    border-radius: 3px;
}
b-container{
  color: black;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: portrait;
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
