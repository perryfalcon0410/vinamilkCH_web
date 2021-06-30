<template>

  <!-- START - Search -->
  <b-form
    class="d-print-none"
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Điều kiện"
    >
      <b-row>
        <b-col
          sm="4"
          class="p-1"
        >
          <b-row>
            <!-- START - Full Name -->
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
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="keySearch"
                  class="h7 text-brand-3"
                  placeholder="Nhập họ tên/mã"
                  @keyup.enter="onClickSearchButton"
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

            <!-- START - Location -->
            <b-col
              xl
              lg="3"
              sm="4"
              class="h7"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Khu vực
              </div>
              <tree-select
                v-model="areasSelected"
                :options="areaOptions"
                placeholder="Tất cả"
                no-options-text="Không có dữ liệu"
                no-results-text="Không tìm thấy kết quả"
              />
            </b-col>
            <!-- END - Location -->

            <!-- START - MobiPhone -->
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
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="customerPhone"
                  class="h7 text-brand-3"
                  placeholder="Nhập SĐT"
                  maxlength="10"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
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
          </b-row>
          <b-row
            class="mt-1"
          >

            <!-- START - Group -->
            <b-col
              xl
              md="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Nhóm khách hàng
              </div>
              <tree-select
                v-model="customerType"
                title="Nhóm khách hàng"
                :options="customerTypeOptions"
                :searchable="false"
                placeholder="Tất cả"
                no-options-text="Không có dữ liệu"
              />
            </b-col>
            <!-- END - Group -->

            <!-- START - Status -->
            <b-col
              xl
              lg="3"
              sm="4"
              class="h7"
            >
              <div
                class="mt-sm-1 mt-xl-0"
              >
                Trạng thái
              </div>
              <tree-select
                v-model="statusSelected"
                :options="statuOptions"
                :searchable="false"
                placeholder="Tất cả"
                no-options-text="Không có dữ liệu"
              />
            </b-col>
            <!-- END - Status -->
          </b-row>
        </b-col>
        <b-col
          class="border p-1 mr-1"
        >
          <b-row>

            <!-- START - Date From -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Từ ngày tạo
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromCreateDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromCreateDate"
                  :config="configFromDate"
                  class="form-control h7"
                  placeholder="Chọn ngày"
                />
              </b-row>
            </b-col>
            <!-- END - Date From -->
          </b-row>
          <b-row
            class="mt-1"
          >

            <!-- START - Date To -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Đến ngày tạo
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toCreateDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toCreateDate"
                  :config="configToDate"
                  class="form-control h7"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-row>
        </b-col>
        <b-col
          class="border p-1 mr-1"
        >
          <b-row>

            <!-- START - Date From -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Từ ngày MHC
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromPurchaseDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromPurchaseDate"
                  :config="configFromPurchaseDate"
                  class="form-control h7"
                  placeholder="Chọn ngày"
                />
              </b-row>
            </b-col>
            <!-- END - Date From -->
          </b-row>
          <b-row
            class="mt-1"
          >

            <!-- START - Date To -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Đến ngày MHC
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toPurchaseDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toPurchaseDate"
                  :config="configToPurchaseDate"
                  class="form-control h7"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-row>
        </b-col>
        <b-col
          sm="3"
          class="border p-1"
        >
          <b-row>

            <!-- START - Sale Amount -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Từ doanh số
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="fromSaleAmount"
                  class="h7 text-brand-3"
                  placeholder="Từ doanh số"
                  :number="true"
                  maxlength="12"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
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
            <!-- END - Sale Amount -->

            <!-- START - Sale Amount -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Đến doanh số
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model="toSaleAmount"
                  class="h7 text-brand-3"
                  placeholder="Đến doanh số"
                  :number="true"
                  maxlength="12"
                  @keyup.enter="onClickSearchButton"
                  @keypress="$onlyNumberInput"
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
            <!-- END - Sale Amount -->
          </b-row>
          <b-row
            class="mt-1"
          >

            <!-- START - Date From -->
            <b-col
              xl
              lg="3"
              sm="4"
            >
              <div
                class="h7 mt-sm-1 mt-xl-0"
              >
                Từ ngày doanh số
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="fromSaleDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="fromSaleDate"
                  :config="configFromSaleDate"
                  class="form-control h7"
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
                class="h7 mt-sm-1 mt-xl-0"
              >
                Đến ngày doanh số
              </div>
              <b-row
                class="v-flat-pickr-group mx-0"
                align-v="center"
                @keypress="$onlyDateInput"
              >
                <b-icon-x
                  v-show="toSaleDate"
                  style="position: absolute; right: 15px"
                  class="cursor-pointer text-gray"
                  scale="1.3"
                  data-clear
                />
                <vue-flat-pickr
                  v-model="toSaleDate"
                  :config="configToSaleDate"
                  class="form-control h7"
                  placeholder="Chọn ngày"
                />
              </b-row>

            </b-col>
            <!-- END - Date To -->
          </b-row>
        </b-col>
        <!-- START - Search button -->
        <b-col
          sm="2"
          class="p-1"
        >
          <div
            class="h7 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
            variant="someThing"
            @click="onClickSearchButton()"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
        <!-- END - Search button -->
      </b-row>
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import customerData from '@/@db/customer'
import {
  REPORT_CUSTOMERS,

  // GETTERS
  SHOP_LOCATIONS_SEARCH_GETTER,
  CUSTOMER_TYPES_GETTER,

  // Actions
  GET_REPORT_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_SEARCH_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  props: {
    perPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      dateFormatVNI,

      keySearch: null,
      customerPhone: null,
      statuOptions: customerData.status,
      statusSelected: null,
      fromCreateDate: this.$earlyMonth,
      toCreateDate: this.$nowDate,
      // fromPurchaseDate: this.$earlyMonth,
      // toPurchaseDate: this.$nowDate,
      // fromSaleDate: this.$earlyMonth,
      // toSaleDate: this.$nowDate,
      fromSaleAmount: null,
      toSaleAmount: null,
      customerType: null,
      areasSelected: null,

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
        minDate: this.fromCreateDate,
      },

      configFromPurchaseDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToPurchaseDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromPurchaseDate,
      },

      configFromSaleDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToSaleDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromSaleDate,
      },
    }
  },

  computed: {
    ...mapGetters(REPORT_CUSTOMERS, [
      SHOP_LOCATIONS_SEARCH_GETTER,
      CUSTOMER_TYPES_GETTER,
    ]),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.name,
      }))
    },
    areaOptions() {
      return this.SHOP_LOCATIONS_SEARCH_GETTER.map(data => ({
        id: data.id,
        label: data.provinceAndDistrictName,
        default: data.default,
      }))
    },
  },
  watch: {
    fromCreateDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromCreateDate,
      }
    },
    fromPurchaseDate() {
      this.configToPurchaseDate = {
        ...this.configToPurchaseDate,
        minDate: this.fromPurchaseDate,
      }
    },
    fromSaleDate() {
      this.configToSaleDate = {
        ...this.configToSaleDate,
        minDate: this.fromSaleDate,
      }
    },
  },

  beforeMount() {
    this.GET_CUSTOMER_TYPES_ACTION({ data: { ...this.decentralization }, onSuccess: () => {} })
    this.GET_SHOP_LOCATIONS_SEARCH_ACTION({ ...this.decentralization })
  },
  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromCreateDate,
    }
    this.configToPurchaseDate = {
      ...this.configToPurchaseDate,
      minDate: this.fromPurchaseDate,
    }
    this.configToSaleDate = {
      ...this.configToSaleDate,
      minDate: this.fromSaleDate,
    }
  },

  methods: {
    ...mapActions(REPORT_CUSTOMERS, [
      GET_REPORT_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_SEARCH_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    onSearch() {
      const searchData = {
        keySearch: this.keySearch,
        areaCode: this.areasSelected,
        customerPhone: this.customerPhone,
        customerStatus: this.statusSelected,
        customerType: this.customerType,
        fromCreateDate: reverseVniDate(this.fromCreateDate),
        toCreateDate: reverseVniDate(this.toCreateDate),
        fromPurchaseDate: reverseVniDate(this.fromPurchaseDate),
        toPurchaseDate: reverseVniDate(this.toPurchaseDate),
        fromSaleAmount: this.fromSaleAmount,
        toSaleAmount: this.toSaleAmount,
        fromSaleDate: reverseVniDate(this.fromSaleDate),
        toSaleDate: reverseVniDate(this.toSaleDate),
      }
      console.log(searchData)
      this.updateSearchData(searchData)
      this.GET_REPORT_CUSTOMERS_ACTION(searchData)
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
