<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form Container -->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <!-- START - Form and list -->
      <b-col>
        <b-row>
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
                <strong>
                  {{ dateNow }}
                </strong>
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <!-- START - Export Code -->

              <b-col>

                <div class="mt-1">
                  Mã xuất hàng
                </div>
                <b-form-input
                  v-model.trim="warehousesOutput.code"
                  :state="touched ? passed : null"
                  maxlength="40"
                  disabled
                />

              </b-col>
              <!-- END - Export Code -->
              <b-col>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="loại xuất hàng"
                >
                  <div class="mt-1">
                    Loại xuất hàng
                  </div>
                  <tree-select
                    v-model="warehousesOutput.outputTypeSelected"
                    :options="outputTypesOptions"
                    placeholder="Chọn loại xuất hàng"
                    no-options-text="Không có dữ liệu"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider></b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -  Stock  -->
            <div class="mt-1">
              Kho hàng
            </div>
            <b-form-input
              v-model="getWareHouseType.wareHouseTypeName"
              disabled
            />
            <!-- END -  Stock  -->

            <!-- START - Bill Number and Date -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  name="số hóa đơn"
                >
                  <div class="mt-1">
                    Số hóa đơn
                  </div>
                  <b-form-input
                    v-model="warehousesOutput.redInvoiceNo"
                    :state="touched ? passed : null"
                    readonly
                    trim
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col>
                <div class="mt-1">
                  Ngày hóa đơn
                </div>
                <b-row
                  class="v-flat-pickr-group mx-0"
                  align-v="center"
                  placeholder="Chọn ngày"
                  @keypress="$onlyDateInput"
                >
                  <vue-flat-pickr
                    v-model="warehousesOutput.transDate"
                    :config="configDate"
                    class="form-control h8"
                    placeholder="Chọn ngày"
                    :disabled="warehousesOutput.outputTypeSelected !== poOutputType"
                    readonly
                  />
                </b-row>
              </b-col>
            </b-form-row>
            <!-- END -   Bill Number and Date -->

            <!-- START -   Internal number and PO no -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  name="số nội bộ"
                >
                  <div class="mt-1">
                    Số nội bộ
                  </div>
                  <b-form-input
                    v-model="warehousesOutput.internalNumber"
                    :state="touched ? passed : null"
                    readonly
                    trim
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  :rules="warehousesOutput.outputTypeSelected === poOutputType ? 'required' : ''"
                  name="PO No"
                >
                  <div class="mt-1">
                    PO No
                    <sup
                      v-show="warehousesOutput.outputTypeSelected === poOutputType"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-input-group
                    id="PoNo"
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="warehousesOutput.poNumber"
                      trim
                      :state="warehousesOutput.outputTypeSelected !== poOutputType && touched ? passed : null"
                    />
                    <b-input-group-append is-text>
                      <b-icon-three-dots-vertical
                        class="cursor-pointer"
                        @click="showModal()"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider></b-col>
            </b-form-row>
            <!-- END - Internal number and PO no -->

            <!-- START - Note -->
            <b-form-group
              class="mt-1"
            >
              <div>
                Ghi chú
              </div>
              <b-form-textarea
                v-model="warehousesOutput.note"
                maxlength="250"
              />
            </b-form-group>
            <!-- END - Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <!-- START - Table Product promotion -->
            <div style="padding: 5px 0;">
              <strong class="text-brand-1">
                Danh sách sản phẩm
              </strong>
            </div>

            <vue-good-table
              :columns="columns"
              :rows="products"
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
                  :disabled="warehousesOutput.outputTypeSelected !== poOutputType"
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
                <div v-if="props.column.field === 'productReturnAmount'">
                  <b-form-input
                    v-model="products[props.row.originalIndex].productReturnAmount"
                    maxlength="19"
                    :readonly="exportAll && warehousesOutput.outputTypeSelected !== poOutputType"
                    @keypress="$onlyNumberInput"
                  />
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
            <!-- END - Rows -->

            </vue-good-table>
            <!-- END - Table Product -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  variant="someThing"
                  class="btn-brand-1 rounded text-uppercase aligns-items-button-center"
                  :disabled="invalid"
                  @click="createExport"
                >
                  <b-icon-download
                    class="mr-05"
                  />
                  Trả hàng
                </b-button>

                <b-button
                  class="btn-brand-1 ml-1 rounded text-uppercase aligns-items-button-center"
                  @click="navigateBack"
                >
                  <b-icon-x
                    class="mr-05"
                    scale="1.5"
                  />
                  Đóng
                </b-button>
              </b-button-group>
            </b-row>
            <!-- END - Button -->

          </b-col>
          <!-- END - List -->

        </b-row>
      </b-col>
    <!-- END - Form and list -->
    </validation-observer>
    <!-- END - Form Container -->
    <!-- START - Modal -->
    <adjustment-modal
      @choonsenTrans="dataFromAdjustment($event)"
    />
    <borrowed-modal
      @choonsenTrans="dataFromBorrow($event)"
    />
    <output-modal
      @choonsenTrans="dataFromPo($event)"
    />
    <!-- END - Modal -->

    <!-- START - Notify Modal Close -->
    <b-modal
      ref="salesNotifyModal"
      title="Thông báo"
    >
      Dữ liệu đang được tạo, bạn có muốn đóng
      <template #modal-footer>
        <b-button
          variant="primary"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button @click="closeNotifyModal">
          Huỷ bỏ
        </b-button>
      </template>
    </b-modal>
    <!-- END - Notify Modal Close -->
  </b-container>
