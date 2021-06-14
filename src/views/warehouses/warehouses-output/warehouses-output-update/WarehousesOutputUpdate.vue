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
            <strong>{{ warehousesOutput.transDate }} lúc {{ warehousesOutput.transTime }}</strong>
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
            <div class="d-flex align-items-center">
              <tree-select
                v-model="warehousesOutput.receiptType"
                :options="warehousesOptions"
                :searchable="false"
                no-options-text="Không có dữ liệu"
                disabled
              />
              <b-input-group-append>
                <b-icon-three-dots-vertical
                  v-b-popover.hover.right="'Chọn phiếu xuất'"
                  scale="1.4"
                  class="cursor-pointer"
                  :disabled="warehousesOutput.receiptType === warehousesOptions[0].id"
                  @click="showModal()"
                />
              </b-input-group-append>
            </div>
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
                v-model="warehousesOutput.orderDate"
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
              :disabled="warehousesOutput.receiptType !== warehousesOptions[0].id"
            />
          </b-col>

          <b-col>
            <div class="mt-sm-1 mt-xl-0">
              PO No
            </div>
            <b-input-group class="input-group-merge">
              <b-form-input
                v-model.trim="warehousesOutput.pocoNumber"
                :state="warehousesOutput.type === '1' && touched ? passed : null"
                disabled
              />
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
          :rows="getProductOfWarehouseOutput"
          style-class="vgt-table striped"
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
          <!-- START - Header slot -->
          <div slot="table-actions">
            <b-form-checkbox
              v-model="exportAll"
              class="m-1"
              disabled
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
                  v-model="getProductOfWarehouseOutput[props.row.originalIndex].productReturnAmount"
                  size="sm"
                  :disabled="isDisableSave"
                  @keypress="$onlyNumberInput"
                  @change="changeQuantity"
                />
              </div>
              <div v-else>
                <b-form-input
                  v-model="getProductOfWarehouseOutput[props.row.originalIndex].productReturnAmount"
                  size="sm"
                  disabled
                  @keypress="$onlyNumberInput"
                  @change="changeQuantity"
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
            :hidden="isDisableSave && warehousesOutput.receiptType !== warehousesOptions[0].id"
            @click="onClickUpdateWarehousesOutput"
          >
            <b-icon-download
              class="mr-50"
            />
            Lưu
          </b-button>

          <b-button
            class="align-items-button-center text-uppercase ml-1"
            @click="navigateBack"
          >
            <b-icon-x
              scale="1.5"
              class="mr-50"
            />
            Đóng
          </b-button>
        </b-row>
        <!-- END - Button -->

      </b-col>
      <!-- END - List -->

    </b-row>
    <!-- END - Form and list -->
    <!-- START - Modal -->
    <adjustment-modal
      @choonsenTrans="dataFromAdjustment($event)"
    />
    <borrowed-modal
      @choonsenTrans="dataFromBorrow($event)"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex'
