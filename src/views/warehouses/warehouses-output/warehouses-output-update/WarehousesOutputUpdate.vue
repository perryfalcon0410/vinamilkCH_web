<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Form and list -->
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
              Ngày xuất:
            </b-col>
            <b-col class="font-weight-bold">
              {{ warehousesOutput.borrowDate }}
            </b-col>
          </b-row>
          <!-- END - Date -->

          <!-- START - ID and Type -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Mã xuất hàng"
                label-for="code"
              >
                <b-form-input
                  id="code"
                  v-model="warehousesOutput.code"
                  maxlength="40"
                  trim
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Loại xuất"
                label-for="type"
              >
                <tree-select
                  v-model="warehousesTypeSelected"
                  :options="warehousesOptions"
                  :searchable="false"
                  no-options-text="Không có dữ liệu"
                  disabled
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - ID and Type -->

          <!-- START -  Stock  -->
          <b-form-group
            label="Kho hàng"
            label-for="stock"
          >
            <b-form-input
              id="stock"
              v-model="warehousesOutput.wareHouseTypeName"
              maxlength="40"
              trim
              disabled
            />
          </b-form-group>
          <!-- END -  Stock  -->

          <!-- START - Bill Number and Date -->
          <b-form-row>
            <b-col>
              <div>
                Số hóa đơn
              </div>
              <b-form-input
                v-model="warehousesOutput.redInvoiceNo"
                trim
                :state="touched ? passed : null"
                disabled
              />
            </b-col>

            <b-col>
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Ngày hoá đơn
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <vue-flat-pickr
                  id="form-input-date-from"
                  v-model="warehousesOutput.transDate"
                  :config="configDate"
                  class="form-control h8 text-brand-3"
                  disabled
                />
              </b-input-group>
            </b-col>
          </b-form-row>
          <!-- END -   Bill Number and Date -->

          <!-- START -   Internal number and PO no -->
          <b-form-row>
            <b-col>
              <div class="mt-1">
                Số nội bộ
              </div>
              <b-form-input
                v-model="warehousesOutput.internalNumber"
                trim
                :state="touched ? passed : null"
                disabled
              />
            </b-col>

            <b-col>
              <div class="mt-1">
                PO No
              </div>
              <b-input-group
                id="PoNo"
                class="input-group-merge"
              >
                <b-form-input
                  v-model="warehousesOutput.poNumber"
                  trim
                  :state="warehousesOutput.type === '1' && touched ? passed : null"
                  disabled
                />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical />
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-form-row>
          <!-- END - Internal number and PO no -->

          <!-- START - Note -->
          <b-form-group
            label="Ghi chú"
            label-for="note"
            class="mt-1"
          >
            <b-form-textarea
              id="note"
              v-model="warehousesOutput.note"
              maxlength="4000"
            />
          </b-form-group>
        <!-- END - Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col
          class="bg-white shadow rounded mt-1 mt-xl-0"
        >
          <b-form class="bg-white rounded shadow rounded my-1">
            <b-row
              class="justify-content-between border-bottom p-1 mx-0"
              align-v="center"
            >
              <div class="d-inline-flex rounded-top px-1 my-1">
                <strong class="text-blue-vinamilk">
                  Danh sách sản phẩm
                </strong>
              </div>
            </b-row>
            <b-col class="py-1">
              <!-- START - Table Product promotion -->
              <vue-good-table
                :columns="columns"
                :rows="warehousesOutput.products"
                style-class="vgt-table striped"
                compact-mode
                line-numbers
              >

                <!-- START - Header slot -->
                <div slot="table-actions">
                  <b-form-checkbox class="m-1">
                    Trả nguyên đơn
                  </b-form-checkbox>
                </div>
                <!-- END - Header slot -->

                <!-- START - Rows -->
                <template
                  slot="table-row"
                  slot-scope="props"
                >
                  <div v-if="props.column.field === 'productReturnAmount'">
                    <div v-if="warehousesTypeSelected == warehousesOptions[0].id">
                      <b-form-input
                        v-model="warehousesOutput.products[props.row.originalIndex].productReturnAmount"
                        type="number"
                        :number="true"
                        size="sm"
                      />
                    </div>
                    <div v-else>
                      <b-form-input
                        v-model="warehousesOutput.products[props.row.originalIndex].productReturnAmount"
                        type="number"
                        :number="true"
                        size="sm"
                        disabled
                      />
                    </div>
                  </div>
                  <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </div>
                </template>
                <!-- END - Rows -->
              </vue-good-table>
              <!-- END - Table Product -->

            </b-col>
          </b-form>

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                variant="primary"
                class="d-flex align-items-center rounded text-uppercase"
                @click="onClickUpdateWarehousesOutput"
              >
                <b-icon
                  icon="download"
                  width="20"
                  height="20"
                  class="mr-1"
                />
                Lưu
              </b-button>

              <b-button
                class="d-flex align-items-center ml-1 rounded text-uppercase"
                @click="navigateBack"
              >
                <b-icon
                  icon="x"
                  width="20"
                  height="20"
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
    <!-- END - Form and list -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import warehousesData from '@/@db/warehouses'
