<template>

  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      class="d-print-none"
      @keyup.enter="onClickSearchButton"
    >
      <v-card-actions
        title="Điều kiện"
      >

        <!-- START - Date From -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Từ ngày"
          >
            <div class="h7 mt-sm-1 mt-xl-0">
              Từ ngày <span class="text-danger">*</span>
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
                :state="touched ? passed : null"
                :config="configFromDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Đến ngày"
          >
            <div class="h7 mt-sm-1 mt-xl-0">
              Đến ngày <span class="text-danger">*</span>
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
                :state="touched ? passed : null"
                :config="configToDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Date To -->

        <!-- START - Customer group -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Nhóm khách hàng
          </div>
          <tree-select
            v-model="customerTypesSelected"
            :options="customerTypeOptions"
            title="Nhóm khách hàng"
            :searchable="false"
            placeholder="Tất cả"
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Mã khách hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="customerCode"
              trim
              class="h7 text-brand-3"
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số điện thoại
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="phoneNumber"
              trim
              class="h7 text-brand-3"
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số lượng
          </div>
          <b-row
            no-gutters
          >
            <b-form-group>
              <b-input-group>
                <b-form-input
                  v-model="min"
                  class="h7 text-brand-3"
                  @keypress="$onlyNumberInput"
                  @change="checkValueMin"
                  @keyup.enter="onClickSearchButton"
                />
                <b-form-input
                  v-model="max"
                  class="h7 text-brand-3"
                  @keypress="$onlyNumberInput"
                  @change="checkValueMax"
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
            class="h7 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
            variant="someThing"
            :disabled="invalid"
            @click="onClickSearchButton()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
        <!-- END - Search button -->
      </v-card-actions>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  required,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  REPORT_SALES_QUANTITY_SALE_RECEIPT,
  // GETTERS,
  REPORT_SALES_CUSTOMER_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMERS_TYPES_ACTION,
  GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
    ValidationProvider,
    ValidationObserver,
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
      required,
      customerCode: null,
      phoneNumber: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: this.toDate,
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
    ...mapGetters(REPORT_SALES_QUANTITY_SALE_RECEIPT, [
      REPORT_SALES_CUSTOMER_TYPES_GETTER,
    ]),
    customerTypeOptions() {
      return this.REPORT_SALES_CUSTOMER_TYPE_GETTER.map(data => ({
        id: data.id,
        label: data.name,
      }))
    },
  },
  watch: {
    customerTypeOptions() {
      this.getcustomerTypeDefault()
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
    toDate() {
      this.configFromDate = {
        ...this.configFromDate,
        maxDate: this.toDate,
      }
    },
  },
  mounted() {
    this.GET_CUSTOMERS_TYPES_ACTION({ ...this.decentralization })
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configFromDate = {
      ...this.configFromDate,
      maxDate: this.toDate,
    }
  },
  methods: {
    ...mapActions(REPORT_SALES_QUANTITY_SALE_RECEIPT, [
      GET_CUSTOMERS_TYPES_ACTION,
      GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
    ]),
    getcustomerTypeDefault() {
      this.customerTypesSelected = 1 // hard code
      this.onSearch()
    },
    checkValueMin(value) {
      if (this.max) {
        if (value > this.max) {
          this.max = null
        }
      }
    },
    checkValueMax(value) {
      if (this.min) {
        if (this.min > value) {
          this.min = null
        }
      }
    },
    onSearch() {
      if (!this.customerTypesSelected) {
        this.customerTypesSelected = 1
      }
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
      this.GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION(searchData)
    },

    onClickSearchButton() {
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.onSearch()
          this.$emit('onClickSearchButton')
        }
      })
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
