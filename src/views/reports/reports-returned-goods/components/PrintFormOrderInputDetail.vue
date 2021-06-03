<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 20px"> CÔNG TY CP SỮA VIỆT NAM </strong>
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
        <strong> 8 Hoàng Hoa Thám - Hải Dương </strong>
        <strong> Ngày in : 23/04/2021 </strong>
      </div>
      <b-img
        src="https://cdn.shopify.com/s/files/1/0506/2613/4215/files/vinamilk_logo_3869x.png?v=1603646389"
        alt="logo"
        width="200px"
      />
    </b-row>
    <!-- END - Header -->

    <!-- START - Title -->
    <b-row
      class="mx-0"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px">
          BẢNG KÊ CHI TIẾT CÁC HOÁ ĐƠN NHẬP HÀNG
        </strong>
        <p class="my-1">
          Từ ngày 01/02/2021 đến 23/04/2021
        </p>
      </div>
    </b-row>
    <!-- END - Title -->

    <!-- START - Table -->
    <table>
      <thead>
        <tr>
          <th
            v-for="(item, index) in columns"
            :key="index"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
    </table>
    <!-- END - Table -->

    <!-- START - Fotter -->
    <b-row
      class="mx-0"
      style="width: 85%"
      align-h="end"
    >
      <strong> Tổng cộng: <ins class="ml-5">281,717,732</ins> </strong>
    </b-row>

    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <p>Nhân viên nhập hàng</p>

      <div class="d-flex flex-column align-items-center">
        <p>Cửa hàng trưởng</p>
        <p class="mt-5">
          Nguyễn Thị Thu Vân
        </p>
      </div>
    </b-row>
    <!-- END - Fotter -->
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import {
  REPORT_RETURNED_GOODS,
  // Getters
  PRINT_INPUT_ORDER_DETIAL_GETTER,
  // Actions
  PRINT_INPUT_ORDER_DETIAL_ACTION,
} from '../store-module/type'

export default {
  data() {
    return {
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        'Stt',
        'Số PO',
        'Số nội bộ',
        'Số hóa đơn',
        'Ngày xuất HĐ',
        'Ngày ĐHTT',
        'Tiền HĐ',
        'HĐ khuyến mãi',
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [PRINT_INPUT_ORDER_DETIAL_GETTER]),
  },

  mounted() {
    this.PRINT_INPUT_ORDER_DETIAL_ACTION({ ...this.decentralization })
  },

  methods: {
    ...mapActions(REPORT_RETURNED_GOODS, [PRINT_INPUT_ORDER_DETIAL_ACTION]),
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
