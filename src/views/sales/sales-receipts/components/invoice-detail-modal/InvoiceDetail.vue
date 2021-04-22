<template>
  <!-- Start table -->
  <vue-good-table
    :columns="columns"
    :rows="detail"
    style-class="vgt-table striped"
    :pagination-options="{
      enabled: true
    }"
    line-numbers
    :search-options="{
      enabled: true,
      externalQuery: searchTerm
    }"
  >
    <template
      slot="column-filter"
      slot-scope="props"
    >
      <b-row
        v-if="props.column.field === 'number'"
        class="mx-0"
        align-h="end"
      >
        {{ total.totalQuantity }}
      </b-row>
      <b-row
        v-if="props.column.field === 'intoMoney'"
        class="mx-0"
        align-h="end"
      >
        {{ total.totalAmount }}
      </b-row>
      <b-row
        v-else-if="props.column.field === 'discount'"
        class="mx-0"
        align-h="end"
      >
        {{ total.totalDiscount }}
      </b-row>
      <b-row
        v-else-if="props.column.field === 'bill'"
        class="mx-0"
        align-h="end"
      >
        {{ total.totalPayment }}
      </b-row>
    </template>
  </vue-good-table>
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
    detail: {
      type: Array,
      default: null,
    },
    total: {
      type: Object,
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
          label: 'ĐVT',
          field: 'ĐVT',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
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
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giảm giá',
          field: 'Discount ',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thanh toán',
          field: 'Bill',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
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
          ProductCode: this.invoiceDetail,
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
