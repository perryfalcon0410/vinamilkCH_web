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
          class="h8 mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="keySearch"
            class="h8 text-brand-3"
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

      <!-- START - Location -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h8"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Khu vực
        </div>
        <tree-select
          v-model="areasSelected"
          :options="areaOptions"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
          no-results-text="Không tìm thấy kết quả"
        />
      </b-col>
      <!-- END - Location -->

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
            v-model="mobiPhone"
            class="h8 text-brand-3"
            placeholder="Nhập SĐT"
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

      <!-- START - Group -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
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

      <!-- START - Status -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h8"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Trạng thái
        </div>
        <tree-select
          v-model="statusSelected"
          :options="statuOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Status -->

      <!-- START - Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày tạo
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="fromCreateDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromCreateDate"
            :config="configFromDate"
            class="form-control h8"
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
          class="h8 mt-sm-1 mt-xl-0"
        >
          Đến ngày tạo
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="toCreateDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toCreateDate"
            :config="configToDate"
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

      <!-- START - Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày MHC
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="fromPurchaseDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromPurchaseDate"
            :config="configFromDate"
            class="form-control h8"
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
          class="h8 mt-sm-1 mt-xl-0"
        >
          Đến ngày MHC
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="toPurchaseDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toPurchaseDate"
            :config="configToDate"
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>

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
import customerData from '@/@db/customer'
import {
  REPORT_CUSTOMERS,

  // GETTERS
  SHOP_LOCATIONS_SEARCH_GETTER,
  CUSTOMER_TYPES_GETTER,

  // Actions
  GET_REPORT_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_SEARCH_ACTION,
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

      keySearch: null,
      statuOptions: customerData.status,
      statusSelected: customerData.status[0].id,
      fromCreateDate: this.$earlyMonth,
      toCreateDate: this.$nowDate,
      fromPurchaseDate: this.$earlyMonth,
      toPurchaseDate: this.$nowDate,
      fromSaleDate: this.$earlyMonth,
      toSaleDate: this.$nowDate,
      fromSaleAmount: null,
      toSaleAmount: null,
      ids: null,
      customerType: null,
      areasSelected: null,

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
        minDate: this.fromCreateDate,
      },
    }
  },

  computed: {
    ...mapGetters(REPORT_CUSTOMERS, [
      SHOP_LOCATIONS_SEARCH_GETTER,
      CUSTOMER_TYPES_GETTER,
    ]),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.name,
      }))
    },
    areaOptions() {
      return this.SHOP_LOCATIONS_SEARCH_GETTER.map(data => ({
        id: data.id,
        label: data.provinceAndDistrictName,
        default: data.default,
      }))
    },
  },
  watch: {
    fromCreateDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromCreateDate,
      }
    },
  },

  beforeMount() {
    this.GET_CUSTOMER_TYPES_ACTION({ data: { ...this.decentralization }, onSuccess: () => {} })
    this.GET_SHOP_LOCATIONS_SEARCH_ACTION({ ...this.decentralization })
  },
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromCreateDate,
    }
  },

  methods: {
    ...mapActions(REPORT_CUSTOMERS, [
      GET_REPORT_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_SEARCH_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    onSearch() {
      const searchData = {
        keySearch: this.keySearch,
        fromCreateDate: reverseVniDate(this.fromCreateDate),
        toCreateDate: reverseVniDate(this.toCreateDate),
        // fromPurchaseDate: reverseVniDate(this.fromPurchaseDate),
        // toPurchaseDate: reverseVniDate(this.toPurchaseDate),
        // fromSaleDate: reverseVniDate(this.fromSaleDate),
        // toSaleDate: reverseVniDate(this.toSaleDate),
        customerType: this.customerType,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_CUSTOMERS_ACTION(searchData)
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
