<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <validation-observer
      v-slot="{invalid}"
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
                {{ dateStamp }} lúc {{ timeStamp }}
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
                  label-for="importType"
                >
                  <b-form-select
                    id="importType"
                    v-model="importType"
                  >
                    <b-form-select-option value="1">
                      nhập hàng
                    </b-form-select-option>
                    <b-form-select-option
                      value="2"
                    >
                      nhập điều chỉnh
                    </b-form-select-option>
                    <b-form-select-option value="3">
                      nhập vay mượn
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -  Stock  -->
            <b-form-group
              label="Kho hàng"
              label-for="warehouse"
            >
              <b-form-select
                id="warehouse"
              />
            </b-form-group>
            <!-- END -  Stock  -->

            <!-- START - Bill Number and Date -->
            <b-form-row>
              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  rules="required"
                  name="Số hóa đơn"
                >
                  <div>
                    Số hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="billNumber"
                    trim
                    :state="touched ? passed : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="Ngày hóa đơn"
                >
                  <div>
                    Ngày hóa đơn <sup class="text-danger">*</sup>
                  </div>
                  <b-form-datepicker
                    v-model="billDate"
                    locale="vi"
                    :disabled="importType != '1' ? true : false"
                    :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
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
                  name="Số nội bộ"
                >
                  <div class="mt-1">
                    Số nội bộ <sup class="text-danger">*</sup>
                  </div>
                  <b-form-input
                    v-model="internalNumber"
                    trim
                    :state="touched ? passed : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  :rules="importType === '1' ? 'required' : ''"
                  name="PO No"
                >
                  <div class="mt-1">
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
              label-for="note"
            >
              <b-form-textarea
                id="note"
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
                  v-if="props.column.field === 'ProductId'"
                  class="mx-0"
                  align-h="start"
                >
                  23
                </b-row>
                <b-row
                  v-if="props.column.field === 'Quantity'"
                  class="mx-0"
                  align-h="start"
                >
                  48
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'TotalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  25,123,000
                </b-row>
              </template>
              <!-- START - Column filter -->
            </vue-good-table>
            <!-- END - Table Product -->

            <!-- START - Table Product promotion -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Hàng khuyến mãi
              </strong>
            </div>
            <!--if-PoConfirm-->
            <vue-good-table
              v-if="status == 0"
              :columns="PoColumns"
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
                  v-if="props.column.field === 'ProductId'"
                  class="mx-0"
                  align-h="start"
                >
                  23
                </b-row>
                <b-row
                  v-if="props.column.field === 'Quantity'"
                  class="mx-0"
                  align-h="start"
                >
                  48
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'TotalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  25,123,000
                </b-row>
              </template>
            </vue-good-table>
            <!--if-PoConfirm-->

            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  variant="primary"
                  class="d-flex align-items-center rounded text-uppercase"
                  :disabled="invalid"
                >
                  <b-icon
                    icon="download"
                    width="20"
                    height="20"
                    class="mr-1"
                  />
                  Nhập hàng
                </b-button>

                <b-button
                  class="d-flex align-items-center ml-1 rounded text-uppercase"
                  @click="navigateBack"
                >
                  <b-icon
                    icon="x"
                    width="20"
                    height="20"
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
      @inputAdjust="dataFromInputAdjust($event)"
    />
    <borrowed-modal
      :visible="BorrowedModalVisible"
      @inputBorrow="dataFormInputBorrow($event)"
    />
    <po-confirm-modal
      :visible="PoConfirmModalVisible"
      @import="dataFromPoConfirm($event)"
    />
    <!-- END - Modal -->
  </b-container>
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
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    PoConfirmModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      AdjustmentModalVisible: false,
      BorrowedModalVisible: false,
      PoConfirmModalVisible: false,
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
      billDate: new Date(),
      poNo: '',

      // validation rules
      number,
      required,
      // -------------------------PoConfirm--------------------------
      PoColumns: [
        {
          label: 'Mã hàng',
          field: 'productId',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá',
          field: 'Price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'Unit',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
        },
      ],
      rowsProduct: [],
      rowsProductPromotion: [],
      // -------------------------PoConfirm--------------------------

      // -------------------------InputAdjust--------------------------
      AdjustColumns: [
        {
          label: 'Số chứng từ',
          field: 'LicenseNumber',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'Price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          sortable: false,
          type: 'number',
        },
      ],
      AdjustRows: [],
      // -------------------------InputAdjust--------------------------

      // -------------------------InputBorrow--------------------------
      BorrowColumns: [
        {
          label: 'Số chứng từ',
          field: 'LicenseNumber',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'Price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          sortable: false,
          type: 'number',
        },
      ],
      BorrowRows: [],
      // -------------------------InputAdjust--------------------------
    }
  },
  created() {
    this.getNow()
  },
  methods: {
    getNow() {
      const today = new Date()
      const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
      const time = `${today.getHours()}:${today.getMinutes()}`
      this.dateStamp = date
      this.timeStamp = time
    },
    showModal() {
      const PoConfirm = this.importType === '1' ? this.PoConfirmModalVisible = !this.PoConfirmModalVisible : this.PoConfirmModalVisible = false
      const Adjustment = this.importType === '2' ? this.AdjustmentModalVisible = !this.AdjustmentModalVisible : this.AdjustmentModalVisible = false
      const Borrowed = this.importType === '3' ? this.BorrowedModalVisible = !this.BorrowedModalVisible : this.BorrowedModalVisible = false

      return PoConfirm && Adjustment && Borrowed
    },
    navigateBack() {
      this.$router.back()
    },
    // ---------------------------Nhap hang-----------------------
    dataFromPoConfirm(data) {
      const [poProducts, poPromotionProducts, Id, PoConfirmModalState, Snb] = data
      poProducts.forEach(element => {
        this.rowsProduct.push(element)
      })
      poPromotionProducts.forEach(element => {
        this.rowsProductPromotion.push(element)
      })
      this.poNo = Id
      this.PoConfirmModalVisible = PoConfirmModalState
      this.internalNumber = Snb
      this.status = 0
      this.tableRender()
    },
    // ----------------------------Nhap hang-----------------------

    // -----------------------------Nhap dieu chinh------------------------
    dataFromInputAdjust(data) {
      const [importAdjustsDetail, importAdjustModalState] = data
      importAdjustsDetail.forEach(element => {
        this.AdjustRows.push(element)
      })
      this.AdjustmentModalVisible = importAdjustModalState
      this.poNo = null
      this.internalNumber = 'null'
      this.status = 1
      this.tableRender()
    },
    // -----------------------------Nhap dieu chinh------------------------

    // ------------------------------Nhap vay muon----------------------------
    dataFromInputBorrwo(data) {
      const [importBorrowsDetail, importBorrowModalState] = data
      importBorrowsDetail.forEach(element => {
        this.BorrowColumns.push(element)
      })
      this.BorrowedModalVisible = importBorrowModalState
      this.poNo = null
      this.internalNumber = 'null'
      this.status = 2
      this.tableRender()
    },
    // ------------------------------Nhap vay muon----------------------------
    tableRender() {
      if (this.status === 0) {
        this.columns = this.PoColumns
        this.rows = this.rowsProduct
      } else if (this.status === 1) {
        this.columns = this.AdjustColumns
        this.rows = this.AdjustRows
      } else if (this.status === 2) {
        this.columns = this.BorrowColumns
        this.rows = this.BorrowRows
      }
    },
  },
}
</script>
