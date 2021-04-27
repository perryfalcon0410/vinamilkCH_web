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
        <b-row class="bg-light h-25 w-75 rounded-right border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1">
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
              {{ (information.total) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Đã thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ (information.totalPaid) }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Tiền trả lại:
          </b-col>
          <b-col>
            <h3>
              {{ (information.balance) }}
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
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1">
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
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mt-2 mb-1">
          Giảm giá & chiết khấu
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <Discounts :discounts="discountDetails" />

    <!-- Start Discounts and discounts -->

    <!-- Start promotion -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mt-2 mb-1">
          Khuyến mãi
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <Promotion
      :promotiontable="promotiondetails"
    />
    <!-- Start promotion -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        @click="hideModal"
      >
        <b-row>
          <b-icon-x />
          <h5 class="text-white ">
            Đóng
          </h5>
        </b-row>
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
    promotiondetails: {
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
    }
  },
  computed: {
    paidDate() {
      return moment(this.information.orderDate).format('DD/MM/YYYY')
    },
  },
  methods: {
    hideModal() {
      this.visible = !this.visible
      this.$emit('invisible', false)
    },
  },
}
</script>
