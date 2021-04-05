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
          <!-- START - Archive Export Date  -->
          <b-form-row class="my-1">
            <b-col cols="4">
              Ngày xuất:
            </b-col>
            <b-col class="font-weight-bold">
              29/10/2020 lúc 16:16
            </b-col>
          </b-form-row>
          <!-- END - Archive Export Date -->

          <!-- START - Archive Export ID and Type -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Mã xuất hàng"
                label-for="archiveExportID"
                :state="stateInputID"
                invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
              >
                <b-form-input
                  id="archiveExportID"
                  v-model="inputValueID"
                  maxlength="40"
                  :state="stateInputID"
                  required
                  trim
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Loại xuất"
                label-for="archiveExportType"
              >
                <b-form-select
                  id="archiveExportType"
                  v-model="selected"
                >
                  <b-form-select-option value="phiếu nhập">
                    phiếu nhập
                  </b-form-select-option>
                  <b-form-select-option value="phiếu điều chỉnh">
                    phiếu điều chỉnh
                  </b-form-select-option>
                  <b-form-select-option value="phiếu vay mượn">
                    phiếu vay mượn
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Export ID and Type -->

          <!-- START - Archive Export Archive -->
          <b-form-group
            label="Kho hàng"
            label-for="archiveExportArchive"
          >
            <b-form-select
              id="archiveExportArchive"
            />
          </b-form-group>
          <!-- END - Archive Export Archive -->

          <!-- START - Archive Export Bill Number and Date -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Số hóa đơn"
                label-for="archiveExportBillNumber"
                :state="stateInputBillNumber"
                invalid-feedback="Chỉ bao gồm ký tự [0-9]"
              >
                <b-form-input
                  id="archiveExportBillNumber"
                  v-model="inputValueBillNumber"
                  maxlength="20"
                  :state="stateInputBillNumber"
                  required
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Ngày hóa đơn"
                label-for="archiveExportBillDate"
              >
                <b-form-datepicker
                  id="archiveExportBillDate"
                  v-model="inputValueDate"
                  required
                  locale="vi"
                  :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Export Bill Number and Date -->

          <!-- START - Archive Export Internal number and PO no -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Số nội bộ"
                label-for="archiveExportInternalNumber"
                :state="stateInputInternalNumber"
                invalid-feedback="Chỉ bao gồm ký tự [0-9]"
              >
                <b-form-input
                  id="archiveExportInternalNumber"
                  v-model="inputValueInternalNumber"
                  maxlength="20"
                  :state="stateInputInternalNumber"
                  required
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="PO No"
                label-for="archiveExportPoNo"
              >
                <b-input-group
                  id="archiveExportPoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    required
                  />
                  <b-input-group-append is-text>
                    <b-icon-three-dots-vertical @click="showModal" />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Export Internal number and PO no -->

          <!-- START - Archive Export Note -->
          <b-form-group
            label="Ghi chú"
            label-for="customerType"
          >
            <b-form-textarea
              id="customerType"
              maxlength="4000"
            />
          </b-form-group>
          <!-- END - Archive Export Note -->

        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col class="bg-white shadow rounded mt-1 mt-xl-0 py-1">
          <!-- START - Table Product -->
          <vue-good-table
            :columns="columns"
            :rows="rowsProduct"
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
              <div v-if="props.column.field === 'ProductReturnAmount'">
                <b-input
                  size="sm"
                  :value="props.row.ProductReturnAmount"
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
                size="sm"
                class="rounded text-uppercase"
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
                size="sm"
                class="ml-1 rounded text-uppercase"
                @click="routeBack"
              >
                <b-icon-x
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
    <entry-modal :visible="EntryModalVisible" />
    <adjustment-modal :visible="AdjustmentModalVisible" />
    <borrowed-modal :visible="BorrowedModalVisible" />
    <!-- END - Modal -->

  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

import EntryModal from '../warehouse-output-modal/entry-modal/WarehouseOutputEntryModal.vue'
import AdjustmentModal from '../warehouse-output-modal/adjustment-modal/WarehouseOutputAdjustmentModal.vue'
import BorrowedModal from '../warehouse-output-modal/borrowed-modal/WarehouseOutputBorrowedModal.vue'

export default {
  components: {
    VueGoodTable,
    EntryModal,
    AdjustmentModal,
    BorrowedModal,
  },
  data() {
    return {
      selected: 'phiếu nhập',
      AdjustmentModalVisible: false,
      BorrowedModalVisible: false,
      EntryModalVisible: false,
      inputValueID: '',
      inputValueBillNumber: '',
      inputValueInternalNumber: '',
      inputValueDate: new Date(),
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductID',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ProductPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ProductDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'ProductPriceTotal',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Đã xuất trả/tổng nhập',
          field: 'ProductExported',
          sortable: false,
        },
        {
          label: 'Số lượng trả',
          field: 'ProductReturnAmount',
          sortable: false,
        },
      ],
      rowsProduct: [
        {
          ProductID: '04AA10',
          ProductPrice: '6,300',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPriceTotal: '2,531,000',
          ProductExported: '1/5',
          ProductReturnAmount: '0',
        },
        {
          ProductID: '04AA10',
          ProductPrice: '6,300',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPriceTotal: '2,531,000',
          ProductExported: '1/5',
          ProductReturnAmount: '0',
        },
        {
          ProductID: '04AA10',
          ProductPrice: '6,300',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPriceTotal: '2,531,000',
          ProductExported: '1/5',
          ProductReturnAmount: '0',
        },
        {
          ProductID: '04AA10',
          ProductPrice: '6,300',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPriceTotal: '2,531,000',
          ProductExported: '1/5',
          ProductReturnAmount: '0',
        },
      ],
    }
  },
  computed: {
    stateInputID() {
      const validID = /^([\w\\.]{0,40})$/
      const result = validID.test(this.inputValueID)
      if (this.inputValueID.length >= 1) {
        return result
      }
      return null
    },
    stateInputBillNumber() {
      const validBillNumber = /^(\d{0,20})$/
      const result = validBillNumber.test(this.inputValueBillNumber)
      if (this.inputValueBillNumber.length >= 1) {
        return result
      }
      return null
    },
    stateInputInternalNumber() {
      const validInternalNumber = /^(\d{0,20})$/
      const result = validInternalNumber.test(this.inputValueInternalNumber)
      if (this.inputValueInternalNumber.length >= 1) {
        return result
      }
      return null
    },
  },
  methods: {
    routeBack() {
      this.$router.back()
    },

    showModal() {
      const ShowEntryCouponModal = this.selected === 'phiếu nhập' ? this.EntryModalVisible = !this.EntryModalVisible : this.EntryModalVisible = false
      const ShowEntryAdjustmentModal = this.selected === 'phiếu điều chỉnh' ? this.AdjustmentModalVisible = !this.AdjustmentModalVisible : this.AdjustmentModalVisible = false
      const ShowEntryBorrowedModal = this.selected === 'phiếu vay mượn' ? this.BorrowedModalVisible = !this.BorrowedModalVisible : this.BorrowedModalVisible = false

      return ShowEntryCouponModal && ShowEntryAdjustmentModal && ShowEntryBorrowedModal
    },
  },
}
</script>
