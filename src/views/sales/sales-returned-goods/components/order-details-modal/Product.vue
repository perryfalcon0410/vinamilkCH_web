<template>
  <b-col class="py-1">
    <vue-good-table
      :columns="columns"
      :rows="producttable"
      style-class="vgt-table striped "
      :pagination-options="{
        enabled: false
      }"
      compact-mode
      line-numbers
    >
      <!-- START - Empty rows -->
      <div
        slot="emptystate"
        class="text-center"
      >
        Không có dữ liệu
      </div>
      <!-- END - Empty rows -->

      <!-- START - Column filter -->
      <template
        slot="column-filter"
        slot-scope="props"
      >
        <b-row
          v-if="props.column.field === 'quantity'"
          class="mx-0 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoProductData.totalQuantity) }}
        </b-row>
        <b-row
          v-else-if="props.column.field === 'totalPrice'"
          class="mx-0 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoProductData.totalAmount) }}
        </b-row>
        <b-row
          v-if="props.column.field === 'discount'"
          class="mx-0 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoProductData.totalDiscount) }}
        </b-row>
        <b-row
          v-else-if="props.column.field === 'paymentReturn'"
          class="mx-0 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoProductData.allTotal) }}
        </b-row>
      </template>
      <!-- START - Column filter -->
    </vue-good-table>
  </b-col>
</template>

<script>

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },
    producttable: {
      type: Array,
      default: null,
    },
    infoProductData: {
      type: Array,
      default: null,
    },

  },
  data() {
    return {
      modalShow: false,
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-nowrap',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-nowrap',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'totalPrice',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Tiền trả lại',
          field: 'paymentReturn',
          type: 'number',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
      ],
    }
  },
}
</script>
