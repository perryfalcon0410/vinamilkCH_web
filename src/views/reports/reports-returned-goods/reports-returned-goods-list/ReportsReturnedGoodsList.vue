<template>
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
        Điều kiện
      </label>

      <b-form-row class="v-search-form border-top mx-0 p-1">
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Mã trả hàng"
            label-for="form-input-customer"
          >
            <b-form-input
              id="form-input-customer"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Từ ngày"
            label-for="form-input-date-from"
          >
            <b-form-datepicker
              id="form-input-date-from"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
              reset-button
              label-reset-button="Xóa"
              placeholder="chọn ngày"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Đến ngày"
            label-for="form-input-date-to"
          >
            <b-form-datepicker
              id="form-input-date-to"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
              reset-button
              label-reset-button="Xóa"
              placeholder="chọn ngày"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Lý do"
            label-for="form-input-customer-group"
          >
            <b-form-select
              v-model="selected"
              :options="options"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Sản phẩm"
            label-for="form-input-customer-group"
          >
            <b-input-group class="input-group-merge ">
              <b-form-input
                id="input-live"
              />
              <b-input-group-append is-text>
                <b-icon-three-dots-vertical />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
          class="mt-2"
        >
          <b-button
            id="form-button-search"
            variant="primary"
            @click="search()"
          >
            <b-icon-search />
            Tìm kiếm
          </b-button>
        </b-col>
      </b-form-row>
    </b-form>
    <!-- END - Search -->

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách đơn trả hàng
        </label>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rowsProduct"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          line-numbers
        />
      </b-col>
      <!-- END - Table -->
    </b-form>
  </b-container>
</template>
<script>

export default {
  data() {
    return {
      selected: 1,
      options: [
        { value: 1, text: 'Tất cả' },
        { value: 2, text: 'Hàng lỗi' },
        { value: 3, text: 'Mua thêm hàng' },
        { value: 4, text: 'Đổi hàng' },
        { value: 5, text: 'Lý do khác' },
      ],
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      columns: [
        {
          label: 'Mã trả hàng',
          field: 'Id',
          sortable: false,
        },
        {
          label: 'Hóa đơn mua hàng',
          field: 'Bill',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'CustomerCode',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'Industry',
          sortable: false,
        },
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'HDKM',
          sortable: false,
        },

        {
          label: 'ĐVT',
          field: 'ĐVT',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
          sortable: false,
        },
        {
          label: 'Giá bán',
          field: 'Price',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'Total',
          sortable: false,
        },
        {
          label: 'Tiền trả lại',
          field: 'Refunds',
          sortable: false,
        },
        {
          label: 'Ngày trả',
          field: 'PayDay',
          sortable: false,
        },
        {
          label: 'Lý do trả',
          field: 'Reason',
          sortable: false,
        },
        {
          label: 'Thông tin phản hồi',
          field: 'Note',
          sortable: false,
        },

      ],
      rowsProduct: [
        {
          Id: '',
          Bill: '',
          CustomerCode: '',
          Name: '',
          Industry: '',
          ProductCode: '',
          HDKM: '',
          ĐVT: '',
          Number: '44',
          Price: '',
          Total: '794,484',
          Refunds: '794,484',
          PayDay: '',
          Reason: '',
          Note: '',
        },
        {
          Id: 'ITR.BN40011.20.00001',
          Bill: 'SAL.BN4001120110600002',
          CustomerCode: 'CUS.CH40235.001',
          Name: 'Phan Bảo Châu',
          Industry: 'A',
          ProductCode: '04AA10',
          HDKM: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          Total: '16,800',
          Refunds: '16,800',
          PayDay: '01/10/2020 15:08',
          Reason: 'Mua thêm hàng',
          Note: 'Trả hàng',
        },
        {
          Id: 'ITR.BN40011.20.00001',
          Bill: 'SAL.BN4001120110600002',
          CustomerCode: 'CUS.CH40235.001',
          Name: 'Phan Bảo Châu',
          Industry: 'A',
          ProductCode: '04AA10',
          HDKM: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          Total: '16,800',
          Refunds: '16,800',
          PayDay: '01/10/2020 15:08',
          Reason: 'Mua thêm hàng',
          Note: 'Trả hàng',
        },
        {
          Id: 'ITR.BN40011.20.00001',
          Bill: 'SAL.BN4001120110600002',
          CustomerCode: 'CUS.CH40235.001',
          Name: 'Phan Bảo Châu',
          Industry: 'A',
          ProductCode: '04AA10',
          HDKM: 'STT dâu ADM GOLD 180ml',
          ĐVT: 'Hộp',
          Number: '2',
          Price: '8,400',
          Total: '16,800',
          Refunds: '16,800',
          PayDay: '01/10/2020 15:08',
          Reason: 'Mua thêm hàng',
          Note: 'Trả hàng',
        },
      ],
    }
  },
  computed: {
  },

  methods: {
  },
}
</script>
