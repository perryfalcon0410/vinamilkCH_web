<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <warehouses-exchange-damaged-goods-list-search
      @updateSearchData="paginationData = {
        ...paginationData,
        ...$event }"
    />
    <!-- END - Search -->

    <!-- START - Product Import list -->
    <b-form class="bg-white rounded shadow my-1">
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

        <b-button
          class="btn-brand-1 h9 align-items-button-center rounded"
          variant="someThing"
          @click="onClickAddNewButton"
        >
          <b-icon-plus
            scale="2"
            class="mr-50"
          />
          Thêm mới
        </b-button>
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
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="exchangeDamagedGoodsPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
            initialSortBy: [{field: 'minutesCode', type: 'desc'}]
          }"
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
              v-if="props.column.field === 'feature'"
              hidden
            >
              <b-icon-bricks
                v-b-popover.hover="'Thao tác'"
                class="cursor-pointer"
                scale="1.3"
                @click="onClickFeature()"
              />
            </div>
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
              v-if="props.column.field === 'feature' && isDisabledFeature"
              class="mx-0"
              align-h="around"
            >
              <b-icon-pencil-fill
                v-b-popover.hover.top="'Chỉnh sửa'"
                class="cursor-pointer"
                @click="onClickUpdateButton(props.row.id)"
              />

              <b-icon-trash-fill
                v-b-popover.hover.top="'Xóa'"
                class="cursor-pointer"
                color="red"
                scale="1.2"
                @click="onClickDeleteButton(props.row.id, props.row.originalIndex)"
              />
            </b-row>
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
            <b-row
              v-show="exchangeDamagedGoodsPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalQuantity) }}
            </b-row>
            <b-row
              v-show="exchangeDamagedGoodsPagination.totalElements"
              v-else-if="props.column.field === 'price'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(getTotalValues.totalAmount) }}
            </b-row>
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
                  {{ (elementSize * pageNumber) > exchangeDamagedGoodsPagination.totalElements ?
                    exchangeDamagedGoodsPagination.totalElements : (elementSize * pageNumber) }}
                  của {{ exchangeDamagedGoodsPagination.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="exchangeDamagedGoodsPagination.totalElements"
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
          class="btn-brand-1 h9 align-items-button-center rounded"
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
import { formatISOtoVNI } from '@/@core/utils/filter'
// import toasts from '@core/utils/toasts/toasts'

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
  },
  data() {
    return {
      // validation rules
      code,
      dateFormatVNI,

      isDeleteModalShow: false,
      isDisabledFeature: true,

      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
        reasonId: this.reasonSelected,
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
          label: 'Ngày',
          field: 'date',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số biên bản',
          field: 'minutesCode',
          firstSortType: 'desc',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Số tiền',
          field: 'price',
          formatFn: this.$formatNumberToLocale,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Lý do',
          field: 'reason',
          thClass: 'text-center',
          tdClass: 'text-left',
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
          width: '100px',
          thClass: 'text-center',
          tdClass: 'text-center',
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
          date: data.transDate === '' ? '' : formatISOtoVNI(data.transDate),
          minutesCode: data.transCode,
          quantity: data.quantity,
          exchangeDamagedGoodsQuantity: data.quantity,
          price: data.totalAmount,
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
  },
  watch: {
    getExchangeDamagedGoods() {
      this.exchangeDamagedGoods = [...this.getExchangeDamagedGoods]
    },
  },
  mounted() {
    this.GET_EXCHANGE_DAMAGED_GOODS_ACTION({
      ...this.decentralization,
    })
  },

  methods: {
    ...mapActions(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      GET_EXCHANGE_DAMAGED_GOODS_ACTION,
      REMOVE_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),
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

    onClickFeature() {
      this.isDisabledFeature = !this.isDisabledFeature
    },
    onPaginationChange() {
      this.GET_EXCHANGE_DAMAGED_GOODS_ACTION(this.paginationData)
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
  },
}
</script>
