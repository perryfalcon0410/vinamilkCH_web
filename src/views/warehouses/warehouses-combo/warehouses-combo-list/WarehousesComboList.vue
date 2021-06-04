<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <warehouses-comboList-search
      @onClickSearchButton="onClickSearchButton"
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
              class="mr-50"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehousesCombos"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesComboPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
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
                class="cursor-pointer"
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
              <b-icon-eye-fill
                v-b-popover.hover="'Xem chi tiết'"
                class="text-brand-1 cursor-pointer"
                @click="navigateToDetail(props.row.id)"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'quantity'"
              class="h7 text-right"
              align-h="end"
            >
              {{ totalQuantity || null }}
            </b-row>
            <b-row
              v-else-if="props.column.field === 'price'"
              class="h7"
              align-h="end"
            >
              {{ totalPrice || null }}
            </b-row>
          </template>
          <!-- START - Column filter -->

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
                >
                  {{ paginationDetailContent }}
                </span>
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
import {
  getWarehousesStatuslabel,
  resizeAbleTable,
} from '@core/utils/utils'
import WarehousesComboListSearch from './components/WarehousesComboListSearch.vue'
import {
  WAREHOUSES_COMBO,

  // GETTERS
  WAREHOUSES_COMBO_GETTER,

  // ACTIONS
  GET_WAREHOUSES_COMBO_ACTIONS,

} from '../store-module/type'

export default {
  components: {
    WarehousesComboListSearch,
  },
  data() {
    return {
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      isCheckAllRows: false,
      selectedColumnName: [],
      warehousesCombos: [],
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
          sortable: false,
          filterOptions: {
            enabled: true,
          },
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
    ...mapGetters(WAREHOUSES_COMBO, [
      WAREHOUSES_COMBO_GETTER,
    ]),
    getWarehousesCombo() {
      if (this.WAREHOUSES_COMBO_GETTER.response && this.WAREHOUSES_COMBO_GETTER.response.content) {
        return this.WAREHOUSES_COMBO_GETTER.response.content.map(data => ({
          transDate: this.$formatISOtoVNI(data.transDate),
          transCode: data.transCode,
          quantity: this.$formatNumberToLocale(data.totalQuantity),
          price: this.$formatNumberToLocale(data.totalAmount),
          transType: getWarehousesStatuslabel(String(data.transType)),
          feature: '',
          id: data.id,
        }))
      }
      return []
    },

    totalQuantity() {
      if (this.WAREHOUSES_COMBO_GETTER.info && this.WAREHOUSES_COMBO_GETTER.info.totalQuantity) {
        return this.$formatNumberToLocale(this.WAREHOUSES_COMBO_GETTER.info.totalQuantity)
      }
      return 0
    },
    totalPrice() {
      if (this.WAREHOUSES_COMBO_GETTER.info && this.WAREHOUSES_COMBO_GETTER.info.totalPrice) {
        return this.$formatNumberToLocale(this.WAREHOUSES_COMBO_GETTER.info.totalPrice)
      }
      return 0
    },

    warehousesComboPagination() {
      if (this.WAREHOUSES_COMBO_GETTER.response) {
        return this.WAREHOUSES_COMBO_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.warehousesComboPagination.totalElements
        ? this.warehousesComboPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.warehousesComboPagination.totalElements} mục`
    },
  },

  watch: {
    getWarehousesCombo() {
      this.warehousesCombos = [...this.getWarehousesCombo]
    },
  },
  mounted() {
    resizeAbleTable()
  },

  methods: {
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSES_COMBO_ACTIONS,
    ]),
    onPaginationChange() {
      this.GET_WAREHOUSES_COMBO_ACTIONS(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onClickSearchButton() {
      this.pageNumber = 1
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    navigateToCreate() {
      this.$router.push({ name: 'warehouses-combo-create' })
    },
    navigateToDetail(id) {
      this.$router.push({
        name: 'warehouses-combo-detail',
        params: {
          id,
        },
      })
    },
  },
}
</script>
