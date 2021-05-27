<template>
  <b-modal
    ref="salesSearchModal"
    size="xl"
    title="Tìm kiếm khách hàng"
    title-class="font-weight-bold text-primary"
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
          >
            <!-- START - Full Name -->
            <b-form-group
              label="Khách hàng"
              label-for="form-input-customer"
              label-class="h8"
            >
              <b-form-input
                id="form-input-customer"
                v-model="searchKeywords"
                class="h9"
                size="sm"
                placeholder="Nhập mã/ họ tên"
                trim
              />
            </b-form-group>
            <!-- END - Full Name -->
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Số điện thoại"
              label-for="form-input-phoneNumber"
              label-class="h8"
            >
              <b-form-input
                id="form-input-phoneNumber"
                v-model="phone"
                class="h9"
                size="sm"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="CMND"
              label-for="form-input-idNo"
              label-class="h8"
            >
              <b-form-input
                id="form-input-idNo"
                v-model="idNo"
                class="h9"
                size="sm"
                trim
              />
            </b-form-group>
          </b-col>

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
                class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
                variant="someThing"
                style="height: 30px;"
                @click="onClickSearchButton()"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>

        </b-form-row>
      </b-form>
      <!-- END - Search -->

      <!-- START - Coupon list -->
      <b-form class="bg-white rounded shadow rounded mt-1">
        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="customers"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true
            }"
            compact-mode
            line-numbers
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
                  > trong {{ customerPagination.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="customerPagination.totalElements"
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
        <b-col class="text-center mb-2">
          <b-button @click="onClickCloseButton()">
            <b-icon-x
              width="20"
              height="20"
            />
            Đóng
          </b-button>
        </b-col>
        <!-- END - Coupon list -->
      </b-form></b-container>
  </b-modal>
</template>

<script>
import commonData from '@/@db/common'
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
  },
  data() {
    return {
      selectedRow: 0,
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      paginationData: {},

      // search
      searchKeywords: '',
      phone: '',
      idNo: '',
      customerTypeId: '',
      shopId: '',

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
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số điện thoại',
          field: 'phoneNumber',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Ngày sinh',
          field: 'birthDay',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số CMND',
          field: 'idNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
    }
  },
  computed: {
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
      CUSTOMER_BY_ID_GETTER,
    ]),
    customers() {
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
        }))
      }
      return []
    },
    customerInfo() {
      return this.CUSTOMER_BY_ID_GETTER()
    },
    customerPagination() {
      return this.CUSTOMERS_GETTER
    },
  },
  watch: {
    pageNumber() {
      this.paginationData.page = this.pageNumber - 1
      this.onPaginationChange()
    },
    elementSize() {
      this.paginationData.size = this.elementSize
      this.onPaginationChange()
    },
    paginationData() {
      this.pageNumber = 1
      this.onPaginationChange()
    },
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION({ formId: 9, ctrlId: 6 }) // HARD
  },
  created() {
  },
  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_CUSTOMER_BY_ID_ACTION,
    ]),

    onClickSearchButton() {
      const searchData = {
        searchKeywords: this.searchKeywords.trim(),
        phone: this.mobiPhone || this.phone,
        idNo: this.idNo.trim(),
        formId: 9, // HARD
        ctrlId: 6, // HARD
      }

      this.GET_CUSTOMERS_ACTION(searchData)
    },

    onClickCloseButton() {
      this.$refs.salesSearchModal.hide()
    },

    getCustomerInfo(obj) {
      this.onClickCloseButton()
      this.$emit('getCustomerInfo', {
        data: obj,
      })
    },

    onPaginationChange() {
      this.GET_CUSTOMERS_ACTION(this.paginationData)
    },
  },
}
</script>