import { formatNumberToLocale, formatDateToLocale } from '@/@core/utils/filter'
import {
  WAREHOUSES_OUTPUT,
  // Getter
  GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
  // Action
  GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
  GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
  UPDATE_WAREHOUSES_OUTPUT_ACTION,
} from '../store-module/type'

export default {
  components: {
  },
  data() {
    return {
      warehousesTypeSelected: null,
      warehousesOptions: warehousesData.outputTypes,
      columns: [
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
          field: 'productPrice',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'productExported',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng trả',
          field: 'productReturnAmount',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],

      warehousesOutput: {
        id: `${this.$route.params.id}`,
        receiptType: `${this.$route.params.type}`,
        code: '',
        type: '',
        wareHouseTypeId: '',
        wareHouseTypeName: '',
        redInvoiceNo: '', // số hoá đơn
        internalNumber: '', // số nội bộ
        poNumber: '',
        note: '',
        transDate: null,
        products: [],
      },
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },
  computed: {
    getWarehousesOutput() {
      return this.GET_WAREHOUSES_OUTPUT_BY_ID_GETTER()
    },
    getProductOfWarehouseOutput() {
      return this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER().map(data => ({
        productID: data.id,
        productCode: data.productCode,
        productPrice: formatNumberToLocale(Number(data.price)),
        productName: data.productName,
        productDVT: data.unit,
        productPriceTotal: formatNumberToLocale(Number(data.totalPrice)),
        productExported: data.export,
        productReturnAmount: data.quantity,
      }))
    },
  },
  watch: {
    getProductOfWarehouseOutput() {
      const dataWarehousesOutput = { ...this.getWarehousesOutput }
      this.warehousesOutput = {
        id: dataWarehousesOutput.id,
        code: dataWarehousesOutput.transCode,
        type: dataWarehousesOutput.type,
        wareHouseTypeId: Number(this.warehousesOutput.wareHouseTypeId),
        wareHouseTypeName: dataWarehousesOutput.wareHouseTypeName,
        redInvoiceNo: dataWarehousesOutput.redInvoiceNo, // số hoá đơn
        internalNumber: dataWarehousesOutput.internalNumber, // số nội bộ
        poNumber: dataWarehousesOutput.poNumber,
        note: dataWarehousesOutput.note,
        transDate: formatDateToLocale(dataWarehousesOutput.transDate),
        products: [...this.getProductOfWarehouseOutput],
        borrowDate: formatDateToLocale(dataWarehousesOutput.borrowDate),
      }
      this.warehousesTypeSelected = this.warehousesOutput.type
    },
  },
  mounted() {
    const paramGetDetailsWarehousesOutput = {
      id: this.warehousesOutput.id,
      type: this.warehousesOutput.receiptType,
      formId: 5,
      ctrlId: 1,
    }
    this.GET_WAREHOUSES_OUTPUT_BY_ID_ACTION(paramGetDetailsWarehousesOutput)
    this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION(paramGetDetailsWarehousesOutput)
  },
  methods: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_BY_ID_GETTER,
      GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_WAREHOUSES_OUTPUT_BY_ID_ACTION,
      GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION,
      UPDATE_WAREHOUSES_OUTPUT_ACTION,
    ]),
    navigateBack() {
      this.$router.back()
    },
    onClickUpdateWarehousesOutput() {
      const products = this.warehousesOutput.products.map(data => ({
        id: data.productID,
        quantity: data.productReturnAmount,
      }))

      const updateWarehouseOutput = {
        id: this.warehousesOutput.id,
        type: this.warehousesOutput.receiptType,
        note: this.warehousesOutput.note,
        listProductRemain: products,
      }
      this.UPDATE_WAREHOUSES_OUTPUT_ACTION(updateWarehouseOutput)
    },
  },
}
</script>
