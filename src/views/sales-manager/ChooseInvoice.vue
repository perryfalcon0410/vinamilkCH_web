<template>
  <!-- Choose Invoice  START -->
  <b-modal
    id="modal-center"
    size="xl"
    :visible="visible"
    hide-footer="true"
    centered
    title="Chọn hóa đơn cần trả"
  >
    <!-- START - Search -->
    <b-form-row
      class="mt-1 mx-3"
    >
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Số hóa đơn"
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
      >
        <b-form-group
          label="Sản phẩm"
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
      >
        <b-form-group
          label="Ngày bán từ"
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
      >
        <b-button
          id="form-button-search"
          class="mt-2"
          variant="primary"
          @click="search()"
        >
          <b-icon-search />
          Tìm kiếm
        </b-button>
      </b-col>
    </b-form-row>
    <!-- END - Search -->

    <!-- Start table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      class="px-4"
      style-class="vgt-table striped"
      :pagination-options="{
        enabled: true
      }"
      compact-mode
      line-numbers
      :search-options="{
        enabled: true,
        externalQuery: searchTerm
      }"
    >
      <template
        slot="table-column"
        slot-scope="props"
      >
        <div
          v-if="props.column.label === 'Chức năng'"
        />
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
            variant="info"
            @click="onPress"
          >
            <b-icon-hand-index-thumb />
            CHỌN ĐƠN
          </b-button>
        </div>
      </template>
    </vue-good-table>

    <b-form-row
      class="mt-1 mx-3 "
    >
      <b-col />
      <b-col
        cols="12"
        md="auto"
      >
        <h2>Tổng tiền : </h2>
      </b-col>
      <b-col
        col
        lg="4"
      >
        <h2>600,000</h2>
      </b-col>
    </b-form-row>
    <!-- End table -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        @click="visible = !visible"
      >
        <b-row>
          <b-icon-x />
          <h5 class="text-white ">
            Đóng
          </h5>
        </b-row>
      </b-button>
    </b-row>
  </b-modal>
  <!--Choose Invoice End -->
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  props: {
    visible: {
      type: Boolean,
    },

  },
  data() {
    return {
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      searchTerm: '',
      columns: [
        {
          label: 'Số hóa đơn',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Ngày bán',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Nhân viên',
          field: 'Staff',
          sortable: false,
        },
        {
          label: 'Khách hàng',
          field: 'Customer',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'TotalMoney',
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
          NumberBill: 'HD.001',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
        {
          NumberBill: 'HD.002',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
        {
          NumberBill: 'HD.003',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
        {
          NumberBill: 'HD.004',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
        {
          NumberBill: 'HD.005',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
        {
          NumberBill: 'HD.006',
          Date: '01/10/2020',
          Staff: 'Ngô Thị Lan Hương',
          Customer: 'Phan Bảo Châu',
          TotalMoney: '100,000',
          Press: 'Chỉnh sửa',
        },
      ],
    }
  },
  computed: {

  },
  methods: {
    onPress() {
    },
  },
}
</script>
