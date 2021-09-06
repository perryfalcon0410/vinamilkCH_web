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
import jsPDF from 'jspdf'
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable'
import { printFile } from '@/@core/utils/utils'
import JSPM from 'jsprintmanager'
import { myFontNormal } from '@/@core/libs/Arimo-Regular'
import { myFontBold } from '@/@core/libs/Arimo-Bold'
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
      ipAddress: '',
      printerName: null,
      bodyData: [],
      count: 1,
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
    printerOptions() {
      this.printerName = this.printerOptions.reportPrinterName
    },
  },
  updated() {
    JSPM.JSPrintManager.auto_reconnect = true
    if (this.printerName === '' || this.printerName === null || this.printerName === undefined) {
      toasts.error('Không tìm thấy tên máy in. Bạn hãy vào cấu hình máy in')
    } else {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      // START - add font family
      pdf.addFileToVFS('Ario-Regular.ttf', myFontNormal)
      pdf.addFileToVFS('Ario-Bold.ttf', myFontBold)
      pdf.addFont('Ario-Regular.ttf', 'Ario-Regular', 'normal')
      pdf.addFont('Ario-Bold.ttf', 'Ario-Bold', 'normal')
      // END - add font family

      // START - hearder page
      pdf.setFont('Ario-Bold')
      pdf.setFontSize(13)
      pdf.text('Cửa hàng Xuất hàng', 90, 10)
      pdf.setFontSize(9)
      pdf.text(`${this.printInfo.shopName}`, 5, 10)
      pdf.setFontSize(8)
      pdf.setFont('Ario-Regular')
      pdf.text(`Add: ${this.printInfo.shopAddress}`, 5, 17)
      pdf.text(`Tel: ${this.printInfo.shopPhone || ''}`, 5, 24)
      pdf.text(`Từ ngày: ${this.$formatISOtoVNI(this.printInfo.fromDate)}       Đến ngày: ${this.$formatISOtoVNI(this.printInfo.toDate)}`, 83, 17)
      pdf.text(`Ngày in: ${this.$formatPrintDate(this.printInfo.printDate)}`, 91, 24)
      // END - hearder page

      // START - table tổng đầu tiên
      this.createTableHeader(pdf)
      // END - table tổng đầu tiên

      // START - table xuất điều chỉnh
      this.createTableExpAdjust(pdf)
      // END - table xuất điều chỉnh

      // START - table xuất PO
      this.createTableExpPO(pdf)
      // END - table xuất PO

      // START - table xuất vay mượn
      this.createTableExpBorrow(pdf)
      // END - table xuất vay mượn

      for (let j = 1; j <= pdf.internal.getNumberOfPages(); j += 1) {
        pdf.setPage(j)
        pdf.text(`${j} / ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10)
      }
      printFile('Bao_cao_xuat_hang.pdf', this.printerName, pdf)
      this.count = 1
      //   for (let i = 0; i < 3; i += 1) {
      //     if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open && i < 3) {

    //       // pdf.save()
    //       const options = {
    //         fileName: 'Bao_cao_xuat_hang',
    //         pageSizing: 'Fit',
    //       }
    //       if (jspmCheckStatus()) {
    //         if (this.printerName.includes('PDF')) {
    //           pdf.save('bao_cao_xuat_hang.pdf')
    //         } else {
    //           jsPdfPrint(pdf.output('datauristring'), this.printerName, options)
    //         }
    //       }
    //       break
    //     } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed && i === 2) {
    //       toasts.error('Bạn hãy vào cấu hình máy in trước khi in.')
    //       window.print()
    //     }
    //   }
    }
  },
  methods: {
    createTableHeader(pdf) {
      pdf.autoTable({
        startY: 30,
        margin: {
          right: 5,
          left: 5,
        },
        styles: {
          font: 'Ario-Regular',
          fontSize: 9,
          textColor: 'black',
        },
        body: [
          [
            {
              content: 'Tổng SL :',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 132.5 },
            },
            {
              content: `${this.$formatNumberToLocale(this.printInfo.totalQuantity)}`,
              styles: {
                halign: 'right', font: 'Ario-Bold', fillColor: [211, 211, 211], cellWidth: 17.5,
              },
            },
            {
              content: 'T.Tiền :',
              styles: { halign: 'right', fillColor: [211, 211, 211], cellWidth: 20 },
            },
            {
              content: `${this.$formatNumberToLocale(this.printInfo.totalPriceVat)}`,
              styles: {
                font: 'Ario-Bold', halign: 'right', fillColor: [211, 211, 211], cellWidth: 30,
              },
            },
          ],
        ],
      })
    },
    // Start - Bảng xuất điều chỉnh
    createTableExpAdjust(pdf) {
      if (this.expAdjust.orderImports.length > 0) {
        pdf.autoTable({
          startY: 37,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
            // bottom: 0,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Xuất điều chỉnh', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expAdjust.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expAdjust.totalPriceVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 30 } },
            ],
          ],
          headStyles: {
            Loai: { font: 'Ario-Bold', fontSize: 14 },
          },
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.expAdjust.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.expAdjust.orderImports[i].redInvoiceNo}` },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.expAdjust.orderImports[i].orderDate)}` },
                { content: this.expAdjust.orderImports[i].poNumber === null ? '- Số PO:' : `- Số PO: ${this.expAdjust.orderImports[i].poNumber}` },
                { content: this.expAdjust.orderImports[i].internalNumber === null ? '- Số nội bộ:' : `- Số nội bộ: ${this.expAdjust.orderImports[i].internalNumber}` },
                { content: `- Mã xuất hàng: ${this.expAdjust.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expAdjust.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expAdjust.orderImports[i].totalPriceVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.expAdjust.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.totalPriceVat)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            pageBreak: 'avoid',
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []
          this.count = 1

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.expAdjust.orderImports[i].totalPriceVat, this.expAdjust.orderImports[i].redInvoiceNo)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng xuất điều chỉnh

    // START - Bảng xuất PO
    createTableExpPO(pdf) {
      if (this.expPO.orderImports.length > 0) {
        const startY = (this.expAdjust.orderImports.length === 0) ? { startY: 37 } : { }
        pdf.autoTable({
          ...startY,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
          },
          rowPageBreak: 'avoid',
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Xuất trả PO', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expPO.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expPO.totalPriceNotVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right' } },
            ],
          ],
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.expPO.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            rowPageBreak: 'avoid',
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.expPO.orderImports[i].redInvoiceNo}`, halign: 'right' },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.expPO.orderImports[i].orderDate)}` },
                { content: this.expPO.orderImports[i].poNumber === null ? '- Số PO:' : `- Số PO: ${this.expPO.orderImports[i].poNumber}` },
                { content: this.expPO.orderImports[i].internalNumber === null ? '- Số nội bộ:' : `- Số nội bộ: ${this.expPO.orderImports[i].internalNumber}` },
                { content: `- Mã xuất hàng: ${this.expPO.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            rowPageBreak: 'avoid',
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expPO.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expPO.orderImports[i].totalPriceNotVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.expPO.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceNotVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.priceNotVat)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.totalPriceNotVat)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            pageBreak: 'avoid',
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []
          this.count = 1

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.expPO.orderImports[i].totalPriceNotVat, this.expPO.orderImports[i].redInvoiceNo)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng xuất PO

    // START - Bảng xuất vay mượn
    createTableExpBorrow(pdf) {
      if (this.expBorrow.orderImports.length > 0) {
        const startY = (this.expAdjust.orderImports.length === 0 && this.expPO.orderImports.length === 0) ? { startY: 37 } : { }
        pdf.autoTable({
          ...startY,
          theme: 'plain',
          margin: {
            right: 5,
            left: 5,
          },
          styles: {
            font: 'Ario-Regular',
            fontSize: 9,
            textColor: 'black',
          },
          body: [
            [
              { content: 'Loại: Xuất vay mượn', styles: { font: 'Ario-Bold', cellWidth: 115 } },
              { content: 'Tổng SL :', styles: { cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expBorrow.totalQuantity || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 15 } },
              { content: 'T.Tiền :', styles: { halign: 'right', cellWidth: 20 } },
              { content: `${this.$formatNumberToLocale(this.expBorrow.totalPriceVat || 0)}`, styles: { font: 'Ario-Bold', halign: 'right', cellWidth: 30 } },
            ],
          ],
          didDrawCell: data => {
            if (data.section === 'body' && data.row.index === 0) {
              pdf.setDrawColor('black')
              pdf.setLineWidth(0.1)
              pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
            }
          },
        })

        for (let i = 0; i < this.expBorrow.orderImports.length; i += 1) {
          const startYTotal = (i === 0) ? { startY: pdf.previousAutoTable.finalY } : {}
          pdf.autoTable({
            theme: 'plain',
            ...startYTotal,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Bold',
              fontSize: 7.5,
              textColor: 'black',
            },
            tableLineWidth: 0,
            tableLineColor: 'black',
            body: [
              [
                { content: `Số HĐ: ${this.expBorrow.orderImports[i].redInvoiceNo}`, halign: 'right' },
                { content: `- Ngày HĐ: ${this.$formatISOtoVNI(this.expBorrow.orderImports[i].orderDate)}` },
                { content: this.expBorrow.orderImports[i].poNumber === null ? '- Số PO:' : `- Số PO: ${this.expBorrow.orderImports[i].poNumber}` },
                { content: this.expBorrow.orderImports[i].internalNumber === null ? '- Số nội bộ:' : `- Số nội bộ: ${this.expBorrow.orderImports[i].internalNumber}` },
                { content: `- Mã xuất hàng: ${this.expBorrow.orderImports[i].transCode}` },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 4) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          pdf.autoTable({
            startY: pdf.previousAutoTable.finalY,
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            body: [
              [
                {
                  content: 'Tổng SL :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 132.5 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expBorrow.orderImports[i].totalQuantity)}`,
                  styles: {
                    halign: 'right', font: 'Ario-Bold', fillColor: 'white', cellWidth: 17.5,
                  },
                },
                {
                  content: 'T.Tiền :',
                  styles: { halign: 'right', fillColor: 'white', cellWidth: 20 },
                },
                {
                  content: `${this.$formatNumberToLocale(this.expBorrow.orderImports[i].totalPriceVat)}`,
                  styles: {
                    font: 'Ario-Bold', halign: 'right', fillColor: 'white', cellWidth: 30,
                  },
                },
              ],
            ],
            didDrawCell: data => {
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cursor.y + data.cell.height, data.cell.x + data.cell.width, data.cursor.y + data.cell.height)
              }
              if (data.section === 'body' && data.column.index === 3) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
            },
          })

          this.expBorrow.orderImports[i].cats.forEach(data => {
            const row = [
              { content: 'Ngành hàng:', colSpan: 2, styles: { lineWidth: 0 } },
              { content: `${data.catName}`, styles: { font: 'Ario-Bold', lineWidth: 0 } },
              { content: 'Tổng SL :', styles: { lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalQuantity)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
              { content: 'T.Tiền :', styles: { halign: 'right', lineWidth: 0 } },
              { content: `${this.$formatNumberToLocale(data.totalPriceVat)}`, styles: { font: 'Ario-Bold', halign: 'right', lineWidth: 0 } },
            ]
            this.bodyData.push(row)
            data.products.forEach(pro => {
              this.bodyData.push([
                { content: `${this.count}`, styles: { cellWidth: 10 } },
                { content: `${pro.productCode}`, styles: { cellWidth: 25 } },
                { content: `${pro.productName}`, styles: { cellWidth: 80 } },
                { content: `${pro.uom1}`, styles: { cellWidth: 20, halign: 'center' } },
                { content: `${this.$formatNumberToLocale(pro.quantity)}`, styles: { cellWidth: 15, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.price)}`, styles: { cellWidth: 20, halign: 'right' } },
                { content: `${this.$formatNumberToLocale(pro.totalPriceVat)}`, styles: { cellWidth: 30, halign: 'right' } },
              ])
              this.count += 1
            })
          })

          pdf.autoTable({
            theme: 'grid',
            startY: pdf.previousAutoTable.finalY,
            pageBreak: 'avoid',
            margin: {
              right: 5,
              left: 5,
            },
            styles: {
              font: 'Ario-Regular',
              fontSize: 9,
              textColor: 'black',
            },
            headStyles: {
              fillColor: 'white',
              font: 'Ario-Bold',
              textColor: 'black',
              fontSize: 9,
              lineWidth: 0.1,
              lineColor: 'black',
            },
            didDrawCell: data => {
              if (data.section === 'body' && data.row.raw.length === 6) {
                pdf.setDrawColor(200)
                pdf.setLineWidth(0.01)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 0) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
              }
              if (data.section === 'body' && data.column.index === 6) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x + data.cell.width, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y)
              }
              if (data.section === 'body' && data.row.index === data.table.body.length - 1) {
                pdf.setDrawColor('black')
                pdf.setLineWidth(0.1)
                pdf.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height)
              }
            },
            columns: [
              { header: 'STT', dataKey: 'STT', cellWidth: 10 },
              { header: 'Mã SP', dataKey: 'Mã SP', cellWidth: 35 },
              { header: 'Tên SP', dataKey: 'Tên SP', cellWidth: 60 },
              { header: 'ĐVT', dataKey: 'ĐVT', cellWidth: 15 },
              { header: 'SL', dataKey: 'SL', cellWidth: 15 },
              { header: 'Giá', dataKey: 'Giá', cellWidth: 20 },
              { header: 'T.Tiền', dataKey: 'T.Tiền', cellWidth: 30 },
            ],
            body: [...this.bodyData],
          })
          this.bodyData = []
          this.count = 1

          // START - table tổng cộng và điều chỉnh
          this.createTableTotal(pdf, this.expBorrow.orderImports[i].totalPriceVat, this.expBorrow.orderImports[i].redInvoiceNo)
          // END - table tổng cộng và điều chỉnh
        }
        this.count = 1
      }
    },
    // END - Bảng xuất vay mượn

    // START - table tổng cộng và điều chỉnh
    createTableTotal(pdf, data, redInvoiceNo) {
      if (redInvoiceNo !== 'null') {
        pdf.autoTable({
          theme: 'plain',
          startY: pdf.previousAutoTable.finalY + 2,
          margin: { left: 145, right: 5 },
          styles: {
            font: 'Ario-Bold',
            fontSize: 9,
            textColor: 'black',
          },
          tableLineWidth: 0.1,
          tableLineColor: [211, 211, 211],
          tableWidth: 60,
          body: [
            [
              { content: 'Điều chỉnh:', styles: { halign: 'right' } },
              { content: '', styles: { halign: 'right' } },
            ],
            [
              { content: 'T.Cộng:', styles: { halign: 'right' } },
              { content: `${this.$formatNumberToLocale(data)}`, styles: { halign: 'right' } },
            ],
          ],
        })
      }
    },
    // END - table tổng cộng và điểu chỉnh
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
