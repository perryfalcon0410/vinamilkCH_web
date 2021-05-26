<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form
      class="bg-white shadow rounded"
    >
      <b-row
        v-b-toggle.collapseDelivery
        class="text-primary mx-0 p-1"
        align-v="center"
        align-h="between"
      >
        <strong class="text-brand-1">Tìm kiếm</strong>

        <b-icon-chevron-down
          scale="1.3"
          color="#203181"
        />
      </b-row>
      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-form-row
          class="border-top p-1"
        >
          <!-- START - Red Invoice No -->
          <b-col
            lg="2"
            md
          >
            <div class="h8 mt-sm-1 mt-xl-0">
              Số hoá đơn
            </div>
            <b-input-group class="input-group-merge">
              <b-form-input
                id="redInvoiceNo"
                v-model="searchOptions.redInvoiceNo"
                class="h8 text-brand-3"
                maxlength="20"
                placeholder="Nhập số hoá đơn"
                trim
              />
              <b-input-group-append is-text>
                <b-icon-x
                  v-show="searchOptions.redInvoiceNo"
                  class="cursor-pointer text-gray"
                  @click="searchOptions.redInvoiceNo = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- END - Red Invoice No -->

          <!-- START - Date From -->
          <b-col
            xl
            lg="2"
            md
          >
            <div class="h8 mt-sm-1 mt-xl-0">
              Từ ngày
            </div>
            <b-input-group class="input-group-merge">
              <vue-flat-pickr
                v-model="searchOptions.fromDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="searchOptions.fromDate"
                  class="cursor-pointer text-gray"
                  @click="searchOptions.fromDate = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            lg="2"
            md
          >
            <div class="h8 mt-sm-1 mt-xl-0">
              Đến ngày
            </div>
            <b-input-group class="input-group-merge">
              <vue-flat-pickr
                id="form-input-date-from"
                v-model="searchOptions.toDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="searchOptions.toDate"
                  class="cursor-pointer text-gray"
                  @click="searchOptions.toDate = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            lg="2"
            md
          >
            <div class="h8 mt-sm-1 mt-xl-0">
              Loại xuất
            </div>
            <tree-select
              v-model="warehousesTypeSelected"
              :options="warehousesOptions"
              :searchable="false"
              placeholder="Tất cả"
              no-options-text="Không có dữ liệu"
            />

          </b-col>

          <b-col
            md="12"
            lg="4"
          >
            <div
              class="h8 text-white"
              onmousedown="return false;"
              style="cursor: context-menu;"
            >
              Tìm kiếm
            </div>
            <b-button
              id="form-button-search"
              class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
              variant="someThing"
              style="max-height: 35px;"
              @click="onClickSearchWarehousesOutput()"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-col>
        </b-form-row>
      </b-collapse>
    </b-form>
    <!-- END - Search -->

    <!-- START - Product  list -->
    <b-form class="bg-white rounded shadow rounded my-1">
      <!-- START - Title -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách phiếu xuất hàng
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
            size="sm"
            @click="onClickCreateButton"
          >
            <b-icon-plus
              scale="2"
              class="mr-05"
            />
            Thêm mới
          </b-button>
        </b-button-group>

      </b-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="warehousesOutputList"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
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
          <!-- START - Column -->
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
          <!-- END - Column -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-printer-fill
                v-b-popover.hover="'In phiếu'"
                class="cursor-pointer text-brand-1"
                @click="onClickPrintButton(props.index)"
              />
              <b-icon-pencil-fill
                v-b-popover.hover="'Chỉnh sửa'"
                class="cursor-pointer ml-2 text-brand-3"
                @click="onClickUpdateButton(props.row.id,props.row.type)"
              />
              <b-icon-trash-fill
                v-b-popover.hover="'Xóa'"
                class="cursor-pointer ml-2"
                color="red"
                @click="onClickDeleteWarehousesOutput(props.row.id,props.row.type)"
              />
            </div>
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
                  v-model="paginationSelected"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong {{ totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="searchOptions.page"
                :total-rows="totalElements"
                :per-page="paginationSelected"
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
              class="h7 px-0 mx-0"
              align-h="end"
            >
              {{ totalPrice }}
            </b-row>
          </template>
          <!-- END - Pagination -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product  list -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import { reverseVniDate, formatDateToLocale } from '@/@core/utils/filter'

import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import warehousesData from '@/@db/warehouses'
import commonData from '@/@db/common'

import {
  WAREHOUSES_OUTPUT,
  GET_WAREHOUSES_OUTPUT_LIST_GETTER,
  GET_WAREHOUSES_OUTPUT_LIST_ACTION,
  PRINT_WAREHOUSES_OUTPUT_ACTION,
  GET_WAREHOUSES_OUTPUT_DATA_GETTER,
  DELETE_WAREHOUSES_ACTION,
} from '../store-module/type'

export default {
  data() {
    return {
      dateFormatVNI,
      inputValueBillNumber: '',
      warehousesOptions: warehousesData.outputTypes,
      paginationOptions: commonData.pagination,
      warehousesTypeSelected: null,
      paginationSelected: commonData.pagination[0],
      totalElements: null,
      formId: 5, // Hard code for permission
      ctrlId: 7, // Hard code for permission
      columns: [
        {
          label: 'ID',
          field: 'id',
          hidden: true,
        },
        {
          label: 'Ngày',
          field: 'date',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã xuất hàng',
          field: 'code',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      searchOptions: {
        redInvoiceNo: '', // số hóa đơn
        fromDate: '',
        toDate: '',
        type: '',
        page: commonData.pageNumber,
        size: commonData.pagination[0],
      },
      warehousesOutputList: [],
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      id: 0,
      type: 0,
    }
  },
  computed: {
    getWarehousesOutputList() {
      return this.GET_WAREHOUSES_OUTPUT_LIST_GETTER().map(data => ({
        id: data.id,
        date: data.transDate === '' ? '' : formatDateToLocale(data.transDate),
        code: data.transCode,
        billNumber: data.redInvoiceNo,
        internalNumber: data.internalNumber,
        quantity: this.$formatNumberToLocale(data.totalQuantity),
        price: this.$formatNumberToLocale(data.totalAmount),
        totalAmount: Number(data.totalAmount),
        note: data.note,
        type: data.receiptType,
      }))
    },
    // Get data totalElement
    warehousesOutputPagination() {
      return this.GET_WAREHOUSES_OUTPUT_DATA_GETTER()
    },
    // FilterOptions of column quantity
    totalQuantity() {
      return this.warehousesOutputList.reduce((accum, item) => accum + Number(item.quantity), 0)
    },
    // FilterOptions of column price
    totalPrice() {
      return this.$formatNumberToLocale(this.warehousesOutputList.reduce((accum, item) => accum + Number(item.totalAmount), 0))
    },
  },
  watch: {
    getWarehousesOutputList() {
      this.warehousesOutputList = [...this.getWarehousesOutputList]
    },
    warehousesOutputPagination() {
      this.totalElements = this.warehousesOutputPagination.totalElements
    },
  },
  beforeMount() {
    this.searchOptions.fromDate = this.$earlyMonth
    this.searchOptions.toDate = this.$nowDate
  },
  mounted() {
    const searchData = {
      redInvoiceNo: this.searchOptions.redInvoiceNo,
      fromDate: reverseVniDate(this.$earlyMonth),
      toDate: reverseVniDate(this.$nowDate),
      type: this.warehousesTypeSelected,
      // formId: this.formId,
      // ctrlId: this.ctrlId,
    }
    this.GET_WAREHOUSES_OUTPUT_LIST_ACTION(searchData)
  },
  methods: {
    ...mapState(WAREHOUSES_OUTPUT, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_GETTER,
      GET_WAREHOUSES_OUTPUT_DATA_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_ACTION,
      PRINT_WAREHOUSES_OUTPUT_ACTION,
      DELETE_WAREHOUSES_ACTION,
    ]),
    selectedRowsChange(params) {
      this.receiptExportSelected = params.selectedRows.map(data => data.id)
    },
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-output-create' })
    },
    onClickUpdateButton(id, type) {
      this.$router.push({
        name: 'warehouses-output-update',
        params: {
          id,
          type,
        },
      })
    },
    onClickPrintButton(itemIndex) {
      const params = {
        transCode: this.warehousesOutputList[itemIndex].Id,
      }
      this.PRINT_WAREHOUSES_OUTPUT_ACTION(params)
    },
    onClickSearchWarehousesOutput() {
      const searchData = {
        redInvoiceNo: null,
        fromDate: reverseVniDate(this.searchOptions.fromDate),
        toDate: reverseVniDate(this.searchOptions.toDate),
        type: this.warehousesTypeSelected,
        // formId: this.searchOptions.formId,
        // ctrlId: this.searchOptions.ctrlId,
      }
      if (!searchData.fromDate) {
        searchData.fromDate = this.$earlyMonth
        this.searchOptions.fromDate = this.$earlyMonth
      }

      if (!searchData.toDate) {
        searchData.toDate = this.$nowDate
        this.searchOptions.toDate = this.$nowDate
      }

      this.GET_WAREHOUSES_OUTPUT_LIST_ACTION(searchData)
      this.warehousesOutputList = this.GET_WAREHOUSES_OUTPUT_LIST_GETTER()
    },
    onClickDeleteWarehousesOutput(id, type) {
      const paramDeleteWarehousesOutput = {
        id,
        type,
      }
      this.DELETE_WAREHOUSES_ACTION(paramDeleteWarehousesOutput)
    },
  },
}
</script>
