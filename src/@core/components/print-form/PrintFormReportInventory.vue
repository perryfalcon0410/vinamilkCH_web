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
          {{ commonInfo.address }}
        </p>
        <p>Tel: {{ commonInfo.shopTel }}</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Tồn kho cửa hàng </strong>
        <p class="my-1">
          Ngày : {{ $formatISOtoVNI(commonInfo.date) }}
        </p>
        <p>Ngày in : {{ $formatPrintDate(commonInfo.printDate) }}</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> {{ commonInfo.shopName }}  </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section -->
    <b-row
      class="mx-0 mb-50 total-header"
      align-v="end"
    >
      <div
        class="ml-1"
        style="width: 44%"
      >
        <strong> {{ commonInfo.shopName }}  </strong>
      </div>
      <div
        style="width: 16.6%;"
        class="text-right font-italic"
      >Tổng SL:
      </div>
      <div
        style="width: 8%;"
        class="text-right"
      >
        <strong><ins> {{ $formatNumberToLocale(totalInfo.stockQuantity) }} </ins></strong>
      </div>
      <div
        style="width: 13%;"
        class="text-right font-italic"
      >Tổng T.Tiền:
      </div>
      <div
        style="width: 16.5%;"
        class="text-right"
      >
        <strong><ins> {{ $formatNumberToLocale(totalInfo.totalAmount) }} </ins></strong>
      </div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col
      v-for="(item,index) in reportData"
      :key="index"
      class="px-0 pb-1"
    >
      <b-row
        class="mx-0 width-100-per"
        style="border-width: 2px 2px 0 2px; border-style: solid;"
      >
        <div
          class="ml-1 font-italic"
          style="width: 10%"
        >Ngành hàng:
        </div>
        <div
          style="width: 34%;"
        >
          <strong>{{ item.category }}</strong>
        </div>
        <div
          style="width: 16.6%;"
          class="text-right font-italic"
        >
          Tổng SL:
        </div>
        <div
          style="width: 8%;"
          class="text-right"
        >
          <strong>{{ $formatNumberToLocale(item.totalQuantity) }}</strong>
        </div>
        <div
          style="width: 13%;"
          class="text-right font-italic"
        >Tổng T.Tiền:
        </div>
        <div
          style="width: 16.5%;"
          class="text-right"
        >
          <strong> {{ $formatNumberToLocale(item.totalAmount) }} </strong>
        </div>
      </b-row>
      <table>
        <!-- START - Header  -->
        <tr>
          <th
            class="stt px-50"
            style="width: 1%"
          >
            STT
          </th>
          <th
            class="px-50 dashed"
            style="width: 10%"
          >
            Mã SP
          </th>
          <th
            class="px-50 dashed"
            style="width: 34%"
          >
            Tên SP
          </th>
          <th
            class="px-50 dashed"
            style="width: 5%"
          >
            ĐVT
          </th>
          <th
            style="width: 7%"
            class="px-50 dashed text-right"
          >
            SL
          </th>
          <th
            class="text-right dashed px-50"
            style="width: 10%"
          >
            Giá
          </th>
          <th
            style="width: 15%"
            class="text-right total px-50"
          >
            T.Tiền
          </th>
        </tr>
        <!-- END - Header 2 -->
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr
            v-for="(product,stt) in reportData[index].data"
            :key="stt"
          >
            <td class="px-1">
              {{ stt + 1 }}
            </td>
            <td class="pl-50">
              {{ product.productCode }}
            </td>
            <td class="px-50">
              {{ product.productName }}
            </td>
            <td class="px-50">
              {{ product.unit }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.stockQuantity) }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.price) }}
            </td>
            <td class="text-right px-50">
              {{ $formatNumberToLocale(product.totalAmount) }}
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
  REPORT_WAREHOUSES_INVENTORY,
  PRINT_REPORT_INVENTORY_GETTER,
} from '@/views/reports/reports-warehouses/reports-warehouses-inventory/store-module/type'

export default {
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
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [PRINT_REPORT_INVENTORY_GETTER]),
    commonInfo() {
      if (this.PRINT_REPORT_INVENTORY_GETTER) {
        return this.PRINT_REPORT_INVENTORY_GETTER
      }
      return {}
    },
    totalInfo() {
      if (this.PRINT_REPORT_INVENTORY_GETTER.totalInfo) {
        return this.PRINT_REPORT_INVENTORY_GETTER.totalInfo
      }
      return {}
    },
    reportData() {
      if (this.PRINT_REPORT_INVENTORY_GETTER.dataByCat) {
        return this.PRINT_REPORT_INVENTORY_GETTER.dataByCat
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
  border-width: 2px 1px;
}
td {
  border-style: dashed;
  border-width: 1px;
}
.dashed {
  border-left-style: dashed;
  border-right-style: dashed;
}
.stt {
  border-right-style: dashed;
  border-left-width: 2px;
}
.total {
  border-left-style: dashed;
  border-right-width: 2px;
}
.total-header{
  background: rgb(192, 186, 186);
  border-radius: 3px;
}
</style>
<style type="text/css" media="print">
    @page {
        margin-top: 2%;
        size: portrait;
    }
    @page:bottom {
      content: counter(page) ' of ' counter(pages);
    }
    body {
      -webkit-print-color-adjust: exact !important;
    }
</style>
