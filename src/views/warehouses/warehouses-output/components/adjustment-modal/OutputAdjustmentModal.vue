<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn phiếu xuất điều chỉnh"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Delivery Bill list -->
      <b-form class="v-search bg-white rounded shadow rounded">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-primary">
            <strong>
              Danh sách phiếu xuất điều chỉnh
            </strong>
          </div>

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
      <!-- END - Delivery Bill list -->

      <!-- START - Product list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <div class="text-primary">
            <strong>
              Danh sách sản phẩm
            </strong>
          </div>

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
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
      listDelete: [],

      columns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
        },
        {
          label: 'Ngày',
          field: 'date',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          type: 'number',
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
          licenseNumber: 'DCG_0000069',
          date: '02/03/2021',
          note: '04DC10',
          manipulation: '',
        },
        {
          licenseNumber: 'DCG_0000069',
          date: '02/03/2021',
          note: '04DC10',
          manipulation: '',
        },
        {
          licenseNumber: 'DCG_0000069',
          date: '02/03/2021',
          note: '04DC10',
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
          label: 'Số lượng',
          field: 'productAmount',
          type: 'number',
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
      ],

      rowsProducts: [
        {
          productId: '04DC10',
          productName: '290365412',
          productAmount: '1',
          productPrice: '1000',
          productUnit: 'Hộp',
          totalPrice: '1000',
        },
        {
          productId: '04DC10',
          productName: '290365412',
          productAmount: '1',
          productPrice: '1000',
          productUnit: 'Hộp',
          totalPrice: '1000',
        },
        {
          productId: '04DC10',
          productName: '290365412',
          productAmount: '1',
          productPrice: '1000',
          productUnit: 'Hộp',
          totalPrice: '1000',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
