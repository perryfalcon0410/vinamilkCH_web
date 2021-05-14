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
                  label="Mã khách hàng"
                  label-for="customer-code"
                >
                  <b-form-input
                    id="customer-code"
                    v-model="redBill.customerCode"
                    maxlength="40"
                    required
                    trim
                    @focus="focus"
                    @blur="inputSearchFocusedKH = false"
                    @input="loadCustomers"
                    @keyup.enter="keyEnter"
                    @keydown.up="keyUp"
                    @keydown.down="keyDown"
                  />
                  <b-collapse
                    v-model="inputSearchFocusedKH"
                    class="position-absolute mr-lg-0"
                    style="zIndex:1"
                  >
                    <b-container
                      class="my-1 bg-white rounded border border-primary shadow-lg"
                    >
                      <b-col>
                        <b-row
                          v-for="(customer, index) in customers"
                          :key="index"
                          class="my-1 cursor-pointer"
                          :class="{'item-active': index === cursor}"
                          @click="selectCustomer(customer)"
                          @mouseover="$event.target.classList.add('item-active')"
                          @mouseout="$event.target.classList.remove('item-active')"
                        >
                          <b>{{ customer.customerName }}</b>
                          {{ customer.customerCode }} - {{ customer.mobiPhone }}
                        </b-row>
                      </b-col>
                    </b-container>
                  </b-collapse>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Tên khách hàng"
                  label-for="customer-name"
                >
                  <b-form-input
                    id="customer-name"
                    v-model="redBill.customerName"
                    maxlength="40"
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
                  label-for="bill-number"
                >
                  <b-form-input
                    id="bill-number"
                    v-model="redBill.billNumber"
                    maxlength="20"
                    required
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Ngày in"
                  label-for="bill-date"
                >
                  <b-form-datepicker
                    id="bill-date"
                    v-model="redBill.billDate"
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
                  label-for="working-office"
                >
                  <b-form-input
                    id="working-office"
                    v-model="redBill.workingOffice"
                    maxlength="40"
                    required
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Mã số thuế*"
                  label-for="tax-code"
                >
                  <b-form-input
                    id="tax-code"
                    v-model="redBill.taxCode"
                    maxlength="40"
                    required
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Archive Export ID and Type -->

            <!-- START - Archive Export Archive -->
            <b-form-group
              label="Địa chỉ cơ quan*"
              label-for="office-address"
            >
              <b-form-input
                id="office-address"
                v-model="redBill.officeAddress"
                maxlength="40"
                required
              />
            </b-form-group>
            <!-- END - Archive Export Archive -->

            <!-- START - Archive Export Internal number and PO no -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Người mua hàng"
                  label-for="customer-id"
                >
                  <b-form-input
                    id="customer-id"
                    v-model="redBill.customerId"
                    maxlength="20"
                    required
                  />
                </b-form-group>
              </b-col>

              <b-col>

                <b-form-group
                  label="Hình thức thanh toán"
                  label-for="payment-type"
                >
                  <b-form-select
                    id="payment-type"
                    v-model="redBill.paymentType"
                    :options="options"
                  />
                </b-form-group>

              </b-col>
            </b-form-row>
            <!-- END - Archive Export Internal number and PO no -->

            <!-- START - Archive Export Note -->
            <b-form-group
              label="Ghi chú"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="redBill.note"
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
              <div
                slot="table-actions-bottom"
                class="mx-1 my-2 px-2"
              >
                <b-form-input
                  class="w-25"
                  placeholder="Nhập mã hoặc tên sản phẩm"
                  type="text"
                  @focus="inputSearchFocusedSP = true"
                  @blur="inputSearchFocusedSP = false"
                />
                <b-collapse
                  v-model="inputSearchFocusedSP"
                  class="position-absolute mr-lg-0 mb-3"
                  style="zIndex:1"
                >
                  <b-container
                    class="my-1 bg-white rounded border border-primary shadow-lg"
                  >
                    <b-col
                      v-for="(n,index) in 2"
                      :key="index"
                      class="px-0 my-1 border-bottom"
                    >
                      <b-col
                        class="text-dark font-weight-bold px-0"
                      >
                        Sữa Bột Dielac Grow Plus Có Tổ Yến 850g
                      </b-col>
                      <b-col class="text-dark px-0 mb-1">
                        SP007
                      </b-col>
                    </b-col>
                  </b-container>
                </b-collapse>
              </div>

              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field == 'Number'">
                  <b-form-input
                    v-model="props.row.Number"
                    type="text"
                  />
                </span>
                <span v-else-if="props.column.field == 'ProductPrice'">
                  <div v-if="props.row.ProductPrice != ''">
                    <b-form-input
                      v-model="props.row.ProductPrice"
                      type="text"
                    />
                  </div>
                </span>
                <span v-else-if="props.column.field == 'VAT'">
                  <div v-if="props.row.VAT != ''">
                    <b-col>
                      <b-form-input
                        v-model="props.row.VAT"
                        type="text"
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
            <b-row class="justify-content-end mt-4 mr-1">
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
    <bill-receipts-modal :visible="isShowBillReceiptsModal " />
  </b-container>
