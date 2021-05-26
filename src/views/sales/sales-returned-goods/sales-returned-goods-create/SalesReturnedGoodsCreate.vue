<template>
  <b-container
    fluid
    class="px-0"
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
            cols="3"
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
            variant="secondary"
          >
            Ngày mua hàng
            <strong>
              {{ `: ${billInfo.oderDate}` }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            variant="secondary"
          >
            Nhân viên bán hàng
            <strong>
              {{ `: ${billInfo.employeeName}` }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            variant="secondary"
          >
            Khách hàng
            <strong>
              {{ `: ${billInfo.customerName}` }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            variant="secondary"
          >
            Tiền trả lại
            <strong>
              {{ `: ${billInfo.moneyPayback}` }}
            </strong>
          </b-list-group-item>
        </b-list-group>
        <!-- END - List Item -->

        <!-- START - Order return reason -->
        <b-col
          class="mt-1 px-0"
        >
          <div>
            Lý do trả hàng
          </div>
          <tree-select
            v-model="selectedReason"
            :options="reasonReturnOptions"
            :searchable="false"
            placeholder="Chọn lý do trả hàng"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Order return reason -->

        <!-- START - Feedback info -->
        <b-col class="px-0 mt-1">
          <div>
            Thông tin phản hồi
          </div>
          <b-form-textarea
            v-model="feedbackInfomation"
          />
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
              style-class="vgt-table bordered"
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
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (getProductInfo.totalQuantity) }} -->
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'totalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalAmount) }} -->
                </b-row>
                <b-row
                  v-if="props.column.field === 'discount'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalDiscount) }} -->
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'payment'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalDiscount) }} -->
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
              :columns="columns"
              :rows="productPromotions"
              style-class="vgt-table bordered"
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
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (getProductInfo.totalQuantity) }} -->
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'totalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalAmount) }} -->
                </b-row>
                <b-row
                  v-if="props.column.field === 'discount'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalDiscount) }} -->
                </b-row>
                <b-row
                  v-else-if="props.column.field === 'payment'"
                  class="mx-0"
                  align-h="end"
                >
                  0
                  <!-- {{ (infoProductData.totalDiscount) }} -->
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
            class="btn-brand-1 align-items-button-center"
            @click="onSubmit"
          >
            <b-icon-arrow90deg-left
              class="mr-05"
              scale="1"
            />
            TRẢ HÀNG
          </b-button>

          <b-button
            class="align-items-button-center ml-1"
            @click="onCloseButtonClick"
          >
            <b-icon-x scale="1.5" />
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

  </b-container>
</template>

<script>
import {
  formatISOtoVNI,
} from '@/@core/utils/filter'
import { getNow } from '@/@core/utils/utils'
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
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
          label: 'ĐVT',
          field: 'unit',
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
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá bán',
          field: 'pricePerUnit',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tổng tiền',
          field: 'totalPrice',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giảm giá',
          field: 'discount',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tiền trả lại',
          field: 'payment',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
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
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          payment: this.$formatNumberToLocale(data.payment),
          note: this.$formatNumberToLocale(data.note),
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
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          payment: this.$formatNumberToLocale(data.payment),
          note: data.note,
        }))
      }
      return []
    },
    getReasonReturn() {
      if (this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.products) {
        return this.RETURNED_GOOD_CHOOSEN_DETAIL_GETTER.products.reasonReturn.map(data => ({
          value: data.apCode,
          text: data.apName,
        }))
      }
      return []
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

      this.billInfo.oderDate = formatISOtoVNI(oderDate)
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
      if (this.billInfo.orderNumber === '') {
        toasts.error('Xin vui lòng chọn đơn hàng muốn trả!')
        return
      }

      this.CREATE_RETURNED_GOOD_ACTION({
        ...this.decentralization,
        dateReturn: new Date(),
        orderNumber: this.billInfo.orderNumber,
        reasonId: this.selectedReason,
        feedbackInfomation: this.feedbackInfomation,
        createUser: localStorage.getItem('username') || '',
      })
    },
    onCloseButtonClick() {
      this.$router.replace({ name: 'sales-returned-goods' })
    },
  },
}
</script>