</template>

<script>
import warehousesData from '@/@db/warehouses'
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  code,
  required,
} from '@/@core/utils/validations/validations'
import { getNow } from '@core/utils/utils'
import OutputModal from '../components/output-modal/OutputModal.vue'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'
import {
  WAREHOUSES_OUTPUT,
  // GETTERS
  // GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  // GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
  // GET_EXPORT_BORROWINGS_DETAIL_GETTER,
  GET_WAREHOUSE_TYPE_GETTER,
  // MUTATIONS
  CLEAR_EXPORT_PRODUCTS_MUTATION,
  // ACTIONS
  GET_WAREHOUSE_TYPE_ACTION,
  CREATE_EXPORT_ACTION,
} from '../store-module/type'
// import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    OutputModal,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      // validation rules
      code,
      required,

      outputTypesOptions: warehousesData.outputTypes,
      exportAll: false,

      output: {
        id: '',
        transCode: '',
      },
      poOutputType: warehousesData.outputTypes[0].id,
      warehousesOutput: {
        id: null,
        outputTypeSelected: warehousesData.outputTypes[0].id,
        code: '',
        type: 2, // xác định 2 là loại phiếu xuất hàng
        wareHouseTypeName: '',
        redInvoiceNo: '', // số hoá đơn
        internalNumber: '', // số nội bộ
        poNumber: '',
        note: '',
        transDate: this.$nowDate,
      },
      products: [],
      dateNow: getNow(),
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },

      decentralization: {
        formId: 5,
        ctrlId: 7,
      },

      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'export',
          sortable: false,
        },
        {
          label: 'Số lượng trả',
          field: 'productReturnAmount',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSE_TYPE_GETTER,
    ]),
    getWareHouseType() {
      return this.GET_WAREHOUSE_TYPE_GETTER
    },
  },

  watch: {
    outputTypeSelected() {
      this.CLEAR_EXPORT_PRODUCTS_MUTATION()
      this.internalNumber = ''
      this.internalNumber = ''
      this.output.transCode = ''
      this.poNumber = ''
      this.transDate = ''
      this.note = ''
      this.products = []
    },
    exportAll() {
      if (this.exportAll) {
        this.products.forEach((item, index) => {
          this.products[index].productReturnAmount = item.productReturnAmountOriginal
        })
      } else {
        this.products.forEach((item, index) => {
          this.products[index].productReturnAmount = null
        })
      }
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPE_ACTION({ ...this.decentralization })
  },

  methods: {
    ...mapMutations(WAREHOUSES_OUTPUT, [
      CLEAR_EXPORT_PRODUCTS_MUTATION,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSE_TYPE_ACTION,
      CREATE_EXPORT_ACTION,
    ]),

    showModal() {
      this.CLEAR_EXPORT_PRODUCTS_MUTATION()
      switch (this.warehousesOutput.outputTypeSelected) {
        case warehousesData.outputTypes[0].id:
          this.$root.$emit('bv::toggle::modal', 'output-modal')
          break
        case warehousesData.outputTypes[1].id:
          this.$root.$emit('bv::toggle::modal', 'output-adjustment-modal')
          break
        case warehousesData.outputTypes[2].id:
          this.$root.$emit('bv::toggle::modal', 'output-borrowed-modal')
          break
        default:
          break
      }
    },
    dataFromPo(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.redInvoiceNo = data.tranInfo.redInvoiceNo
      this.warehousesOutput.transDate = data.tranInfo.transDate
      this.warehousesOutput.internalNumber = data.tranInfo.internalNumber
      this.warehousesOutput.poNumber = data.tranInfo.poNumber
      this.products = data.products
      this.exportAll = false
    },
    dataFromBorrow(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.transDate = data.tranInfo.borrowDate
      this.warehousesOutput.note = data.tranInfo.note
      this.products = data.products
      this.exportAll = true

      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
      this.warehousesOutput.code = ''
    },
    dataFromAdjustment(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.transDate = data.tranInfo.adjustmentDate
      this.warehousesOutput.note = data.tranInfo.description
      this.products = data.products
      this.exportAll = true

      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
      this.warehousesOutput.code = ''
    },
    createExport() {
      this.CREATE_EXPORT_ACTION(
        {
          importType: Number(this.warehousesOutput.outputTypeSelected),
          isRemainAll: this.exportAll,
          receiptImportId: Number(this.warehousesOutput.id),
          note: this.warehousesOutput.note,
          litQuantityRemain: this.products.map(item => ({
            id: item.id,
            quantity: Number(item.productReturnAmount) || 0,
          })),
        },
      )
    },
    navigateBack() {
      this.$refs.salesNotifyModal.show()
    },
    onClickAgreeButton() {
      this.$router.back()
    },
    closeNotifyModal() {
      this.$refs.salesNotifyModal.hide()
    },
  },
}
</script>
