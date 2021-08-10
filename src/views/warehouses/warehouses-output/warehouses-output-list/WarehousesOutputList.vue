<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <b-from
      class="d-print-none"
      @keydown.enter="onClickSearchWarehousesOutput"
    >
      <!-- START - Search -->
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Export No -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div class="mt-sm-1 mt-xl-0">
            Mã xuất hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              ref="focusInput"
              v-model="searchOptions.exportNo"
              class="text-brand-3"
              maxlength="20"
              placeholder="Nhập mã xuất hàng"
              trim
            />
            <b-input-group-append is-text>
              <b-icon-x
                v-show="searchOptions.exportNo"
                class="cursor-pointer text-gray"
                @click="searchOptions.exportNo = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Export No -->

        <!-- START - Red Invoice No -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div class="mt-sm-1 mt-xl-0">
            Số hoá đơn
          </div>
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="searchOptions.redInvoiceNo"
              class="text-brand-3"
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
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
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
              class="form-control"
              placeholder="Chọn ngày"
            />
          </b-row>
        </b-col>
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
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
              class="form-control"
              placeholder="Chọn ngày"
            />
          </b-row>
        </b-col>
        <!-- END - Date To -->

        <!-- START - Output type -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div class="mt-sm-1 mt-xl-0">
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
        <!-- END - Output type -->

        <!-- START - Search Button -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="btn-brand-1 align-items-button-center mt-sm-1 mt-xl-0 h8"
            variant="someThing"
            @click="onClickSearchWarehousesOutput()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
      <!-- END - Search Button -->

      </v-card-actions>
    </b-from>
    <!-- END - Search -->

    <!-- START - Table -->
    <div class="bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Table header -->
      <b-row
        class="border-bottom px-1 mx-0"
        style="padding: 5px 0;"
        align-v="center"
        align-h="between"
      >
        <strong class="text-brand-1">
          Danh sách phiếu xuất hàng
        </strong>
        <b-button-group>
          <b-button
            v-if="statusCreateButton().show"
            :disabled="statusCreateButton().disabled"
            class="btn-brand-1 align-items-button-center h8"
            variant="someThing"
            @click="onClickCreateButton"
          >
            <b-icon-plus
              scale="2"
              class="mr-50"
            />
            Thêm mới
          </b-button>
        </b-button-group>

      </b-row>
      <!-- END - Table header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="warehousesOutputList"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: elementSize,
            setCurrentPage: pageNumber,
          }"
          compact-mode
          line-numbers
          :total-rows="warehousesOutputPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
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
            >
              <v-icon-manipulation />
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
            <div
              v-if="props.column.field === 'feature'"
              class="mx-0"
            >
              <v-icon-printer
                v-if="statusPrintButton().show"
                :disabled="statusPrintButton().disabled"
                @click="onClickPrintButton(props.row)"
              />
              <v-icon-edit
                v-if="statusUpdateButton().show"
                :disabled="statusUpdateButton().disabled"
                class="ml-1"
                popover-position="top"
                @click="onClickUpdateButton(props.row.id, props.row.inputTypes, props.row.poId)"
              />
              <v-icon-remove
                v-show="$formatISOtoVNI(props.row.date) === nowDate && statusDeleteButton().show"
                :disabled="statusDeleteButton().disabled"
                class="ml-1"
                @click="onClickDeleteWarehousesOutput(props.row.id,props.row.inputTypes,props.row.code, props.row.originalIndex, $formatISOtoVNI(props.row.date))"
              />
            </div>
            <div
              v-else-if="props.column.field === 'quantity' || props.column.field === 'price'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

          <!-- START - Customer filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'quantity'"
              v-show="warehousesOutputPagination.totalElements"
              class="h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
            </div>

            <div
              v-else-if="props.column.field === 'price'"
              v-show="warehousesOutputPagination.totalElements"
              class="h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalInfo.totalPrice) }}
            </div>
          </template>
          <!-- END - Customer filter -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="warehousesOutputPagination.totalElements"
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
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="warehousesOutputPagination.totalElements"
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

    </div>
    <!-- END - Table -->

    <!-- START - Notify Modal Close -->
    <b-modal
      ref="salesNotifyModal"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt xuất hàng {{ warehousesOutputSelected.code }} ?
      <template #modal-footer>
        <b-button
          class="btn-brand-1"
          variant="someThing"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button @click="closeNotifyModal">
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Notify Modal Close -->

    <!-- STAT - Print form -->
    <print-form-output-order />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import warehousesData from '@/@db/warehouses'
import commonData from '@/@db/common'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import PrintFormOutputOrder from '@core/components/print-form/PrintFormOutputOrder.vue'

// Icons
import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import VIconRemove from '@/@core/components/v-icons/IconRemove.vue'
import VIconEdit from '@core/components/v-icons/IconEdit.vue'
import VIconPrinter from '@core/components/v-icons/IconPrinter.vue'

