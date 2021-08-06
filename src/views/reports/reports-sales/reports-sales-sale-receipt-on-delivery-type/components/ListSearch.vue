<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <!-- START - Search -->
    <b-form
      class="d-print-none"
      @keyup.enter="onClickSearchButton"
    >
      <v-card-actions
        title="Tìm kiếm"
      >

        <!-- START - Receipt Code-->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số hóa đơn
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              ref="focusInput"
              v-model="receiptCode"
              placeholder="Nhập số hóa đơn"
              class="h7 text-brand-3"
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
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Từ ngày"
          >
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Từ ngày
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
              Đến ngày
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
            Loại giao hàng
          </div>
          <tree-select
            v-model="deliveryTypeSelected"
            :options="deliveryTypeOptions"
            title="Loại giao hàng"
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
              class="h7 text-brand-3"
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
              v-model.trim="phoneNumber"
              class="h7 text-brand-3"
              :formatter="$preventPasteSpecialChars"
              placeholder="Nhập chính xác 4 số cuối"
              @keyup.enter="onClickSearchButton"
              @keypress="$onlyNumberInput"
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
                  v-model.trim="min"
                  class="h7 text-brand-3"
                  :type="number"
                  :formatter="$preventPasteSpecialChars"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
                />
                <b-form-input
                  v-model.trim="max"
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
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'
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
      dateFormatVNI,
      formId: 5,
      ctrlId: 7,
      // search
      receiptCode: null,
      deliveryTypeSelected: null,
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
    deliveryTypeOptions() {
      return this.REPORT_SALES_DELIVERY_TYPES_GETTER().map(data => ({
        id: data.value,
        label: data.apParamName,
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
    this.GET_SALES_DELIVERY_TYPES_ACTION({ formId: this.formId, ctrlId: this.ctrlId })
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
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
        orderNumber: this.receiptCode?.trim(), // Số hóa đơn
        fromDate: reverseVniDate(this.fromDate), // từ ngày
        toDate: reverseVniDate(this.toDate), // đến ngày
        fromTotal: this.min, // nhỏ nhất
        toTotal: this.max, // lớn nhất
        apValue: this.deliveryTypeSelected, // loại giao hàng
        customerKW: this.customerCode?.trim(), // họ tên/mã kh
        phoneText: this.phoneNumber?.trim(), // SĐT
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      this.updateSearchData(searchData)
      this.GET_SALE_ON_DELIVERY_TYPE_ACTION({ ...searchData, size: this.perPageSize })
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
    formatter(value) {
      return value.replace(/[^\w\s]/gi, '')
    },
  },
}
</script>
