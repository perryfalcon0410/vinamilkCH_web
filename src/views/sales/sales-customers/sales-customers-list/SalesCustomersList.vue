<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
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
        <strong class="text-blue-vinamilk">
          Danh sách khách hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded bg-blue-vinamilk text-white h9"
            variant="someThing"
            size="sm"
            @click="navigateToCreate"
          >
            <b-icon-plus scale="2" />
            Thêm mới
          </b-button>
          <b-button
            class="ml-1 rounded bg-blue-vinamilk text-white h9"
            variant="someThing"
            size="sm"
            @click="onClickExcelExportButton"
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
          :rows="customers"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
        >
          >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-bricks v-b-popover.hover="'Thao tác'" />
            </div>

            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                v-b-popover.hover.top="'Chỉnh sửa'"
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              class="v-pagination px-1 mx-0"
              align-h="between"
              align-v="center"
            >
              <div
                class="d-flex align-items-center"
              >
                <span
                  class="text-nowrap"
                >
                  Hiển thị 1 đến
                </span>
                <b-form-select
                  v-model="elementSize"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong {{ customerPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="customerPagination.totalElements"
                :per-page="elementSize"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1"
                @input="(value)=>props.pageChanged({currentPage: value})"
              >
                <template slot="prev-text">
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template slot="next-text">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </b-row>
          </template>
          <!-- END - Pagination -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Customer list -->
  </b-container>
</template>

<script>
import customerData from '@/@db/customer'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { getGenderLabel, getCustomerTypeLabel } from '@core/utils/utils'
import { formatDateToLocale } from '@core/utils/filter'
import SalesCustomersListSearch from './components/SalesCustomersListSearch.vue'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_PAGINATION_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  EXPORT_CUSTOMERS_ACTION,
} from '../store-module/type'

export default {
  components: {
    SalesCustomersListSearch,
  },
  data() {
    return {
      isShowDeleteModal: false,
      selectedRow: 0,
      elementSize: 20,
      pageNumber: 1,

      paginationOptions: customerData.pagination,

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
          width: '30px',
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
        phoneNumber: data.mobiPhone,
        birthDay: formatDateToLocale(data.dob),
        gender: getGenderLabel(data.genderId),
        status: this.resolveStatus(data.status),
        group: getCustomerTypeLabel(data.customerTypeId),
        date: formatDateToLocale(data.createdAt),
        feature: '',
      }))
    },
    customerPagination() {
      return this.CUSTOMER_PAGINATION_GETTER()
    },
  },

  watch: {
    pageNumber() {
      this.onPaginationChange()
    },
    elementSize() {
      this.onPaginationChange()
    },
  },

  mounted() {
    this.GET_CUSTOMERS_ACTION({})
  },

  methods: {
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
      CUSTOMER_PAGINATION_GETTER,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      EXPORT_CUSTOMERS_ACTION,
    ]),
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
    navigateToUpdate(id) {
      this.$router.push({
        name: 'sales-customers-update',
        params: {
          id,
        },
      })
    },
    onClickExcelExportButton() {
      this.EXPORT_CUSTOMERS_ACTION()
    },

    onPaginationChange() {
      const paginationData = {
        size: this.elementSize,
        page: this.pageNumber - 1,
      }

      this.GET_CUSTOMERS_ACTION(paginationData)
    },
  },
}
</script>
