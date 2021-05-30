<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <b-form>
      <v-card-actions
        title="Tìm kiếm"
      >
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div>
            Khách hàng
          </div>
          <b-form-input
            v-model="customer"
            class="h8"
            placeholder="Nhập Mã/SĐT/Tên khách hàng"
            @keyup.enter="onSearchClick"
          />
        </b-col>
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div>
            Số hóa đơn
          </div>
          <b-form-input
            v-model="invoiceNumber"
            trim
            class="h8"
            placeholder="Nhập số hóa đơn"
            @keyup.enter="onSearchClick"
          />
        </b-col>
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 mt-lg-1 mt-xl-0"
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
              :config="configDate"
              class="form-control h8"
              placeholder="Chọn ngày"
            />
          </b-row>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
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
              :config="configDate"
              class="form-control h8"
              placeholder="Chọn ngày"
            />
          </b-row>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 text-white"
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
            <b-icon-search class="mr-05" />
            Tìm kiếm
          </b-button>
        </b-col>
      </v-card-actions>
    </b-form>
    <!-- END - Search -->

    <b-form class="bg-white rounded shadow my-1">
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
            variant="danger"
            class="align-items-button-center h8"
          >
            <b-icon-printer-fill class="mr-05" />
            IN HĐ
          </b-button>
          <b-button
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickExportRedBills"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất Excel
          </b-button>
          <b-button
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickUpdateRedBills"
          >
            <b-icon-arrow-clockwise
              class="mr-05"
              scale="1.2"
            />
            Cập nhật HĐ
          </b-button>
          <b-button
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="addSaleRedBillsCreate"
          >
            <b-icon-plus
              class="mr-05"
              scale="1.8"
            />
            Thêm mới
          </b-button>
          <b-button
            class="align-items-button-center h8 ml-1 btn-brand-1"
            variant="someThing"
            @click="onClickDeleteButton"
          >
            <b-icon-trash class="mr-05" />
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
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          line-numbers
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
              v-show="redBillPagination.totalElements"
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
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="redBillPagination.totalElements"
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
          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'numberBill'">
              <b-input
                v-model="props.row.numberBill"
                maxlength="50"
                :value="props.row.numberBill"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>

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
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import commonData from '@/@db/common'
import redBillData from '@/@db/redBill'
import { reverseVniDate, formatISOtoVNI } from '@/@core/utils/filter'
import {
  RED_INVOICE,
  RED_INVOICES_GETTER,
  GET_RED_INVOICES_ACTION,
  DELETE_RED_INVOICE_ACTION,
  EXPORT_RED_BILLS_ACTION,
  UPDATE_RED_BILLS_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      fromDate: null,
      toDate: null,
      invoiceNumber: '',
      customer: '',
      redBillPagination: {},
      // select rows delete
      selectedRedBillRows: [],
      ids: null,
      isCheckAllRows: false,
      isDeleteModalShow: false,
      listRedBill: [],
      // select rows delete
      valueShowModalBillOfSaleList: false,
      templateOptionSelected: redBillData.templateOptions[0].item,
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
        },
        {
          label: 'Tên công ty',
          field: 'company',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
        },
        {
          label: 'Mã số thuế',
          field: 'VATCode',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'amount',
          sortable: false,
        },
        {
          label: 'Tiền hàng',
          field: 'goodsMoney',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'GTGT',
          sortable: false,
        },
        {
          label: 'Tổng cộng tiền',
          field: 'totalMoney',
          sortable: false,
        },
        {
          label: 'Ngày in',
          field: 'printDate',
          sortable: false,
        },
        {
          label: 'Ghi chú HĐĐ đỏ',
          field: 'note',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(RED_INVOICE, [
      RED_INVOICES_GETTER,
    ]),
    info() {
      return this.RED_INVOICES_GETTER.info
    },
    getRedInvoices() {
      if (this.RED_INVOICES_GETTER.redInvoices) {
        return this.RED_INVOICES_GETTER.redInvoices.map(data => ({
          id: data.id,
          numberBill: data.invoiceNumber,
          company: data.officeWorking,
          address: data.officeaddress,
          VATCode: data.taxCode,
          amount: this.$formatNumberToLocale(data.totalQuantity),
          goodsMoney: this.$formatNumberToLocale(data.totalMoney),
          GTGT: this.$formatNumberToLocale(data.amountGTGT),
          totalMoney: this.$formatNumberToLocale(data.amountNotVat),
          note: data.note,
          printDate: formatISOtoVNI(data.printDate),
        }))
      }
      return []
    },
    getRedBillPagination() {
      return this.RED_INVOICES_GETTER.redBillPagination
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.elementSize) - this.elementSize + 1
      const maxPageSize = (this.elementSize * this.pageNumber) > this.redBillPagination.totalElements
        ? this.redBillPagination.totalElements : (this.elementSize * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.redBillPagination.totalElements} mục`
    },
  },
  watch: {
    getRedInvoices() {
      this.listRedBill = [...this.getRedInvoices]
    },
    getRedBillPagination() {
      this.redBillPagination = [...this.getRedBillPagination]
    },
    pageNumber() {
      this.onPaginationChange()
    },
    elementSize() {
      this.onPaginationChange()
    },
  },
  mounted() {
    this.GET_RED_INVOICES_ACTION({
      formId: 1,
      ctrlId: 7,
    })
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
  },
  methods: {
    ...mapState(RED_INVOICE, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapActions(RED_INVOICE, [
      GET_RED_INVOICES_ACTION,
      DELETE_RED_INVOICE_ACTION,
      EXPORT_RED_BILLS_ACTION,
      UPDATE_RED_BILLS_ACTION,
    ]),
    addSaleRedBillsCreate() {
      this.$router.push({ name: 'sales-red-bills-create' })
    },
    onPaginationChange() {
      const searchStr = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        searchKeywords: this.customer,
        invoiceNumber: this.invoiceNumber,
      }

      this.GET_RED_INVOICES_ACTION({
        ...searchStr,
        size: this.elementSize,
        page: this.pageNumber - 1,
        formId: 1,
        ctrlId: 7,
      })
    },
    onSearchClick() {
      const searchStr = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        searchKeywords: this.customer,
        invoiceNumber: this.invoiceNumber,
      }

      this.GET_RED_INVOICES_ACTION({
        ...searchStr,
        formId: 1,
        ctrlId: 7,
      })
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
      this.DELETE_RED_INVOICE_ACTION({ ids: this.ids })
      this.selectedRedBillRows.forEach(item => {
        const findIndex = this.listRedBill.findIndex(e => e.id === item.id)
        this.listRedBill.splice(findIndex, 1)
      })
      this.redBillPagination.totalElements -= this.selectedRedBillRows.length
      this.selectedRedBillRows = []
    },
    onClickExportRedBills() {
      if (this.selectedRedBillRows && this.selectedRedBillRows.length > 0) {
        this.EXPORT_RED_BILLS_ACTION({
          ids: this.selectedRedBillRows.map(data => data.id).join(','),
          type: this.templateOptionSelected,
          formId: 1,
          ctrlId: 1,
        })
      } else {
        toasts.error('Xin vui lòng chọn hóa đơn muốn xuất')
      }
    },
    onClickUpdateRedBills() {
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
    },
  },
}
</script>
