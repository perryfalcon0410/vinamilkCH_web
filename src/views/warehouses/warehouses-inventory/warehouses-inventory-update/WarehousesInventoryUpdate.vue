<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Section search -->
    <b-form>
      <!-- START - Section form input -->
      <v-card-actions
        title="Tìm kiếm"
        class="d-print-none"
      >
        <!-- START - Inventory code -->
        <b-col
          xl="2"
          sm
          class="h7"
        >
          <div>
            Mã kiểm kê
          </div>
          <b-form-input
            v-model="countingCode"
            maxlength="40"
            trim
            disabled
          />
        </b-col>
        <!-- END - Inventory code -->

        <!-- START - Date -->
        <b-col
          xl="2"
          sm
          class="h7"
        >
          <div>
            Ngày
          </div>
          <b-form-input
            v-model="countingDate"
            trim
            disabled
          />

        </b-col>
        <!-- END - Date -->

        <!-- START - Warehouse -->
        <b-col
          xl="2"
          sm
          class="h7"
        >
          <div>
            Kho
          </div>
          <tree-select
            v-model="warehouseType"
            :options="warehouseTypes"
            placeholder="Tất cả"
            disabled
          />
        </b-col>
        <!-- END - Warehouse -->

        <!-- START - Button import -->
        <div class="mx-50">
          <div
            class="text-white h7"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Lấy tồn kho
          </div>
          <b-button
            v-if="statusImportButton().show"
            :disabled="statusImportButton().disabled"
            class="btn-brand-1 h8 aligns-items-button-center"
            variant="someThing"
            @click="onClickImportButton()"
          >
            <b-icon-arrow-repeat
              scale="1.5"
              class="mr-1"
            />
            Import
          </b-button>
        </div>

        <!-- END - Button import -->
      </v-card-actions>
      <!-- END - Section form input -->

    </b-form>
    <!-- END - Section search -->

    <!-- START - List -->
    <div class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <div class="border-bottom p-1">
        <strong
          class="text-brand-1"
        >
          Danh sách sản phẩm kiểm kê
        </strong>
      </div>
      <!-- END - Title -->

      <!-- START - Body -->
      <b-col
        class="py-1"
      >
        <!-- START - Table -->
        <vue-good-table
          mode="remote"
          :columns="columns"
          :rows="products"
          style-class="vgt-table"
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
            <div
              v-if="props.column.field === 'productName'"
              class="mx-0 h7 text-brand-3"
            >
              <b-form-input
                id="form-input-search-keywords"
                v-model="searchKeywords"
                class="h8 text-brand-3"
                maxlength="200"
                placeholder="Nhập mã hoặc tên sản phẩm"
                @keydown.enter.prevent="onClickSearchButton()"
              />
            </div>
            <div
              v-show="products.length"
              v-if="props.column.field === 'instockAmount'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(instockAmount) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'totalPrice'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalPrice) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryPacket'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryPacket) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryOdd'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryOdd) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryTotal'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryTotal) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'unequal'"
              class="mx-0 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(unequal) }}
            </div>
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
            <div
              v-else-if="props.column.field === 'productName'"
              class="name-width"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'instockAmount' || props.column.field === 'price' || props.column.field === 'totalPrice' || props.column.field === 'inventoryTotal' || props.column.field === 'unequal'"
              style="padding-right: 4px"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
        <!-- END - Table -->

        <!-- START - Button group -->
        <b-row
          align-h="end"
          class="mt-1 mx-10"
        >
          <b-button
            v-if="statusSaveButton().show"
            :disabled="statusSaveButton().disabled"
            variant="someThing"
            class="ml-1 btn-brand-1 h8"
            @click="onClickSaveButton()"
          >
            <b-icon-download />
            Lưu
          </b-button>

          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || originalProducts.length === 0"
            variant="someThing"
            class="ml-1 btn-brand-1 h8"
            @click="onClickExportButton()"
          >
            <b-icon-file-earmark-excel-fill />
            Xuất Excel
          </b-button>

          <b-button
            class="ml-1 rounded h8 btn-brand-1"
            @click="onClickCloseButton()"
          >
            <b-icon-x />
            Đóng
          </b-button>
        </b-row>
        <!-- END - Button group -->

      </b-col>
      <!-- END - Body -->

    </div>
    <!-- END - List -->

    <!-- START - Warehouse Inventory Modal Close -->
    <b-modal
      v-model="isModalCloseShow"
      title="Thông báo"
    >
      Dữ liệu kiểm kê đang được chỉnh sửa, bạn có muốn đóng?
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center h8"
          @click="onClickConfirmCloseButton()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center h8"
          @click="isModalCloseShow = !isModalCloseShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Warehouse Inventory Modal Close -->

    <!-- START - Modal import -->
    <b-modal
      v-model="isImportModalShow"
      size="lg"
      title="Import dữ liệu"
      title-class="text-uppercase font-weight-bold text-brand-1"
      content-class="bg-light"
      footer-border-variant="light"
    >
      <!-- START - Body -->
      <div
        class="bg-white py-1"
      >
        <b-col class="px-0">
          <div class="d-inline-flex text-brand-1 bg-light mb-1 px-1 rounded-right">
            Tập tin
          </div>
          <b-row
            align-v="center"
            class="mx-1"
          >
            <b-col class="px-0">
              <b-form-file
                v-model="importFile"
                placeholder="Vui lòng chọn file import kiểm kê"
                accept=".xlsx, .xls"
                @input="hideImportMessage"
              />
            </b-col>
            <ins
              class="cursor-pointer text-brand-1 mx-1"
              @click="onClickDownloadSampleFile"
            >Tải mẫu</ins>
          </b-row>

        </b-col>
        <b-col class="px-0">
          <div class="d-inline-flex text-brand-1 bg-light my-1 px-1 rounded-right">
            Thông tin import
          </div>
          <b-col>
            - Chỉ cho phép nhập file định dạng (xlsx, xls)
          </b-col>

          <b-col class="my-1">
            - Số dòng tối đa để nhập file là 5000
          </b-col>

          <b-col
            v-show="showErrorMessage"
            class="text-danger ml-1"
          >
            Nhập thành công {{ rowsSuccess }} dòng, thất bại {{ rowsFail }} dòng <ins
              class="text-brand-1 cursor-pointer"
              @click="onClickDownloadFailedFile"
            >Xem</ins>
          </b-col>
          <b-col
            v-show="showSuccessMessage"
            class="text-success ml-1"
          >
            Nhập thành công
          </b-col>
        </b-col>
      </div>
      <!-- END - Body -->

      <!-- START - Footer -->
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center h8"
          size="sm"
          @click="onClickAgreeImportButton()"
        >
          <b-icon
            icon="download"
            width="20"
            height="20"
            class="mr-1"
          />
          Import
        </b-button>
        <b-button
          variant="secondary"
          class="d-flex align-items-center h8"
          size="sm"
          @click="isImportModalShow = !isImportModalShow"
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

    </b-modal>
    <!-- END - Modal import -->
  </b-container>
