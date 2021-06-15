<template>
  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      class="d-print-none"
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
            <div class="h8 mt-sm-1 mt-xl-0">
              Từ ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
            >
              <vue-flat-pickr
                v-model="fromDate"
                :state="touched ? passed : null"
                :config="configFromDate"
                class="form-control h8"
                placeholder="Chọn ngày"
              />
              <b-icon-x
                v-show="fromDate"
                style="position: absolute; right: 15px"
                class="cursor-pointer text-gray"
                scale="1.3"
                data-clear
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
            <div class="h8 mt-sm-1 mt-xl-0">
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
                class="form-control h8"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

        </b-col>
        <!-- END - Date To -->

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
  <!-- END - Search -->
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  mapActions,
} from 'vuex'
import {
  REPORT_PURCHASES,
  // Actions
  GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dateFormatVNI,
      // search
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      // search
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
      formId: 5,
      ctrlId: 7,
    }
  },
  watch: {
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
  created() {
    this.onSearch()
  },
  mounted() {
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
    ...mapActions(REPORT_PURCHASES, [
      GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION,
    ]),
    onSearch() {
      const searchData = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_INPUT_RECEIPT_DETAILS_ACTION(searchData)
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
