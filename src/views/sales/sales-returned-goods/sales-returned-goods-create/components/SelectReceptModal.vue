<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Danh sách PO Confirm"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
    @hidden="onCloseModal"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <search-component @onSearchClick="onSearchClick" />
      <!-- END - Search -->

      <!-- START - Product list -->
      <!-- START - Coupon list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-primary">
            <strong>
              Danh sách phiếu nhập hàng
            </strong>
          </div>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="saleOders"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            compact-mode
            line-numbers
          >
            <!-- START - Column  -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-bricks />
              </div>
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>
            <!-- END - Column -->
            <!-- START - Row -->
            <template
              v-if="totalAmount"
              slot="table-row"
              slot-scope="props"
            >
              <div
                v-if="props.column.field === 'manipulation'"
              >
                <b-button
                  size="sm"
                  variant="info"
                  @click="choosenRecept(props.row)"
                >
                  <b-icon-hand-index-thumb />
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Row -->
            <!-- START - Column filter -->
            <template
              slot="column-filter"
              slot-scope="props"
            >
              <b-row
                v-if="props.column.field === 'total'"
                class="mx-0"
                align-h="end"
              >
                {{ totalAmount }}
              </b-row>
            </template>
          <!-- START - Column filter -->
          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </b-form>
      <!-- END - Coupon list -->
    </b-container>
  </b-modal>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatNumberToLocale } from '@/@core/utils/filter'
import SearchComponent from './SelectReceptSearch.vue'
import { RETURNEDGOODS, RETURNED_GOOD_CHOOSE_GETTER, GET_RETURNED_GOOD_CHOOSE_ACTION } from '../../store-module/type'

export default {
  components: {
    SearchComponent,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    selectSuccess: Function,
  },
  data() {
    return {
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
        },
        {
          label: 'Nhân viên',
          field: 'salesManName',
          sortable: false,
        },
        {
          label: 'Khách hàng',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'total',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: '',
          field: 'manipulation',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    saleOders() {
      return this.RETURNED_GOOD_CHOOSE_GETTER().saleOders.map(data => ({
        id: data.id,
        orderNumber: data.orderNumber,
        customerName: data.customerName,
        total: formatNumberToLocale(Number(data.total)),
        salesManName: data.salesManName,
        oderDate: data.orderDate,
      }))
    },
    totalAmount() {
      return formatNumberToLocale(Number(this.RETURNED_GOOD_CHOOSE_GETTER().saleOdersInfo.allTotal || ''))
    },
  },
  mounted() {
    this.GET_RETURNED_GOOD_CHOOSE_ACTION()
  },
  methods: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOOD_CHOOSE_GETTER,
    ]),
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOOD_CHOOSE_ACTION,
    ]),
    choosenRecept(value) {
      this.$emit('choosenRecept', { value })
      this.$emit('onCloseModal')
    },
    onCloseModal() {
      this.$emit('onCloseModal')
    },
    onSearchClick(search) {
      this.GET_RETURNED_GOOD_CHOOSE_ACTION(search)
    },
  },
}
</script>
