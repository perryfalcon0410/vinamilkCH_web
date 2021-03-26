<template>
  <b-container
    fluid
    class="px-0 mt-2"
  >
    <b-row class="px-2 px-3">
      <b-icon-arrow-left
        class="h1 mr-4"
        @click="onBack"
      />
      <h2>Tạo phiếu trả hàng</h2>
    </b-row>
    <b-row class="mt-2 px-2 py-2">

      <!-- Start Container Left -->
      <b-col
        md
        lg="6"
        xl="3"
        class="bg-white shadow rounded mx-2 pb-3"
      >
        <b-col>
          <b-row class="my-2">
            <b-col>
              <b-card-text>
                Ngày trả hàng
              </b-card-text>
            </b-col>
            <b-col>
              <b-card-text class="font-weight-bold">
                29/10/2020 lúc 16:16
              </b-card-text>
            </b-col>
          </b-row>
          <b-row class="mb-1">
            <b-col>
              <b-card-text>
                Đơn hàng muốn trả
              </b-card-text>
            </b-col>
            <b-col>
              <b-card-text class="font-weight-bold">
                1234
              </b-card-text>
            </b-col>
          </b-row>
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="checkbill"
            />
            <b-input-group-append
              is-text
              @click="onClick"
            >
              <b-icon-three-dots-vertical />
            </b-input-group-append>
          </b-input-group>

          <!-- Start List Item -->
          <b-list-group>
            <b-list-group-item
              variant="secondary"
            >
              Ngày mua hàng
              <span class="font-weight-bold">
                : 27/10/2020
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Nhân viên bán hàng:
              <span class="font-weight-bold">
                Ngô Thị Lan Hương
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Khách hàng:
              <span class="font-weight-bold">
                Nguyễn Xuân Diễm
              </span>
            </b-list-group-item>
            <b-list-group-item
              variant="secondary"
            >
              Tiền trả lại:
              <span class="font-weight-bold">
                815,666
              </span>
            </b-list-group-item>
          </b-list-group>
          <!-- End List Item -->

          <b-form-row>
            <b-col
              cols="6"
              class="mt-1"
              align-self="start"
            >
              <b-form-group
                label="Lý do trả hàng"
              >
                <b-form-select
                  v-model="option"
                  :options="options"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col
              align-self="start"
            >
              <b-form-group
                label="Thông tin phản hồi"
              >
                <b-form-textarea />
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-col>
      </b-col>
      <!-- Start Container Left -->

      <!-- Start Container Right -->
      <b-col
        class="bg-white shadow rounded"
      >
        <b-nav tabs>
          <b-nav-item active>
            Sản phẩm
          </b-nav-item>
          <b-nav-item>
            Hàng khuyến mãi
          </b-nav-item>
        </b-nav>

        <!-- Start Table -->
        <b-card-body class="text-center">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            class="pb-1"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true
            }"
            line-numbers
            :search-options="{
              enabled: true,
              externalQuery: searchTerm
            }"
          />
        </b-card-body>
        <!-- End table -->

        <!-- Start Button -->
        <b-row class="px-3 mt-4 mb-2 d-flex justify-content-end">
          <b-button
            variant="primary"
            class="mr-2"
          >
            <b-icon-arrow90deg-left />
            TRẢ HÀNG
          </b-button>
          <b-button>
            <b-icon-x />
            ĐÓNG
          </b-button>
        </b-row>
        <!-- End button -->

      </b-col>
      <!-- End Container Right -->
    </b-row>
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      checkbill: ' SAL.BN40011.20230012253',
      option: null,
      options: [
        { text: 'Hàng lỗi' },
        'Mua thêm hàng',
        'Đổi hàng',
        'Lý do khác',
      ],
      searchTerm: '',
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'Unit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Amount',
          sortable: false,
        },
        {
          label: 'Giá bán',
          field: 'Price',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'TotalMoney',
          sortable: false,
        },
        {
          label: 'Giảm giá',
          field: 'Discount',
          sortable: false,
        },
        {
          label: 'Tiền trả lại',
          field: 'Refunds',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'Note',
          sortable: false,
        },
      ],
      rows: [
        {
          ProductCode: '',
          ProductName: '',
          Unit: '',
          Amount: '44',
          Price: '',
          TotalMoney: '815,666',
          Discount: '',
          Refunds: '815,666',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Unit: 'Hộp',
          Amount: '2',
          Price: '8,400',
          TotalMoney: '16,800',
          Discount: '0',
          Refunds: '16,800',
          Note: '',
        },
      ],
    }
  },
  computed: {
  },
  methods: {
    onBack: {
    },
    onClick: {
    },
  },
}
</script>
