<template>
  <b-form>
    <!-- START - Search -->
    <v-card-actions
      title="Tìm kiếm"
    >
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="mã nhận hàng"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Mã nhận hàng
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="transCode"
              :state="transCode ? passed : null"
              placeholder="Nhập mã nhập hàng"
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
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>

      <b-col
        xl
        lg="3"
        sm="4"
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="số hóa đơn"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Số hóa đơn
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="redInvoiceNo"
              :state="redInvoiceNo ? passed : null"
              placeholder="Nhập số hóa đơn"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="redInvoiceNo"
                class="cursor-pointer text-gray"
                @click="redInvoiceNo = null"
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
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="số nội bộ"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Số nội bộ
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="internalNumber"
              :state="internalNumber ? passed : null"
              placeholder="Nhập số nội bộ"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="internalNumber"
                class="cursor-pointer text-gray"
                @click="internalNumber = null"
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
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="PO No"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            PO No
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="poNo"
              :state="poNo ? passed : null"
              placeholder="Nhập PO No"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="poNo"
                class="cursor-pointer text-gray"
                @click="poNo = null"
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
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày
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
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>

      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Đến ngày
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
            id="form-input-date-from"
            v-model="toDate"
            :config="configToDate"
            class="form-control h8"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>

      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onSearchClick"
        >
          <b-icon-search class="mr-1" />
          Tìm kiếm
        </b-button>
      </b-col>

    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
} from 'vuex'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  code,
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
  },

  data() {
    return {
      // validation rules
      code,

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
        poNumber: this.poNo,
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
