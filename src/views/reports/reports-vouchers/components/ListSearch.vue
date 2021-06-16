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
          class="pb-1 cursor-pointer box mx-1"
        >
          <b-container>

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
            >
              <b-col>
                <!-- START - first row -->
                <b-row
                  align-v="center"
                  class="my-1"
                >
                  <b-col cols="3">
                    Tên chương trình
                  </b-col>
                  <b-col>
                    <b-input
                      v-model.trim="voucherProgram"
                      placeholder="Nhập tên chương trình khuyến mãi"
                      @keyup.enter="onClickSearchButton"
                    />
                  </b-col>
                </b-row>
                <!-- END - first row -->

                <!-- START - second row -->
                <b-row>
                  <b-col>
                    <!-- START - FromDate -->
                    <validation-provider
                      v-slot="{ errors, passed, touched }"
                      rules="required"
                      name="Từ ngày"
                    >
                      <b-row align-v="center">
                        <b-col>
                          Từ ngày <span class="text-danger">*</span>
                        </b-col>
                        <b-col cols="8">
                          <b-row
                            class="v-flat-pickr-group mx-0"
                            align-v="center"
                            @keypress="$onlyDateInput"
                          >
                            <vue-flat-pickr
                              v-model="promoFromDate"
                              :state="touched ? passed : null"
                              :config="configPromotionFromDate"
                              class="form-control h8"
                              placeholder="Chọn ngày"
                            />
                            <b-icon-x
                              v-show="promoFromDate"
                              style="position: absolute; right: 15px"
                              class="cursor-pointer text-gray"
                              scale="1.3"
                              data-clear
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-row>
                        </b-col>
                      </b-row>
                      <!-- END - FromDate -->
                    </validation-provider>
                  </b-col>
                  <b-col>
                    <!-- START - ToDate -->
                    <validation-provider
                      v-slot="{ errors, passed, touched }"
                      rules="required"
                      name="Từ ngày"
                    >
                      <b-row align-v="center">
                        <b-col>
                          Đến ngày <span class="text-danger">*</span>
                        </b-col>
                        <b-col cols="8">
                          <b-row
                            class="v-flat-pickr-group mx-0"
                            align-v="center"
                            @keypress="$onlyDateInput"
                          >
                            <vue-flat-pickr
                              v-model="promoToDate"
                              :state="touched ? passed : null"
                              :config="configPromotionToDate"
                              class="form-control h8"
                              placeholder="Chọn ngày"
                            />
                            <b-icon-x
                              v-show="promoToDate"
                              style="position: absolute; right: 15px"
                              class="cursor-pointer text-gray"
                              scale="1.3"
                              data-clear
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-row>
                        </b-col>
                      </b-row>
                      <!-- END - ToDate -->
                    </validation-provider>
                  </b-col>
                </b-row>
                <!-- END - second row -->
              </b-col>
            </b-collapse>
            <!-- END - collapse -->

          </b-container>
        </b-col>
        <!-- END - promotionPrograms -->

        <!-- START - used -->
        <b-col class="pb-1 cursor-pointer box mx-1">
          <b-container>
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
            <b-collapse id="collapse-2">
              <b-col>
                <!-- START - First row -->
                <b-row
                  align-v="center"
                  class="my-1"
                >
                  <b-col>
                    Voucher
                  </b-col>
                  <b-col>
                    <b-input
                      v-model.trim="voucher"
                      placeholder="Nhập mã/tên/serial voucher"
                      @keyup.enter="onClickSearchButton"
                    />
                  </b-col>
                  <b-col>
                    Khách hàng
                  </b-col>
                  <b-col>
                    <b-input
                      v-model.trim="customer"
                      placeholder="Nhập mã/họ tênkhách hàng"
                      @keyup.enter="onClickSearchButton"
                    />
                  </b-col>
                  <b-col>
                    Số điện thoại
                  </b-col>
                  <b-col>
                    <b-input
                      v-model.trim="phoneNumber"
                      placeholder="Nhập SĐT khách hàng"
                      @keyup.enter="onClickSearchButton"
                      @keypress="$onlyNumberInput"
                    />
                  </b-col>
                </b-row>
                <!-- End - First row -->

                <!-- START - Second row -->
                <b-row>
                  <!-- START - From Date -->
                  <b-col>
                    <validation-provider
                      v-slot="{ errors, passed, touched }"
                      rules="required"
                      name="Từ ngày"
                    >
                      <b-row align-v="center">
                        <b-col>
                          Từ ngày <span class="text-danger">*</span>
                        </b-col>
                        <b-col cols="8">
                          <b-row
                            class="v-flat-pickr-group mx-0"
                            align-v="center"
                            @keypress="$onlyDateInput"
                          >
                            <vue-flat-pickr
                              v-model="usedFromDate"
                              :state="touched ? passed : null"
                              :config="configUsedFromDate"
                              class="form-control h8"
                              placeholder="Chọn ngày"
                            />
                            <b-icon-x
                              v-show="usedFromDate"
                              style="position: absolute; right: 15px"
                              class="cursor-pointer text-gray"
                              scale="1.3"
                              data-clear
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-row>
                        </b-col>
                      </b-row>
                    </validation-provider>
                  </b-col>
                  <!-- END - From Date -->

                  <!-- START - To Date -->
                  <b-col>
                    <validation-provider
                      v-slot="{ errors, passed, touched }"
                      rules="required"
                      name="Đến ngày"
                    >
                      <b-row align-v="center">
                        <b-col>
                          Đến ngày <span class="text-danger">*</span>
                        </b-col>
                        <b-col cols="8">
                          <b-row
                            class="v-flat-pickr-group mx-0"
                            align-v="center"
                            @keypress="$onlyDateInput"
                          >
                            <vue-flat-pickr
                              v-model="usedToDate"
                              :state="touched ? passed : null"
                              :config="configUsedToDate"
                              class="form-control h8"
                              placeholder="Chọn ngày"
                            />
                            <b-icon-x
                              v-show="usedToDate"
                              style="position: absolute; right: 15px"
                              class="cursor-pointer text-gray"
                              scale="1.3"
                              data-clear
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </b-row>
                        </b-col>
                      </b-row>
                    </validation-provider>
                  </b-col>
                  <!-- END - To Date -->
                </b-row>
                <!-- End - Second row -->
              </b-col>
            </b-collapse>
            <!-- END - collapse -->
          </b-container>
        </b-col>
        <!-- END - used -->

        <!-- START - Search button -->
        <b-col sm="2">
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
import { reverseVniDate } from '@/@core/utils/filter'
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
  data() {
    return {
      dateFormatVNI,
      // search
      voucherProgram: null,
      voucher: null,
      customer: null,
      phoneNumber: null,
      promoFromDate: this.$earlyMonth,
      promoToDate: this.$nowDate,
      usedFromDate: this.$earlyMonth,
      usedToDate: this.$nowDate,
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
      this.GET_REPORT_VOUCHERS_USED_ACTION(searchData)
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
