<template>
  <div>
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="v-title bg-light p-1 w-75 rounded-pill border-top-info border-bottom-info border-right-info align-content-center justify-content-center mt-2 mb-1">
          Khuyến mãi
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="promotiontable"
      style-class="vgt-table striped"
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
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'CTKM',
          field: 'promotionProgram',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
}
</script>
