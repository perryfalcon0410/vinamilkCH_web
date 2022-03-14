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
            v-if="props.column.field === 'amount'"
            class="mx-0"
            align-h="end"
          >
            {{ totalPrice }}
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
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  PURCHASES,
  // GETTERS
  GET_PO_AUTO_PRODUCT_GETTER,
  // ACTIONS
  GET_PO_AUTO_PRODUCT_ACTION,

} from '../../store-module/type'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {

      poAutoId: 0,
      totalPrice: 0,
      rows: [],
      columns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Đơn giá',
          field: 'price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'amount',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
        },
      ],
    }
  },

  computed: {
    ...mapGetters(PURCHASES, [
      GET_PO_AUTO_PRODUCT_GETTER,
    ]),

    poAutoDetailProduct() {
      return this.GET_PO_AUTO_PRODUCT_GETTER
    },
    getPassValue() {
      return this.value
    },
  },

  watch: {
    poAutoDetailProduct() {
      this.rows = this.poAutoDetailProduct
      this.totalPrice = 0
      this.rows.forEach(n => {
        this.totalPrice += n.amount
      })
    },
    getPassValue() {
      this.poAutoId = this.getPassValue
      this.getPoAutoDetailProduct()
    },
  },

  methods: {
    ...mapActions(PURCHASES, [
      GET_PO_AUTO_PRODUCT_ACTION,
    ]),
    getPoAutoDetailProduct() {
      if (this.poAutoId !== '') {
        this.GET_PO_AUTO_PRODUCT_ACTION({
          poAutoNumber: this.value,
        })
      }
    },
  },
}
</script>
