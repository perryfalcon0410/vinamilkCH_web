<template>
  <div>
    <!-- START - Search -->
    <b-form
      class="bg-white rounded shadow"
      @keyup.enter="onClickSearchButton"
    >
      <b-row
        v-b-toggle.collapseDelivery
        class="text-primary mx-0 p-1"
        align-v="center"
        align-h="between"
      >
        <strong class="text-blue-vinamilk">Tìm kiếm</strong>

        <b-icon-chevron-down
          scale="1.3"
          color="#203181"
        />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-form-row
          class="border-top mx-0 pt-1 px-1"
        >
          <!-- START - Full Name -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Khách hàng"
              label-class="h8"
              label-for="form-input-customer"
            >
              <b-form-input
                id="form-input-customer"
                v-model="searchKeywords"
                class="h9"
                size="sm"
                placeholder="Nhập họ tên/mã"
              />
            </b-form-group>
          </b-col>
          <!-- END - Full Name -->

          <!-- START - Date From -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Từ ngày"
                label-class="h8"
                label-for="form-input-date-from"
              >
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
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Đến ngày"
                label-class="h8"
                label-for="form-input-date-to"
              >
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
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date To -->

          <!-- START - Group -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Nhóm khách hàng"
              label-class="h8"
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="customerTypes"
                :options="customerTypeOptions"
                label="name"
                class="h9"
                placeholder="Tất cả"
                :searchable="false"
              >
                <template #selected-option="{ name }">
                  {{ truncate(name,7) }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <!-- END - Group -->

          <!-- START - Status -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Trạng thái"
              label-class="h8"
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="status"
                :options="statuOptions"
                label="name"
                class="h9"
                placeholder="Tất cả"
                :searchable="false"
              >
                <template #selected-option="{ name }">
                  {{ truncate(name,7) }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <!-- END - Status -->

          <!-- START - Gender -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Giới tính"
              label-class="h8"
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="genders"
                :options="genderOptions"
                label="name"
                class="h9"
                placeholder="Tất cả"
                :searchable="false"
              />
            </b-form-group>
          </b-col>
          <!-- END - Gender -->

          <!-- START - Location -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Khu vực"
              label-class="h8"
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="areas"
                :options="shopLocations()"
                label="name"
                class="h9"
                autocomplete="on"
                placeholder="Tất cả"
              >
                <template #selected-option="{ name }">
                  {{ truncate(name,7) }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
          <!-- END - Location -->

          <!-- START - Search button -->
          <b-col
            xl
            sm="4"
            md="3"
            class="h-25"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
              label-class="text-white"
            >
              <b-button
                id="form-button-search"
                class="bg-blue-vinamilk text-white h9"
                variant="someThing"
                style="max-height: 35px;"
                @click="onClickSearchButton()"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>
        <!-- END - Search button -->

        </b-form-row>
      </b-collapse>
    </b-form>
    <!-- END - Search -->
  </div>
</template>

<script>
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

  },
  data() {
    return {
      isSearchFocus: false,

      // validation rules
      dateFormatVNI,

      searchKeywords: '',
      fromDate: '',
      toDate: '',
      customerTypes: '',
      customerTypeOptions: customerData.customerTypes,
      status: '',
      statuOptions: customerData.status,
      genders: '',
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

  watch: {
    areas() {
      if (this.areas.length > 1) {
        this.isSearchFocus = true
      }
      this.isSearchFocus = false
    },
  },

  mounted() {
    this.GET_SHOP_LOCATIONS_ACTION()
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
        searchKeywords: this.searchKeywords.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        customerTypeId: this.customerTypes?.id,
        status: this.status?.id,
        genderId: this.genders?.id,
        areaId: this.areas?.id,
      }
      this.GET_CUSTOMERS_ACTION(searchData)
    },

    truncate(str, n) {
      return (str.length > n) ? `${str.substr(0, n - 2)}...` : str
    },

    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER().map(data => ({
        id: data.areaCode,
        name: data.provinceAndDistrictName,
        default: data.default,
      }))
    },

    shopLocationsDefault() {
      return this.shopLocations().find(locations => locations.default === true)
    },

  },
}
</script>
