<template>
  <b-form
    @keyup.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Điều kiện"
    >
      <b-col
        xl
        md="3"
        sm="4"
      >
        <validation-provider
          rules="dateFormatVNI"
        >
          <div
            class="h8 mt-lg-1 mt-xl-0"
          >
            Ngày
          </div>
          <b-input-group
            id="form-input-date"
            class="input-group-merge"
            size="sm"
            @keypress="$onlyDateInput"
          >
            <b-input-group-prepend
              is-text
              data-toggle
            >
              <b-icon-calendar />
            </b-input-group-prepend>
            <vue-flat-pickr
              v-model="date"
              :config="configDate"
              class="form-control h9"
              placeholder="Chọn ngày"
            />
          </b-input-group>
        </validation-provider>
      </b-col>

      <b-col
        xl
        md="3"
        sm="4"
      >
        <div class="h8 mt-lg-1 mt-xl-0">
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
          size="sm"
        >
          <b-form-input
            v-model="productCodes"
            class="h8 text-brand-3"
            placeholder="Mã sản phẩm"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <!-- Icon-- Delete-text -->
            <b-icon-x
              v-show="productCodes"
              is-text
              class="cursor-pointer text-gray"
              @click="ids = null"
            />
            <b-icon-three-dots-vertical
              @click="showFindProductModal"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
        class="h-25"
      >
        <div
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          id="form-button-search"
          class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
          variant="someThing"
          size="sm"
          style="height: 30px;"
          @click="onClickSearchButton"
        >
          <b-icon-search class="mr-1" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
    <find-product-modal
      :visible="isShowFindProductModal"
      @close="isShowFindProductModal = false"
      @onSaveClick="onSaveClick($event)"
    />
  </b-form>
</template>

<script>
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
import FindProductModal from './FindProductModal.vue'
import {
  REPORT_WAREHOUSES_INVENTORY,
  REPORT_WAREHOUSES_INVENTORY_GETTER,
  REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
} from '../../store-module/type'

export default {
  components: {
    FindProductModal,
    VCardActions,
  },
  data() {
    return {
      isShowFindProductModal: false,
      dateFormatVNI,
      date: this.$nowDate,
      productCodes: null,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
    }
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [
      REPORT_WAREHOUSES_INVENTORY_GETTER,
      REPORT_WAREHOUSES_INVENTORY_INFO_GETTER,
    ]),
    ...mapActions(REPORT_WAREHOUSES_INVENTORY, [
      GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
    ]),
    onSaveClick(param) {
      this.isShowFindProductModal = false
      if (param.length > 0) {
        this.productCodes = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
      } else {
        this.productCodes = null
      }
    },
    onSearch() {
      const searchData = {
        stockDate: reverseVniDate(this.date),
        productCodes: this.productCodes,
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_WAREHOUSES_INVENTORY_ACTION(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton', this.date)
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
    },
  },
}
</script>
