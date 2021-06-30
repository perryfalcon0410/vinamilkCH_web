<template>
  <!-- POPUP Invoice Details START -->
  <b-modal
    id="detail-modal"
    size="xl"
    title="Thông tin chi tiết hóa đơn"
    hide-footer="true"
  >

    <!-- Start Billing Information -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row
          class="v-title bg-light py-1 rounded-pill border-top-info border-bottom-info border-right-info align-content-center justify-content-start mb-1 header"
        >
          Thông tin thanh toán
        </b-row>
      </b-col>
      <b-col
        cols="5"
      >
        <b-row class="mt-1">
          <b-col cols="4">
            Số hóa đơn:
          </b-col>
          <b-col cols="8">
            <h5 class="text-left">
              {{ information.orderNumber }}
            </h5>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col cols="4">
            Khách hàng:
          </b-col>
          <b-col cols="8">
            <h5 class="text-left">
              {{ information.customerName }}
            </h5>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col cols="4">
            Ngày thanh toán:
          </b-col>
          <b-col cols="8">
            <h5 class="text-left">
              {{ $formatISOtoVNI(information.orderDate) }}
            </h5>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col cols="4">
            Nhân viên:
          </b-col>
          <b-col cols="8">
            <h5 class="text-left">
              {{ information.saleMan }}
            </h5>
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
              {{ $formatNumberToLocale(information.total) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Đã thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ $formatNumberToLocale(information.totalPaid) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Tiền trả lại:
          </b-col>
          <b-col>
            <h3>
              {{ $formatNumberToLocale(information.balance) }}
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
        <b-row
          class="v-title bg-light py-1 rounded-pill  border-top-info border-bottom-info border-right-info align-content-center mb-1 header"
        >
          Chi tiết hóa đơn
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <invoice-detail
      :data="details"
      :total="detailsTotal"
    />
    <!-- End Invoice details -->

    <!-- Start Discounts and discounts -->
    <discounts
      v-show="discountDetails.length > 0"
      :discounts="discountDetails"
    />
    <!-- Start Discounts and discounts -->

    <!-- Start promotion -->
    <promotion
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
      type: Object,
      default: null,
    },
    discountDetails: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
    }
  },

  methods: {
    cancel() {
      this.$bvModal.hide('detail-modal')
    },
  },
}
</script>
<style lang="scss">
  .v-title {
    border-top-left-radius: 0rem !important;
    border-bottom-left-radius: 0rem !important
  }
  .header {
    margin-left: 0.1rem;
    border-color: #315899
  }
  .modal-title {
  font-size: 14.98px;
  color: #315899;
  font-weight: bolder;
}
</style>
