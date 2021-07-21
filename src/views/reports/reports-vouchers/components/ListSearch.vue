<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      class="d-print-none"
    >
      <v-card-actions
        title="Điều kiện"
      >
        <!-- START - promotionPrograms -->
        <b-col
          xl="3"
          class="cursor-pointer mb-md-1"
        >
          <b-container
            class="box"
          >

            <!-- START - title & icon -->
            <div
              v-b-toggle.collapse-1
            >
              <b-row>
                <div class="content">
                  <b-icon-caret-down
                    scale="1.5"
                  />
                  Chương trình khuyến mãi
                </div>
              </b-row>
            </div>
            <!-- END - title & icon -->

            <!-- START - collapse -->
            <b-collapse
              id="collapse-1"
              visible
            >
              <b-col>
                <!-- START - first row -->
                <b-row
                  align-v="center"
                  class="my-1"
                >
                  <b-col
                    xl
                    lg="3"
                    sm="4"
                  >
                    <div
                      class="h7 mt-sm-1 mt-xl-0"
                    >
                      Tên chương trình
                    </div>
                    <b-input-group class="input-group-merge ">
                      <b-form-input
                        ref="focusInput"
                        v-model.trim="voucherProgram"
                        class="h7"
                        maxlength="40"
                        placeholder="Nhập tên CTKM"
                        @keyup.enter="onClickSearchButton"
                      />
                      <b-input-group-append
                        is-text
                      >
                        <!-- Icon-- Delete-text -->
                        <b-icon-x
                          v-show="voucherProgram"
                          is-text
                          class="cursor-pointer text-gray"
                          @click="voucherProgram = null"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
                <!-- END - first row -->

                <!-- START - second row -->
                <b-row class="pb-1">
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
                      >
                        <b-icon-x
                          v-show="promoFromDate"
                          style="position: absolute; right: 15px"
                          class="cursor-pointer text-gray"
                          scale="1.3"
                          data-clear
                        />
                        <vue-flat-pickr
                          v-model="promoFromDate"
                          :state="touched ? passed : null"
                          :config="configPromotionFromDate"
                          class="form-control h7 text-brand-3"
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
                      >
                        <b-icon-x
                          v-show="promoToDate"
                          style="position: absolute; right: 15px"
                          class="cursor-pointer text-gray"
                          scale="1.3"
                          data-clear
                        />
                        <vue-flat-pickr
                          v-model="promoToDate"
                          :state="touched ? passed : null"
                          :config="configPromotionToDate"
                          class="form-control h7 text-brand-3"
                          placeholder="Chọn ngày"
                        />
                      </b-row>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                  <!-- END - Date To -->
                </b-row>
              </b-col>
            </b-collapse>
            <!-- END - collapse -->

          </b-container>
        </b-col>
        <!-- END - promotionPrograms -->

        <!-- START - used -->
        <b-col class="ml-xl-80 mr-xl-50">
          <b-container
            class="box"
          >
            <!-- START - title & icon -->
            <div
              v-b-toggle.collapse-2
              class="cursor-pointer"
            >
              <b-row>
                <div class="content">
                  <b-icon-caret-down
                    scale="1.5"
                  />
                  Sử dụng
                </div>
              </b-row>
            </div>
            <!-- END - title & icon -->

            <!-- START - collapse -->
            <b-collapse
              id="collapse-2"
              visible
            >
              <b-col>
                <!-- START - First row -->
                <b-row
                  align-v="center"
                  class="my-1"
                >
                  <b-col
                    xl
                    lg="3"
                    sm="4"
                  >
                    <div
                      class="h7 mt-sm-1 mt-xl-0"
                    >
                      Voucher
                    </div>
                    <b-input-group class="input-group-merge ">
                      <b-form-input
                        v-model.trim="voucher"
                        class="h7"
                        maxlength="40"
                        placeholder="Nhập mã/tên/serial"
                        @keyup.enter="onClickSearchButton"
                      />
                      <b-input-group-append
                        is-text
                      >
                        <!-- Icon-- Delete-text -->
                        <b-icon-x
                          v-show="voucher"
                          is-text
                          class="cursor-pointer text-gray"
                          @click="voucher = null"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col
                    xl
                    lg="3"
                    sm="4"
                  >
                    <div
                      class="h7 mt-sm-1 mt-xl-0"
                    >
                      Khách hàng
                    </div>
                    <b-input-group class="input-group-merge ">
                      <b-form-input
                        v-model.trim="customer"
                        class="h7"
                        maxlength="40"
                        placeholder="Nhập mã/họ tên"
                        @keyup.enter="onClickSearchButton"
                      />
                      <b-input-group-append
                        is-text
                      >
                        <!-- Icon-- Delete-text -->
                        <b-icon-x
                          v-show="customer"
                          is-text
                          class="cursor-pointer text-gray"
                          @click="customer = null"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col
                    xl
                    lg="3"
                    sm="4"
                  >
                    <div
                      class="h7 mt-sm-1 mt-xl-0"
                    >
                      Số điện thoại
                    </div>
                    <b-input-group class="input-group-merge ">
                      <b-form-input
                        v-model.trim="phoneNumber"
                        class="h7"
                        maxlength="40"
                        placeholder="Nhập chính xác 4 số cuối"
                        @keyup.enter="onClickSearchButton"
                        @keypress="$onlyNumberInput"
                      />
                      <b-input-group-append
                        is-text
                      >
                        <!-- Icon-- Delete-text -->
                        <b-icon-x
                          v-show="phoneNumber"
                          is-text
                          class="cursor-pointer text-gray"
                          @click="phoneNumber = null"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
                <!-- End - First row -->

                <!-- START - Second row -->
                <b-row class="pb-1">
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
                      >
                        <b-icon-x
                          v-show="usedFromDate"
                          style="position: absolute; right: 15px"
                          class="cursor-pointer text-gray"
                          scale="1.3"
                          data-clear
                        />
                        <vue-flat-pickr
                          v-model="usedFromDate"
                          :state="touched ? passed : null"
                          :config="configUsedFromDate"
                          class="form-control h7 text-brand-3"
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
                      >
                        <b-icon-x
                          v-show="usedToDate"
                          style="position: absolute; right: 15px"
                          class="cursor-pointer text-gray"
                          scale="1.3"
                          data-clear
                        />
                        <vue-flat-pickr
                          v-model="usedToDate"
                          :state="touched ? passed : null"
                          :config="configUsedToDate"
                          class="form-control h7 text-brand-3"
                          placeholder="Chọn ngày"
                        />
                      </b-row>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-col>
                <!-- END - Date To -->
                </b-row>
                <!-- End - Second row -->
              </b-col>
            </b-collapse>
            <!-- END - collapse -->
          </b-container>
        </b-col>
        <!-- END - used -->

        <!-- START - Search button -->
        <div class="d-flex justify-content-center align-items-center">
          <div>
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
        </div>
      <!-- END - Search button -->
      </v-card-actions>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
} from 'vuex'
import {
  REPORT_VOUCHERS,
  // Actions
  GET_REPORT_VOUCHERS_USED_ACTION,
} from '../store-module/type'

