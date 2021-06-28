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
          Từ ngày: {{ printInfo.fromDate }} đến ngày: {{ printInfo.toDate }}
        </p>
        <p>Ngày in: {{ printInfo.printDate }}</p>
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
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <div>Tổng cộng: <strong>29</strong></div>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(printInfo.totalQuantity) }}</strong></div>
      <div>T.Tiền: <strong>{{ $formatNumberToLocale(printInfo.totalAmount) }}</strong></div>
    </b-row>
    <!-- END - Total section 1 -->

    <!-- START - Table section 1 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0 font-italic"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất điều chỉnh</strong>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(lstAdjustInfo.quantity) }}</strong></div>
      <div>T.Tiền: <strong>{{ $formatNumberToLocale(lstAdjustInfo.totalAmount) }}</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ lstAdjustInfo.orderNumber }}</div>
                <div>- Ngày HĐ: {{ lstAdjustInfo.orderDate }}</div>
                <div>- Số PO: {{ lstAdjustInfo.poNumber }}</div>
                <div>- Số nội bộ: {{ lstAdjustInfo.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ lstAdjustInfo.tranCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: {{ $formatNumberToLocale(lstAdjustInfo.quantity) }}</div>
                <div>T.Tiền: {{ $formatNumberToLocale(lstAdjustInfo.totalAmount) }}</div>
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
              class="text-center"
            >
              Mã SP
            </th>
            <th
              class="text-center"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-center"
            >
              SL
            </th>
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <template v-for="(cat, name) in lstAdjust">
            <tr
              v-if="name != 'null'"
              :key="name"
            >
              <td
                colspan="7"
              >
                <b-row
                  align-h="around"
                >
                  <div>
                    Ngành hàng: {{ name }}
                  </div>
                  <div>
                    Tổng SL: {{ $formatNumberToLocale(cat.slice(-1)[0].quantity) }}
                  </div>
                  <div>
                    T.Tiền: {{ $formatNumberToLocale(cat.slice(-1)[0].totalAmount) }}
                  </div>
                </b-row>
              </td>
            </tr>

            <tr
              v-for="(item, index) in cat.slice(0, -1)"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.productName }}</td>
              <td class="text-center">
                {{ item.unit }}</td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.price) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.totalAmount) }}
              </td>
            </tr>
          </template>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0 mb-3"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 1 -->

    <!-- START - Table section 2 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0 font-italic"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất trả PO</strong>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(lstPoInfo.quantity) }}</strong></div>
      <div>T.Tiền: <strong>{{ $formatNumberToLocale(lstPoInfo.totalAmount) }}</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ lstPoInfo.orderNumber }}</div>
                <div>- Ngày HĐ: {{ lstPoInfo.orderDate }}</div>
                <div>- Số PO: {{ lstPoInfo.poNumber }}</div>
                <div>- Số nội bộ: {{ lstPoInfo.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ lstPoInfo.tranCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: {{ $formatNumberToLocale(lstPoInfo.quantity) }}</div>
                <div>T.Tiền: {{ $formatNumberToLocale(lstPoInfo.totalAmount) }}</div>
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
              class="text-center"
            >
              Mã SP
            </th>
            <th
              class="text-center"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-center"
            >
              SL
            </th>
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <template v-for="(cat, name) in lstPo">
            <tr
              v-if="name != 'null'"
              :key="name"
            >
              <td
                colspan="7"
              >
                <b-row
                  align-h="around"
                >
                  <div>
                    Ngành hàng: {{ name }}
                  </div>
                  <div>
                    Tổng SL: {{ $formatNumberToLocale(cat.slice(-1)[0].quantity) }}
                  </div>
                  <div>
                    T.Tiền: {{ $formatNumberToLocale(cat.slice(-1)[0].totalAmount) }}
                  </div>
                </b-row>
              </td>
            </tr>

            <tr
              v-for="(item, index) in cat.slice(0, -1)"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.productName }}</td>
              <td class="text-center">
                {{ item.unit }}</td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.price) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.totalAmount) }}
              </td>
            </tr>
          </template>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0 mb-3"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 2 -->

    <!-- START - Table section 3 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0 font-italic"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất vay mượn</strong>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(lstStockInfo.quantity) }}</strong></div>
      <div>T.Tiền: <strong>{{ $formatNumberToLocale(lstStockInfo.totalAmount) }}</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="7"
              class="font-italic"
            >
              <b-row
                align-h="around"
              >
                <div>Số HĐ: {{ lstStockInfo.orderNumber }}</div>
                <div>- Ngày HĐ: {{ lstStockInfo.orderDate }}</div>
                <div>- Số PO: {{ lstStockInfo.poNumber }}</div>
                <div>- Số nội bộ: {{ lstStockInfo.internalNumber }}</div>
                <div>- Mã xuất hàng: {{ lstStockInfo.tranCode }}</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: {{ $formatNumberToLocale(lstStockInfo.quantity) }}</div>
                <div>T.Tiền: {{ $formatNumberToLocale(lstStockInfo.totalAmount) }}</div>
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
              class="text-center"
            >
              Mã SP
            </th>
            <th
              class="text-center"
            >
              Tên SP
            </th>
            <th
              class="text-center"
            >
              ĐVT
            </th>
            <th
              class="text-center"
            >
              SL
            </th>
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 2 -->
        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <template v-for="(cat, name) in lstStock">
            <tr
              v-if="name != 'null'"
              :key="name"
            >
              <td
                colspan="7"
              >
                <b-row
                  align-h="around"
                >
                  <div>
                    Ngành hàng: {{ name }}
                  </div>
                  <div>
                    Tổng SL: {{ $formatNumberToLocale(cat.slice(-1)[0].quantity) }}
                  </div>
                  <div>
                    T.Tiền: {{ $formatNumberToLocale(cat.slice(-1)[0].totalAmount) }}
                  </div>
                </b-row>
              </td>
            </tr>

            <tr
              v-for="(item, index) in cat.slice(0, -1)"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.productCode }}</td>
              <td>{{ item.productName }}</td>
              <td class="text-center">
                {{ item.unit }}</td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.price) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(item.totalAmount) }}
              </td>
            </tr>
          </template>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0 mb-3"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 3 -->

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
      if (this.PRINT_OUTPUT_GOODS_GETTER.info) {
        return {
          shopName: this.PRINT_OUTPUT_GOODS_GETTER.info.shopName,
          shopAddress: this.PRINT_OUTPUT_GOODS_GETTER.info.shopAddress,
          shopPhone: this.PRINT_OUTPUT_GOODS_GETTER.info.shopPhone,
          fromDate: this.PRINT_OUTPUT_GOODS_GETTER.info.fromDate,
          toDate: this.PRINT_OUTPUT_GOODS_GETTER.info.toDate,
          printDate: this.PRINT_OUTPUT_GOODS_GETTER.info.printDate,
          totalQuantity: this.PRINT_OUTPUT_GOODS_GETTER.info.totalQuantity,
          totalAmount: this.PRINT_OUTPUT_GOODS_GETTER.info.totalAmount,
        }
      }
      return {}
    },

    lstAdjustInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstAdjust) {
        const details = this.PRINT_OUTPUT_GOODS_GETTER.response.lstAdjust.slice(-1)[0]
        return {
          ...this.PRINT_OUTPUT_GOODS_GETTER.response.lstAdjust[0],
          quantity: details.quantity,
          totalAmount: details.totalAmount,
        }
      }
      return {}
    },

    lstAdjust() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstAdjust) {
        const items = this.PRINT_OUTPUT_GOODS_GETTER.response.lstAdjust
        const results = items.reduce((r, a) => {
          // eslint-disable-next-line no-param-reassign
          r[a.productCategory] = r[a.productCategory] || []
          r[a.productCategory].push(a)
          return r
        }, Object.create(null))
        return results
      }
      return []
    },

    lstPoInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstPo) {
        const details = this.PRINT_OUTPUT_GOODS_GETTER.response.lstPo.slice(-1)[0]
        return {
          ...this.PRINT_OUTPUT_GOODS_GETTER.response.lstPo[0],
          quantity: details.quantity,
          totalAmount: details.totalAmount,
        }
      }
      return {}
    },

    lstPo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstPo) {
        const items = this.PRINT_OUTPUT_GOODS_GETTER.response.lstPo
        const results = items.reduce((r, a) => {
          // eslint-disable-next-line no-param-reassign
          r[a.productCategory] = r[a.productCategory] || []
          r[a.productCategory].push(a)
          return r
        }, Object.create(null))
        return results
      }
      return []
    },

    lstStockInfo() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstStock) {
        const details = this.PRINT_OUTPUT_GOODS_GETTER.response.lstStock.slice(-1)[0]
        return {
          ...this.PRINT_OUTPUT_GOODS_GETTER.response.lstStock[0],
          quantity: details.quantity,
          totalAmount: details.totalAmount,
        }
      }
      return {}
    },

    lstStock() {
      if (this.PRINT_OUTPUT_GOODS_GETTER.response && this.PRINT_OUTPUT_GOODS_GETTER.response.lstStock) {
        const items = this.PRINT_OUTPUT_GOODS_GETTER.response.lstStock
        const results = items.reduce((r, a) => {
          // eslint-disable-next-line no-param-reassign
          r[a.productCategory] = r[a.productCategory] || []
          r[a.productCategory].push(a)
          return r
        }, Object.create(null))
        return results
      }
      return []
    },
  },
  updated() {
    window.print()
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
}
td {
  border-style: dotted;
  border-width: 2px;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 0;
        margin-bottom: 0;
        size: landscape;
    }
</style>
