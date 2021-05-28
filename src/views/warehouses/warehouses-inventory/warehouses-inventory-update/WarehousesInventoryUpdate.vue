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
              maxlength="20"
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

        <!-- START - Button take inventory -->
        <b-form-group
          class="ml-lg-1"
          label="Lấy tồn kho"
          label-for="form-button-get-inventory"
          label-class="text-white"
        >
          <b-button
            id="form-button-get-inventory"
            class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
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
            class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
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
          :columns="columns"
          :rows="products"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: elementSize
          }"
          compact-mode
          line-numbers
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
                placeholder="Nhập mã hoặc tên sản phẩm"
                @keyup.enter="onClickSearchButton()"
              />
            </b-row>
            <b-row
              v-if="props.column.field === 'instockAmount'"
              class="mx-0"
              align-h="end"
            >
              {{ instockAmount }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'totalPrice'"
              class="mx-0"
              align-h="end"
            >
              {{ totalPrice }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryPacket'"
              class="mx-0"
              align-h="end"
            >
              {{ inventoryPacket }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryOdd'"
              class="mx-0"
              align-h="end"
            >
              {{ inventoryOdd }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'inventoryTotal'"
              class="mx-0"
              align-h="end"
            >
              {{ inventoryTotal }}
            </b-row>

            <b-row
              v-else-if="props.column.field === 'unequal'"
              class="mx-0"
              align-h="end"
            >
              {{ unequal }}
            </b-row>
          </template>
          <!-- START - Column filter -->
          <!-- START - Pagination -->
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              class="v-pagination px-1 mx-0"
              align-h="between"
              align-v="center"
            >
              <div
                class="d-flex align-items-center"
              >
                <span
                  class="text-nowrap"
                >
                  Hiển thị 1 đến
                </span>
                <b-form-select
                  v-model="elementSize"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong {{ productsQuantity }} mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="productsQuantity"
                :per-page="elementSize"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1"
                @input="(value)=>props.pageChanged({currentPage: value})"
              >
                <template slot="prev-text">
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template slot="next-text">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </b-row>
          </template>
          <!-- END - Pagination -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'inventoryPacket'">
              <b-input
                v-model="props.row.inventoryPacket"
                maxlength="10"
                :value="props.row.inventoryPacket"
                @change="updateInventoryPacket(props.row.originalIndex, props.row.inventoryPacket)"
                @keypress="$onlyNumberInput"
              />
            </div>

            <div v-else-if="props.column.field === 'inventoryOdd'">
              <b-input
                v-model="props.row.inventoryOdd"
                maxlength="10"
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
                @input="hideErrorMessage"
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
        </b-col>
      </div>
      <!-- END - Body -->

      <!-- START - Footer -->
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
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
          class="d-flex align-items-center"
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
          @click="isImportModalShow = !isImportModalShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Warehouse Inventory Modal Close -->
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import { mapActions, mapGetters } from 'vuex'
import { formatISOtoVNI, reverseVniDate } from '@/@core/utils/filter'
import {
  WAREHOUSEINVENTORY,
  WAREHOUSE_TYPES_GETTER,
  WAREHOUSE_INVENTORY_STOCKS_GETTER,
  WAREHOUSE_INVENTORY_DATA_GETTER,
  WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
  WAREHOUSE_INVENTORY_DETAIL_GETTER,
  GET_WAREHOUSE_TYPES_ACTION,
  GET_WAREHOUSE_INVENTORY_STOCKS_ACTION,
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
      elementSize: commonData.perPageSizes[0],
      pageNumber: 1,
      paginationOptions: commonData.perPageSizes,
      paginationData: { isPaging: true },
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
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SL packet kiểm kê',
          field: 'inventoryPacket',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'SL lẻ kiểm kê',
          field: 'inventoryOdd',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tổng SL kiểm kê',
          field: 'inventoryTotal',
          type: 'number',
          width: '120px',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Chênh lệch',
          field: 'unequal',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
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
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'ĐVT lẻ',
          field: 'oddUnit',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
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
      importFile: '',
      warehouseInventoryImportData: {},
      showErrorMessage: false,
      rowsSuccess: 0,
      rowsFail: 0,
      id: this.$route.params.id,
    }
  },

  computed: {
    warehouseTypes() {
      return this.WAREHOUSE_TYPES_GETTER().map(data => ({
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
      return this.IS_EXISTED_WAREHOUSE_INVENTORY_GETTER()
    },
    getWarehouseInventoryData() {
      return this.WAREHOUSE_INVENTORY_DATA_GETTER()
    },
    getWarehouseInventoryImportData() {
      return this.WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER()
    },
    getWarehouseInventoryDetail() {
      return this.WAREHOUSE_INVENTORY_DETAIL_GETTER()
    },
  },

  watch: {
    pageNumber() {
      this.paginationData.page = this.pageNumber - 1
      this.onPaginationChange()
    },
    elementSize() {
      this.paginationData.size = this.elementSize
      this.onPaginationChange()
    },
    paginationData() {
      this.pageNumber = 1
      this.onPaginationChange()
    },
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
    getWarehouseInventoryImportData() {
      this.warehouseInventoryImportData = { ...this.getWarehouseInventoryImportData }
      this.showErrorMessage = this.warehouseInventoryImportData.response.importFails.length > 0
      this.rowsSuccess = this.warehouseInventoryImportData.info
      this.rowsFail = this.warehouseInventoryImportData.response.importFails.length
      this.warehouseInventoryImportData.response.importSuccess.forEach(productData => {
        this.products[this.products.findIndex(product => product.productCode === productData.productCode)].inventoryPacket = productData.packetQuantity
        this.products[this.products.findIndex(product => product.productCode === productData.productCode)].inventoryOdd = productData.packetQuantity
      })
    },
    getWarehouseInventoryDetail() {
      this.countingCode = this.WAREHOUSE_INVENTORY_DETAIL_GETTER().info.countingCode
      this.countingDate = formatISOtoVNI(this.WAREHOUSE_INVENTORY_DETAIL_GETTER().info.countingDate)
      this.warehouseType = this.WAREHOUSE_INVENTORY_DETAIL_GETTER().info.warehouseType

      this.products = this.WAREHOUSE_INVENTORY_DETAIL_GETTER().response.content.map(data => ({
        category: data.productCategory,
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        instockAmount: data.stockQuantity,
        price: data.price,
        totalPrice: data.totalAmount,
        inventoryPacket: null,
        inventoryOdd: null,
        inventoryTotal: null,
        unequal: data.changeQuantity,
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
    this.GET_WAREHOUSE_INVENTORY_STOCKS_ACTION({ isPaging: true, formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapActions(WAREHOUSEINVENTORY, [
      GET_WAREHOUSE_TYPES_ACTION,
      GET_WAREHOUSE_INVENTORY_STOCKS_ACTION,
      EXPORT_FILLED_STOCKS_ACTION,
      CREATE_WAREHOUSE_INVENTORY_ACTION,
      IMPORT_FILLED_STOCKS_ACTION,
      GET_SAMPLE_IMPORT_FILE_ACTION,
      GET_FAILED_IMPORT_FILE_ACTION,
      GET_WAREHOUSE_INVENTORY_DETAIL_ACTION,
      UPDATE_WAREHOUSE_INVENTORY_ACTION,
    ]),
    ...mapGetters(WAREHOUSEINVENTORY, [
      WAREHOUSE_TYPES_GETTER,
      WAREHOUSE_INVENTORY_STOCKS_GETTER,
      WAREHOUSE_INVENTORY_DATA_GETTER,
      WAREHOUSE_INVENTORY_IMPORT_DATA_GETTER,
      WAREHOUSE_INVENTORY_DETAIL_GETTER,
    ]),
    onPaginationChange() {
      this.GET_WAREHOUSE_INVENTORY_STOCKS_ACTION(this.paginationData)
    },
    onClickCloseButton() {
      this.isModalCloseShow = !this.isModalCloseShow
    },
    onClickGetInventoryStocksButton() {
      this.products = this.WAREHOUSE_INVENTORY_STOCKS_GETTER().map(data => ({
        category: data.productCategory,
        productId: data.productId,
        productCode: data.productCode,
        productName: data.productName,
        instockAmount: data.stockQuantity,
        price: data.price,
        totalPrice: data.totalAmount,
        inventoryPacket: null,
        inventoryOdd: null,
        inventoryTotal: null,
        unequal: data.changeQuantity,
        packetUnit: data.packetUnit,
        exchange: data.convfact,
        oddUnit: data.unit,
      }))
      this.originalProducts = this.products
    },
    updateInventoryTotal(index) {
      this.products[index].inventoryTotal = this.products[index].inventoryPacket * this.products[index].exchange + this.products[index].inventoryOdd
    },
    updateInventoryPacket(index, value) {
      this.products[index].inventoryPacket = value
      this.updateInventoryTotal(index)
    },
    updateInventoryOdd(index, value) {
      this.products[index].inventoryOdd = value
      this.updateInventoryTotal(index)
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
    onClickImportButton() {
      this.isImportModalShow = !this.isImportModalShow
      this.hideErrorMessage()
    },
    onClickConfirmCloseButton() {
      this.$router.back()
    },
    onClickAgreeImportButton() {
      const data = new FormData()
      data.append('name', this.importFile.name)
      data.append('file', this.importFile)
      this.IMPORT_FILLED_STOCKS_ACTION(data)
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
    hideErrorMessage() {
      this.showErrorMessage = false
    },
  },
}
</script>
