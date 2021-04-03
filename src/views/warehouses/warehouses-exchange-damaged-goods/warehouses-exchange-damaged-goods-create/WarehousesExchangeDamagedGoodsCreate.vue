<template>
  <b-container
    fluid
    class="pb-1 px-0"
  >
    <!-- START - Form and list -->
    <b-row class="mx-0">
      <!-- START - Form -->
      <b-col
        xl="3"
        class="mr-xl-1 bg-white shadow rounded"
      >
        <!-- START -  Date  -->
        <b-row class="my-1">
          <b-col>
            Ngày biên bản:
          </b-col>
          <div class="font-weight-bold mx-1">
            29/10/2020 lúc 16:16
          </div>
        </b-row>
        <!-- END -  Date -->

        <!-- START -  Number -->
        <b-form-group
          :state="stateInputID"
          invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
        >
          Số phiên bản <sup class="text-danger">*</sup>
          <b-form-input
            id="archiveExportID"
            v-model="inputValueID"
            maxlength="40"
            :state="stateInputID"
            required
            trim
          />
        </b-form-group>
        <!-- END -  Number -->

        <!-- START -  Customer -->
        <b-form-group>
          Khách hàng <sup class="text-danger">*</sup>
          <b-form-select
            id="archiveExportArchive"
          />
        </b-form-group>
        <!-- END -  Customer -->

        <!-- START -  Address-->
        <b-form-group>
          Địa chỉ <sup class="text-danger">*</sup>

          <b-form-input
            id="archiveExportBillNumber"
            v-model="inputValueBillNumber"
            required
          />
        </b-form-group>
        <!-- END -  Address-->

        <!-- START -  Phone number -->
        <b-form-group
          :state="stateInputInternalNumber"
          invalid-feedback="Chỉ bao gồm ký tự [0-9]"
        >
          Di động <sup class="text-danger">*</sup>
          <b-form-input
            id="archiveExportInternalNumber"
            v-model="inputValueInternalNumber"
            maxlength="20"
            :state="stateInputInternalNumber"
            required
          />
        </b-form-group>
        <!-- END -  Phone number -->

        <!-- START -  Reason -->
        <b-form-group>
          Lý do <sup class="text-danger">*</sup>
          <b-form-select
            id="customerType"
          />
        </b-form-group>
        <!-- END -  Reason -->

      </b-col>
      <!-- END - Form -->

      <!-- START - List -->
      <b-col class="bg-white shadow rounded mt-1 mt-xl-0 p-1">
        <!-- START - Table Product -->
        <vue-good-table
          :columns="columns"
          :rows="rowsProduct"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
        >
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'Feature'">
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Column -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'Feature'">
              <b-icon-trash-fill color="red" />
            </div>

            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

          <template slot="table-actions-bottom">
            <b-col
              cols="5"
              class="m-1"
            >
              <b-input placeholder="Nhập mã hoặc tên sản phẩm" />
            </b-col>
          </template>

          <!-- START - Filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'ProductCode'"
            >
              23 dòng
            </div>
            <div
              v-else-if="props.column.field === 'ProductAmount'"
            >
              560
            </div>
            <div
              v-else-if="props.column.field === 'ProductPriceTotal'"
              class="float-right"
            >
              25,123,000
            </div>
          </template>
          <!-- END - Filter -->

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
    <!-- END - Form and list -->

  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
// import the styles
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,

  },
  data() {
    return {
      selected: 'phiếu nhập',
      EntryAdjustmentModalVisible: false,
      EntryBorrowedModalVisible: false,
      EntryCouponModalVisible: false,
      inputValueID: '',
      inputValueBillNumber: '',
      inputValueInternalNumber: '',
      inputValueDate: new Date(),
      columns: [
        {
          label: 'Mã hàng',
          field: 'ProductCode',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Tên hàng',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ProductDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ProductPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số lượng ',
          field: 'ProductAmount',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thành tiền',
          field: 'ProductPriceTotal',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Thao tác',
          field: 'Feature',
          sortable: false,
        },
      ],
      rowsProduct: [
        {
          ProductCode: '04AA10',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPrice: '6,300',
          ProductAmount: '12',
          ProductPriceTotal: '2,531,000',
          Feature: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPrice: '6,300',
          ProductAmount: '12',
          ProductPriceTotal: '2,531,000',
          Feature: '',
        },
        {
          ProductCode: '04AA10',
          ProductName: 'STT Dâu ADM GOLD 180ml',
          ProductDVT: 'Hộp',
          ProductPrice: '6,300',
          ProductAmount: '12',
          ProductPriceTotal: '2,531,000',
          Feature: '',
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
      const ShowEntryCouponModal = this.selected === 'phiếu nhập' ? this.EntryCouponModalVisible = !this.EntryCouponModalVisible : this.EntryCouponModalVisible = false
      const ShowEntryAdjustmentModal = this.selected === 'phiếu điều chỉnh' ? this.EntryAdjustmentModalVisible = !this.EntryAdjustmentModalVisible : this.EntryAdjustmentModalVisible = false
      const ShowEntryBorrowedModal = this.selected === 'phiếu vay mượn' ? this.EntryBorrowedModalVisible = !this.EntryBorrowedModalVisible : this.EntryBorrowedModalVisible = false

      return ShowEntryCouponModal && ShowEntryAdjustmentModal && ShowEntryBorrowedModal
    },
  },
}
</script>
