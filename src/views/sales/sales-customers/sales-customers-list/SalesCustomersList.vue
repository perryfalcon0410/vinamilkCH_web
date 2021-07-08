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
            :disabled="customersData.length > 0 ? false : true"
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
            <div v-if="props.column.field === 'manipulation'">
              <v-icon-manipulation />
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
            <div v-if="props.column.field === 'manipulation'">
              <v-icon-edit
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
                v-model="searchData.page"
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

import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import VIconEdit from '@core/components/v-icons/IconEdit.vue'
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
    VIconManipulation,
    VIconEdit,
  },
  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber,
        totalElements: 0, // default unknown value
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
          formatFn: this.$store.getters[`${CUSTOMER}/${CUSTOMER_TYPES_LABEL_GETTER}`],
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
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
    getCustomerPagination() {
      const paginationData = { ...this.CUSTOMERS_GETTER }
      if (paginationData) {
        return {
          totalElements: paginationData.totalElements,
        }
      }
      return { totalElements: 0 }
    },
    paginationDetailContent() {
      const { size, page, totalElements } = this.searchData
      const minPageSize = page === 0 ? 1 : (page * size) - size + 1
      const maxPageSize = (size * page) > totalElements
        ? totalElements : (size * page)
      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },

  watch: {
    getCustomers() {
      this.customersData = [...this.getCustomers]
    },
    getCustomerPagination() {
      this.updateSearchData({ ...this.getCustomerPagination })
    },
  },

  mounted() {
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
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      this.GET_CUSTOMERS_ACTION({ ...this.searchData, ...this.decentralization, ...params })
    },
    onSearchClick(event) {
      this.onPaginationChange(
        { page: commonData.pageNumber, ...event },
        { page: commonData.pageNumber - 1 },
      )
    },
    onPageChange(params) {
      this.onPaginationChange({ page: params.currentPage }, { page: params.currentPage - 1 })
    },
    onPerPageChange(params) {
      this.onPaginationChange({ size: params.currentPerPage })
    },
    onSortChange(params) {
      this.onPaginationChange({ sort: `${params[0].field},${params[0].type}` })
    },
    // END - Vue Good Table func

  },
}
</script>
