<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <b-card
      no-body
      class="mb-1"
    >
      <!-- Start Button Option Search -->
      <b-card-header
        header-tag="header"
        class="p-1 d-flex"
        role="tab"
      >
        <b-button
          v-b-toggle.accordion-2
          block
          variant="light"
        >
          <b-row>
            <label
              class="text-primary mr-auto"
            >
              Tìm kiếm
            </label>
            <b-icon-chevron-down />
          </b-row>
        </b-button>
      </b-card-header>
      <!-- End Button Option Search -->

      <b-collapse
        id="accordion-2"
        accordion="my-accordion"
        visible
      >
        <b-card-body>

          <!-- START - Search -->
          <b-form-row
            class="v-search-form border-top"
          >
            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
            >
              <b-form-group
                label="Khách hàng"
                label-for="form-input-customer"
              >
                <b-form-input
                  id="form-input-customer"
                />
              </b-form-group>
            </b-col>

            <b-col
              xl
              sm="4"
              md="3"
              class="mt-1"
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
              class="mt-1"
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
              sm="4"
              md="3"
              class="mt-1"
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
              sm="4"
              md="3"
              class="mt-1"
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
          <!-- END - Search -->

        </b-card-body>
      </b-collapse>
    </b-card>

    <!-- Start Add Bill -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
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
            <b-icon-plus />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>
      <!-- End Add Bill -->

      <!-- Start table -->
      <b-col class="py-1">
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
        > -->

          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks class="ml-1" />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>

          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'Press'">
              <b-button
                variant="light"
                class="rounded-circle px-1"
              >
                <b-icon-hand-index-thumb />
              </b-button>
            </div>
          </template>

        </vue-good-table>
        <b-row class="mb-5 mr-1">
          <b-col />
          <b-col
            cols="12"
            md="auto"
          />
          <b-col
            col
            lg="2"
          />
          <b-col
            col
            lg="3"
          >
            <h4>Tổng : 794,484</h4>
          </b-col>
          <b-col
            col
            lg="2"
          >
            <h4>Tổng tiền : 794,484</h4>
          </b-col>
        </b-row>
      </b-col>
    <!-- End table -->
    </b-form>
    <!-- END - Customer list -->
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
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      searchTerm: '',
      columns: [
        {
          label: 'Mã trả hàng',
          field: 'CodeBill',
          sortable: false,
        },
        {
          label: 'Đơn hàng tham chiếu',
          field: 'Reference',
          sortable: false,
        },
        {
          label: 'Nhân viên',
          field: 'Staff',
          sortable: false,
        },
        {
          label: 'Mã khách hàng',
          field: 'Customer',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'FullName',
          sortable: false,
        },
        {
          label: 'Ngày trả hàng',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Tổng giá trị',
          field: 'TotalMoney',
          sortable: false,
        },
        {
          label: 'Chiết khấu',
          field: 'Discount',
          sortable: false,
        },
        {
          label: 'Tiền khuyến mãi',
          field: 'Promotion',
          sortable: false,
        },
        {
          label: 'Thành tiền thanh toán',
          field: 'Pay',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Press',
          sortable: false,
        },
      ],
      rows: [
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
        },
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
        },
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
        },
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
        },
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
        },
        {
          CodeBill: 'TH001',
          Reference: 'HD001',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'CUS.CH40235.001',
          FullName: 'Phan Bảo Châu',
          Date: '01/10/2020',
          TotalMoney: '16,800',
          Discount: '',
          Promotion: '',
          Pay: '16,800',
          Press: 'Chỉnh sửa',
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
