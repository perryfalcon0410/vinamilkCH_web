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
          Add: {{ commonData.shopAddress }}
        </p>
        <p>
          Tel: {{ commonData.shopPhone }}
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Cửa hàng nhập hàng </strong>
        <b-row class="mt-1">
          <p class="mr-2">
            Từ ngày: {{ $formatISOtoVNI(fromDate) }}
          </p>
          <p>
            Đến ngày: {{ $formatISOtoVNI(toDate) }}
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
        style="visibility: hidden; width: 44%;"
        class="ml-1"
      ><strong>Loại: A </strong>
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
        <strong>{{ $formatNumberToLocale(commonData.totalQuantity) }}</strong>
      </div>
      <div
        style="width: 10.4%;"
        class="text-right"
      ><strong>T.Tiền:</strong>

      </div>
      <div
        style="width: 14.5%;"
        class="text-right"
      >
        <strong>{{ $formatNumberToLocale(commonData.totalAmount) }}</strong>
      </div>
    </b-row>
    <!-- END - Total section  1-->

    <!-- START - Total section 2 -->
    <div
      v-for="(item,index) in productData"
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
        ><strong>Loại: A </strong>
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
          <strong> 1000 </strong>
        </div>
        <div
          style="width: 10.4%;"
          class="text-right"
        ><strong>T.Tiền:</strong>

        </div>
        <div
          style="width: 14.5%;"
          class="text-right"
        >
          <strong> 1000 </strong>
        </div>
      </b-row>
      <!-- END - Total section 2 -->

      <!-- START - Table 1 -->
      <b-col
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
                  Số HĐ: 123 - Ngày HĐ: - Số PO <span>- Số nội bộ</span> <span>- Mã nhập hàng</span>
                </strong>
                <b-row
                  class="mx-0 width-100-per"
                >
                  <div
                    style="width: 45%;"
                  />
                  <div
                    style="width: 6.6%;"
                    class="text-right"
                  >Tổng SL:
                  </div>
                  <div
                    style="width: 6.5%;"
                    class="text-right"
                  ><strong class="text-right">100</strong>
                  </div>
                  <div
                    style="width: 10.4%;"
                    class="text-right"
                  >T.Tiền:
                  </div>
                  <div
                    style="width: 14.5%;"
                    class="text-right"
                  ><strong>100</strong>
                  </div>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th colspan="7">
                <b-row>
                  <b-col>
                    Ngành hàng: A
                  </b-col>
                  <b-col>
                    Tổng số lượng: B <span>Tổng thành tiền: C</span>
                  </b-col>
                </b-row>
              </th>
            </tr>
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
              <!-- END - Header 2 -->

            </tr>
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr>
              <td class="px-1">
                ok
              </td>
              <td class="px-50">
                ok
              </td>
              <td class="px-50">
                ok
              </td>
              <td class="px-50">
                ok
              </td>
              <td class="px-50 text-right">
                ok
              </td>
              <td class="px-50 text-right">
                ok
              </td>
              <td class="px-50 text-right">
                ok
              </td>
            </tr>
            <div class="d-flex flex-row justify-content-end pb-5">
              <div
                class="flex-container mt-50 mb-2"
                style="margin-right: -1px"
              >
                <div class="flex-item">
                  <b-row class="text-right">
                    <b-col>
                      <strong>Điều chỉnh:</strong>
                    </b-col>
                    <b-col>
                      69
                    </b-col>
                  </b-row>
                </div>
                <div class="flex-item">
                  <b-row class="text-right">
                    <b-col>
                      <strong>VAT:</strong>
                    </b-col>
                    <b-col>
                      69
                    </b-col>
                  </b-row>
                </div>
                <div class="flex-item">
                  <b-row class="text-right">
                    <b-col>
                      <strong>T.Cộng:</strong>
                    </b-col>
                    <b-col>
                      69
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
    </div>
    <!-- END - Table 1 -->

    <!-- START - Fotter -->
    <b-row
      class="mx-5"
      align-h="between"
      style="margin-top: 200px;"
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
  REPORT_WAREHOUSES_INPUT,
  PRINT_SHOP_IMPORT_REPORT_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-input/store-module/type'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT, [
      PRINT_SHOP_IMPORT_REPORT_GETTER,
    ]),
    commonData() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.info) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.info
      }
      return {}
    },
    productData() {
      if (this.PRINT_SHOP_IMPORT_REPORT_GETTER.response) {
        return this.PRINT_SHOP_IMPORT_REPORT_GETTER.response.lstPo
      }
      return {}
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
  width: 100%;
  border-collapse: collapse;
}
th {
  border-style: solid;
  border-width: 2px;
}
td {
  border-style: dotted;
  border-width: 2px;
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
    min-width: 338px;
    flex-direction: column;
    align-items: center;
}
.flex-item > .row {
    min-width: 338px;
}
</style>
