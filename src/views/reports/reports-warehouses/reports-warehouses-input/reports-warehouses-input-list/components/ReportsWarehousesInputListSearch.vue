<template>

  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    class="d-print-none"
    slim
  >

    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors, passed, touched }"
          rules="required"
          name="Từ ngày nhập"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            Từ ngày nhập <span class="text-danger">*</span>
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
              :state="touched ? passed : null"
              :config="configFromDate"
              class="form-control h7"
              placeholder="Chọn ngày"
            />
          </b-row>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors, passed, touched }"
          rules="required"
          name="Đến ngày nhập"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            Đến ngày nhập <span class="text-danger">*</span>
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
              :state="touched ? passed : null"
              :config="configToDate"
              class="form-control h7"
              placeholder="Chọn ngày"
            />
          </b-row>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - Date To -->

      <!-- START - Product -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Sản phẩm
        </div>
        <b-input-group class="input-group-merge ">
          <b-form-input
            ref="focusInput"
            v-model.trim="productCodes"
            class="h7"
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
          class="h7 mt-sm-1 mt-xl-0"
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
          class="h7 mt-sm-1 mt-xl-0"
        >
          Số chứng từ
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="licenseNumber"
            class="h7"
            maxlength="20"
            trim
            placeholder="Số hóa đơn/Số nội bộ/PO"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="licenseNumber"
              class="cursor-pointer text-gray"
              @click="licenseNumber = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - License -->

      <!-- START - Bill Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
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
            class="form-control h7 text-brand-3"
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
          class="h7 mt-sm-1 mt-xl-0"
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
            class="form-control h7 text-brand-3"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Bill Date To -->

      <!-- START - Search button -->
      <div
        class="mt-2 mx-40"
      >
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          :disabled="invalid"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </div>
      <!-- END - Search button -->

      <!-- START - Modal find product -->
      <find-product-modal
        :visible="selectProductModalVisible"
        @onModalClose="onModalCloseClick"
        @onSaveClick="onSaveClick"
      />
    <!-- START - Modal find product -->
    </v-card-actions>
  </validation-observer>
  <!-- END - Search -->
</template>

<script>
import reportData from '@/@db/report'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapActions } from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  required,
} from '@/@core/utils/validations/validations'
import {
  REPORT_WAREHOUSES_INPUT,
  GET_REPORT_WAREHOUSES_INPUT_ACTION,
} from '../../store-module/type'
import FindProductModal from './FindProductModal.vue'

export default {
  components: {
    VCardActions,
    FindProductModal,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      required,
      selectProductModalVisible: false,
      fromDate: earlyMonth(),
      toDate: nowDate(),
      fromOrderDate: earlyMonth(),
      toOrderDate: nowDate(),
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
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configToOrderDate = {
      ...this.configToOrderDate,
      minDate: this.fromOrderDate,
    }
    this.$refs.focusInput.focus()
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
      this.$refs.formContainer.validate().then(success => {
        if (success) {
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
        }
      })
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
