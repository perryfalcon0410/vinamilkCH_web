<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <b-card
      no-body
      class="mb-1"
    >
      <!-- Start Button Option Search -->
      <label
        for="v-search-form"
        class="text-primary m-1"
      >
        Tìm kiếm
      </label>
      <!-- End Button Option Search -->

      <!-- START - Search -->
      <b-card-body>
        <b-form-row
          class="border-top"
        >
          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <div>
              {{ 'Khách hàng' }}
            </div>
            <b-form-input
              v-model="customer"
              trim
            />
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <div>
              {{ 'Số hóa đơn' }}
            </div>
            <b-form-input
              v-model="invoiceNumber"
              trim
            />
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Từ ngày
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <vue-flat-pickr
                id="form-input-date-from"
                v-model="fromDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
                data-toggle
              >
                <b-icon-calendar />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Đến ngày
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <vue-flat-pickr
                id="form-input-date-to"
                v-model="toDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                placeholder="Chọn ngày"
              />
              <b-input-group-append
                is-text
                data-toggle
              >
                <b-icon-calendar />
              </b-input-group-append>
            </b-input-group>
          </b-col>

          <b-col
            xl
            sm="4"
            md="3"
            class="mt-1"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                variant="primary"
                @click="onSearchClick()"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-card-body>
      <!-- END - Search -->

    </b-card>
    <!-- END - Search -->

    <b-form class=" bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary w-25">
          Danh sách hóa đơn đỏ
        </label>

        <!-- Start Button Head -->
        <b-button-group>
          <b-form-radio-group
            v-model="templateOptionSelected"
            :options="options"
            class="mt-1 "
            value-field="item"
            text-field="name"
          />
          <b-button
            class="rounded"
            variant="danger"
          >
            <b-icon-printer-fill />
            IN HĐ
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
            @click="onClickExportRedBills"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
          >
            <b-icon-arrow-clockwise />
            Cập nhật HĐ
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
            @click="addSaleRedBillsCreate"
          >
            <b-icon-plus />
            Thêm mới
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
            @click="onClickDeleteButton"
          >
            <b-icon-trash />
            Xóa
          </b-button>
        </b-button-group>
        <!-- End Button Head -->
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="listRedBill"
          class="pb-1"
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
                  class="mx-1 mt-1 mb-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong {{ redBillPagination.totalElements }} mục </span>
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
import commonData from '@/@db/common'
import redBillData from '@/@db/redBill'
import { reverseVniDate, formatISOtoVNI } from '@/@core/utils/filter'
import {
  RED_INVOICE,
  RED_INVOICES_GETTER,
  GET_RED_INVOICES_ACTION,
  DELETE_RED_INVOICE_ACTION,
  EXPORT_RED_BILLS_ACTION,
} from '../store-module/type'

export default {
  components: {
  },
  data() {
    return {
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
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
      this.EXPORT_RED_BILLS_ACTION({
        ids: this.selectedRedBillRows.map(data => data.id).join(','),
        type: this.templateOptionSelected,
        formId: 1,
        ctrlId: 1,
      })
    },
  },
}
</script>
