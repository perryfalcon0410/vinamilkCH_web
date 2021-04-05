<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <search-component />
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <label class="text-primary">
            Danh sách phiếu nhập hàng
          </label>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true
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
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-search
                  class="cursor-pointer"
                />
                <b-button
                  size="sm"
                  variant="info"
                  class="ml-1"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
          <!-- END - Row -->

          </vue-good-table>
        </b-col>
        <!-- END - Table -->
      </b-form>
      <!-- END - Coupon list -->

      <!-- START - Product list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <label class="text-primary">
            Danh sách sản phẩm
          </label>

        </b-row>
        <!-- END - Header -->

        <!-- START - Table Products -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columnsProducts"
            :rows="rowsProducts"
            style-class="vgt-table bordered"
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
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'manipulation'">
                <b-icon-search
                  class="cursor-pointer"
                />
                <b-button
                  size="sm"
                  variant="info"
                  class="ml-1"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
          <!-- END - Row -->

          </vue-good-table>
        </b-col>
      <!-- END - Table Products-->

      </b-form>
      <!-- END - Product list -->
    </b-container>
  </b-modal>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import SearchComponent from './components/EntryModalSearch.vue'

export default {
  components: {
    SearchComponent,
    VueGoodTable,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],

      columns: [
        {
          label: 'Ngày nhập',
          field: 'entryDate',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'entryId',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ngày hóa đơn',
          field: 'billDate',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'PO No',
          field: 'poNo',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
          sortable: false,
        },
      ],

      rows: [
        {
          entryDate: '02/03/2021',
          entryId: '290365412',
          billNumber: '04DC10',
          billDate: '02/03/2021',
          internalNumber: '1232',
          poNo: '1232',
          manipulation: '',
        },
        {
          entryDate: '02/03/2021',
          entryId: '290365412',
          billNumber: '04DC10',
          billDate: '02/03/2021',
          internalNumber: '1232',
          poNo: '1232',
          manipulation: '',
        },
        {
          entryDate: '02/03/2021',
          entryId: '290365412',
          billNumber: '04DC10',
          billDate: '02/03/2021',
          internalNumber: '1232',
          poNo: '1232',
          manipulation: '',
        },
      ],

      columnsProducts: [
        {
          label: 'Mã sản phẩm',
          field: 'productId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'productPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'ProductExported',
          sortable: false,
        },
        {
          label: 'Còn lại/Tổng nhập',
          field: 'remainder',
          sortable: false,
        },
      ],

      rowsProducts: [
        {
          productId: '02/03/2021',
          productName: '290365412',
          productPrice: '04DC10',
          productUnit: '02/03/2021',
          totalPrice: '1232',
          ProductExported: '1/5',
          remainder: '4/5',
        },
        {
          productId: '02/03/2021',
          productName: '290365412',
          productPrice: '04DC10',
          productUnit: '02/03/2021',
          totalPrice: '1232',
          ProductExported: '1/5',
          remainder: '4/5',
        },
        {
          productId: '02/03/2021',
          productName: '290365412',
          productPrice: '04DC10',
          productUnit: '02/03/2021',
          totalPrice: '1232',
          ProductExported: '1/5',
          remainder: '4/5',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
