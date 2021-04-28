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
                {{ transDate }} lúc {{ transTime }}
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Mã nhập hàng"
                  label-for="transCode"
                >
                  <b-form-input
                    id="transCode"
                    v-model="transCode"
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
                  <b-form-input
                    id="import-type"
                    v-model="importTypeName"
                    disabled
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
                v-model="wareHouseTypeName"
                disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                      v-model="poNumber"
                      trim
                      :state="importType === '1' && touched ? passed : null"
                      disabled
                    />
                    <b-input-group-append is-text>
                      <b-icon-three-dots-vertical />
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
            <div v-if="totalProductQuantity > 0">
              <!-- START - Table Product -->
              <div class="d-inline-flex rounded-top px-1 my-1">
                <strong>
                  Sản phẩm
                </strong>
              </div>

              <vue-good-table
                :columns="columns"
                :rows="products"
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
                    align-h="end"
                  >
                    {{ totalProductQuantity }}
                  </b-row>

                  <b-row
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-0"
                    align-h="end"
                  >
                    {{ totalProductPrice }}
                  </b-row>
                </template>
                <!-- START - Column filter -->
              </vue-good-table>
              <!-- END - Table Product -->
            </div>

            <!-- START - Table Product promotion -->
            <div class="d-inline-flex rounded-top px-1 my-1">
              <strong>
                Hàng khuyến mãi
              </strong>
            </div>

            <vue-good-table
              :columns="columns"
              :rows="promotions"
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
                  align-h="end"
                >
                  {{ totalPromotionQuantity }}
                </b-row>

                <b-row
                  v-else-if="props.column.field === 'totalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ totalPromotionPrice }}
                </b-row>
              </template>
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field === 'quantity'">
                  <b-input
                    size="sm"
                    :number="true"
                    :value="props.row.quantity"
                    v-model="props.row.quantity"
                    @change="updateQuantity(props.row.originalIndex, props.row.quantity)"
                  />
                </div>
                <div
                  v-else-if="props.column.field === 'feature'"
                  align-h="center"
                >
                  <b-button
                    variant="light"
                    class="rounded-circle ml-1 p-1"
                    @click="onClickDeleteButton(props.row.originalIndex)"
                  >
                    <b-icon-x-circle
                      color="black"
                    />
                  </b-button>
                </div>
              </template>
              <!-- START - Column filter -->
            </vue-good-table>
            <div v-if="importType === 0 && totalProductQuantity === 0">
              <div
                slot="table-actions-bottom"
                class="mx-1 my-2 px-2"
              >
                <b-form-input
                  class="w-25"
                  v-model="productSearch"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  type="text"
                  autocomplete="off"
                  @focus="focus"
                  @blur="inputSearchFocusedSP = false"
                  @input="loadProducts"
                  @keyup.enter="keyEnter"
                  @keydown.up="keyUp"
                  @keydown.down="keyDown"
                  @click="click"
                />
                <b-collapse
                  v-model="inputSearchFocusedSP"
                  class="position-absolute mr-lg-0 mb-3"
                  style="zIndex:1"
                >
                  <b-container
                    class="my-1 bg-white rounded border border-primary shadow-lg"
                  >
                    <b-col>
                        <b-row
                          v-for="(product, index) in allProducts"
                          :key="index"
                          class="my-1 cursor-pointer"
                          :class="{'item-active': index === cursor}"
                          @click="selectProduct(product)"
                          @mouseover="$event.target.classList.add('item-active')"
                          @mouseout="$event.target.classList.remove('item-active')"
                        >
                          <b>{{ product.productCode }}</b> - {{ product.productName }}
                        </b-row>
                    </b-col>
                  </b-container>
                </b-collapse>
              </div>
            </div>
            <!-- END - Table Product promotion -->

            <!-- START - Button -->
            <b-row class="m-1 justify-content-end">
              <b-button-group>
                <b-button
                  variant="primary"
                  class="d-flex align-items-center rounded text-uppercase"
                  :disabled="transDate !== today"
                  @click="updateReceipt"
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
    <adjustment-modal :visible="AdjustmentModalVisible" />
    <borrowed-modal :visible="BorrowedModalVisible" />
    <po-confirm-modal :visible="PoConfirmModalVisible" />
    <!-- END - Modal -->

  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
} from '@/@core/utils/validations/validations'
import { formatDateToLocale, getTimeOfDate } from '@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'
import {
  WAREHOUSEINPUT,
  // GETTERS
  RECEIPT_BY_ID_GETTER,
  PRODUCTS_BY_ID_GETTER,
  PROMOTIONS_BY_ID_GETTER,
  PRODUCTS_GETTER,
  // ACTIONS
  GET_RECEIPT_BY_ID_ACTION,
  GET_PRODUCTS_BY_ID_ACTION,
  GET_PRODUCTS_ACTION,
  UPDATE_RECEIPT_ACTION,
} from '../store-module/type'

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

      warehouse: '',
      billNumber: '',
      billDate: '',
      internalNumber: '',
      poNumber: '',
      poId: '',
      note: '',
      transCode: '',
      transDate: '',
      transTime: '',
      wareHouseTypeName: '',
      today: formatDateToLocale(new Date()),
      importTypeName: '',
      warehousesInputOptions: warehousesData.inputTypes,

      // validation rules
      number,
      required,

      columns: [
        {
          label: 'Mã hàng',
          field: 'productCode',
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
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'name',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'feature',
          sortable: false,
        },
      ],
      promotions: [],
      cursor: -1,
      productSearch: '',
      inputSearchFocusedSP: false,
      totalPromotionQuantity: 0,
    }
  },

  computed: {
    receipt() {
      return this.RECEIPT_BY_ID_GETTER()
    },
    products() {
      return this.PRODUCTS_BY_ID_GETTER().map(data => ({
        productCode: data.productCode,
        quantity: data.quantity,
        price: data.price,
        name: data.productName,
        unit: data.unit,
        totalPrice: data.totalPrice,
        soNo: data.soNo,
      }))
    },
    totalProductQuantity() {
      let totalQuantity = 0
      this.products.forEach(item => {
        totalQuantity += item.quantity
      })

      return totalQuantity
    },
    totalProductPrice() {
      let totalPrice = 0
      this.products.forEach(item => {
        totalPrice += item.totalPrice
      })

      return totalPrice
    },
    getPromotions() {
      return this.PROMOTIONS_BY_ID_GETTER().map(data => ({
        id: data.id,
        productId: data.productId,
        productCode: data.productCode,
        quantity: data.quantity,
        price: data.price,
        name: data.productName,
        unit: data.unit,
        totalPrice: data.totalPrice,
        soNo: data.soNo,
      }))
    },
    getTotalPromotionQuantity() {
      let totalQuantity = 0
      this.promotions.forEach(item => {
        totalQuantity += item.quantity
      })

      return totalQuantity
    },
    totalPromotionPrice() {
      return 0
    },
    id() {
      return this.$route.params.id
    },
    importType() {
      return this.$route.params.type
    },
    allProducts() {
      return this.PRODUCTS_GETTER().map(data => ({
        productId: data.id,
        productCode: data.productCode,
        quantity: 1,
        price: 0,
        productName: data.productName,
        unit: data.uom1,
        totalPrice: 0,
        soNo: '',
      }))
    },
  },

  watch: {
    receipt() {
      this.transCode = this.RECEIPT_BY_ID_GETTER().transCode
      this.transDate = formatDateToLocale(this.RECEIPT_BY_ID_GETTER().transDate)
      this.transTime = getTimeOfDate(this.RECEIPT_BY_ID_GETTER().transDate)
      this.wareHouseTypeName = this.RECEIPT_BY_ID_GETTER().wareHouseTypeName
      this.billNumber = this.RECEIPT_BY_ID_GETTER().redInvoiceNo
      this.billDate = this.RECEIPT_BY_ID_GETTER().orderDate || this.RECEIPT_BY_ID_GETTER().adjustmentDate || this.RECEIPT_BY_ID_GETTER().adjustmentDate
      this.internalNumber = this.RECEIPT_BY_ID_GETTER().internalNumber
      this.poNumber = this.RECEIPT_BY_ID_GETTER().poNumber
      this.note = this.RECEIPT_BY_ID_GETTER().note
      this.poId = this.RECEIPT_BY_ID_GETTER().poId
      this.importTypeName = this.warehousesInputOptions[this.$route.params.type].name
    },
    getPromotions() {
      this.promotions = [...this.getPromotions]
    },
    getTotalPromotionQuantity() {
      this.totalPromotionQuantity = this.getTotalPromotionQuantity
    },
  },

  mounted() {
    this.GET_RECEIPT_BY_ID_ACTION(`${this.id}?type=${this.importType}`)
    this.GET_PRODUCTS_BY_ID_ACTION(`${this.id}?type=${this.importType}`)
  },

  methods: {
    ...mapGetters(WAREHOUSEINPUT, {
      RECEIPT_BY_ID_GETTER,
      PRODUCTS_BY_ID_GETTER,
      PROMOTIONS_BY_ID_GETTER,
      PRODUCTS_GETTER,
    }),
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPT_BY_ID_ACTION,
      GET_PRODUCTS_BY_ID_ACTION,
      GET_PRODUCTS_ACTION,
      UPDATE_RECEIPT_ACTION,
    ]),

    showModal() {
      const PoConfirm = this.importType === '1' ? this.PoConfirmModalVisible = !this.PoConfirmModalVisible : this.PoConfirmModalVisible = false
      const Adjustment = this.importType === '2' ? this.AdjustmentModalVisible = !this.AdjustmentModalVisible : this.AdjustmentModalVisible = false
      const Borrowed = this.importType === '3' ? this.BorrowedModalVisible = !this.BorrowedModalVisible : this.BorrowedModalVisible = false

      return PoConfirm && Adjustment && Borrowed
    },
    navigateBack() {
      this.$router.back()
    },
    loadProducts() {
      this.cursor = -1
      const test = this.promotions.map(data => data.productId)
      this.GET_PRODUCTS_ACTION({
        keyWord: this.productSearch.trim(),
        productIds: test,
      })
    },
    selectProduct(product) {
      this.promotions.push({
        id: -1,
        productId: product.productId,
        productCode: product.productCode,
        quantity: 1,
        price: product.price,
        name: product.productName,
        unit: product.unit,
        totalPrice: 0,
        soNo: '',
      })
    },
    focus() {
      this.cursor = -1
      this.inputSearchFocusedSP = true
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    keyDown() {
      if (this.cursor < this.allProducts.length) {
        this.cursor += 1
      }
    },
    keyEnter() {
      if (this.inputSearchFocusedSP && this.allProducts[this.cursor]) {
        this.selectProduct(this.allProducts[this.cursor])
        this.inputSearchFocusedSP = false
      }
    },
    updateQuantity(index, value) {
      this.promotions[index].quantity = value + 0
    },
    updateReceipt() {
      const updatedPromotions = this.promotions.map(data => ({
        id: data.id,
        productId: data.productId,
        quantity: data.quantity,
      }))
      this.UPDATE_RECEIPT_ACTION({
        id: this.id,
        type: this.importType,
        note: this.note,
        lstUpdate: updatedPromotions,
      })
    },
    click() {
      this.GET_PRODUCTS_ACTION({
        keyWord: this.productSearch.trim(),
        productIds: this.promotions.map(data => data.productId),
      })
    },
    onClickDeleteButton(index) {
      this.promotions.splice(index, 1)
    },
  },

}
</script>
<style>
  .item-active {
    padding-left: 5px;
  }
</style>
