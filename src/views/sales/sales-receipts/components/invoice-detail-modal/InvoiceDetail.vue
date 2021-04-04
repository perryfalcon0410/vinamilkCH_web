<template>
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
}
</script>
