<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Section earch -->
    <b-form class="bg-white shadow rounded">
      <!-- START - Section form input -->
      <b-row
        class="v-search-form border-top mx-0 py-1"
        align-v="center"
      >
        <!-- START - Inventory code -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Mã kiểm kê"
            label-class="h8"
            label-for="form-input-counting-code"
          >
            <b-form-input
              id="form-input-counting-code"
              v-model="countingCode"
              class="h9"
              size="sm"
              maxlength="40"
              trim
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- END - Inventory code -->

        <!-- START - Date -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label="Ngày"
            label-class="h8"
            label-for="form-input-counting-date"
          >
            <b-form-input
              id="form-input-counting-date"
              v-model="countingDate"
              class="h9"
              size="sm"
              maxlength="20"
              trim
              disabled
            />
          </b-form-group>

        </b-col>
        <!-- END - Date -->
        <!-- START - Warehouse -->
        <b-col
          lg="2"
          md="4"
        >
          <b-form-group
            label-class="h8"
            label="Kho"
            label-for="form-input-warehouse-type"
          >
            <tree-select
              v-model="warehouseType"
              :options="warehouseTypes"
              placeholder="Tất cả"
              disabled
            />
          </b-form-group>
        </b-col>
        <!-- END - Warehouse -->
      </b-row>
      <!-- END - Section form input -->

    </b-form>
    <!-- END - Section search -->

    <!-- START - Section product Import list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form class="border-bottom p-1">
        <strong
          class="text-brand-1"
        >
          Danh sách sản phẩm kiểm kê
        </strong>
      </b-form>
      <!-- END - Title -->

      <!-- START - Body -->
      <b-col
        id="listProduct"
        class="py-1"
      >
        <!-- START - Table -->
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="products"
          style-class="vgt-table bordered"
          compact-mode
          line-numbers
          :sort-options="{
            enabled: false,
          }"
          max-height="500px"
        >
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'productName'"
              class="mx-0"
              align-h="end"
            >
              <b-form-input
                id="form-input-search-keywords"
                v-model="searchKeywords"
                class="h8 text-brand-3"
                maxlength="200"
                placeholder="Nhập mã hoặc tên sản phẩm"
                @keydown.enter.prevent="onClickSearchButton()"
              />
            </b-row>
            <b-row
              v-if="props.column.field === 'instockAmount'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(instockAmount) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'totalPrice'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(totalPrice) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryPacket'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(inventoryPacket) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryOdd'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(inventoryOdd) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryTotal'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(inventoryTotal) }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'unequal'"
              class="mx-0"
              align-h="end"
            >
              {{ $formatNumberToLocale(unequal) }}
            </b-row>
          </template>
          <!-- START - Column filter -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'inventoryPacket'">
              <b-input
                v-model="props.row.inventoryPacket"
                maxlength="7"
                :number="true"
                :value="props.row.inventoryPacket"
                @change="updateInventoryPacket(props.row.originalIndex, props.row.inventoryPacket)"
                @keypress="$onlyNumberInput"
              />
            </div>

            <div v-else-if="props.column.field === 'inventoryOdd'">
              <b-input
                v-model="props.row.inventoryOdd"
                maxlength="7"
                :number="true"
                :value="props.row.inventoryOdd"
                @change="updateInventoryOdd(props.row.originalIndex, props.row.inventoryOdd)"
                @keypress="$onlyNumberInput"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
        <!-- END - Table -->

        <!-- START - Button group -->
        <b-button-group class="float-right my-1">
          <b-button
            variant="someThing"
            class="ml-1 shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            @click="onClickSaveButton()"
          >
            <b-icon-download />
            Lưu
          </b-button>

          <b-button
            variant="someThing"
            class="ml-1 shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            :disabled="originalProducts.length === 0"
            @click="onClickExportButton()"
          >
            <b-icon-file-earmark-excel-fill />
            Xuất Excel
          </b-button>

          <b-button
            class="ml-1"
            @click="onClickCloseButton()"
          >
            <b-icon-x />
            Đóng
          </b-button>
        </b-button-group>
        <!-- END - Button group -->

      </b-col>
      <!-- END - Body -->

    </b-form>
    <!-- END - Section product Import list -->

    <!-- START - Warehouse Inventory Modal Close -->
    <b-modal
      v-model="isModalCloseShow"
      title="Thông báo"
    >
      Dữ liệu kiểm kê đang được chỉnh sửa, bạn có muốn đóng?
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
          @click="onClickConfirmCloseButton()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center"
          @click="isModalCloseShow = !isModalCloseShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Warehouse Inventory Modal Close -->
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { formatISOtoVNI, reverseVniDate } from '@/@core/utils/filter'
import {
  WAREHOUSEINVENTORY,
  WAREHOUSE_TYPES_GETTER,
  WAREHOUSE_INVENTORY_DATA_GETTER,
  WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
  WAREHOUSE_INVENTORY_DETAIL_GETTER,
  GET_WAREHOUSE_TYPES_ACTION,
  EXPORT_FILLED_STOCKS_ACTION,
  CREATE_WAREHOUSE_INVENTORY_ACTION,
  IMPORT_FILLED_STOCKS_ACTION,
  GET_SAMPLE_IMPORT_FILE_ACTION,
  GET_FAILED_IMPORT_FILE_ACTION,
  GET_WAREHOUSE_INVENTORY_DETAIL_ACTION,
  UPDATE_WAREHOUSE_INVENTORY_ACTION,
} from '../store-module/type'