export default {
  components: {
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
      dateFormatVNI,
      // search
      voucherProgram: null,
      voucher: null,
      customer: null,
      phoneNumber: null,
      promoFromDate: earlyMonth(),
      promoToDate: nowDate(),
      usedFromDate: earlyMonth(),
      usedToDate: nowDate(),
      // search
      configPromotionFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: this.promoFromDate,
      },
      configPromotionToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.promoToDate,
      },
      configUsedFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: this.usedFromDate,
      },
      configUsedToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.usedToDate,
      },
      formId: 5,
      ctrlId: 7,
    }
  },
  watch: {
    promoFromDate() {
      this.configPromotionToDate = {
        ...this.configPromotionToDate,
        minDate: this.promoFromDate,
      }
    },
    promoToDate() {
      this.configPromotionFromDate = {
        ...this.configPromotionFromDate,
        maxDate: this.promoToDate,
      }
    },

    usedFromDate() {
      this.configUsedToDate = {
        ...this.configUsedToDate,
        minDate: this.usedFromDate,
      }
    },
    usedToDate() {
      this.configUsedFromDate = {
        ...this.configUsedFromDate,
        maxDate: this.usedToDate,
      }
    },
  },
  created() {
    this.onSearch()
  },
  mounted() {
    this.configPromotionToDate = {
      ...this.configPromotionToDate,
      minDate: this.promoFromDate,
    }
    this.configPromotionFromDate = {
      ...this.configPromotionFromDate,
      maxDate: this.promoToDate,
    }

    this.configUsedToDate = {
      ...this.configUsedToDate,
      minDate: this.usedFromDate,
    }
    this.configUsedFromDate = {
      ...this.configUsedFromDate,
      maxDate: this.usedToDate,
    }
    this.$refs.focusInput.focus()
  },
  methods: {
    ...mapActions(REPORT_VOUCHERS, [
      GET_REPORT_VOUCHERS_USED_ACTION,
    ]),
    onSearch() {
      const searchData = {
        customerKeywords: this.customer,
        customerMobiPhone: this.phoneNumber,
        voucherKeywords: this.voucher,
        voucherProgramName: this.voucherProgram,
        fromProgramDate: reverseVniDate(this.promoFromDate),
        toProgramDate: reverseVniDate(this.promoToDate),
        fromUseDate: reverseVniDate(this.usedFromDate),
        toUseDate: reverseVniDate(this.usedToDate),
        formId: this.formId,
        ctrlId: this.ctrlId,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_VOUCHERS_USED_ACTION({ ...searchData, size: this.perPageSize })
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

<style scoped>
.box {
    border: 1px solid rgb(190, 186, 186);
    border-radius: 10px;
}
.content {
    margin-top: -10px;
    margin-left: -5px;
    background: white;
}
</style>
