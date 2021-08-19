<template>
  <b-container
    id="rp-output-store"
    fluid
    class="d-none d-print-block px-0 text-black"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px"> {{ printInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ printInfo.shopAddress }}
        </p>
        <p>Tel: {{ printInfo.shopPhone }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Cửa hàng Xuất hàng </strong>
        <p class="my-1">
          Từ ngày: {{ $formatISOtoVNI(printInfo.fromDate) }} đến ngày: {{ $formatISOtoVNI(printInfo.toDate) }}
        </p>
        <p>Ngày in: {{ $formatPrintDate(printInfo.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column font-italic"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ printInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0 font-italic"
      align-v="end"
      style="background-color: gray"
    >
      <div
        class="text-right"
        style="width: 58%;"
      >
        Tổng SL:
      </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(printInfo.totalQuantity) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(printInfo.totalPriceVat) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section 1 -->

    <!-- START - Table section 1 -->
    <!-- START - Total section 2 -->
    <b-row
      v-if="expAdjust.orderImports.length > 0"
      class="mx-0 font-italic"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
      >Loại: Xuất điều chỉnh</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(expAdjust.totalQuantity || 0) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(expAdjust.totalPriceVat || 0) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <template>
      <b-col
        v-for="order in expAdjust.orderImports"
        :key="order.redInvoiceNo"
        class="px-0"
      >
        <table>
          <!-- START - Header -->

          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ order.redInvoiceNo }}</div>
                <div>- Ngày HĐ: {{ $formatISOtoVNI(order.orderDate) }}</div>
                <div>- Số PO: {{ order.poNumber }}</div>
                <div>- Số nội bộ: {{ order.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ order.transCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
              >
                <div
                  class="text-right"
                  style="width: 58%;"
                >Tổng SL: </div>
                <div
                  class="text-right"
                  style="width: 10%;"
                >
                  {{ $formatNumberToLocale(order.totalQuantity) }}
                </div>
                <div
                  class="text-right"
                  style="width: 17%;"
                >T.Tiền: </div>
                <div
                  class="text-right"
                  style="width: 13%;"
                >
                  {{ $formatNumberToLocale(order.totalPriceVat) }}
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center"
            >
              STT
            </th>
            <th
              class="text-left pl-50"
            >
              Mã SP
            </th>
            <th
              class="text-left pl-50"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-right pr-50"
            >
              SL
            </th>
            <th class="text-right pr-50">
              Giá
            </th>
            <th class="text-right pr-50">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <template
              v-for="(cat, name) in order.cats"
            >
              <tr
                v-if="Array.isArray(order.cats)"
                :key="name"
              >
                <td
                  colspan="7"
                >
                  <b-row>
                    <div
                      style="width: 12%;"
                      class="text-right italic"
                    >
                      Ngành hàng:
                    </div>
                    <div
                      style="width: 9%;"
                      class="text-right bold italic"
                    >
                      {{ cat.catName }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 37%;"
                    >
                      Tổng SL:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 10%;"
                    >
                      {{ $formatNumberToLocale(cat.totalQuantity) }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 17%;"
                    >
                      T.Tiền:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 13%;"
                    >
                      {{ $formatNumberToLocale(cat.totalPriceVat) }}
                    </div>
                  </b-row>
                </td>
              </tr>

              <template
                v-if="Array.isArray(order.cats)"
              >
                <tr
                  v-for="(item, index) in cat.products"
                  :key="index"
                >
                  <td
                    class="text-center"
                    style="width: 1%;"
                  >{{ index + 1 }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 10%;"
                  >{{ item.productCode }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 40%;"
                  >{{ item.productName }}</td>
                  <td
                    class="text-center"
                    style="width: 5%;"
                  >
                    {{ item.uom1 }}</td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.quantity) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.price) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 20%;"
                  >
                    {{ $formatNumberToLocale(item.totalPriceVat) }}
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <!-- END - Body -->
        </table>
        <b-row
          v-if="redInvoiceNo != 'null'"
          :key="redInvoiceNo"
          class="mx-0 mb-3"
          align-h="end"
        >
          <div
            class="rounded d-flex align-items-center mt-2 p-1"
            style="border: 2px dotted; width: 28%;"
          >
            <div class="width-40-per">
              <p class="italic">
                Điều chỉnh:
              </p>
              <p class="italic">
                Tổng cộng:
              </p>
            </div>
            <div class="width-60-per text-right">
              <p
                class="italic"
                style="opacity: 0;"
              >
                Điều chỉnh:
              </p>
              <p class="italic">
                <strong>{{ $formatNumberToLocale(order.totalPriceVat) }}</strong>
              </p>
            </div>
          </div>
        </b-row>
      </b-col>
    </template>

    <b-row
      v-if="expPO.orderImports.length > 0"
      class="mx-0 font-italic"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
      >Loại: Xuất trả PO</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(expPO.totalQuantity || 0) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(expPO.totalPriceNotVat || 0) }}</strong>
      </div>
    </b-row>
    <template>
      <b-col
        v-for="order in expPO.orderImports"
        :key="order.redInvoiceNo"
        class="px-0"
      >
        <table>
          <!-- START - Header -->

          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ order.redInvoiceNo }}</div>
                <div>- Ngày HĐ: {{ $formatISOtoVNI(order.orderDate) }}</div>
                <div>- Số PO: {{ order.poNumber }}</div>
                <div>- Số nội bộ: {{ order.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ order.transCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
              >
                <div
                  class="text-right"
                  style="width: 58%;"
                >Tổng SL: </div>
                <div
                  class="text-right"
                  style="width: 10%;"
                >
                  {{ $formatNumberToLocale(order.totalQuantity) }}
                </div>
                <div
                  class="text-right"
                  style="width: 17%;"
                >T.Tiền: </div>
                <div
                  class="text-right"
                  style="width: 13%;"
                >
                  {{ $formatNumberToLocale(order.totalPriceNotVat) }}
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center"
            >
              STT
            </th>
            <th
              class="text-left pl-50"
            >
              Mã SP
            </th>
            <th
              class="text-left pl-50"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-right pr-50"
            >
              SL
            </th>
            <th class="text-right pr-50">
              Giá
            </th>
            <th class="text-right pr-50">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <template
              v-for="(cat, name) in order.cats"
            >
              <tr
                v-if="Array.isArray(order.cats)"
                :key="name"
              >
                <td
                  colspan="7"
                >
                  <b-row>
                    <div
                      style="width: 12%;"
                      class="text-right italic"
                    >
                      Ngành hàng:
                    </div>
                    <div
                      style="width: 9%;"
                      class="text-right bold italic"
                    >
                      {{ cat.catName }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 37%;"
                    >
                      Tổng SL:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 10%;"
                    >
                      {{ $formatNumberToLocale(cat.totalQuantity) }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 17%;"
                    >
                      T.Tiền:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 13%;"
                    >
                      {{ $formatNumberToLocale(cat.totalPriceNotVat) }}
                    </div>
                  </b-row>
                </td>
              </tr>

              <template
                v-if="Array.isArray(order.cats)"
              >
                <tr
                  v-for="(item, index) in cat.products"
                  :key="index"
                >
                  <td
                    class="text-center"
                    style="width: 1%;"
                  >{{ index + 1 }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 10%;"
                  >{{ item.productCode }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 40%;"
                  >{{ item.productName }}</td>
                  <td
                    class="text-center"
                    style="width: 5%;"
                  >
                    {{ item.uom1 }}</td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.quantity) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.priceNotVat) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 20%;"
                  >
                    {{ $formatNumberToLocale(item.totalPriceNotVat) }}
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <!-- END - Body -->
        </table>
        <b-row
          v-if="redInvoiceNo != 'null'"
          :key="redInvoiceNo"
          class="mx-0 mb-3"
          align-h="end"
        >
          <div
            class="rounded d-flex align-items-center mt-2 p-1"
            style="border: 2px dotted; width: 28%;"
          >
            <div class="width-40-per">
              <p class="italic">
                Điều chỉnh:
              </p>
              <p class="italic">
                Tổng cộng:
              </p>
            </div>
            <div class="width-60-per text-right">
              <p
                class="italic"
                style="opacity: 0;"
              >
                Điều chỉnh:
              </p>
              <p class="italic">
                <strong>{{ $formatNumberToLocale(order.totalPriceNotVat) }}</strong>
              </p>
            </div>
          </div>
        </b-row>
      </b-col>
    </template>

    <b-row
      v-if="expBorrow.orderImports.length > 0"
      class="mx-0 font-italic"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
      >Loại: Xuất vay mượn</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(expBorrow.totalQuantity || 0) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(expBorrow.totalPriceVat || 0) }}</strong>
      </div>
    </b-row>
    <template>
      <b-col
        v-for="order in expBorrow.orderImports"
        :key="order.redInvoiceNo"
        class="px-0"
      >
        <table>
          <!-- START - Header -->
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ order.redInvoiceNo }}</div>
                <div>- Ngày HĐ: {{ $formatISOtoVNI(order.orderDate) }}</div>
                <div>- Số PO: {{ order.poNumber }}</div>
                <div>- Số nội bộ: {{ order.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ order.transCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
              >
                <div
                  class="text-right"
                  style="width: 58%;"
                >Tổng SL: </div>
                <div
                  class="text-right"
                  style="width: 10%;"
                >
                  {{ $formatNumberToLocale(order.totalQuantity) }}
                </div>
                <div
                  class="text-right"
                  style="width: 17%;"
                >T.Tiền: </div>
                <div
                  class="text-right"
                  style="width: 13%;"
                >
                  {{ $formatNumberToLocale(order.totalPriceVat) }}
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center"
            >
              STT
            </th>
            <th
              class="text-left pl-50"
            >
              Mã SP
            </th>
            <th
              class="text-left pl-50"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-right pr-50"
            >
              SL
            </th>
            <th class="text-right pr-50">
              Giá
            </th>
            <th class="text-right pr-50">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <template
              v-for="(cat, name) in order.cats"
            >
              <tr
                v-if="Array.isArray(order.cats)"
                :key="name"
              >
                <td
                  colspan="7"
                >
                  <b-row>
                    <div
                      style="width: 12%;"
                      class="text-right italic"
                    >
                      Ngành hàng:
                    </div>
                    <div
                      style="width: 9%;"
                      class="text-right bold italic"
                    >
                      {{ cat.catName }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 37%;"
                    >
                      Tổng SL:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 10%;"
                    >
                      {{ $formatNumberToLocale(cat.totalQuantity) }}
                    </div>
                    <div
                      class="text-right italic"
                      style="width: 17%;"
                    >
                      T.Tiền:
                    </div>
                    <div
                      class="text-right bold italic"
                      style="width: 13%;"
                    >
                      {{ $formatNumberToLocale(cat.totalPriceVat) }}
                    </div>
                  </b-row>
                </td>
              </tr>

              <template
                v-if="Array.isArray(order.cats)"
              >
                <tr
                  v-for="(item, index) in cat.products"
                  :key="index"
                >
                  <td
                    class="text-center"
                    style="width: 1%;"
                  >{{ index + 1 }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 10%;"
                  >{{ item.productCode }}</td>
                  <td
                    class="text-left pl-50"
                    style="width: 40%;"
                  >{{ item.productName }}</td>
                  <td
                    class="text-center"
                    style="width: 5%;"
                  >
                    {{ item.uom1 }}</td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.quantity) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 10%;"
                  >
                    {{ $formatNumberToLocale(item.price) }}
                  </td>
                  <td
                    class="text-right pr-50"
                    style="width: 20%;"
                  >
                    {{ $formatNumberToLocale(item.totalPriceVat) }}
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <!-- END - Body -->
        </table>
        <b-row
          v-if="redInvoiceNo != 'null'"
          :key="redInvoiceNo"
          class="mx-0 mb-3"
          align-h="end"
        >
          <div
            class="rounded d-flex align-items-center mt-2 p-1"
            style="border: 2px dotted; width: 28%;"
          >
            <div class="width-40-per">
              <p class="italic">
                Điều chỉnh:
              </p>
              <p class="italic">
                Tổng cộng:
              </p>
            </div>
            <div class="width-60-per text-right">
              <p
                class="italic"
                style="opacity: 0;"
              >
                Điều chỉnh:
              </p>
              <p class="italic">
                <strong>{{ $formatNumberToLocale(order.totalPriceVat) }}</strong>
              </p>
            </div>
          </div>
        </b-row>
      </b-col>
    </template>
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
  REPORT_OUTPUT_GOODS,
  // Getters
  PRINT_OUTPUT_GOODS_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-output/store-module/type'
import {
  PRINTERCONFIG,
  PRINTER_CLIENT_GETTER,
} from '../../../views/auth/printer-configuration-modal/store-module/type'

export default {
  data() {
    return {
      expAdjust: { orderImports: [] },
      expBorrow: { orderImports: [] },
      expPO: { orderImports: [] },
    }
  },
  computed: {
    ...mapGetters(REPORT_OUTPUT_GOODS, [
      PRINT_OUTPUT_GOODS_GETTER,
    ]),
    ...mapGetters(PRINTERCONFIG, [PRINTER_CLIENT_GETTER]),
    printInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER) {
        return {
          shopName: this.PRINT_OUTPUT_GOODS_GETTER.shopName,
          shopAddress: this.PRINT_OUTPUT_GOODS_GETTER.address,
          shopPhone: this.PRINT_OUTPUT_GOODS_GETTER.shopTel,
          fromDate: this.PRINT_OUTPUT_GOODS_GETTER.fromDate,
          toDate: this.PRINT_OUTPUT_GOODS_GETTER.toDate,
          printDate: new Date(),
          totalQuantity: this.PRINT_OUTPUT_GOODS_GETTER.totalQuantity,
          totalPriceVat: this.PRINT_OUTPUT_GOODS_GETTER.totalAmount,
        }
      }
      return {}
    },

    lstAdjustInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.expAdjust) {
        return this.PRINT_OUTPUT_GOODS_GETTER.expAdjust
      }
      return { orderImports: [] }
    },

    lstPoInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.expPO) {
        return this.PRINT_OUTPUT_GOODS_GETTER.expPO
      }
      return { orderImports: [] }
    },

    lstStockInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.expBorrow) {
        return this.PRINT_OUTPUT_GOODS_GETTER.expBorrow
      }
      return { orderImports: [] }
    },
    printerOptions() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    lstAdjustInfo() {
      this.expAdjust = { ...this.lstAdjustInfo }
    },
    lstPoInfo() {
      this.expPO = { ...this.lstPoInfo }
    },
    lstStockInfo() {
      this.expBorrow = { ...this.lstStockInfo }
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
          const element = document.getElementById('rp-output-store')
          const options = {
            fileName: 'Bao_cao_xuat_hang',
            format: 'a3',
            // orientation: 'landscape',
            // rotate: 'Rot90',
            pageSizing: 'Fit',
            scale: 2.5,
            isPaging: true,
            pagebreak: { avoid: 'b-row' },
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
.italic{
  font-style: italic;
}
.bold{
  font-weight: bold;
}
table {
  width: 100%;
  border: 1.8px solid;
  border-collapse: collapse;
}
th {
  border-style: solid;
  border-width: 1.8px;
}
td {
  border-left: 1.8px dashed;
  border-right: 1.8px dashed;
  border-bottom: 1.8px dashed;
  border-collapse: collapse;
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
</style>
