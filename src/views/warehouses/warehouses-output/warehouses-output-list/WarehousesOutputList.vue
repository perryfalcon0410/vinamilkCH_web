<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-container
      fluid
      class="d-flex flex-column p-0"
    >
      <b-from
        class="d-print-none"
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
                maxlength="40"
                placeholder="Nhập mã xuất hàng"
                trim
                @keydown.enter="onClickSearchWarehousesOutput"
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
                maxlength="40"
                placeholder="Nhập số hoá đơn"
                trim
                @keydown.enter="onClickSearchWarehousesOutput"
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
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="Từ ngày"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Từ ngày <span class="text-danger">*</span>
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
                @change="isFromDateValid"
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
                  :state="touched ? passed : null"
                  :config="configFromDate"
                  class="form-control"
                  placeholder="Chọn ngày"
                />
              </b-row>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            lg="3"
            sm="4"
            class="h7"
          >
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="Đến ngày"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Đến ngày <span class="text-danger">*</span>
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
                @change="isToDateValid"
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
                  :state="touched ? passed : null"
                  :config="configToDate"
                  class="form-control"
                  placeholder="Chọn ngày"
                />
              </b-row>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
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
              :disabled="invalid"
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
              perPage: paginationData.size,
              setCurrentPage: pageNumber,
            }"
            compact-mode
            :total-rows="warehousesOutputPagination.totalElements"
            :sort-options="{
              enabled: true,
              multipleColumns: false,
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
                  @click="onClickUpdateButton(props.row.id, props.row.receiptType, props.row.poId)"
                />
                <v-icon-remove
                  v-show="$formatISOtoVNI(props.row.transDate) === nowDate && statusDeleteButton().show"
                  :disabled="statusDeleteButton().disabled"
                  class="ml-1"
                  @click="onClickDeleteWarehousesOutput(props.row.id,props.row.receiptType,props.row.transCode, props.row.originalIndex, $formatISOtoVNI(props.row.transDate))"
                />
              </div>
              <div
                v-else-if="props.column.field === 'totalQuantity' || props.column.field === 'totalAmount'"
                style="padding-right: 6px"
              >
                {{ props.formattedRow[props.column.field] }}
              </div>
              <div
                v-else-if="props.column.field === 'index'"
              >
                {{ paginationData.page === 0 || isNaN(paginationData.page) ? props.index + 1 : paginationData.page*paginationData.size + (props.index + 1) }}
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
                v-if="props.column.field === 'totalQuantity'"
                v-show="warehousesOutputPagination.totalElements"
                class="mx-50 h7 text-brand-3 text-right"
              >
                {{ $formatNumberToLocale(totalInfo.totalQuantity) }}
              </div>

              <div
                v-else-if="props.column.field === 'totalAmount'"
                v-show="warehousesOutputPagination.totalElements"
                class="mx-50 h7 text-brand-3 text-right"
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
                    v-model="paginationData.size"
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
                  :per-page="paginationData.size"
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
        Bạn có muốn xóa đợt xuất hàng {{ warehousesOutputSelected.transCode }} ?
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
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  preventDefaultWindowPrint,
  checkingDateInput,
  hostName,
  checkIpClient,
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
import {
  PRINTERCONFIG,
  GET_PRINTER_CLIENT_ACTIONS,
} from '../../../auth/printer-configuration-modal/store-module/type'

