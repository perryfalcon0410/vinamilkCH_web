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
      <b-form class="bg-white rounded shadow">
        <label
          for="v-search-form"
          class="text-primary m-1"
        >
          Tìm kiếm
        </label>
        <b-form-row
          class="v-search-form border-top mx-0 p-1"
        >
          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Mã nhập hàng"
              label-for="form-input-customer"
            >
              <b-form-input
                id="form-input-customer"
                placeholder="Nhập mã"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Số hóa đơn"
              label-for="form-input-customer-group"
            >
              <b-form-input
                id="form-input-customer-group"
                placeholder="Nhập số hóa đơn"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Từ ngày"
              label-for="form-input-date-from"
            >
              <b-form-datepicker
                id="form-input-date-from"
                v-model="valueDateFrom"
                :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                locale="vi"
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Đến ngày"
              label-for="form-input-date-to"
            >
              <b-form-datepicker
                id="form-input-date-to"
                v-model="valueDateTo"
                :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                locale="vi"
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
            md="12"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                id="form-button-search"
                variant="primary"
                @click="search()"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>

        </b-form-row>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Header -->
        <b-row
          class="justify-content-between border-bottom p-1 mx-0"
          align-v="center"
        >
          <h2>
            Danh sách hóa đơn bán hàng
          </h2>
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
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
              multipleColumns: true,
            }"
          >
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field == 'billNumber'">
                <span style="font-weight: bold; color: black;">{{ props.row.billNumber }}</span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
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
          <h2>
            Danh sách sản phẩm
          </h2>

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
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field == 'number'">
                <span>{{ props.row.number }}</span>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
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
  components: {

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
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      columns: [
        {
          label: 'STT',
          field: 'stt',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'name',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'billDate',
          sortable: false,
        },
        {
          label: 'Tiền giảm giá',
          field: 'discountMoney',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Tiền tích lũy',
          field: 'accumulation',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tiền phải trả',
          field: 'totalMoney',
          type: 'number',
          sortable: false,
        },
      ],
      rows: [
        {
          stt: '1',
          billNumber: 'HD001',
          customerCode: 'CUS.CH40235.001',
          name: 'Phan Bảo Châu',
          billDate: '01/10/2020',
          discountMoney: '16,800',
          accumulation: '16,800',
          totalMoney: '16,800',
        },
        {
          stt: '2',
          billNumber: 'HD001',
          customerCode: 'CUS.CH40235.001',
          name: 'Phan Bảo Châu',
          billDate: '01/10/2020',
          discountMoney: '16,800',
          accumulation: '16,800',
          totalMoney: '16,800',
        },
        {
          stt: '3',
          billNumber: 'HD001',
          customerCode: 'CUS.CH40235.001',
          name: 'Phan Bảo Châu',
          billDate: '01/10/2020',
          discountMoney: '16,800',
          accumulation: '16,800',
          totalMoney: '16,800',
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
          label: 'ĐVT',
          field: 'productUnit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'number',
          sortable: false,
        },
        {
          label: 'Đơn giá',
          field: 'unitPrice',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'money',
          sortable: false,
        },
      ],

      rowsProducts: [
        {
          productId: 'A02546',
          productName: 'Sữa chua Dâu',
          productUnit: 'Hũ',
          number: '12',
          unitPrice: '1000',
          money: '12000',
        },
        {
          productId: 'A02546',
          productName: 'Sữa chua Dâu',
          productUnit: 'Hũ',
          number: '12',
          unitPrice: '1000',
          money: '12000',
        },
        {
          productId: 'A02546',
          productName: 'Sữa chua Dâu',
          productUnit: 'Hũ',
          number: '12',
          unitPrice: '1000',
          money: '12000',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
