<template>
  <div>
    <!-- START - Search -->
    <b-form
      class="bg-white rounded shadow"
      @submit.prevent="onClickSearchButton"
    >
      <b-row
        v-b-toggle.collapseDelivery
        class="text-primary mx-0 p-1"
        align-v="center"
        align-h="between"
      >
        <strong>Tìm kiếm</strong>

        <b-icon-chevron-down
          scale="2"
          color="blue"
        />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-form-row
          class="border-top mx-0 p-1"
        >
          <!-- START - Full Name -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Khách hàng"
              label-for="form-input-customer"
            >
              <b-form-input
                id="form-input-customer"
                v-model="searchKeywords"
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
                label-for="form-input-date-from"
              >
                <b-input-group
                  id="form-input-date-from"
                  class="input-group-merge"
                >
                  <flat-pickr
                    v-model="fromDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                  <b-input-group-append
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-append>
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
                label-for="form-input-date-to"
              >
                <b-input-group class="input-group-merge">
                  <flat-pickr
                    id="form-input-date-from"
                    v-model="toDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                  <b-input-group-append
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-append>
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
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="customerTypes"
                :options="[{name: 'Khách hàng thân thiết', id: '1'},{name: 'Khách hàng thường', id: '2'},{name: 'Khách hàng VIP', id: '3'}]"
                label="name"
                placeholder="Tất cả"
                :searchable="false"
              >
                <template #selected-option="{ name }">
                  {{ truncate(name,16) }}
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
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="status"
                :options="[{name: 'Hoạt động', id: '1'},{name: 'Ngưng hoạt động', id: '0'}]"
                label="name"
                placeholder="Tất cả"
                :searchable="false"
              />
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
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="genders"
                :options="[{name: 'Nam', id: '1'},{name: 'Nữ', id: '2'},{name: 'Khác', id: '3'}]"
                label="name"
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
              label-for="form-input-customer-group"
            >
              <v-select
                id="form-input-customer-group"
                v-model="areas"
                :options="shopLocations"
                label="name"
                autocomplete="on"
                placeholder="Tất cả"
              />
            </b-form-group>
          </b-col>
          <!-- END - Location -->

          <!-- START - Search button -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                id="form-button-search"
                variant="primary"
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
/* eslint-disable vue/attribute-hyphenation */
import {
  mapActions,
  mapGetters,
} from 'vuex'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import '@core/scss/vue/libs/vue-flatpicker.scss'
import { formatVniDateToISO } from '@/@core/utils/filter'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  CUSTOMER,
  GET_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  SHOP_LOCATIONS_GETTER,
} from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
    vSelect,
    flatPickr,
  },
  data() {
    return {
      // validation rules
      dateFormatVNI,

      searchKeywords: '',
      fromDate: '',
      toDate: '',
      customerTypes: '',
      status: '',
      genders: '',
      areas: '',

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
    }
  },
  computed: {
    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER().map(data => ({
        id: data.id,
        name: data.areaName,
      }))
    },
  },

  mounted() {
    this.GET_SHOP_LOCATIONS_ACTION({
      shopId: 1, // Hard code
    })
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
        fromDate: formatVniDateToISO(this.fromDate),
        toDate: formatVniDateToISO(this.toDate),
        customerTypes: this.customerTypes.id,
        status: this.status.id,
        genders: this.genders.id,
        areas: this.areas.id,
      }

      this.GET_CUSTOMERS_ACTION(searchData)
    },

    truncate(str, n) {
      return (str.length > n) ? `${str.substr(0, n - 2)}...` : str
    },

  },
}
</script>
