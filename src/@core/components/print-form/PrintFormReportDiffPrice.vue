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
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
        <p class="mt-1">
          Add: 8 Hoàng Hoa Thám - Hải Dương
        </p>
        <p>Tel: (84.320) 3 838 399</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> BÁO CÁO CHÊNH LỆCH GIÁ </strong>
        <p class="my-1">
          Từ ngày 01/02/2021 đến 23/04/2021
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

    <!-- START - Total view -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <div>Tổng cộng: <strong>29</strong>
      </div>
      <strong>504,161</strong>
      <strong>31,000</strong>
    </b-row>
    <!-- END - Total view -->

    <!-- START - Table 2 -->
    <div
      v-for="(item,index) in reportData"
      :key="index"
    >
      <b-col class="px-0 pb-1">
        <table>
          <!-- START - Header -->
          <thead>
            <!-- START - Header 1 -->
            <tr>
              <th
                colspan="10"
              >
                <strong class="mx-1">
                  Số HĐ: số hđ - Ngày HĐ: ngày hđ - Số PO: số Po - Số nội bộ: 29439945 - Mã nhập hàng: IMP.MT10081.21.00004
                </strong>
                <b-row
                  class="mx-0"
                  align-h="center"
                >
                  <div class="ml-5">
                    Tổng cộng: 108
                  </div>
                  <div class="mx-5">
                    140,852,816
                  </div>
                  <div>
                    1,045,112
                  </div>
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
            <tr>
              <td>2</td>
              <td>02BC10</td>
              <td>SP Vinamilk giảm cân HG 525g</td>
              <td>Hộp</td>
              <td>100</td>
              <td>1,354,354</td>
              <td>135,435,400</td>
              <td>10,049</td>
              <td>1,004,900</td>
              <td />
            </tr>
            <tr>
              <td>3</td>
              <td>02BC10</td>
              <td>SP Vinamilk giảm cân HG 525g</td>
              <td>Hộp</td>
              <td>100</td>
              <td>1,354,354</td>
              <td>135,435,400</td>
              <td>10,049</td>
              <td>1,004,900</td>
              <td />
            </tr>
            <tr>
              <td>4</td>
              <td>02BC10</td>
              <td>SP Vinamilk giảm cân HG 525g</td>
              <td>Hộp</td>
              <td>100</td>
              <td>1,354,354</td>
              <td>135,435,400</td>
              <td>10,049</td>
              <td>1,004,900</td>
              <td />
            </tr>
          </tbody>
        <!-- END - Body -->

        </table>
      </b-col>
      <!-- END - Table 2 -->
    </div></b-container>
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
        return this.PRINT_REPORT_DIFFERENCE_GETTER
      }
      return {
        id: 'id',
        redInvoiceNo: 'redInvoiceNo',
        poNumber: 'poNumber',
        internalNumber: 'internalNumber',
        transDate: 'transDate',
        orderDate: 'orderDate',
        productCode: 'productCode',
        productName: 'productName',
        unit: 'unit',
        quantity: 'quantity',
        inputPrice: 'inputPrice',
        totalInput: 'totalInput',
        outputPrice: 'outputPrice',
        totalOutput: 'totalOutput',
        priceChange: 'priceChange',
      }
    },
  },
  updated() {
    console.log(this.reportData)
  //   window.print()
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
