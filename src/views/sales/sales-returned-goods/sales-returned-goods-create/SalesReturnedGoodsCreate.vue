<template>
  <b-container
    fluid
    class="px-0"
  >

    <validation-observer
      ref="formContainer"
      v-slot="{ invalid }"
      slim
    >
      <b-row class="mx-0">
        <!-- START - Container Left -->
        <b-col
          xl="3"
          lg="6"
          md
          class="bg-white shadow rounded py-1"
        >
          <!-- START - Goods return date -->
          <b-row class="mx-0">
            <b-col
              cols="5"
              class="px-0"
            >
              Ngày trả hàng
            </b-col>
            <strong>
              {{ billInfo.dateReturn }}
            </strong>
          </b-row>
          <!-- END - Goods return date -->

          <!-- START - Order want return -->
          <b-row class="mt-1 mx-0">
            <b-col class="px-0">
              Đơn hàng muốn trả
            </b-col>
          </b-row>
          <!-- END - Order want return -->

          <!-- START - Order input  -->
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="billInfo.orderNumber"
              readonly
            />
            <b-input-group-append
              class="cursor-pointer"
              is-text
              @click="showSelectReceptModal()"
            >
              <b-icon-three-dots-vertical />
            </b-input-group-append>
          </b-input-group>
          <!-- END - Order input  -->

          <!-- START - List Item -->
          <b-list-group v-if="billInfo.id !== ''">
            <b-list-group-item
              class="bg-light item-list-group"
            >
              Ngày mua hàng
              <strong>:
                {{ billInfo.oderDate }}
              </strong>
            </b-list-group-item>
            <b-list-group-item
              class="bg-light item-list-group"
            >
              Nhân viên bán hàng
              <strong>:
                {{ billInfo.employeeName }}
              </strong>
            </b-list-group-item>
            <b-list-group-item
              class="bg-light item-list-group"
            >
              Khách hàng
              <strong>:
                {{ billInfo.customerName }}
              </strong>
            </b-list-group-item>
            <b-list-group-item
              class="bg-light item-list-group"
            >
              Tiền trả lại
              <strong>:
                {{ billInfo.moneyPayback }}
              </strong>
            </b-list-group-item>
          </b-list-group>
          <!-- END - List Item -->

          <!-- START - Order return reason -->
          <b-col
            class="mt-1 px-0"
          >
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="lý do trả hàng"
            >
              <div class="mt-1">
                Lý do trả hàng <sup class="text-danger">*</sup>
              </div>
              <tree-select
                v-model="selectedReason"
                :state="touched ? passed : null"
                :options="reasonReturnOptions"
                :searchable="false"
                placeholder="Chọn lý do trả hàng"
                no-options-text="Không có dữ liệu"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Order return reason -->

          <!-- START - Feedback info -->
          <b-col
            class="mt-1 px-0"
          >
            <validation-provider
              v-slot="{ errors, passed, touched }"
              rules="required"
              name="thông tin phản hồi"
            >
              <div class="mt-1">
                Thông tin phản hồi <sup class="text-danger">*</sup>
              </div>
              <b-form-textarea
                v-model.trim="feedbackInfomation"
                :state="touched ? passed : null"
                maxlength="4000"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        <!-- END - Feedback info -->

        </b-col>
        <!-- END - Container Left -->

        <!-- START - Container Right -->
        <b-col
          class="bg-white shadow rounded ml-1"
        >
          <!-- START - Tables -->
          <b-tabs>
            <!-- START - Product -->
            <b-tab
              title="Sản phẩm"
              active
            >
              <!-- Start Table -->
              <vue-good-table
                :columns="columns"
                :rows="products"
                style-class="vgt-table striped"
                :pagination-options="{
                  enabled: false
                }"
                line-numbers
              >
                <!-- START - Empty rows -->
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>

                <!-- START - Column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-50 h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getProductInfo.totalQuantity) }}
                  </b-row>
                  <b-row
                    v-else-if="props.column.field === 'totalPrice'"
                    class="mx-50 h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getProductInfo.totalAmount) }}
                  </b-row>
                  <b-row
                    v-if="props.column.field === 'discount'"
                    class="mx-50 h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getProductInfo.totalDiscount) }}
                  </b-row>
                  <b-row
                    v-else-if="props.column.field === 'payment'"
                    class="mx-50 h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getProductInfo.allTotal) }}
                  </b-row>
                </template>
              <!-- START - Column filter -->
              </vue-good-table>
            <!-- End table -->
            </b-tab>
            <!-- END - Product -->

            <!-- START - Promotion Product  -->
            <b-tab
              title="Hàng khuyến mãi"
            >
              <vue-good-table
                :columns="promotionTable"
                :rows="productPromotions"
                style-class="vgt-table striped"
                :pagination-options="{
                  enabled: false
                }"
                line-numbers
              >
                <!-- START - Empty rows -->
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>

                <!-- START - Column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-0  h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getPromotionInfo.totalQuantity) }}
                  </b-row>
                  <b-row
                    v-else-if="props.column.field === 'payment'"
                    class="mx-0  h7 text-brand-3 text-right"
                    align-h="end"
                  >
                    {{ (getPromotionInfo.allTotal) }}
                  </b-row>
                </template></vue-good-table>
            </b-tab>
          <!-- END - Promotion Product  -->

          </b-tabs>
          <!-- END - Tables -->

          <!-- START - Buttons -->
          <b-row
            class="my-1 mx-0"
            align-h="end"
            align-v="center"
          >
            <b-button
              variant="someThing"
              :disabled="invalid"
              class="btn-brand-1 align-items-button-center h8"
              @click="onSubmit"
            >
              <b-icon-arrow90deg-left
                class="mr-50"
                scale="1"
              />
              TRẢ HÀNG
            </b-button>

            <b-button
              class="align-items-button-center ml-1 h8"
              @click="onCloseButtonClick"
            >
              <b-icon-x
                scale="1.5"
                class="mr-50"
              />
              ĐÓNG
            </b-button>
          </b-row>
        <!-- END - Buttons -->

        </b-col>
      <!-- END - Container Right -->

      </b-row>

      <!-- START - Modal -->
      <select-recept-modal
        :visible="isShowSelectReceptModal"
        @choosenRecept="choosenRecept"
        @onCloseModal="onCloseModal"
      />
      <!-- END - Modal -->

    </validation-observer>
  </b-container>
