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
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="customerName"
            class="h8 text-brand-3 height-button-brand-1"
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
        md="3"
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
            v-model="phoneNumber"
            class="h8 text-brand-3 height-button-brand-1"
            placeholder="Nhập SĐT khách hàng"
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

      <!-- START - Bill Number -->
      <b-col
        xl
        md="3"
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
            id="form-input-customer"
            v-model="billNumber"
            class="h8 text-brand-3 height-button-brand-1"
            placeholder="Nhập số hóa đơn"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="billNumber"
              class="cursor-pointer text-gray"
              @click="billNumber = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Bill Number -->

      <!-- START - Date From -->
      <b-col
        xl
        md="3"
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
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
      <b-col
        xl
        md="3"
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
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date To -->

      <!-- START - Status -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Trạng thái
        </div>
        <tree-select
          v-model="printStateSelected"
          placeholder="Tất cả"
          :options="printOptions"
        />
      </b-col>
      <!-- END - Status -->

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
          id="form-button-search"
          class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
          variant="someThing"
          @click="onClickSearchButton"
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
import { reverseVniDate } from '@/@core/utils/filter'

import receiptData from '@/@db/sale'

import {
  SALESRECEIPTS,
  SALES_RECEIPTS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  props: {
    perPage: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      printOptions: receiptData.printState,
      printStateSelected: null,

      phoneNumber: null,
      customerName: null,
      billNumber: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

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
    ...mapActions(SALESRECEIPTS, [
      GET_SALES_RECEIPTS_ACTION,
    ]),
    ...mapGetters(SALESRECEIPTS, [
      SALES_RECEIPTS_GETTER,
    ]),

    onSearch() {
      const searchData = {
        customerPhone: this.phoneNumber?.trim(),
        searchKeywords: this.customerName?.trim(),
        orderNumber: this.billNumber?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        usedRedInvoice: this.printStateSelected,
        formId: 5, // hard code
        ctrlId: 7, // hard code
      }
      this.updateSearchData(searchData)
      this.GET_SALES_RECEIPTS_ACTION({ ...searchData, size: this.perPage })
    },
    onClickSearchButton() {
      this.$emit('onClickSearchButton')
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
