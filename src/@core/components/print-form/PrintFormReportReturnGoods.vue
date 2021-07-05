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
        <strong style="font-size: 30px"> Hàng trả lại </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày {{ $formatISOtoVNI(commonData.fromDate) }}
          </p>
          <p>
            Đến ngày {{ $formatISOtoVNI(commonData.toDate) }}
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
      class="mx-0 second-sector width-100-per"
      align-v="end"
      style="background-color: gray; border-style: dotted; border-width: 2px"
    >
      <div
        style="visibility: hidden; width: 44%;"
        class="ml-1"
      ><strong>Ngành hàng: A </strong>
      </div>
      <div
        style="width: 6.4%;"
        class="text-right"
      ><strong>Tổng SL:</strong>
      </div>
      <div
        style="width: 6.5%;"
        class="text-right"
      >
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
      </div>
      <div
        style="width: 10.4%;"
        class="text-right"
      ><strong>Tổng T.Tiền:</strong>

      </div>
      <div
        style="width: 14.5%;"
        class="text-right"
      >
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</strong>
      </div>
      <div
        style="width: 5.2%;"
        class="text-right"
      ><strong>Tổng TTL:</strong>

      </div>
      <div
        style="width: 11.6%;"
        class="text-right"
      > <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</strong></div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <div
      v-for="(item,index) in reportData"
      :key="index"
      class="pb-1"
    >
      <b-row
        class="mx-0 width-100-per"
        align-v="end"
        style="border-style: dotted; border-width: 2px"
      >
        <div
          style="width: 44%;"
          class="ml-1"
        ><strong>Ngành hàng: {{ item.category }} </strong>
        </div>
        <div
          style="width: 6.4%;"
          class="text-right"
        ><strong>Tổng SL:</strong>
        </div>
        <div
          style="width: 6.5%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
        </div>
        <div
          style="width: 10.4%;"
          class="text-right"
        ><strong>Tổng T.Tiền:</strong>

        </div>
        <div
          style="width: 14.5%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalAmount) }}</strong>
        </div>
        <div
          style="width: 5.2%;"
          class="text-right"
        > <strong>Tổng TTL:</strong>
        </div>
        <div
          style="width: 11.6%;"
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
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Mã trả hàng:{{ order.returnNumber }} - Mã hóa đơn:{{ order.orderNumber }} - KH: {{ order.customerName }}
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 45%;"
                  />
                  <div
                    style="width: 6.4%;"
                    class="text-right"
                  >Tổng SL:
                  </div>
                  <div
                    style="width: 6.5%;"
                    class="text-right"
                  ><strong class="text-right">{{ order.orderQuantity }}</strong>
                  </div>
                  <div
                    style="width: 10.4%;"
                    class="text-right"
                  >Tổng T.Tiền:
                  </div>
                  <div
                    style="width: 14.5%;"
                    class="text-right"
                  ><strong>{{ order.orderAmount }}</strong>
                  </div>
                  <div
                    style="width: 5.2%;"
                    class="text-right"
                  >
                    Tổng&nbsp;TTL:
                  </div>
                  <div
                    style="width: 11.6%;"
                    class="text-right"
                  >
                    {{ order.orderRefund }}
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
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
                style="width: 34%"
                class="px-50"
              >
                Tên SP
              </th>
              <th
                style="width: 5%"
                class="px-50"
              >
                ĐVT
              </th>
              <th
                style="width: 7%"
                class="px-50 text-right"
              >
                SL
              </th>
              <th
                style="width: 10%"
                class="px-50 text-right"
              >
                Giá
              </th>
              <th
                style="width: 15%"
                class="px-50 text-right"
              >
                T.Tiền
              </th>
              <th
                style="width: 17%"
                class="px-50 text-right"
              >
                Tiền trả lại
              </th>
            </tr>
          <!-- END - Header 2 -->

          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product, stt) in order.reportPrintProductDTOS"
              :key="stt"
            >
              <td class="px-1">
                {{ stt + 1 }}
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
                {{ product.quantity }}
              </td>
              <td class="px-50 text-right">
                {{ product.price }}
              </td>
              <td class="px-50 text-right">
                {{ product.totalAmount }}
              </td>
              <td class="px-50 text-right">
                {{ product.totalRefunds }}
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
  REPORT_RETURNED_GOODS,
  // Getters
  PRINT_INPUT_ORDER_DETIAL_GETTER,
  PRINT_RETURN_GOODS_GETTER,
} from '@/views/reports/reports-returned-goods/store-module/type'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      PRINT_INPUT_ORDER_DETIAL_GETTER,
      PRINT_RETURN_GOODS_GETTER,
    ]),

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
.second-sector {
  border-top-style: none;
  border-right-style: dotted;
  border-left-style: dotted;
  border-width: 2px;
}
</style>