</template>

<script>
import {
  formatVniDateToISO,
  nowDate,
} from '@/@core/utils/filter'
import { getNow } from '@/@core/utils/utils'
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
import lodash from 'lodash'
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  required,
} from '@/@core/utils/validations/validations'
import toasts from '@core/utils/toasts/toasts'
import saleData from '@/@db/sale'
import SelectReceptModal from './components/SelectReceptModal.vue'
import {
  RETURNEDGOODS,
  // GETTERS
  RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
  // ACTIONS
  GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
  CREATE_RETURNED_GOOD_ACTION,
  CLEAR_RETURNED_GOODS_MUTATION,
} from '../store-module/type'

export default {
  components: {
    SelectReceptModal,
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      isShowSelectReceptModal: false,
      selectedReason: null,
      reasonReturnOptions: saleData.reasonReturnGoods,
      billInfo: {
        id: null,
        oderDate: null,
        employeeName: null,
        customerName: null,
        moneyPayback: null,
        orderNumber: null,
        dateReturn: getNow(),
        feedbackInfomation: null,
      },
      products: [],
      productPromotions: [],
      reasonReturn: [],
      infoProducts: {
        totalQuantity: null,
        totalAmount: null,
        totalDiscount: null,
        allTotal: null,
      },
      required,
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
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
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng tiền',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền trả lại',
          field: 'payment',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
      ],
      promotionTable: [
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
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tiền trả lại',
          field: 'payment',
          sortable: false,
          type: 'number',
          tdClass: 'pr-2',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(RETURNEDGOODS, [
      RETURNED_GOOD_CHOOSEN_DETAIL_GETTER,
    ]),
    getProducts() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn && this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn.response) {
        return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: data.quantity,
          pricePerUnit: data.pricePerUnit,
          totalPrice: data.totalPrice,
          discount: data.discount,
          payment: data.paymentReturn,
          note: data.note,
        }))
      }
      return []
    },
    getProductPromotions() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn && this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn.response) {
        return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: data.quantity,
          pricePerUnit: data.pricePerUnit,
          totalPrice: data.totalPrice,
          discount: data.discount,
          payment: data.paymentReturn,
          note: data.note,
        }))
      }
      return []
    },
    getReasonReturn() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.reasonReturn) {
        return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.reasonReturn.map(data => ({
          id: data.apCode,
          label: data.apName,
        }))
      }
      return []
    },
    getProductInfo() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn && this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn.info) {
        return lodash.mapValues(this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.productReturn.info, value => this.$formatNumberToLocale(value))
      }
      return {}
    },
    getPromotionInfo() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn && this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn.info) {
        return lodash.mapValues(this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.promotionReturn.info, value => this.$formatNumberToLocale(value))
      }
      return {}
    },
  },

  watch: {
    getProducts() {
      this.products = [...this.getProducts]
    },
    getProductPromotions() {
      this.productPromotions = [...this.getProductPromotions]
    },
    getReasonReturn() {
      this.reasonReturn = [...this.getReasonReturn]
      if (this.reasonReturn) {
        this.reasonReturnOptions = this.reasonReturn
      }
    },
  },

  destroyed() {
    this.CLEAR_RETURNED_GOODS_MUTATION()
  },
  mounted() {
    this.selectedReason = saleData.reasonReturnGoods.find(item => item.id === 'BREAKITEM').id
  },

  methods: {
    showSelectReceptModal() {
      this.isShowSelectReceptModal = true
    },
    onCloseModal() {
      this.isShowSelectReceptModal = false
    },
    choosenRecept(data) {
      const {
        oderDate, id, orderNumber, customerName, total, salesManName,
      } = data.value

      this.GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION({
        id,
      })

      this.billInfo.oderDate = this.$formatISOtoVNI(oderDate)
      this.billInfo.id = id
      this.billInfo.employeeName = salesManName
      this.billInfo.customerName = customerName
      this.billInfo.moneyPayback = total
      this.billInfo.orderNumber = orderNumber
    },
    ...mapMutations(RETURNEDGOODS, [
      CLEAR_RETURNED_GOODS_MUTATION,
    ]),
    ...mapActions(RETURNEDGOODS, [
      GET_RETURNED_GOOD_CHOOSEN_DETAIL_ACTION,
      CREATE_RETURNED_GOOD_ACTION,
    ]),
    onSubmit() {
      if (this.billInfo.orderNumber === null) {
        toasts.error('Xin vui lòng chọn đơn hàng muốn trả!')
        return
      }
      this.CREATE_RETURNED_GOOD_ACTION({
        ...this.decentralization,
        dateReturn: formatVniDateToISO(nowDate()),
        orderNumber: this.billInfo.orderNumber,
        reasonId: this.selectedReason,
        reasonDescription: this.feedbackInfomation,
        createUser: localStorage.getItem('username') || '',
      })
    },
    onCloseButtonClick() {
      this.$router.replace({ name: 'sales-returned-goods' })
    },
  },
}
</script>
<style>
.item-list-group {
  border-color: #fff !important;
  padding-left: 0.75rem;
}
</style>
