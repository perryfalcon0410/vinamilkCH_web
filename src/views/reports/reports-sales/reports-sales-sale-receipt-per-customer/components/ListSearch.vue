<template>

  <!-- START - Search -->
  <b-form
    class="d-print-none"
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="điều kiện"
    >
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
          Nhóm khách hàng
        </div>
        <tree-select
          v-model="customerTypesSelected"
          :options="customerTypeOptions"
          title="Nhóm khách hàng"
          :searchable="false"
          no-options-text="Không có dữ liệu"
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
            placeholder="Nhập mã khách hàng"
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
          <b-form-group>
            <b-input-group>
              <b-form-input
                v-model="min"
                class="h8 text-brand-3"
                @keyup.enter="onClickSearchButton"
              />
              <b-form-input
                v-model="max"
                class="h8 text-brand-3"
                @keyup.enter="onClickSearchButton"
              />
            </b-input-group>
          </b-form-group>
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
  REPORT_SALES_SALE_RECEIPT,
  // GETTERS,
  REPORT_SALES_CUSTOMER_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMERS_TYPES_ACTION,
  GET_SALE_RECEIPTS_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      // search
      customerTypesSelected: null,
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
    customerTypeOptions() {
      return this.REPORT_SALES_CUSTOMER_TYPE_GETTER().map(data => ({
        id: data.id,
        label: data.name,
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
    customerTypeOptions() {
      this.customerTypesSelected = this.customerTypeOptions[0].id
      this.onSearch()
    },
  },
  created() {
    this.GET_CUSTOMERS_TYPES_ACTION({ ...this.decentralization })
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },
  methods: {
    ...mapActions(REPORT_SALES_SALE_RECEIPT, [
      GET_CUSTOMERS_TYPES_ACTION,
      GET_SALE_RECEIPTS_ACTION,
    ]),
    ...mapGetters(REPORT_SALES_SALE_RECEIPT, [
      REPORT_SALES_CUSTOMER_TYPES_GETTER,
    ]),

    onSearch() {
      const searchData = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        fromAmount: this.min,
        toAmount: this.max,
        customerTypeId: this.customerTypesSelected,
        keySearch: this.customerCode,
        phoneNumber: this.phoneNumber,
      }
      this.updateSearchData(searchData)
      this.GET_SALE_RECEIPTS_ACTION(searchData)
    },

    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
