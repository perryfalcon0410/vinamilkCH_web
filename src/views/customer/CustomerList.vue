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
        Tìm kiếm
      </label>

      <b-form-row
        class="v-search-form border-top mx-0 p-1"
      >
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
              placeholder=" Nhập họ tên/mã"
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
          <b-form-group
            label="Nhóm khách hàng"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Trạng thái"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Giới tính"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Khu vực"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="4"
          md="3"
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

    <!-- START - Customer list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Danh sách khách hàng
        </label>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
            @click="routeCustomerAdd"
          >
            <b-icon-plus />
            Thêm mới
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="danger"
            @click="isModalShow = true"
          >
            <b-icon-trash-fill />
            Xóa
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rowsFormatted()"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          compact-mode
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
          }"
          line-numbers
          @on-selected-rows-change="selectionChanged"
        >
          <!-- START - label -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - label -->

          <!-- START - Edit -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'customerFeature'">
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="routeCustomerUpdate"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Edit -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Customer list -->

    <!-- START - Customer Modal Delete -->
    <b-modal
      id="modal-delete"
      v-model="isModalShow"
      title="Thông báo"
    >
      Bạn có chắc muốn xóa hàng này không?
      <template #modal-footer>
        <b-button
          variant="primary"
          @click="deleteRow(listDelete)"
        >
          Đồng ý
        </b-button>
        <b-button @click="isModalShow = !isModalShow">
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Customer Modal Delete -->

  </b-container>
</template>

<script>
import Vue from 'vue'

import VueGoodTablePlugin from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

import axios from '@axios'

Vue.use(VueGoodTablePlugin)

export default {
  name: 'Cusomter',
  components: {
  },
  data() {
    return {
      isModalShow: false,
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      customerData: [],
      listDelete: [],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerID',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
        },
        {
          label: 'Điện thoại',
          field: 'customerPhone',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'customerBirthDay',
          sortable: false,
        },
        {
          label: 'Giới tính',
          field: 'customerGender',
          sortable: false,
        },
        {
          label: 'Trạng thái',
          field: 'customerStatus',
          type: 'boolean',
          sortable: false,
          formatFn: this.formatFn,
          html: true,
        },
        {
          label: 'Nhóm',
          field: 'customerGroup',
          sortable: false,
        },
        {
          label: 'Ngày tạo',
          field: 'customerDate',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'customerFeature',
          sortable: false,
        },
      ],
    }
  },
  mounted() {
    axios
      .get('customer/all')
      .then(response => {
        this.customerData = response.data.data.content
      })
  },
  methods: {
    rowsFormatted() {
      return this.customerData.map(data => ({
        id: data.id,
        customerID: data.cusCode,
        customerName: `${data.lastName} ${data.firstName}`,
        customerPhone: data.phoneNumber,
        customerBirthDay: data.issueDate,
        customerGender: data.gender,
        customerStatus: data.status,
        customerGroup: data.cusType,
        customerDate: data.customerCreateDate,
        customerFeature: 'Chỉnh sửa',
      }))
    },
    // search() {
    //   axios
    //     .get('customer/search?idCardNumber=2123&phoneNumber=qweqe&name=sds&code=wewe')
    //     .then(response => {
    //       console.log(response)
    //     })
    // },
    selectionChanged(params) {
      params.selectedRows.map(data => (this.listDelete.push(data.id)))
    },
    deleteRow(listId) {
      axios
        .delete('customer/delete', {
          data: {
            listId,
          },
        })
        .then(() => {
          axios
            .get('customer/all')
            .then(response => {
              this.customerData = response.data.data.content
            })
        })
      this.isModalShow = false
    },
    routeCustomerAdd() {
      this.$router.push({ name: 'customerList-customerAdd' })
    },
    routeCustomerUpdate() {
      this.$router.push({ name: 'customerList-customerUpdate' })
    },
  },
}
</script>