export default {
  components: {
    VCardActions,
    PrintFormOutputOrder,
    VIconEdit,
    VIconManipulation,
    VIconRemove,
    VIconPrinter,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      dateFormatVNI,
      inputValueBillNumber: '',
      warehousesOptions: warehousesData.outputTypes,
      perPageSizeOptions: commonData.perPageSizes,
      warehousesTypeSelected: null,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
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
      ipAddressCurrent: '',
      ipAddress: '',
      columns: [
        {
          label: 'index',
          field: 'index',
          sortable: false,
        },
        {
          label: 'ID',
          field: 'id',
          hidden: true,
        },
        {
          label: 'Ngày',
          field: 'transDate',
          thClass: 'text-nowrap align-middle',
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Mã xuất hàng',
          field: 'transCode',
          thClass: 'text-left align-middle',
          tdClass: 'text-left',
        },
        {
          label: 'Số hóa đơn',
          field: 'redInvoiceNo',
          type: 'number',
          thClass: 'text-left align-middle',
          tdClass: 'text-left',
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          type: 'number',
          thClass: 'text-left align-middle',
          tdClass: 'text-left',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'totalQuantity',
          type: 'number',
          thClass: 'text-nowrap align-middle',
          filterOptions: {
            enabled: true,
          },
          tdClass: 'pr-1',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Số tiền',
          field: 'totalAmount',
          type: 'number',
          thClass: 'text-nowrap align-middle',
          filterOptions: {
            enabled: true,
          },
          tdClass: 'pr-1',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
        },
        {
          label: 'Loại xuất',
          field: 'receiptType',
          formatFn: this.$getOutputTypeslabel,
          tdClass: 'text-nowrap',
          thClass: 'text-nowrap align-middle',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          width: '300px',
          maxlength: 100,
          thClass: 'text-nowrap align-middle',
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
        transCode: '',
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
          transDate: data.transDate,
          transCode: data.transCode,
          redInvoiceNo: data.redInvoiceNo,
          internalNumber: data.internalNumber,
          totalQuantity: data.totalQuantity,
          totalAmount: data.totalAmount,
          receiptType: data.receiptType,
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
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.warehousesOutputPagination.totalElements
        ? this.warehousesOutputPagination.totalElements : (this.paginationData.size * this.pageNumber)

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
    document.addEventListener('keydown', this.handleWindowPrintHotKey, false)
    hostName().then(res => {
      if (res) {
        this.ipAddress = res.ip || res.query || res.geoplugin_request
      } else {
        this.ipAddress = null
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleWindowPrintHotKey)
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_ACTION,
      PRINT_OUT_IN_PUT_ORDER_ACTION,
      DELETE_WAREHOUSES_ACTION,
    ]),
    ...mapActions(PRINTERCONFIG, [GET_PRINTER_CLIENT_ACTIONS]),
    handleWindowPrintHotKey(event) {
      const resolve = preventDefaultWindowPrint(event)
      if (resolve) {
        this.onClickPrintButton()
      }
    },
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
      hostName().then(res => {
        if (res) {
          this.ipAddressCurrent = res.ip || res.query || res.geoplugin_request
        } else {
          this.ipAddressCurrent = null
        }
        if (checkIpClient(this.ipAddress, this.ipAddressCurrent)) {
          this.GET_PRINTER_CLIENT_ACTIONS({
            data: {
              clientId: this.ipAddressCurrent,
            },
            onSuccess: () => {
              this.PRINT_OUT_IN_PUT_ORDER_ACTION({
                data: {
                  transCode: outputOrderData.id,
                  params: { ...this.decentralization, receiptType: outputOrderData.receiptType },
                },
                onSuccess: () => {
                },
              })
            },
          })
        }
      })
    },
    onClickSearchWarehousesOutput() {
      this.warehousesOutputList = this.GET_WAREHOUSES_OUTPUT_LIST_GETTER
      this.onPaginationChange()
      this.pageNumber = 1
    },
    onClickDeleteWarehousesOutput(id, type, transCode, index, transDate) {
      this.$refs.salesNotifyModal.show()
      this.warehousesOutputSelected.id = id
      this.warehousesOutputSelected.type = type
      this.warehousesOutputSelected.transCode = transCode
      this.warehousesOutputSelected.index = index
      this.warehousesOutputSelected.transDate = transDate
    },
    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
      this.warehousesOutputSelected.id = null
      this.warehousesOutputSelected.type = null
      this.warehousesOutputSelected.transCode = ''
    },
    onClickAgreeButton() {
      const paramDeleteWarehousesOutput = {
        id: this.warehousesOutputSelected.id,
        type: this.warehousesOutputSelected.type,
      }

      this.warehousesOutputList.splice(this.warehousesOutputSelected.index, 1)
      this.DELETE_WAREHOUSES_ACTION(paramDeleteWarehousesOutput)
      this.warehousesOutputPagination.totalElements -= 1
      this.closeNotifyModal()
    },
    updateSearchData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPaginationChange(data, params) {
      this.updateSearchData(data)
      const searchData = {
        redInvoiceNo: this.searchOptions.redInvoiceNo,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.warehousesTypeSelected,
        transCode: this.searchOptions.exportNo,
        size: this.paginationData.size,
        page: this.paginationData.page,
        sort: this.paginationData.sort,
        ...this.decentralization,
      }
      this.paginationData = searchData
      this.GET_WAREHOUSES_OUTPUT_LIST_ACTION({ ...this.paginationData, ...params })
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
    isFromDateValid() {
      if (!checkingDateInput(this.fromDate)) {
        this.fromDate = earlyMonth()
      }
    },
    isToDateValid() {
      if (!checkingDateInput(this.toDate)) {
        this.toDate = nowDate()
      }
    },
  },
}
</script>
