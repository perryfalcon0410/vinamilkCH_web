<template>
  <!-- Start table -->
  <vue-good-table
    :columns="columns"
    :rows="promotiontable"
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
    promotiontable: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      searchTerm: '',
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'number',
          sortable: false,
        },
        {
          label: 'CTKM',
          field: 'promotionProgram',
          sortable: false,
        },
      ],
    }
  },
}
</script>
