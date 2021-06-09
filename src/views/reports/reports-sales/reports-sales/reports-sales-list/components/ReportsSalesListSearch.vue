<template>

  <!-- START - Search -->
  <v-card-actions
    title="Tìm kiếm"
  >
    <!-- START - Red invoice no -->
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
      <b-form-input
        v-model="redInvoiceNo"
        class="h8"
        maxlength="40"
        placeholder="Nhập số hóa đơn"
        @keyup.enter="onClickSearchButton"
      />
    </b-col>
    <!-- END - Red invoice no -->

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
          :config="configFromDate"
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
          :config="configToDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Date To -->

    <!-- START - Product -->
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
      <b-input-group class="input-group-merge ">
        <b-form-input
          v-model.trim="productCodes"
          class="h8"
          placeholder="Nhập mã sản phẩm"
        />
        <b-input-group-append
          is-text
        >
          <!-- Icon-- Delete-text -->
          <b-icon-x
            v-show="productCodes"
            is-text
            class="cursor-pointer text-gray"
            @click="productCodes = null"
          />
          <!-- Icon-- Three-dot -->
          <b-icon-three-dots-vertical
            class="cursor-pointer"
            @click="onSelectProductModalClick"
          />
        </b-input-group-append>
      </b-input-group>
    </b-col>
    <!-- END - Product -->

    <!-- START - Bill collector -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Người thu tiền
      </div>
      <tree-select
        v-model="billCollectorSelected"
        :options="billCollectorOptions"
        :searchable="false"
        placeholder="Tất cả"
        no-options-text="Không có dữ liệu"
      />
    </b-col>
    <!-- END - Bill collector -->

    <!-- START - Sell channels -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Kênh bán
      </div>
      <tree-select
        v-model="saleChannelSelected"
        :options="saleChannelOptions"
        :searchable="false"
        placeholder="Tất cả"
        no-options-text="Không có dữ liệu"
      />
    </b-col>
    <!-- END - Sell channels -->

    <!-- START - Customer -->
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
      <b-form-input
        v-model="customer"
        class="h8"
        maxlength="200"
        placeholder="Nhập họ tên/mã"
        @keyup.enter="onClickSearchButton"
      />
    </b-col>
    <!-- END - Customer -->

    <!-- START - Phone number -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Số điện thoại
      </div>
      <b-form-input
        v-model="phoneNumber"
        class="h8"
        maxlength="10"
        placeholder="Nhập SĐT khách hàng"
        @keyup.enter="onClickSearchButton"
        @keypress="$onlyNumberInput"
      />
    </b-col>
    <!-- END - Phone number -->

    <!-- START -Income-->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Doanh số hóa đơn
      </div>
      <b-row
        no-gutters
      >
        <b-col>
          <b-form-input
            v-model="minIncome"
            class="h8"
            :number="true"
            maxlength="12"
            @keyup.enter="onClickSearchButton"
            @keypress="$onlyNumberInput"
          />
        </b-col>
        <b-col>
          <b-form-input
            v-model="maxIncome"
            class="h8"
            :number="true"
            maxlength="12"
            @keyup.enter="onClickSearchButton"
            @keypress="$onlyNumberInput"
          />
        </b-col>
      </b-row>
    </b-col>
    <!-- END - Income -->

    <!-- START - Search button -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
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
        <b-icon-search class="mr-50" />
        Tìm kiếm
      </b-button>
    </b-col>
    <!-- END - Search button -->

    <!-- START - Modal find product -->
    <find-product-modal
      :visible="selectProductModalVisible"
      @onModalClose="onModalCloseClick"
      @onSaveClick="onSaveClick"
    />
    <!-- START - Modal find product -->
  </v-card-actions>
  <!-- END - Search -->
</template>

<script>
import reportData from '@/@db/report'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapGetters, mapActions } from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  REPORT_SALES,
  BILL_COLLECTORS_GETTER,
  GET_REPORT_SALES_ACTION,
  GET_BILL_COLLECTORS_ACTION,
} from '../../store-module/type'
import FindProductModal from './FindProductModal.vue'

export default {
  components: {
    VCardActions,
    FindProductModal,
  },

  data() {
    return {
      selectProductModalVisible: false,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      redInvoiceNo: null,
      productCodes: null,
      billCollectorSelected: null,
      customer: null,
      phoneNumber: null,
      saleChannelSelected: reportData.saleChannels[0].id,
      saleChannelOptions: reportData.saleChannels,
      minIncome: null,
      maxIncome: null,

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

  computed: {
    ...mapGetters(REPORT_SALES, [
      BILL_COLLECTORS_GETTER,
    ]),
    billCollectorOptions() {
      return this.BILL_COLLECTORS_GETTER.map(data => ({
        id: data.id,
        label: data.fullName,
      }))
    },
  },

  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  beforeMount() {
    this.GET_BILL_COLLECTORS_ACTION({ formId: 1, ctrlId: 1 })
  },

  mounted() {
    this.onClickSearchButton()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
    ...mapActions(REPORT_SALES, [
      GET_REPORT_SALES_ACTION,
      GET_BILL_COLLECTORS_ACTION,
    ]),
    onSelectProductModalClick() {
      this.selectProductModalVisible = !this.selectProductModalVisible
    },
    onModalCloseClick() {
      this.selectProductModalVisible = false
    },
    onSaveClick(param) {
      this.selectProductModalVisible = false
      if (param.length > 0) {
        this.productCodes = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
      } else {
        this.productCodes = null
      }
    },

    onClickSearchButton() {
      const searchData = {
        collecter: this.billCollectorSelected,
        customerKW: this.customer?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        fromInvoiceSales: this.minIncome,
        toInvoiceSales: this.maxIncome,
        orderNumber: this.redInvoiceNo?.trim(),
        phoneNumber: this.phoneNumber?.trim(),
        productKW: this.productCodes?.trim(),
        salesChannel: this.saleChannelSelected,
        formId: 1,
        ctrlId: 1,
      }

      this.updateSearchData(searchData)
      this.$emit('updatePageElement')
      this.GET_REPORT_SALES_ACTION(searchData)
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
