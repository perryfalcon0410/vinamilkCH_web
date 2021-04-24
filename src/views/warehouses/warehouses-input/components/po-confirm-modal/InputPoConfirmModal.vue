<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Danh sách PO Confirm"
    title-class="text-uppercase font-weight-bold text-primary"
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
            :class="{ 'text-primary': current == item.id }"
            @click="poSelected(item.id, item.internalNumber, item.poNo)"
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
              variant="primary"
              class="d-flex align-items-center"
              @click="syncPo"
            >
              <b-icon
                icon="arrow-repeat"
                width="20"
                height="20"
                class="mr-1"
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
                {{ poProductInfo.totalQuantity }}
              </b-row>
              <b-row
                v-if="props.column.field === 'totalPrice'"
                class="mx-0"
                align-h="end"
              >
                {{ poProductInfo.totalPrice }}
              </b-row>
            </template>
          </vue-good-table>
          <!-- END - Table Product -->

          <!-- START - Table Product promotion -->
          <!-- START - Title Product promotion -->
          <strong class="d-inline-flex rounded-top px-1">
            Hàng khuyến mãi
          </strong>
          <!-- END - Title Product promotion -->

          <vue-good-table
            :columns="columns"
            :rows="PoPromotionProducts"
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
                v-if="props.column.field === 'totalPrice'"
                class="mx-0"
                align-h="end"
              >
                {{ poPromotionProductsInfo.totalPrice }}
              </b-row>
            </template>
          </vue-good-table>
          <!-- END - Table Product promotion -->
        </b-col>
        <!-- END - List -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="confirmImportButton"
      >
        <b-icon
          icon="download"
          width="20"
          height="20"
          class="mr-1"
        />
        Nhập hàng
      </b-button>
      <b-button
        variant="danger"
        class="d-flex align-items-center text-uppercase"
        @click="ShowModal()"
      >
        <b-icon
          icon="slash-circle"
          width="20"
          height="20"
          class="mr-1"
        />
        Không nhập
      </b-button>
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="exportExcel"
      >
        <b-icon
          icon="file-earmark-excel-fill"
          width="20"
          height="20"
          class="mr-1"
        />
        Xuất excel
      </b-button>
      <b-button
        variant="secondary"
        class="d-flex align-items-center text-uppercase"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
        />
        Đóng
      </b-button>
    </template>
    <!-- END - Footer -->
    <deny-modal
      :id="denyId"
      :visible="DenyModalVisible"
    />
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
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
      denyId: null,
      DenyModalVisible: false,
      current: null,
      Snb: null,
      poNumber: null,
      columns: [
        {
          label: 'SO No',
          field: 'soNo',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
        },
      ],
    }
  },
  computed: {
    // get poConfirm list
    poConfirm() {
      return this.POCONFIRM_GETTER().map(data => ({
        id: data.id,
        poNo: data.poCode,
        shopId: data.shopId,
        poNumber: data.poNumber,
        internalNumber: data.internalNumber,
        soNo: data.saleOferNumber,
        date: new Date(data.orderDate).toLocaleDateString(),
        status: data.status,
      }))
    },
    // get products from selected Po
    poProducts() {
      return this.PODETAIL_PRODUCTS_RES_GETTER().map(data => ({
        soNo: data.soNo,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        unit: data.unit,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
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
        price: data.price,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
      }))
    },
    poPromotionProductsInfo() {
      return this.PODETAIL_PRODUCTS_PROMO_INFO_GETTER()
    },
    lst() {
      const product = this.PODETAIL_PRODUCTS_RES_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
      }))
      const promo = this.PODETAIL_PRODUCTS_PROMO_RES_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
      }))
      return product.concat(promo)
    },
  },
  mounted() {
    this.GET_POCONFIRMS_ACTION()
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
    // invidual select event for poconfrim list
    poSelected(id, internalNumber, poNum) {
      this.current = id
      this.poNumber = poNum
      this.Snb = internalNumber
      this.GET_PODETAIL_PRODUCTS_ACTION(this.current)
      this.GET_PODETAIL_PRODUCTS_PROMO_ACTION(this.current)
    },
    // Sync PoConfirms list
    syncPo() {
      this.GET_POCONFIRMS_ACTION()
    },
    // Confirm import product from selected Po
    confirmImportButton() {
      this.$emit('import', [this.poProducts, this.poProductInfo, this.poPromotionProducts, this.poPromotionProductsInfo, false, this.Snb, this.lst, this.current])
    },
    exportExcel() {
      this.GET_IMPORTEXCEL_ACTION(this.current)
    },
    ShowModal() {
      this.denyId = this.current
      this.DenyModalVisible = !this.DenyModalVisible
    },
  },
}
</script>
