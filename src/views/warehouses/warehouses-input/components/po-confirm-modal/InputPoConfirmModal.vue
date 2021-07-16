<template>
  <b-modal
    id="po-confirm-modal"
    size="xl"
    :visible="visible"
    title="Danh sách PO Confirm"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <!-- START - Body -->
    <b-container fluid>
      <b-row>
        <!-- START - Po Confirm List -->
        <b-col
          xl="4"
          class="d-flex flex-row px-0"
        >
          <b-col
            class="bg-white shadow rounded text-dark mr-xl-1"
            style="overflow-x: scroll"
          >
            <table>
              <thead>
                <tr>
                  <th style="visibility: hidden">
                    stt
                  </th>
                  <th class="pl-1 pt-1">
                    PO No
                  </th>
                  <th class="pl-1 pt-1">
                    Số nội bộ
                  </th>
                  <th class="px-1 pt-1">
                    Ngày
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in poConfirm"
                  :key="item.id"
                  class="border-bottom border-white rounded py-1 cursor-pointer"
                  :class="{ 'text-brand-1': current == item.id }"
                  @click="selectOrder(item.id, item.internalNumber, item.poCoNumber, item.date)"
                >
                  <td class="py-1">
                    {{ index + 1 }}
                  </td>
                  <td class="pl-1">
                    {{ item.poCoNumber }}
                  </td>
                  <td class="pl-1">
                    {{ item.internalNumber }}
                  </td>
                  <td class="px-1">
                    {{ item.date }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- END - List -->
          </b-col>
        </b-col>
        <!-- END -  Po Confirm List -->

        <!-- START - List -->
        <b-col
          xl="8"
          class="px-0 mt-1 mt-xl-0 bg-white shadow rounded"
        >
          <!-- START - Table Product -->
          <!-- START - Title Product -->
          <div class="pt-1 px-xl-1 pr-md-1 bg-white shadow rounded ">
            <b-row
              align-v="end"
              class="justify-content-between mx-0"
            >

              <strong class="d-flex h-25 align-items-center rounded-top px-1">
                Sản phẩm
              </strong>
              <b-button
                class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-center"
                variant="someThing"
                @click="syncPo"
              >
                <b-icon
                  icon="arrow-repeat"
                />
                Tải PO
              </b-button>
            </b-row>
            <!-- END - Title Product -->
            <vue-good-table
              :columns="columns"
              :rows="poProducts"
              style-class="vgt-table bordered"
              compact-mode
              line-numbers
              class="py-1"
            >
              <!-- row filter -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div
                  v-if="props.column.field === 'totalPriceVat' || props.column.field === 'quantity'"
                  class="pr-70"
                >
                  {{ props.formattedRow[props.column.field] }}
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- row filter -->

              <!-- column filter -->
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  v-show="poProductInfo.totalQuantity"
                  class="mx-50 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(poProductInfo.totalQuantity) }}
                </b-row>
                <b-row
                  v-if="props.column.field === 'totalPriceVat'"
                  v-show="poProductInfo.totalPrice"
                  class="mx-50 h7 text-brand-3"
                  align-h="end"
                >
                  {{ $formatNumberToLocale(poProductInfo.totalPrice) }}
                </b-row>
              </template>
              <!-- column filter -->
              <!-- START - Empty rows -->
              <div
                slot="emptystate"
                class="text-center"
              >
                Không có dữ liệu
              </div>
              <!-- END - Empty rows -->
            </vue-good-table>
            <!-- END - Table Product -->

            <!-- START - Title Product promotion -->
            <div
              v-show="isShowPoPromoTable"
            >
              <strong class="d-inline-flex rounded-top px-1">
                Hàng khuyến mãi
              </strong>
              <!-- END - Title Product promotion -->

              <vue-good-table
                :columns="columns"
                :rows="poPromotionProducts"
                style-class="vgt-table bordered"
                compact-mode
                line-numbers
                class="py-1"
              >
                <template
                  slot="table-column"
                  slot-scope="props"
                >
                  <span v-if="props.column.label === 'Giá (VAT)'">
                    Giá
                  </span>
                  <span v-else-if="props.column.label === 'Thành tiền (VAT)'">
                    Thành tiền
                  </span>
                  <span v-else>
                    {{ props.column.label }}
                  </span>
                </template>
                <!-- row filter -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div
                    v-if="props.column.field === 'totalPriceVat' || props.column.field === 'quantity'"
                    class="pr-70"
                  >
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- row filter -->
                <!-- column filter -->
                <template
                  slot="column-filter"
                  slot-scope="props"
                >
                  <b-row
                    v-if="props.column.field === 'quantity'"
                    class="mx-50 h7 text-brand-3"
                    align-h="end"
                  >
                    {{ poPromotionProductsInfo.totalQuantity }}
                  </b-row>
                  <b-row
                    v-if="props.column.field === 'totalPriceVat'"
                    class="mx-50 h7 text-brand-3"
                    align-h="end"
                  >
                    {{ poPromotionProductsInfo.totalPrice }}
                  </b-row>
                </template>
                <!-- column filter -->
                <!-- START - Empty rows -->
                <div
                  slot="emptystate"
                  class="text-center"
                >
                  Không có dữ liệu
                </div>
              <!-- END - Empty rows -->
              </vue-good-table>
            </div>
            <!-- END - Table Product promotion -->
          </div>
        </b-col>
        <!-- END - List -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{}">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        :disabled="poConfirm.length === 0"
        @click="confirmImportButton"
      >
        <b-icon
          icon="download"
        />
        Nhập hàng
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-center"
        variant="something"
        :disabled="poConfirm.length === 0"
        @click="showModal()"
      >
        <b-icon
          icon="slash-circle"
        />
        Không nhập
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        :disabled="poConfirm.length === 0"
        @click="exportExcel"
      >
        <b-icon
          icon="file-earmark-excel-fill"
        />
        Xuất excel
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
        @click="closePoModal"
      >
        <b-icon
          icon="x"
          scale="1.5"
        />
        Đóng
      </b-button>
    </template>
    <!-- END - Footer -->
    <deny-modal
      :id="denyId"
      @deny="deny($event)"
      @close="close"
    />
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import { formatISOtoVNI } from '@core/utils/filter'
import DenyModal from './components/inputPoDenyModal.vue'
import {
  WAREHOUSEINPUT,
  // GETTERS
  POCONFIRM_GETTER,
  POCONFIRM_DETAILS_GETTER,
  POCONFIRM_PROMO_DETAILS_GETTER,
  IMPORTED_POCONFIRM_GETTER,
  // ACTIONS
  GET_POCONFIRMS_ACTION,
  GET_PODETAIL_PRODUCTS_ACTION,
  GET_PODETAIL_PRODUCTS_PROMO_ACTION,
  GET_IMPORTEXCEL_ACTION,
  GET_IMPORT_PO_CONFIRM_ACTION,
  // MUTATIONS
  CLEAR_GRID_VIEW_MUTATION,
} from '../../store-module/type'

export default {
  components: {
    DenyModal,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      importFile: null,
      poTable: 0,
      poPromoTable: 0,
      //
      formId: 5,
      ctrlId: 7,
      //
      isShowPoPromoTable: false,
      denyModalVisible: false,

      denyId: null,
      current: null,
      Snb: null,
      poNumber: null,
      sysDate: null,

      columns: [
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          type: 'number',
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left  ws-nowrap',
          tdClass: 'text-left ',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left  ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Giá (VAT)',
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right  ws-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right  ws-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPriceVat',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right  ws-nowrap',
          tdClass: 'text-right',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      POCONFIRM_GETTER,
      POCONFIRM_DETAILS_GETTER,
      POCONFIRM_PROMO_DETAILS_GETTER,
      IMPORTED_POCONFIRM_GETTER,
    ]),
    // get poConfirm list
    poConfirm() {
      return this.POCONFIRM_GETTER.map(data => ({
        id: data.id,
        poCoNumber: data.poCoNumber,
        internalNumber: data.internalNumber,
        date: formatISOtoVNI(data.orderDate),
      }))
    },
    theFirstPo() {
      if (this.poConfirm.length > 0) {
        const obj = {
          id: this.poConfirm[0].id,
          internalNumber: this.poConfirm[0].internalNumber,
          poNumber: this.poConfirm[0].poCoNumber,
          sysDate: this.poConfirm[0].date,
        }
        return obj
      }
      return {}
    },
    // get products from selected Po
    poProducts() {
      if (this.POCONFIRM_DETAILS_GETTER.response) {
        return this.POCONFIRM_DETAILS_GETTER.response.map(data => ({
          soNo: data.soNo,
          productCode: data.productCode,
          productName: data.productName,
          price: this.$formatNumberToLocale(data.price),
          priceNotVat: this.$formatNumberToLocale(data.priceNotVat),
          vat: this.$formatNumberToLocale(data.vat),
          unit: data.unit,
          quantity: this.$formatNumberToLocale(data.quantity),
          totalPriceNotVat: this.$formatNumberToLocale(data.amountNotVat),
          totalPriceVat: this.$formatNumberToLocale(data.totalPrice),
        }))
      }
      return []
    },
    poProductInfo() {
      if (this.POCONFIRM_DETAILS_GETTER.info) {
        return this.POCONFIRM_DETAILS_GETTER.info
      }
      return {}
    },
    // get promotion produtcs from selected Po
    poPromotionProducts() {
      if (this.POCONFIRM_PROMO_DETAILS_GETTER.response) {
        return this.POCONFIRM_PROMO_DETAILS_GETTER.response.map(data => ({
          soNo: data.soNo,
          productCode: data.productCode,
          productName: data.productName,
          price: this.$formatNumberToLocale(data.price) || 0,
          unit: data.unit,
          quantity: data.quantity,
          totalPrice: this.$formatNumberToLocale(data.totalPrice) || 0,
        }))
      }
      return []
    },
    poPromotionProductsInfo() {
      if (this.POCONFIRM_PROMO_DETAILS_GETTER.info) {
        return this.POCONFIRM_PROMO_DETAILS_GETTER.info
      }
      return {}
    },
  },
  watch: {
    poConfirm() {
      if (this.poConfirm.length > 0) {
        this.selectOrder(this.theFirstPo.id, this.theFirstPo.internalNumber, this.theFirstPo.poNumber, this.theFirstPo.sysDate)
      } else {
        this.CLEAR_GRID_VIEW_MUTATION()
      }
    },
    poPromotionProducts() {
      if (this.poPromotionProducts.length > 0) {
        this.isShowPoPromoTable = true
      } else {
        this.isShowPoPromoTable = false
      }
    },
  },
  mounted() {
    this.GET_POCONFIRMS_ACTION({
      formId: this.formId,
      ctrlId: this.ctrlId,
    })
  },

  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_POCONFIRMS_ACTION,
      GET_PODETAIL_PRODUCTS_ACTION,
      GET_PODETAIL_PRODUCTS_PROMO_ACTION,
      GET_IMPORTEXCEL_ACTION,
      GET_IMPORT_PO_CONFIRM_ACTION,
    ]),
    ...mapMutations(WAREHOUSEINPUT, [
      CLEAR_GRID_VIEW_MUTATION,
    ]),
    // invidual selectOrder event for poconfrim list
    selectOrder(id, internalNumber, poNum, date) {
      this.current = id
      this.poNumber = poNum
      this.Snb = internalNumber
      this.sysDate = date
      if (this.poConfirm.length > 0) {
        this.GET_PODETAIL_PRODUCTS_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId }) // hard code
        this.GET_PODETAIL_PRODUCTS_PROMO_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId }) // hard code
      }
    },
    // Sync PoConfirms list
    syncPo() {
      this.GET_IMPORT_PO_CONFIRM_ACTION({
        formId: this.formId,
        ctrlId: this.ctrlId,
        onSuccess: info => {
          if (info === false) {
            toasts.error('Đồng bộ không thành công')
          } else {
            this.GET_POCONFIRMS_ACTION({ formId: this.formId, ctrlId: this.ctrlId })
            toasts.success('Đồng bộ thành công')
          }
        },
      })
    },
    // Confirm import product from selected Po
    confirmImportButton() {
      this.$emit('inputChange', [this.sysDate, this.poProducts, this.poProductInfo, this.poPromotionProducts, this.poPromotionProductsInfo, this.Snb, this.poNumber, this.current])
      this.closePoModal()
    },
    exportExcel() {
      this.GET_IMPORTEXCEL_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId }) // hard code
    },
    showModal() {
      this.denyId = this.current
      this.$bvModal.show('po-deny-modal')
    },
    closePoModal() {
      this.$bvModal.hide('po-confirm-modal')
    },
    close() {
      this.$bvModal.hide('po-deny-modal')
    },
    deny(id) {
      this.$bvModal.hide('po-deny-modal')
      this.$emit('clearView', id)
      this.GET_POCONFIRMS_ACTION({ formId: this.formId, ctrlId: this.ctrlId })
    },
  },
}
</script>
