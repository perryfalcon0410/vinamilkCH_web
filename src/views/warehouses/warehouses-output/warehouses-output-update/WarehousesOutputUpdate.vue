<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <b-row class="mx-0">
      <!-- START - Form -->
      <b-col
        xl="4"
        class="bg-white shadow rounded mr-xl-1"
      >
        <!-- START - Date -->
        <b-row class="my-1">
          <b-col cols="4">
            Ngày xuất:
          </b-col>
          <b-col class="font-weight-bold">
            <strong>{{ warehousesOutput.outputDate }} lúc {{ warehousesOutput.outputTime }}</strong>
          </b-col>
        </b-row>
        <!-- END - Date -->

        <!-- START - ID and Type -->
        <b-form-row>
          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              Mã xuất hàng
            </div>
            <b-form-input
              v-model.trim="warehousesOutput.code"
              maxlength="40"
              disabled
            />
          </b-col>

          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              Loại xuất
            </div>
            <tree-select
              v-model="warehousesOutput.receiptType"
              :options="warehousesOptions"
              :searchable="false"
              no-options-text="Không có dữ liệu"
              disabled
            />
          </b-col>
        </b-form-row>
        <!-- END - ID and Type -->

        <!-- START -  Stock  -->
        <div class="mt-sm-1 mt-xl-0">
          Kho hàng
        </div>
        <b-form-input
          id="stock"
          v-model.trim="warehousesOutput.wareHouseTypeName"
          maxlength="40"
          disabled
        />
        <!-- END -  Stock  -->

        <!-- START - Bill Number and Date -->
        <b-form-row>
          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              Số hóa đơn
            </div>
            <b-form-input
              v-model.trim="warehousesOutput.redInvoiceNo"
              :state="touched ? passed : null"
              disabled
            />
          </b-col>

          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              Ngày hoá đơn
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <vue-flat-pickr
                v-model="warehousesOutput.transDate"
                :config="configDate"
                class="form-control h8 text-brand-3"
                disabled
              />
            </b-input-group>
          </b-col>
        </b-form-row>
        <!-- END -   Bill Number and Date -->

        <!-- START -   Internal number and PO no -->
        <b-form-row>
          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              Số nội bộ
            </div>
            <b-form-input
              v-model.trim="warehousesOutput.internalNumber"

              :state="touched ? passed : null"
              disabled
            />
          </b-col>

          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              PO No
            </div>
            <b-input-group class="input-group-merge">
              <b-form-input
                v-model.trim="warehousesOutput.poNumber"
                :state="warehousesOutput.type === '1' && touched ? passed : null"
                disabled
              />
              <b-input-group-append is-text>
                <b-icon-three-dots-vertical />
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-form-row>
        <!-- END - Internal number and PO no -->

        <!-- START - Note -->
        <div class="mt-sm-1 mt-xl-0">
          Ghi chú
        </div>
        <b-form-textarea
          v-model="warehousesOutput.note"
          maxlength="4000"
          class="mb-1"
          :disabled="isDisableSave"
        />
        <!-- END - Note -->
      </b-col>
      <!-- END - Form -->

      <!-- START - List -->
      <b-col
        class="bg-white shadow rounded mt-1 mt-xl-0"
      >
        <div style="padding: 5px 0;">
          <strong class="text-brand-1">
            Danh sách sản phẩm
          </strong>
        </div>

        <!-- START - Table Product promotion -->
        <vue-good-table
          :columns="columns"
          :rows="warehousesOutput.products"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
        >

          <!-- START - Header slot -->
          <div slot="table-actions">
            <b-form-checkbox
              class="mx-1"
              :disabled="isDisableSave"
            >
              Trả nguyên đơn
            </b-form-checkbox>
          </div>
          <!-- END - Header slot -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'productReturnAmount'"
            >
              <div v-if="warehousesOutput.receiptType == warehousesOptions[0].id">
                <b-form-input
                  v-model="warehousesOutput.products[props.row.originalIndex].productReturnAmount"
                  size="sm"
                  :disabled="isDisableSave"
                  @keypress="$onlyNumberInput"
                />
              </div>
              <div v-else>
                <b-form-input
                  v-model="warehousesOutput.products[props.row.originalIndex].productReturnAmount"
                  size="sm"
                  disabled
                  @keypress="$onlyNumberInput"
                />
              </div>
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
        </vue-good-table>
        <!-- END - Table Product -->

        <!-- START - Button -->
        <b-row
          class="my-1 mx-0"
          align-v="center"
          align-h="end"
        >
          <b-button
            variant="someThing"
            class="align-items-button-center btn-brand-1 text-uppercase"
            :hidden="isDisableSave"
            @click="onClickUpdateWarehousesOutput"
          >
            <b-icon-download
              class="mr-05"
            />
            Lưu
          </b-button>

          <b-button
            class="align-items-button-center text-uppercase ml-1"
            @click="navigateBack"
          >
            <b-icon-x
              scale="1.5"
              class="mr-05"
            />
            Đóng
          </b-button>
        </b-row>
        <!-- END - Button -->

      </b-col>
      <!-- END - List -->

    </b-row>
    <!-- END - Form and list -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import warehousesData from '@/@db/warehouses'
