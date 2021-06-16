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
        <strong style="font-size: 30px"> Tồn kho cửa hàng </strong>
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

</style>
