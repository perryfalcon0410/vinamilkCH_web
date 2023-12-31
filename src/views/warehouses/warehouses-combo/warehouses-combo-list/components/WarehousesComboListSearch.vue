<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <!-- START - Search -->
    <b-form
      @keyup.enter="onClickSearchButton"
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Mã giao dịch
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              ref="focusInput"
              v-model.trim="transCode"
              class="h7"
              placeholder="Nhập mã giao dịch"
              @keyup.enter="onClickSearchButton"
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

        <!-- START - Group -->
        <b-col
          xl
          md="3"
          sm="4"
          class="h7"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Loại giao dịch
          </div>
          <tree-select
            v-model="transTypeSelected"
            :options="warehousesTypeOptions"
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Group -->

        <!-- START - Search button -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <div
            class="text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
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
    <!-- END - Search -->
  </validation-observer>
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import warehousesData from '@/@db/warehouses'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  WAREHOUSES_COMBO,
  GET_WAREHOUSES_COMBO_ACTIONS,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      dateFormatVNI,
      isSearchFocus: false,
      transCode: null,
      fromDate: earlyMonth(),
      toDate: nowDate(),
      warehousesTypeOptions: warehousesData.transTypes,
      transTypeSelected: null,

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
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSES_COMBO_ACTIONS,
    ]),
    onClickSearchButton() {
      const searchData = {
        transCode: this.transCode?.trim(),
        transType: this.transTypeSelected,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      // this.GET_WAREHOUSES_COMBO_ACTIONS(searchData)
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
