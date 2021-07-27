<template>
  <b-modal
    ref="salesOnlineOrderModal"
    class="d-print-none"
    size="xl"
    title="Chọn đơn hàng Online"
    title-class="font-weight-bold text-brand-1"
    content-class="bg-light"
    hide-footer
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <b-form class="bg-white rounded shadow">
        <b-form-row
          class="v-search-form border-top mx-0 p-1"
          @keyup.enter="onClickSearchButton"
        >
          <b-col
            xl
            sm="6"
            class="h7"
          >
            <!-- START - Full Name -->
            <div
              class="mt-lg-1 mt-xl-0"
            >
              Số hóa đơn
            </div>
            <b-form-input
              id="form-input-sales"
              ref="focusInput"
              v-model="orderNumber"
              autofocus
              class="h9"
              size="sm"
              trim
            />
            <!-- END - Full Name -->
          </b-col>

          <!-- START - Status -->
          <b-col
            xl
            sm="6"
            class="h7"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Trạng thái
            </div>
            <tree-select
              v-model="synStatusSelected"
              :options="synStatusOptions"
              :searchable="false"
              placeholder="Tất cả"
              no-options-text="Không có dữ liệu"
            />
          </b-col>
          <!-- END - Status -->

          <!-- START - Date From -->
          <b-col
            xl
            sm="6"
            class="h7"
          >
            <div
              class="h7 mt-lg-1 mt-xl-0"
            >
              Từ ngày
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
            >
              <b-icon-x
                v-show="fromDate"
                style="position: absolute; right: 15px"
                class="cursor-pointer text-gray"
                scale="1.3"
                data-clear
              />
              <vue-flat-pickr
                v-model="fromDate"
                :config="configFromDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>

          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            sm="6"
            class="h7"
          >
            <div
              class="h7 mt-lg-1 mt-xl-0"
            >
              Đến ngày
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
            >
              <b-icon-x
                v-show="toDate"
                style="position: absolute; right: 15px"
                class="cursor-pointer text-gray"
                scale="1.3"
                data-clear
              />
              <vue-flat-pickr
                v-model="toDate"
                :config="configToDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>

          </b-col>
          <!-- END - Date To -->

          <b-col
            xl
            sm="6"
            md="12"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
              label-class="text-white"
            >
              <b-button
                id="form-button-search"
                class="shadow-brand-1 bg-brand-1 text-white h8 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
                variant="someThing"
                style="height: 30px;"
                @click="onClickSearchButton()"
              >
                <b-icon-search class="mr-50" />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>

        </b-form-row>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <div class="bg-white rounded shadow rounded mt-1">
        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="onlineOrders"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true,
              perPage: searchData.size,
              setCurrentPage: searchData.page + 1,
            }"
            :total-rows="getOnlineOrderPagination.totalElements"
            compact-mode
            line-numbers
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

            <!-- START - Columns -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.label === 'Chức năng'">
                <b-icon-bricks v-b-popover.hover="'Thao tác'" />
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
                <b-button
                  v-if="!Boolean(props.row.synStatus)"
                  class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
                  variant="someThing"
                  style="max-height: 30px;"
                  :disabled="isDisable"
                  @click="getOnlineOrderInfo(props.row.id)"
                >
                  <b-icon-hand-index-thumb
                    class="mr-1"
                    scale="1.3"
                  />
                  Chọn đơn
                </b-button>
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
                v-show="getOnlineOrderPagination.totalElements"
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
                    :options="perPageSizeOptions"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span class="text-nowrap">{{ paginationDetailContent }}</span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="getOnlineOrderPagination.totalElements"
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
        <b-col class="text-center mb-2">
          <b-button
            class="aligns-items-button-center ml-1"
            @click="onClickCloseButton()"
          >
            <b-icon-x
              class="mr-50"
              scale="1.5"
            />
            Đóng
          </b-button>
        </b-col>
      </div>
      <!-- END - Coupon list -->

    </b-container>
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  reverseVniDate,
  formatISOtoVNI,
  earlyMonth,
  nowDate,
} from '@core/utils/filter'
import saleData from '@/@db/sale'
import commonData from '@/@db/common'
import {
  SALES,
  // GETTERS
  ONLINE_ORDERS_GETTER,
  ONLINE_ORDERS_PAGINATION_GETTER,
  // ACTIONS
  GET_ONLINE_ORDERS_ACTION,
} from '../../store-module/type'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      // validation rules
      dateFormatVNI,
      fromDate: earlyMonth(),
      toDate: nowDate(),
      onlineOrders: [],

      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },
      searchOptions: {
        orderNumber: null,
        synStatus: null,
        fromDate: null,
        toDate: null,
      },
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
      isDisable: false,
      isCheckStatusSelected: true,
      isClicked: 0,

      // search
      synStatusSelected: saleData.synStatus[0].id,
      synStatusOptions: saleData.synStatus,
      orderNumber: null,
      discountCode: null,

      columns: [
        {
          label: 'Số hóa đơn',
          field: 'orderNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày đơn hàng',
          field: 'createdAt',
          sortable: false,
        },
        {
          label: 'Thông tin đơn hàng',
          field: 'orderInfo',
          sortable: false,
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          width: '155px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(SALES, [
      ONLINE_ORDERS_GETTER,
      ONLINE_ORDERS_PAGINATION_GETTER,
    ]),

    getOnlineOrders() {
      if (this.ONLINE_ORDERS_GETTER.content) {
        return this.ONLINE_ORDERS_GETTER.content.map(data => ({
          id: data.id,
          orderNumber: data.orderNumber,
          discountCode: data.discountCode,
          createdAt: `${formatISOtoVNI(data.createdAt, data.createdAt)}`,
          orderInfo: data.orderInfo,
          quantity: data.quantity,
          totalPrice: data.totalPrice,
          products: data.products,
          customer: data.customer,
          synStatus: data.synStatus,
          feature: '',
        }))
      }
      return []
    },
    getOnlineOrderPagination() {
      if (this.ONLINE_ORDERS_GETTER) {
        return this.ONLINE_ORDERS_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.getOnlineOrderPagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },
  watch: {
    getOnlineOrders() {
      this.onlineOrders = [...this.getOnlineOrders]
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },
  methods: {
    ...mapActions(SALES, [
      GET_ONLINE_ORDERS_ACTION,
    ]),
    onSearch() {
      this.searchOptions = {
        orderNumber: this.orderNumber?.trim(),
        synStatus: this.synStatusSelected,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
        ...this.searchData,
      }
      this.searchData = { ...this.searchData, ...this.searchOptions }
      this.GET_ONLINE_ORDERS_ACTION(this.searchOptions)
    },

    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },

    onPaginationChange() {
      this.GET_ONLINE_ORDERS_ACTION({ ...this.searchData })
    },

    onClickSearchButton() {
      this.searchOptions = {
        orderNumber: this.orderNumber?.trim(),
        synStatus: this.synStatusSelected,
        fromDate: this.fromDate ? reverseVniDate(this.fromDate) : reverseVniDate(this.toDate),
        toDate: this.toDate ? reverseVniDate(this.toDate) : reverseVniDate(this.fromDate),
        ...this.decentralization,
      }
      this.updateSearchData({
        ...this.searchOptions,
      })
      this.onPaginationChange()
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

    onClickCloseButton() {
      this.$refs.salesOnlineOrderModal.hide()
      this.fromDate = earlyMonth()
      this.toDate = nowDate()
      this.synStatusSelected = saleData.synStatus[0].id
      this.orderNumber = null
    },

    getOnlineOrderInfo(id) {
      this.onClickCloseButton()
      this.$emit('getOnlineOrderInfo', id)
    },
  },
}
</script>
