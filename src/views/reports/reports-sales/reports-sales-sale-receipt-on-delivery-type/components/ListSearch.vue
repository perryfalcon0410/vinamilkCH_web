<template>

  <!-- START - Search -->
  <b-form
    class="d-print-none"
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="điều kiện"
    >

      <!-- START - Receipt Code-->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số hóa đơn
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="receiptCode"
            class="h8 text-brand-3"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="receiptCode"
              class="cursor-pointer text-gray"
              @click="receiptCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Receipt Code -->

      <!-- START from date -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="fromDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromDate"
            :config="configFromDate"
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END from date -->

      <!-- START - Date To -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Đến ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="toDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toDate"
            :config="configToDate"
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date To -->

      <!-- START - Customer group -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Loại giao hàng
        </div>
        <tree-select
          v-model="deliveryTypeDisplayed"
          :options="deliveryTypeOptions"
          title="Loại giao hàng"
          :searchable="false"
          no-options-text="Không có dữ liệu"
          @select="select"
        />
      </b-col>
      <!-- END - Customer group -->

      <!-- START - Customer Code-->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Mã khách hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="customerCode"
            class="h8 text-brand-3"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="customerCode"
              class="cursor-pointer text-gray"
              @click="customerCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Customer Code -->

      <!-- START - Phone number-->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số điện thoại
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="phoneNumber"
            class="h8 text-brand-3"
            placeholder="Nhập SĐT khách hàng"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="phoneNumber"
              class="cursor-pointer text-gray"
              @click="phoneNumber = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Phone number -->

      <!-- START -Income-->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Doanh số
        </div>
        <b-row
          no-gutters
        >
          <b-col>
            <b-form-input
              v-model="min"
              class="h8 text-brand-3"
              @keyup.enter="onClickSearchButton"
            />
          </b-col>
          <b-col>
            <b-form-input
              v-model="max"
              class="h8 text-brand-3"
              @keyup.enter="onClickSearchButton"
            />
          </b-col>
        </b-row>
      </b-col>
      <!-- END - Income -->

      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
  </b-form>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  REPORT_SALES_SALE_ON_DELIVERY_TYPE,
  // GETTERS,
  REPORT_SALES_DELIVERY_TYPES_GETTER,
  // ACTIONS
  GET_SALE_ON_DELIVERY_TYPE_ACTION,
  GET_SALES_DELIVERY_TYPES_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      formId: 5,
      ctrlId: 7,
      deliveryTypeDisplayed: null,
      // search
      receiptCode: null,
      deliveryTypeSelected: null,
      min: null,
      max: null,
      customerCode: null,
      phoneNumber: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
    }
    // search
  },
  computed: {
    deliveryTypeOptions() {
      return this.REPORT_SALES_DELIVERY_TYPES_GETTER().map(data => ({
        id: data.id,
        label: data.apParamName,
        value: data.value,
      }))
    },
  },
  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
    deliveryTypeOptions() {
      this.deliveryTypeDisplayed = this.deliveryTypeOptions[0].id
      this.onSearch()
    },
  },
  created() {
    this.GET_SALES_DELIVERY_TYPES_ACTION({ formId: this.formId, ctrlId: this.ctrlId })
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },
  methods: {
    ...mapActions(REPORT_SALES_SALE_ON_DELIVERY_TYPE, [
      GET_SALE_ON_DELIVERY_TYPE_ACTION,
      GET_SALES_DELIVERY_TYPES_ACTION,
    ]),
    ...mapGetters(REPORT_SALES_SALE_ON_DELIVERY_TYPE, [
      REPORT_SALES_DELIVERY_TYPES_GETTER,
    ]),

    onSearch() {
      const searchData = {
        orderNumber: this.receiptCode, // Số hóa đơn
        fromDate: reverseVniDate(this.fromDate), // từ ngày
        toDate: reverseVniDate(this.toDate), // đến ngày
        fromTotal: this.min, // nhỏ nhất
        toTotal: this.max, // lớn nhất
        apValue: this.deliveryTypeSelected, // loại giao hàng
        customerKW: this.customerCode, // họ tên/mã kh
        phoneText: this.phoneNumber, // SĐT
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      this.updateSearchData(searchData)
      this.GET_SALE_ON_DELIVERY_TYPE_ACTION(searchData)
    },

    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
    select(node) {
      this.deliveryTypeSelected = node.value
    },
  },
}
</script>
