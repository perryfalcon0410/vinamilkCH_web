<template>
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
          label: 'Tổng tiền',
          field: 'IntoMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'Discount',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Tiền trả lại',
          field: 'Bill',
          sortable: false,
          type: 'number',
        },
      ],
      rows: [
        {
          ProductCode: '',
          ProductName: '',
          ĐVT: '',
          Number: '44',
          Price: '',
          IntoMoney: '815,666',
          Discount: '',
          Bill: '815,666',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          IntoMoney: '16,800',
          Discount: '0',
          Bill: '16,800',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          IntoMoney: '16,800',
          Discount: '0',
          Bill: '16,800',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          IntoMoney: '16,800',
          Discount: '0',
          Bill: '16,800',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          IntoMoney: '16,800',
          Discount: '0',
          Bill: '16,800',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          IntoMoney: '16,800',
          Discount: '0',
          Bill: '16,800',
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
