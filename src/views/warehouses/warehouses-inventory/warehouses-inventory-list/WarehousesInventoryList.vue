<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <warehouses-inventory-list-search />
    <!-- END - Search -->

    <!-- START - Warehouses Inventory List -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <strong
          class="text-brand-1"
        >
          Danh sách đợt kiểm kê
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
            size="sm"
            @click="onClickCreateButton"
          >
            <b-icon-plus />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="warehouseInventories"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
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
            >
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
              />
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
              <b-icon-pencil-fill
                v-b-popover.hover.top="'Chỉnh sửa'"
                class="cursor-pointer"
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
                > trong {{ warehouseInventoryPagination.totalElements }} mục </span>
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

    </b-form>
    <!-- END - Warehouses Inventory List -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale, reverseVniDate } from '@core/utils/filter'
import WarehousesInventoryListSearch from './components/WarehousesInventoryListSearch.vue'
import { // Sua lai
  WAREHOUSEINVENTORY,
  // GETTERS
  WAREHOUSE_INVENTORIES_GETTER,
  WAREHOUSE_INVENTORY_PAGINATION_GETTER,
  // ACTIONS
  GET_WAREHOUSE_INVENTORIES_ACTION,
} from '../store-module/type'

export default {
  components: {
    WarehousesInventoryListSearch,
  },
  data() {
    return {
      fromDate: formatDateToLocale(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      toDate: formatDateToLocale(new Date()),
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,

      columns: [
        {
          label: 'Ngày',
          field: 'countingDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã kiểm kê',
          field: 'stockCountingCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Kho',
          field: 'warehouseType',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Người tạo',
          field: 'createUser',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Chỉnh sửa lần cuối',
          field: 'updateDate',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Người chỉnh sửa',
          field: 'updateUser',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },

  computed: {
    warehouseInventories() {
      return this.WAREHOUSE_INVENTORIES_GETTER().map(data => ({
        id: data.id,
        countingDate: formatDateToLocale(data.countingDate),
        stockCountingCode: data.stockCountingCode,
        warehouseType: data.wareHouseTypeId,
        createUser: data.createUser,
        createDate: formatDateToLocale(data.createdAt),
        updateUser: data.createUser,
        updateDate: formatDateToLocale(data.updatedAt),
      }))
    },
    warehouseInventoryPagination() {
      return this.WAREHOUSE_INVENTORY_PAGINATION_GETTER()
    },
  },

  mounted() {
    this.GET_WAREHOUSE_INVENTORIES_ACTION({
      fromDate: reverseVniDate(this.fromDate),
      toDate: reverseVniDate(this.toDate),
      formId: 5,
      ctrlId: 7,
    })
  },

  methods: {
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_INVENTORIES_GETTER,
      WAREHOUSE_INVENTORY_PAGINATION_GETTER,
    ]),
    ...mapActions(WAREHOUSEINVENTORY, [
      GET_WAREHOUSE_INVENTORIES_ACTION,
    ]),

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
  },
}
</script>
