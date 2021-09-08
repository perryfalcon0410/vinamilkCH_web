<template>
  <b-modal
    ref="salesSearchModal"
    size="xl"
    class="d-print-none"
    title="Tìm kiếm khách hàng"
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
          @keyup.enter="onClickSearchButton()"
        >
          <b-col
            xl
            sm="6"
            class="h7"
          >
            <!-- START - Full Name -->
            <b-col
              xl
              lg="3"
              sm="4"
              class="h7"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Khách hàng
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  ref="focusInput"
                  v-model="searchKeywords"
                  placeholder="Nhập mã/ họ tên"
                  @input="getSearchOption"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="searchKeywords"
                    class="cursor-pointer text-gray"
                    @click="searchKeywords = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - Full Name -->
          </b-col>
          <b-col
            xl
            lg="3"
            sm="4"
            class="h7"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Số điện thoại
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="phoneNumber"
                autocomplete="on"
                maxlength="10"
                @keypress="$onlyNumberInput"
                @input="getSearchOption"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="phoneNumber"
                  class="cursor-pointer text-gray"
                  @click="phoneNumber = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            xl
            lg="3"
            sm="4"
            class="h7"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              CMND
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model="idNo"
                @input="getSearchOption"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="idNo"
                  class="cursor-pointer text-gray"
                  @click="idNo = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <!-- START - Search button -->
          <div
            class="mt-auto mx-35"
          >
            <b-button
              id="btnSearch"
              class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
              variant="someThing"
              @click="onClickSearchButton()"
            >
              <b-icon-search class="mr-50" />
              Tìm kiếm
            </b-button>
          </div>
          <!-- END - Search button -->

        </b-form-row>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <div class="bg-white rounded shadow rounded mt-1">
        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="customers"
            mode="remote"
            style-class="vgt-table"
            :pagination-options="{
              enabled: true,
              perPage: searchData.size,
              setCurrentPage: searchData.page + 1,
            }"
            compact-mode
            line-numbers
            :total-rows="customerPagination.totalElements"
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
                  class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
                  variant="someThing"
                  style="max-height: 30px;"
                  @click="getCustomerInfo(props.row)"
                >
                  <b-icon-hand-index-thumb
                    class="mr-1"
                    scale="1.3"
                  />
                  CHỌN
                </b-button>
              </div>
              <div
                v-else-if="props.column.field ==='address'"
                class="name-width word-wrap"
              >
                {{ props.formattedRow[props.column.field] }}
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
                  :total-rows="(orderOnline.onlineOrderId !== null && onlineOrderCustomers.length > 1) ? onlineOrderCustomers.length : customerPagination.totalElements"
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
        <!-- END - Coupon list -->
      </div>
    </b-container>
  </b-modal>
</template>

<script>
import commonData from '@/@db/common'
import customerData from '@/@db/customer'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMERS_GETTER,
  CUSTOMER_BY_ID_GETTER,
  // ACTIONS
  GET_CUSTOMER_BY_ID_ACTION,
  GET_CUSTOMERS_ACTION,
} from '../../../sales-customers/store-module/type'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    onlineOrderCustomers: {
      type: Array,
      default: () => [],
    },
    orderOnline: {
      type: Object,
      default: () => {},
    },
    openPopup: {
      type: Boolean,
      default: false,
    },
    orderCurrentId: {
      type: Number,
      default: Number,
    },
  },
  data() {
    return {
      selectedRow: 0,
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      // search
      searchKeywords: '',
      phoneNumber: '',
      idNo: '',
      customerTypeId: '',
      shopId: '',
      scoreCumulated: '',
      searchOption: {
        searchKeywords: null,
        phoneNumber: null,
        idNo: null,
        status: null,
      },
      customers: [],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'code',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên khách hàng',
          field: 'fullName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
        },
        {
          label: 'Số điện thoại',
          field: 'phoneNumber',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'birthDay',
          sortable: false,
        },
        {
          label: 'Số CMND',
          field: 'idNo',
          sortable: false,
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          width: '30px',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      autofocus: true, // check auto focus input
    }
  },
  computed: {
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
      CUSTOMER_BY_ID_GETTER,
    ]),
    getCustomers() {
      if (this.CUSTOMERS_GETTER.content) {
        return this.CUSTOMERS_GETTER.content.map(data => ({
          id: data.id,
          shopId: data.shopId,
          code: data.customerCode,
          fullName: `${data.lastName} ${data.firstName}`,
          phoneNumber: data.mobiPhone,
          birthDay: formatDateToLocale(data.dob),
          date: formatDateToLocale(data.createdAt),
          address: data.address,
          idNo: data.idNo,
          feature: '',
          totalBill: data.totalBill,
          customerTypeId: data.customerTypeId,
          scoreCumulated: data.scoreCumulated,
        }))
      }
      return []
    },
    customerInfo() {
      return this.CUSTOMER_BY_ID_GETTER()
    },
    customerOnlinePagination() {
      return this.customers.length
    },
    customerPagination() {
      return this.CUSTOMERS_GETTER
    },
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.customerPagination
      const totalOnlineElements = this.customerOnlinePagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      const maxOnlinePageSize = (size * (page + 1)) > totalOnlineElements
        ? totalOnlineElements : (size * (page + 1))
      const maxPages = (this.orderOnline.onlineOrderId !== null && this.onlineOrderCustomers.length > 1) ? maxOnlinePageSize : maxPageSize
      const totals = (this.orderOnline.onlineOrderId !== null && this.onlineOrderCustomers.length > 1) ? totalOnlineElements : totalElements

      return `${minPageSize} - ${maxPages} của ${totals} mục`
    },
  },
  watch: {
    getCustomers() {
      this.customers = [...this.getCustomers]
      if (this.$refs.focusInput && this.autofocus) {
        this.$refs.focusInput.focus()
        this.autofocus = false
      }
    },
    onlineOrderCustomers() {
      if (this.orderOnline.onlineOrderId !== null && this.onlineOrderCustomers.length > 1) {
        this.customers = [...this.onlineOrderCustomers]
      }
    },
    openPopup: {
      handler() {
        this.onSearch()
      },
      deep: true,
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_CUSTOMER_BY_ID_ACTION,
    ]),

    // func pagination
    onSearch() {
      this.searchOption = {
        searchKeywords: this.searchKeywords?.trim(),
        phoneNumber: this.phoneNumber,
        idNo: this.idNo?.trim(),
        status: customerData.status[0].id,
        ...this.decentralization,
        ...this.searchData,
      }
      this.searchData = { ...this.searchData, ...this.searchOption }
      this.GET_CUSTOMERS_ACTION(this.searchOption)
    },
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },

    onClickSearchButton() {
      this.searchOption = {
        searchKeywords: this.searchKeywords?.trim(),
        phoneNumber: this.phoneNumber,
        idNo: this.idNo?.trim(),
        status: customerData.status[0].id,
      }
      this.updateSearchData({
        ...this.searchOption,
      })
      this.onPaginationChange()
    },
    onPaginationChange() {
      this.GET_CUSTOMERS_ACTION({ ...this.searchData })
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
    // func pagination

    onClickCloseButton() {
      this.$refs.salesSearchModal.hide()
      this.autofocus = true
    },

    getCustomerInfo(obj) {
      this.onClickCloseButton()
      this.$emit('getCustomerInfo', {
        data: obj,
      })
    },

    getSearchOption() {
      this.$emit('getSearchOption', {
        searchKeywords: this.searchKeywords,
        phoneNumber: this.phoneNumber,
        idNo: this.idNo,
      })
    },
  },
}
</script>
