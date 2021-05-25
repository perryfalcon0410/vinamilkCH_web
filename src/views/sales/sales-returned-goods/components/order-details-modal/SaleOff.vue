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
