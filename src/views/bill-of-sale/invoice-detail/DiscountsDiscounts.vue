<template>
  <div>
    <b-row cols-md="6">
      <b-col>
        <b-row class="p-1">
          Số hóa đơn:
          <b-card-text class="font-weight-bold">
            IN.2000125
          </b-card-text>
        </b-row>
      </b-col>
      <b-col>
        <b-row class="p-1">
          Khách hàng:
          <b-card-text class="font-weight-bold">
            Phan Bảo Châu
          </b-card-text>
        </b-row>
      </b-col>
      <b-col>
        <b-row class="p-1">
          Ngày thu:
          <b-card-text class="font-weight-bold">
            16/03/2021
          </b-card-text>
        </b-row>
      </b-col>
    </b-row>

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      style-class="vgt-table striped"
      :pagination-options="{
        enabled: true
      }"
      line-numbers
      :search-options="{
        enabled: true,
        externalQuery: searchTerm
      }"
    />
  <!-- End table -->
  </div>
</template>

<script>

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import Vue from 'vue'

Vue.use(VueGoodTablePlugin)

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },

  },
  data() {
    return {
      modalShow: false,
      searchTerm: '',
      columns: [
        {
          label: 'Phiếu/thẻ/Chương trình',
          field: 'Program',
          sortable: false,
        },
        {
          label: 'Loại',
          field: 'Type',
          sortable: false,
        },
        {
          label: 'Tiền chiết khấu/ giảm',
          field: 'DiscountMoney',
          sortable: false,
        },
        {
          label: '%Chiết khấu/ giảm',
          field: 'Discount',
          sortable: false,
        },
        {
          label: 'Thực hiện bởi',
          field: 'Made',
          sortable: false,
        },
        {
          label: 'Xác thực bởi',
          field: 'Authentication',
          sortable: false,
        },
      ],
      rows: [
        {
          Program: '',
          Type: '',
          DiscountMoney: '100,00',
          Discount: '50',
          Made: '',
          Authentication: '',
        },
        {
          Program: 'Tết Nguyên Đán',
          Type: ' km giảm tiền',
          DiscountMoney: '100,000',
          Discount: '50',
          Made: 'AH20041',
          Authentication: 'AH20041',
        },
      ],
    }
  },
  computed: {

  },
  methods: {
    onPress() {
    },
  },
}
</script>
