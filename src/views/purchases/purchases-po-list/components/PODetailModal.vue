<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chi tiết PO"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-white"
    footer-border-variant="white"
  >
    <!-- START - Body -->
    <b-container fluid>        <!-- START -  Import/Export Detail -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        style-class="vgt-table striped"
        compact-mode
        line-numbers
      >
        <!-- START - Column filter -->
        <template
          slot="column-filter"
          slot-scope="props"
        >
          <b-row
            v-if="props.column.field === 'PriceTotal'"
            class="mx-0"
            align-h="end"
          >
            250.300.000
          </b-row>
        </template>
        <!-- START - Column filter -->
      </vue-good-table>
      <!-- END -  Import/Export Detail -->

    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="secondary"
        class="d-flex align-items-center mx-auto"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->

  </b-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã hàng',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Đơn giá',
          field: 'PriceUnit',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'PriceTotal',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
        },
      ],
      rows: [
        {
          ProductCode: '290365412',
          ProductName: 'Thức uống cacao lúa mạch 180ml',
          Quantity: '100',
          PriceUnit: '5,000',
          PriceTotal: '1,200,000',
        },
        {
          ProductCode: '290365412',
          ProductName: 'Thức uống cacao lúa mạch 180ml',
          Quantity: '100',
          PriceUnit: '5,000',
          PriceTotal: '1,200,000',
        },
        {
          ProductCode: '290365412',
          ProductName: 'Thức uống cacao lúa mạch 180ml',
          Quantity: '100',
          PriceUnit: '5,000',
          PriceTotal: '1,200,000',
        },
      ],
    }
  },
  methods: {
    hoverHandler(hovered) {
      this.isHover = hovered
    },
  },
}
</script>
