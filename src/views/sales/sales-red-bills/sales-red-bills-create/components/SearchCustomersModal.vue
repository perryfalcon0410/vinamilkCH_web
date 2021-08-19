<template>
  <b-modal
    ref="SearchCustomersModal"
    :visible="visible"
    size="xl"
    class="d-print-none"
    title="Tìm kiếm khách hàng"
    title-class="font-weight-bold text-brand-1"
    content-class="bg-light"
    hide-footer
    @hidden="cancel()"
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <b-form>
        <v-card-actions
          class="bg-white rounded shadow "
          title="Tìm kiếm"
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
                  v-model.trim="searchKeywords"
                  autofocus
                  placeholder="Nhập mã/ họ tên"
                  @keyup.enter="onClickSearchButton"
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
                @keyup.enter="onClickSearchButton"
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
              Tên đơn vị
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="workingOffice"
                @keyup.enter="onClickSearchButton"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="workingOffice"
                  class="cursor-pointer text-gray"
                  @click="workingOffice = null"
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
              Mã số thuế
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="taxCode"
                @keyup.enter="onClickSearchButton"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="taxCode"
                  class="cursor-pointer text-gray"
                  @click="taxCode = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
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
                Địa chỉ cơ quan
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model.trim="officeAddress"
                  @keyup.enter="onClickSearchButton"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="officeAddress"
                    class="cursor-pointer text-gray"
                    @click="officeAddress = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - Full Name -->
          </b-col>

          <!-- START - Search button -->
          <div
            class="mt-2 mx-40"
          >
            <b-button
              class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
              variant="someThing"
              :disabled="invalid"
              @click="onClickSearchButton()"
            >
              <b-icon-search class="mr-50" />
              Tìm kiếm
            </b-button>
          </div>
          <!-- END - Search button -->
          <!-- </b-form-row> -->
        </v-card-actions>
      <!-- END - Search -->
      </b-form>

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
                v-else-if="props.column.field ==='workingOffice' || props.column.field ==='officeAddress'"
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
                  :total-rows="customerPagination.totalElements"
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
            @click="cancel()"
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
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  RED_INVOICE,
  CUSTOMERS_TO_RED_INVOICE_GETTER,
  GET_CUSTOMERS_TO_RED_INVOICE_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
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
      workingOffice: '',
      taxCode: '',
      officeAddress: '',
      searchOption: {
        searchKeywords: null,
        phoneNumber: null,
        workingOffice: null,
        taxCode: null,
        officeAddress: null,
      },
      customers: [],

      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Tên khách hàng',
          field: 'customersName',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Số điện thoại',
          field: 'mobiPhone',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Tên đơn vị',
          field: 'workingOffice',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Mã số thuế',
          field: 'taxCode',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Địa chỉ cơ quan',
          field: 'officeAddress',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
          width: '30px',
          thClass: 'text-center',
          tdClass: 'text-center align-middle',
        },
      ],
      autofocus: true, // check auto focus input
    }
  },
  computed: {
    ...mapGetters(RED_INVOICE, [
      CUSTOMERS_TO_RED_INVOICE_GETTER,
    ]),
    getCustomers() {
      if (this.CUSTOMERS_TO_RED_INVOICE_GETTER.content) {
        return this.CUSTOMERS_TO_RED_INVOICE_GETTER.content.map(data => ({
          id: data.id,
          customerCode: data.customerCode,
          customersName: data.fullName,
          officeAddress: data.officeAddress,
          workingOffice: data.workingOffice,
          mobiPhone: data.mobiPhone,
          taxCode: data.taxCode,
        }))
      }
      return []
    },
    customerPagination() {
      if (this.CUSTOMERS_TO_RED_INVOICE_GETTER) {
        return this.CUSTOMERS_TO_RED_INVOICE_GETTER
      }
      return {}
    },
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.customerPagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },
  watch: {
    getCustomers() {
      this.customers = [...this.getCustomers]
    },
    visible() {
      if (this.visible) {
        this.$refs.focusInput.focus()
        // this.GET_CUSTOMERS_TO_RED_INVOICE_ACTION({
        //   data: {},
        //   onSuccess: () => { this.$refs.focusInput.focus() },
        // })
      }
    },
  },
  mounted() {
    this.GET_CUSTOMERS_TO_RED_INVOICE_ACTION({
      data: {},
      onSuccess: () => {},
    })
  },
  methods: {
    ...mapActions(RED_INVOICE, [
      GET_CUSTOMERS_TO_RED_INVOICE_ACTION,
    ]),

    // func pagination
    onSearch() {
      this.searchOption = {
        searchKeywords: this.searchKeywords,
        mobiphone: this.phoneNumber,
        workingOffice: this.workingOffice,
        officeAddress: this.officeAddress,
        taxCode: this.taxCode,
        ...this.searchData,
      }
      this.searchData = { ...this.searchData, ...this.searchOption }
      this.GET_CUSTOMERS_TO_RED_INVOICE_ACTION({
        data: {
          ...this.searchOption,
        },
        onSuccess: () => {},
      })
    },
    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },

    onClickSearchButton() {
      this.searchOption = {
        searchKeywords: this.searchKeywords,
        mobiphone: this.phoneNumber,
        workingOffice: this.workingOffice,
        officeAddress: this.officeAddress,
        taxCode: this.taxCode,
      }
      this.updateSearchData({
        ...this.searchOption,
      })
      this.onPaginationChange()
    },
    onPaginationChange() {
      this.GET_CUSTOMERS_TO_RED_INVOICE_ACTION({
        data: {
          ...this.searchData,
        },
        onSuccess: () => {},
      })
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

    getCustomerInfo(row) {
      this.$emit('getCustomerInfo', row)
    },
    cancel() {
      this.$emit('onModalClose')
      this.searchOption = {
        searchKeywords: null,
        mobiphone: null,
        workingOffice: null,
        officeAddress: null,
        taxCode: null,
      }
      this.searchKeywords = ''
      this.phoneNumber = ''
      this.workingOffice = ''
      this.taxCode = ''
      this.officeAddress = ''
    },
  },
}
</script>
