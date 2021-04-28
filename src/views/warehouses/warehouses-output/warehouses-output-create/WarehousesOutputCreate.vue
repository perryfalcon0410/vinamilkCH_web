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
              {{ dateNow }}
            </b-col>
          </b-row>
          <!-- END - Date -->

          <!-- START - ID and Type -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Mã xuất hàng"
                label-for="id"
              >
                <b-form-input
                  id="id"
                  v-model="id"
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
                <v-select
                  id="type"
                  v-model="outputType"
                  :options="warehousesOptions"
                  label="name"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - ID and Type -->

          <!-- START -  Stock  -->
          <b-form-group
            label="Kho hàng"
            label-for="warehouse"
          >
            <b-form-input
              id="warehouse"
              v-model="wareHouseType.wareHouseTypeName"
              readonly
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
                v-model="transCode"
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
                v-model="transDate"
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
                v-model="internalNumber"
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
                  v-model="poNumber"
                  trim
                  :state="outputType.id === '0' && touched ? passed : null"
                  disabled
                />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical
                    class="cursor-pointer"
                    @click="showModal()"
                  />
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
              v-model="note"
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
            :rows="poProducts"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
          >
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
            <!-- START - Header slot -->
            <div slot="table-actions">
              <b-form-checkbox
                v-model="exportAll"
                class="m-1"
              >
                Trả nguyên đơn
              </b-form-checkbox>
            </div>
            <!-- END - Header slot -->

            <!-- START - Rows -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'ProductReturnAmount' ">
                <b-form-input
                  v-model="amount[props.row.originalIndex].number"
                  :class="amount[props.row.originalIndex].number > props.row.amountQuantity ||amount[props.row.originalIndex].number < 0 ? 'border-danger' : ''"
                  size="sm"
                  type="number"
                  :readonly="exportAll && outputType.id !== '0'"
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
                @click="createExport"
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

    <!-- START - Modal -->
    <adjustment-modal
      :visible="visibleAdjustmentModal"
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
    />
    <borrowed-modal
      :visible="visibleBorrowedModal"
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
    />
    <output-modal
      :visible="visibleOutputModal"
      @onModalHidden="onModalHidden"
      @choonsenTrans="choonsenTrans"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import warehousesData from '@/@db/warehouses'
