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
          label: 'Tên in hóa đơn',
          field: 'Number',
          sortable: false,
        },
        {
          label: 'Số lượng CTKM',
          field: 'Price',
          sortable: false,
        },
      ],
      rows: [
        {
          ProductCode: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          Number: 'Nguyễn Văn A',
          Price: '2 Combo 2 SĐCĐ Ông thọ Chữ xanh 380g',
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
