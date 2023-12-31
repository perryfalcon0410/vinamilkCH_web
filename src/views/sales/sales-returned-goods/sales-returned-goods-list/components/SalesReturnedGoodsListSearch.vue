<template>

  <!-- START - Search -->
  <b-form>
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Full Name -->
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
              v-model="searchKeywords"
              trim
              class="h7"
              placeholder="Nhập họ tên/mã"
              @keydown.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="searchKeywords"
                class="cursor-pointer text-gray"
                @click="searchKeywords = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Full Name -->

        <!-- START - Phone -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <div
            class="mt-sm-1 mt-xl-0"
          >
            Số điện thoại
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="customerPhone"
              autocomplete="on"
              placeholder="Nhập chính xác 4 số cuối"
              maxlength="10"
              @keypress="$onlyNumberInput"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="customerPhone"
                class="cursor-pointer text-gray"
                @click="customerPhone = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Phone -->
        <!-- START - Return Code -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Mã trả hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="returnCode"
              trim
              class="h7"
              placeholder="Nhập mã trả hàng"
              @keydown.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="returnCode"
                class="cursor-pointer text-gray"
                @click="returnCode = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Return Code -->

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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Từ ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @change="isFromDateValid"
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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Đến ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @change="isToDateValid"
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

        <!-- START - Search button -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <!--"onmousedown" is prevent hightlight text -->
          <div
            class="h7 text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
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
    </validation-observer>
  </b-form>
  <!-- END - Search -->
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
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'

export default {
  components: {
    VCardActions,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dateFormatVNI,
      searchKeywords: '',
      returnCode: '',
      fromDate: earlyMonth(),
      toDate: nowDate(),
      customerPhone: null,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

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

  computed: {
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
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },

  methods: {
    onSearch() {
      const searchData = {
        searchKeywords: this.searchKeywords,
        customerPhone: this.customerPhone,
        returnNumber: this.returnCode,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('onClickSearchButton', data)
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
