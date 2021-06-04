<template>

  <!-- START - Search -->
  <v-card-actions
    title="Tìm kiếm"
  >
    <!-- START - Date From -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Từ ngày nhập
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
        Đến ngày nhập
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

    <!-- START - Warehouses Input Type -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Loại nhập
      </div>
      <tree-select
        v-model="inputTypesSelected"
        :options="inputTypeOptions"
        :searchable="false"
        placeholder="Tất cả"
        no-options-text="Không có dữ liệu"
      />
    </b-col>
    <!-- END - Warehouses Input Type -->

    <!-- START - License -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Số chứng từ
      </div>
      <b-form-input
        v-model="licenseNumber"
        class="h8"
        placeholder="Số hóa đơn/Số nội bộ/PO"
        @keyup.enter="onClickSearchButton"
      />
    </b-col>
    <!-- END - License -->

    <!-- START - Bill Date From -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Từ ngày hóa đơn
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
      >
        <b-icon-x
          v-show="fromOrderDate"
          style="position: absolute; right: 15px"
          class="cursor-pointer text-gray"
          scale="1.3"
          data-clear
        />
        <vue-flat-pickr
          v-model="fromOrderDate"
          :config="configFromOrderDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Bill Date From -->

    <!-- START - Bill Date To -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Đến ngày hóa đơn
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
      >
        <b-icon-x
          v-show="toOrderDate"
          style="position: absolute; right: 15px"
          class="cursor-pointer text-gray"
          scale="1.3"
          data-clear
        />
        <vue-flat-pickr
          v-model="toOrderDate"
          :config="configToOrderDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Bill Date To -->

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
import { mapActions } from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  REPORT_WAREHOUSES_INPUT,
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
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
      fromOrderDate: this.$earlyMonth,
      toOrderDate: this.$nowDate,
      licenseNumber: null,
      productCodes: null,
      inputTypesSelected: null,
      inputTypeOptions: reportData.inputTypes,

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
      configFromOrderDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToOrderDate: {
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
    fromOrderDate() {
      this.configToOrderDate = {
        ...this.configToOrderDate,
        minDate: this.fromOrderDate,
      }
    },
  },

  mounted() {
    this.onClickSearchButton()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configToOrderDate = {
      ...this.configToOrderDate,
      minDate: this.fromOrderDate,
    }
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT, [
      GET_REPORT_WAREHOUSES_INPUT_ACTION,
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
        productCodes: this.productCodes?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        fromOrderDate: reverseVniDate(this.fromOrderDate),
        toOrderDate: reverseVniDate(this.toOrderDate),
        importType: this.inputTypesSelected,
        internalNumber: this.licenseNumber?.trim(),
        formId: 1,
        ctrlId: 1,
      }

      this.updateSearchData(searchData)
      this.$emit('updatePageElement')
      this.GET_REPORT_WAREHOUSES_INPUT_ACTION(searchData)
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
