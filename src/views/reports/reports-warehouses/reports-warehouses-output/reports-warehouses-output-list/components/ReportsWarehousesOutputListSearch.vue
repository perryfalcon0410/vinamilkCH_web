<template>
  <b-form>
    <!-- START - Search -->
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Date From -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Từ ngày xuất
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
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Đến ngày xuất
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

      <!-- START - Product -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge "
        >
          <b-form-input
            v-model.trim="product"
            :state="product ? passed : null"
            maxlength="20"
            class="h7"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-three-dots-vertical
              class="cursor-pointer text-gray"
              @click="PoChooseModalVisible=!PoChooseModalVisible"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Product -->

      <!-- START - Type -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Loại xuất
        </div>
        <tree-select
          v-model="outputTypes"
          :options="outputTypeOptions"
          placeholder="Tất cả"
          no-options-text="Không có dữ liệu"
        />

      </b-col>
      <!-- END - Type -->

      <!-- START - License -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="số chứng từ"
        >
          <div
            class="h7 mt-sm-1 mt-xl-0"
          >
            Số chứng từ
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model.trim="license"
              :state="license ? passed : null"
              maxlength="20"
              class="h7"
              placeholder="Số hóa đơn/ số nội bộ/ PO"
              @keyup.enter="onClickSearchButton"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="license"
                class="cursor-pointer text-gray"
                @click="license = null"
              />
            </b-input-group-append>
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-col>
      <!-- END - License -->

      <!-- START - Bill Date From -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Từ ngày hóa đơn
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="billFromDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="billFromDate"
            :config="configBillFromDate"
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Bill Date From -->

      <!-- START - Bill Date To -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Đến ngày hoá đơn
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="billToDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="billToDate"
            :config="configBillToDate"
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Bill Date To -->

      <!-- START - Search Button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search Button -->

    </v-card-actions>
    <!-- END - Search -->
    <!-- START - Modal -->
    <po-choose-modal :visible="PoChooseModalVisible" />
    <!-- END - Modal -->
  </b-form>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  code,
} from '@/@core/utils/validations/validations'
import outputData from '@/@db/warehouses'
import { reverseVniDate } from '@/@core/utils/filter'
import {
  REPORT_OUTPUT_GOODS,
  // Getters
  OUTPUT_GOODS_GETTER,
  // Actions
  GET_OUTPUT_GOODS_ACTION,
} from '../../store-module/type'
import PoChooseModal from '../../components/po-choose-modal/OutputPoChooseModal.vue'

export default {
  components: {
    PoChooseModal,
    ValidationProvider,
    VCardActions,
  },
  data() {
    return {
      // validation rules
      code,
      PoChooseModalVisible: false,

      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,
      product: '',
      outputTypes: null,
      outputTypeOptions: outputData.outputTypes,
      license: '',
      billFromDate: this.$earlyMonth,
      billToDate: this.$nowDate,

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configBillFromDate: {
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
      configBillToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.billFromDate,
      },
    }
  },
  computed: {
    ...mapGetters(REPORT_OUTPUT_GOODS, [
      OUTPUT_GOODS_GETTER,
    ]),
    watch: {
      billFromDate() {
        this.configBillToDate = {
          ...this.configBillToDate,
          minDate: this.billFromDate,
        }
      },
      fromDate() {
        this.configToDate = {
          ...this.configToDate,
          minDate: this.fromDate,
        }
      },
    },
  },
  mounted() {
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.configBillToDate = {
      ...this.configBillToDate,
      minDate: this.billFromDate,
    }
  },
  methods: {
    ...mapActions(REPORT_OUTPUT_GOODS, [
      GET_OUTPUT_GOODS_ACTION,
    ]),
    onSearch() {
      const searchData = {
        searchKeywords: this.license,
        fromExportDate: reverseVniDate(this.fromDate),
        toExportDate: reverseVniDate(this.toDate),
        fromOrderDate: reverseVniDate(this.billFromDate),
        toOrderDate: reverseVniDate(this.billToDate),
        lstExportType: this.outputTypes,
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
      this.GET_OUTPUT_GOODS_ACTION(searchData)
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
