<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Full Name -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-form-input
          id="form-input-customer"
          v-model="searchKeywords"
          class="h8 text-brand-3 height-button-brand-1"
          placeholder="Nhập họ tên/mã"
        />
      </b-col>
      <!-- END - Full Name -->

      <!-- START - Date From -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Từ ngày
        </div>
        <b-input-group
          id="form-input-date-from"
          class="input-group-merge"
        >
          <vue-flat-pickr
            v-model="fromDate"
            :config="configDate"
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
            data-toggle
          >
            <b-icon-calendar />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
      <b-col
        xl
        md="3"
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
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
            data-toggle
          >
            <b-icon-calendar />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Date To -->

      <!-- START - Group -->
      <b-col
        xl
        md="3"
        sm="4"
      >
        <v-input-select
          title="Loại giao dịch"
          :suggestions="warehousesTypeOptions"
          placeholder="Tất cả"
          title-class="h8 mt-sm-1 mt-xl-0"
          input-class="h8 height-button-brand-1"
          suggestions-class="h9"
          :clear-able="true"
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
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          id="form-button-search"
          class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
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
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'

import warehousesData from '@/@db/warehouses'

export default {
  components: {
    VCardActions,
    VInputSelect,
  },

  data() {
    return {
      isSearchFocus: false,

      searchKeywords: null,
      fromDate: null,
      toDate: null,
      warehousesTypeOptions: warehousesData.transType,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },

  mounted() {
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
  },
}
</script>
