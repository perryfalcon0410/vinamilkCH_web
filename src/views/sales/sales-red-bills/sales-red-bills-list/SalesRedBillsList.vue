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
            v-model="selected"
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
          :rows="redInvoices"
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
          }"
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
                > trong {{ paging.totalElements }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="paging.totalElements"
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
    </b-form>
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import commonData from '@/@db/common'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  REDINVOICE,
  REDINVOICES_GETTER,
  GET_REDINVOICES_ACTION,
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
      valueShowModalBillOfSaleList: false,
      selected: 'A',
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      options: [
        { item: 'A', name: 'Mẫu DVKH' },
        { item: 'B', name: 'Mẫu HĐĐT' },
      ],
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
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Ghi chú HĐĐ đỏ',
          field: 'noteHĐĐ',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    info() {
      return this.REDINVOICES_GETTER().info
    },
    redInvoices() {
      return this.REDINVOICES_GETTER().redInvoices.map(data => ({
        id: data.id,
        numberBill: data.invoiceNumber,
        company: data.officeWorking,
        address: data.officeaddress,
        VATCode: data.taxCode,
        amount: Number(data.totalQuantity).toLocaleString('vi-VN'),
        goodsMoney: Number(data.totalMoney).toLocaleString('vi-VN'),
        GTGT: Number(data.amountGTGT).toLocaleString('vi-VN'),
        totalMoney: Number(data.amountNotVat).toLocaleString('vi-VN'),
        noteHĐĐ: data.note,
      }))
    },
    paging() {
      return this.REDINVOICES_GETTER().paging
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
    this.GET_REDINVOICES_ACTION({
      formId: 1,
      ctrlId: 7,
    })
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
  },
  methods: {
    ...mapState(REDINVOICE, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(REDINVOICE, [
      REDINVOICES_GETTER,
    ]),
    ...mapActions(REDINVOICE, [
      GET_REDINVOICES_ACTION,
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

      this.GET_REDINVOICES_ACTION({
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

      this.GET_REDINVOICES_ACTION({
        ...searchStr,
        formId: 1,
        ctrlId: 7,
      })
    },
  },
}
</script>
