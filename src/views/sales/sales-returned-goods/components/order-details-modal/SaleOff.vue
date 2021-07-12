<template>
  <b-col class="py-1">
    <vue-good-table
      :columns="columns"
      :rows="saleOffTable"
      style-class="vgt-table striped"
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
          class="mx-50 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoPromotionData.totalQuantity) }}
        </b-row>
        <b-row
          v-if="props.column.field === 'discount'"
          class="mx-50 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoPromotionData.totalDiscount) }}
        </b-row>
        <b-row
          v-else-if="props.column.field === 'paymentReturn'"
          class="mx-50 h7 text-brand-3 text-right"
          align-h="end"
        >
          {{ $formatNumberToLocale(infoPromotionData.allTotal) }}
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
    saleOffTable: {
      type: Array,
      default: null,
    },
    infoPromotionData: {
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
          tdClass: 'pr-2',
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
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Tiền trả lại',
          field: 'paymentReturn',
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
      ],
    }
  },
}
</script>
