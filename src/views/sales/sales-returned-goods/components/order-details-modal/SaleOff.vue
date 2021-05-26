<template>
  <b-col class="py-1">
    <vue-good-table
      :columns="columns"
      :rows="saleOffTable"
      style-class="vgt-table bordered"
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
          class="mx-0"
          align-h="end"
        >
          {{ (infoPromotionData.totalQuantity) }}
        </b-row>
        <b-row
          v-else-if="props.column.field === 'totalPrice'"
          class="mx-0"
          align-h="end"
        >
          {{ (infoPromotionData.totalAmount) }}
        </b-row>
        <b-row
          v-if="props.column.field === 'discount'"
          class="mx-0"
          align-h="end"
        >
          {{ (infoPromotionData.totalDiscount) }}
        </b-row>
        <b-row
          v-else-if="props.column.field === 'paymentReturn'"
          class="mx-0"
          align-h="end"
        >
          {{ (infoPromotionData.totalDiscount) }}
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
          thClass: 'text-left',
          tdClass: 'text-left',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-left',
          tdClass: 'text-left',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          thClass: 'text-left',
          tdClass: 'text-left',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'totalPrice',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
        },
        {
          label: 'Tiền trả lại',
          field: 'paymentReturn',
          thClass: 'text-right',
          tdClass: 'text-right',
          sortable: false,
        },
      ],
    }
  },
}
</script>
