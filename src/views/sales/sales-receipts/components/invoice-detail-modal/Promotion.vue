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
}
</script>
