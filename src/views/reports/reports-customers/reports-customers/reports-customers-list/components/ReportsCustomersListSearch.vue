<template>

  <!-- START - Search -->
  <b-form
    class="d-print-none"
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <b-col
        xl
        lg="3"
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
                ref="focusInput"
                v-model="keySearch"
                class="h7 text-brand-3"
                placeholder="Nhập họ tên/mã"
                @keyup.enter="onClickSearchButton"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="keySearch"
                  class="cursor-pointer text-gray"
                  @click="keySearch = null"
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
        </b-row>
      </b-col>
      <b-col
        xl
        lg="3"
        sm="4"
        class="p-1"
      >
        <b-row>

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
        </b-row>
        <b-row
          class="mt-1"
        >

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
        xl
        lg="3"
        sm="4"
        class="p-1"
      >
        <b-row>

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
                placeholder="Nhập chính xác 4 số cuối"
                maxlength="10"
                @keyup.enter="onClickSearchButton"
                @keypress="$onlyNumberInput"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="customerPhone"
                  class="cursor-pointer text-gray"
                  @click="customerPhone = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- END - Full Name -->
        </b-row>
      </b-col>
      <b-col>
        <b-container class="box pb-1">
          <!-- START - title & icon -->
          <div
            v-b-toggle.collapse-1
          >
            <b-row>
              <div class="content">
                <b-icon-caret-down
                  scale="1.5"
                />
                Thời gian tạo
              </div>
            </b-row>
          </div>
          <!-- END - title & icon -->

          <!-- START - collapse -->
          <b-collapse
            id="collapse-1"
            visible
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
                  Từ ngày
                </div>
                <b-row
                  class="v-flat-pickr-group mx-0"
                  align-v="center"
                  @keypress="$onlyDateInput"
                >
                  <b-icon-x
                    v-show="fromCreateDate"
                    class="cursor-pointer text-gray style-icon-x"
                    scale="1.3"
                    data-clear
                  />
                  <vue-flat-pickr
                    v-model="fromCreateDate"
                    :config="configFromDate"
                    class="form-control h7"
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
                  Đến ngày
                </div>
                <b-row
                  class="v-flat-pickr-group mx-0"
                  align-v="center"
                  @keypress="$onlyDateInput"
                >
                  <b-icon-x
                    v-show="toCreateDate"
                    class="cursor-pointer text-gray style-icon-x"
                    scale="1.3"
                    data-clear
                  />
                  <vue-flat-pickr
                    v-model="toCreateDate"
                    :config="configToDate"
                    class="form-control h7"
                  />
                </b-row>

              </b-col>
              <!-- END - Date To -->
            </b-row>
          </b-collapse>
        </b-container>
      </b-col>
      <b-col>
        <b-container class="box pb-1">
          <!-- START - title & icon -->
          <div
            v-b-toggle.collapse-2
          >
            <b-row>
              <div class="content">
                <b-icon-caret-down
                  scale="1.5"
                />
                Ngày mua hàng cuối
              </div>
            </b-row>
          </div>
          <!-- END - title & icon -->

          <!-- START - collapse -->
          <b-collapse
            id="collapse-2"
            visible
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
                  Từ ngày
                </div>
                <b-row
                  class="v-flat-pickr-group mx-0"
                  align-v="center"
                  @keypress="$onlyDateInput"
                >
                  <b-icon-x
                    v-show="fromPurchaseDate"
                    class="cursor-pointer text-gray style-icon-x"
                    scale="1.3"
                    data-clear
                  />
                  <vue-flat-pickr
                    v-model="fromPurchaseDate"
                    :config="configFromPurchaseDate"
                    class="form-control h7"
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
                  Đến ngày
                </div>
                <b-row
                  class="v-flat-pickr-group mx-0"
                  align-v="center"
                  @keypress="$onlyDateInput"
                >
                  <b-icon-x
                    v-show="toPurchaseDate"
                    class="cursor-pointer text-gray style-icon-x"
                    scale="1.3"
                    data-clear
                  />
                  <vue-flat-pickr
                    v-model="toPurchaseDate"
                    :config="configToPurchaseDate"
                    class="form-control h7"
                  />
                </b-row>

              </b-col>
              <!-- END - Date To -->
            </b-row>
          </b-collapse>
        </b-container>
      </b-col>

      <!-- START - Search button -->
      <div
        class="mx-1 d-flex align-items-center"
      >
        <b-button
          id="btnSearch"
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </div>
      <!-- END - Search button -->
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
import {
  reverseVniDate,
  // earlyMonth,
  // nowDate,
} from '@/@core/utils/filter'
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
      fromCreateDate: null,
      toCreateDate: null,
      fromPurchaseDate: null,
      toPurchaseDate: null,
      fromSaleDate: null,
      toSaleDate: null,
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
        id: data.areaCode,
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
    this.$refs.focusInput.focus()
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
.style-icon-x {
  position: absolute;
  right: 25px;
}
</style>