</template>

<script>
import commonData from '@/@db/common'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import BillReceiptsModal from './components/BillReceiptsModal.vue'
import {
  REDINVOICE,
  CUSTOMERS_GETTER,
  GET_CUSTOMERS_ACTION,
} from '../store-module/type'

export default {
  components: {
    BillReceiptsModal,
  },
  data() {
    return {
      isShowBillReceiptsModal: false,
      inputSearchFocusedSP: false,
      inputSearchFocusedKH: false,
      selected: 'A',
      options: [
        { value: 'A', text: 'Tiền mặt' },
        { value: 'B', text: 'Chuyển khoản' },
      ],
      entryAdjustmentModalVisible: false,
      entryBorrowedModalVisible: false,
      entryCouponModalVisible: false,
      redBill: {
        customerCode: '',
        customerName: '',
        workingOffice: '',
        officeAddress: '',
        taxCode: '',
        mobiPhone: '',
        billNumber: '',
        billDate: new Date(),
        customerId: '',
        paymentType: '',
        note: '',
      },
      cursor: -1,
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
    customers() {
      return this.CUSTOMERS_GETTER().map(data => ({
        id: data.id,
        customerCode: data.customerCode,
        customerName: `${data.lastName} ${data.firstName}`,
        workingOffice: data.workingOffice,
        officeAddress: data.officeAddress,
        taxCode: data.taxCode,
        mobiPhone: data.mobiPhone,
      }))
    },
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION()
  },
  methods: {
    ...mapGetters(REDINVOICE, [
      CUSTOMERS_GETTER,
    ]),
    ...mapActions(REDINVOICE, [
      GET_CUSTOMERS_ACTION,
    ]),
    routeBack() {
      this.$router.back()
    },
    showBillOfSaleList() {
      this.isShowBillReceiptsModal = !this.isShowBillReceiptsModal
    },
    loadCustomers() {
      this.cursor = -1
      if (this.redBill.customerCode.length >= commonData.minSearchLength) {
        this.inputSearchFocusedKH = true
        const searchData = {
          searchKeywords: this.redBill.customerCode.trim(),
        }

        this.GET_CUSTOMERS_ACTION(searchData)
      } else {
        this.inputSearchFocusedKH = false
      }
    },
    selectCustomer(customer) {
      this.redBill.customerCode = customer.customerCode
      this.redBill.customerName = customer.customerName
      this.redBill.workingOffice = customer.workingOffice
      this.redBill.officeAddress = customer.officeAddress
      this.redBill.taxCode = customer.taxCode
    },
    focus() {
      this.cursor = -1
      this.inputSearchFocusedKH = this.redBill.customerCode.length >= commonData.minSearchLength
    },
    keyUp() {
      if (this.cursor > 0) {
        this.cursor -= 1
      }
    },
    keyDown() {
      if (this.cursor < this.customers.length) {
        this.cursor += 1
      }
    },
    keyEnter() {
      if (this.inputSearchFocusedKH && this.customers[this.cursor]) {
        this.selectCustomer(this.customers[this.cursor])
        this.inputSearchFocusedKH = false
      }
    },
  },
}
</script>
<style>
  .item-active {
    padding-left: 5px;
  }
</style>
