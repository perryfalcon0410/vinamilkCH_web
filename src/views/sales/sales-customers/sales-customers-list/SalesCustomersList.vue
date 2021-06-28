<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <sales-customers-list-search
      @onSearchClick="onSearchClick"
    />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
        align-h="between"
      >
        <strong class="text-brand-1">
          Danh sách khách hàng
        </strong>
        <b-button-group>
          <b-button
            class="btn-brand-1 h8 align-items-button-center rounded"
            variant="someThing"
            @click="navigateToCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-50"
            />
            Thêm mới
          </b-button>
          <b-button
            class="btn-brand-1 h8 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-50" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="customersData"
          :total-rows="getCustomerPagination.totalElements"
          mode="remote"
          compact-mode
          line-numbers
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: searchData.size,
            setCurrentPage: searchData.page + 1,
          }"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-per-page-change="onPerPageChange"
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
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                scale="1.3"
              />
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
                v-b-popover.hover="'Chỉnh sửa'"
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
              v-show="getCustomerPagination.totalElements"
              class="v-pagination px-1 mx-0 d-print-none"
              align-h="between"
              align-v="center"
            >
              <div
                class="d-flex align-items-center"
              >
                <span
                  class="text-nowrap"
                >
                  Số hàng hiển thị
                </span>
                <b-form-select
                  v-model="searchData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="getCustomerPagination.totalElements"
                :per-page="searchData.size"
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
    </div>
    <!-- END - Customer list -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  getGenderLabel,
  getCustomerStatusLabel,
  resizeAbleTable,
} from '@core/utils/utils'

import SalesCustomersListSearch from './components/SalesCustomersListSearch.vue'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_TYPES_LABEL_GETTER,
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
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      customersData: [
        {
          id: 0,
          customerCode: 'CUS.SHOP1.00001',
          nameText: 'last name + first name',
          mobiPhone: '0334642543',
          dob: '2006-06-15T00:00:00.000',
          genderId: 0,
          status: 0,
          customerTypeId: 0,
          createdAt: '2021-06-17T10:11:29.533',
        },
      ],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          width: '130px',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          width: '200px',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          formatFn: getGenderLabel,
        },
        {
          label: 'Trạng thái',
          field: 'status',
          formatFn: getCustomerStatusLabel,
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          formatFn: value => this.$store.getters[`${CUSTOMER}/${CUSTOMER_TYPES_LABEL_GETTER}`](value),
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
          width: '30px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
    ]),
    getCustomers() {
      if (this.CUSTOMERS_GETTER.content) {
        return this.CUSTOMERS_GETTER.content.map(data => ({
          id: data.id,
          customerCode: data.customerCode,
          nameText: `${data.lastName} ${data.firstName}`,
          mobiPhone: data.mobiPhone,
          dob: data.dob,
          genderId: data.genderId,
          status: data.status,
          customerTypeId: data.customerTypeId,
          createdAt: data.createdAt,
        }))
      }
      return []
    },
    getCustomerPagination() { // TODO: sửa chỗ này
      if (this.CUSTOMERS_GETTER) {
        // const customersData = { ...this.CUSTOMERS_GETTER }
        // console.log(customersData)
        // return {
        //   ...customersData,
        //   size: customersData.size,
        //   page: customersData.number,
        //   totalElements: customersData.totalElements,
        // }
        return this.CUSTOMERS_GETTER
      }
      return null
    },
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.getCustomerPagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },

  watch: {
    getCustomers() {
      this.customersData = [...this.getCustomers]
    },
    // getCustomerPagination() {  // TODO: sửa chỗ này
    //   this.searchData = [...this.getCustomerPagination]
    // },
  },

  mounted() {
    // console.log('permission', this.$permission('WarehousesInputCreate'))

    resizeAbleTable()
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      EXPORT_CUSTOMERS_ACTION,
    ]),

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
      this.EXPORT_CUSTOMERS_ACTION({ ...this.searchData, ...this.decentralization })
    },

    // START - Vue Good Table func
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },
    onSearchClick(event) {
      this.updateSearchData({
        // page: commonData.pageNumber - 1,
        ...event,
      })
      this.onPaginationChange()
      // this.pageNumber = commonData.pageNumber
    },
    onPaginationChange() {
      this.GET_CUSTOMERS_ACTION({ ...this.searchData, ...this.decentralization })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange()
    },
    onSortChange(params) {
      this.updateSearchData({
        sort: `${params[0].field},${params[0].type}`,
      })
      this.onPaginationChange()
    },
    // END - Vue Good Table func

  },
}
</script>
