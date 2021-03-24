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
          label: 'Số lần thanh toán',
          field: 'Times',
          sortable: false,
        },
        {
          label: 'Tiền tệ',
          field: 'Currency',
          sortable: false,
        },
        {
          label: 'Số tiền',
          field: 'Money',
          sortable: false,
        },
        {
          label: 'Phải thanh toán',
          field: 'Pay',
          sortable: false,
        },
        {
          label: 'Đã thanh toán',
          field: 'Paid',
          sortable: false,
        },

        {
          label: 'Tiền trả lại',
          field: 'Refunds',
          sortable: false,
        },
        {
          label: 'Người thu tiền',
          field: 'People',
          sortable: false,
        },
      ],
      rows: [
        {
          Times: '',
          Currency: '',
          Money: '',
          Pay: '200,000',
          Paid: '200,000',
          Refunds: '',
          People: '',

        },
        {
          Times: '',
          Currency: 'VND',
          Money: '',
          Pay: '200,000',
          Paid: '200,000',
          Refunds: '0',
          People: 'Nguyễn Văn A',
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
