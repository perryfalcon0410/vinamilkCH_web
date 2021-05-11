<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
    >
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
                Ngày nhập:
              </b-col>
              <b-col class="font-weight-bold">
                <strong>
                  {{ now }}
                </strong>
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Mã nhập hàng"
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    v-model="id"
                    maxlength="40"
                    trim
                    disabled
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Loại nhập"
                  label-for="id"
                >
                  <v-input-select
                    :suggestions="inputTypeOptions"
                    :data-input="inputTypeSelected.name"
                    :title="''"
                    @updateSelection="inputTypeSelected = $event"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -  Stock  -->
            <b-form-group
              label="Kho hàng"
              label-for="warehouse"
            >
              <b-form-input
                id="warehouse"
                v-model="warehousesType.wareHouseTypeName"
                readonly
              />
            </b-form-group>
            <!-- END -  Stock  -->

            <!-- START - Bill Number and Date -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  rules="required"
                  product-name="Số hóa đơn"
                >
                  <div class="h9">
                    Số hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="billNumber"
                    trim
                    :state="touched ? passed : null"
                    :disabled="importType != '1' ? true : false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col>
                <validation-provider
                  rules="required"
                >
                  <div class="h9">
                    Ngày hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-input-group
                    class="input-group-merge"
                  >
                    <vue-flat-pickr
                      id="form-input-date-from"
                      v-model="billDate"
                      :disabled="importType != '1' ? true : false"
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
                </validation-provider>
              </b-col>
            </b-form-row>
            <!-- END -   Bill Number and Date -->

            <!-- START -   Internal number and PO no -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  rules="required"
                  product-name="Số nội bộ"
                >
                  <div class="mt-1 h9">
                    Số nội bộ <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="internalNumber"
                    trim
                    :state="touched ? passed : null"
                    :disabled="importType != '1' ? true : false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  :rules="importType === '1' ? 'required' : ''"
                  product-name="PO No"
                >
                  <div class="mt-1 h9">
                    PO No
                    <sup
                      v-show="importType === '1'"
                      class="text-danger"
                    >*</sup>
                  </div>
                  <b-input-group
                    id="PoNo"
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="poNo"
                      trim
                      :state="importType === '1' && touched ? passed : null"
                      :disabled="importType != '1' ? true : false"
                    />
                    <b-input-group-append is-text>
                      <b-icon-three-dots-vertical
                        @click="showModal()"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
            </b-form-row>
            <!-- END -   Internal number and PO no -->

            <!-- START -   Note -->
            <b-form-group
              label="Ghi chú"
              class="mt-1"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                maxlength="4000"
              />
            </b-form-group>
            <!-- END -   Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <!-- START - Table Product -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Sản phẩm
              </strong>
            </div>

            <vue-good-table
              v-if="status != null"
              :columns="columns"
              :rows="rows"
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
              <!-- START - Column filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-0"
                  align-h="start"
                >
                  {{ poProductInfo.totalQuantity }}
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'totalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ poProductInfo.totalPrice }}
                </b-row>
              </template>
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
              <!-- END - Empty rows -->
            </vue-good-table>
            <!-- END - Table Product -->
            <br>
            <!-- START - Table Product promotion -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Hàng khuyến mãi
              </strong>
            </div>
            <!--if-PoConfirm-->
            <vue-good-table
              v-if="status === 0"
              :columns="poColumns"
              :rows="rowsProductPromotion"
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
              <!-- START - Column filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-0"
                  align-h="start"
                >
                  {{ poPromotionProductsInfo.totalQuantity }}
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'totalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ poPromotionProductsInfo.totalPrice }}
                </b-row>
              </template>
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
              <!-- END - Empty rows -->
            </vue-good-table>
            <!--START input Po-->
            <vue-good-table
              v-if="status === null"
              :columns="poPromotionColumns"
              :rows="rowsProductPromotion"
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
              <template
                slot="table-column"
                slot-scope="props"
              >
                <span v-if="props.column.label =='Function'">
                  <b-icon
                    class="cursor-pointer text-justify-center"
                    scale="2.5"
                    icon="plus"
                    @click="newRow"
                  />
                </span>
                <span v-else>
                  {{ props.column.label }}
                </span>
              </template>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field == 'productCode'">
                  <b-form-input
                    v-model="rowsProductPromotion[props.row.count].productCode"
                    size="sm"
                  />
                </span>
                <span v-if="props.column.field == 'quantity'">
                  <b-input
                    v-model="rowsProductPromotion[props.row.count].quantity"
                    size="sm"
                  />
                </span>
                <span v-if="props.column.field == 'function'">
                  <b-icon-trash-fill
                    v-b-popover.hover.top="'Xóa'"
                    class="cursor-pointer mt-05"
                    scale="1.5"
                    color="red"
                    @click="onClickDeleteButton(props.row.count)"
                  />
                  {{ count }}
                </span>
              </template>
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
              <!-- END - Empty rows -->
            </vue-good-table>
            <!--END input Po-->
            <!--if-PoConfirm-->

            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
                  variant="someThing"
                  @click="create()"
                >
                  <b-icon
                    icon="download"
                  />
                  Nhập hàng
                </b-button>

                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
                  variant="someThing"
                  @click="navigateBack"
                >
                  <b-icon
                    icon="x"
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
    </validation-observer>
    <!-- END - Form and list -->

    <!-- START - Modal -->
    <adjustment-modal
      :visible="AdjustmentModalVisible"
      @inputAdjustChange="dataFromInputAdjust($event)"
      @close="AdjustmentModalVisible = false"
    />
    <borrowed-modal
      :visible="BorrowedModalVisible"
      @inputBorrowsChange="dataFormInputBorrow($event)"
      @close="BorrowedModalVisible = false"
    />
    <po-confirm-modal
      :visible="PoConfirmModalVisible"
      @inputChange="dataFromPoConfirm($event)"
      @close="PoConfirmModalVisible = false"
    />
    <confirm-close-modal
      :visible="showConfirmCloseModal"
      @close="showConfirmCloseModal = false"
    >
    <!-- END - Modal -->
    </confirm-close-modal></b-container>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
} from '@/@core/utils/validations/validations'
import { mapGetters, mapActions } from 'vuex'
import { getNow } from '@core/utils/utils'
import { formatDateToLocale } from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'
import ConfirmCloseModal from '../components/confirm-close-modal/ConfirmCloseModal.vue'
import {
  WAREHOUSEINPUT,
  WAREHOUSES_TYPE_GETTER,
  GET_WAREHOUSES_TYPE_ACTION,
  CREATE_SALE_IMPORT_ACTION,
} from '../store-module/type'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    PoConfirmModal,
    ConfirmCloseModal,
    ValidationProvider,
    ValidationObserver,
    VInputSelect,
  },
  data() {
    return {
      inputTypeOptions: warehousesData.inputTypes,
      inputTypeSelected: { id: null, name: null },
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      now: getNow(),
      AdjustmentModalVisible: false,
      BorrowedModalVisible: false,
      PoConfirmModalVisible: false,
      showConfirmCloseModal: false,
      // ngay nhap
      dateStamp: '',
      timeStamp: '',
      // loai nhap
      status: null,

      columns: null,
      rows: null,

      billNumber: '',
      importType: '1',
      internalNumber: '',
      billDate: formatDateToLocale(new Date()),
      poNo: '',
      note: '',
      listImportProduct: null,
      poId: null,
      poProductInfo: {},
      poPromotionProductsInfo: {},
      length: 1,
      // validation rules
      number,
      required,
      // -------------------------PoConfirm--------------------------
      poPromotionColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Function',
          field: 'function',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rowsProduct: [],
      poColumns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tên hàng',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rowsProductPromotion: [{
        count: 0,
        productCode: '',
        quantity: '',
      }],
      // -------------------------PoConfirm--------------------------

      // -------------------------InputAdjust--------------------------
      adjustColumns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
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
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
      adjustRows: [],
      // -------------------------InputAdjust--------------------------

      // -------------------------InputBorrow--------------------------
      borrowColumns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
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
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
      borrowRows: [],
      // -------------------------InputAdjust--------------------------
    }
  },
  computed: {
    // filter count from newRow
    promotionRow() {
      return this.rowsProductPromotion.map(data => ({
        productId: data.productCode,
        quantity: data.quantity,
      }))
    },
    warehousesType() {
      return this.WAREHOUSES_TYPE_GETTER()
    },
  },
  mounted() {
    this.inputTypeSelected = { id: this.inputTypeOptions[0].id, name: this.inputTypeOptions[0].name }
    this.GET_WAREHOUSES_TYPE_ACTION({
      formId: 5, // hard code
      ctrlId: 7, // hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      WAREHOUSES_TYPE_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      CREATE_SALE_IMPORT_ACTION,
      GET_WAREHOUSES_TYPE_ACTION,
    ]),
    onClickDeleteButton(index) {
      this.rowsProductPromotion.splice(index, 1)
    },
    newRow() {
      if (this.status === null) {
        this.rowsProductPromotion = [
          ...this.rowsProductPromotion,
          {
            count: this.rowsProductPromotion.length,
            productCode: '',
            quantity: '',
          },
        ]
      }
    },
    showModal() {
      console.log(this.inputTypeSelected)
      switch (this.inputTypeSelected.id) {
        case '0':
          this.PoConfirmModalVisible = true
          break
        case '1':
          this.AdjustmentModalVisible = true
          break
        case '2':
          this.BorrowedModalVisible = true
          break
        default:
          break
      }
    },
    navigateBack() {
      if (this.status === null) {
        this.$router.back()
      } else {
        this.showConfirmCloseModal = true
      }
    },
    // ---------------------------Nhap hang-----------------------
    dataFromPoConfirm(data) {
      const [poProducts, ProductInfo, poPromotionProducts, PromotionProductsInfo, Snb, poNum, id] = data
      this.rowsProduct = [...poProducts]
      this.rowsProductPromotion = [...poPromotionProducts]
      this.poProductInfo = ProductInfo
      this.poPromotionProductsInfo = PromotionProductsInfo
      this.status = 0
      this.internalNumber = Snb
      this.poNo = poNum
      this.poId = id
      this.tableRender()
    },
    // ----------------------------Nhap hang-----------------------

    // -----------------------------Nhap dieu chinh------------------------
    dataFromInputAdjust(data) {
      const [importAdjustsDetail, importAdjustModalState, id] = data
      this.adjustRows = [...importAdjustsDetail]
      this.AdjustmentModalVisible = importAdjustModalState
      this.status = 1 // importType
      this.poNo = null // poNumber
      this.poId = id // poId
      this.tableRender()
    },
    // -----------------------------Nhap dieu chinh------------------------

    // ------------------------------Nhap vay muon----------------------------
    dataFormInputBorrow(data) {
      const [importBorrowsDetail, importBorrowModalState, id] = data
      this.borrowRows = [...importBorrowsDetail]
      this.BorrowedModalVisible = importBorrowModalState
      this.status = 2
      this.poNo = null
      this.internalNumber = null
      this.poId = id
      this.tableRender()
    },
    // ------------------------------Nhap vay muon----------------------------
    tableRender() {
      if (this.status === 0) {
        this.columns = this.poColumns
        this.rows = this.rowsProduct
      } else if (this.status === 1) {
        this.columns = this.adjustColumns
        this.rows = this.adjustRows
      } else if (this.status === 2) {
        this.columns = this.borrowColumns
        this.rows = this.borrowRows
      }
    },
    create() {
      if (this.status !== null) {
        this.CREATE_SALE_IMPORT_ACTION({
          importType: this.status,
          poNumber: this.poNo,
          internalNumber: this.internalNumber,
          redInvoiceNo: this.billNumber,
          poId: this.poId,
          note: this.note,
        })
      } else {
        this.$refs.formContainer.validate().then(success => {
          if (success) {
            this.CREATE_SALE_IMPORT_ACTION({
              importType: 0,
              poNumber: this.poNo,
              internalNumber: this.internalNumber,
              redInvoiceNo: this.billNumber,
              poId: this.poId,
              note: this.note,
              lst: this.promotionRow || null,
            })
          }
        })
      }
    },
  },
}
</script>
