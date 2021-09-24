<template>
  <validation-observer
    ref="formContainer"
    v-slot="{invalid}"
    slim
  >
    <b-form
      class="d-print-none"
      @keyup.enter="onClickSearchButton"
    >
      <v-card-actions
        title="Tìm kiếm"
      >
        <b-col
          xl
          md="3"
          sm="4"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Ngày"
          >
            <div
              class="h7 mt-lg-1 mt-xl-0"
            >
              Ngày <span class="text-danger">*</span>
            </div>
            <b-row
              class="v-flat-pickr-group mx-0"
              align-v="center"
              @keypress="$onlyDateInput"
              @change="isDateValid"
            >
              <b-icon-x
                v-show="date"
                style="position: absolute; right: 15px"
                class="cursor-pointer text-gray"
                scale="1.3"
                data-clear
              />
              <vue-flat-pickr
                v-model="date"
                :config="configDate"
                :state="touched ? passed : null"
                class="form-control h7"
                placeholder="Chọn ngày"
              />
            </b-row>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          xl
          md="3"
          sm="4"
        >
          <div class="h7 mt-lg-1 mt-xl-0">
            Sản phẩm
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              ref="focusInput"
              v-model="productCodes"
              class="h7 text-brand-3"
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
                @click="productCodes = null"
              />
              <b-icon-three-dots-vertical
                @click="showFindProductModal"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <!-- START - Warehouse Type -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Kho hàng"
          >
            <div
              class="h7 mt-sm-1 mt-xl-0"
            >
              Kho hàng <span class="text-danger">*</span>
            </div>
            <tree-select
              v-model="warehouseTypeSelected"
              :options="warehouseTypes"
              placeholder="Nhập kho hàng"
              :state="touched ? passed : null"
              class="h7"
              no-options-text="Không có dữ liệu"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- END - Warehouse Type -->

        <!-- START - Search button -->
        <b-col
          xl
          sm="4"
          md="3"
          class="h-25"
        >
          <div
            class="h7 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder height-button-brand-1"
            variant="someThing"
            :disabled="invalid"
            @click="onClickSearchButton"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
      <!-- END - Search button -->
      </v-card-actions>
      <find-product-modal
        :visible="isShowFindProductModal"
        :row-selected="productSelected"
        @onSaveClick="onSaveClick($event)"
        @onModalClose="onModalCloseClick"
      />
    </b-form>
  </validation-observer>
</template>

<script>
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { reverseVniDate, nowDate, checkingDateInput } from '@/@core/utils/filter'
import FindProductModal from './FindProductModal.vue'
import {
  REPORT_WAREHOUSES_INVENTORY,
  WAREHOUSE_TYPES_GETTER,
  GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
  GET_WAREHOUSE_TYPES_ACTION,
} from '../../store-module/type'

export default {
  components: {
    FindProductModal,
    VCardActions,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    perPageSize: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isShowFindProductModal: false,
      dateFormatVNI,
      date: nowDate(),
      productCodes: null,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      productSelected: [],
      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      warehouseTypeSelected: null,
    }
  },
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [
      WAREHOUSE_TYPES_GETTER,
    ]),
    warehouseTypes() {
      return this.WAREHOUSE_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.wareHouseTypeName,
        isDefault: data.isDefault,
      }))
    },
  },
  watch: {
    warehouseTypes() {
      this.warehouseTypeSelected = this.warehouseTypes.find(types => types.isDefault === 1).id // number 1 is default warehouse type
    },
    productCodes() {
      if (this.productCodes) {
        this.productCodes = this.productCodes?.replace(/\s+/g, '')
        this.productSelected = this.productCodes.split(',')
        return
      }
      this.productSelected = []
    },
  },
  mounted() {
    this.$refs.focusInput.focus()
    this.GET_WAREHOUSE_TYPES_ACTION({ ...this.decentralization })
  },
  methods: {
    ...mapActions(REPORT_WAREHOUSES_INVENTORY, [
      GET_REPORT_WAREHOUSES_INVENTORY_ACTION,
      GET_WAREHOUSE_TYPES_ACTION,
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
        productCodes: this.productCodes?.trim(),
        warehouseTypeId: this.warehouseTypeSelected,
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_REPORT_WAREHOUSES_INVENTORY_ACTION({ ...searchData, size: this.perPageSize })
    },
    onClickSearchButton() {
      this.onSearch()
      this.$emit('onClickSearchButton')
    },
    updateSearchData(data) {
      this.$emit('updateSearchData', data)
    },
    showFindProductModal() {
      this.isShowFindProductModal = true
      this.$bvModal.show('find-product-modal')
    },
    onModalCloseClick() {
      this.isShowFindProductModal = false
    },
    isDateValid() {
      if (!checkingDateInput(this.date)) {
        this.date = nowDate()
      }
    },
  },
}
</script>
