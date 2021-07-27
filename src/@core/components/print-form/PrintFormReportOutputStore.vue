<template>
  <b-container
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
      class="mx-0 font-italic"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
        class="text-right"
      >Loại: Xuất điều chỉnh</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(lstAdjustInfo.totalQuantity) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(lstAdjustInfo.totalPriceVat) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <template>
      <b-col
        v-for="order in lstAdjustInfo.orderImports"
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
      </b-col>

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
              <strong>{{ $formatNumberToLocale(lstAdjustInfo.totalPriceVat) }}</strong>
            </p>
          </div>
        </div>
      </b-row>
    </template>

    <b-row
      class="mx-0 font-italic"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
        class="text-right"
      >Loại: Xuất trả PO</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(lstPoInfo.totalQuantity) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(lstPoInfo.totalPriceVat) }}</strong>
      </div>
    </b-row>
    <template>
      <b-col
        v-for="order in lstPoInfo.orderImports"
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
                    {{ $formatNumberToLocale(item.priceNotVat) }}
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
      </b-col>

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
              <strong>{{ $formatNumberToLocale(lstPoInfo.totalPriceVat) }}</strong>
            </p>
          </div>
        </div>
      </b-row>
    </template>

    <b-row
      class="mx-0 font-italic"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong
        style="font-size: 16px; width: 20%;"
        class="text-right"
      >Loại: Xuất vay mượn</strong>
      <div
        class="text-right"
        style="width: 38%;"
      >Tổng SL: </div>
      <div
        class="text-right"
        style="width: 10%;"
      >
        <strong>{{ $formatNumberToLocale(lstStockInfo.totalQuantity) }}</strong>
      </div>
      <div
        class="text-right"
        style="width: 17%;"
      >T.Tiền: </div>
      <div
        class="text-right"
        style="width: 14%;"
      >
        <strong>{{ $formatNumberToLocale(lstStockInfo.totalPriceVat) }}</strong>
      </div>
    </b-row>
    <template>
      <b-col
        v-for="order in lstStockInfo.orderImports"
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
      </b-col>

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
              <strong>{{ $formatNumberToLocale(lstStockInfo.totalPriceVat) }}</strong>
            </p>
          </div>
        </div>
      </b-row>
    </template>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  REPORT_OUTPUT_GOODS,
  // Getters
  PRINT_OUTPUT_GOODS_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-output/store-module/type'

export default {
  computed: {
    ...mapGetters(REPORT_OUTPUT_GOODS, [
      PRINT_OUTPUT_GOODS_GETTER,
    ]),

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
      return {}
    },

    lstPoInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.expPO) {
        return this.PRINT_OUTPUT_GOODS_GETTER.expPO
      }
      return {}
    },

    lstStockInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.expBorrow) {
        return this.PRINT_OUTPUT_GOODS_GETTER.expBorrow
      }
      return {}
    },

  },
  updated() {
    window.print()
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
}
th {
  border-style: solid;
  border-width: 2px;
}
td {
  border-style: dotted;
  border-width: 2px;
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
