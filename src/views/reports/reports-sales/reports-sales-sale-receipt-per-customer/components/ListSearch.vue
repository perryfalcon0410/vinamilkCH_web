<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <!-- START - Search -->
    <b-form
      class="d-print-none"
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START from date -->
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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Từ ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
              @change="isFromDateValid"
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
        <!-- END from date -->

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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Đến ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
              @change="isToDateValid"
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
                :state="touched ? passed : null"
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
              ref="focusInput"
              v-model="customerCode"
              trim
              class="h7 text-brand-3"
              placeholder="Nhập mã/tên khách hàng"
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
          xl="2"
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
              :formatter="$preventPasteSpecialChars"
              placeholder="Nhập chính xác 4 số cuối"
              @keypress="$onlyNumberInput"
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
            Doanh số
          </div>
          <b-row
            no-gutters
          >
            <b-form-group>
              <b-input-group>
                <b-form-input
                  v-model="min"
                  trim
                  class="h7 text-brand-3"
                  :formatter="$preventPasteSpecialChars"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
                />
                <b-form-input
                  v-model="max"
                  trim
                  class="h7 text-brand-3"
                  :formatter="$preventPasteSpecialChars"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
                />
              </b-input-group>
            </b-form-group>
          </b-row>
        </b-col>
        <!-- END - Income -->

        <!-- START - Search button -->
        <div
          class="mt-2 mx-40"
        >
          <b-button
            class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
            variant="someThing"
            :disabled="invalid"
            @click="onClickSearchButton()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </div>
      <!-- END - Search button -->
      </v-card-actions>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'
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
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    perPageSize: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      dateFormatVNI,
      // search
      customerTypesSelected: null,
      min: null,
      max: null,
      customerCode: null,
      phoneNumber: null,
      fromDate: earlyMonth(),
      toDate: nowDate(),
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
  },
  created() {
    this.GET_CUSTOMERS_TYPES_ACTION({ ...this.decentralization })
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
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
        keySearch: this.customerCode?.trim(),
        phoneNumber: this.phoneNumber?.trim(),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_SALE_RECEIPTS_ACTION({ ...searchData, size: this.perPageSize })
    },

    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
    isFromDateValid() {
      if (!checkingDateInput(this.fromDate)) {
        this.fromDate = earlyMonth()
      }
    },
    isToDateValid() {
      if (!checkingDateInput(this.toDate)) {
        this.toDate = nowDate()
      }
    },
  },
}
</script>
