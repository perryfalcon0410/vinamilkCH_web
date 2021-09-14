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
            v-model="stockCountingCode"
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
            v-model="date"
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
            Kho hàng
          </div>
          <tree-select
            v-model="warehouseType"
            :clearable="false"
            :searchable="false"
            :options="warehouseTypes"
            placeholder="Tất cả"
          />
        </b-col>
        <!-- END - Warehouse -->

        <b-button-group>
          <!-- START - Button take inventory -->
          <div class="mx-50">
            <div
              class="text-white h7"
              onmousedown="return false;"
              style="cursor: context-menu;"
            >
              Lấy tồn kho
            </div>
            <b-button
              v-if="statusTakeButton().show"
              id="form-button-get-inventory"
              :disabled="statusTakeButton().disabled"
              class="btn-brand-1 h8 aligns-items-button-center"
              variant="someThing"
              @click="onClickGetInventoryStocksButton()"
            >
              Lấy tồn kho
            </b-button>
          </div>
          <!-- END - Button take inventory -->

          <!-- START - Button import -->
          <div>
            <div
              class="text-white h7"
              onmousedown="return false;"
              style="cursor: context-menu;"
            >
              Import
            </div>
            <b-button
              v-if="statusImportButton().show"
              id="form-button-import"
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
        </b-button-group>

      </v-card-actions>
      <!-- END - Section form input -->

    </b-form>
    <!-- END - Section search -->

    <!-- START - Section product Import list -->
    <div class="bg-white rounded shadow my-1">
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
                autocomplete="off"
                placeholder="Nhập mã hoặc tên sản phẩm"
                @keydown.enter.prevent="onClickSearchButton()"
                @keyup.down="moveToFirstRow()"
              />
            </div>
            <div
              v-show="products.length"
              v-if="props.column.field === 'instockAmount'"
              class="mx-50 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(instockAmount) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'totalPrice'"
              class="mx-50 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(totalPrice) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryPacket'"
              class="mx-50 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryPacket) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryOdd'"
              class="mx-50 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryOdd) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'inventoryTotal'"
              class="mx-50 h7 text-brand-3 text-right"
            >
              {{ $formatNumberToLocale(inventoryTotal) }}
            </div>

            <div
              v-show="products.length"
              v-else-if="props.column.field === 'unequal'"
              class="mx-50 h7 text-brand-3 text-right"
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
            <div
              v-if="props.column.field === 'productName'"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'instockAmount' ||
                props.column.field === 'price' ||
                props.column.field === 'totalPrice' ||
                props.column.field === 'inventoryTotal' ||
                props.column.field === 'exchange'"
              class="pr-70"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div
              v-else-if="props.column.field === 'unequal'"
              :class="products[props.row.originalIndex].unequal > 0 ? 'pr-70 background-yellow' : products[props.row.originalIndex].unequal < 0 ? 'pr-70 background-green' : 'pr-70'"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-else-if="props.column.field === 'inventoryPacket'">
              <cleave
                :id="products[props.row.originalIndex].productCode + 'inventoryPacket'"
                class="form-control text-right text-bold h9"
                :raw="true"
                :options="options.number"
                maxlength="9"
                :value="products[props.row.originalIndex].inventoryPacket"
                @change.native="updateInventoryTotal(props.row.originalIndex, $event, true)"
                @keypress.native="$onlyNumberInput"
                @keyup.up.native="onClickUpButtonInventoryPacket(props.row.originalIndex)"
                @keyup.down.native="onClickDownButtonInventoryPacket(props.row.originalIndex)"
                @keyup.enter.native="onClickRightButtonInventoryPacket(props.row.originalIndex)"
                @keyup.left.native="onClickLeftButtonInventoryPacket(props.row.originalIndex)"
                @keyup.right.native="onClickRightButtonInventoryPacket(props.row.originalIndex)"
              />
            </div>

            <div v-else-if="props.column.field === 'inventoryOdd'">
              <cleave
                :id="products[props.row.originalIndex].productCode + 'inventoryOdd'"
                class="form-control text-right text-bold h9"
                :raw="true"
                :options="options.number"
                maxlength="9"
                :value="products[props.row.originalIndex].inventoryOdd"
                @change.native="updateInventoryTotal(props.row.originalIndex, $event, false)"
                @keypress.native="$onlyNumberInput"
                @keyup.up.native="onClickUpButtonInventoryOdd(props.row.originalIndex)"
                @keyup.down.native="onClickDownButtonInventoryOdd(props.row.originalIndex)"
                @keyup.enter.native="onClickRightButtonInventoryOdd(props.row.originalIndex)"
                @keyup.left.native="onClickLeftButtonInventoryOdd(props.row.originalIndex)"
                @keyup.right.native="onClickRightButtonInventoryOdd(props.row.originalIndex)"
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
            v-if="statusSaveButton().show"
            :disabled="statusSaveButton().disabled || isCreated"
            variant="someThing"
            class="ml-1 btn-brand-1 rounded h8"
            @click="onClickSaveButton()"
          >
            <b-icon-download />
            Lưu
          </b-button>

          <b-button
            v-if="statusExcelButton().show"
            :disabled="statusExcelButton().disabled || !isCreated"
            variant="someThing"
            class="ml-1 btn-brand-1 rounded h8 d-none"
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
        </b-button-group>
        <!-- END - Button group -->

      </b-col>
      <!-- END - Body -->

    </div>
    <!-- END - Section product Import list -->

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
                id="import-file"
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

    <!-- START - Modal create -->
    <b-modal
      v-model="isCreateModalShow"
      title="Thông báo"
    >
      Đã tồn tại dữ liệu kiểm kê trong ngày hôm nay, bạn có muốn lưu đè không?
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center h8"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center h8"
          @click="isCreateModalShow = !isCreateModalShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Modal create -->

    <!-- START - Warehouse Inventory Modal Close -->
    <b-modal
      v-model="isModalCloseShow"
      title="Thông báo"
    >
      Dữ liệu kiểm kê đang được tạo, bạn có muốn đóng?
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
  </b-container>
