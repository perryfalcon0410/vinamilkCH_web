<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <sales-customers-list-search
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <b-form class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách khách hàng
        </strong>
        <b-button-group>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded"
            variant="someThing"
            @click="navigateToCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-05"
            />
            Thêm mới
          </b-button>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="customers"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="customerPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'nameText', type: 'desc'}]
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
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
              v-show="customerPagination.totalElements"
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
                  Số hàng hiển thị
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
                >{{ pageNumber === 1 ? 1 : (pageNumber * elementSize) - elementSize +1 }}
                  -
                  {{ (elementSize * pageNumber) > customerPagination.totalElements ?
                    customerPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ customerPagination.totalElements }} mục </span>
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
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  getGenderLabel,
  getCustomerTypeLabel,
  getCustomerStatusLabel,
  resizeAbleTable,
} from '@core/utils/utils'
import { formatDateToLocale } from '@core/utils/filter'

import SalesCustomersListSearch from './components/SalesCustomersListSearch.vue'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMERS_GETTER,
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
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },

      customers: [],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          firstSortType: 'desc',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          type: 'date',
          dateInputFormat: 'dd/MM/yyyy',
          dateOutputFormat: 'dd/MM/yyyy',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          thClass: 'text-left',
          tdClass: 'text-left',
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
          nameText: data.nameText,
          mobiPhone: data.mobiPhone,
          dob: formatDateToLocale(data.dob),
          genderId: getGenderLabel(data.genderId),
          status: getCustomerStatusLabel(data.status),
          customerTypeId: getCustomerTypeLabel(data.customerTypeId),
          createdAt: formatDateToLocale(data.createdAt),
          feature: '',
        }))
      }
      return []
    },
    customerPagination() {
      if (this.CUSTOMERS_GETTER) {
        return this.CUSTOMERS_GETTER
      }
      return {}
    },
  },

  watch: {
    getCustomers() {
      this.customers = [...this.getCustomers]
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
      this.EXPORT_CUSTOMERS_ACTION()
    },
    onPaginationChange() {
      this.GET_CUSTOMERS_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    // onSortChange(params) {
    //   this.updatePaginationData({
    //     sort: `${params.field},${params.sortType}`,
    //   })
    //   this.onPaginationChange()
    // },
  },
}
</script>
