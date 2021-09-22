<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-inventory-list-search
      @onSearchClick="onSearchClick"
    />
    <!-- END - Search -->

    <!-- START - Warehouses Inventory List -->
    <div class="bg-white rounded shadow rounded my-1">
      <!-- START - Title -->
      <b-form-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong
          class="text-brand-1"
        >
          Danh sách đợt kiểm kê
        </strong>
        <b-button-group>
          <b-button
            v-if="statusCreateButton().show"
            :disabled="statusCreateButton().disabled"
            class="btn-brand-1 h8 align-items-button-center rounded"
            variant="someThing"
            @click="onClickCreateButton"
          >
            <b-icon-plus
              scale="2"
              class="mr-50"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1 style-table"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehouseInventories"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          :total-rows="warehouseInventoryPagination.totalElements"
          :sort-options="{
            enabled: true,
            multipleColumns: false,
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>

          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              hidden
            >
              <v-icon-manipulation />
            </b-row>
            <b-row v-else-if="props.column.field === 'index'" />
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Column -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
            >
              <v-icon-edit
                :disabled="statusUpdateButton().disabled"
                class="ml-1"
                popover-position="left"
                @click="onClickUpdateButton(props.row.id)"
              />
            </b-row>
            <div
              v-else-if="props.column.field === 'index'"
            >
              {{ paginationData.page === 0 || isNaN(paginationData.page) ? props.index + 1 : paginationData.page*paginationData.size + (props.index + 1) }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

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
                  Số hàng hiển thị
                </span>
                <b-form-select
                  v-model="paginationData.size"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehouseInventoryPagination.totalElements"
                :per-page="paginationData.size"
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
    <!-- END - Warehouses Inventory List -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import VIconEdit from '@core/components/v-icons/IconEdit.vue'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import { formatISOtoVNI } from '@core/utils/filter'
import WarehousesInventoryListSearch from './components/WarehousesInventoryListSearch.vue'
import {
  WAREHOUSEINVENTORY,
  // GETTERS
  WAREHOUSE_INVENTORIES_GETTER,
  // ACTIONS
  GET_WAREHOUSE_INVENTORIES_ACTION,
} from '../store-module/type'

export default {
  components: {
    WarehousesInventoryListSearch,
    VIconManipulation,
    VIconEdit,
  },

  data() {
    return {
      fromDate: formatISOtoVNI(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      toDate: formatISOtoVNI(new Date()),
      pageNumber: commonData.pageNumber,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber - 1,
        sort: null,
      },
      warehouseInventories: [],

      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      columns: [
        {
          label: 'index',
          field: 'index',
          sortable: false,
        },
        {
          label: 'Ngày',
          field: 'countingDate',
        },
        {
          label: 'Mã kiểm kê',
          field: 'stockCountingCode',
          sortable: false,
        },
        {
          label: 'Kho',
          field: 'wareHouseTypeName',
          sortable: false,
        },
        {
          label: 'Người tạo',
          field: 'createdBy',
          sortable: false,
        },
        {
          label: 'Chỉnh sửa lần cuối',
          field: 'updatedAt',
          sortable: false,
        },
        {
          label: 'Người chỉnh sửa',
          field: 'updatedBy',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          hidden: !this.statusUpdateButton().show,
          width: '30px',
          thClass: 'text-center',
          tdClass: 'text-center',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_INVENTORIES_GETTER,
    ]),
    getWarehouseInventories() {
      if (this.WAREHOUSE_INVENTORIES_GETTER.content) {
        return this.WAREHOUSE_INVENTORIES_GETTER.content.map(data => ({
          id: data.id,
          countingDate: formatISOtoVNI(data.countingDate),
          stockCountingCode: data.stockCountingCode,
          wareHouseTypeName: data.wareHouseTypeName,
          createdBy: data.createdBy,
          createdAt: formatISOtoVNI(data.createdAt),
          updatedBy: data.updatedBy,
          updatedAt: formatISOtoVNI(data.updatedAt),
        }))
      }
      return []
    },
    warehouseInventoryPagination() {
      if (this.WAREHOUSE_INVENTORIES_GETTER) {
        return this.WAREHOUSE_INVENTORIES_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.warehouseInventoryPagination.totalElements
        ? this.warehouseInventoryPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.warehouseInventoryPagination.totalElements} mục`
    },
  },

  watch: {
    getWarehouseInventories() {
      this.warehouseInventories = [...this.getWarehouseInventories]
    },
  },

  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(WAREHOUSEINVENTORY, [
      GET_WAREHOUSE_INVENTORIES_ACTION,
    ]),

    statusCreateButton() {
      return this.$permission('WarehousesInventory', 'WarehousesInventoryCreate')
    },
    statusUpdateButton() {
      return this.$permission('WarehousesInventory', 'WarehousesInventoryUpdate')
    },

    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-inventory-create' })
    },
    onClickUpdateButton(id) {
      this.$router.push({
        name: 'warehouses-inventory-update',
        params: {
          id,
        },
      })
    },
    updateSearchData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onSearchClick(event) {
      this.updateSearchData({
        ...event,
      })
      this.onPaginationChange()
    },
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      this.GET_WAREHOUSE_INVENTORIES_ACTION({ ...this.paginationData, ...params })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
      })
      this.onPaginationChange()
    },
    onSortChange(params) {
      params.forEach((item, index) => {
        if (item.type === 'none') {
          params.splice(index, 1)
        }
        /* eslint-disable no-param-reassign */
        if (item.field === 'wareHouseTypeName') {
          item.field = 'w.wareHouseTypeName'
        }
        /* eslint-enable no-param-reassign */
      })
      if (params.length === 1) {
        this.updateSearchData({
          sort: `${params[0].field},${params[0].type}`,
        })
      } else {
        this.updateSearchData({
          sort: null,
        })
      }
      if (params.length >= 2) {
        this.updateSearchData({
          sort: [...params],
        })
      }
      this.onPaginationChange()
    },
  },

}
</script>
<style>
  .style-table .vgt-responsive {
    overflow-x: hidden !important;
  }
</style>
