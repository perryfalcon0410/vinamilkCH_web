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
                    v-model.trim="id"
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
                    v-model.trim="transCode"
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
              :rows="poProducts"
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
                    v-model="amount[props.row.originalIndex].number"
                    :class="amount[props.row.originalIndex].number > props.row.amountQuantity ||amount[props.row.originalIndex].number < 0 ? 'border-danger' : ''"
                    size="sm"
                    type="number"
                    :readonly="exportAll && outputTypeSelected !== '0'"
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
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
    />
    <borrowed-modal
      :visible="visibleBorrowedModal"
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
    />
    <output-modal
      :visible="visibleOutputModal"
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
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
import { isEmpty, getNow } from '@core/utils/utils'
import OutputModal from '../components/output-modal/OutputModal.vue'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'
import {
  WAREHOUSES_OUTPUT,
  // GETTERS
  GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  GET_WAREHOUSE_TYPE_GETTER,
  // MUTATIONS
  CLEAR_EXPORT_PRODUCTS_MUTATION,
  // ACTIONS
  GET_EXPORT_PO_TRANS_DETAIL_ACTION,
  GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
  GET_EXPORT_BORROWINGS_DETAIL_ACTION,
  GET_WAREHOUSE_TYPE_ACTION,
  CREATE_EXPORT_ACTION,
} from '../store-module/type'
import toasts from '../../../../@core/utils/toasts/toasts'

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
      id: '',
      transCode: '',
      outputTypeSelected: warehousesData.outputTypes[0].id,
      warehouseTypeSelected: '',
      internalNumber: '',
      transDate: '',
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
      amount: [],
    }
  },

  computed: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_DETAIL_GETTER,
      GET_WAREHOUSE_TYPE_GETTER,
    ]),

    poProducts() {
      return this.GET_EXPORT_PO_TRANS_DETAIL_GETTER.map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        unit: data.unit,
        totalPrice: data.totalPrice,
        export: this.outputTypeSelected === '0' ? `${data.export}/${data.quantity}` : 0,
        quantity: this.outputTypeSelected === '0' ? `${data.quantity - data.export}/${data.quantity}` : data.quantity,
        productReturnAmount: 0,
        amountQuantity: data.quantity,
      }))
    },
    getWareHouseType() {
      return this.GET_WAREHOUSE_TYPE_GETTER
    },
  },

  watch: {
    poProducts() {
      this.amount = []
      this.poProducts.forEach(item => {
        this.amount.push({
          number: this.outputTypeSelected === '0' ? 0 : item.amountQuantity,
        })
      })
    },
    outputTypeSelected() {
      this.CLEAR_EXPORT_PRODUCTS_MUTATION()
      this.internalNumber = ''
      this.internalNumber = ''
      this.transCode = ''
      this.poNumber = ''
      this.transDate = ''
      this.note = ''
      this.amount = []
    },
    exportAll() {
      if (this.exportAll) {
        this.poProducts.forEach((item, index) => {
          this.amount[index].number = item.amountQuantity
        })
      } else {
        this.poProducts.forEach((item, index) => {
          this.amount[index].number = 0
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
      GET_EXPORT_PO_TRANS_DETAIL_ACTION,
      GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
      GET_EXPORT_BORROWINGS_DETAIL_ACTION,
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
    onModalHidden(id) {
      if (!id && isEmpty(this.id)) {
        this.CLEAR_EXPORT_PRODUCTS_MUTATION()
      }

      switch (this.outputTypeSelected) {
        case '0': // Xuất trả PO
          this.visibleOutputModal = false
          if (id) {
            this.exportAll = false
            this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(id)
          } else if (!isEmpty(this.id)) {
            this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(this.id)
          }
          break
        case '1': // Xuất điều chỉnh
          this.visibleAdjustmentModal = false
          if (id) {
            this.exportAll = true
            this.GET_EXPORT_AJUSTMENT_DETAIL_ACTION(id)
          } else if (!isEmpty(this.id)) {
            this.GET_EXPORT_AJUSTMENT_DETAIL_ACTION(this.id)
          }
          break
        case '2': // Xuất vay mượn
          this.visibleBorrowedModal = false
          if (id) {
            this.exportAll = true
            this.GET_EXPORT_BORROWINGS_DETAIL_ACTION(id)
          } else if (!isEmpty(this.id)) {
            this.GET_EXPORT_BORROWINGS_DETAIL_ACTION(this.id)
          }
          break
        default:
          break
      }
    },
    choonsenTrans(trans) {
      const {
        internalNumber, transCode, poNumber, billDate, adjustmentCode, note, poBorrowCode, description, id,
      } = trans

      this.internalNumber = internalNumber
      this.transCode = transCode || adjustmentCode || poBorrowCode
      this.poNumber = poNumber
      this.transDate = billDate
      this.note = note || description
      this.id = id
    },
    createExport() {
      const poProductIndexFound = this.poProducts.findIndex((item, index) => this.amount[index].number > item.amountQuantity || this.amount[index].number <= 0)

      if (poProductIndexFound > -1) {
        toasts.error('Số lượng xuất không chính xác')

        return
      }

      this.CREATE_EXPORT_ACTION(
        {
          importType: this.outputTypeSelected,
          isRemainAll: this.exportAll,
          receiptImportId: this.id,
          note: this.note,
          litQuantityRemain: [...this.poProducts.map((item, index) => ({
            id: item.id,
            quantity: this.outputTypeSelected === '0' ? this.amount[index].number : item.amountQuantity,
          }))],
        },
      )
    },
  },
}
</script>
