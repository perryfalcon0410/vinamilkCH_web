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

          <div class="h7">
            Mã kiểm kê
          </div>
          <b-form-input
            id="form-input-stock-counting-code"
            v-model="stockCountingCode"
            class="h7"
            size="sm"
            maxlength="40"
            trim
            disabled
          />
        </b-col>
        <!-- END - Inventory code -->

        <!-- START - Date -->
        <b-col
          lg="2"
          md="4"
        >

          <div class="h7">
            Ngày
          </div>
          <b-form-input
            id="form-input-counting-date"
            v-model="countingDate"
            class="h7"
            size="sm"
            maxlength="20"
            trim
            disabled
          />

        </b-col>
        <!-- END - Date -->
        <!-- START - Warehouse -->
        <b-col
          lg="2"
          md="4"
        >
          <div class="h7">
            Kho
          </div>
          <tree-select
            v-model="warehouseType"
            :options="warehouseTypes"
            class="h7"
            placeholder="Tất cả"
            disabled
          />
        </b-col>
        <!-- END - Warehouse -->

        <!-- START - Button take inventory -->
        <b-form-group
          class="ml-lg-1"
          label="Lấy tồn kho"
          label-for="form-button-get-inventory"
          label-class="text-white"
        >
          <b-button
            id="form-button-get-inventory"
            class="shadow-brand-1 bg-brand-1 text-white h8 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
            variant="someThing"
            style="height: 30px;"
            @click="onClickGetInventoryStocksButton()"
          >
            Lấy tồn kho
          </b-button>
        </b-form-group>
        <!-- END - Button take inventory -->

        <!-- START - Button import -->
        <b-form-group
          class="ml-lg-1"
          label="Import"
          label-for="form-button-import"
          label-class="text-white"
        >
          <b-button
            id="form-button-import"
            class="shadow-brand-1 bg-brand-1 text-white h8 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
            variant="someThing"
            style="height: 30px;"
            @click="onClickImportButton()"
          >
            <b-icon-arrow-repeat
              scale="1.5"
              class="mr-1"
            />
            Import
          </b-button>
        </b-form-group>
        <!-- END - Button import -->

      </b-row>
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
            <div v-if="props.column.field === 'category'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'productId'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'productCode'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'productName'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'instockAmount' && isNaN(props.formattedRow[props.column.field]) === false">
              {{ $formatNumberToLocale(props.formattedRow[props.column.field]) }}
            </div>
            <div v-if="props.column.field === 'price'">
              {{ $formatNumberToLocale(props.formattedRow[props.column.field]) }}
            </div>
            <div v-if="props.column.field === 'totalPrice' && isNaN(props.formattedRow[props.column.field]) === false">
              {{ $formatNumberToLocale(props.formattedRow[props.column.field]) }}
            </div>
            <div v-if="props.column.field === 'inventoryTotal' && isNaN(props.formattedRow[props.column.field]) === false">
              {{ $formatNumberToLocale(props.formattedRow[props.column.field]) }}
            </div>
            <div v-if="props.column.field === 'unequal' && isNaN(props.formattedRow[props.column.field]) === false">
              {{ $formatNumberToLocale(props.formattedRow[props.column.field]) || 0 }}
            </div>
            <div v-if="props.column.field === 'packetUnit'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'exchange'">
              {{ props.formattedRow[props.column.field] }}
            </div>
            <div v-if="props.column.field === 'oddUnit'">
              {{ props.formattedRow[props.column.field] }}
            </div>
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
          </template>
          <!-- END - Row -->
        </vue-good-table>
        <!-- END - Table -->

        <!-- START - Button group -->
        <b-button-group class="float-right my-1">
          <b-button
            variant="someThing"
            class="ml-1 shadow-brand-1 rounded bg-brand-1 text-white font-weight-bolder h8"
            :disabled="isCreated"
            @click="onClickSaveButton()"
          >
            <b-icon-download />
            Lưu
          </b-button>

          <b-button
            variant="someThing"
            class="ml-1 shadow-brand-1 rounded bg-brand-1 text-white font-weight-bolder h8"
            :disabled="!isCreated"
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
import { formatDateToLocale, reverseVniDate } from '@/@core/utils/filter'
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
  },

  data() {
    return {
      inventoryCode: '',
      countingDate: formatDateToLocale(new Date()),
      warehouseType: null,
      isImportModalShow: false,
      isModalCloseShow: false,
      isCreateModalShow: false,
      isCreated: false,
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
          thClass: 'text-left',
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
          category: data.productCategory,
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
      this.warehousesInventoryData = { ...this.getWarehouseInventoryData }
      if (this.warehousesInventoryData.id != null) {
        this.isCreated = true
      }
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
    getWarehouseInventoryStocks() {
      this.products = [...this.getWarehouseInventoryStocks]
      this.originalProducts = this.products
    },
  },

  mounted() {
    this.GET_WAREHOUSE_TYPES_ACTION({ formId: 5, ctrlId: 7 })
    this.GET_WAREHOUSE_INVENTORY_STOCKS_ACTION({
      formId: 5,
      ctrlId: 7,
    })
    this.CHECK_EXISTED_WAREHOUSE_INVENTORY_ACTION({ formId: 5, ctrlId: 7 })
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
    onClickCloseButton() {
      if (!this.isCreated) {
        this.isModalCloseShow = !this.isModalCloseShow
      } else {
        this.$router.back()
      }
    },
    onClickGetInventoryStocksButton() {
      this.GET_WAREHOUSE_INVENTORY_STOCKS_ACTION({
        formId: 5,
        ctrlId: 7,
      })
    },
    updateInventoryTotal(index) {
      this.products[index].inventoryTotal = this.products[index].inventoryPacket * this.products[index].exchange + this.products[index].inventoryOdd
    },
    updateInventoryPacket(index, value) {
      this.products[index].inventoryPacket = value
      this.updateInventoryTotal(index)
      this.products[index].unequal = this.products[index].inventoryTotal - this.products[index].instockAmount
      this.isCreated = false
    },
    updateInventoryOdd(index, value) {
      this.products[index].inventoryOdd = value
      this.updateInventoryTotal(index)
      this.products[index].unequal = this.products[index].inventoryTotal - this.products[index].instockAmount
      this.isCreated = false
    },
    onClickExportButton() {
      this.EXPORT_FILLED_STOCKS_ACTION({
        id: this.warehousesInventoryData.id,
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
      if (this.isExistedWarehouseInventory) {
        this.isCreateModalShow = !this.isCreateModalShow
      } else {
        this.CREATE_WAREHOUSE_INVENTORY_ACTION({
          lstCreate,
          formId: 5,
          ctrlId: 7,
        })
      }
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
      this.CREATE_WAREHOUSE_INVENTORY_ACTION({
        lstCreate,
        override: true,
        formId: 5,
        ctrlId: 7,
      })
      this.isCreateModalShow = !this.isCreateModalShow
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
        toasts.error('Bạn chưa nhập file import')
        return
      }
      const data = new FormData()
      data.append('name', this.importFile.name)
      data.append('file', this.importFile)
      if (this.importFile.type.search(/sheet/g) !== -1 || this.importFile.type.search(/excel/g !== -1)) {
        this.IMPORT_FILLED_STOCKS_ACTION(data)
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
