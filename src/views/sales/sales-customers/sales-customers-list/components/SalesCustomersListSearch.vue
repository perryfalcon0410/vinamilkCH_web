<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Full Name -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-form-input
          id="form-input-customer"
          v-model="searchKeywords"
          class="h9"
          size="sm"
          placeholder="Nhập họ tên/mã"
        />
      </b-col>
      <!-- END - Full Name -->

      <!-- START - Date From -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="dateFormatVNI"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Từ ngày
          </div>
          <b-input-group
            id="form-input-date-from"
            class="input-group-merge"
            size="sm"
          >
            <b-input-group-prepend
              is-text
              data-toggle
            >
              <b-icon-calendar />
            </b-input-group-prepend>
            <vue-flat-pickr
              v-model="fromDate"
              :config="configDate"
              class="form-control h9"
              placeholder="Chọn ngày"
            />
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="dateFormatVNI"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Đến ngày
          </div>
          <b-input-group
            class="input-group-merge"
            size="sm"
          >
            <b-input-group-prepend
              is-text
              data-toggle
            >
              <b-icon-calendar />
            </b-input-group-prepend>
            <vue-flat-pickr
              id="form-input-date-from"
              v-model="toDate"
              :config="configDate"
              class="form-control h9"
              placeholder="Chọn ngày"
            />
          </b-input-group>

          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Date To -->

      <!-- START - Group -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <v-input-select
          title="Nhóm khách hàng"
          :suggestions="customerTypeOptions"
          :data-input="customerTypesSelected.name"
          placeholder="Tất cả"
          title-class="h8 mt-sm-1 mt-xl-0"
          input-class="h9"
          suggestions-class="h9"
          :clear-able="true"
          size="sm"
          @updateSelection="customerTypesSelected = $event"
        />
      </b-col>
      <!-- END - Group -->

      <!-- START - Status -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <v-input-select
          title="Trạng thái"
          :suggestions="statuOptions"
          :data-input="statusSelected.name"
          placeholder="Tất cả"
          title-class="h8 mt-sm-1 mt-xl-0"
          input-class="h9"
          suggestions-class="h9"
          :clear-able="true"
          size="sm"
          @updateSelection="statusSelected = $event"
        />
      </b-col>
      <!-- END - Status -->

      <!-- START - Gender -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <v-input-select
          title="Giới tính"
          :suggestions="genderOptions"
          :data-input="gendersSelected.name"
          placeholder="Tất cả"
          title-class="h8 mt-sm-1 mt-xl-0"
          input-class="h9"
          suggestions-class="h9"
          :clear-able="true"
          size="sm"
          @updateSelection="gendersSelected = $event"
        />
      </b-col>
      <!-- END - Gender -->

      <!-- START - Location -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <v-input-select
          title="Khu vực"
          :suggestions="shopLocations()"
          :data-input="areas.name"
          placeholder="Tất cả"
          title-class="h8 mt-sm-1 mt-xl-0"
          input-class="h9"
          suggestions-class="h9"
          :type-able="true"
          :clear-able="true"
          :filter-able="true"
          size="sm"
          @updateSelection="areas = $event"
        />
      </b-col>
      <!-- END - Location -->

      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
        class="h-25"
      >
        <div
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          id="form-button-search"
          class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
          variant="someThing"
          style="height: 30px;"
          @click="onClickSearchButton()"
        >
          <b-icon-search />
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
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'

import {
  CUSTOMER,
  GET_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  SHOP_LOCATIONS_GETTER,
} from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
    VCardActions,
    VInputSelect,
  },
  data() {
    return {
      isSearchFocus: false,

      // validation rules
      dateFormatVNI,

      searchKeywords: null,
      fromDate: null,
      toDate: null,
      customerTypesSelected: { id: null, name: null },
      customerTypeOptions: customerData.customerTypes,
      statusSelected: { id: null, name: null },
      statuOptions: customerData.status,
      gendersSelected: { id: null, name: null },
      genderOptions: commonData.genders,
      areas: this.shopLocationsDefault(),

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
    }
  },

  mounted() {
    this.GET_SHOP_LOCATIONS_ACTION()
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_ACTION,
    ]),
    ...mapGetters(CUSTOMER, [
      SHOP_LOCATIONS_GETTER,
    ]),
    onClickSearchButton() {
      const searchData = {
        searchKeywords: this.searchKeywords?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        customerTypeId: this.customerTypesSelected?.id,
        status: this.statusSelected?.id,
        genderId: this.gendersSelected?.id,
        areaId: this.areas?.id,
      }
      this.GET_CUSTOMERS_ACTION(searchData)
    },

    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER().map(data => ({
        id: data.areaCode,
        name: data.provinceAndDistrictName,
        default: data.default,
      }))
    },

    shopLocationsDefault() {
      return this.shopLocations().find(locations => locations.default === true) || { id: null, name: null }
    },

  },
}
</script>
