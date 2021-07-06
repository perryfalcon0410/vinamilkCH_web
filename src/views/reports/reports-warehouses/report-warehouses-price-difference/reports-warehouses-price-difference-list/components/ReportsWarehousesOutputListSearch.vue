<template>

  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <v-card-actions
      title="Tìm kiếm"
    >
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
            trim
            class="h7 text-brand-3"
            placeholder="Số hóa đơn/số nội bộ/số PO"
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
        md="3"
        sm="4"
      >
        <div class="h7 mt-sm-1 mt-xl-0">
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="ids"
            trim
            class="h7 text-brand-3"
            placeholder="Mã sản phẩm"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <!-- Icon-- Delete-text -->
            <b-icon-x
              v-show="ids"
              is-text
              class="cursor-pointer text-gray"
              @click="ids = null"
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
          @keypress="$onlyDateInput"
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
            class="form-control h7"
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
          @keypress="$onlyDateInput"
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
            class="form-control h7"
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

      <!-- START - Modal -->
      <product-select-modal
        :visible="selectProductModalVisible"
        @onModalClose="onModalCloseClick"
        @onSaveClick="onSaveClick"
      />
      <!-- END - Modal -->
    </v-card-actions>
  </validation-observer>
  <!-- END - Search -->
</template>

<script>
import {
  mapActions,
} from 'vuex'
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
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import ProductSelectModal from '../../components/ProductSelectModal.vue'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
    ProductSelectModal,
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
      product: null,
      licenseNumber: null,
      productCode: null,
      isSearchFocus: false,
      ids: null,
      isPaging: true,

      // decentralization
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
  computed: {
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
    // this.onSearch()
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
    ...mapActions(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION,
    ]),
    onSelectProductModalClick() {
      this.selectProductModalVisible = true
    },
    onModalCloseClick() {
      this.selectProductModalVisible = false
    },
    onSaveClick(param) {
      this.selectProductModalVisible = false
      if (param.length > 0) {
        this.ids = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
      } else {
        this.ids = null
      }
    },
    onSearch() {
      const searchData = {
        fromTransDate: reverseVniDate(this.fromDate),
        toTransDate: reverseVniDate(this.toDate),
        fromOrderDate: reverseVniDate(this.fromOrderDate),
        toOrderDate: reverseVniDate(this.toOrderDate),
        code: this.licenseNumber,
        ids: this.ids?.replace(/\s+/g, ''),
        isPaging: this.isPaging,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_ACTION(searchData)
    },
    onClickSearchButton() {
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.onSearch()
          this.$emit('onClickSearchButton')
        }
      })
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
