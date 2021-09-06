<template>
  <!-- START - Search -->
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      @keyup.enter="onClickSearchButton"
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
              ref="focusInput"
              v-model="stockCountingCode"
              class="h7"
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
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Từ ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Từ ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
              @change="isFromDateValid"
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
                :state="touched ? passed : null"
                :config="configFromDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          lg="3"
          sm="4"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Đến ngày"
          >
            <div
              class="mt-sm-1 mt-xl-0"
            >
              Đến ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
              @change="isToDateValid"
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
                :state="touched ? passed : null"
                :config="configToDate"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
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
            Kho hàng
          </div>
          <tree-select
            v-model="warehouseType"
            :options="warehouseTypes"
            :searchable="false"
            placeholder="Tất cả"
            class="h7"
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
            :disabled="invalid"
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
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import { mapActions, mapGetters } from 'vuex'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
  checkingDateInput,
} from '@/@core/utils/filter'
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
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dateFormatVNI,

      stockCountingCode: '',
      fromDate: earlyMonth(),
      toDate: nowDate(),
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
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
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
        wareHouseTypeId: this.warehouseType,
        formId: 5,
        ctrlId: 7,
      }

      this.getInventories(searchData)
    },

    getInventories(data) {
      this.$emit('onSearchClick', data)
    },
    isFromDateValid() {
      if (!checkingDateInput(this.fromDate)) {
        this.fromDate = earlyMonth()
      }
    },
    isToDateValid() {
      if (!checkingDateInput(this.toDate)) {
        this.toDate = nowDate()
      }
    },
  },
}
</script>
