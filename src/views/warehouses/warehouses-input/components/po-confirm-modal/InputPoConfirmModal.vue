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
            @click="poSelected(item.id, item.internalNumber)"
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
              slot="table-row"
              slot-scope="props"
            >
              <b-row
                v-if="props.column.field === 'Quantity'"
                class="mx-0"
                align-h="end"
              >
                6800
              </b-row>
              <b-row
                v-if="props.column.field === 'TotalPrice'"
                class="mx-0"
                align-h="end"
              >
                6800
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
          />
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
  PODETAIL_0_GETTER,
  PODETAIL_1_GETTER,
  // ACTION
  GET_POCONFIRMS_ACTION,
  GET_PODETAIL_0_ACTION,
  GET_PODETAIL_1_ACTION,
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
      columns: [
        {
          label: 'SO No',
          field: 'SoNo',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'Price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          sortable: false,
          type: 'number',
          filterOptions: {
            customFilter: true,
          },
        },
      ],
      rowsProduct: [
        {
          SoNo: '',
          ProductId: '',
          Name: '',
          Price: '',
          Quantity: '360',
          TotalPrice: '1,860,720',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
      ],
      rowsProductPromotion: [
        {
          SoNo: '',
          ProductId: '',
          Name: '',
          Price: '',
          Quantity: '360',
          TotalPrice: '1,860,720',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
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
  },
  watch: {
    // get products from selected Po
    poProducts() {
      const po0Getter = this.PODETAIL_0_GETTER().response
      return po0Getter.response.map(data => ({
        SoNo: data.soNo,
        productId: data.productCode,
        Name: data.productName,
        Price: data.price,
        Quantity: data.quantity,
        TotalPrice: data.totalPrice,
      }))
    },
    poProductInfo() {
      const infos = this.PODETAIL_0_GETTER().info
      return infos.response.map(data => ({
        totalQuantity: data.totalQuantity,
        totalPrice: data.totalPrice,
      }))
    },
    // get promotion produtcs from selected Po
    poPromotionProducts() {
      const poDetail1getter = this.PODETAIL_0_GETTER().response
      return poDetail1getter.response.map(data => ({
        SoNo: data.soNo,
        productId: data.productCode,
        Name: data.productName,
        Price: data.price,
        Quantity: data.quantity,
        TotalPrice: data.totalPrice,
      }))
    },
    poPromotionProductsInfo() {
      const infos = this.PODETAIL_1_GETTER().info
      return infos.response.map(data => ({
        totalQuantity: data.totalQuantity,
        totalPrice: data.totalPrice,
      }))
    },
  },
  mounted() {
    this.GET_POCONFIRMS_ACTION()
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      POCONFIRM_GETTER,
      PODETAIL_0_GETTER,
      PODETAIL_1_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_POCONFIRMS_ACTION,
      GET_PODETAIL_0_ACTION,
      GET_PODETAIL_1_ACTION,
      GET_IMPORTEXCEL_ACTION,
    ]),
    // invidual select event for poconfrim list
    poSelected(id, internalNumber) {
      this.current = id
      this.Snb = internalNumber
      this.GET_PODETAIL_0_ACTION(this.current)
      this.GET_PODETAIL_1_ACTION(this.current)
    },
    // Sync PoConfirms list
    syncPo() {
      this.GET_POCONFIRMS_ACTION()
    },
    // Confirm import product from selected Po
    confirmImportButton() {
      this.$emit('import', [this.poProducts, this.poPromotionProducts, this.current, false, this.Snb])
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
