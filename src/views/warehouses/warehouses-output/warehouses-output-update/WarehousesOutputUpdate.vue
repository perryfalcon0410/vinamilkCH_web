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
              {{ warehousesOutput.orderDate }}
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
                <b-form-select
                  id="type"
                  v-model="outputType"
                  disabled
                >
                  <b-form-select-option value="1">
                    xuất trả PO
                  </b-form-select-option>
                  <b-form-select-option
                    value="2"
                  >
                    xuất điều chỉnh
                  </b-form-select-option>
                  <b-form-select-option value="3">
                    xuất vay mượn
                  </b-form-select-option>
                </b-form-select>
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
              <div>
                Ngày hóa đơn
              </div>
              <b-form-datepicker
                v-model="warehousesOutput .transDate"
                locale="vi"
                :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                disabled
              />
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
          <!-- START - Table Product promotion -->
          <div class="d-inline-flex rounded-top px-1 my-1">
            <strong>
              Danh sách sản phẩm
            </strong>
          </div>

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
                <b-input
                  size="sm"
                  :value="props.row.productReturnAmount"
                />
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
            <!-- END - Rows -->

          </vue-good-table>
          <!-- END - Table Product -->

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                variant="primary"
                class="d-flex align-items-center rounded text-uppercase"
              >
                <b-icon
                  icon="download"
                  width="20"
                  height="20"
                  class="mr-1"
                />
                Trả hàng
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
      outputType: 1, // Use b-form-select (prop type)
      getOption: {
        id: 0,
        type: 0,
      },

      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productID',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'productPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'productDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'productPriceTotal',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'productExported',
          sortable: false,
        },
        {
          label: 'Số lượng trả',
          field: 'productReturnAmount',
          sortable: false,
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
        orderDate: '',
        transDate: '',
        products: [],
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
        productPrice: data.price,
        productName: data.productName,
        productDVT: data.unit,
        productPriceTotal: data.totalPrice,
        productExported: data.export,
        productReturnAmount: data.amount,
      }))
    },
  },
  watch: {
    getWarehousesOutput() {
      const dataWarehousesOutput = { ...this.getWarehousesOutput }
      this.warehousesOutput = {
        id: dataWarehousesOutput.id,
        code: dataWarehousesOutput.transCode,
        type: dataWarehousesOutput.type,
        wareHouseTypeId: dataWarehousesOutput.wareHouseTypeId,
        wareHouseTypeName: dataWarehousesOutput.wareHouseTypeName,
        redInvoiceNo: dataWarehousesOutput.redInvoiceNo, // số hoá đơn
        internalNumber: dataWarehousesOutput.internalNumber, // số nội bộ
        poNumber: dataWarehousesOutput.poNumber,
        note: dataWarehousesOutput.note,
        orderDate: dataWarehousesOutput.orderDate,
        transDate: dataWarehousesOutput.transDate,
        products: [...this.getProductOfWarehouseOutput],
      }
      console.log(this.warehousesOutput)
      this.outputType = dataWarehousesOutput.type
    },
  },
  mounted() {
    this.GET_WAREHOUSES_OUTPUT_BY_ID_ACTION(`${this.warehousesOutput.id}?type=${this.warehousesOutput.receiptType}`)
    this.GET_PRODUCTS_OF_WAREHOUSES_OUTPUT_ACTION(`${this.warehousesOutput.id}?type=${this.warehousesOutput.receiptType}`)
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
    updateWarehousesOutput() {
      // const options = {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      // }
      const updateWarehouseOutput = {
        id: this.warehousesOutput.id,
        createdAt: '2021-04-23T08:50:19.253Z',
        updatedAt: '2021-04-23T08:50:19.253Z',
        deletedAt: '2021-04-23T08:50:19.253Z',
        type: this.warehousesOutput.receiptType,
        note: this.warehousesOutput.note,
        litQuantityRemain: [
          0,
        ],
      }
      this.UPDATE_WAREHOUSES_OUTPUT_ACTION(updateWarehouseOutput)
    },
  },
}
</script>
