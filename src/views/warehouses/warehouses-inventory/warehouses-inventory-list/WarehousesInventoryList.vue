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
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehouseInventoryPagination.totalElements"
          :sort-options="{
            enabled: true,
            multipleColumns: true,
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
                  v-model="elementSize"
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
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
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
          label: 'Ngày',
          field: 'countingDate',
        },
        {
          label: 'Mã kiểm kê',
          field: 'stockCountingCode',
        },
        {
          label: 'Kho',
          field: 'wareHouseTypeName',
        },
        {
          label: 'Người tạo',
          field: 'createdBy',
        },
        {
          label: 'Chỉnh sửa lần cuối',
          field: 'updatedAt',
        },
        {
          label: 'Người chỉnh sửa',
          field: 'updatedBy',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          hidden: !this.statusUpdateButton().show,
          width: '30px',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.warehouseInventoryPagination.totalElements
        ? this.warehouseInventoryPagination.totalElements : (this.elementSize * this.pageNumber)

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
      this.searchData = { ...this.searchData, ...newProps }
    },
    onSearchClick(event) {
      this.updateSearchData({
        ...event,
      })
      this.onPaginationChange()
    },
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      this.GET_WAREHOUSE_INVENTORIES_ACTION({ ...this.searchData, ...params })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange({ page: params.currentPage }, { page: params.currentPage - 1 })
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange({ size: params.currentPerPage })
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
