<template>

  <!-- START - Search -->
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
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
            class="form-control h8"
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
import {
  mapActions,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import FindProductModal from './FindProductsModal.vue'
import {
  REPORT_WAREHOUSES_ADJUSTMENTS,
  GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTIONS,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
    FindProductModal,
  },
  props: {
    perPageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      selectProductModalVisible: false,
      isSearchFocus: false,
      ids: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

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
  computed: {
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
    ...mapActions(REPORT_WAREHOUSES_ADJUSTMENTS, [
      GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTIONS,
    ]),
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
      } else {
        this.ids = null
      }
    },
    onSearch() {
      const searchData = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        productCodes: this.ids,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_WAREHOUSES_ADJUSTMENTS_ACTIONS(searchData)
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
