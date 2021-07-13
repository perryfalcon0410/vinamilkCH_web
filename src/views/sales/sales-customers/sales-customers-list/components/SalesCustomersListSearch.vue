<template>

  <!-- START - Search -->
  <b-form
    @keydown.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
      class="d-print-none"
    >

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
          Di động
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="phoneNumber"
            data-test="phoneNumber"
            autocomplete="on"
            placeholder="Nhập chính xác 4 số cuối"
            maxlength="10"
            @keypress="$onlyNumberInput"
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

      <!-- START - Full Name -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="customerName"
            data-test="customerName"
            placeholder="Nhập họ tên/mã"
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

      <!-- START - Group -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Nhóm khách hàng
        </div>
        <tree-select
          v-model="customerTypesSelected"
          data-test="customerTypes"
          :options="customerTypeOptions"
          :auto-load-root-options="false"
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
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Trạng thái
        </div>
        <tree-select
          id="status"
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
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Giới tính
        </div>
        <tree-select
          id="genders"
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
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Khu vực
        </div>
        <tree-select
          id="areas"
          v-model="areasSelected"
          :options="areaOptions"
          :auto-load-root-options="false"
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
        class="h7"
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
          class="text-nowrap"
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
          class="text-white h7"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          id="btnSearch"
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
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
  GET_SHOP_LOCATIONS_SEARCH_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
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
      customerTypeOptions: null,
      apiStatus: { // success or fail
        // customerTypes: false,
        shopLocationsSearch: false,
      },

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
    getCustomerTypeOptions() {
      if (this.CUSTOMER_TYPES_GETTER) {
        return this.CUSTOMER_TYPES_GETTER.map(data => ({
          id: data.id,
          label: data.name,
        }))
      }
      return []
    },
    areaOptions() {
      if (this.SHOP_LOCATIONS_SEARCH_GETTER) {
        return this.SHOP_LOCATIONS_SEARCH_GETTER.map(data => ({
          id: data.id,
          label: data.provinceAndDistrictName,
          default: data.default,
        }))
      }
      return []
    },
    // apiStatusResult() {
    //   return Object.values(this.apiStatus).every((val, i, arr) => val && arr[0])
    // },
  },

  watch: {
    areaOptions() {
      this.areaSelectedDefault()
    },
    // apiStatusResult() {
    //   if (this.apiStatusResult) {
    //      this.onSearch()
    //   }
    // },
    getCustomerTypeOptions() {
      this.customerTypeOptions = [...this.getCustomerTypeOptions]
    },
  },

  mounted() {
    this.GET_SHOP_LOCATIONS_SEARCH_ACTION({
      data: { ...this.decentralization },
      onSuccess: () => {
        // this.apiStatus.shopLocationsSearch = true
      },
    })
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_SHOP_LOCATIONS_SEARCH_ACTION,
    ]),
    areaSelectedDefault() {
      if (this.SHOP_LOCATIONS_SEARCH_GETTER) {
        this.areasSelected = this.SHOP_LOCATIONS_SEARCH_GETTER.find(e => e.default === true).id
        this.onSearch()
      }
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
      }
      this.getCustomers(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
    },
    getCustomers(data) {
      this.$emit('onSearchClick', data)
    },
  },
}
</script>
