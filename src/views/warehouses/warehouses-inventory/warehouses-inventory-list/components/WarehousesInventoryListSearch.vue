<template>
  <!-- START - Search -->
  <b-form
    @keydown.enter="onClickSearchButton"
  >
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Stock Counting Code -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Mã kiểm kê
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            id="form-input-stock-counting-code"
            v-model="stockCountingCode"
            maxlength="40"
            placeholder="Nhập mã kiểm kê"
            trim
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

      <!-- START - Warehouses Type -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
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
        xl
        lg="3"
        sm="4"
        class="h8"
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
import { mapActions, mapGetters } from 'vuex'
import { reverseVniDate } from '@/@core/utils/filter'
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
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      warehouseType: null,

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
      this.onClickSearchButton()
    },
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPES_ACTION({ formId: 5, ctrlId: 7 })
    this.onClickSearchButton()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
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

      this.getInventories(searchData)
    },

    getInventories(data) {
      this.$emit('onSearchClick', data)
    },
  },
}
</script>