export default {
  components: {
  },

  data() {
    return {
      countingCode: '',
      countingDate: null,
      warehouseType: null,
      isImportModalShow: false,
      isModalCloseShow: false,
      warehousesInventoryData: {},
      columns: [
        {
          label: 'Ngành hàng',
          field: 'category',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã SP',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên SP',
          field: 'productName',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          width: '280px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng tồn kho',
          field: 'instockAmount',
          type: 'number',
          width: '120px',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'SL packet kiểm kê',
          field: 'inventoryPacket',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'SL lẻ kiểm kê',
          field: 'inventoryOdd',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Tổng SL kiểm kê',
          field: 'inventoryTotal',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'Chênh lệch',
          field: 'unequal',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'ĐVT packet',
          field: 'packetUnit',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Quy đổi',
          field: 'exchange',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-right',
        },
        {
          label: 'ĐVT lẻ',
          field: 'oddUnit',
          type: 'number',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-center',
        },
      ],
      products: [],
      originalProducts: [],
      productsQuantity: 0,
      instockAmount: 0,
      totalPrice: 0,
      inventoryPacket: 0,
      inventoryOdd: 0,
      inventoryTotal: 0,
      unequal: 0,
      searchKeywords: '',
      id: this.$route.params.id,
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_TYPES_GETTER,
      WAREHOUSE_INVENTORY_DATA_GETTER,
      WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
      WAREHOUSE_INVENTORY_DETAIL_GETTER,
    ]),
    warehouseTypes() {
      return this.WAREHOUSE_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.wareHouseTypeName,
        isDefault: data.isDefault,
      }))
    },
    getProductsQuantity() {
      return this.products.length
    },
    getInstockAmount() {
      return this.products.reduce((accum, item) => accum + Number(item.originalInstockAmount), 0)
    },
    getTotalPrice() {
      return this.products.reduce((accum, item) => accum + Number(item.originalTotalPrice), 0)
    },
    getInventoryPacket() {
      return this.products.reduce((accum, item) => accum + Number(item.inventoryPacket), 0)
    },
    getInventoryOdd() {
      return this.products.reduce((accum, item) => accum + Number(item.inventoryOdd), 0)
    },
    getInventoryTotal() {
      return this.products.reduce((accum, item) => accum + Number(item.originalInventoryTotal), 0)
    },
    getUnequal() {
      return this.products.reduce((accum, item) => accum + Number(item.originalUnequal), 0)
    },
    isExistedWarehouseInventory() {
      return this.IS_EXISTED_WAREHOUSE_INVENTORY_GETTER
    },
    getWarehouseInventoryData() {
      return this.WAREHOUSE_INVENTORY_DATA_GETTER
    },
    getWarehouseInventoryDetail() {
      return this.WAREHOUSE_INVENTORY_DETAIL_GETTER
    },
  },

  watch: {
    getProductsQuantity() {
      this.productsQuantity = this.getProductsQuantity
    },
    getInstockAmount() {
      this.instockAmount = this.getInstockAmount
    },
    getTotalPrice() {
      this.totalPrice = this.getTotalPrice
    },
    getInventoryPacket() {
      this.inventoryPacket = this.getInventoryPacket
    },
    getInventoryOdd() {
      this.inventoryOdd = this.getInventoryOdd
    },
    getInventoryTotal() {
      this.inventoryTotal = this.getInventoryTotal
    },
    getUnequal() {
      this.unequal = this.getUnequal
    },
    getWarehouseInventoryData() {
      this.warehousesInventoryData = { ...this.getWarehouseInventoryData }
    },
    getWarehouseInventoryDetail() {
      this.countingCode = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.countingCode
      this.countingDate = formatISOtoVNI(this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.countingDate)
      this.warehouseType = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.warehouseType

      this.products = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.response.content.map(data => ({
        category: data.productCategory,
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        originalInstockAmount: data.stockQuantity,
        instockAmount: this.$formatNumberToLocale(data.stockQuantity),
        price: this.$formatNumberToLocale(data.price),
        originalTotalPrice: data.totalAmount,
        totalPrice: this.$formatNumberToLocale(data.totalAmount),
        inventoryPacket: data.packetQuantity,
        inventoryOdd: data.unitQuantity,
        inventoryTotal: this.$formatNumberToLocale(data.packetQuantity * data.convfact + data.unitQuantity),
        originalInventoryTotal: data.packetQuantity * data.convfact + data.unitQuantity,
        unequal: this.$formatNumberToLocale(data.packetQuantity * data.convfact + data.unitQuantity - data.stockQuantity),
        originalUnequal: data.packetQuantity * data.convfact + data.unitQuantity - data.stockQuantity,
        packetUnit: data.packetUnit,
        exchange: data.convfact,
        oddUnit: data.unit,
      }))
      this.originalProducts = this.products
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPES_ACTION({ formId: 5, ctrlId: 7 })
    this.GET_WAREHOUSE_INVENTORY_DETAIL_ACTION({ id: this.id, formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapActions(WAREHOUSEINVENTORY, [
      GET_WAREHOUSE_TYPES_ACTION,
      EXPORT_FILLED_STOCKS_ACTION,
      CREATE_WAREHOUSE_INVENTORY_ACTION,
      IMPORT_FILLED_STOCKS_ACTION,
      GET_SAMPLE_IMPORT_FILE_ACTION,
      GET_FAILED_IMPORT_FILE_ACTION,
      GET_WAREHOUSE_INVENTORY_DETAIL_ACTION,
      UPDATE_WAREHOUSE_INVENTORY_ACTION,
    ]),
    onClickCloseButton() {
      this.isModalCloseShow = !this.isModalCloseShow
    },
    updateInventoryTotal(index) {
      this.products[index].originalInventoryTotal = this.products[index].inventoryPacket * this.products[index].exchange + this.products[index].inventoryOdd
      this.products[index].inventoryTotal = this.$formatNumberToLocale(this.products[index].originalInventoryTotal)
    },
    updateInventoryPacket(index, value) {
      this.products[index].inventoryPacket = value
      this.updateInventoryTotal(index)
      this.products[index].originalUnequal = this.products[index].originalInventoryTotal - this.products[index].originalInstockAmount
      this.products[index].unequal = this.$formatNumberToLocale(this.products[index].originalUnequal)
    },
    updateInventoryOdd(index, value) {
      this.products[index].inventoryOdd = value
      this.updateInventoryTotal(index)
      this.products[index].originalUnequal = this.products[index].originalInventoryTotal - this.products[index].originalInstockAmount
      this.products[index].unequal = this.$formatNumberToLocale(this.products[index].originalUnequal)
    },
    onClickExportButton() {
      this.EXPORT_FILLED_STOCKS_ACTION({
        id: this.id,
        date: reverseVniDate(this.countingDate),
        formId: 5,
        ctrlId: 7,
      })
    },
    onClickSearchButton() {
      this.products = this.originalProducts.filter(product => product.productCode.toLowerCase().includes(this.searchKeywords.trim().toLowerCase())
                                                           || product.productName.toLowerCase().includes(this.searchKeywords.trim().toLowerCase()))
    },
    onClickSaveButton() {
      const lstUpdate = this.originalProducts.map(data => ({
        productId: data.productId,
        convfact: data.exchange,
        packetQuantity: data.inventoryPacket || 0,
        unitQuantity: data.inventoryOdd || 0,
      }))

      this.UPDATE_WAREHOUSE_INVENTORY_ACTION({
        lstUpdate,
        id: this.id,
        formId: 5,
        ctrlId: 7,
      })
    },
    onClickConfirmCloseButton() {
      this.$router.back()
    },
  },
}
</script>
