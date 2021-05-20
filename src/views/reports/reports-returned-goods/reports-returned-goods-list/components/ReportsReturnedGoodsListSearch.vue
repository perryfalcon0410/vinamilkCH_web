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
            placeholder="Nhập mã trả hàng"
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
        >
          <b-form-input
            v-model="ids"
            class="h8 text-brand-3"
            placeholder="Mã sản phẩm"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <!-- Icon-- Delete-text -->
            <b-icon-x
              v-show="ids"
              is-text
              class="cursor-pointer text-gray"
              @click="ids = null"
            />
            <!-- Icon-- Three-dot -->
            <b-icon-three-dots-vertical
              class="cursor-pointer"
              @click="onSelectProductModalClick"
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

      <!-- START - Modal find product -->
      <find-product-modal
        :visible="selectProductModalVisible"
        @onModalClose="onModalCloseClick"
        @onSaveClick="onSaveClick"
      />
      <!-- START - Modal find product -->
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'

import reportData from '@/@db/report'
import FindProductModal from './FindProductModal.vue'

export default {
  components: {
    VCardActions,
    FindProductModal,
  },
  data() {
    return {
      selectProductModalVisible: false,

      dateFormatVNI,

      reciept: null,
      fromDate: null,
      toDate: null,
      ids: null,
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
    onSelectProductModalClick() {
      this.selectProductModalVisible = true
    },
    onModalCloseClick() {
      this.selectProductModalVisible = false
    },
    onSaveClick(param) {
      this.selectProductModalVisible = false
      if (param.length > 0) {
        this.ids = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
        this.$emit('onClickSearchButton', {
          fromDate: this.fromDate,
          toDate: this.toDate,
          reciept: this.reciept,
          ids: this.ids,
        })
      } else {
        this.ids = null
      }
    },

    onClickSearchButton() {
      this.$emit('onClickSearchButton', {
        fromDate: this.fromDate,
        toDate: this.toDate,
        reciept: this.reciept,
        reason: this.reasonSelected,
        ids: this.ids,
      })
    },
  },
}
</script>
