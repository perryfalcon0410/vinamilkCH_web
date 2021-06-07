<template>
  <b-modal
    ref="salesOnlineOrderModal"
    class="d-print-none"
    size="xl"
    title="Chọn đơn hàng Online"
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
            <div
              class="h8 mt-lg-1 mt-xl-0"
            >
              Số hóa đơn
            </div>
            <b-form-input
              id="form-input-sales"
              v-model="orderNumber"
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
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
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
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <div
                class="h8 mt-lg-1 mt-xl-0"
              >
                Từ ngày
              </div>
              <b-input-group
                id="form-input-date-from"
                class="input-group-merge"
              >
                <b-input-group-prepend
                  is-text
                  data-toggle
                >
                  <b-icon-calendar />
                </b-input-group-prepend>
                <vue-flat-pickr
                  v-model="fromDate"
                  :config="configDate"
                  class="form-control h9"
                  placeholder="Chọn ngày"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            sm="6"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <div
                class="h8 mt-lg-1 mt-xl-0"
              >
                Đến ngày
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-input-group-prepend
                  is-text
                  data-toggle
                >
                  <b-icon-calendar />
                </b-input-group-prepend>
                <vue-flat-pickr
                  id="form-input-date-from"
                  v-model="toDate"
                  :config="configDate"
                  class="form-control h9"
                  placeholder="Chọn ngày"
                />
              </b-input-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
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
            :rows="onlineOrders"
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
                  :disabled="isDisable === true && synStatusSelected === '1' "
                  @click="getOnlineOrderInfo(props.row.id)"
                >
                  <b-icon-hand-index-thumb
                    class="mr-1"
                    scale="1.3"
                  />
                  CHỌN ĐƠN
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
                  > trong {{ onlineOrderPagination.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="onlineOrderPagination.totalElements"
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
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { formatDateToLocale, reverseVniDate } from '@core/utils/filter'
import {
  ValidationProvider,
} from 'vee-validate'
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
    ValidationProvider,
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

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },

      selectedRow: 0,
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      isDisable: false,

      // search
      synStatusSelected: saleData.synStatus[0].id,
      synStatusOptions: saleData.synStatus,
      orderNumber: null,
      fromDate: null,
      toDate: null,

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
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thông tin đơn hàng',
          field: 'orderInfo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
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
    onlineOrders() {
      return this.ONLINE_ORDERS_GETTER().map(data => ({
        id: data.id,
        orderNumber: data.orderNumber,
        createdAt: formatDateToLocale(data.createdAt),
        orderInfo: data.orderInfo,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
        products: data.products,
        customer: data.customer,
        feature: '',
      }))
    },
    onlineOrderPagination() {
      return this.ONLINE_ORDERS_PAGINATION_GETTER()
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
    this.GET_ONLINE_ORDERS_ACTION({ formId: 1, ctrlId: 4 }) // HARD
  },
  methods: {
    ...mapGetters(SALES, [
      ONLINE_ORDERS_GETTER,
      ONLINE_ORDERS_PAGINATION_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_ONLINE_ORDERS_ACTION,
    ]),

    onClickSearchButton() {
      const searchData = {
        orderNumber: this.orderNumber?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        synStatus: this.synStatusSelected,
        formId: 1, // Hard
        ctrlId: 4, // Hard
      }
      this.GET_ONLINE_ORDERS_ACTION(searchData)
      this.isDisable = !this.isDisable
    },

    onClickCloseButton() {
      this.$refs.salesOnlineOrderModal.hide()
    },

    onPaginationChange() {
      const paginationData = {
        size: this.elementSize,
        page: this.pageNumber - 1,
      }

      this.GET_ONLINE_ORDERS_ACTION(paginationData)
    },

    getOnlineOrderInfo(id) {
      this.onClickCloseButton()
      this.$emit('getOnlineOrderInfo', id)
    },
  },
}
</script>
