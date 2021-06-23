<template>
  <!-- Start table -->
  <vue-good-table
    :columns="columns"
    :rows="data"
    style-class="vgt-table striped"
    line-numbers
  >
    <!-- START - Custom row -->
    <template
      slot="table-row"
      slot-scope="props"
    >
      <div
        v-if="props.column.field === 'number' || props.column.field === 'price'||
          props.column.field === 'intoMoney'|| props.column.field === 'discount' ||
          props.column.field === 'bill'"
        style="padding-right: 10px"
      >
        {{ props.formattedRow[props.column.field] }}
      </div>
      <div v-else>
        {{ props.formattedRow[props.column.field] }}
      </div>
    </template>
    <!-- END - Custom row -->
    <template
      slot="column-filter"
      slot-scope="props"
    >
      <b-row
        v-if="props.column.field === 'number'"
        class="mx-50 h7 text-brand-3"
        align-h="end"
      >
        {{ $formatNumberToLocale(total.totalQuantity) }}
      </b-row>
      <b-row
        v-if="props.column.field === 'intoMoney'"
        class="mx-50 h7 text-brand-3"
        align-h="end"
      >
        {{ $formatNumberToLocale(total.totalAmount) }}
      </b-row>
      <b-row
        v-else-if="props.column.field === 'discount'"
        class="mx-50 h7 text-brand-3"
        align-h="end"
      >
        {{ $formatNumberToLocale(total.totalDiscount) }}
      </b-row>
      <b-row
        v-else-if="props.column.field === 'bill'"
        class="mx-50 h7 text-brand-3"
        align-h="end"
      >
        {{ $formatNumberToLocale(total.totalPayment) }}
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
    data: {
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
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá bán',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'intoMoney',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thanh toán',
          field: 'bill',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },
}
</script>
