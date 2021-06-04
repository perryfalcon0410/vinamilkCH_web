<template>

  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Bill Code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số hóa đơn
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="orderNumber"
            class="h8"
            placeholder="Nhập số hóa đơn"
            @keyup.enter="onSearchClick"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="orderNumber"
              class="cursor-pointer text-gray"
              @click="orderNumber = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Bill Code -->

      <!-- START - Customer Name -->
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
            v-model.trim="customerName"
            class="h8"
            autocomplete="on"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onSearchClick"
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
      <!-- END - Customer Name -->

      <!-- START - Customer Name -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="productCode"
            class="h8"
            autocomplete="on"
            placeholder="Nhập mã sản phẩm"
            @keyup.enter="onSearchClick"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="productCode"
              class="cursor-pointer text-gray"
              @click="productCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Customer Name -->

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
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

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
          @click="onSearchClick()"
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
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  RETURNEDGOODS,
  GET_RETURNED_GOOD_CHOOSE_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      orderNumber: '',
      customerName: '',
      productCode: '',

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

  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },
  methods: {
    ...mapActions(RETURNEDGOODS, [GET_RETURNED_GOOD_CHOOSE_ACTION]),
    onSearch() {
      const searchData = {
        searchKeywords: this.customerName,
        orderNumber: this.orderNumber,
        product: this.productCode,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_RETURNED_GOOD_CHOOSE_ACTION(searchData)
    },
    onSearchClick() {
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