import {
  mapGetters,
  mapActions,
} from 'vuex'
import { isEmpty, getNow } from '@core/utils/utils'
import OutputModal from '../components/output-modal/OutputModal.vue'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'
import {
  WAREHOUSES_OUTPUT,
  GET_EXPORT_PO_TRANS_DETAIL_GETTER,
  GET_EXPORT_PO_TRANS_DETAIL_ACTION,
  GET_WAREHOUSE_TYPE_GETTER,
  CLEAR_EXPORT_PRODUCTS_ACTION,
  GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
  GET_EXPORT_BORROWINGS_DETAIL_ACTION,
  GET_WAREHOUSE_TYPE_ACTION,
  CREATE_EXPORT_ACTION,
} from '../store-module/type'
import toasts from '../../../../@core/utils/toasts/toasts'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    OutputModal,
  },
  data() {
    return {
      warehousesOptions: warehousesData.outputTypes,
      visibleAdjustmentModal: false,
      visibleBorrowedModal: false,
      visibleOutputModal: false,
      exportAll: false,
      id: '',
      transCode: '',
      outputType: warehousesData.outputTypes[0],
      internalNumber: '',
      transDate: '',
      poNumber: '',
      note: '',
      dateNow: getNow(),
      columns: [
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
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'unit',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'export',
          sortable: false,
        },
        {
          label: 'Còn lại/Tổng nhập',
          field: 'quantity',
          sortable: false,
        },
        {
          label: 'Số lượng trả',
          field: 'ProductReturnAmount',
          sortable: false,
        },
      ],
      amount: [],
    }
  },

  computed: {
    poProducts() {
      return this.GET_EXPORT_PO_TRANS_DETAIL_GETTER().map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        price: data.price,
        unit: data.unit,
        totalPrice: data.totalPrice,
        export: this.outputType.id === '0' ? `${data.export}/${data.quantity}` : 0,
        quantity: this.outputType.id === '0' ? `${data.quantity - data.export}/${data.quantity}` : data.quantity,
        productReturnAmount: 0,
        amountQuantity: data.quantity,
      }))
    },
    wareHouseType() {
      return this.GET_WAREHOUSE_TYPE_GETTER()
    },
  },

  watch: {
    poProducts() {
      this.amount = []
      this.poProducts.forEach(item => {
        this.amount.push({
          number: this.outputType.id === '0' ? 0 : item.amountQuantity,
        })
      })
    },
    outputType() {
      this.CLEAR_EXPORT_PRODUCTS_ACTION()
      this.internalNumber = ''
      this.internalNumber = ''
      this.transCode = ''
      this.poNumber = ''
      this.transDate = ''
      this.note = ''
      this.amount = []
      console.log(this.outputType)
    },
    exportAll() {
      if (this.exportAll) {
        this.poProducts.forEach((i, d) => {
          this.amount[d].number = i.amountQuantity
        })
      } else {
        this.poProducts.forEach((i, d) => {
          this.amount[d].number = 0
        })
      }
    },
  },
  mounted() {
    this.GET_WAREHOUSE_TYPE_ACTION()
  },
  methods: {
    ...mapGetters(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_DETAIL_GETTER,
      GET_WAREHOUSE_TYPE_GETTER,
    ]),
    ...mapActions(WAREHOUSES_OUTPUT, [
      GET_EXPORT_PO_TRANS_DETAIL_ACTION,
      CLEAR_EXPORT_PRODUCTS_ACTION,
      GET_EXPORT_AJUSTMENT_DETAIL_ACTION,
      GET_EXPORT_BORROWINGS_DETAIL_ACTION,
      GET_WAREHOUSE_TYPE_ACTION,
      CREATE_EXPORT_ACTION,
    ]),

    showModal() {
      this.CLEAR_EXPORT_PRODUCTS_ACTION()
      switch (this.outputType.id) {
        case '0':
          this.visibleOutputModal = true
          break
        case '1':
          this.visibleAdjustmentModal = true
          break
        case '2':
          this.visibleBorrowedModal = true
          break
        default:
          break
      }
    },
    navigateBack() {
      this.$router.back()
    },
    onModalHidden(id) {
      if (!id && isEmpty(this.id)) {
        this.CLEAR_EXPORT_PRODUCTS_ACTION()
      }

      switch (this.outputType.id) {
        case '0':
          this.visibleOutputModal = false
          this.exportAll = false
          if (id) {
            this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(id)
          }
          if (!id && !isEmpty(this.id)) {
            this.GET_EXPORT_PO_TRANS_DETAIL_ACTION(this.id)
          }
          break
        case '1':
          this.visibleAdjustmentModal = false
          if (id) {
            this.exportAll = true
            this.GET_EXPORT_AJUSTMENT_DETAIL_ACTION(id)
          } else if (!isEmpty(this.id)) {
            this.GET_EXPORT_AJUSTMENT_DETAIL_ACTION(this.id)
          }
          break
        case '2':
          this.visibleBorrowedModal = false
          if (id) {
            this.exportAll = true
            this.GET_EXPORT_BORROWINGS_DETAIL_ACTION(id)
          } else if (!isEmpty(this.id)) {
            this.GET_EXPORT_BORROWINGS_DETAIL_ACTION(this.id)
          }
          break
        default:
          break
      }
    },
    choonsenTrans(trans) {
      const {
        internalNumber, transCode, poNumber, billDate, adjustmentCode, note, poBorrowCode, description, id,
      } = trans

      this.internalNumber = internalNumber
      this.transCode = transCode || adjustmentCode || poBorrowCode
      this.poNumber = poNumber
      this.transDate = billDate
      this.note = note || description
      this.id = id
    },
    createExport() {
      const productTemp = []

      const failedFound = this.poProducts.findIndex((item, index) => this.amount[index].number > item.amountQuantity || this.amount[index].number < 0)

      if (failedFound > -1) {
        toasts.error('Số lượng xuất không chính xác')

        return
      }

      this.poProducts.forEach((item, index) => {
        if (this.outputType.id === '0') {
          productTemp.push({
            id: item.id,
            quantity: this.amount[index].number,
          })
        } else {
          productTemp.push({
            id: item.id,
            quantity: item.amountQuantity,
          })
        }
      })

      this.CREATE_EXPORT_ACTION(
        {
          importType: this.outputType.id,
          isRemainAll: this.exportAll,
          receiptImportId: this.id,
          note: this.note,
          litQuantityRemain: productTemp,
        },
      )
      this.CLEAR_EXPORT_PRODUCTS_ACTION()
    },
  },

}
</script>
