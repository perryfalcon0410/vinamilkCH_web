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
        title="Tìm kiếm"
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
            Khách hàng
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
              placeholder="Nhập chính xác 4 số cuối"
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
                  @keyup.enter="onClickSearchButton"
                />
                <b-form-input
                  v-model="max"
                  class="h7 text-brand-3"
                  @keypress="$onlyNumberInput"
                  @keyup.enter="onClickSearchButton"
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
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import toasts from '@/@core/utils/toasts/toasts'
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
      fromDate: earlyMonth(),
      toDate: nowDate(),

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
      formattedFromDate: null,
      formattedToDate: null,
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
    fromDate() {
      const dateParts = this.fromDate.split('/')
      this.formattedFromDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
    toDate() {
      const dateParts = this.toDate.split('/')
      this.formattedToDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      this.configFromDate = {
        ...this.configFromDate,
        maxDate: this.toDate,
      }
    },
  },
  mounted() {
    const fromDateParts = this.fromDate.split('/')
    this.formattedFromDate = new Date(+fromDateParts[2], fromDateParts[1] - 1, +fromDateParts[0])

    const toDateParts = this.toDate.split('/')
    this.formattedToDate = new Date(+toDateParts[2], toDateParts[1] - 1, +toDateParts[0])

    this.GET_CUSTOMERS_TYPES_ACTION({ ...this.decentralization })
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configFromDate = {
      ...this.configFromDate,
      maxDate: this.toDate,
    }
    this.$refs.focusInput.focus()
  },
  methods: {
    ...mapActions(REPORT_SALES_QUANTITY_SALE_RECEIPT, [
      GET_CUSTOMERS_TYPES_ACTION,
      GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION,
    ]),
    onSearch() {
      const diffTime = Math.abs(this.formattedFromDate - this.formattedToDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 1000 * 3600 * 24 number of milliseconds per day
      if (diffDays <= 365) {
        const searchData = {
          fromDate: reverseVniDate(this.fromDate),
          toDate: reverseVniDate(this.toDate),
          fromQuantity: this.min,
          toQuantity: this.max,
          customerTypeId: this.customerTypesSelected,
          keySearch: this.customerCode,
          phoneNumber: this.phoneNumber,
        }
        this.updateSearchData(searchData)
        this.GET_REPORT_SALES_QUANTITY_SALE_RECEIPTS_ACTION(searchData)
      } else {
        toasts.error('Vui lòng chọn khoảng thời gian trong giới hạn 12 tháng')
      }
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
