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
        <p>Tel: {{ commonInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px">Báo cáo Khách hàng không có giao dịch</strong>
        <p class="my-1">
          Từ ngày {{ $formatISOtoVNI(commonInfo.fromDate) }} đến {{ $formatISOtoVNI(commonInfo.toDate) }}
        </p>
        <p>Ngày in : {{ $formatPrintDate(commonInfo.printDate) }}</p>
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

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center"
              style="width: 5%"
            >
              STT
            </th>
            <th
              class="text-center"
              style="width:17%"
            >
              Mã KH
            </th>
            <th
              class="text-center"
              style="width: 30%;"
            >
              Tên KH
            </th>
            <th
              class="text-center"
              style="width: 48%;"
            >
              Địa chỉ
            </th>
          </tr>
          <!-- END - Header 2 -->
        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(customer,index) in reportData"
            :key="index"
          >
            <td class="text-right pr-50">
              {{ index + 1 }}
            </td>
            <td
              class="pl-40"
              style="width: 17%;"
            >
              {{ customer.customerCode }}
            </td>
            <td
              class="pl-40"
              style="width: 30%;"
            >
              {{ customer.customerName }}
            </td>
            <td
              class="pl-40"
              style="width: 48%;"
            >
              {{ customer.address }}
            </td>
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 1 -->
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  REPORT_CUSTOMERS_NON_TRANSACTIONAL,
  PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER,
} from '@/views/reports/reports-customers/reports-customers-non-transactional/store-module/type'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(REPORT_CUSTOMERS_NON_TRANSACTIONAL, [PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER]),
    commonInfo() {
      if (this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER) {
        return this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER
      }
      return {}
    },
    reportData() {
      if (this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.data) {
        return this.PRINT_REPORT_CUSTOMERS_NON_TRANSACTIONAL_GETTER.data
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
  word-wrap:break-word;
}
table {
  width:100%;
  table-layout:fixed;
}
</style>
<style type="text/scss" media="print">
    @page {
      margin-top: 2%;
      margin-bottom: 2%;
    }
</style>
