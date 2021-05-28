<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
    <validation-observer
      ref="formContainer"
    >
      <b-col>
        <b-row>
          <!-- START - Form -->
          <b-col
            xl="4"
            class="bg-white shadow rounded mr-xl-1"
          >
            <!-- START - Date -->
            <b-row class="my-1">
              <b-col cols="4">
                Ngày nhập:
              </b-col>
              <b-col>
                <strong>
                  {{ transDate }} lúc {{ transTime }}
                </strong>
              </b-col>
            </b-row>
            <!-- END - Date -->

            <!-- START - ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Mã giao dịch"
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    v-model="id"
                    maxlength="40"
                    trim
                    disabled
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group>
                  <v-input-select
                    :suggestions="traddingTypeOptions"
                    :data-input="traddingTypeSelected.label"
                    disabled
                    title="Loại giao dịch"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - ID and Type -->

            <!-- START -   Note -->
            <b-form-group
              label="Ghi chú"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                maxlength="4000"
                disabled
              />
            </b-form-group>
            <!-- END -   Note -->
          </b-col>
          <!-- END - Form -->

          <!-- START - List -->
          <b-col
            class="bg-white shadow rounded mt-1 mt-xl-0"
          >
            <!-- START - Table combo list -->
            <div class="d-inline-flex rounded-top my-1">
              <strong>
                Danh sách combo
              </strong>
            </div>
            <vue-good-table
              :columns="comboListColumns"
              :rows="combos"
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
            <!-- END - Empty rows -->
            </vue-good-table>

            <!-- END - Table combo list -->
            <br>
            <!-- START - Table combo exchange -->
            <div class="d-inline-flex rounded-top my-1">
              <strong>
                Quy đổi combo
              </strong>
            </div>
            <vue-good-table
              :columns="comboExchangeColumns"
              :rows="products"
              style-class="vgt-table striped"
              compact-mode
              line-numbers
            >
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
            <!-- END - Empty rows -->
            </vue-good-table>
            <!-- END - Table combo exchange -->

            <!-- START - Button -->
            <b-row class="mr-0 my-1 justify-content-end">
              <b-button-group>

                <b-button
                  class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
                  @click="navigateBack"
                >
                  <b-icon
                    icon="x"
                    scale="1.5"
                    class="mr-1"
                  />
                  Đóng
                </b-button>
              </b-button-group>
            </b-row>
            <!-- END - Button -->

          </b-col>
          <!-- END - List -->

        </b-row>
      </b-col>
    </validation-observer>
  </b-container>
</template>

<script>
import router from '@/router'
import VInputSelect from '@/@core/components/v-input-select/VInputSelect.vue'
import warehousesData from '@/@db/warehouses'
import {
  formatISOtoVNI, getTimeOfDate,
} from '@core/utils/filter'
import { getNow } from '@core/utils/utils'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import {
  WAREHOUSES_COMBO,
  // GETTERS
  GET_WAREHOUSE_COMBO_DETAIL_GETTER,
  // ACTIONS
  GET_WAREHOUSE_COMBO_DETAIL_ACTION,
} from '../store-module/type'

export default {
  components: {
    VInputSelect,
  },
  data() {
    return {
      now: getNow(),
      traddingTypeOptions: warehousesData.tradingTypes,
      traddingTypeSelected: { id: null, label: null },
      // -----------------Combo List-----------------
      comboListColumns: [
        {
          label: 'Mã combo',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'productPrice',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên combo',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      // -----------------Combo List-----------------

      // -----------------Combo Exchange-----------------
      comboExchangeColumns: [
        {
          label: 'Mã combo',
          field: 'comboProductCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tỉ lệ quy đổi',
          field: 'factor',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      // -----------------Combo Exchange-----------------
      transDate: '',
      transTime: '',
    }
  },
  computed: {
    combos() {
      if (this.GET_WAREHOUSE_COMBO_DETAIL_GETTER().combos) {
        return this.GET_WAREHOUSE_COMBO_DETAIL_GETTER().combos.map(data => ({
          productCode: data.productCode,
          productName: data.productName,
          quantity: data.quantity,
          productPrice: data.productPrice,
        }))
      }
      return []
    },
    products() {
      if (this.GET_WAREHOUSE_COMBO_DETAIL_GETTER().products) {
        return this.GET_WAREHOUSE_COMBO_DETAIL_GETTER().products.map(data => ({
          comboProductCode: data.comboProductCode,
          productCode: data.productCode,
          productName: data.productName,
          factor: data.factor,
          quantity: data.quantity,
          price: data.price,
        })) || []
      }
      return []
    },
    detail() {
      return this.GET_WAREHOUSE_COMBO_DETAIL_GETTER()
    },
  },
  watch: {
    detail() {
      this.id = this.detail.transCode
      this.transDate = formatISOtoVNI(this.detail.transDate)
      this.transTime = getTimeOfDate(this.detail.transDate)
      this.note = this.detail.note
      this.traddingTypeSelected = warehousesData.tradingTypes.find(item => item.id === this.detail.transType.toString()) || null
    },
  },
  mounted() {
    this.GET_WAREHOUSE_COMBO_DETAIL_ACTION({
      id: this.$route.params.id,
      formId: 5,
      ctrlId: 1,
    })
  },
  methods: {
    ...mapGetters(WAREHOUSES_COMBO, [
      GET_WAREHOUSE_COMBO_DETAIL_GETTER,
    ]),
    ...mapActions(WAREHOUSES_COMBO, [
      GET_WAREHOUSE_COMBO_DETAIL_ACTION,
    ]),
    navigateBack() {
      router.push({ name: 'warehouses-combo' })
    },
  },
}
</script>
