<template>
  <b-container
    id="print-form-diff-price"
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.phone }} </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> BÁO CÁO CHÊNH LỆCH GIÁ </strong>
        <p class="my-1">
          Từ ngày: {{ $formatISOtoVNI(totalData.fromDate) }} <span class="pl-1">Đến ngày: {{ $formatISOtoVNI(totalData.toDate) }}</span>
        </p>
        <p>Ngày in: {{ $formatPrintDate(totalData.reportDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total view -->
    <b-row
      class="mx-0 width-100-per text-right"
      style="background: rgb(192, 186, 186)"
    >
      <span style="width: 51.8%; font-size: 15px">
        <i>Tổng cộng:</i>
      </span>
      <strong style="width: 8%">{{ $formatNumberToLocale(totalData.totalQuantity) }}</strong>
      <strong style="width: 14.9%">{{ $formatNumberToLocale(totalData.totalPriceInput) }}</strong>
      <strong style="width: 14.9%">{{ $formatNumberToLocale(totalData.totalPriceOutput) }}</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 2 -->
    <div
      v-for="(item,index) in reportData"
      :key="index"
    >
      <b-col class="px-0 mx-0 pb-1">
        <table>
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.response.redInvoiceNo }} - Ngày HĐ: {{ $formatISOtoVNI(item.response.orderDate) }} - Số PO: {{ item.response.poNumber }} - Số nội bộ: {{ item.response.internalNumber }} - Mã nhập hàng: {{ item.response.transCode }}
                </strong>
                <b-row
                  class="mx-0 width-100-per text-right"
                >
                  <span style="width: 51.9%;">
                    <i
                      style="font-weigth: normal;"
                      class="normal-font"
                    >Tổng cộng:</i>
                  </span>
                  <span
                    style="width: 8%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalQuantity) }}
                  </span>
                  <span
                    style="width: 15%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalPriceInput) }}
                  </span>
                  <span
                    style="width: 15%;"
                    class="normal-font"
                  >
                    {{ $formatNumberToLocale(item.response.totalPriceOutput) }}
                  </span>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 10%"
              >
                Mã SP
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 35%"
              >
                Tên SP
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                ĐVT
              </th>
              <th
                rowspan="2"
                class="text-center"
                style="width: 5%"
              >
                SL
              </th>
              <th
                colspan="2"
                class="text-center"
                style="width: 15%"
              >
                Đầu vào
              </th>
              <th
                colspan="2"
                class="text-center"
                style="width: 15%"
              >
                Đầu ra
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                Chênh lệch
              </th>
            </tr>
            <!-- END - Header 2 -->

            <!-- START - Header 3 -->
            <tr>
              <!-- Đầu vào -->
              <th
                class="text-center"
                style="width: 7%"
              >
                Giá
              </th>
              <th
                class="text-center"
                style="width: 8%"
              >
                T.Tiền
              </th>
              <!-- Đầu ra -->
              <th
                class="text-center"
                style="width: 7%"
              >
                Giá
              </th>
              <th
                class="text-center"
                style="width: 8%"
              >
                T.Tiền
              </th>
            </tr>
          <!-- END - Header 3 -->
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in reportData[index].info"
              :key="product.id"
            >
              <td
                class="text-right pr-40"
              >
                {{ stt + 1 }}
              </td>
              <td>
                {{ product.productCode }}
              </td>
              <td>
                {{ product.productName }}
              </td>
              <td>
                {{ product.unit }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.inputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalInput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.outputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalOutput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.priceChange) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
    </div>
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
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,

  PRINT_REPORT_DIFFERENCE_GETTER,
} from '@/views/reports/reports-warehouses/report-warehouses-price-difference/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dataPrintOptions: {},
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          width: '140px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          type: 'date',
          dateInputFormat: 'dd/MM/yyyy',
          dateOutputFormat: 'dd/MM/yyyy',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [PRINT_REPORT_DIFFERENCE_GETTER]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),

    reportData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.details
      }
      return []
    },
    totalData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER
      }
      return {}
    },
    commonInfo() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER.shop) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.shop
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
          const element = document.getElementById('print-form-diff-price')
          const options = {
            fileName: 'bao_cao_chenh_lech_gia',
            pageSizing: 'Fit',
            format: 'a3',
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
th {
  border-style: solid;
  border-width: 2px;
}
td {
  border-style: dotted;
  border-width: 2px;
  word-wrap: break-word;
}
table {
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
}
.normal-font {
  font-weight: normal;
}
</style>
