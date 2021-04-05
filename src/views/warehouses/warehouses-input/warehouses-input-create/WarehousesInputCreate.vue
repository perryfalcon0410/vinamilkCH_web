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
          <!-- START - Archive Import Date  -->
          <b-row class="my-1">
            <b-col cols="4">
              Ngày nhập:
            </b-col>
            <b-col class="font-weight-bold">
              29/10/2020 lúc 16:16
            </b-col>
          </b-row>
          <!-- END - Archive Import Date -->

          <!-- START - Archive Import ID and Type -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Mã nhập hàng"
                label-for="archiveImportID"
                :state="stateInputID"
                invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
              >
                <b-form-input
                  id="archiveImportID"
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
                label="Loại nhập"
                label-for="archiveImportType"
              >
                <b-form-select
                  id="archiveImportType"
                  v-model="selected"
                >
                  <b-form-select-option value="loại nhập">
                    loại nhập
                  </b-form-select-option>
                  <b-form-select-option
                    value="nhập điều chỉnh"
                  >
                    nhập điều chỉnh
                  </b-form-select-option>
                  <b-form-select-option value="nhập vay mượn">
                    nhập vay mượn
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Import ID and Type -->

          <!-- START - Archive Import Archive -->
          <b-form-group
            label="Kho hàng"
            label-for="archiveImportArchive"
          >
            <b-form-select
              id="archiveImportArchive"
            />
          </b-form-group>
          <!-- END - Archive Import Archive -->

          <!-- START - Archive Import Bill Number and Date -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Số hóa đơn"
                label-for="archiveImportBillNumber"
                :state="stateInputBillNumber"
                invalid-feedback="Chỉ bao gồm ký tự [0-9]"
              >
                <b-form-input
                  id="archiveImportBillNumber"
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
                label-for="archiveImportBillDate"
              >
                <b-form-datepicker
                  id="archiveImportBillDate"
                  v-model="inputValueDate"
                  required
                  locale="vi"
                  :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Import Bill Number and Date -->

          <!-- START - Archive Import Internal number and PO no -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Số nội bộ"
                label-for="archiveImportInternalNumber"
                :state="stateInputInternalNumber"
                invalid-feedback="Chỉ bao gồm ký tự [0-9]"
              >
                <b-form-input
                  id="archiveImportInternalNumber"
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
                label-for="archiveImportPoNo"
              >
                <b-input-group
                  id="archiveImportPoNo"
                  class="input-group-merge"
                >
                  <b-form-input
                    required
                  />
                  <b-input-group-append is-text>
                    <b-icon-three-dots-vertical
                      @click="showModal()"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!-- END - Archive Import Internal number and PO no -->

          <!-- START - Archive Import Note -->
          <b-form-group
            label="Ghi chú"
            label-for="customerType"
          >
            <b-form-textarea
              id="customerType"
              maxlength="4000"
            />
          </b-form-group>
        <!-- END - Archive Import Note -->
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col
          class="bg-white shadow rounded mt-1 mt-xl-0"
        >
          <!-- START - Table Product -->
          <div class="bg-light d-inline-flex text-primary rounded-top font-weight-bold px-1 my-1">
            Sản phẩm
          </div>

          <vue-good-table
            :columns="columns"
            :rows="rowsProduct"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
          />
          <!-- END - Table Product -->

          <!-- START - Table Product promotion -->
          <div class="bg-light d-inline-flex text-primary rounded-top font-weight-bold px-1 my-1">
            Hàng khuyến mãi
          </div>

          <vue-good-table
            :columns="columns"
            :rows="rowsProductPromotion"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
          >
            <!-- START - Feature -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'ArchiveImportFeature'">
                <b-button
                  variant="light"
                  class="rounded-circle ml-1 p-0"
                >
                  <b-icon-x
                    color="red"
                    width="30"
                    height="30"
                  />
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
          <!-- END - Feature -->
          </vue-good-table>
          <!-- END - Table Product promotion -->

          <!-- START - Button -->
          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                variant="primary"
                size="sm"
                class="d-flex align-items-center rounded text-uppercase"
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
                size="sm"
                class="d-flex align-items-center ml-1 rounded text-uppercase"
                @click="routeBack"
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
    <adjustment-modal :visible="AdjustmentModalVisible" />
    <borrowed-modal :visible="BorrowedModalVisible" />
    <po-confirm-modal :visible="PoConfirmModalVisible" />
    <!-- END - Modal -->

  </b-container>
</template>

<script>
import AdjustmentModal from '../components/adjustment-modal/InputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/InputBorrowedModal.vue'
import PoConfirmModal from '../components/po-confirm-modal/InputPoConfirmModal.vue'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    PoConfirmModal,
  },
  data() {
    return {
      selected: 'loại nhập',
      AdjustmentModalVisible: false,
      BorrowedModalVisible: false,
      PoConfirmModalVisible: false,
      inputValueID: '',
      inputValueBillNumber: '',
      inputValueInternalNumber: '',
      inputValueDate: new Date(),
      columns: [
        {
          label: 'Mã hàng',
          field: 'ArchiveImportProductID',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'ArchiveImportProductAmount',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ArchiveImportProductPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'ArchiveImportProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ArchiveImportProductDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'ArchiveImportProductMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SO No',
          field: 'ArchiveImportProductSONo',
          sortable: false,
        },
        {
          label: '',
          field: 'ArchiveImportFeature',
          sortable: false,
        },
      ],
      rowsProduct: [
        {
          ArchiveImportProductID: '23',
          ArchiveImportProductAmount: '48',
          ArchiveImportProductPrice: '',
          ArchiveImportProductName: '',
          ArchiveImportProductDVT: '',
          ArchiveImportProductMoney: '25,123,000',
          ArchiveImportProductSONo: '',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
        },
      ],
      rowsProductPromotion: [
        {
          ArchiveImportProductID: '23',
          ArchiveImportProductAmount: '24',
          ArchiveImportProductPrice: '',
          ArchiveImportProductName: '',
          ArchiveImportProductDVT: '',
          ArchiveImportProductMoney: '5,062,000',
          ArchiveImportProductSONo: '',
          ArchiveImportFeature: 'Xóa',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
          ArchiveImportFeature: 'Xóa',
        },
        {
          ArchiveImportProductID: '04AA10',
          ArchiveImportProductAmount: '12',
          ArchiveImportProductPrice: '6,300',
          ArchiveImportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveImportProductDVT: 'Hộp',
          ArchiveImportProductMoney: '2,531,000',
          ArchiveImportProductSONo: 'SO.1345',
          ArchiveImportFeature: 'Xóa',
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
    showModal() {
      const PoConfirm = this.selected === 'loại nhập' ? this.PoConfirmModalVisible = !this.PoConfirmModalVisible : this.PoConfirmModalVisible = false
      const Adjustment = this.selected === 'nhập điều chỉnh' ? this.AdjustmentModalVisible = !this.AdjustmentModalVisible : this.AdjustmentModalVisible = false
      const Borrowed = this.selected === 'nhập vay mượn' ? this.BorrowedModalVisible = !this.BorrowedModalVisible : this.BorrowedModalVisible = false

      return PoConfirm && Adjustment && Borrowed
    },
    routeBack() {
      this.$router.back()
    },

  },

}
</script>
