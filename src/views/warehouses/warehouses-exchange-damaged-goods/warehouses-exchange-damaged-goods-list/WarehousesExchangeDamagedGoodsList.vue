<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <warehouses-exchange-damaged-goods-list-search
      @onSearchClick="onSearchClick"
    />
    <!-- END - Search -->

    <!-- START - Product Import list -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Title -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong
          for="listProduct"
          class="text-brand-1"
        >
          Danh sách phiếu đổi hàng hỏng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusCreateButton().show"
            :disabled="statusCreateButton().disabled"
            class="btn-brand-1 align-items-button-center h8"
            variant="someThing"
            @click="onClickAddNewButton"
          >
            <b-icon-plus
              scale="2"
              class="mr-50"
            />
            Thêm mới
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="exchangeDamagedGoods"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: searchData.size,
            setCurrentPage: pageNumber,
          }"
          :sort-options="{
            enabled: false,
            multipleColumns: false,
          }"
          compact-mode
          :total-rows="exchangeDamagedGoodsPagination.totalElements"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
        >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'manipulation'"
              hidden
            >
              <v-icon-manipulation />
            </div>
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
              v-if="props.column.field === 'manipulation' && isDisabledFeature"
              class="mx-0"
            >
              <v-icon-edit
                v-if="statusUpdateButton().show"
                :disabled="statusUpdateButton().disabled"
                class="ml-1"
                popover-position="top"
                @click="onClickUpdateButton(props.row.id)"
              />
              <v-icon-remove
                v-show="$formatISOtoVNI(props.row.transDate) === nowDate && statusDeleteButton().show"
                :disabled="statusDeleteButton().disabled"
                class="ml-1"
                @click="onClickDeleteButton(props.row.id, props.row.originalIndex)"
              />
            </b-row>
            <div
              v-else-if="props.column.field === 'index'"
            >
              {{ searchData.page === 0 || isNaN(searchData.page) ? props.index + 1 : searchData.page*searchData.size + (props.index + 1) }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

          <!-- START - Filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity'"
              v-show="exchangeDamagedGoodsPagination.totalElements"
              class="h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(getTotalValues.totalQuantity) }}
            </div>
            <div
              v-else-if="props.column.field === 'totalAmount'"
              v-show="exchangeDamagedGoodsPagination.totalElements"
              class="h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(getTotalValues.totalAmount) }}
            </div>
          </template>
          <!-- END - Filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="exchangeDamagedGoodsPagination.totalElements"
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
                  v-model="searchData.size"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="exchangeDamagedGoodsPagination.totalElements"
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
    <!-- END - Product Import list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      v-model="isDeleteModalShow"
      title="Thông báo"
    >
      Bạn có muốn xóa đơn đổi hàng hỏng?
      <template #modal-footer>
        <b-button
          @click="isDeleteModalShow = !isDeleteModalShow"
        >
          Hủy
        </b-button>
        <b-button
          class="btn-brand-1 align-items-button-center rounded"
          variant="someThing"
          @click="confirmDelete"
        >
          Xóa
        </b-button>
      </template>

    </b-modal>
    <!-- END - Product Modal Delete -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  code,
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
// Icons
import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import VIconRemove from '@/@core/components/v-icons/IconRemove.vue'
import VIconEdit from '@core/components/v-icons/IconEdit.vue'

import { nowDate } from '@/@core/utils/filter'
import WarehousesExchangeDamagedGoodsListSearch from './components/WarehousesExchangeDamagedGoodsListSearch.vue'
import {
  WAREHOUSES_EXCHANGE_DAMAGED_GOODS,
  // Getters
  EXCHANGE_DAMAGED_GOODS_GETTER,
  // Actions
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
  REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    WarehousesExchangeDamagedGoodsListSearch,
    VIconEdit,
    VIconManipulation,
    VIconRemove,
  },

  data() {
    return {
      // validation rules
      code,
      dateFormatVNI,

      isDeleteModalShow: false,
      isDisabledFeature: true,
      serverParams: {
        sort: {
          field: 'transDate',
          type: 'desc',
        },
      },
      nowDate: nowDate(),

      pageNumber: commonData.pageNumber,
      paginationOptions: commonData.perPageSizes,
      searchData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber - 1,
        sort: null,
      },

      decentralization: {
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      },

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
      columns: [
        {
          label: 'index',
          field: 'index',
          sortable: false,
        },
        {
          label: 'Ngày',
          field: 'transDate',
          sortable: true,
          thClass: 'text-left',
          tdClass: 'text-left',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Số biên bản',
          field: 'transCode',
          sortable: true,
          firstSortType: 'desc',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số tiền',
          field: 'totalAmount',
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Lý do',
          field: 'reason',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'manipulation',
          sortable: false,
          width: '100px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      exchangeDamagedGoods: [],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      EXCHANGE_DAMAGED_GOODS_GETTER,
    ]),
    getExchangeDamagedGoods() {
      if (this.EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.EXCHANGE_DAMAGED_GOODS_GETTER.response.content.map(data => ({
          id: data.id,
          transDate: data.transDate === '' ? '' : data.transDate,
          transCode: data.transCode,
          quantity: data.quantity,
          exchangeDamagedGoodsQuantity: data.quantity,
          totalAmount: data.totalAmount,
          exchangeDamagedGoodsPrice: data.totalAmount,
          reason: data.reason,
        }))
      }
      return []
    },
    getTotalValues() {
      if (this.EXCHANGE_DAMAGED_GOODS_GETTER.info) {
        return this.EXCHANGE_DAMAGED_GOODS_GETTER.info
      }
      return {}
    },

    exchangeDamagedGoodsPagination() {
      if (this.EXCHANGE_DAMAGED_GOODS_GETTER.response) {
        return this.EXCHANGE_DAMAGED_GOODS_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const { size } = this.searchData
      const { totalElements } = this.exchangeDamagedGoodsPagination

      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * size) - size + 1
      const maxPageSize = (size * this.pageNumber) > totalElements
        ? totalElements : (size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },

  watch: {
    getExchangeDamagedGoods() {
      this.exchangeDamagedGoods = [...this.getExchangeDamagedGoods]
    },
  },

  methods: {
    ...mapActions(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      GET_EXCHANGE_DAMAGED_GOODS_ACTION,
      REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),

    statusCreateButton() {
      return this.$permission('WarehousesExchangeDamagedGoods', 'WarehousesExchangeDamagedGoodsCreate')
    },
    statusUpdateButton() {
      return this.$permission('WarehousesExchangeDamagedGoods', 'WarehousesExchangeDamagedGoodsUpdate')
    },
    statusDeleteButton() {
      return this.$permission('WarehousesExchangeDamagedGoods', 'WarehousesExchangeDamagedGoodsDelete')
    },

    onClickAddNewButton() {
      this.$router.push({ name: 'warehouses-exchange-damaged-goods-create' })
    },
    onClickUpdateButton(id) {
      this.$router.push({
        name: 'warehouses-exchange-damaged-goods-update',
        params: {
          id,
        },
      })
    },

    removeExchangeDamagedGoods() {
      this.REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION(`${this.exchangeDamagedGoodsId}?${this.decentralization}`)
    },

    onClickDeleteButton(id, index) {
      this.exchangeDamagedGoodsId = id
      this.exchangeDamagedGoodsIndex = index
      this.isDeleteModalShow = !this.isDeleteModalShow
    },

    confirmDelete() {
      this.REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION(`${this.exchangeDamagedGoodsId}`)
      this.isDeleteModalShow = !this.isDeleteModalShow
      this.exchangeDamagedGoods.splice(this.exchangeDamagedGoodsIndex, 1)
      this.exchangeDamagedGoodsPagination.totalElements -= 1
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
      this.GET_EXCHANGE_DAMAGED_GOODS_ACTION({ ...this.searchData, ...params })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({ size: params.currentPerPage })
      this.onPaginationChange()
    },
    onSortChange(params) {
      params.forEach((item, index) => {
        if (item.type === 'none') {
          params.splice(index, 1)
        }
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
