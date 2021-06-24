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
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
        <p class="mt-1">
          Add: {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.phone }} </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> BÁO CÁO CHÊNH LỆCH GIÁ </strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(totalData.fromDate) }} đến {{ $formatISOtoVNI(totalData.toDate) }}
        </p>
        <p>Ngày in : {{ $formatISOtoVNI(totalData.reportDate, true) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonInfo.shopName }} </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total view -->
    <b-row
      class="mx-0"
      align-v="end"
      style="background-color: gray"
    >
      <b-col class="text-right">
        Tổng cộng: <strong>{{ $formatNumberToLocale(totalData.totalQuantity) }}</strong>
      </b-col>
      <b-col class="text-center">
        <strong class="pr-4 mr-4">{{ $formatNumberToLocale(totalData.totalPriceInput) }}</strong>

        <strong>{{ $formatNumberToLocale(totalData.totalPriceOutput) }}</strong>
      </b-col>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 2 -->
    <div
      v-for="(item,index) in reportData"
      :key="index"
    >
      <b-col class="px-0 mx-0 pb-1">
        <table>
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: {{ item.response.redInvoiceNo }} - Ngày HĐ: {{ $formatISOtoVNI(item.response.orderDate) }} - Số PO: {{ item.response.poNumber }} - Số nội bộ: {{ item.response.internalNumber }} - Mã nhập hàng: {{ item.response.transCode }}
                </strong>
                <b-row
                  class="mx-0"
                  align-h="around"
                >
                  <b-col class="text-right mr-3">
                    Tổng cộng: {{ $formatNumberToLocale(item.response.totalQuantity) }}
                  </b-col>
                  <b-col class="text-center">
                    <b-row align-h="around">
                      <span class="pl-5 ml-50">
                        {{ $formatNumberToLocale(item.response.totalPriceInput) }}
                      </span>
                      <span style="padding-right: 8.5rem">{{ $formatNumberToLocale(item.response.totalPriceOutput) }}</span>
                    </b-row>
                  </b-col>
                </b-row>
              </th>
            </tr>
            <!-- END - Header 1 -->

            <!-- START - Header 2 -->
            <tr>
              <th
                rowspan="2"
                class="text-center"
              >
                STT
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                Mã SP
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                Tên SP
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                ĐVT
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                SL
              </th>
              <th
                colspan="2"
                class="text-center"
              >
                Đầu vào
              </th>
              <th
                colspan="2"
                class="text-center"
                style="width: 5%"
              >
                Đầu ra
              </th>
              <th
                rowspan="2"
                class="text-center"
              >
                Chênh lệch
              </th>
            </tr>
            <!-- END - Header 2 -->

            <!-- START - Header 3 -->
            <tr>
              <!-- Đầu vào -->
              <th class="text-center">
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
              <!-- Đầu ra -->
              <th class="text-center">
                Giá
              </th>
              <th class="text-center">
                T.Tiền
              </th>
            </tr>
          <!-- END - Header 3 -->
          </thead>
          <!-- END - Header -->

          <!-- START - Body -->
          <tbody>
            <tr
              v-for="(product,stt) in reportData[index].info"
              :key="product.id"
            >
              <td
                class="text-right pr-40"
              >
                {{ stt + 1 }}
              </td>
              <td>
                {{ product.productCode }}
              </td>
              <td>
                {{ product.productName }}
              </td>
              <td>
                {{ product.unit }}
              </td>
              <td>
                {{ $formatNumberToLocale(product.quantity) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.inputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalInput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.outputPrice) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.totalOutput) }}
              </td>
              <td class="text-right">
                {{ $formatNumberToLocale(product.priceChange) }}
              </td>
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,

  PRINT_REPORT_DIFFERENCE_GETTER,
} from '@/views/reports/reports-warehouses/report-warehouses-price-difference/store-module/type'

export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          width: '140px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          type: 'date',
          dateInputFormat: 'dd/MM/yyyy',
          dateOutputFormat: 'dd/MM/yyyy',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [PRINT_REPORT_DIFFERENCE_GETTER]),

    reportData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.details
      }
      return []
    },
    totalData() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER
      }
      return {}
    },
    commonInfo() {
      if (this.PRINT_REPORT_DIFFERENCE_GETTER.shop) {
        return this.PRINT_REPORT_DIFFERENCE_GETTER.shop
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
  border-width: 1.75px;
}
td {
  border-style: dotted;
  border-width: 1.75px;
  word-wrap: break-word;
}
table {
  table-layout: auto;
  width: 100%;
}
</style>
