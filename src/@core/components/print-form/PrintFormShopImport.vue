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
        <strong style="font-size: 30px"> Cửa hàng nhập hàng </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày: {{ $formatISOtoVNI(commonData.fromDate) }}
          </p>
          <p>
            Đến ngày: {{ $formatISOtoVNI(commonData.toDate) }}
          </p>
        </b-row>
        <p>Ngày in : {{ $formatPrintDate(commonData.printDate) }} </p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> shopName </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0 width-100-per total"
      align-v="end"
    >
      <div
        style="visibility: hidden; width: 56.3%;"
        class="ml-1"
      ><strong>Loại: A </strong>
      </div>
      <div
        style="width: 7%;"
        class="text-right"
      ><i class="normal-weight">Tổng SL:</i>
      </div>
      <i
        style="width: 8.7%;"
        class="text-right"
      >
        <strong><u>{{ $formatNumberToLocale(totalData.quantity) }}</u></strong>
      </i>
      <i
        style="width: 12.6%;"
        class="text-right"
      >
        T.Tiền:
      </i>
      <div
        style="width: 13.7%;"
        class="text-right"
      >
        <strong>{{ $formatNumberToLocale(totalData.total) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <div
      v-if="lstPo.orderImport.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: {{ lstPo.type }}</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstPo.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstPo.totalAmount) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstPo.orderImport"
        :key="index"
        class="px-0 pb-1"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.orderNumber }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.importNumber }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.orderQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.orderTotal) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ item.category }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(item.orderQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(item.orderTotal) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in item.data"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.total) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-5">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.vat) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.totalAmount) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- END - Table 1 -->

    <!-- START - Total section 2 -->
    <div
      v-if="lstAdjust.orderImport.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: {{ lstAdjust.type }}</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstAdjust.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstAdjust.totalAmount) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstAdjust.orderImport"
        :key="index"
        class="px-0 pb-1"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.orderNumber }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.importNumber }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.orderQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.orderTotal) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ item.category }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(item.orderQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(item.orderTotal) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in item.data"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.total) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-5">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.vat) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.totalAmount) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- END - Table 1 -->

    <!-- START - Total section 2 -->
    <div
      v-if="lstBorrow.orderImport.length > 0"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per top-border-only"
        align-v="end"
      >
        <div
          style="width: 56.3%;"
          class="ml-1"
        ><strong class="big-font"><i>Loại: {{ lstBorrow.type }}</i> </strong>
        </div>
        <div
          style="width: 7%;"
          class="text-right"
        ><i>Tổng SL:</i>
        </div>
        <div
          style="width: 8.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstBorrow.totalQuantity) }} </strong>
        </div>
        <div
          style="width: 12.6%"
          class="text-right"
        ><i>T.Tiền:</i>

        </div>
        <div
          style="width: 13.7%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(lstBorrow.totalAmount) }} </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
        v-for="(item,index) in lstBorrow.orderImport"
        :key="index"
        class="px-0 pb-1"
      >
        <table
          class="mb-50"
        >
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.orderNumber }} <span class="pl-1">- Ngày HĐ: {{ $formatISOtoVNI(item.orderDate) }}</span> <span class="pl-1">- Số PO: {{ item.poNumber }}</span> <span class="pl-5">- Số nội bộ: {{ item.internalNumber }}</span> <span class="pl-1">- Mã nhập hàng: {{ item.importNumber }}</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 54%;"
                  />
                  <i
                    style="width: 10.6%;"
                    class="text-right normal-weight"
                  >Tổng SL:
                  </i>
                  <i
                    style="width: 8.7%;"
                    class="text-right"
                  >
                    <strong class="text-right">{{ $formatNumberToLocale(item.orderQuantity) }}</strong>
                  </i>
                  <i
                    style="width: 12.7%;"
                    class="text-right normal-weight"
                  >T.Tiền:
                  </i>
                  <div
                    style="width: 13.8%;"
                    class="text-right"
                  ><strong>{{ $formatNumberToLocale(item.orderTotal) }}</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                class="text-center"
                style="width: 5%"
              >
                STT
              </th>
              <th style="width: 13%">
                Mã SP
              </th>
              <th style="width: 42%">
                Tên SP
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                ĐVT
              </th>
              <th
                class="text-center"
                style="width: 7%"
              >
                SL
              </th>
              <th
                class="text-center"
                style="width: 10%"
              >
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- END - Header 2 -->
            </tr>
            <tr>
              <th
                colspan="7"
                class="bot-border-dotted"
              >
                <b-row>
                  <b-col class="ml-1">
                    Ngành hàng: {{ item.category }}
                  </b-col>
                  <b-col>
                    <b-row class="width-100-per mx-0">
                      <i
                        style="width: 26.4%; text-align: right"
                        class="normal-weight"
                      >Tổng SL:</i> <i style="width: 18.1%; text-align: right"> {{ $formatNumberToLocale(item.orderQuantity) }}</i>
                      <i
                        style="width: 26.5%; text-align: right"
                        class="normal-weight"
                      >T.Tiền:</i> <span style="width: 28.5%; text-align: right;"> {{ $formatNumberToLocale(item.orderTotal) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in item.data"
              :key="stt"
            >
              <td class="text-right pr-50">
                {{ stt + 1 }}
              </td>
              <td class="px-50">
                {{ product.productCode }}
              </td>
              <td class="px-50">
                {{ product.productName }}
              </td>
              <td class="px-50">
                {{ product.uom1 }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="px-50 text-right">
                {{ $formatNumberToLocale(product.price) }}
              </td>
              <td class="px-25 text-right">
                {{ $formatNumberToLocale(product.total) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
        <div class="d-flex flex-row justify-content-end pb-5">
          <div
            class="flex-container"
          >
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>Điều chỉnh:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.adjusted) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>VAT:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.vat) }}</strong>
                </b-col>
              </b-row>
            </div>
            <div class="flex-item">
              <b-row class="text-right">
                <b-col>
                  <i>T.Cộng:</i>
                </b-col>
                <b-col>
                  <strong style="margin-right: -4.5px">{{ $formatNumberToLocale(item.totalAmount) }}</strong>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <!-- END - Table 1 -->
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  REPORT_WAREHOUSES_INPUT,
  PRINT_SHOP_IMPORT_REPORT_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-input/store-module/type'

export default {
  data() {
    return {
      lstPo: { orderImport: [] },
      lstAdjust: { orderImport: [] },
      lstBorrow: { orderImport: [] },
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT, [
      PRINT_SHOP_IMPORT_REPORT_GETTER,
    ]),
    commonData() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER
      }
      return {}
    },
    totalData() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.totalInfo) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.totalInfo
      }
      return {
        show: true,
      }
    },
    getLstPo() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstPO) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstPO
      }
      return {}
    },
    getLstAdjust() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstAdjust) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstAdjust
      }
      return {}
    },
    getLstBorrow() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstBorrow) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.lstBorrow
      }
      return {}
    },
  },
  watch: {
    getLstPo() {
      this.lstPo = { ...this.getLstPo }
    },
    getLstAdjust() {
      this.lstAdjust = { ...this.getLstAdjust }
    },
    getLstBorrow() {
      this.lstBorrow = { ...this.getLstBorrow }
    },
  },
  updated() {
    // window.print()
  },
}
</script>
<style lang="scss" scoped>
table {
  position: relative;
  border: 1.8px solid rgb(78, 77, 77);
  width: 100%;
  border-collapse: collapse;
}
th {
  border-style: solid;
  border-width: 1.8px;
}
td {
  border-style: dotted;
  border-width: 1.8px;
}

.top-border-only {
  border-top: 2.5px solid rgb(100, 99, 99);
}
.bot-border-dotted {
  border-bottom: 2px dotted;
  border-collapse: collapse;
}
.total {
    background: rgb(192, 186, 186)
}
.flex-container {
    display: flex;
    position: absolute;
    right: 0;
    border: 2px dotted;
    height: auto;
    min-width: 330px;
    flex-direction: column;
    align-items: center;
}
.flex-item > .row {
    min-width: 338px;
}
.big-font {
  font-size: 17px;
}
.normal-weight {
  font-weight: normal;
}
</style>
