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
        class="h7"
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="số biên bản"
        >
          <div
            class="mt-sm-1 mt-xl-0"
          >
            Số biên bản
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="transCode"
              :state="transCode ? passed : null"
              maxlength="20"
              placeholder="Nhập số biên bản"
              class="h7"
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
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Minute Code -->

      <!-- START - Date from -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class=" mt-sm-1 mt-xl-0"
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
            class="cursor-pointer text-gray h7"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromDate"
            :config="configFromDate"
            class="form-control "
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
        class="h8"
      >
        <div
          class=" mt-sm-1 mt-xl-0 h7"
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
            class="cursor-pointer text-gray h7"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toDate"
            :config="configToDate"
            class="form-control "
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date to -->

      <!-- START - Reason -->
      <b-col
        xxl
        lg="3"
        sm="4"
        class="h8"
      >
        <div
          class=" mt-sm-1 mt-xl-0 h7"
        >
          Lý do
        </div>
        <tree-select
          v-model="reasonObj.reasonSelected"
          :options="reasonObj.reasonOptions"
          placeholder="Tất cả"
          class="h7"
          no-options-text="Không có dữ liệu"
        />
      </b-col>

      <!-- START - Search Button -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h8"
      >
        <div
          class=" text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
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

      transCode: '',
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
    this.onSearch()
  },

  methods: {
    ...mapActions(WAREHOUSES_EXCHANGE_DAMAGED_GOODS, [
      GET_EXCHANGE_DAMAGED_GOODS_ACTION,
      GET_EXCHANGE_DAMAGED_GOODS_REASONS_ACTION,
    ]),
    onSearch() {
      const searchData = {
        transCode: this.transCode,
        reasonId: this.reasonObj.reasonSelected,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
      }
      this.getExchanges(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
    },
    getExchanges(data) {
      this.$emit('onSearchClick', data)
    },
  },
}
</script>
