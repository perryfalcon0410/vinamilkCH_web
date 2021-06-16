<template>

  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      class="d-print-none"
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Full Name  Mã trả hàng-->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Mã trả hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="reciept"
              class="h8 text-brand-3"
              placeholder="Nhập mã trả hàng"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="reciept"
                class="cursor-pointer text-gray"
                @click="reciept = null"
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
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Từ ngày"
          >
            <div class="h8 mt-sm-1 mt-xl-0">
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
                class="form-control h8"
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
            <div class="h8 mt-sm-1 mt-xl-0">
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
                class="form-control h8"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

        </b-col>
        <!-- END - Date To -->

        <!-- START - Group -->
        <b-col
          xl
          md="3"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Lý do
          </div>
          <tree-select
            v-model="reasonSelected"
            title="Nhóm khách hàng"
            :options="reasonOptions"
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <b-col
          xl
          md="3"
          sm="4"
        >
          <div class="h8 mt-sm-1 mt-xl-0">
            Sản phẩm
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="ids"
              class="h8 text-brand-3"
              placeholder="Mã sản phẩm"
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
        <!-- END - Group -->

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
            class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
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
    </b-form>
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
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import reportData from '@/@db/report'
import {
  REPORT_RETURNED_GOODS,

  // Actions
  GET_REPORT_RETURNED_GOODS_ACTION,
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
      selectProductModalVisible: false,

      dateFormatVNI,

      reciept: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      ids: null,
      reasonOptions: reportData.reasonTypes,
      reasonSelected: null,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: this.toDate,
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
    toDate() {
      this.configFromDate = {
        ...this.configFromDate,
        maxDate: this.toDate,
      }
    },
  },
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configFromDate = {
      ...this.configFromDate,
      maxDate: this.toDate,
    }
  },

  methods: {
    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_REPORT_RETURNED_GOODS_ACTION,
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
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        reciept: this.reciept,
        reason: this.reasonSelected,
        productKW: this.ids,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_RETURNED_GOODS_ACTION(searchData)
    },

    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
