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
              29/10/2020 lúc 16:16
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
                label-for="outputType"
              >
                <b-form-select
                  id="outputType"
                  v-model="outputType"
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
            label-for="warehouse"
          >
            <b-form-select
              id="warehouse"
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
                v-model="billNumber"
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
                v-model="billDate"
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
                  v-model="internalNumber"
                  trim
                  :state="outputType === '1' && touched ? passed : null"
                  disabled
                />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical
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
            :rows="rows"
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

    <!-- START - Modal -->
    <adjustment-modal :visible="AdjustmentModalVisible" />
    <borrowed-modal :visible="BorrowedModalVisible" />
    <output-modal :visible="OutputModalVisible" />
    <!-- END - Modal -->

  </b-container>
</template>

<script>
import OutputModal from '../components/output-modal/OutputModal.vue'
import AdjustmentModal from '../components/adjustment-modal/OutputAdjustmentModal.vue'
import BorrowedModal from '../components/borrowed-modal/OutputBorrowedModal.vue'

export default {
  components: {
    AdjustmentModal,
    BorrowedModal,
    OutputModal,
  },
  data() {
    return {
      AdjustmentModalVisible: false,
      BorrowedModalVisible: false,
      OutputModalVisible: false,

      id: '',
      billNumber: '',
      outputType: '1',
      internalNumber: '',
      billDate: new Date(),
      poNo: '',

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
      rows: [
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

  methods: {
    showModal() {
      const Output = this.outputType === '1' ? this.OutputModalVisible = !this.OutputModalVisible : this.OutputModalVisible = false
      const Adjustment = this.outputType === '2' ? this.AdjustmentModalVisible = !this.AdjustmentModalVisible : this.AdjustmentModalVisible = false
      const Borrowed = this.outputType === '3' ? this.BorrowedModalVisible = !this.BorrowedModalVisible : this.BorrowedModalVisible = false

      return Output && Adjustment && Borrowed
    },
    navigateBack() {
      this.$router.back()
    },

  },

}
</script>
