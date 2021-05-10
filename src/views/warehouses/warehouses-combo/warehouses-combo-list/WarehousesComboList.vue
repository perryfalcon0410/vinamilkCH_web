<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-comboList-search />
    <!-- END - Search -->

    <!-- START - Customer list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách giao dịch nhập xuất combo
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="navigateToCreate"
          >
            <b-icon-plus
              scale="2"
              class="mr-05"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="warehousesComboLists"
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
                v-b-popover.hover="'Chi tiết'"
                class="cursor-pointer"
                @click="navigateToUpdate()"
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
              v-show="warehousesComboPagination.totalElements"
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
                > trong {{ warehousesComboPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehousesComboPagination.totalElements"
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

          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="h7"
              align-h="center"
            >
              {{ totalQuantity }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'price'"
              class="h7"
              align-h="end"
            >
              {{ totalPrice }}
            </b-row>
          </template>
          <!-- START - Column filter -->

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
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale, formatNumberToLocale } from '@core/utils/filter'
import { getWarehousesStatuslabel } from '@core/utils/utils'
import WarehousesComboListSearch from './components/WarehousesComboListSearch.vue'
import {
  WAREHOUSES_COMBO,

  // GETTERS
  WAREHOUSES_COMBO_GETTER,
  WAREHOUSES_COMBO_PAGINATION_GETTER,
  WAREHOUSES_COMBO_TOTAL_INFO_GETTER,

  // ACTIONS
  GET_WAREHOUSES_COMBO_ACTIONS,

} from '../store-module/type'

export default {
  components: {
    WarehousesComboListSearch,
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,

      columns: [
        {
          label: 'Ngày',
          field: 'transDate',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã giao dịch',
          field: 'transCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Loại giao dịch',
          field: 'transType',
          sortable: false,
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
    warehousesComboLists() {
      return this.WAREHOUSES_COMBO_GETTER().map(data => ({
        transDate: formatDateToLocale(data.transDate),
        transCode: data.transCode,
        quantity: formatNumberToLocale(Number(data.totalQuantity)),
        price: formatNumberToLocale(Number(data.totalAmount)),
        transType: getWarehousesStatuslabel(data.transType),
        feature: '',
      }))
    },

    totalQuantity() {
      return formatNumberToLocale(Number(this.WAREHOUSES_COMBO_TOTAL_INFO_GETTER().totalQuantity))
    },
    totalPrice() {
      return formatNumberToLocale(Number(this.WAREHOUSES_COMBO_TOTAL_INFO_GETTER().totalPrice))
    },

    warehousesComboPagination() {
      return this.WAREHOUSES_COMBO_PAGINATION_GETTER()
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
    this.GET_WAREHOUSES_COMBO_ACTIONS({ formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapGetters(WAREHOUSES_COMBO, [
      WAREHOUSES_COMBO_GETTER,
      WAREHOUSES_COMBO_PAGINATION_GETTER,
      WAREHOUSES_COMBO_TOTAL_INFO_GETTER,
    ]),
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSES_COMBO_ACTIONS,
    ]),
    onPaginationChange() {
      const paginationData = {
        sie: this.elementSize,
        page: this.pageNumber - 1,
      }

      this.GET_WAREHOUSES_COMBO_ACTIONS(paginationData)
    },
  },
}
</script>
