<template>

  <!-- START - Search -->
  <b-form
    class="d-print-none"
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Điều kiện"
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
            v-model="customerKW"
            class="h7 text-brand-3"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="reciept"
              class="cursor-pointer text-gray"
              @click="reciept = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Full Name -->

      <!-- START - MobiPhone -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số điện thoại
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="customerPhone"
            class="h8 text-brand-3"
            placeholder="Nhập SĐT"
            maxlength="10"
            @keyup.enter="onClickSearchButton"
            @keypress="$onlyNumberInput"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="reciept"
              class="cursor-pointer text-gray"
              @click="reciept = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - MobiPhone -->

      <!-- START - Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
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
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date From -->
      <!-- START - Date To -->
      <b-col
        xl
        lg="3"
        sm="4"
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
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->
      <!-- START - Group -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Nhóm khách hàng
        </div>
        <tree-select
          v-model="customerType"
          title="Nhóm khách hàng"
          :options="customerTypeOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Group -->
      <!-- START - Search button -->
      <b-col
        sm="2"
      >
        <div
          class="h7 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
          variant="someThing"
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
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  REPORT_SALES_CAT,

  // GETTERS
  CUSTOMER_TYPES_GETTER,

  // Actions
  GET_REPORT_SALES_CAT_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  props: {
    perPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      dateFormatVNI,

      customerKW: null,
      customerPhone: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      customerType: null,

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
    ...mapGetters(REPORT_SALES_CAT, [
      CUSTOMER_TYPES_GETTER,
    ]),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_GETTER.map(data => ({
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

  beforeMount() {
    this.GET_CUSTOMER_TYPES_ACTION({ data: { ...this.decentralization }, onSuccess: () => {} })
  },
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
    ...mapActions(REPORT_SALES_CAT, [
      GET_REPORT_SALES_CAT_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    onSearch() {
      const searchData = {
        customerKW: this.customerKW,
        customerPhone: this.customerPhone,
        customerType: this.customerType,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_SALES_CAT_ACTION(searchData)
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
