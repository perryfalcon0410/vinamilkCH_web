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
            <div>
              Ngày biên bản: <strong>{{ dateNow }}</strong>
            </div>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <!-- START - Export Code -->

              <b-col>
                <validation-provider
                  v-slot="{ errors, passed, touched }"
                  rules="code|required"
                  name="mã xuất hàng"
                >
                  <div class="mt-1">
                    Mã xuất hàng
                  </div>
                  <b-form-input
                    v-model.trim="output.id"
                    :state="touched ? passed : null"
                    maxlength="40"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <!-- END - Export Code -->
              <b-col>
                <div class="mt-1">
                  Loại xuất hàng
                </div>
                <tree-select
                  v-model="outputTypeSelected"
                  :options="outputTypesOptions"
                  placeholder="Chọn loại xuất hàng"
                  no-options-text="Không có dữ liệu"
                />
              </b-col>
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
                  rules="code|required"
                  name="số hóa đơn"
                >
                  <div class="mt-1">
                    Số hóa đơn
                  </div>
                  <b-form-input
                    v-model.trim="output.transCode"
                    :state="touched ? passed : null"
                    readonly
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
                    v-model="transDate"
                    :config="configDate"
                    class="form-control h8"
                    placeholder="Chọn ngày"
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
                  rules="code|required"
                  name="số nội bộ"
                >
                  <div class="mt-1">
                    Số nội bộ
                  </div>
                  <b-form-input
                    v-model.trim="internalNumber"
                    :state="touched ? passed : null"
                    readonly
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col>
                <div class="mt-1">
                  PO No
                </div>
                <b-input-group
                  id="PoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    v-model="poNumber"
                    trim
                    :state="outputTypeSelected === '0' && touched ? passed : null"
                  />
                  <b-input-group-append is-text>
                    <b-icon-three-dots-vertical
                      class="cursor-pointer"
                      @click="showModal()"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-col>
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
                v-model="note"
                maxlength="4000"
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
                <div v-if="props.column.field === 'ProductReturnAmount' ">
                  <b-form-input
                    v-model="products[props.originalIndex].quantity"
                    maxlength="19"
                    :readonly="exportAll && outputTypeSelected !== '0'"
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
      :visible="visibleAdjustmentModal"
      @onModalHidden="visibleAdjustmentModal = false"
      @choonsenTrans="choonsenTrans($event)"
    />
    <borrowed-modal
      :visible="visibleBorrowedModal"
      @onModalHidden="visibleBorrowedModal = false"
      @choonsenTrans="choonsenTrans($event)"
    />
    <output-modal
      :visible="visibleOutputModal"
      @onModalHidden="visibleOutputModal = false"
      @choonsenTrans="dataFromPo($event)"
    />
    <!-- END - Modal -->
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
import { formatISOtoVNI } from '@/@core/utils/filter'
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
      visibleAdjustmentModal: false,
      visibleBorrowedModal: false,
      visibleOutputModal: false,
      exportAll: false,

      output: {
        id: '',
        transCode: '',
      },
      outputTypeSelected: warehousesData.outputTypes[0].id,
      warehouseTypeSelected: '',
      internalNumber: '',
      poNumber: '',
      note: '',

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
          label: 'Còn lại/Tổng nhập',
          field: 'quantity',
          sortable: false,
        },
        {
          label: 'Số lượng trả',
          field: 'ProductReturnAmount',
          sortable: false,
        },
      ],
      products: [],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      // GET_EXPORT_PO_TRANS_DETAIL_GETTER,
      // GET_EXPORT_AJUSTMENTS_DETAIL_GETTER,
      // GET_EXPORT_BORROWINGS_DETAIL_GETTER,
      GET_WAREHOUSE_TYPE_GETTER,
    ]),

    // poProducts() {
    //   switch (this.outputTypeSelected) {
    //     case '0': // Xuất trả PO
    //       return this.GET_EXPORT_PO_TRANS_DETAIL_GETTER.info
    //     case '1': // Xuất điều chỉnh
    //       return this.GET_EXPORT_AJUSTMENTS_DETAIL_GETTER.response
    //     case '2': // Xuất vay mượn
    //       return this.GET_EXPORT_BORROWINGS_DETAIL_GETTER.response
    //     default:
    //       break
    //   }
    //   return []
    // },
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
        this.poProducts.forEach((item, index) => {
          this.products[index].quantity = item.amountQuantity
        })
      } else {
        this.poProducts.forEach((item, index) => {
          this.products[index].quantity = 0
        })
      }
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPE_ACTION({ ...this.decentralization })
  },

  destroyed() {
    this.CLEAR_EXPORT_PRODUCTS_MUTATION()
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
      switch (this.outputTypeSelected) {
        case '0':
          this.visibleOutputModal = true
          break
        case '1':
          this.visibleAdjustmentModal = true
          break
        case '2':
          this.visibleBorrowedModal = true
          break
        default:
          break
      }
    },
    navigateBack() {
      this.$router.back()
    },
    dataFromPo(data) {
      const [trans, productDetail] = data
      console.log(productDetail)
      this.internalNumber = trans.internalNumber
      this.output.transCode = trans.transCode || trans.adjustmentCode || trans.poBorrowCode
      this.poNumber = trans.poNumber
      this.transDate = formatISOtoVNI(trans.billDate)
      this.note = trans.note || trans.description
      this.output.id = trans.id
      this.products = [...productDetail]
    },
    createExport() {
      this.CREATE_EXPORT_ACTION(
        {
          importType: this.outputTypeSelected,
          isRemainAll: this.exportAll,
          receiptImportId: this.output.id,
          note: this.note,
          litQuantityRemain: this.products.map((item, index) => ({
            id: item.id,
            quantity: this.outputTypeSelected === '0' ? this.products[index].quantity : item.amountQuantity,
          })),
        },
      )
    },
  },
}
</script>
