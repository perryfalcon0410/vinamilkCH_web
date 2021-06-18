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
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
        <p class="mt-1">
          Add: 8 Hoàng Hoa Thám - Hải Dương
        </p>
        <p>Tel: (84.320) 3 838 399</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Hàng khuyến mãi </strong>
        <p class="my-1">
          Từ ngày {{ commonInfo.fromDate }} đến {{ commonInfo.toDate }}
        </p>
        <p>Ngày in : 23/04/2021 - 11:33:28AM</p>
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

    <!-- START - Total section -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <div>Tổng Cộng: <strong>4</strong></div>

      <div><strong>81.190</strong></div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
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
                <div><i>Ngành hàng:</i> <strong class="pl-3">A</strong>
                </div>
                <div><i class="pr-5">Tổng Cộng:</i>
                  <strong>1</strong>
                </div>
                <div>
                  <strong>20,041</strong>
                </div>
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
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td>10</td>
            <td />
            <td />
            <td />
            <td>43,200</td>
          </tr>
          <tr>
            <td>2</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td>10</td>
            <td />
            <td />
            <td />
            <td>43,200</td>
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
      if (PRINT_REPORT_PROMOTION_GETTER) {
        return PRINT_REPORT_PROMOTION_GETTER
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
