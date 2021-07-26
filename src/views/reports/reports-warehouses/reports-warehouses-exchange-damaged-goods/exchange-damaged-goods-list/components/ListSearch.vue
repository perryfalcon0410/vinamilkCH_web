<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      @keyup.enter="onClickSearchButton"
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <!-- START - Bill Number -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số biên bản
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              ref="focusInput"
              v-model="transCode"
              class="h7 text-brand-3"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="transCode"
                class="cursor-pointer text-gray"
                @click="transCode = null"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- END - Bill Number -->

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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
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
                @click="fromDate = null"
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
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
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
                @click="toDate = null"
              />
              <vue-flat-pickr
                v-model="toDate"
                :config="configToDate"
                :state="touched ? passed : null"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Date To -->

        <b-col
          xl
          md="3"
          sm="4"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Lý do
          </div>
          <tree-select
            v-model="reasonSelected"
            title="Lý do"
            :options="reasonOptions"
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
            size="sm"
            @select="select"
          />
        </b-col>
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
            size="md"
          >
            <b-form-input
              v-model="productCodes"
              class="h7 text-brand-3"
              placeholder="Mã sản phẩm"
              @keyup.enter="onClickSearchButton"
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
              <b-icon-three-dots-vertical
                @click="showFindProductModal"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- START - Search button -->
        <b-col
          xl
          sm="4"
          md="3"
          class="h-25"
        >
          <div
            class="h7 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
            variant="someThing"
            :disabled="invalid"
            style="height: 30px;"
            @click="onClickSearchButton"
          >
            <b-icon-search class="mr-1" />
            Tìm kiếm
          </b-button>
        </b-col>
      <!-- END - Search button -->
      </v-card-actions>
      <find-product-modal
        :visible="isShowFindProductModal"
        @close="isShowFindProductModal = false"
        @onSaveClick="onSaveClick($event)"
      />
    </b-form>
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import FindProductModal from './FindProductModal.vue'
import {
  REPORT_EXCHANGE_DAMAGED_GOODS,
  REASON_EXCHANGE_DAMAGED_GOODS_GETTER,
  GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
  GET_REASON_EXCHANGE_DAMAGED_GOODS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    FindProductModal,
    VCardActions,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    perPageSize: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isShowFindProductModal: false,
      dateFormatVNI,

      searchData: {},
      productCodes: null,
      transCode: null,
      reasonSelected: null,
      fromDate: earlyMonth(),
      toDate: nowDate(),
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

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
    }
  },
  computed: {
    ...mapGetters(REPORT_EXCHANGE_DAMAGED_GOODS, [
      REASON_EXCHANGE_DAMAGED_GOODS_GETTER,
    ]),
    reasonOptions() {
      return this.REASON_EXCHANGE_DAMAGED_GOODS_GETTER.map(data => ({
        id: data.categoryCode,
        label: data.categoryName,
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
  created() {
    this.GET_REASON_EXCHANGE_DAMAGED_GOODS_ACTION({ ...this.decentralization })
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },
  methods: {
    ...mapActions(REPORT_EXCHANGE_DAMAGED_GOODS, [
      GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION,
      GET_REASON_EXCHANGE_DAMAGED_GOODS_ACTION,
    ]),
    onSaveClick(param) {
      this.isShowFindProductModal = false
      if (param.length > 0) {
        this.productCodes = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
      } else {
        this.productCodes = null
      }
    },
    onSearch() {
      this.searchData = {
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        transCode: this.transCode?.trim(),
        productKW: this.productCodes?.trim(),
        reason: this.reasonSelected,
        ...this.decentralization,
      }
      this.updateSearchData(this.searchData)
      this.GET_REPORT_EXCHANGE_DAMAGED_GOODS_ACTION({ ...this.searchData, size: this.perPageSize })
    },
    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
    },
  },
}
</script>