import {
  WAREHOUSES_OUTPUT,
  // GETTERS
  GET_WAREHOUSES_OUTPUT_LIST_GETTER,
  // ACTIONS
  GET_WAREHOUSES_OUTPUT_LIST_ACTION,
  DELETE_WAREHOUSES_ACTION,
  PRINT_OUT_IN_PUT_ORDER_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
    PrintFormOutputOrder,
    VIconEdit,
    VIconManipulation,
    VIconRemove,
    VIconPrinter,
  },

  data() {
    return {
      inputValueBillNumber: '',
      warehousesOptions: warehousesData.outputTypes,
      perPageSizeOptions: commonData.perPageSizes,
      warehousesTypeSelected: null,
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      serverParams: {
        sort: {
          field: 'date',
          type: 'desc',
        },
      },
      paginationData: {
        size: this.elementSize,
        page: this.pageNumber - 1,
        sort: null,
      },
      fromDate: earlyMonth(),
      toDate: nowDate(),
      nowDate: nowDate(),
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'ID',
          field: 'id',
          hidden: true,
        },
        {
          label: 'Ngày',
          field: 'date',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Mã xuất hàng',
          field: 'code',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Loại xuất',
          field: 'inputTypes',
          formatFn: this.$getOutputTypeslabel,
          tdClass: 'text-nowrap',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          width: '300px',
          maxlength: 100,
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          thClass: 'text-left',
          tdClass: 'text-left',
          width: '90px',
          sortable: false,
        },
      ],
      searchOptions: {
        redInvoiceNo: '', // số hóa đơn
        type: '',
        exportNo: '',
        page: commonData.pageNumber,
        size: commonData.perPageSizes[0],
      },
      warehousesOutputList: [],
      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: nowDate(),
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
      warehousesOutputSelected: {
        id: 0,
        type: 0,
        code: '',
      },

    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_GETTER,
    ]),
    getWarehousesOutputList() {
      if (this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.response) {
        return this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.response.content.map(data => ({
          id: data.id,
          date: data.transDate,
          code: data.transCode,
          billNumber: data.redInvoiceNo,
          internalNumber: data.internalNumber,
          quantity: data.totalQuantity,
          price: data.totalAmount,
          inputTypes: data.receiptType,
          note: data.note,
          poId: data.poId || 0,
        }))
      }
      return {}
    },
    // Get data totalElement
    warehousesOutputPagination() {
      if (this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.response) {
        return this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.response
      }
      return {}
    },
    // FilterOptions of column quantity
    totalInfo() {
      if (this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.info) {
        return this.GET_WAREHOUSES_OUTPUT_LIST_GETTER.info
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.warehousesOutputPagination.totalElements
        ? this.warehousesOutputPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.warehousesOutputPagination.totalElements} mục`
    },
  },

  watch: {
    getWarehousesOutputList() {
      this.warehousesOutputList = [...this.getWarehousesOutputList]
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  mounted() {
    resizeAbleTable()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.onPaginationChange()
    this.$refs.focusInput.focus()
  },

  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_ACTION,
      PRINT_OUT_IN_PUT_ORDER_ACTION,
      DELETE_WAREHOUSES_ACTION,
    ]),

    statusCreateButton() {
      return this.$permission('WarehousesOutput', 'WarehousesOutputCreate')
    },
    statusUpdateButton() {
      return this.$permission('WarehousesOutput', 'WarehousesOutputUpdate')
    },
    statusDeleteButton() {
      return this.$permission('WarehousesOutput', 'WarehousesOutputDelete')
    },
    statusPrintButton() {
      return this.$permission('WarehousesOutput', 'WarehousesOutputPrint')
    },

    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-output-create' })
    },
    onClickUpdateButton(id, type, poId) {
      this.$router.push({
        name: 'warehouses-output-update',
        params: {
          id,
          type,
          poId,
        },
      })
    },
    onClickPrintButton(outputOrderData) {
      this.$root.$emit('bv::hide::popover')
      this.$root.$emit('bv::disable::popover')
      this.PRINT_OUT_IN_PUT_ORDER_ACTION({
        data: {
          transCode: outputOrderData.id,
          params: { ...this.decentralization, receiptType: outputOrderData.inputTypes },
        },
        onSuccess: () => {
          this.$root.$emit('bv::enable::popover')
        },
      })
    },
    onClickSearchWarehousesOutput() {
      this.warehousesOutputList = this.GET_WAREHOUSES_OUTPUT_LIST_GETTER
      this.onPaginationChange()
      this.pageNumber = 1
    },
    onClickDeleteWarehousesOutput(id, type, code, index, date) {
      this.$refs.salesNotifyModal.show()
      this.warehousesOutputSelected.id = id
      this.warehousesOutputSelected.type = type
      this.warehousesOutputSelected.code = code
      this.warehousesOutputSelected.index = index
      this.warehousesOutputSelected.date = date
    },
    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
      this.warehousesOutputSelected.id = null
      this.warehousesOutputSelected.type = null
      this.warehousesOutputSelected.code = ''
    },
    onClickAgreeButton() {
      const paramDeleteWarehousesOutput = {
        id: this.warehousesOutputSelected.id,
        type: this.warehousesOutputSelected.type,
      }
      if (this.warehousesOutputSelected.date === nowDate()) {
        this.warehousesOutputList.splice(this.warehousesOutputSelected.index, 1)
      }
      this.DELETE_WAREHOUSES_ACTION(paramDeleteWarehousesOutput)
      this.warehousesOutputPagination.totalElements -= 1
      this.closeNotifyModal()
    },
    onPaginationChange() {
      const searchData = {
        redInvoiceNo: this.searchOptions.redInvoiceNo,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.warehousesTypeSelected,
        transCode: this.searchOptions.exportNo,
        size: this.paginationData.size,
        page: this.paginationData.page,
        ...this.decentralization,
      }
      this.paginationData = searchData
      this.GET_WAREHOUSES_OUTPUT_LIST_ACTION(this.paginationData)
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.paginationData.page = params.currentPage - 1
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.paginationData.page = params.currentPage - 1
      this.paginationData.size = params.currentPerPage
      this.onPaginationChange()
    },
  },
}
</script>
