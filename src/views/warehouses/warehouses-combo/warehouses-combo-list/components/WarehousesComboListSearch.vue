<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
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
          Mã giao dịch
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="transCode"
            placeholder="Nhập mã giao dịch"
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
      <!-- END - Trans Code -->

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
            class="form-control"
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
            class="form-control"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

      <!-- START - Group -->
      <b-col
        xl
        md="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Loại giao dịch
        </div>
        <tree-select
          v-model="transTypeSelected"
          :options="warehousesTypeOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Group -->

      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          id="form-button-search"
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
import {
  mapActions,
} from 'vuex'

import warehousesData from '@/@db/warehouses'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  WAREHOUSES_COMBO,
  GET_WAREHOUSES_COMBO_ACTIONS,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },

  data() {
    return {
      isSearchFocus: false,
      transCode: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      warehousesTypeOptions: warehousesData.transTypes,
      transTypeSelected: null,

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
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
  },

  methods: {
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSES_COMBO_ACTIONS,
    ]),
    onSearch() {
      const searchData = {
        transCode: this.transCode?.trim(),
        transType: this.transTypeSelected,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_WAREHOUSES_COMBO_ACTIONS(searchData)
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
