<template>

  <!-- START - Search -->
  <b-form
    @keydown.enter="onClickSearchButton"
  >
    <v-card-actions
      :title="$t('common.find')"
      class="d-print-none"
    >

      <!-- START - Phone -->
      <b-col
        xl="2"
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          {{ $t('customer.mobileNumber') }}
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            ref="focusInput"
            v-model.trim="phoneNumber"
            data-test="phoneNumber"
            autocomplete="on"
            :placeholder="$t('common.enter4Digits')"
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
          {{ $t('customer.customer') }}
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="customerName"
            data-test="customerName"
            :placeholder="$t('common.enterYourNameCode')"
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
          {{ $t('customer.customerGroup') }}

        </div>
        <tree-select
          v-model="customerTypesSelected"
          data-test="customerTypes"
          :options="customerTypeOptions"
          :load-options="loadOptions"
          :auto-load-root-options="false"
          :searchable="false"
          :placeholder="$t('common.all')"
          :no-options-text="$t('common.noData')"
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
          {{ $t('common.status') }}

        </div>
        <tree-select
          id="status"
          v-model="statusSelected"
          :options="statuOptions"
          :searchable="false"
          :placeholder="$t('common.all')"
          :no-options-text="$t('common.noData')"
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
          {{ $t('customer.gender') }}
        </div>
        <tree-select
          id="genders"
          v-model="gendersSelected"
          :options="genderOptions"
          :searchable="false"
          :placeholder="$t('common.all')"
          :no-options-text="$t('common.noData')"
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
          {{ $t('common.area') }}
        </div>
        <tree-select
          id="areas"
          v-model="areasSelected"
          :options="areaOptions"
          :auto-load-root-options="false"
          :placeholder="$t('common.all')"
          :no-options-text="$t('common.noData')"
          :no-results-text="$t('common.noResultFound')"
        />
      </b-col>
      <!-- END - Location -->

      <!-- START - Private customer -->
      <div
        class="h7 mx-50"
      >
        <div
          class="text-white mt-sm-1 mt-xl-0 mb-45"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Khách hàng riêng
        </div>
        <b-form-checkbox
          v-model="privateCustomer"
          class="text-nowrap"
        >
          {{ $t('customer.shopCustomers') }}

        </b-form-checkbox>
      </div>
      <!-- END - Private customer -->

      <!-- START - Search button -->
      <div
        class="mt-auto mx-35"
      >
        <b-button
          id="btnSearch"
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          {{ $t('common.find') }}
        </b-button>
      </div>
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
import customerData from '@/@db/customer'

import {
  CUSTOMER,
  // GETTERS
  SHOP_LOCATIONS_SEARCH_GETTER,
  CUSTOMER_TYPES_GETTER,
  GENDERS_GETTER,
  // ACTIONS
  GET_SHOP_LOCATIONS_SEARCH_ACTION,
  GET_GENDERS_ACTION,
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
      genderOptions: [], // 1 = Nam, 2 = Nữ, 3 = Khác
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
      GENDERS_GETTER,
    ]),
    getCustomerTypes() {
      if (this.CUSTOMER_TYPES_GETTER) {
        return this.CUSTOMER_TYPES_GETTER.map(data => ({
          id: data.id,
          label: data.name,
        }))
      }
      return []
    },
    getGenders() {
      if (this.GENDERS_GETTER) {
        return this.GENDERS_GETTER.map(data => ({
          id: data.id,
          label: data.categoryName,
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
    getCustomerTypes() {
      this.customerTypeOptions = [...this.getCustomerTypes]
    },
    getGenders() {
      this.genderOptions = [...this.getGenders]
    },
  },

  mounted() {
    this.GET_SHOP_LOCATIONS_SEARCH_ACTION({
      data: { ...this.decentralization },
      onSuccess: () => {
        // this.apiStatus.shopLocationsSearch = true
      },
    })
    this.GET_GENDERS_ACTION({ ...this.decentralization })

    this.$refs.focusInput.focus()
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_SHOP_LOCATIONS_SEARCH_ACTION,
      GET_GENDERS_ACTION,
    ]),
    areaSelectedDefault() {
      if (this.SHOP_LOCATIONS_SEARCH_GETTER) {
        this.areasSelected = this.SHOP_LOCATIONS_SEARCH_GETTER.find(e => e.default === true).id
        this.onSearch()
      }
    },

    loadOptions({ action, callback }) {
      if (action === 'LOAD_ROOT_OPTIONS') {
        this.customerTypeOptions = [...this.getCustomerTypes]
      }
      callback()
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
