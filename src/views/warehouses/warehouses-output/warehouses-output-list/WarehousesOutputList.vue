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
            label-for="redInvoiceNo"
          >
            <b-form-input
              id="redInvoiceNo"
              v-model="searchOptions.redInvoiceNo"
              maxlength="20"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          lg="2"
          md
        >
          <validation-provider
            v-slot="{ errors }"
            rules="dateFormatVNI"
          >
            <b-form-group
              label="Từ ngày"
              label-for="form-input-date-from"
            >
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
                  v-model="searchOptions.fromDate"
                  :config="configDate"
                  class="form-control"
                  placeholder="chọn ngày"
                />
              </b-input-group>
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="2"
          md
        >
          <validation-provider
            v-slot="{ errors }"
            rules="dateFormatVNI"
          >
            <b-form-group
              label="Đến ngày"
              label-for="form-input-date-to"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend
                  is-text
                  data-toggle
                >
                  <b-icon-calendar />
                </b-input-group-prepend>
                <vue-flat-pickr
                  id="form-input-date-from"
                  v-model="searchOptions.toDate"
                  :config="configDate"
                  class="form-control"
                  placeholder="chọn ngày"
                />
              </b-input-group>
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Loại xuất"
            label-for="type"
          >
            <v-select
              id="type"
              v-model="warehousesTypeSelected"
              :options="warehousesOptions"
              label="name"
              placeholder="Tất cả"
            />
          </b-form-group>
        </b-col>

        <b-col
          md="12"
          lg="4"
        >
          <b-form-group
            class="ml-lg-1"
            label="Tìm kiếm"
            label-for="searchButton"
          >
            <b-button
              id="searchButton"
              variant="primary"
              @click="onClickSearchWarehousesOutput"
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
          Danh sách phiếu xuất hàng
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
          :rows="warehousesOutputList"
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
              align-h="center"
            >
              <div v-show="props.index > 0">
                <b-button
                  variant="light"
                  class="rounded-circle p-1 ml-1"
                  @click="onClickPrintButton(props.index)"
                >
                  <b-icon-printer
                    color="blue"
                  />
                </b-button>
                <b-button
                  variant="light"
                  class="rounded-circle ml-1 p-1"
                  @click="onClickUpdateButton(props.row.id,props.row.type)"
                >
                  <b-icon-pencil-fill
                    color="blue"
                  />
                </b-button>
                <b-button
                  v-b-modal.DeleteModal
                  variant="light"
                  class="rounded-circle ml-1 p-1"
                >
                  <b-icon-trash-fill
                    color="red"
                  />
                </b-button>
              </div>
            </b-row>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product  list -->

    <!-- START - Product Modal Delete -->
    <b-modal
      id="deleteModal"
      title="Thông báo"
    >
      Bạn có muốn xóa đợt xuất hàng?
    </b-modal>
    <!-- END - Product Modal Delete -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import { reverseVniDate, formatDateToLocale, formatNumberToLocale } from '@/@core/utils/filter'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import warehousesData from '@/@db/warehouses'

import {
  WAREHOUSES_OUTPUT,
  GET_WAREHOUSES_OUTPUT_LIST_GETTER,
  GET_WAREHOUSES_OUTPUT_LIST_ACTION,
  PRINT_WAREHOUSES_OUTPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      dateFormatVNI,
      inputValueBillNumber: '',
      warehousesTypeSelected: null,
      warehousesOptions: warehousesData.outputTypes,
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
        },
        {
          label: 'Mã xuất hàng',
          field: 'code',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'price',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
        },
      ],
      searchOptions: {
        redInvoiceNo: '', // số hóa đơn
        fromDate: '',
        toDate: '',
        type: '',
        pageSize: 10,
        pageNumber: 1,
      },
      warehousesOutputList: [],
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
    }
  },
  computed: {
    getWarehousesOutputList() {
      const datas = this.GET_WAREHOUSES_OUTPUT_LIST_GETTER()
      const totalQuantity = datas.reduce((accum, item) => accum + Number(item.totalQuantity), 0)
      const totalMoney = datas.reduce((accum, item) => accum + Number(item.totalAmount), 0)
      const firstItem = {
        id: '',
        transDate: '',
        transCode: '',
        redInvoiceNo: '',
        internalNumber: '',
        totalQuantity,
        totalAmount: totalMoney,
        note: '',
      }
      datas.unshift(firstItem)
      return datas.map(data => ({
        id: data.id,
        date: data.transDate === '' ? '' : formatDateToLocale(data.transDate),
        code: data.transCode,
        billNumber: data.redInvoiceNo,
        internalNumber: data.internalNumber,
        quantity: formatNumberToLocale(Number(data.totalQuantity)),
        price: formatNumberToLocale(Number(data.totalAmount)),
        note: data.note,
        feature: 'Chỉnh sửa',
        type: data.receiptType,
      }))
    },
  },
  watch: {
    getWarehousesOutputList() {
      this.warehousesOutputList = [...this.getWarehousesOutputList]
    },
  },
  mounted() {
    this.GET_WAREHOUSES_OUTPUT_LIST_ACTION(this.searchOptions)
  },
  methods: {
    ...mapState(WAREHOUSES_OUTPUT, {
      successStatusDelete: state => state.delete.success,
    }),
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_LIST_ACTION,
      PRINT_WAREHOUSES_OUTPUT_ACTION,
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
      this.searchOptions.type = this.warehousesTypeSelected
      this.searchOptions.fromDate = reverseVniDate(this.searchOptions.fromDate)
      this.searchOptions.toDate = reverseVniDate(this.searchOptions.toDate)
      this.GET_WAREHOUSES_OUTPUT_LIST_ACTION(this.searchOptions)
      this.warehousesOutputList = this.GET_WAREHOUSES_OUTPUT_LIST_GETTER()
    },
  },
}
</script>
