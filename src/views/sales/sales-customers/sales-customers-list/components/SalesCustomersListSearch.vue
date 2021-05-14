<template>

  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
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
            v-model="searchKeywords"
            class="h8 text-brand-3"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="searchKeywords"
              class="cursor-pointer text-gray"
              @click="searchKeywords = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Full Name -->

      <!-- START - Date From -->
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
            :config="configDate"
            class="form-control h8 text-brand-3"
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
          Đến ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
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
            :config="configDate"
            class="form-control h8 text-brand-3"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

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
          class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-05" />
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
import { reverseVniDate } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'

import {
  CUSTOMER,
  // GETTERS
  SHOP_LOCATIONS_GETTER,
  CUSTOMER_TYPES_GETTER,
  // ACTIONS
  GET_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      isSearchFocus: false,
      searchKeywords: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      customerTypesSelected: null,
      statuOptions: customerData.status,
      statusSelected: null,
      genderOptions: commonData.genders,
      gendersSelected: null,
      areasSelected: null,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },

  computed: {
    ...mapGetters(CUSTOMER, [
      SHOP_LOCATIONS_GETTER,
      CUSTOMER_TYPES_GETTER,
    ]),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.name,
      }))
    },
    areaOptions() {
      return this.SHOP_LOCATIONS_GETTER.map(data => ({
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
    this.GET_CUSTOMER_TYPES_ACTION({ formId: 9, ctrlId: 6 })
    this.GET_SHOP_LOCATIONS_ACTION({ formId: 5, ctrlId: 7 })
  },

  mounted() {
    this.onSearch()
  },

  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    areaSelectedDefault() {
      this.areasSelected = this.SHOP_LOCATIONS_GETTER.find(e => e.default === true).id
      this.onSearch()
    },
    onSearch() {
      const searchData = {
        searchKeywords: this.searchKeywords?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        customerTypeId: this.customerTypesSelected,
        status: this.statusSelected,
        genderId: this.gendersSelected,
        areaId: this.areasSelected,
        formId: 5,
        ctrlId: 7,
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