import {
  getTimeOfDate, formatISOtoVNI,
} from '@/@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
import {
  WAREHOUSES_OUTPUT,
  // Getter
  GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
  // Action
  GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
  UPDATE_WAREHOUSES_OUTPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
  },
  data() {
    return {
      warehousesOptions: warehousesData.outputTypes,
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giá',
          field: 'productPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng trả',
          field: 'productReturnAmount',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],

      warehousesOutput: {
        id: `${this.$route.params.id}`,
        receiptType: `${this.$route.params.type}`,
        code: '',
        type: '',
        wareHouseTypeId: '',
        wareHouseTypeName: '',
        redInvoiceNo: '', // số hoá đơn
        internalNumber: '', // số nội bộ
        poNumber: '',
        note: '',
        transDate: null,
        products: [],
        outputTime: '',
        outputDate: '',
      },
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      formId: 5,
      ctrlId: 7,
      isDisableSave: false,
    }
  },
  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
      GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
    ]),
    getWarehousesOutput() {
      return this.GET_WAREHOUSES_OUTPUT_BY_ID_GETTER
    },
    getProductOfWarehouseOutput() {
      return this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER.map(data => ({
        productID: data.id,
        productCode: data.productCode,
        productPrice: this.$formatNumberToLocale(data.price),
        productName: data.productName,
        productDVT: data.unit,
        productPriceTotal: this.$formatNumberToLocale(data.totalPrice),
        productQuantity: data.quantity - data.export,
        productReturnAmount: data.quantity,
      }))
    },
  },
  watch: {
    getWarehousesOutput() {
      const dataWarehousesOutput = { ...this.getWarehousesOutput }

      this.warehousesOutput.id = dataWarehousesOutput.id
      this.warehousesOutput.code = dataWarehousesOutput.transCode
      this.warehousesOutput.type = dataWarehousesOutput.type
      this.warehousesOutput.wareHouseTypeId = Number(this.warehousesOutput.wareHouseTypeId)
      this.warehousesOutput.wareHouseTypeName = dataWarehousesOutput.wareHouseTypeName
      this.warehousesOutput.redInvoiceNo = dataWarehousesOutput.redInvoiceNo // số hoá đơn
      this.warehousesOutput.internalNumber = dataWarehousesOutput.internalNumber // số nội bộ
      this.warehousesOutput.poNumber = dataWarehousesOutput.poNumber
      this.warehousesOutput.note = dataWarehousesOutput.note
      this.warehousesOutput.transDate = formatISOtoVNI(dataWarehousesOutput.transDate)
      this.warehousesOutput.products = [...this.getProductOfWarehouseOutput]

      if (this.warehousesOutput.receiptType === warehousesData.outputTypes[0].id) {
        this.warehousesOutput.outputDate = formatISOtoVNI(dataWarehousesOutput.orderDate)
        this.warehousesOutput.outputTime = getTimeOfDate(formatISOtoVNI(dataWarehousesOutput.orderDate))
      } else if (this.warehousesOutput.receiptType === warehousesData.outputTypes[1].id) {
        this.warehousesOutput.outputDate = formatISOtoVNI(dataWarehousesOutput.adjustmentDate)
        this.warehousesOutput.outputTime = getTimeOfDate(formatISOtoVNI(dataWarehousesOutput.adjustmentDate))
      } else {
        this.warehousesOutput.outputDate = formatISOtoVNI(dataWarehousesOutput.borrowDate)
        this.warehousesOutput.outputTime = getTimeOfDate(formatISOtoVNI(dataWarehousesOutput.borrowDate))
      }

      // enable or disable button save
      this.isDisableSave = this.warehousesOutput.outputDate !== this.$nowDate
      console.log(this.isDisableSave)
    },
  },
  mounted() {
    const paramGetDetailsWarehousesOutput = {
      id: this.warehousesOutput.id,
      type: this.warehousesOutput.receiptType,
      // formId: this.formId,
      // ctrlId: this.ctrlId,
    }
    this.GET_WAREHOUSES_OUTPUT_BY_ID_ACTION(paramGetDetailsWarehousesOutput)
    this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION(paramGetDetailsWarehousesOutput)
    console.log(this.warehousesOutput.id)
  },
  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
      GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
      UPDATE_WAREHOUSES_OUTPUT_ACTION,
    ]),
    navigateBack() {
      this.$router.back()
    },
    onClickUpdateWarehousesOutput() {
      if (this.productReturnAmount < this.productQuantity) {
        const products = this.warehousesOutput.products.map(data => ({
          id: data.productID,
          quantity: data.productReturnAmount,
        }))

        const updateWarehouseOutput = {
          id: this.warehousesOutput.id,
          type: this.warehousesOutput.receiptType,
          note: this.warehousesOutput.note,
          listProductRemain: products,
        }
        this.UPDATE_WAREHOUSES_OUTPUT_ACTION(updateWarehouseOutput)
        this.$router.back()
      } else toasts.error('Số lượng trả phải nhỏ hơn số lượng sản phẩm!')
    },
  },
}
</script>
