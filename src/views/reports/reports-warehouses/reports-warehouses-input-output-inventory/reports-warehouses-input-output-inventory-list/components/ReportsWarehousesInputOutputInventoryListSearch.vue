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
          name="Từ ngày"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            Từ ngày <span class="text-danger">*</span>
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
          name="Đến ngày"
        >
          <div class="h7 mt-sm-1 mt-xl-0">
            Đến ngày <span class="text-danger">*</span>
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

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          :disabled="invalid"
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
  </validation-observer>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapActions } from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  required,
} from '@/@core/utils/validations/validations'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import {
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY,
  GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
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
      productCodes: null,

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
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [
      GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION,
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
            productCodes: this.productCodes?.replace(/\s+/g, ''),
            fromDate: reverseVniDate(this.fromDate),
            toDate: reverseVniDate(this.toDate),
            formId: 1,
            ctrlId: 1,
          }

          this.$emit('updatePageElement')
          this.updateSearchData(searchData)
          this.GET_REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY_ACTION(searchData)
        }
      })
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
