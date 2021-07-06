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

        <!-- START - List Item -->
        <b-list-group>
          <b-list-group-item>
            Ngày mua hàng
            <strong>:
              {{ this.$formatISOtoVNI(detailReturnInfo.orderDate) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item>
            ngày trả hàng
            <strong>:
              {{ this.$formatISOtoVNI(detailReturnInfo.returnDate) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item>
            Khách hàng
            <strong>:
              {{ (detailReturnInfo.customerName) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item>
            Nhân viên bán hàng
            <strong>:
              {{ (detailReturnInfo.userName) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item>
            Lý do trả hàng
            <strong>:
              {{ (detailReturnInfo.reason) }}
            </strong>
          </b-list-group-item>
        </b-list-group>
        <!-- END - List Item -->

        <!-- START - Feedback info -->
        <b-col
          class="mt-1 px-0"
        >
          <div class="mt-1">
            Thông tin phản hồi
          </div>
          <b-form-textarea
            id="textarea-plaintext"
            readonly
            :value="detailReturnInfo.reasonDesc"
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
            <product
              :producttable="detailReturnProducts"
              :info-product-data="infoProduct"
            />
            <!-- End table -->
          </b-tab>
          <!-- END - Product -->

          <!-- START - Promotion Product  -->
          <b-tab
            title="Hàng khuyến mãi"
          >
            <!-- Start Table -->
            <sale-off
              :sale-off-table="detailReturnPromotions"
              :info-promotion-data="infoPromotion"
            />
            <!-- End table -->
          </b-tab>
          <!-- END - Promotion Product  -->

        </b-tabs>
        <!-- END - Tables -->

        <!-- START - Buttons -->
        <b-row
          class="my-1 mx-0"
          align-h="end"
          align-v="end"
        >

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
  </b-container>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex'
import Product from '../components/order-details-modal/Product.vue'
import SaleOff from '../components/order-details-modal/SaleOff.vue'
import {
  // GETTERS
  RETURNEDGOODS,
  RETURN_GOODS_DETAIL_GETTER,
  // ACTION
  GET_RETURN_GOODS_DETAIL_ACTION,
} from '../store-module/type'

export default {
  components: {
    Product,
    SaleOff,
  },

  data() {
    return {
      detailReturnProducts: [],
      detailReturnPromotions: [],
    }
  },

  computed: {
    ...mapGetters(RETURNEDGOODS, [
      RETURN_GOODS_DETAIL_GETTER,
    ]),
    // return goods detail
    getDetailReturnProducts() {
      if (this.RETURN_GOODS_DETAIL_GETTER.productReturn && this.RETURN_GOODS_DETAIL_GETTER.productReturn.response) {
        return this.RETURN_GOODS_DETAIL_GETTER.productReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          paymentReturn: this.$formatNumberToLocale(data.paymentReturn),
        }))
      }
      return []
    },

    getDetailReturnPromotions() {
      if (this.RETURN_GOODS_DETAIL_GETTER.promotionReturn && this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.response) {
        return this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.response.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          pricePerUnit: this.$formatNumberToLocale(data.pricePerUnit),
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
          discount: this.$formatNumberToLocale(data.discount),
          paymentReturn: this.$formatNumberToLocale(data.paymentReturn),
        }))
      }
      return []
    },
    infoProduct() {
      if (this.RETURN_GOODS_DETAIL_GETTER.productReturn && this.RETURN_GOODS_DETAIL_GETTER.productReturn.info) {
        return this.RETURN_GOODS_DETAIL_GETTER.productReturn.info
      }
      return {}
    },
    infoPromotion() {
      if (this.RETURN_GOODS_DETAIL_GETTER.promotionReturn && this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.info) {
        return this.RETURN_GOODS_DETAIL_GETTER.promotionReturn.info
      }
      return {}
    },
    detailReturnInfo() {
      if (this.RETURN_GOODS_DETAIL_GETTER.infos) {
        return this.RETURN_GOODS_DETAIL_GETTER.infos
      }
      return {}
    },
  },
  watch: {
    getDetailReturnPromotions() {
      this.detailReturnPromotions = [...this.getDetailReturnPromotions]
    },
    getDetailReturnProducts() {
      this.detailReturnProducts = [...this.getDetailReturnProducts]
    },
  },

  destroyed() {
  },
  mounted() {
    this.GET_RETURN_GOODS_DETAIL_ACTION({
      data: {
        id: this.$route.params.id,
      },
      onSuccess: () => {},
    })
  },

  methods: {
    ...mapActions(RETURNEDGOODS, [
      GET_RETURN_GOODS_DETAIL_ACTION,
    ]),

    onCloseButtonClick() {
      this.$router.replace({ name: 'sales-returned-goods' })
    },
  },
}
</script>
<style>
.list-group-item:hover {
  background-color: #fff !important;
}
</style>
