<template>
  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Stock Counting Code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Mã kiểm kê
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            id="form-input-stock-counting-code"
            v-model="stockCountingCode"
            class="h8 text-brand-3"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="stockCountingCode"
              class="cursor-pointer text-gray"
              @click="stockCountingCode = null"
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

      <!-- START - Warehouses Type -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Kho
        </div>
        <tree-select
          v-model="warehouseType"
          :options="warehouseTypes"
          :searchable="false"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />
      </b-col>
      <!-- END - Warehouses Type -->

      <!-- START - Search button -->
      <b-col
        lg="4"
        md="12"
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
import { mapActions, mapGetters } from 'vuex'
import { reverseVniDate, formatDateToLocale } from '@/@core/utils/filter'
import { dateFormatVNI } from '@/@core/utils/validations/validations'
import {
  WAREHOUSEINVENTORY,
  GET_WAREHOUSE_INVENTORIES_ACTION,
  GET_WAREHOUSE_TYPES_ACTION,
  WAREHOUSE_TYPES_GETTER,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      dateFormatVNI,

      stockCountingCode: '',
      fromDate: formatDateToLocale(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      toDate: formatDateToLocale(new Date()),
      warehouseType: null,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
    }
  },
  computed: {
    warehouseTypes() {
      return this.WAREHOUSE_TYPES_GETTER().map(data => ({
        id: data.id,
        label: data.wareHouseTypeName,
        isDefault: data.isDefault,
      }))
    },
  },

  watch: {
    warehouseTypes() {
      this.warehouseType = this.warehouseTypes.find(types => types.isDefault === 1).id // number 1 is default warehouse type
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPES_ACTION({ formId: 5, ctrlId: 7 })
    this.onClickSearchButton()
  },
  methods: {
    ...mapActions(WAREHOUSEINVENTORY, [GET_WAREHOUSE_INVENTORIES_ACTION, GET_WAREHOUSE_TYPES_ACTION]),
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_TYPES_GETTER,
    ]),
    onClickSearchButton() {
      const searchData = {
        stockCountingCode: this.stockCountingCode,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        warehouseTypeId: this.warehouseType,
        formId: 5,
        ctrlId: 7,
      }

      this.updateSearchData(searchData)
      this.GET_WAREHOUSE_INVENTORIES_ACTION(searchData)
    },

    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
  },
}
</script>
