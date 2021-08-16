<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <b-form>
      <v-card-actions
        title="Tìm kiếm"
      ><b-col
         xl
         lg="3"
         sm="4"
       >
         <div
           class="h7 mt-sm-1 mt-xl-0"
         >
           Khách hàng
         </div>
         <b-input-group
           class="input-group-merge"
         >
           <b-form-input
             ref="focusInput"
             v-model.trim="customer"
             class="h7"
             placeholder="Nhập Mã/SĐT/Tên khách hàng"
             @keyup.enter="onSearchClick"
           />
           <b-input-group-append
             is-text
           >
             <b-icon-x
               v-show="customer"
               class="cursor-pointer text-gray"
               @click="customer = null"
             />
           </b-input-group-append>
         </b-input-group>
       </b-col>
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số hóa đơn
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="invoiceNumber"
              class="h7"
              placeholder="Nhập số hóa đơn"
              @keyup.enter="onSearchClick"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="invoiceNumber"
                class="cursor-pointer text-gray"
                @click="invoiceNumber = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <!-- START - Date From -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
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
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
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
          lg="3"
          sm="4"
        >
          <div
            class="h7 text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            variant="someThing"
            class="btn-brand-1 align-items-button-center h8 mt-sm-1 mt-xl-0"
            @click="onSearchClick()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
      </v-card-actions>
    </b-form>
    <!-- END - Search -->

    <div class="d-print-none bg-white rounded shadow my-1">
      <!-- START - Header -->
      <b-row
        class="border-bottom mx-0 px-1"
        style="padding: 5px 0"
        align-v="center"
        align-h="between"
      >
        <strong class="text-brand-1">
          Danh sách hóa đơn đỏ
        </strong>

        <!-- START - Button Head -->
        <b-row
          class="mx-0"
          align-v="center"
        >
          <b-form-radio-group
            v-model="templateOptionSelected"
            :options="options"
            value-field="item"
            text-field="name"
          />
          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled"
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickExportRedBills"
          >
            <b-icon-file-earmark-x-fill class="mr-50" />
            Xuất Excel
          </b-button>
          <b-button
            v-if="statusPrintButton().show"
            :disabled="statusPrintButton().disabled"
            variant="someThing"
            class="align-items-button-center h8 ml-1 btn-brand-1"
            @click="onClickPrintButton"
          >
            <b-icon-printer-fill class="mr-50" />
            In HĐ
          </b-button>
          <b-button
            v-if="statusUpdateButton().show"
            :disabled="statusUpdateButton().disabled"
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickUpdateRedBills"
          >
            <b-icon-arrow-clockwise
              class="mr-50"
              scale="1.2"
            />
            Cập nhật HĐ
          </b-button>
          <b-button
            v-if="statusCreateButton().show"
            :disabled="statusCreateButton().disabled"
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="addSaleRedBillsCreate"
          >
            <b-icon-plus
              class="mr-50"
              scale="1.8"
            />
            Thêm mới
          </b-button>
          <b-button
            v-if="statusDeleteButton().show"
            :disabled="statusDeleteButton().disabled"
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickDeleteButton"
          >
            <b-icon-trash class="mr-50" />
            Xóa
          </b-button>
        </b-row>
        <!-- END - Button Head -->
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="listRedBill"
          mode="remote"
          style-class="vgt-table"
          :pagination-options="{
            enabled: true,
            perPage: searchData.size,
            setCurrentPage: searchData.page + 1,
          }"
          line-numbers
          :total-rows="getRedBillPagination.totalElements"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
            selected: true,
          }"
          @on-row-click="selectionRow"
          @on-select-all="selectAllRows"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          @on-cell-click="focusRows"
        >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="getRedBillPagination.totalElements"
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
                :total-rows="getRedBillPagination.totalElements"
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
          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'numberBill'">
              <b-form-input
                v-model="listRedBill[props.row.originalIndex].numberBill"
                maxlength="50"
                :value="listRedBill[props.row.originalIndex].numberBill"
              />
            </div>
            <div
              v-else-if="props.column.field === 'company'"
              class="style-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'address'"
              class="style-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-show="getRedBillPagination.totalElements"
              v-if="props.column.field === 'quantity'"
              class="mx-0 h7 text-brand-3 text-right"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.sumTotalQuantity) }}
            </b-row>

            <b-row
              v-show="getRedBillPagination.totalElements"
              v-else-if="props.column.field === 'goodsMoney'"
              class="mx-0 h7 text-brand-3 text-right"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.sumAmountNotVat) }}
            </b-row>
            <b-row
              v-show="getRedBillPagination.totalElements"
              v-else-if="props.column.field === 'GTGT'"
              class="mx-0 h7 text-brand-3 text-right"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.sumAmountGTGT) }}
            </b-row>
            <b-row
              v-show="getRedBillPagination.totalElements"
              v-else-if="props.column.field === 'totalMoney'"
              class="mx-0 h7 text-brand-3 text-right"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalInfo.sumTotalMoney) }}
            </b-row>
          </template>
          <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </div>

    <!-- START - Red Bill Modal Delete -->
    <b-modal
      v-model="isDeleteModalShow"
      title="Thông báo"
    >
      Bạn có muốn xóa các hóa đơn đỏ?
      <template #modal-footer>
        <b-button
          @click="isDeleteModalShow = false"
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
    <!-- END - Red Bill Modal Delete -->

    <!-- START - Print form -->
    <print-form-red-bills />
    <!-- END - Print form -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import commonData from '@/@db/common'
