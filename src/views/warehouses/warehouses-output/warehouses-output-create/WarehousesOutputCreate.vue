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

      <b-row>
        <!-- START - Form -->
        <b-col
          xl="4"
          class="bg-white shadow rounded h7"
        >
          <!-- START - Date -->
          <b-row class="mt-1">
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
                <div class="d-flex align-items-center">
                  <tree-select
                    ref="focusInput"
                    v-model="outputTypeSelected"
                    :options="outputTypesOptions"
                    placeholder="Chọn loại xuất hàng"
                    no-options-text="Không có dữ liệu"
                    no-results-text="Không tìm thấy kết quả"
                    @select="resetDataToDefault"
                  />
                  <b-input-group-append>
                    <b-icon-three-dots-vertical
                      v-b-popover.hover.right="'Chọn phiếu xuất'"
                      scale="1.4"
                      class="cursor-pointer"
                      @click="showModal()"
                    />
                  </b-input-group-append>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END - ID and Type -->

          <!-- START -  Stock  -->
          <div class="mt-1">
            Kho hàng
          </div>
          <b-form-input
            v-model="warehousesOutput.wareHouseTypeName"
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
                  v-model.trim="warehousesOutput.redInvoiceNo"
                  :state="touched ? passed : null"
                  disabled
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
                  v-model="warehousesOutput.billDate"
                  :config="configDate"
                  class="form-control h7"
                  disabled
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
                  v-model.trim="warehousesOutput.internalNumber"
                  :state="touched ? passed : null"
                  disabled
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="outputTypeSelected === poOutputType ? 'required' : ''"
                name="PO No"
              >
                <div class="mt-1">
                  PO No
                  <sup
                    v-show="outputTypeSelected === poOutputType"
                    class="text-danger"
                  >*</sup>
                </div>
                <b-input-group
                  id="PoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    v-model.trim="warehousesOutput.poNumber"
                    :state="outputTypeSelected !== poOutputType && touched ? passed : null"
                    disabled
                  />

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
          xl="8"
          class="px-sm-0 px-md-0"
        >
          <div class="bg-white shadow rounded ml-xl-1 mt-1 mt-xl-0 p-1 h-100">
            <!-- START - Table Product promotion -->
            <div class="d-inline-flex rounded-top pr-1">
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
                  :disabled="outputTypeSelected !== poOutputType"
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
                  v-if="props.column.field === 'quantityReturn'"
                  class="pr-50"
                  style="width: 150px;"
                >
                  <cleave
                    v-model="products[props.row.originalIndex].quantityReturn"
                    class="form-control h7 text-right"
                    :raw="true"
                    :options="options.number"
                    maxlength="19"
                    :readonly="exportAll && outputTypeSelected !== poOutputType"
                    @keypress.native="$onlyNumberInput"
                    @keyup.native="changeQuantity()"
                  />
                </div>
                <div
                  v-else-if="props.column.field === 'productName'"
                  class="name-width"
                >
                  {{ props.formattedRow[props.column.field] }}
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- END - Rows -->

              <!-- START - Customer filter -->
              <template
                slot="column-filter"
                slot-scope="props"
                class="h7"
              >
                <b-row
                  v-if="props.column.field === 'productCode'"
                  class="h7 ml-1"
                  align-h="start"
                  :hidden="hideFilter"
                >
                  {{ $formatNumberToLocale(totalProduct) }}
                </b-row>
              </template>
            <!-- END - Customer filter -->
            </vue-good-table>
            <!-- END - Table Product -->
            <!-- START - Table Product promotion 2 -->
            <div v-if="outputTypeSelected === poOutputType">
              <div style="padding: 5px 0;">
                <strong class="text-brand-1">
                  Danh sách sản phẩm khuyến mãi
                </strong>
              </div>

              <vue-good-table
                :columns="poPromotionColumns"
                :rows="rowsProductPromotion"
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

                <!-- START - Rows -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'quantityPromo'"
                    class="pr-50"
                    style="width: 150px;"
                  >
                    <cleave
                      v-model="rowsProductPromotion[props.row.originalIndex].quantityPromo"
                      class="form-control h7 text-right"
                      :raw="true"
                      :options="options.number"
                      maxlength="19"
                      @keypress.native="$onlyNumberInput"
                      @keyup.native="changeQuantity()"
                    />
                  </div>
                  <div
                    v-else-if="props.column.field === 'productName'"
                    class="name-width"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Rows -->

                <!-- START - Custom filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'productCode'"
                    v-show="totalPromoProduct"
                    class="mx-0"
                    align-h="center"
                  >
                    {{ $formatNumberToLocale(totalPromoProduct) }}
                  </b-row>

                </template>
              <!-- END - Custom filter -->

              </vue-good-table>
            </div>
            <!-- START - Table Product promotion 2 -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  v-if="statusSaveButton().show"
                  :disabled="statusSaveButton().disabled || invalid"
                  variant="someThing"
                  class="btn-brand-1 rounded aligns-items-button-center"
                  @click="createExport"
                >
                  <b-icon-download
                    class="mr-50"
                  />
                  <span v-if="outputTypeSelected != poOutputType">Lưu</span>
                  <span v-else>Trả hàng</span>
                </b-button>

                <b-button
                  class="btn-brand-1 ml-1 rounded aligns-items-button-center"
                  @click="navigateBack"
                >
                  <b-icon-x
                    class="mr-50"
                    scale="1.5"
                  />
                  Đóng
                </b-button>
              </b-button-group>
            </b-row>
          <!-- END - Button -->
          </div>
        </b-col>
        <!-- END - List -->

      </b-row>
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
          variant="someThing"
          class="btn-brand-1"
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
import {
  nowDate,
} from '@/@core/utils/filter'
import toasts from '@/@core/utils/toasts/toasts'
import Cleave from 'vue-cleave-component'
import OutputModal from '../components/output-modal/OutputModal.vue'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'
import {
  WAREHOUSES_OUTPUT,
  // GETTERS
  GET_WAREHOUSE_TYPE_GETTER,
  // ACTIONS
  GET_WAREHOUSE_TYPE_ACTION,
  CREATE_EXPORT_ACTION,
} from '../store-module/type'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    OutputModal,
    ValidationProvider,
    ValidationObserver,
    Cleave,
  },

  data() {
    return {
      // validation rules
      code,
      required,

      outputTypesOptions: warehousesData.outputTypes,
      exportAll: false,
      quantityCheck: true,
      nullCheck: true,
      hideFilter: true,
      columnType: null,

      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },

      output: {
        id: '',
        transCode: '',
      },
      poOutputType: warehousesData.outputTypes[0].id,
      outputTypeSelected: warehousesData.outputTypes[0].id,
      warehousesOutput: {
        id: null,
        code: '',
        type: 2, // xác định 2 là loại phiếu xuất hàng
        wareHouseTypeName: '',
        redInvoiceNo: '', // số hoá đơn
        internalNumber: '', // số nội bộ
        poNumber: '',
        note: '',
        transDate: nowDate(),
        billDate: nowDate(),
      },
      products: [],
      rowsProductPromotion: [],
      dateNow: getNow(),
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },

      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      columnsPO: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Giá',
          field: 'price',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: ' align-middle',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'Đã xuất trả/ tổng nhập',
          field: 'export',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right pr-2 align-middle',
        },
        {
          label: 'Số lượng trả',
          field: 'quantityReturn',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
        },
      ],
      columnsCustom: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Giá',
          field: 'price',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'Số lượng trả',
          field: 'quantity',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2',
        },
      ],
      poPromotionColumns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left text-nowrap',
          tdClass: 'text-left align-middle',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          formatFn: this.$formatNumberToLocale,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
          thClass: 'text-nowrap',
          tdClass: 'align-middle',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'pr-2 align-middle',
        },
        {
          label: 'Đã xuất trả/ tổng nhập',
          field: 'export',
          sortable: false,
          thClass: 'text-right text-nowrap',
          tdClass: 'text-right pr-2 align-middle',
        },
        {
          label: 'Số lượng trả',
          field: 'quantityPromo',
          formatFn: this.$formatNumberToLocale,
          sortable: false,
          type: 'number',
          thClass: 'text-nowrap',
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
      this.internalNumber = ''
      this.warehousesOutput.wareHouseTypeName = ''
      this.output.transCode = ''
      this.poNumber = ''
      this.transDate = ''
      this.note = ''
      this.products = []
      this.rowsProductPromotion = []
      this.hideFilter = true
      this.exportAll = false
      if (this.outputTypeSelected !== this.poOutputType) {
        this.columns = this.columnsCustom
      } else this.columns = this.columnsPO
    },
    exportAll() {
      if (this.exportAll) {
        this.products.forEach((item, index) => {
          this.products[index].quantityReturn = item.quantity - item.productReturnExportOriginal
        })
        this.rowsProductPromotion.forEach((item, index) => {
          this.rowsProductPromotion[index].quantityPromo = item.quantity - item.productReturnExportOriginal
        })
      } else {
        this.products.forEach((item, index) => {
          if (this.products[index].quantityReturn === item.quantity - item.productReturnExportOriginal) {
            this.products[index].quantityReturn = null
          }
        })
        this.rowsProductPromotion.forEach((item, index) => {
          if (this.rowsProductPromotion[index].quantityPromo === item.quantity - item.productReturnExportOriginal) {
            this.rowsProductPromotion[index].quantityPromo = null
          }
        })
      }
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPE_ACTION({ ...this.decentralization })
    this.columns = this.columnsPO
    this.$refs.focusInput.$el.querySelector('input').focus()
  },

  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSE_TYPE_ACTION,
      CREATE_EXPORT_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesOutputCreate', 'WarehousesOutputCreateSave')
    },

    showModal() {
      switch (this.outputTypeSelected) {
        case warehousesData.outputTypes[0].id:
          this.$bvModal.show('output-modal')
          break
        case warehousesData.outputTypes[1].id:
          this.$bvModal.show('output-adjustment-modal')
          break
        case warehousesData.outputTypes[2].id:
          this.$bvModal.show('output-borrowed-modal')
          break
        default:
          break
      }
    },
    dataFromPo(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.redInvoiceNo = data.tranInfo.redInvoiceNo
      this.warehousesOutput.billDate = data.tranInfo.billDate
      this.warehousesOutput.internalNumber = data.tranInfo.internalNumber
      this.warehousesOutput.poNumber = data.tranInfo.pocoNumber
      this.warehousesOutput.wareHouseTypeName = data.tranInfo.wareHouseTypeName
      this.products = data.products || []
      this.rowsProductPromotion = data.productsPromo || []
    },
    dataFromBorrow(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.billDate = data.tranInfo.borrowDate
      this.warehousesOutput.note = data.tranInfo.note
      this.warehousesOutput.wareHouseTypeName = data.tranInfo.wareHouseTypeName
      this.products = data.products || []
      this.exportAll = true
      this.totalQuantity = data.totalQuantity
      this.totalProduct = data.products.length || 0
      this.hideFilter = false

      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
      this.warehousesOutput.code = ''
    },
    dataFromAdjustment(data) {
      this.warehousesOutput.id = data.tranInfo.id
      this.warehousesOutput.billDate = data.tranInfo.adjustmentDate
      this.warehousesOutput.note = data.tranInfo.description
      this.warehousesOutput.code = data.tranInfo.adjustmentCode
      this.warehousesOutput.wareHouseTypeName = data.tranInfo.wareHouseTypeName
      this.exportAll = true
      this.products = data.products || []
      this.totalQuantity = data.totalQuantity
      this.totalProduct = data.products.length || 0
      this.hideFilter = false
      this.products.forEach((item, index) => {
        this.products[index].quantityReturn = item.quantity
      })

      // clear data
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
    },
    checkNull() {
      let stop = true
      if (this.products.length > 0) {
        this.products.forEach(item => {
          if (stop) {
            if (item.quantityReturn != null && item.quantityReturn > 0) {
              this.nullCheck = true
              stop = false
            } else {
              this.nullCheck = false
              this.rowsProductPromotion.forEach(i => {
                if (i.quantityPromo != null && i.quantityPromo > 0) {
                  this.nullCheck = true
                  stop = false
                } else {
                  this.nullCheck = false
                }
              })
            }
          }
        })
      } else {
        this.rowsProductPromotion.forEach(i => {
          if (stop) {
            if (i.quantityPromo != null && i.quantityPromo > 0) {
              this.nullCheck = true
              stop = false
            } else {
              this.nullCheck = false
            }
          }
        })
      }
    },
    createExport() {
      if (this.outputTypeSelected === this.poOutputType) {
        this.checkNull()
      }
      if (this.products.length > 0 || this.rowsProductPromotion.length > 0) {
        if (this.products.findIndex(item => item.quantityReturn < 0) === -1 && this.rowsProductPromotion.findIndex(item => item.quantityPromo < 0) === -1) {
          if (this.nullCheck) {
            this.CREATE_EXPORT_ACTION(
              {
                importType: Number(this.outputTypeSelected),
                isRemainAll: this.exportAll,
                receiptImportId: Number(this.warehousesOutput.id),
                note: this.warehousesOutput.note,
                litQuantityRemain: [...this.products.map(item => ({
                  id: item.id,
                  quantity: Number(item.quantityReturn) || 0,
                  productCode: item.productCode,
                  productName: item.productName,
                })),
                ...this.rowsProductPromotion.map(item => ({
                  id: item.id,
                  quantity: Number(item.quantityPromo) || 0,
                  productCode: item.productCode,
                  productName: item.productName,
                })),
                ],
              },
            )
          } else toasts.error('Tổng số lượng trả phải lớn hơn 0.')
        } else toasts.error('Không được nhập số âm.')
      } else toasts.error('Vui lòng chọn phiếu.')
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
    resetDataToDefault() {
      this.warehousesOutput.redInvoiceNo = ''
      this.warehousesOutput.internalNumber = ''
      this.warehousesOutput.poNumber = ''
      this.warehousesOutput.code = ''
      this.warehousesOutput.note = ''
      this.outputTypeSelected = this.poOutputType
      this.warehousesOutput.billDate = nowDate()
    },
    changeQuantity() {
      this.products.forEach(item => {
        if (Number(item.quantityReturn) === item.quantity - item.productReturnExportOriginal) {
          this.exportAll = true
          this.rowsProductPromotion.forEach(i => {
            if (Number(i.quantityPromo) === item.quantity - item.productReturnExportOriginal) {
              this.exportAll = true
            } else this.exportAll = false
          })
        } else this.exportAll = false
      })
    },
  },
}
</script>
