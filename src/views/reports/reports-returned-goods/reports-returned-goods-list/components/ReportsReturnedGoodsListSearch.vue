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
          class="input-group-merge"
        >
          <b-input-group-prepend
            ref="prependIconRef"
            is-text
            data-toggle
          >
            <b-icon-calendar
              class="cursor-pointer"
            />
          </b-input-group-prepend>
          <vue-flat-pickr
            v-model="fromDate"
            :config="configDate"
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="fromDate"
              scale="1.3"
              class="cursor-pointer"
              @click="fromDate = null"
            />
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
          <b-input-group-prepend
            is-text
            data-toggle
          >
            <b-icon-calendar
              class="cursor-pointer"
            />
          </b-input-group-prepend>
          <vue-flat-pickr
            id="form-input-date-from"
            v-model="toDate"
            :config="configDate"
            class="form-control h8 text-brand-3 height-button-brand-1"
            placeholder="Chọn ngày"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="toDate"
              scale="1.3"
              class="cursor-pointer"
              @click="toDate = null"
            />
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
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Nhóm khách hàng
        </div>
        <tree-select
          v-model="reasonSelected"
          title="Nhóm khách hàng"
          :options="reasonOptions"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <b-col
        xl
        md="3"
        sm="4"
      >
        <div class="h8 mt-sm-1 mt-xl-0">
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
          size="sm"
        >
          <b-input />
          <b-input-group-append is-text>
            <b-icon-three-dots-vertical
              class="cursor-pointer"
              @click="showFindProductModal"
            />
          </b-input-group-append>
        </b-input-group>
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
    <find-product-modal
      :visible="isShowFindProductModal"
      @close="isShowFindProductModal = false"
    />
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
} from 'vuex'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'

import { reverseVniDate } from '@/@core/utils/filter'
import reportData from '@/@db/report'
import FindProductModal from './FindProductModal.vue'

import {
  REPORT_RETURNED_GOODS,
  // Actions
  GET_REPORT_RETURNED_GOODS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
    FindProductModal,
  },
  data() {
    return {
      isSearchFocus: false,
      isShowFindProductModal: false,

      dateFormatVNI,

      searchKeywords: null,
      fromDate: null,
      toDate: null,
      reasonOptions: reportData.reasonTypes,
      reasonSelected: null,

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

  methods: {
    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_REPORT_RETURNED_GOODS_ACTION,
    ]),

    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
    },

    onClickSearchButton() {
      this.GET_REPORT_RETURNED_GOODS_ACTION({
        searchKeywords: this.searchKeywords?.trim(),
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        reason: this.reasonSelected,
      })
    },
  },
}
</script>