</template>

<script>
import toasts from '@core/utils/toasts/toasts'
import { mapActions, mapGetters } from 'vuex'
import { formatISOtoVNI, reverseVniDate } from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
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
    VCardActions,
  },

  data() {
    return {
      countingCode: '',
      countingDate: null,
      warehouseType: null,
      isImportModalShow: false,
      isModalCloseShow: false,
      warehousesInventoryData: null,
      columns: [
        {
          label: 'Ngành hàng',
          field: 'category',
          thClass: 'text-nowrap',
        },
        {
          label: 'Mã SP',
          field: 'productCode',
          thClass: 'text-nowrap',
        },
        {
          label: 'Tên SP',
          field: 'productName',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
          width: '250px',
        },
        {
          label: 'Số lượng tồn kho',
          field: 'instockAmount',
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'SL packet kiểm kê',
          field: 'inventoryPacket',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'SL lẻ kiểm kê',
          field: 'inventoryOdd',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Tổng SL kiểm kê',
          field: 'inventoryTotal',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Chênh lệch',
          field: 'unequal',
          type: 'number',
          thClass: 'text-nowrap',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'ĐVT packet',
          field: 'packetUnit',
          thClass: 'text-nowrap',
        },
        {
          label: 'Quy đổi',
          field: 'exchange',
          type: 'number',
          thClass: 'text-nowrap',
        },
        {
          label: 'ĐVT lẻ',
          field: 'oddUnit',
          type: 'number',
          thClass: 'text-nowrap',
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
      importFile: null,
      warehouseInventoryImportData: {},
      showErrorMessage: false,
      rowsSuccess: 0,
      rowsFail: 0,
      showSuccessMessage: false,
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
      return this.products.reduce((accum, item) => accum + Number(item.instockAmount), 0)
    },
    getTotalPrice() {
      return this.products.reduce((accum, item) => accum + Number(item.totalPrice), 0)
    },
    getInventoryPacket() {
      return this.products.reduce((accum, item) => accum + Number(item.inventoryPacket), 0)
    },
    getInventoryOdd() {
      return this.products.reduce((accum, item) => accum + Number(item.inventoryOdd), 0)
    },
    getInventoryTotal() {
      return this.products.reduce((accum, item) => accum + Number(item.inventoryTotal), 0)
    },
    getUnequal() {
      return this.products.reduce((accum, item) => accum + Number(item.unequal), 0)
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
    getWarehouseInventoryImportData() {
      return this.WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER
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
      this.warehousesInventoryData = this.getWarehouseInventoryData
    },
    getWarehouseInventoryDetail() {
      this.countingCode = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.countingCode
      this.countingDate = formatISOtoVNI(this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.countingDate)
      this.warehouseType = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.info.warehouseType

      this.products = this.WAREHOUSE_INVENTORY_DETAIL_GETTER.response.map(data => ({
        category: data.productCategory,
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        instockAmount: data.stockQuantity,
        price: data.price,
        totalPrice: data.totalAmount,
        inventoryPacket: data.packetQuantity,
        inventoryOdd: data.unitQuantity,
        inventoryTotal: data.packetQuantity * data.convfact + data.unitQuantity,
        unequal: data.packetQuantity * data.convfact + data.unitQuantity - data.stockQuantity,
        packetUnit: data.packetUnit,
        exchange: data.convfact,
        oddUnit: data.unit,
      }))
      this.originalProducts = this.products
    },
    getWarehouseInventoryImportData() {
      this.warehouseInventoryImportData = { ...this.getWarehouseInventoryImportData }
      this.showErrorMessage = this.warehouseInventoryImportData.response.importFails.length > 0
      this.showSuccessMessage = !this.showErrorMessage
      this.rowsSuccess = this.warehouseInventoryImportData.info.importSucceed
      this.rowsFail = this.warehouseInventoryImportData.info.importFailed
      this.warehouseInventoryImportData.response.importSuccess.forEach(productData => {
        const index = this.products.findIndex(product => product.productCode === productData.productCode)
        this.products[index].inventoryPacket = productData.packetQuantity
        this.products[index].inventoryOdd = productData.unitQuantity
        this.updateInventoryPacket(index, productData.packetQuantity)
        this.updateInventoryOdd(index, productData.unitQuantity)
      })
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

    statusSaveButton() {
      return this.$permission('WarehousesInventoryUpdate', 'WarehousesInventoryUpdateSave')
    },
    statusImportButton() {
      return this.$permission('WarehousesInventoryUpdate', 'WarehousesInventoryUpdateImport')
    },
    statusExcelButton() {
      return this.$permission('WarehousesInventoryUpdate', 'WarehousesInventoryUpdateExcel')
    },

    onClickCloseButton() {
      this.isModalCloseShow = !this.isModalCloseShow
    },
    updateInventoryTotal(index) {
      this.products[index].inventoryTotal = this.products[index].inventoryPacket * this.products[index].exchange + this.products[index].inventoryOdd
    },
    updateInventoryPacket(index, value) {
      this.products[index].inventoryPacket = value
      this.updateInventoryTotal(index)
      this.products[index].unequal = this.products[index].inventoryTotal - this.products[index].instockAmount
    },
    updateInventoryOdd(index, value) {
      this.products[index].inventoryOdd = value
      this.updateInventoryTotal(index)
      this.products[index].unequal = this.products[index].inventoryTotal - this.products[index].instockAmount
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
      this.$router.replace({ name: 'warehouses-inventory' })
    },
    onClickImportButton() {
      this.isImportModalShow = !this.isImportModalShow
      this.hideImportMessage()
    },
    onClickAgreeImportButton() {
      if (this.importFile === null) {
        toasts.error('Bạn chưa nhập file import')
        return
      }
      const data = new FormData()
      data.append('name', this.importFile.name)
      data.append('file', this.importFile)
      if (this.importFile.type.search(/sheet/g) !== -1 || this.importFile.type.search(/excel/g !== -1)) {
        this.IMPORT_FILLED_STOCKS_ACTION({
          data,
          onSuccess: () => {
            this.onClickSaveButton()
          },
        })
      } else {
        toasts.error('Dữ liệu nhập sai định dạng')
      }
    },
    onClickDownloadSampleFile() {
      this.GET_SAMPLE_IMPORT_FILE_ACTION({
        formId: 5,
        ctrlId: 7,
      })
    },
    onClickDownloadFailedFile() {
      const data = new FormData()
      data.append('name', this.importFile.name)
      data.append('file', this.importFile)
      this.GET_FAILED_IMPORT_FILE_ACTION({
        data,
        date: reverseVniDate(this.countingDate),
      })
    },
    hideImportMessage() {
      this.showErrorMessage = false
      this.showSuccessMessage = false
    },
  },
}
</script>
<style>
  thead tr:first-child {
    position: sticky;
    top: -2px;
    z-index: 10;
  }
</style>
