<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      @keydown.enter="onSearch"
    >
      <!-- START - Search -->
      <v-card-actions
        title="Tìm kiếm"
      >
        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="code"
            name="mã nhập hàng"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Mã nhập hàng
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="transCode"
                placeholder="Nhập mã nhập hàng"
                maxlength="40"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="transCode"
                  class="cursor-pointer text-gray"
                  @click="transCode = ''"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="code"
            name="số hóa đơn"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Số hóa đơn
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="redInvoiceNo"
                placeholder="Nhập số hóa đơn"
                maxlength="40"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="redInvoiceNo"
                  class="cursor-pointer text-gray"
                  @click="redInvoiceNo = ''"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="code"
            name="số nội bộ"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Số nội bộ
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="internalNumber"
                placeholder="Nhập số nội bộ"
                maxlength="40"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="internalNumber"
                  class="cursor-pointer text-gray"
                  @click="internalNumber = ''"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="code"
            name="PO No"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              PO No
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model.trim="poNo"
                placeholder="Nhập PO No"
                maxlength="40"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="poNo"
                  class="cursor-pointer text-gray"
                  @click="poNo = ''"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="từ ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Từ ngày hóa đơn
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
                :config="configFromDate"
                class="form-control"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="đến ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Đến ngày hóa đơn
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
                :config="configToDate"
                class="form-control"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          lg="3"
          sm="4"
          class="h8"
        >
          <div
            class="text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
            variant="someThing"
            :disabled="invalid"
            @click="onSearchClick"
          >
            <b-icon-search class="mr-1" />
            Tìm kiếm
          </b-button>
        </b-col>
      </v-card-actions>

    </b-form>
  <!-- END - Search -->
  </validation-observer>
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  code,
  required,
} from '@/@core/utils/validations/validations'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  WAREHOUSES_OUTPUT,
  // Actions
  GET_EXPORT_PO_TRANS_ACTION,
} from '../../../store-module/type'

export default {
  components: {
    ValidationProvider,
    VCardActions,
    ValidationObserver,
  },

  data() {
    return {
      // validation rules
      code,
      required,

      transCode: '',
      redInvoiceNo: '',
      internalNumber: '',
      poNo: '',
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

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
    this.onSearch()
  },

  methods: {
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_ACTION,
    ]),
    onSearch() {
      const searchData = {
        transCode: this.transCode,
        redInvoiceNo: this.redInvoiceNo,
        internalNumber: this.internalNumber,
        poNo: this.poNo,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
      }
      this.updateSearchData(searchData)
      this.GET_EXPORT_PO_TRANS_ACTION(searchData)
    },
    onSearchClick() {
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>

<style>

</style>
