<template>
  <!-- POPUP Invoice Details START -->
  <b-modal
    size="xl"
    title="Thông tin chi tiết hóa đơn"
    :visible="visible"
    hide-footer="true"
  >

    <!-- Start Billing Information -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light h-25 w-75 rounded-right border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1">
          Thông tin thanh toán
        </b-row>
      </b-col>
      <b-col
        cols="4"
      >
        <b-row class="mt-1">
          <b-col>
            Số hóa đơn:
          </b-col>
          <b-col>
            <h2 class="text-center">
              {{ infomation.orderNumber }}
            </h2>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Khách hàng:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ infomation.customerName }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Ngày thanh toán:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ infomation.orderDate }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Nhân viên:
          </b-col>
          <b-col>
            <h3 class="text-center">
              {{ infomation.saleMan }}
            </h3>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        cols="4"
        align-self="end"
      >
        <b-row class="mt-1">
          <b-col>
            Phải thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ infomation.total }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Đã thanh toán:
          </b-col>
          <b-col>
            <h3>
              {{ infomation.totalPaid }}
            </h3>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            Tiền trả lại:
          </b-col>
          <b-col>
            <h3>
              {{ infomation.balance }}
            </h3>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End Billing Information -->

    <!-- Start Invoice details -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mb-1">
          Chi tiết hóa đơn
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <InvoiceDetail
      :detail="details"
    />
    <!-- End Invoice details -->

    <!-- Start Discounts and discounts -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mt-2 mb-1">
          Giảm giá & chiết khấu
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <Discounts />

    <!-- Start Discounts and discounts -->

    <!-- Start promotion -->
    <b-row>
      <b-col
        cols="2"
      >
        <b-row class="bg-light p-1 w-75 rounded-right  border-top-info border-bottom-info border-right-info align-content-center justify-content-center mt-2 mb-1">
          Khuyến mãi
        </b-row>
      </b-col>
      <b-col
        cols="8"
      />
    </b-row>
    <Promotion
      :promotiontable="promotiondetails"
    />
    <!-- Start promotion -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        @click="visible = !visible"
      >
        <b-row>
          <b-button
            @click="onPress()"
          >
            click
          </b-button>
          <b-icon-x />
          <h5 class="text-white ">
            Đóng
          </h5>
        </b-row>
      </b-button>
    </b-row>
  </b-modal>
  <!-- POPUP Invoice Details End -->
</template>

<script>
import InvoiceDetail from './invoice-detail-modal/InvoiceDetail.vue'
import Discounts from './invoice-detail-modal/Discount.vue'
import Promotion from './invoice-detail-modal/Promotion.vue'

export default {
  components: {
    InvoiceDetail,
    Discounts,
    Promotion,
  },
  props: {
    visible: {
      type: Boolean,
    },
    details: {
      type: Array,
      default: null,
    },
    promotiondetails: {
      type: Array,
      default: null,
    },
    infomation: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      tableDetailValue: null,
      columns: [
        {
          label: 'Mã chương trình voucher',
          field: 'Code',
          sortable: false,
        },
        {
          label: 'Tên chương trình voucher',
          field: 'ProgramName',
          sortable: false,
        },
        {
          label: 'Mã voucher',
          field: 'VoucherCode',
          sortable: false,
        },
        {
          label: 'Tên voucher',
          field: 'VoucherName',
          sortable: false,
        },
        {
          label: 'Số serial',
          field: 'ArchiveExportAmount',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Mệnh giá',
          field: 'Denominations',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thời gian hiệu lực',
          field: 'Time',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Press',
          sortable: false,
        },
      ],
      rows: [
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0002',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '649268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0003',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '54349268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0004',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '4549268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '3549268',
          Denominations: '50,000',
          Time: '01/11/2021 - 30/11/2021',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '43249268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '454268',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
        {
          Code: 'PHVC0001',
          ProgramName: 'PHVC0001',
          VoucherCode: 'HO6FEFV70A',
          VoucherName: 'HO6FEFV70A',
          ArchiveExportAmount: '49368',
          Denominations: '50,000',
          Time: '01/11/2020 - 30/11/2020',
          Press: 'Chỉnh sửa',
        },
      ],
    }
  },
  computed: {

  },
  methods: {
    onPress() {
      console.log(this.details)
      console.log(this.promotiondetails)
      console.log(this.name)
    },
  },
}
</script>
