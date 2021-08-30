<template>
  <div>
    <b-row>
      <b-col
        cols="2"
      >
        <b-row
          class="v-title bg-light py-1 rounded-pill border-top-info border-bottom-info border-right-info align-content-center justify-content-start mt-2 mb-1 header"
        >
          Giảm giá & chiết khấu
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="discounts"
      style-class="vgt-table striped"
      line-numbers
    >
      <div
        slot="emptystate"
        class="text-center"
      >
        Không có dữ liệu
      </div>
      <template
        slot="table-row"
        slot-scope="props"
      >
        <div
          v-if="props.column.field === 'discountPrice'"
          class="pr-70"
        >
          {{ props.formattedRow[props.column.field] }}
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    <!-- END - Custom row -->
    </vue-good-table>
    <!-- End table -->
  </div>
</template>

<script>
export default {
  props: {
    discounts: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      columns: [
        {
          label: 'Phiếu/ Thẻ/ Chương trình',
          field: 'promotionName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Loại khuyến mãi',
          field: 'promotionType',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tiền chiết khấu/ giảm',
          field: 'discountPrice',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: '%Chiết khấu/ giảm',
          field: 'discountPercent',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
}
</script>
