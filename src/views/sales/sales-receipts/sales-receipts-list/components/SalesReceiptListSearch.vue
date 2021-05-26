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
          v-model="customerName"
          class="h8 text-brand-3 height-button-brand-1"
          placeholder="Nhập họ tên/mã"
        />
      </b-col>
      <!-- END - Full Name -->

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
        <b-form-input
          id="form-input-customer"
          v-model="billNumber"
          class="h8 text-brand-3 height-button-brand-1"
          placeholder="Nhập số hóa đơn"
        />
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
        <b-input-group
          id="form-input-date-from"
          class="input-group-merge"
        >
          <vue-flat-pickr
            v-model="fromDate"
            :config="configDate"
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
            data-toggle
          >
            <b-icon-calendar />
          </b-input-group-append>
        </b-input-group>
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
        <b-input-group
          class="input-group-merge"
        >
          <vue-flat-pickr
            id="form-input-date-from"
            v-model="toDate"
            :config="configDate"
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
            data-toggle
          >
            <b-icon-calendar />
          </b-input-group-append>
        </b-input-group>
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

import receiptData from '@/@db/receipt'

import {
  SALESRECEIPTS,
  SALES_RECEIPTS_GETTER,
  GET_SALES_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      printOptions: receiptData.printState,
      printStateSelected: null,

      customerName: null,
      billNumber: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },

  mounted() {
    this.printStateSelected = this.printOptions[0].id
  },

  methods: {
    ...mapActions(SALESRECEIPTS, [
      GET_SALES_RECEIPTS_ACTION,
    ]),
    ...mapGetters(SALESRECEIPTS, [
      SALES_RECEIPTS_GETTER,
    ]),

    onClickSearchButton() {
      const searchData = {
        searchKeywords: this.customerName?.trim(),
        orderNumber: this.billNumber?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        usedRedInvoice: this.printStateSelected,
        formId: 5, // hard code
        ctrlId: 7, // hard code
      }
      this.updateSearchData(searchData)
      this.GET_SALES_RECEIPTS_ACTION(searchData)
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
