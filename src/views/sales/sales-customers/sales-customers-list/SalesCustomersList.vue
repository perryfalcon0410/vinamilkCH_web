<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <sales-customers-list-search />
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
            @click="navigateToCreate"
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
            @click="customersSelected.length >= 1 ? isShowDeleteModal = true : null"
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
          :rows="customers"
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
          @on-selected-rows-change="selectedRowsChange"
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
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="navigateToUpdate"
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
      v-model="isShowDeleteModal"
      title="Thông báo"
    >
      Bạn có chắc muốn xóa hàng này không?
      <template #modal-footer>
        <b-button
          variant="primary"
          @click="deleteCustomers"
        >
          Đồng ý
        </b-button>
        <b-button @click="isShowDeleteModal = !isShowDeleteModal">
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Customer Modal Delete -->

  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import 'vue-good-table/dist/vue-good-table.css'
import { getGenderLabel } from '@core/utils/utils'
import SalesCustomersListSearch from './components/SalesCustomersListSearch.vue'
import {
  CUSTOMER,
  CUSTOMERS_GETTER,
  GET_CUSTOMERS_ACTION,
  DELETE_CUSTOMERS_ACTION,
} from '../store-module/type'

export default {
  name: 'SalesCustomersList',
  components: {
    SalesCustomersListSearch,
  },
  data() {
    return {
      isShowDeleteModal: false,
      customersSelected: [],
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'code',
          sortable: false,
        },
        {
          label: 'Họ tên',
          field: 'fullName',
          sortable: false,
        },
        {
          label: 'Điện thoại',
          field: 'phoneNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'birthDay',
          sortable: false,
        },
        {
          label: 'Giới tính',
          field: 'gender',
          sortable: false,
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          sortable: false,
          formatFn: this.formatFn,
          html: true,
        },
        {
          label: 'Nhóm',
          field: 'group',
          sortable: false,
        },
        {
          label: 'Ngày tạo',
          field: 'date',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    customers() {
      return this.CUSTOMERS_GETTER().map(data => ({
        id: data.id,
        code: data.customerCode,
        fullName: `${data.lastName} ${data.firstName}`,
        phoneNumber: data.phoneNumber,
        birthDay: new Date(data.birthday).toLocaleDateString(),
        gender: getGenderLabel(data.gender),
        status: this.resolveStatus(data.status),
        group: data.customerGroupId,
        date: new Date(data.createdAt).toLocaleDateString(),
        feature: 'Chỉnh sửa',
      }))
    },
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION({})
  },
  methods: {
    ...mapState(CUSTOMER, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      DELETE_CUSTOMERS_ACTION,
    ]),
    selectedRowsChange(params) {
      this.customersSelected = params.selectedRows.map(data => data.id)
    },
    deleteCustomers() {
      this.isShowDeleteModal = false
      this.DELETE_CUSTOMERS_ACTION(this.customersSelected)
    },
    resolveStatus(staus) {
      switch (staus) {
        case 0:
          return 'Ngưng hoạt động'
        case 1:
          return 'Hoạt động'
        default:
          return ''
      }
    },
    navigateToCreate() {
      this.$router.push({ name: 'sales-customers-create' })
    },
    navigateToUpdate() {
      this.$router.push({ name: 'sales-customers-update' })
    },
  },
}
</script>
