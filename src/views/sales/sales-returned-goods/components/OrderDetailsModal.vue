<template>
  <!-- START Popup -->
  <b-modal
    v-model="visible"
    size="xl"
    title="Thông tin chi tiết đơn hàng"
    title-class="font-weight-bolder text-brand-1"
    footer-class="justify-content-center"
    footer-border-variant="light"
    @hidden="onCloseModal"
  >
    <!-- START - Form Info -->
    <b-row class="mx-0">
      <!-- START - Section 1 -->
      <b-col
        class="px-0"
        cols="5"
      >
        <!-- START - Row 1 -->
        <b-row>
          <b-col
            cols="4"
          >
            Ngày mua hàng:
          </b-col>
          <strong>
            {{ orderDate }}
          </strong>
        </b-row>
        <!-- END - Row 1 -->

        <!-- START - Row 2 -->
        <b-row class="mt-1">
          <b-col cols="4">
            Khách hàng:
          </b-col>
          <strong>
            {{ (information.customerName) }}
          </strong>
        </b-row>
        <!-- END - Row 2 -->

        <!-- START - Row 3 -->
        <b-row class="mt-1">
          <b-col cols="4">
            Lý do trả hàng :
          </b-col>
          <strong>
            {{ (information.reason) }}
          </strong>
        </b-row>
        <!-- END - Row 3 -->

      </b-col>
      <!-- END - Section 1 -->

      <!-- START - Section 2 -->
      <b-col class="px-0">
        <!-- START - Row 1 -->
        <b-row>
          <b-col
            cols="3"
          >
            Ngày trả hàng:
          </b-col>
          <strong>
            {{ returnDate }}
          </strong>
        </b-row>
        <!-- END - Row 1 -->

        <!-- START - Row 2 -->
        <b-row class="mt-1">
          <b-col
            cols="3"
          >
            Nhân viên bán hàng:
          </b-col>
          <strong>
            {{ (information.userName) }}
          </strong>
        </b-row>
        <!-- END - Row 2 -->

        <!-- START - Row 3 -->
        <b-row class="mt-1">
          <b-col
            cols="3"
          >
            Thông tin phản hồi :
          </b-col>
          <b-col
            class="px-0"
            cols="3"
          >
            <b-form-textarea
              id="textarea-plaintext"
              readonly
              :value="information.reasonDesc"
            />
          </b-col>
        </b-row>
        <!-- END - Row 3 -->

      </b-col>
      <!-- END - Section 2 -->

    </b-row>
    <!-- END - Form Info -->

    <!-- Start Table -->
    <b-card
      no-body
      class="mt-1"
    >
      <b-tabs
        card
      >
        <!-- START - Product table -->
        <b-tab
          title="Sản phẩm"
          active
          class="p-0"
        >
          <Product
            :producttable="productdetails"
            :info-product-data="infoTotalProduct"
          />
        </b-tab>
        <!-- END - Product table -->

        <!-- START - Product promotion table -->
        <b-tab
          title="Hàng khuyến mãi"
          class="p-0"
        >
          <SaleOff
            :sale-off-table="saleOffDetails"
            :info-promotion-data="infoTotalPromotion"
          />
        </b-tab>
        <!-- END - Product promotion table -->

      </b-tabs>
    </b-card>
    <!-- End Table -->

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="secondary"
        class="d-flex align-items-center text-uppercase h8"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
          class="mr-50"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->

  </b-modal>
  <!-- End Popup -->
</template>

<script>
import Product from './order-details-modal/Product.vue'
import SaleOff from './order-details-modal/SaleOff.vue'

export default {
  components: {
    Product,
    SaleOff,
  },
  props: {
    visible: {
      type: Boolean,
    },
    productdetails: {
      type: Array,
      default: null,
    },
    saleOffDetails: {
      type: Array,
      default: null,
    },
    information: {
      type: Array,
      default: null,
    },
    infoTotalPromotion: {
      type: Array,
      default: null,
    },
    infoTotalProduct: {
      type: Array,
      default: null,
    },

  },
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    orderDate() {
      return (this.$formatISOtoVNI(this.information.orderDate))
    },
    returnDate() {
      return (this.$formatISOtoVNI(this.information.returnDate))
    },
  },
  methods: {
    onCloseModal() {
      this.$emit('close')
    },

  },
}
</script>
