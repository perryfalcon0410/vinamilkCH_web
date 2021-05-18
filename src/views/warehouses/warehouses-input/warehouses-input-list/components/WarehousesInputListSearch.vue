<template>
  <!-- START - Search -->
  <b-form>
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
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số hóa đơn
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            id="form-input-bill-number"
            v-model="billNumber"
            class="h8 text-brand-3"
            @keyup.enter="onClickSearchButton"
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
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <vue-flat-pickr
            v-model="fromDate"
            :config="configDate"
            class="form-control h8 text-brand-3"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="fromDate"
              class="cursor-pointer text-gray"
              @click="fromDate = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
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
        <b-input-group
          class="input-group-merge"
        >
          <vue-flat-pickr
            id="form-input-date-from"
            v-model="toDate"
            :config="configDate"
            class="form-control h8 text-brand-3"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="toDate"
              class="cursor-pointer text-gray"
              @click="toDate = null"
            />
          </b-input-group-append>
        </b-input-group>

      </b-col>
      <!-- END - Date To -->

      <!-- START - Warehouses Input Type -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
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
        xl="4"
        lg="3"
        sm="4"
      >
        <!--"onmousedown" is prevent hightlight text -->
        <div
          class="h8 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-05" />
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
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      inputTypesSelected: null,
      inputTypeOptions: warehousesData.inputTypes,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
    }
  },
  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
    ]),

    onClickSearchButton() {
      const searchData = {
        redInvoiceNo: this.billNumber?.trim(),
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
