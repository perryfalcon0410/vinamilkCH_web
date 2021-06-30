<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >

    <!-- START - Search -->
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - promotionPrograms -->
      <b-col
        class="col-7 pb-1 cursor-pointer mx-0"
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
                Hóa đơn
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
                <!-- START - Red invoice no -->
                <b-col
                  xl
                  lg="3"
                  sm="4"
                >
                  <div
                    class="h7 mt-sm-1 mt-xl-0"
                  >
                    Số hóa đơn
                  </div>
                  <b-form-input
                    v-model="redInvoiceNo"
                    class="h7"
                    maxlength="40"
                    placeholder="Nhập số hóa đơn"
                    @keyup.enter="onClickSearchButton"
                  />
                </b-col>
                <!-- END - Red invoice no -->
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
                <!-- START - Bill collector -->
                <b-col
                  xl
                  lg="3"
                  sm="4"
                >
                  <div
                    class="h7 mt-sm-1 mt-xl-0"
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
                    class="h7 mt-sm-1 mt-xl-0"
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
              </b-row>
              <!-- END - first row -->

              <!-- START - second row -->
              <b-row class="mb-1">
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
                        class="form-control h7 text-brand-3"
                        placeholder="Chọn ngày"
                      />
                    </b-row>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <!-- END - Date To -->
                <!-- START -Income-->
                <b-col
                  xl
                  lg="3"
                  sm="4"
                >
                  <div
                    class="h7 mt-sm-1 mt-xl-0"
                  >
                    Doanh số hóa đơn
                  </div>
                  <b-row
                    no-gutters
                  >
                    <b-col>
                      <b-form-input
                        v-model="minIncome"
                        class="h7"
                        :number="true"
                        maxlength="12"
                        @keyup.enter="onClickSearchButton"
                        @keypress="$onlyNumberInput"
                      />
                    </b-col>
                    <b-col>
                      <b-form-input
                        v-model="maxIncome"
                        class="h7"
                        :number="true"
                        maxlength="12"
                        @keyup.enter="onClickSearchButton"
                        @keypress="$onlyNumberInput"
                      />
                    </b-col>
                  </b-row>
                </b-col>
                <!-- END - Income -->
              </b-row>
              <!-- END - second row -->
            </b-col>
          </b-collapse>
          <!-- END - collapse -->

        </b-container>
      </b-col>
      <!-- END - promotionPrograms -->

      <!-- START - used -->
      <b-col class="col-2 pb-1 cursor-pointer mx-1">
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
                Khách hàng
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
                  <div
                    class="h7 mt-sm-1 mt-xl-0"
                  >
                    Khách hàng
                  </div>
                  <b-form-input
                    v-model="customer"
                    class="h7"
                    maxlength="200"
                    placeholder="Nhập họ tên/mã"
                    @keyup.enter="onClickSearchButton"
                  />
                </b-col>
              </b-row>
              <!-- End - First row -->

              <!-- START - Second row -->
              <b-row>
                <b-col>
                  <div
                    class="h7 mt-sm-1 mt-xl-0"
                  >
                    Số điện thoại
                  </div>
                  <b-form-input
                    v-model="phoneNumber"
                    class="h7 mb-1"
                    maxlength="10"
                    placeholder="Nhập SĐT khách hàng"
                    @keyup.enter="onClickSearchButton"
                    @keypress="$onlyNumberInput"
                  />
                </b-col>
              </b-row>
              <!-- End - Second row -->
            </b-col>
          </b-collapse>
          <!-- END - collapse -->
        </b-container>
      </b-col>
      <!-- END - used -->

      <!-- START - Search button -->
      <div class="col-2 d-flex justify-content-center align-items-center">
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
        <!-- END - Search button -->
      </div>
      <!-- START - Modal find product -->
      <find-product-modal
        :visible="selectProductModalVisible"
        @onModalClose="onModalCloseClick"
        @onSaveClick="onSaveClick"
      />
    <!-- START - Modal find product -->
    </v-card-actions>
  <!-- END - Search -->
  </validation-observer>
</template>

<script>
import reportData from '@/@db/report'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapGetters, mapActions } from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  required,
} from '@/@core/utils/validations/validations'
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
    ValidationProvider,
    ValidationObserver,
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
      required,
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

      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.updateSearchData(searchData)
          this.$emit('updatePageElement')
          this.GET_REPORT_SALES_ACTION(searchData)
        }
      })
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
