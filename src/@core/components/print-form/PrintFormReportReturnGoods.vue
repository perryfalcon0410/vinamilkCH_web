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
        <strong style="font-size: 17px"> {{ infoReturnedGood.shopName }} </strong>
        <p class="mt-1">
          Add: {{ infoReturnedGood.address }}
        </p>
        <p>Tel: {{ infoReturnedGood.phone }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng trả lại </strong>
        <p class="my-1">
          Từ ngày {{ totalInfoReturnedGood.fromDate }} đến {{ totalInfoReturnedGood.toDate }}
        </p>
        <p>Ngày in : {{ $moment(totalInfoReturnedGood.printDate).locale('en').format('DD/MM/YYYY - HH:mm:ss A') }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray; border-style: dotted; border-width: 2px"
    >
      <div style="visibility: hidden;"><strong>Ngành hàng: A </strong>
      </div>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
      </div>
      <div>Tổng T.Tiền:
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</strong>
      </div>
      <div>Tổng TTL:
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="border-style: dotted; border-width: 2px"
    >
      <div><strong>Ngành hàng: A </strong>
      </div>
      <div>Tổng SL: <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
      </div>
      <div>Tổng T.Tiền:
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</strong>
      </div>
      <div>Tổng TTL:
        <strong>{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</strong>
      </div>
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
              colspan="10"
            >
              <strong class="mx-1">
                Mã trả hàng:ITR.MT10081.21.00001 - Mã hóa đơn:SAL.MT1008121040900001 - KH: Khach hang Nguyen
              </strong>
              <b-row
                class="mx-0 width-100-per"
              >
                <div
                  style="width: 45%;"
                />
                <div
                  style="width: 9%;"
                  class="text-right"
                >Tổng SL:
                </div>
                <div
                  style="width: 6%;"
                  class="text-right"
                ><strong class="text-right">{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
                </div>
                <div
                  style="width: 12%;"
                  class="text-right"
                >Tổng T.Tiền:
                </div>
                <div
                  style="width: 12.3%;"
                  class="text-right"
                ><strong class="pl-5 pr-1 text-right">1,000,000</strong>
                </div>
                <div
                  style="width: 15.7%;"
                  class="d-flex justify-content-between"
                >
                  <div
                    style="font-size: 14px"
                  >
                    Tổng&nbsp;TTL:
                  </div>
                  <div class="  text-right">
                    <strong class="pr-1">1,600,000</strong>
                  </div>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th>
              STT
            </th>
            <th>
              Mã SP
            </th>
            <th>
              Tên SP
            </th>
            <th>
              ĐVT
            </th>
            <th>
              SL
            </th>
            <th>
              Giá
            </th>
            <th>
              T.Tiền
            </th>
            <th style="width: 15%">
              Tiền trả lại
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              10
            </td>
            <td class="text-right pr-1">
              10,000
            </td>
            <td class="text-right pr-1">
              12,0000
            </td>
            <td class="text-right pr-1">
              15,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              14
            </td>
            <td class="text-right pr-1">
              20,000
            </td>
            <td class="text-right pr-1">
              52,0000
            </td>
            <td class="text-right pr-1">
              65,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              11
            </td>
            <td class="text-right pr-1">
              11,000
            </td>
            <td class="text-right pr-1">
              22,0000
            </td>
            <td class="text-right pr-1">
              95,0000
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Table 2 -->
    <b-col class="px-0 mt-3">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="10"
            >
              <strong class="mx-1">
                Mã trả hàng:ITR.MT10081.21.00001 - Mã hóa đơn:SAL.MT1008121040900001 - KH: Khach hang Nguyen
              </strong>
              <b-row
                class="mx-0"
              >
                <div
                  style="width: 45%;"
                />
                <div
                  style="width: 10%;"
                  class="text-right"
                >Tổng SL:
                </div>
                <div
                  style="width: 6%;"
                  class="text-right"
                ><strong class="pl-5 text-right">{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
                </div>
                <div
                  style="width: 12%;"
                  class="text-right"
                >Tổng T.Tiền:
                </div>
                <div
                  style="width: 12.3%;"
                  class="text-right"
                ><strong class="pl-5 text-right">{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</strong>
                </div>
                <div
                  style="width: 14.7%;"
                  class="d-flex justify-content-between"
                >
                  <div class="pl-1 h8">
                    Tổng&nbsp;TTL:
                  </div>
                  <div class="  text-right">
                    <strong class="pr-1">{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</strong>
                  </div>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th>
              STT
            </th>
            <th>
              Mã SP
            </th>
            <th>
              Tên SP
            </th>
            <th>
              ĐVT
            </th>
            <th>
              SL
            </th>
            <th>
              Giá
            </th>
            <th>
              T.Tiền
            </th>
            <th>
              Tiền trả lại
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              10
            </td>
            <td class="text-right pr-1">
              10,000
            </td>
            <td class="text-right pr-1">
              12,0000
            </td>
            <td class="text-right pr-1">
              15,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              14
            </td>
            <td class="text-right pr-1">
              20,000
            </td>
            <td class="text-right pr-1">
              52,0000
            </td>
            <td class="text-right pr-1">
              65,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              11
            </td>
            <td class="text-right pr-1">
              11,000
            </td>
            <td class="text-right pr-1">
              22,0000
            </td>
            <td class="text-right pr-1">
              95,0000
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 2 -->

    <!-- START - Table 3 -->
    <b-col class="px-0 mt-3">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="10"
            >
              <strong class="mx-1">
                Mã trả hàng:ITR.MT10081.21.00001 - Mã hóa đơn:SAL.MT1008121040900001 - KH: Khach hang Nguyen
              </strong>
              <b-row
                class="mx-0"
              >
                <div
                  style="width: 45%;"
                />
                <div
                  style="width: 10%;"
                  class="text-right"
                >Tổng SL:
                </div>
                <div
                  style="width: 6%;"
                  class="text-right"
                ><strong class="pl-5 text-right">{{ $formatNumberToLocale(totalInfoReturnedGood.totalQuantity) }}</strong>
                </div>
                <div
                  style="width: 12%;"
                  class="text-right"
                >Tổng T.Tiền:
                </div>
                <div
                  style="width: 12.3%;"
                  class="text-right"
                ><strong class="pl-5 text-right">{{ $formatNumberToLocale(totalInfoReturnedGood.totalAmount) }}</strong>
                </div>
                <div
                  style="width: 14.7%;"
                  class="d-flex justify-content-between"
                >
                  <div class="pl-1 h8">
                    Tổng&nbsp;TTL:
                  </div>
                  <div class="text-right">
                    <strong class="pr-1">{{ $formatNumberToLocale(totalInfoReturnedGood.totalRefunds) }}</strong>
                  </div>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th>
              STT
            </th>
            <th>
              Mã SP
            </th>
            <th>
              Tên SP
            </th>
            <th>
              ĐVT
            </th>
            <th>
              SL
            </th>
            <th>
              Giá
            </th>
            <th>
              T.Tiền
            </th>
            <th>
              Tiền trả lại
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              10
            </td>
            <td class="text-right pr-1">
              10,000
            </td>
            <td class="text-right pr-1">
              12,0000
            </td>
            <td class="text-right pr-1">
              15,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              14
            </td>
            <td class="text-right pr-1">
              20,000
            </td>
            <td class="text-right pr-1">
              52,0000
            </td>
            <td class="text-right pr-1">
              65,0000
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td class="text-right pr-1">
              11
            </td>
            <td class="text-right pr-1">
              11,000
            </td>
            <td class="text-right pr-1">
              22,0000
            </td>
            <td class="text-right pr-1">
              95,0000
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 3 -->

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
    returnedGoodData() {
      if (this.PRINT_RETURN_GOODS_GETTER.response) {
        return this.PRINT_RETURN_GOODS_GETTER.reponse
      }
      return []
    },
    // get total info price
    totalInfoReturnedGood() {
      if (this.PRINT_RETURN_GOODS_GETTER.info) {
        return this.PRINT_RETURN_GOODS_GETTER.info
      }
      return {}
    },
    // get info print
    infoReturnedGood() {
      if (this.PRINT_RETURN_GOODS_GETTER.info) {
        return this.PRINT_RETURN_GOODS_GETTER.info.shopDTO
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
