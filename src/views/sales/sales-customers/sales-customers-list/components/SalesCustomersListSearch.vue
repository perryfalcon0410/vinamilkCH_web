<template>

  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
      class="d-print-none"
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
            v-model="customerName"
            class="h8"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="customerName"
              class="cursor-pointer text-gray"
              @click="customerName = null"
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
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Di động
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="phoneNumber"
            class="h8"
            autocomplete="on"
            placeholder="Nhập chính xác 4 số cuối"
            maxlength="10"
            @keypress="$onlyNumberInput"
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
      <!-- END - Phone -->

      <!-- START - Group -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Nhóm khách hàng
        </div>
        <tree-select
          v-model="customerTypesSelected"
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
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
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

      <!-- START - Gender -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Giới tính
        </div>
        <tree-select
          v-model="gendersSelected"
          :options="genderOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Gender -->

      <!-- START - Location -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
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

      <!-- START - Private customer -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="text-white mt-sm-1 mt-xl-0"
          onmousedown="return false;"
          style="cursor: context-menu; margin-bottom: 5px;"
        >
          Khách hàng riêng
        </div>
        <b-form-checkbox
          v-model="privateCustomer"
        >
          Khách hàng của cửa hàng
        </b-form-checkbox>

      </b-col>
      <!-- END - Private customer -->

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <!--"onmousedown" is prevent hightlight text -->
        <div
          class="h8 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
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
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'

import {
  CUSTOMER,
  // GETTERS
  SHOP_LOCATIONS_SEARCH_GETTER,
  CUSTOMER_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
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
      customerName: null,
      phoneNumber: null,
      customerTypesSelected: null,
      statuOptions: customerData.status,
      statusSelected: customerData.status[0].id,
      genderOptions: commonData.genders,
      gendersSelected: null,
      areasSelected: null,
      privateCustomer: true,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
    }
  },

  computed: {
    ...mapGetters(CUSTOMER, [
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
    areaOptions() {
      this.areaSelectedDefault()
    },
  },

  beforeMount() {
    this.GET_CUSTOMER_TYPES_ACTION({ ...this.decentralization })
    this.GET_SHOP_LOCATIONS_SEARCH_ACTION({ ...this.decentralization })
  },

  mounted() {
    this.onSearch()
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_SEARCH_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    areaSelectedDefault() {
      this.areasSelected = this.SHOP_LOCATIONS_SEARCH_GETTER.find(e => e.default === true).id
      this.onSearch()
    },
    onSearch() {
      const searchData = {
        searchKeywords: this.customerName?.trim(),
        phoneNumber: this.phoneNumber,
        customerTypeId: this.customerTypesSelected,
        status: this.statusSelected,
        genderId: this.gendersSelected,
        areaId: this.areasSelected,
        isShop: this.privateCustomer,
        size: this.perPageSize,
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_CUSTOMERS_ACTION(searchData)
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