</template>

<script>
import toasts from '@core/utils/toasts/toasts'
import { mapActions, mapGetters } from 'vuex'
import { reverseVniDate, nowDate } from '@/@core/utils/filter'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import Cleave from 'vue-cleave-component'
import {
  WAREHOUSEINVENTORY,
  WAREHOUSE_TYPES_GETTER,
  WAREHOUSE_INVENTORY_STOCKS_GETTER,
  IS_EXISTED_WAREHOUSE_INVENTORY_GETTER,
  WAREHOUSE_INVENTORY_DATA_GETTER,
  WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
  GET_WAREHOUSE_TYPES_ACTION,
  GET_WAREHOUSE_INVENTORY_STOCKS_ACTION,
  EXPORT_FILLED_STOCKS_ACTION,
  CREATE_WAREHOUSE_INVENTORY_ACTION,
  IMPORT_FILLED_STOCKS_ACTION,
  CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION,
  GET_SAMPLE_IMPORT_FILE_ACTION,
  GET_FAILED_IMPORT_FILE_ACTION,
} from '../store-module/type'

export default {
  components: {
    VCardActions,
    Cleave,
  },

  data() {
    return {
      inventoryCode: '',
      date: nowDate(),
      warehouseType: null,
      isImportModalShow: false,
      isModalCloseShow: false,
      isCreateModalShow: false,
      isCreated: false,
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
          width: '220px',
        },
        {
          label: 'SL tồn kho',
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
          tdClass: 'text-bold',
          formatFn: this.$formatNumberToLocale,
        },
        {
          label: 'Chênh lệch',
          field: 'unequal',
          type: 'number',
          thClass: 'text-nowrap',
          tdClass: 'text-bold',
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
          thClass: 'text-nowrap',
        },
      ],
      products: [],
      originalProducts: [],
      instockAmount: 0,
      totalPrice: 0,
      inventoryPacket: 0,
      inventoryOdd: 0,
      inventoryTotal: 0,
      unequal: 0,
      searchKeywords: '',
      importFile: null,
      warehouseInventoryImportData: {},
      showErrorMessage: false,
      rowsSuccess: 0,
      rowsFail: 0,
      showSuccessMessage: false,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
    }
  },

  computed: {
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_TYPES_GETTER,
      WAREHOUSE_INVENTORY_STOCKS_GETTER,
      IS_EXISTED_WAREHOUSE_INVENTORY_GETTER,
      WAREHOUSE_INVENTORY_DATA_GETTER,
      WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
    ]),
    warehouseTypes() {
      return this.WAREHOUSE_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.wareHouseTypeName,
        isDefault: data.isDefault,
      }))
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
    getWarehouseInventoryImportData() {
      return this.WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER
    },
    getWarehouseInventoryStocks() {
      if (this.WAREHOUSE_INVENTORY_STOCKS_GETTER.response) {
        return this.WAREHOUSE_INVENTORY_STOCKS_GETTER.response.map(data => ({
          category: data.productCategoryCode,
          productId: data.productId,
          productCode: data.productCode,
          productName: data.productName,
          instockAmount: data.stockQuantity,
          price: data.price,
          totalPrice: data.totalAmount,
          inventoryPacket: null,
          inventoryOdd: null,
          inventoryTotal: 0,
          unequal: data.changeQuantity,
          packetUnit: data.packetUnit,
          exchange: data.convfact,
          oddUnit: data.unit,
        }))
      }
      return []
    },
  },

  watch: {
    warehouseType() {
      if (this.warehouseType) {
        this.onClickGetInventoryStocksButton()
      }
    },
    warehouseTypes() {
      this.warehouseType = this.warehouseTypes.find(types => types.isDefault === 1).id // number 1 is default warehouse type
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
      if (this.warehousesInventoryData != null) {
        this.isCreated = true
        this.$router.push({ path: `/warehouses/inventory/${this.warehousesInventoryData}/update` })
      }
    },
    getWarehouseInventoryImportData() {
      this.warehouseInventoryImportData = { ...this.getWarehouseInventoryImportData }
      this.showErrorMessage = this.warehouseInventoryImportData.response.importFails.length > 0
      this.showSuccessMessage = !this.showErrorMessage
      this.rowsSuccess = this.warehouseInventoryImportData.info.importSucceed
      this.rowsFail = this.warehouseInventoryImportData.info.importFailed
      this.warehouseInventoryImportData.response.importSuccess.forEach(productData => {
        const index = this.originalProducts.findIndex(product => product.productCode === productData.productCode)
        this.originalProducts[index].inventoryPacket = productData.packetQuantity.toString()
        this.originalProducts[index].inventoryOdd = productData.unitQuantity.toString()
        this.originalProducts[index].inventoryTotal = Number(this.originalProducts[index].inventoryPacket) * this.originalProducts[index].exchange + Number(this.originalProducts[index].inventoryOdd)
        this.originalProducts[index].unequal = this.originalProducts[index].inventoryTotal - this.originalProducts[index].instockAmount
      })
    },
    getWarehouseInventoryStocks() {
      this.products = [...this.getWarehouseInventoryStocks]
      this.originalProducts = this.products
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPES_ACTION({ formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapActions(WAREHOUSEINVENTORY, [
      GET_WAREHOUSE_TYPES_ACTION,
      GET_WAREHOUSE_INVENTORY_STOCKS_ACTION,
      EXPORT_FILLED_STOCKS_ACTION,
      CREATE_WAREHOUSE_INVENTORY_ACTION,
      IMPORT_FILLED_STOCKS_ACTION,
      CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION,
      GET_SAMPLE_IMPORT_FILE_ACTION,
      GET_FAILED_IMPORT_FILE_ACTION,
    ]),

    statusSaveButton() {
      return this.$permission('WarehousesInventoryCreate', 'WarehousesInventoryCreateSave')
    },
    statusImportButton() {
      return this.$permission('WarehousesInventoryCreate', 'WarehousesInventoryImport')
    },
    statusExcelButton() {
      return this.$permission('WarehousesInventoryCreate', 'WarehousesInventoryExcel')
    },
    statusTakeButton() {
      return this.$permission('WarehousesInventoryCreate', 'WarehousesInventoryTake')
    },

    onClickCloseButton() {
      if (!this.isCreated) {
        this.isModalCloseShow = !this.isModalCloseShow
      } else {
        this.$router.back()
      }
    },
    onClickGetInventoryStocksButton() {
      this.GET_WAREHOUSE_INVENTORY_STOCKS_ACTION({
        wareHouseTypeId: this.warehouseType,
        formId: 5,
        ctrlId: 7,
      })
    },
    updateInventoryTotal(index, event, isInventoryPacket) {
      if (isInventoryPacket) {
        this.products[index].inventoryPacket = Number(event.target.value.replaceAll(',', ''))
      } else {
        this.products[index].inventoryOdd = Number(event.target.value.replaceAll(',', ''))
      }
      this.products[index].inventoryTotal = Number(this.products[index].inventoryPacket) * this.products[index].exchange + Number(this.products[index].inventoryOdd)
      this.products[index].unequal = this.products[index].inventoryTotal - this.products[index].instockAmount
    },
    onClickExportButton() {
      this.EXPORT_FILLED_STOCKS_ACTION({
        id: this.warehousesInventoryData.id,
        date: reverseVniDate(this.date),
      })
    },
    onClickSearchButton() {
      this.products = this.originalProducts.filter(product => product.productCode.toLowerCase().includes(this.searchKeywords.trim().toLowerCase())
                                                           || product.productName.toLowerCase().includes(this.searchKeywords.trim().toLowerCase()))
    },
    onClickSaveButton() {
      const lstCreate = this.originalProducts.map(data => ({
        productId: data.productId,
        productCategory: data.category,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        stockQuantity: data.instockAmount,
        inventoryQuantity: data.inventoryTotal || 0,
        changeQuantity: data.unequal,
        totalAmount: data.totalPrice,
        convfact: data.exchange,
        packetUnit: data.packetUnit,
        unit: data.oddUnit,
        packetQuantity: data.inventoryPacket || 0,
        unitQuantity: data.inventoryOdd || 0,
      }))
      if (this.originalProducts.findIndex(item => item.inventoryPacket < 0) === -1 && this.originalProducts.findIndex(item => item.inventoryOdd < 0) === -1) {
        this.CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION({
          data: {
            wareHouseTypeId: this.warehouseType,
          },
          onSuccess: () => {
            if (this.isExistedWarehouseInventory) {
              this.isCreateModalShow = !this.isCreateModalShow
            } else {
              this.CREATE_WAREHOUSE_INVENTORY_ACTION({
                lstCreate,
                wareHouseTypeId: this.warehouseType,
                formId: 5,
                ctrlId: 7,
              })
            }
          },
        })
      } else toasts.error('Không được nhập số âm!')
    },
    onClickAgreeButton() {
      const lstCreate = this.originalProducts.map(data => ({
        productId: data.productId,
        productCategory: data.category,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        stockQuantity: data.instockAmount,
        inventoryQuantity: data.inventoryTotal || 0,
        changeQuantity: data.unequal,
        totalAmount: data.totalPrice,
        convfact: data.exchange,
        packetUnit: data.packetUnit,
        unit: data.oddUnit,
        packetQuantity: data.inventoryPacket || 0,
        unitQuantity: data.inventoryOdd || 0,
      }))
      if (this.originalProducts.findIndex(item => item.inventoryPacket < 0) === -1 && this.originalProducts.findIndex(item => item.inventoryOdd < 0) === -1) {
        this.CREATE_WAREHOUSE_INVENTORY_ACTION({
          lstCreate,
          wareHouseTypeId: this.warehouseType,
          override: true,
          formId: 5,
          ctrlId: 7,
        })
        this.isCreateModalShow = !this.isCreateModalShow
      } else toasts.error('Không được nhập số âm!')
    },
    onClickImportButton() {
      this.isImportModalShow = !this.isImportModalShow
      this.hideImportMessage()
    },
    onClickConfirmCloseButton() {
      this.$router.back()
    },
    onClickAgreeImportButton() {
      if (this.importFile === null) {
        toasts.error('Vui lòng mở tập tin để import')
        return
      }
      const data = new FormData()
      data.append('name', this.importFile.name)
      data.append('file', this.importFile)
      if (this.importFile.type.search(/sheet/g) !== -1 || this.importFile.type.search(/excel/g !== -1)) {
        this.IMPORT_FILLED_STOCKS_ACTION({
          data: {
            data,
            wareHouseTypeId: this.warehouseType,
          },
          onSuccess: () => {
            this.$nextTick(() => {
              if (!this.showErrorMessage) {
                this.onClickSaveButton()
              }
              document.getElementById('import-file').value = ''
            })
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
        data: {
          data,
          wareHouseTypeId: this.warehouseType,
        },
        date: reverseVniDate(this.date),
      })
    },
    hideImportMessage() {
      this.showErrorMessage = false
      this.showSuccessMessage = false
    },
    moveToFirstRow() {
      document.getElementById(`${this.products[0].productCode}inventoryPacket`).focus()
    },
    onClickUpButtonInventoryPacket(index) {
      if (index !== 0) {
        document.getElementById(`${this.products[index - 1].productCode}inventoryPacket`).focus()
      } else {
        document.getElementById('form-input-search-keywords').focus()
      }
    },
    onClickDownButtonInventoryPacket(index) {
      if (index !== this.products.length - 1) {
        document.getElementById(`${this.products[index + 1].productCode}inventoryPacket`).focus()
      }
    },
    onClickLeftButtonInventoryPacket(index) {
      if (index !== 0) {
        document.getElementById(`${this.products[index - 1].productCode}inventoryOdd`).focus()
      } else {
        document.getElementById('form-input-search-keywords').focus()
      }
    },
    onClickRightButtonInventoryPacket(index) {
      document.getElementById(`${this.products[index].productCode}inventoryOdd`).focus()
    },

    onClickUpButtonInventoryOdd(index) {
      if (index !== 0) {
        document.getElementById(`${this.products[index - 1].productCode}inventoryOdd`).focus()
      } else {
        document.getElementById('form-input-search-keywords').focus()
      }
    },
    onClickDownButtonInventoryOdd(index) {
      if (index !== this.products.length - 1) {
        document.getElementById(`${this.products[index + 1].productCode}inventoryOdd`).focus()
      }
    },
    onClickLeftButtonInventoryOdd(index) {
      document.getElementById(`${this.products[index].productCode}inventoryPacket`).focus()
    },
    onClickRightButtonInventoryOdd(index) {
      if (index !== this.products.length - 1) {
        document.getElementById(`${this.products[index + 1].productCode}inventoryPacket`).focus()
      }
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
  table.vgt-table td {
    vertical-align: middle;
  }
  thead tr:last-child th {
    vertical-align: middle;
  }
  .background-yellow {
    background-color: yellow !important;
    padding: 8px 0px 8px 0px;
  }
  .background-green {
    background-color: #83ba47 !important;
    padding: 8px 0px 8px 0px;
  }
  .text-bold {
    font-weight: bold !important;
  }
</style>
