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
      <b-col
        xl="4"
        lg="6"
        md
        class="bg-white shadow rounded py-1"
      >

        <!-- START - List Item -->
        <b-list-group>
          <b-list-group-item
            class="bg-light"
          >
            Ngày mua hàng
            <strong>:
              {{ orderDate }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            class="bg-light"
          >
            ngày trả hàng
            <strong>:
              <!-- {{ billInfo.employeeName }} -->
            </strong>
          </b-list-group-item>
          <b-list-group-item
            class="bg-light"
          >
            Khách hàng
            <strong>:
              {{ (information.customerName) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            class="bg-light"
          >
            Nhân viên bán hàng
            <strong>:
              {{ (information.userName) }}
            </strong>
          </b-list-group-item>
          <b-list-group-item
            class="bg-light"
          >
            Lý do trả hàng
            <strong>:
              {{ (information.reason) }}
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
            :value="information.reasonDesc"
          />
        </b-col>
        <!-- END - Feedback info -->
      </b-col>
      <b-col>

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
      </b-col>
    </b-row>
    <!-- END - Form Info -->

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
