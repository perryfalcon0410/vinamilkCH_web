<template>
  <b-container
    id="popover"
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
        <p>Ngày in : {{ $moment(commonInfo.reportDate).locale('en').format('DD/MM/YYYY - HH:mm:ss A') }}</p>
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
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <b-col />
      <b-col class="text-right">
        <div>
          <span class="pr-5">Tổng Cộng: </span><strong style="margin-right: 10px">{{ $formatNumberToLocale(commonInfo.totalQuantity) }}</strong>
        </div>
      </b-col>
      <b-col
        class="text-right"
        sm="1"
        style="padding-right: 5px"
      >
        <div><strong>{{ $formatNumberToLocale(commonInfo.totalPrice) }}</strong></div>
        <b-col />
      </b-col>
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
                class="mx-0"
                align-h="around"
              >
                <b-col>
                  <div><i>Ngành hàng:</i> <strong class="pl-3">{{ item.productCatName }}</strong>
                  </div>
                </b-col>
                <b-col class="text-right">
                  <div><i class="pr-5">Tổng Cộng:</i>
                    <strong class="mr-50">{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
                  </div>
                </b-col>
                <b-col
                  class="text-right"
                  sm="1"
                  style="padding-right: 2px"
                >
                  <div>
                    <strong>{{ $formatNumberToLocale(item.totalPrice) }}</strong>
                  </div>
                </b-col>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center stt"
            >
              STT
            </th>
            <th
              class="text-center dotted"
            >
              Ngày bán
            </th>
            <th
              class="text-center dotted"
            >
              Hóa đơn
            </th>
            <th
              class="text-center dotted"
            >
              Mã SP
            </th>
            <th
              class="text-center dotted"
            >
              Tên SP
            </th>
            <th
              class="text-center dotted"
            >
              ĐVT
            </th>
            <th
              class="text-center dotted"
            >
              SL
            </th>
            <th
              class="text-center dotted"
            >
              Giá
            </th>
            <th
              class="text-center total"
            >
              T.tiền
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(product,stt) in reportData[index].productCats"
            :key="product.id"
          >
            <td class="text-right pr-1">
              {{ stt + 1 }}
            </td>
            <td> {{ $moment(product.orderDate).locale('en').format('DD/MM/YYYY HH:mm:ss A') }} </td>
            <td> {{ product.orderNumber }} </td>
            <td> {{ product.productCode }} </td>
            <td> {{ product.productName }} </td>
            <td> {{ product.uom }} </td>
            <td class="text-right">
              {{ product.quantity }}
            </td>
            <td class="text-right">
              {{ $formatNumberToLocale(product.price) }}
            </td>
            <td class="text-right">
              {{ $formatNumberToLocale(product.totalPrice) }}
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
import { mapGetters } from 'vuex'
import {
  REPORT_WAREHOUSES_PROMOTIONS,

  PRINT_REPORT_PROMOTION_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-promotion/store-module/type'

export default {
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_PROMOTIONS, [PRINT_REPORT_PROMOTION_GETTER]),
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
.dotted {
  border-left-style: dotted;
  border-right-style: dotted;
}
.stt {
  border-right-style: dotted;
}
.total {
  border-left-style: dotted;
}
</style>
