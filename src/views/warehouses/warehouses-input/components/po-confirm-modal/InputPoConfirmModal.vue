<template>
  <b-modal
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
        <!-- START - Import/Export List -->
        <b-col
          xl="4"
          class="bg-white pb-4 rounded shadow text-dark"
        >
          <!-- START - Title -->
          <b-row class="py-1">
            <b-col
              cols="1"
            />
            <b-col>
              <strong>
                PO No
              </strong>
            </b-col>
            <b-col>
              <strong>
                Số nội bộ
              </strong>
            </b-col>
            <b-col>
              <strong>
                Ngày
              </strong>
            </b-col>
          </b-row>
          <!-- END - Title -->
          <!-- START - Po Confirm List -->
          <b-row
            v-for="(item, index) in poConfirm"
            :key="item.id"
            class="border-bottom border-white py-1"
            :class="{ 'text-brand-1': current == item.id }"
            @click="selectOrder(item.id, item.internalNumber, item.poNo, item.date)"
          >
            <b-col cols="1">
              {{ index + 1 }}
            </b-col>
            <b-col>
              {{ item.poNo }}
            </b-col>
            <b-col>
              {{ item.internalNumber }}
            </b-col>
            <b-col

              class="text-wrap"
            >
              {{ item.date }}
            </b-col>
          </b-row>
        </b-col>
        <!-- END -  Po Confirm List -->

        <!-- START - List -->
        <b-col class="ml-xl-1 mt-1 mt-xl-0 pt-1 bg-white shadow rounded">

          <!-- START - Table Product -->
          <!-- START - Title Product -->
          <b-row
            align-v="end"
            class="justify-content-between mx-0"
          >

            <strong class="d-flex h-25 align-items-center rounded-top px-1">
              Sản phẩm
            </strong>
            <b-button
              class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
              variant="someThing"
              @click="syncPo"
            >
              <b-icon
                icon="arrow-repeat"
                width="20"
                height="20"
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
            <template
              slot="column-filter"
              slot-scope="props"
            >
              <b-row
                v-if="props.column.field === 'quantity'"
                class="mx-0"
                align-h="end"
              >
                {{ $formatNumberToLocale(poProductInfo.totalQuantity) }}
              </b-row>
              <b-row
                v-if="props.column.field === 'poImportTotalPrice'"
                class="mx-0"
                align-h="end"
              >
                {{ $formatNumberToLocale(poProductInfo.totalPrice) }}
              </b-row>
            </template>
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
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'quantity'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ poPromotionProductsInfo.totalQuantity }}
                </b-row>
                <b-row
                  v-if="props.column.field === 'poImportTotalPrice'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ poPromotionProductsInfo.poImportTotalPrice }}
                </b-row>
              </template>
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
        </b-col>
        <!-- END - List -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{}">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        @click="confirmImportButton"
      >
        <b-icon
          icon="download"
        />
        Nhập hàng
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-center"
        variant="something"
        @click="showModal()"
      >
        <b-icon
          icon="slash-circle"
        />
        Không nhập
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        @click="exportExcel"
      >
        <b-icon
          icon="file-earmark-excel-fill"
        />
        Xuất excel
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
        @click="cancel()"
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
      :visible="denyModalVisible"
      @close="denyModalVisible = false"
    />
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import { formatISOtoVNI } from '@core/utils/filter'
import DenyModal from './components/inputPoDenyModal.vue'
import {
  WAREHOUSEINPUT,
  // GETTER
  POCONFIRM_GETTER,
  PODETAIL_PRODUCTS_RES_GETTER,
  PODETAIL_PRODUCTS_PROMO_RES_GETTER,
  PODETAIL_PRODUCTS_INFO_GETTER,
  PODETAIL_PRODUCTS_PROMO_INFO_GETTER,
  // ACTION
  GET_POCONFIRMS_ACTION,
  GET_PODETAIL_PRODUCTS_ACTION,
  GET_PODETAIL_PRODUCTS_PROMO_ACTION,
  GET_IMPORTEXCEL_ACTION,
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
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
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
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'poImportTotalPrice',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },
  computed: {
    // get poConfirm list
    poConfirm() {
      return this.POCONFIRM_GETTER().map(data => ({
        id: data.id,
        poNo: data.poNumber,
        internalNumber: data.internalNumber,
        date: formatISOtoVNI(data.orderDate),
      }))
    },
    theFirstPo() {
      if (this.poConfirm.length > 0) {
        const obj = {
          id: this.poConfirm[0].id,
          internalNumber: this.poConfirm[0].internalNumber,
          poNumber: this.poConfirm[0].poNumber,
          sysDate: this.poConfirm[0].date,
        }
        return obj
      }
      return null
    },
    // get products from selected Po
    poProducts() {
      return this.PODETAIL_PRODUCTS_RES_GETTER().map(data => ({
        soNo: data.soNo,
        productCode: data.productCode,
        productName: data.productName,
        price: this.$formatNumberToLocale(data.price),
        unit: data.unit,
        quantity: data.quantity,
        poImportTotalPrice: this.$formatNumberToLocale(data.totalPrice),
      }))
    },
    poProductInfo() {
      return this.PODETAIL_PRODUCTS_INFO_GETTER()
    },
    // get promotion produtcs from selected Po
    poPromotionProducts() {
      return this.PODETAIL_PRODUCTS_PROMO_RES_GETTER().map(data => ({
        soNo: data.soNo,
        productCode: data.productCode,
        productName: data.productName,
        price: this.$formatNumberToLocale(data.price) || 0,
        quantity: data.quantity,
        poImportTotalPrice: this.$formatNumberToLocale(data.totalPrice) || 0,
      }))
    },
    poPromotionProductsInfo() {
      return this.PODETAIL_PRODUCTS_PROMO_INFO_GETTER()
    },
  },
  watch: {
    poConfirm() {
      if (this.poConfirm.length > 0) {
        this.selectOrder(this.theFirstPo.id, this.theFirstPo.internalNumber, this.theFirstPo.poNumber, this.theFirstPo.sysDate)
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
    ...mapGetters(WAREHOUSEINPUT, [
      POCONFIRM_GETTER,
      PODETAIL_PRODUCTS_RES_GETTER,
      PODETAIL_PRODUCTS_PROMO_RES_GETTER,
      PODETAIL_PRODUCTS_INFO_GETTER,
      PODETAIL_PRODUCTS_PROMO_INFO_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_POCONFIRMS_ACTION,
      GET_PODETAIL_PRODUCTS_ACTION,
      GET_PODETAIL_PRODUCTS_PROMO_ACTION,
      GET_IMPORTEXCEL_ACTION,
    ]),
    // invidual selectOrder event for poconfrim list
    selectOrder(id, internalNumber, poNum, date) {
      console.log(this.poProductInfo)
      this.current = id
      this.poNumber = poNum
      this.Snb = internalNumber
      this.sysDate = date
      if (this.poConfirm.length > 0) {
        this.GET_PODETAIL_PRODUCTS_ACTION({ id: this.current, formId: 5, ctrlId: 7 }) // hard code
        this.GET_PODETAIL_PRODUCTS_PROMO_ACTION({ id: this.current, formId: 5, ctrlId: 7 }) // hard code
      }
    },
    // Sync PoConfirms list
    syncPo() {
      this.GET_POCONFIRMS_ACTION({ formId: this.formId, ctrlId: this.ctrlId }) // hard code
    },
    // Confirm import product from selected Po
    confirmImportButton() {
      if (this.poConfirm.length > 0) {
        this.$emit('inputChange', [this.sysDate, this.poProducts, this.poProductInfo, this.poPromotionProducts, this.poPromotionProductsInfo, this.Snb, this.poNumber, this.current])
        this.$emit('close')
      } else {
        toasts.error('Bạn cần chọn tối thiểu 1 bản ghi PO')
      }
    },
    exportExcel() {
      if (this.poConfirm.length <= 0) {
        toasts.error('Không có dữ liệu kết xuất')
      } else {
        this.GET_IMPORTEXCEL_ACTION({ id: this.current, formId: 5, ctrlId: 7 }) // hard code
      }
    },
    showModal() {
      if (this.poConfirm.length > 0) {
        this.denyId = this.current
        this.denyModalVisible = !this.denyModalVisible
      } else {
        toasts.error('Bạn cần chọn tối thiểu 1 bản ghi PO')
      }
    },
    cancel() {
      this.$emit('close')
    },
  },
}
</script>
