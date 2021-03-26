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
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ĐVT',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
          sortable: false,
        },
        {
          label: 'Giá bán',
          field: 'Price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'IntoMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'Discount ',
          sortable: false,
        },
        {
          label: 'Thanh toán',
          field: 'Bill',
          sortable: false,
        },
      ],
      rows: [
        {
          ProductCode: '',
          ProductName: '',
          ĐVT: '',
          Number: '2',
          Price: '',
          IntoMoney: '41,624',
          Discount: '0',
          Bill: '41,624',
        },
        {
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '20,812',
          IntoMoney: '41,624',
          Discount: '0',
          Bill: '41,624',
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
