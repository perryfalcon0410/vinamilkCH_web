<template>
  <!-- POPUP Invoice Details START -->
  <b-modal
    size="xl"
    title="Thông tin chi tiết hóa đơn"
    :visible="visible"
    hide-footer="true"
  >

    <!-- Start Billing Information -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row
          class="v-title bg-light h-25 w-75 rounded-pill border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1"
        >
          Thông tin thanh toán
        </b-row>
      </b-col>
      <b-col
        cols="4"
      >
        <b-row class="mt-1">
          <b-col>
            Số hóa đơn:
          </b-col>
          <b-col>
            <h2 class="text-center">
              {{ information.orderNumber }}
            </h2>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Khách hàng:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ information.customerName }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Ngày thanh toán:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ paidDate }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Nhân viên:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ information.saleMan }}
            </h3>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        cols="4"
        align-self="end"
      >
        <b-row class="mt-1">
          <b-col>
            Phải thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ this.$formatNumberToLocale(information.total) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Đã thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ this.$formatNumberToLocale(information.totalPaid) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Tiền trả lại:
          </b-col>
          <b-col>
            <h3>
              {{ this.$formatNumberToLocale(information.balance) }}
            </h3>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End Billing Information -->

    <!-- Start Invoice details -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="v-title bg-light p-1 w-75 rounded-pill  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1">
          Chi tiết hóa đơn
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <InvoiceDetail
      :detail="details"
      :total="detailsTotal"
    />
    <!-- End Invoice details -->

    <!-- Start Discounts and discounts -->
    <Discounts
      v-show="discountDetails.length > 0"
      :discounts="discountDetails"
    />
    <!-- Start Discounts and discounts -->

    <!-- Start promotion -->
    <Promotion
      v-show="promotionDetails.length > 0"
      :promotiontable="promotionDetails"
    />
    <!-- Start promotion -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
        @click="cancel"
      >
        <b-icon-x
          scale="1.5"
        />
        Đóng
      </b-button>
    </b-row>
  </b-modal>
  <!-- POPUP Invoice Details End -->
</template>

<script>
import moment from 'moment'
import InvoiceDetail from './invoice-detail-modal/InvoiceDetail.vue'
import Discounts from './invoice-detail-modal/Discount.vue'
import Promotion from './invoice-detail-modal/Promotion.vue'

export default {
  components: {
    InvoiceDetail,
    Discounts,
    Promotion,
  },
  props: {
    visible: {
      type: Boolean,
    },
    details: {
      type: Array,
      default: null,
    },
    detailsTotal: {
      type: Array,
      default: null,
    },
    promotionDetails: {
      type: Array,
      default: null,
    },
    information: {
      type: Array,
      default: null,
    },
    discountDetails: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      date: null,
      showDiscountTable: false,
      showPromotionTable: false,
    }
  },
  computed: {
    paidDate() {
      return moment(this.information.orderDate).format('DD/MM/YYYY')
    },
  },

  methods: {
    cancel() {
      this.visible = !this.visible
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss">
  .v-title {
    border-top-left-radius: 0rem !important;
    border-bottom-left-radius: 0rem !important
  }
</style>
