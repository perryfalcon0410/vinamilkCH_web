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
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
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
