<template>
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Minute Code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="Số biên bản"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Số biên bản
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="minutesCode"
              :state="minutesCode ? passed : null"
              maxlength="20"
              class="h9"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="minutesCode"
                class="cursor-pointer text-gray"
                @click="minutesCode = null"
              />
            </b-input-group-append>
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Minute Code -->

      <!-- START - Date from -->
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
      <!-- END - Date from -->

      <!-- START - Date to -->
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
      <!-- END - Date to -->

      <!-- START - Reason -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Lý do
        </div>
        <tree-select
          v-model="reasonObj.reasonSelected"
          :options="reasonObj.reasonOptions"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>

      <!-- START - Search Button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-1" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search Button -->

      <!-- END - Section form input -->

    </v-card-actions>
  </b-form>
</template>
<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  code,
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'

import {
  WAREHOUSES_EXCHANGE_DAMAGED_GOODS,
  // Getters
  EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
  // Actions
  GET_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
    VCardActions,
  },
  data() {
    return {
      // validation rules
      code,
      dateFormatVNI,

      minutesCode: '',
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

      reasonObj: {
        reasonSelected: null,
        reasonOptions: [],
      },

      decentralization: {
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
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
    ...mapGetters(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      EXCHANGE_DAMAGED_GOODS_REASONS_GETTER,
    ]),
    getReasonOptions() {
      return this.EXCHANGE_DAMAGED_GOODS_REASONS_GETTER.map(data => ({
        id: data.id,
        label: data.categoryName,
      }))
    },
  },
  watch: {
    getReasonOptions() {
      this.reasonObj.reasonOptions = [...this.getReasonOptions]
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  beforeMount() {
    this.GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION({ ...this.decentralization })
  },

  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
    ...mapActions(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      GET_EXCHANGE_DAMAGED_GOODS_ACTION,
      GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
    ]),
    onSearch() {
      const searchData = {
        minutesCode: this.minutesCode,
        reasonId: this.reasonObj.reasonSelected,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_EXCHANGE_DAMAGED_GOODS_ACTION(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
