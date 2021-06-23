<template>
  <div>
    <b-row>
      <b-col
        cols="2"
      >
        <b-row
          class="v-title bg-light py-1 w-75 rounded-pill border-top-info border-bottom-info border-right-info align-content-center justify-content-start mt-2 mb-1 header"
        >
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
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <div
          v-if="props.column.field === 'number'"
          style="padding-right: 10px"
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
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'CTKM',
          field: 'promotionProgram',
          width: '30%',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
}
</script>
