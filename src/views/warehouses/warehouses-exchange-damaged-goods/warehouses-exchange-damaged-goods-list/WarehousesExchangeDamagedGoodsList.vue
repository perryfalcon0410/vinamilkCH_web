<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Minute Code -->
        <b-col
          xl
          md="3"
          sm="4"
        >
          <validation-provider
            v-slot="{ errors, passed }"
            rules="code"
            name="Số biên bản"
          >
            <div
              class="h8 mt-lg-1 mt-xl-0"
            >
              Số biên bản
            </div>
            <b-form-input
              id="form-input-minuteCode"
              v-model="minuteCode"
              :state="minuteCode ? passed : null"
              maxlength="20"
              class="h9"
              size="sm"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Minute Code -->

        <!-- START - Date from -->
        <b-col
          xl
          md="3"
          sm="4"
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
              size="sm"
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
        <!-- END - Date from -->

        <!-- START - Date to -->
        <b-col
          xl
          md="3"
          sm="4"
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
              size="sm"
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
        <!-- END - Date to -->

        <!-- START - Reason -->
        <b-col
          xxl
          md="3"
          sm="4"
        >
          <v-input-select
            title="Lý do"
            :suggestions="reasonTypeOptions"
            :data-input="reasonTypesSelected.name"
            placeholder="Tất cả"
            title-class="h8 mt-lg-1 mt-xl-0"
            input-class="h9"
            suggestions-class="h9"
            :clear-able="true"
            size="sm"
            @updateSelection="reasonTypesSelected = $event"
          />
        </b-col>

        <!-- START - Search Button -->
        <b-col
          md="12"
          lg="4"
          class="h-25"
        >
          <div
            class="h8 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
            variant="someThing"
            style="height: 30px;"
          >
            <b-icon-search class="mr-1" />
            Tìm kiếm
          </b-button>
        </b-col>
        <!-- END - Search Button -->

        <!-- END - Section form input -->

      </v-card-actions>
    </b-form>
    <!-- END - Search -->

    <!-- START - Product Import list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-2">
        <strong
          for="listProduct"
          class="text-brand-1"
        >
          Danh sách phiếu đổi hàng hỏng
        </strong>

        <b-button
          class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
          size="sm"
          variant="someThing"
          @click="onClickAddNewButton"
        >
          <b-icon-plus
            scale="2"
          />
          Thêm mới
        </b-button>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        id="listProduct"
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="getExchangeDamagedGoods"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
        >
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'feature'"
              align-h="center"
            >
              <b-icon-bricks />
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
              class="mx-0"
              align-h="around"
            >
              <b-icon-pencil-fill
                v-b-popover.hover="'Chỉnh sửa'"
                class="cursor-pointer"
                @click="onClickUpdateButton"
              />

              <b-icon-trash-fill
                v-b-popover.hover="'Xóa'"
                class="cursor-pointer"
                color="red"
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
                > trong {{ exchangeDamagedGoodsPagination.totalElements }} mục </span>
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

          <!-- START - Filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity'"
            >
              {{ totalQuantity }}
            </div>
            <div
              v-else-if="props.column.field === 'price'"
            >
              {{ totalMoney }}
            </div>
          </template>
          <!-- END - Filter -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product Import list -->
  </b-container>
</template>

<script>
import warehousesData from '@/@db/warehouses'
import commonData from '@/@db/common'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  code,
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { formatDateToLocale, formatNumberToLocale } from '@/@core/utils/filter'
import {
  WAREHOUSESEXCHANGEDAMAGEDGOODS,
  // Getters
  EXCHANGE_DAMAGED_GOODS_GETTER,
  EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER,
  // Actions
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    VCardActions,
    VInputSelect,
  },
  data() {
    return {
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      minuteCode: '',

      elementSize: 20,
      pageNumber: 1,
      paginationOptions: commonData.pagination,

      reasonTypesSelected: { id: null, name: null },
      reasonTypeOptions: warehousesData.reasonTypes,

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
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số biên bản',
          field: 'minuteCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Số tiền',
          field: 'price',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-right',
        },
        {
          label: 'Lý do',
          field: 'reason',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-left',
        },
        {
          label: 'Chức năng',
          field: 'feature',
          sortable: false,
          width: '100px',
        },
      ],
      // validation rules
      code,
      dateFormatVNI,
    }
  },
  computed: {
    getExchangeDamagedGoods() {
      return this.EXCHANGE_DAMAGED_GOODS_GETTER().map(data => ({
        id: data.id,
        date: data.transDate === '' ? '' : formatDateToLocale(data.transDate),
        minuteCode: data.transCode,
        quantity: formatNumberToLocale(Number(data.quantity)),
        price: formatNumberToLocale(Number(data.totalAmount)),
        reason: data.reason,
        feature: 'Chỉnh sửa',
      }))
    },
    totalQuantity() {
      return this.getExchangeDamagedGoods.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    totalMoney() {
      return this.getExchangeDamagedGoods.reduce((accum, item) => accum + Number(item.price), 0)
    },
    exchangeDamagedGoodsPagination() {
      return this.EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER()
    },
  },
  mounted() {
    this.GET_EXCHANGE_DAMAGED_GOODS_ACTION({
      formId: 5, // Hard code
      ctrlId: 7, // Hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSESEXCHANGEDAMAGEDGOODS, [
      EXCHANGE_DAMAGED_GOODS_GETTER,
      EXCHANGE_DAMAGED_GOODS_PAGINATION_GETTER,
    ]),
    ...mapActions(WAREHOUSESEXCHANGEDAMAGEDGOODS, [
      GET_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),
    onClickAddNewButton() {
      this.$router.push({ name: 'warehouses-exchange-damaged-goods-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'archive-changeProductsUpdate' })
    },
    onPaginationChange() {
      const paginationData = {
        size: this.elementSize,
        page: this.pageNumber - 1,
      }

      this.GET_EXCHANGE_DAMAGED_GOODS_ACTION(paginationData)
    },
  },
}
</script>