import redBillData from '@/@db/redBill'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import PrintFormRedBills from '@core/components/print-form/PrintFormRedBills.vue'
import {
  RED_INVOICE,
  RED_INVOICES_GETTER,
  GET_RED_INVOICES_ACTION,
  DELETE_RED_INVOICE_ACTION,
  EXPORT_RED_BILLS_ACTION,
  UPDATE_RED_BILLS_ACTION,
  PRINT_RED_INVOICES_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
    PrintFormRedBills,
  },

  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      searchData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },
      searchOption: {
        searchKeywords: null,
        invoiceNumber: null,
        fromDate: null,
        toDate: null,
      },
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      fromDate: earlyMonth(),
      toDate: nowDate(),

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
      invoiceNumber: '',
      customer: '',
      // select rows delete
      selectedRedBillRows: [],
      ids: null,
      isCheckAllRows: false,
      isDeleteModalShow: false,
      listRedBill: [],
      // select rows delete
      valueShowModalBillOfSaleList: false,
      templateOptionSelected: redBillData.templateOptions[1].item,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      options: redBillData.templateOptions,
      columns: [
        {
          label: 'Số hóa đơn đỏ',
          field: 'numberBill',
          sortable: false,
          width: '200px',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Tên công ty',
          field: 'company',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Mã số thuế',
          field: 'VATCode',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-1',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền hàng',
          field: 'goodsMoney',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-1',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'GTGT',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-1',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng cộng tiền',
          field: 'totalMoney',
          thClass: 'text-nowrap',
          tdClass: 'align-middle pr-1',
          sortable: false,
          type: 'number',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Ngày in',
          field: 'printDate',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
          formatFn: value => this.$formatISOtoVNI(value),
        },
        {
          label: 'Ghi chú HĐĐ đỏ',
          field: 'note',
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(RED_INVOICE, [
      RED_INVOICES_GETTER,
    ]),
    totalInfo() {
      if (this.RED_INVOICES_GETTER.info) {
        return this.RED_INVOICES_GETTER.info
      }
      return {}
    },
    getRedInvoices() {
      if (this.RED_INVOICES_GETTER.response && this.RED_INVOICES_GETTER.response.content) {
        return this.RED_INVOICES_GETTER.response.content.map(data => ({
          id: data.id,
          numberBill: data.invoiceNumber,
          company: data.officeWorking,
          address: data.officeAddress,
          VATCode: data.taxCode,
          quantity: data.totalQuantity,
          goodsMoney: data.amountNotVat,
          GTGT: data.amountGTGT,
          totalMoney: data.totalMoney,
          note: data.note,
          printDate: data.printDate,
        }))
      }
      return []
    },
    getRedBillPagination() {
      if (this.RED_INVOICES_GETTER.response) {
        return this.RED_INVOICES_GETTER.response
      }
      return {}
    },
    paginationDetailContent() {
      const { page, size } = this.searchData
      const { totalElements } = this.getRedBillPagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
  },

  watch: {
    getRedInvoices() {
      this.listRedBill = [...this.getRedInvoices]
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },

  methods: {
    ...mapActions(RED_INVOICE, [
      GET_RED_INVOICES_ACTION,
      DELETE_RED_INVOICE_ACTION,
      EXPORT_RED_BILLS_ACTION,
      UPDATE_RED_BILLS_ACTION,
      PRINT_RED_INVOICES_ACTION,
    ]),

    statusExcelButton() {
      return this.$permission('SalesRedBills', 'RedBillsExcel')
    },
    statusPrintButton() {
      return this.$permission('SalesRedBills', 'RedBillsPrint')
    },
    statusUpdateButton() {
      return this.$permission('SalesRedBills', 'RedBillsUpdate')
    },
    statusCreateButton() {
      return this.$permission('SalesRedBills', 'RedBillsCreate')
    },
    statusDeleteButton() {
      return this.$permission('SalesRedBills', 'RedBillsDelete')
    },

    onSearch() {
      this.searchOption = {
        searchKeywords: this.customer,
        invoiceNumber: this.invoiceNumber,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
        ...this.searchData,
      }
      this.searchData = { ...this.searchData, ...this.searchOption }
      this.GET_RED_INVOICES_ACTION(this.searchOption)
    },
    addSaleRedBillsCreate() {
      this.$router.push({ name: 'sales-red-bills-create' })
    },
    onClickPrintButton() {
      if (this.selectedRedBillRows && this.selectedRedBillRows.length > 0) {
        this.selectedRedBillRows.forEach(data => {
          this.PRINT_RED_INVOICES_ACTION({
            data: {
              id: data.id,
              params: { ...this.decentralization },
            },
            onSuccess: () => {},
          })
        })
        this.selectedRedBillRows = []
        this.onSearchClick()
      } else {
        toasts.error('Vui lòng chọn hoá đơn đỏ để in!')
      }
    },
    // START - Pagination func

    updateSearchData(newProps) {
      this.searchData = { ...this.searchData, ...newProps }
    },

    onSearchClick() {
      this.searchOption = {
        searchKeywords: this.customer,
        invoiceNumber: this.invoiceNumber,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData({
        // page: commonData.pageNumber - 1,
        ...this.searchOption,
      })
      this.onPaginationChange()
      this.selectedRedBillRows = []
    },
    onPaginationChange() {
      this.GET_RED_INVOICES_ACTION({ ...this.searchData })
      this.selectedRedBillRows = []
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
    // END - Pagination func
    // auto select rows when focus feld oderNumber
    focusRows(params) {
      if (params.column.field === 'numberBill') {
        this.$set(this.listRedBill[params.row.originalIndex], 'vgtSelected', true)
        if (!this.selectedRedBillRows.find(data => data.id === params.row.id)) {
          this.selectedRedBillRows.push(params.row)
        }
      }
    },
    // delete rows redbill
    selectAllRows(params) {
      if (params.selected) {
        this.selectedRedBillRows = []
        params.selectedRows.forEach(item => {
          if (!this.selectedRedBillRows.find(data => data.id === item.id)) {
            this.selectedRedBillRows.push(item)
          }
        })
        this.isCheckAllRows = true
      } else if (this.isCheckAllRows) {
        this.selectedRedBillRows = []
        this.isCheckAllRows = false
      }
    },
    selectionRow(params) {
      if (params.selected) {
        if (!this.selectedRedBillRows.find(data => data.id === params.row.id)) {
          this.selectedRedBillRows.push(params.row)
        }
      } else {
        const index = this.selectedRedBillRows.findIndex(data => data.id === params.row.id)
        this.selectedRedBillRows.splice(index, 1)
      }
      this.listRedBill.forEach((item, index) => {
        const redBillSelectedFoundIndex = this.selectedRedBillRows.findIndex(data => item.id === data.id)
        if (redBillSelectedFoundIndex > -1) {
          this.$set(this.listRedBill[index], 'vgtSelected', true)
        } else {
          this.$set(this.listRedBill[index], 'vgtSelected', false)
        }
      })
    },
    onClickDeleteButton() {
      if (this.selectedRedBillRows && this.selectedRedBillRows.length > 0) {
        this.ids = this.selectedRedBillRows.length === 1 ? this.selectedRedBillRows[0].id : this.selectedRedBillRows.reduce((prev, curr) => `${prev.id ? prev.id : prev},${curr.id}`)
        this.isDeleteModalShow = !this.isDeleteModalShow
      } else {
        toasts.error('Xin vui lòng chọn hóa đơn muốn xóa!')
      }
    },
    confirmDelete() {
      this.isDeleteModalShow = !this.isDeleteModalShow
      this.DELETE_RED_INVOICE_ACTION({
        data: {
          ids: this.ids,
          ...this.decentralization,
        },
        onSuccess: () => {
          this.selectedRedBillRows.forEach(item => {
            const findIndex = this.listRedBill.findIndex(e => e.id === item.id)
            this.listRedBill.splice(findIndex, 1)
          })
          this.getRedBillPagination.totalElements -= this.selectedRedBillRows.length
          this.selectedRedBillRows = []
        },
      })
    },
    onClickExportRedBills() {
      if (this.selectedRedBillRows && this.selectedRedBillRows.length > 0) {
        this.EXPORT_RED_BILLS_ACTION({
          ids: this.selectedRedBillRows.map(data => data.id).join(','),
          type: this.templateOptionSelected,
          ...this.decentralization,
        })
      } else {
        toasts.error('Xin vui lòng chọn hóa đơn muốn xuất')
      }
    },
    onClickUpdateRedBills() {
      this.selectedRedBillRows.forEach((data, index) => {
        this.selectedRedBillRows[index].numberBill = this.listRedBill.find(item => item.id === data.id).numberBill
      })
      const redInvoiceRequests = this.selectedRedBillRows.map(data => ({
        id: data.id,
        invoiceNumber: data.numberBill,
      }))
      this.UPDATE_RED_BILLS_ACTION({
        redInvoiceRequests,
        onSuccess: () => {
          this.onSearchClick()
        },
      })
      this.selectedRedBillRows = []
    },
  },
}
</script>
<style>
.style-width {
  width: max-content;
  max-width: 300px;
  word-wrap: break-word;
}
</style>
