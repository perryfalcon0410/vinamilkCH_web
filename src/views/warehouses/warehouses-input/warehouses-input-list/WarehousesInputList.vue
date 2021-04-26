<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <div
        class="m-1 text-primary"
      >
        <strong>
          Tìm kiếm
        </strong>
      </div>

      <b-form-row
        class="border-top p-1"
      >
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Số hóa đơn"
            label-for="RedInvoiceNo"
          >
            <b-form-input
              id="RedInvoiceNo"
              v-model="billNumber"
              maxlength="20"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Từ ngày"
            label-for="FromDate"
          >
            <b-form-datepicker
              id="FromDate"
              v-model="fromDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Đến ngày"
            label-for="ToDate"
          >
            <b-form-datepicker
              id="ToDate"
              v-model="toDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Loại nhập"
            label-for="InputType"
          >
            <b-form-select
              id="InputType"
              v-model="inputTypes"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="1">
                Nhập hàng
              </b-form-select-option>
              <b-form-select-option value="2">
                Nhập điều chỉnh
              </b-form-select-option>
              <b-form-select-option value="3">
                Nhập vay mượn
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col
          md="12"
          lg="4"
        >
          <b-form-group
            class="ml-lg-1"
            label="Tìm kiếm"
            label-for="SearchButton"
          >
            <b-button
              id="SearchButton"
              variant="primary"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>

      </b-form-row>
    </b-form>
    <!-- END - Search -->

    <!-- START - Product  list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <strong
          class="text-primary"
        >
          Danh sách phiếu nhập hàng
        </strong>
        <b-button
          class="rounded"
          size="md"
          variant="primary"
          @click="onClickCreateButton"
        >
          <b-icon-plus />
          Thêm mới
        </b-button>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          :columns="columns"
          :rows="receipts"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
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
              v-if="props.column.field === 'Feature'"
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
              v-if="props.column.field === 'Feature'"
              align-h="center"
            >
              <b-button
                variant="light"
                class="rounded-circle p-1 ml-1"
                @click="onClickPrintButton(props.row.id)"
              >
                <b-icon-printer
                  color="blue"
                />
              </b-button>
              <b-button
                variant="light"
                class="rounded-circle ml-1 p-1"
                @click="onClickUpdateButton"
              >
                <b-icon-pencil-fill
                  color="blue"
                />
              </b-button>
              <b-button
                variant="light"
                class="rounded-circle ml-1 p-1"
                @click="onClickDeleteButton(props.row.TransDate)"
              >
                <b-icon-trash-fill
                  color="red"
                />
              </b-button>
            </b-row>
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
              v-if="props.column.field === 'Quantity'"
              class="mx-0"
              align-h="end"
            >
              6800
            </b-row>

            <b-row
              v-else-if="props.column.field === 'Price'"
              class="mx-0"
              align-h="end"
            >
              250.300.000
            </b-row>
          </template>
          <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product  list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      v-model="isDeleteModalShow"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt nhập hàng?
    </b-modal>
    <!-- END - Product Modal Delete -->
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { formatDateToLocale } from '@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
import {
  WAREHOUSEINPUT,
  // GETTERS
  RECEIPTS_GETTER,
  // ACTIONS
  GET_RECEIPTS_ACTION,
  EXPORT_RECEIPTS_ACTION,
} from '../store-module/type'

export default {
  data() {
    return {
      isDeleteModalShow: false,

      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      billNumber: '',
      inputTypes: '',

      columns: [
        {
          label: 'Ngày',
          field: 'TransDate',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'TransCode',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'RedInvoiceNo',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'InternalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'Price',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'Note',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'Feature',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    receipts() {
      return this.RECEIPTS_GETTER().map(data => ({
        id: data.id,
        TransDate: formatDateToLocale(data.transDate),
        TransCode: data.TransCode,
        RedInvoiceNo: data.redInvoiceNo,
        InternalNumber: data.internalNumber,
        Quantity: data.totalQuantity,
        Price: data.totalAmount,
        Note: data.note,
        Feature: '',
      }))
    },
  },

  mounted() {
    this.GET_RECEIPTS_ACTION()
  },

  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      RECEIPTS_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
      EXPORT_RECEIPTS_ACTION,
    ]),

    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-input-update' })
    },
    onClickPrintButton(id) {
      this.EXPORT_RECEIPTS_ACTION(id)
    },
    onClickDeleteButton(date) {
      if (date === formatDateToLocale(new Date())) {
        this.isDeleteModalShow = !this.isDeleteModalShow
      } else {
        toasts.error('Đã quá thời hạn chỉnh sửa')
      }
    },
  },
}
</script>
