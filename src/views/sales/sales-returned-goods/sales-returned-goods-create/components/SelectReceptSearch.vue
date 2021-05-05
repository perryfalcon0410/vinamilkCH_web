<template>
  <div>
    <!-- START - Search -->
    <b-form class="bg-white rounded shadow">
      <div class="text-primary p-1">
        <strong>
          Tìm kiếm
        </strong>
      </div>

      <b-form-row
        class="border-top mx-0 p-1"
      >
        <b-col
          xl
          sm="6"
        >
          <b-form-group
            label="Số hóa đơn"
            label-for="form-input-customer"
          >
            <b-form-input
              id="form-input-customer"
              v-model="orderNumber"
              placeholder="Nhập số hóa đơn"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="6"
        >
          <b-form-group
            label="Khách hàng"
            label-for="form-input-customer-group"
          >
            <b-form-input
              v-model="customerName"
              placeholder="Nhập Khách hàng"
              trim
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="6"
        >
          <b-form-group
            label="Sản phẩm"
            label-for="form-input-customer-group"
          >
            <b-form-input
              v-model="productName"
              placeholder="Nhập Sản phẩm"
              trim
            />
          </b-form-group>
        </b-col>
        <b-col
          xl
          sm="6"
        >
          <b-form-group
            label="Từ ngày"
            label-for="form-input-date-from"
          >
            <b-form-datepicker
              id="form-input-date-from"
              v-model="valueDateFrom"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="6"
        >
          <b-form-group
            label="Đến ngày"
            label-for="form-input-date-to"
          >
            <b-form-datepicker
              id="form-input-date-to"
              v-model="valueDateTo"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>

        <b-col
          xl
          sm="6"
          md="12"
        >
          <b-form-group
            label="Tìm kiếm"
            label-for="form-button-search"
          >
            <b-button
              id="form-button-search"
              variant="primary"
              @click="onSearchClick"
            >
              <b-icon-search />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>

      </b-form-row>
    </b-form>
    <!-- END - Search -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      orderNumber: '',
      customerName: '',
      productName: '',
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearchClick', {
        fromDate: this.valueDateFrom,
        toDate: this.valueDateTo,
        searchKeywords: this.customerName,
        orderNumber: this.orderNumber,
        product: this.productName,
      })
    },
  },
}
</script>
