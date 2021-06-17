<template>
  <!-- START - Search -->
  <b-form
    @keydown.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Trans Code -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
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
            id="form-input-trans-code"
            v-model="transCode"
            maxlength="40"
            placeholder="Nhập mã nhập hàng"
            trim
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
      <!-- END - Trans Code -->

      <!-- START - Bill Number -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
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
            id="form-input-bill-number"
            v-model="billNumber"
            maxlength="40"
            placeholder="Nhập số hóa đơn"
            trim
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="billNumber"
              class="cursor-pointer text-gray"
              @click="billNumber = null"
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
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
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
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
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
            v-model="toDate"
            :config="configToDate"
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

      <!-- START - Warehouses Input Type -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Loại nhập
        </div>
        <tree-select
          v-model="inputTypesSelected"
          :options="inputTypeOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Warehouses Input Type -->

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <!--"onmousedown" is prevent hightlight text -->
        <div
          class="text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapActions } from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import {
  WAREHOUSEINPUT,
  GET_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      billNumber: '',
      transCode: '',
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      inputTypesSelected: null,
      inputTypeOptions: warehousesData.inputTypes,

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
    this.onClickSearchButton()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
    ]),

    onClickSearchButton() {
      const searchData = {
        transCode: this.transCode,
        redInvoiceNo: this.billNumber,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.inputTypesSelected,
        formId: 5,
        ctrlId: 7,
      }
      this.updateSearchData(searchData)
      this.GET_RECEIPTS_ACTION(searchData)
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