import warehousesData from '@/@db/warehouses'
import {
  getTimeOfDate, formatISOtoVNI,
} from '@/@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'
import {
  WAREHOUSES_OUTPUT,
  // Getter
  GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
  // MUTATIONS
  CLEAR_EXPORT_PRODUCTS_MUTATION,
  // Action
  GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
  UPDATE_WAREHOUSES_OUTPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
  },
  data() {
    return {
      warehousesOptions: warehousesData.outputTypes,
      exportAll: true,
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'productQuantity',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'productPrice',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
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
        pocoNumber: '',
        note: '',
        transDate: null,
        transTime: null,
        products: [],
        orderDate: '',
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
        productQuantity: data.quantity,
        productReturnAmount: data.export,
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
      this.warehousesOutput.pocoNumber = dataWarehousesOutput.pocoNumber
      this.warehousesOutput.note = dataWarehousesOutput.note
      this.warehousesOutput.transDate = formatISOtoVNI(dataWarehousesOutput.transDate)
      this.warehousesOutput.transTime = getTimeOfDate(dataWarehousesOutput.transDate)

      if (this.warehousesOutput.receiptType === warehousesData.outputTypes[0].id) {
        this.warehousesOutput.orderDate = formatISOtoVNI(dataWarehousesOutput.orderDate)
      } if (this.warehousesOutput.receiptType === warehousesData.outputTypes[1].id) {
        this.warehousesOutput.orderDate = formatISOtoVNI(dataWarehousesOutput.adjustmentDate)
      } if (this.warehousesOutput.receiptType === warehousesData.outputTypes[2].id) {
        this.warehousesOutput.orderDate = formatISOtoVNI(dataWarehousesOutput.borrowDate)
      }

      // enable or disable button save
      this.isDisableSave = this.warehousesOutput.transDate !== this.$nowDate
    },
  },
  mounted() {
    const paramGetDetailsWarehousesOutput = {
      id: this.warehousesOutput.id,
      type: this.warehousesOutput.receiptType,
    }
    this.GET_WAREHOUSES_OUTPUT_BY_ID_ACTION(paramGetDetailsWarehousesOutput)
    this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION(paramGetDetailsWarehousesOutput)
  },
  methods: {
    ...mapMutations(WAREHOUSES_OUTPUT, [
      CLEAR_EXPORT_PRODUCTS_MUTATION,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
      GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
      UPDATE_WAREHOUSES_OUTPUT_ACTION,
    ]),
    navigateBack() {
      this.$router.back()
    },
    showModal() {
      this.CLEAR_EXPORT_PRODUCTS_MUTATION()
      switch (this.warehousesOutput.receiptType) {
        case this.warehousesOptions[0].id:
          this.$root.$emit('bv::toggle::modal', 'output-modal')
          break
        case this.warehousesOptions[1].id:
          this.$root.$emit('bv::toggle::modal', 'output-adjustment-modal')
          break
        case this.warehousesOptions[2].id:
          this.$root.$emit('bv::toggle::modal', 'output-borrowed-modal')
          break
        default:
          break
      }
    },
    dataFromBorrow(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.code = data.tranInfo.transCode
      this.warehousesOutput.note = data.tranInfo.note
      this.warehousesOutput.orderDate = data.tranInfo.adjustmentDate
      this.getProductOfWarehouseOutput = data.products.map(item => ({
        productID: item.id,
        productCode: item.productCode,
        productPrice: this.$formatNumberToLocale(item.price),
        productName: item.productName,
        productDVT: item.unit,
        productPriceTotal: this.$formatNumberToLocale(item.totalPrice),
        productQuantity: item.quantity,
        productReturnAmount: item.quantity,
      }))
      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.pocoNumber = ''
      this.warehousesOutput.code = ''
    },
    dataFromAdjustment(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.code = data.tranInfo.transCode
      this.warehousesOutput.note = data.tranInfo.note
      this.warehousesOutput.orderDate = data.tranInfo.adjustmentDate
      this.getProductOfWarehouseOutput = data.products.map(item => ({
        productID: item.id,
        productCode: item.productCode,
        productPrice: this.$formatNumberToLocale(item.price),
        productName: item.productName,
        productDVT: item.unit,
        productPriceTotal: this.$formatNumberToLocale(item.totalPrice),
        productQuantity: item.quantity,
        productReturnAmount: item.quantity,
      }))

      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
      this.warehousesOutput.code = ''
    },
    onClickUpdateWarehousesOutput() {
      if (this.getProductOfWarehouseOutput) {
        const products = this.getProductOfWarehouseOutput.map(data => ({
          id: data.productID,
          quantity: data.productReturnAmount,
        }))

        this.UPDATE_WAREHOUSES_OUTPUT_ACTION({
          updateWarehouseOutput: {
            id: this.warehousesOutput.id,
            type: this.warehousesOutput.receiptType,
            note: this.warehousesOutput.note,
            listProductRemain: products,
          },
          onSuccess: () => {
            this.navigateBack()
          },
        })
      } else toasts.error('Số lượng trả phải nhỏ hơn số lượng sản phẩm!')
    },
    changeQuantity() {
      this.exportAll = false
      this.getProductOfWarehouseOutput.forEach((item, index) => {
        if (Number(this.getProductOfWarehouseOutput[index].productReturnAmount) === Number(item.productQuantity)) {
          this.exportAll = true
        }
      })
    },
  },
}
</script>
