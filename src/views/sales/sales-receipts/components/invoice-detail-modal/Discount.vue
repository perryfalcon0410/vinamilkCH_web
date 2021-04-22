<template>
  <!-- Start table -->
  <vue-good-table
    :columns="columns"
    :rows="discounts"
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
    discounts: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      searchTerm: '',
      columns: [
        {
          label: 'Phiếu/thẻ/Chương trình',
          field: 'promotionName',
          sortable: false,
        },
        {
          label: 'Loại',
          field: 'voucherType',
          sortable: false,
        },
        {
          label: 'Tiền chiết khấu/ giảm',
          field: 'discountPrice',
          sortable: false,
        },
        {
          label: '%Chiết khấu/ giảm',
          field: 'discountPercent',
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
}
</script>
