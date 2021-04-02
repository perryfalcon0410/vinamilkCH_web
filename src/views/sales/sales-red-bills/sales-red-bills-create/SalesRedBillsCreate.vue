<template>
  <b-container
    fluid
    class="p-0 px-1"
  >
    <!-- START - Form and list -->
    <b-col>
      <b-row>
        <!-- START - Form -->
        <b-col
          xl="3"
          class="d-flex flex-column mr-xl-1 px-0"
        >
          <!-- START - Header Form -->
          <b-row
            align-v="center"
            class="mx-0 pb-1"
          >
            <b-icon-arrow-left
              font-scale="1.5"
              color="gray"
              class="cursor-pointer"
              @click="routeBack"
            />
            <b-col class="font-weight-bold text-dark">
              Tạo hóa đơn đỏ
            </b-col>
          </b-row>
          <!-- END - Header Form -->

          <b-col
            class="bg-white shadow rounded"
          >
            <b-card-text class="my-2">
              Thông tin hóa đơn
            </b-card-text>

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
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Tên khách hàng"
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
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Archive Export ID and Type -->

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
                  label="Ngày in"
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

            <!-- START - Archive Export ID and Type -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Tên đơn vị*"
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
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Mã số thuế*"
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
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Archive Export ID and Type -->

            <!-- START - Archive Export Archive -->
            <b-form-group
              label="Địa chỉ cơ quan*"
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
              />
            </b-form-group>
            <!-- END - Archive Export Archive -->

            <!-- START - Archive Export Internal number and PO no -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Người mua hàng"
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
                  label="Hình thức thanh toán"
                  label-for="archiveExportArchive"
                >
                  <b-form-select
                    id="archiveExportArchive"
                    v-model="selected"
                    :options="options"
                  />
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
        </b-col>
        <!-- END - Form -->

        <!-- START - List -->
        <b-col class="d-flex flex-column mt-1 mt-xl-0 px-0">
          <!-- START - Header list -->
          <div class="font-weight-bold text-dark pb-1">
            Danh sách sản phẩm
          </div>
          <!-- END - Header list -->

          <b-col
            class="bg-white shadow rounded"
          >

            <!-- START - Table Product -->
            <b-row class="d-flex px-1 pt-2">
              <b-card-text class="mr-auto">
                Thông tin hóa đơn
              </b-card-text>
              <b-button
                variant="primary"
                class="rounded "
                @click="showBillOfSaleList"
              >
                Chọn HĐBH
              </b-button>
            </b-row>

            <vue-good-table
              :columns="columns"
              :rows="rowsProduct"
              style-class="vgt-table striped"
              line-numbers
              class="mt-2"
            >

              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field == 'Number'">
                  <span style="font-weight: bold; color: blue;">
                    <!-- <div v-if="props.row.Number == '1'"> -->
                    <b-form-input
                      v-model="props.row.Number"
                      type="text"
                      debounce="500"
                    />
                    <!-- </div> -->
                  </span>
                </span>

                <span v-else-if="props.column.field == 'ProductPrice'">
                  <div v-if="props.row.ProductPrice != ''">
                    <b-form-input
                      v-model="props.row.ProductPrice"
                      type="text"
                      debounce="500"
                    />
                  </div>
                </span>

                <span v-else-if="props.column.field == 'VAT'">
                  <div v-if="props.row.VAT != ''">
                    <b-col>
                      <b-form-input
                        v-model="props.row.VAT"
                        type="text"
                        debounce="500"
                      />
                    </b-col>
                  </div>
                </span>

                <span v-else-if="props.column.field == 'button'">
                  <div v-if="props.row.button == '1'">
                    <b-button
                      variant="light"
                      class="rounded-circle px-1"
                    >
                      <b-icon-x />
                    </b-button>
                  </div>
                </span>

                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>

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
                    icon="file-earmark-text-fill"
                    width="20"
                    height="20"
                    class="mr-1"
                  />
                  Lưu
                </b-button>

                <b-button
                  variant="primary"
                  size="sm"
                  class="rounded text-uppercase ml-1"
                >
                  <b-icon
                    icon="printer-fill"
                    width="20"
                    height="20"
                    class="mr-1"
                  />
                  LƯU & IN
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
        </b-col>
        <!-- END - List -->
      </b-row>
    </b-col>
    <!-- END - Form and list -->
    <bill-of-sale-list :visible="valueShowBillOfSaleList" />
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import BillOfSaleList from './pop-up/BillOfSaleList.vue'

export default {
  components: {
    VueGoodTable,
    BillOfSaleList,
  },
  data() {
    return {
      valueShowBillOfSaleList: false,
      selected: 'A',
      options: [
        { value: 'A', text: 'Tiền mặt' },
        { value: 'B', text: 'Chuyển khoản' },
      ],
      EntryAdjustmentModalVisible: false,
      EntryBorrowedModalVisible: false,
      EntryCouponModalVisible: false,
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
          label: 'Ngành hàng',
          field: 'Industry',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ProductDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Number',
          sortable: false,
        },
        {
          label: 'Đơn giá',
          field: 'ProductPrice',
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
          label: 'VAT %',
          field: 'VAT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tiền thuế GTGT',
          field: 'ProductExported',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'Note',
          sortable: false,
        },
        {
          label: '',
          field: 'button',
          sortable: false,
        },
      ],
      rowsProduct: [
        {
          ProductID: '',
          ProductName: '',
          Industry: '',
          ProductDVT: '',
          Number: '44',
          ProductPrice: '',
          ProductPriceTotal: '573,280',
          VAT: '',
          ProductExported: '57,328',
          Note: '',
          button: '',
        },
        {
          ProductID: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          Industry: '',
          ProductDVT: 'Hộp',
          Number: '20',
          ProductPrice: '5,960',
          ProductPriceTotal: '119,200',
          VAT: '10',
          ProductExported: '11,920',
          Note: '',
          button: '1',
        },
        {
          ProductID: '01CX01',
          ProductName: 'SĐCĐ Ông Thọ chữ xanh 380g',
          Industry: '1',
          ProductDVT: 'Hộp',
          Number: '24',
          ProductPrice: '18,920 ',
          ProductPriceTotal: '454,080',
          VAT: '10',
          ProductExported: '45,408',
          Note: '',
          button: '1',
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
    showBillOfSaleList() {
      if (this.valueShowBillOfSaleList === true) {
        this.valueShowBillOfSaleList = false
      } else {
        this.valueShowBillOfSaleList = true
      }
    },
  },
}
</script>
