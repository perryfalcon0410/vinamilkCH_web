<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <!-- START - Search -->
    <b-form
      @keydown.enter="onClickSearchButton"
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Trans Code -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
          >
            Mã nhập hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              id="form-input-trans-code"
              ref="focusInput"
              v-model="transCode"
              maxlength="40"
              class="h7"
              placeholder="Nhập mã nhập hàng"
              trim
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="transCode"
                class="cursor-pointer text-gray"
                @click="transCode = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Trans Code -->

        <!-- START - Bill Number -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
          >
            Số hóa đơn
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              id="form-input-bill-number"
              v-model="billNumber"
              maxlength="40"
              class="h7"
              placeholder="Nhập số hóa đơn"
              trim
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="billNumber"
                class="cursor-pointer text-gray"
                @click="billNumber = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Bill Number -->

        <!-- START - Date From -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Từ ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
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
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Đến ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
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

        <!-- START - Warehouses Input Type -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
          >
            Loại nhập
          </div>
          <tree-select
            v-model="inputTypesSelected"
            :options="inputTypeOptions"
            :searchable="false"
            placeholder="Tất cả"
            class="h7"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Warehouses Input Type -->

        <!-- START - Search button -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <!--"onmousedown" is prevent hightlight text -->
          <div
            class="text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
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
  <!-- END - Search -->
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
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapActions } from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import {
  WAREHOUSEINPUT,
  GET_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    VCardActions,
  },
  data() {
    return {
      dateFormatVNI,
      billNumber: '',
      transCode: '',
      fromDate: earlyMonth(),
      toDate: nowDate(),
      inputTypesSelected: null,
      inputTypeOptions: warehousesData.inputTypes,

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
  },

  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  mounted() {
    this.onClickSearchButton()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
    ]),

    onClickSearchButton() {
      const searchData = {
        transCode: this.transCode,
        redInvoiceNo: this.billNumber,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.inputTypesSelected,
        formId: 5,
        ctrlId: 7,
      }
      this.updateSearchData(searchData)
      this.GET_RECEIPTS_ACTION(searchData)
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
