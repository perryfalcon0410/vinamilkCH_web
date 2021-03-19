<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <customer-list-search />
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
          :rows="rowsFormatted"
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
// import { mapGetters, mapActions } from 'vuex'
import VueGoodTablePlugin from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import CustomerListSearch from '@/views/customer/CustomerList/CustomerListSearch.vue'
// import {
//   LIST_CUSTOMER,
//   DELETE,
//   GET_ALL,
//   CUSTOMER,
// } from '@/store/customer/type'

Vue.use(VueGoodTablePlugin)

export default {
  name: 'CusomterList',
  components: {
    CustomerListSearch,
  },
  data() {
    return {
      isModalShow: false,
      list: this.$store.getters['customer/LIST_CUSTOMER'],
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
  computed: {
    // ...mapGetters(CUSTOMER, [
    //   LIST_CUSTOMER,
    // ]),
    // ...mapActions(CUSTOMER, [
    //   GET_ALL,
    //   DELETE,
    // ]),
    rowsFormatted() {
      return this.list.map(data => ({
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
  },
  mounted() {
    this.$store.dispatch('customer/GET_ALL')
  },
  methods: {
    selectionChanged(params) {
      params.selectedRows.map(data => (this.listDelete.push(data.id)))
    },

    deleteRow(listId) {
      this.$store.dispatch(this.DELETE, listId)
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
