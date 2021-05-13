<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Full Name  Mã trả hàng-->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Mã trả hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="reciept"
            class="h8 text-brand-3"
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

    <!-- START - Modal find product -->
    <find-product-modal
      :visible="isShowFindProductModal"
      @close="isShowFindProductModal = false"
    />
    <!-- START - Modal find product -->

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

      reciept: null,
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
  beforeMount() {
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
  },
  mounted() {
    this.onSearch()
  },

  methods: {
    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_REPORT_RETURNED_GOODS_ACTION,
    ]),

    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
    },
    onSearch() {
      const searchData = {
        reciept: this.reciept,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        reason: this.reasonSelected,
        // productIds: this.productCodes,
        formId: 5,
        ctrlId: 7,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_RETURNED_GOODS_ACTION(searchData)
    },

    onClickSearchButton() {
      this.onSearch()
    },

    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
