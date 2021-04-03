<template>
  <!-- START Popup -->
  <b-modal
    size="xl"
    title="Thông tin chi tiết đơn hàng"
    :visible="visible"
    hide-footer="true"
  >
    <!-- Start Header -->
    <b-row>
      <b-col
        cols="6"
        md="4"
        class="px-2"
      >
        <b-row>
          <b-col cols="4">
            Ngày mua hàng:
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            27/10/2020
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="4">
            Khách hàng:
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            Nguyễn Xuân Diễm
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="4">
            Lý do trả hàng :
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            Hàng hỏng
          </b-col>
        </b-row>
      </b-col>
      <b-col
        cols="12"
        md="8"
      >
        <b-row>
          <b-col cols="3">
            Ngày trả hàng:
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            29/10/2020 lúc 16:16
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="3">
            Nhân viên bán hàng:
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            Ngô Thị Lan Hương
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col cols="3">
            Thông tin phản hồi :
          </b-col>
          <b-col
            class="font-weight-bold"
            cols="6"
          >
            <b-form-textarea />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End Header -->

    <!-- Start Table -->
    <b-tabs
      card
      class="mt-2"
    >
      <b-tab
        title="Sản phẩm"
        active
      >
        <b-card-text>
          <Product />
        </b-card-text>
      </b-tab>
      <b-tab
        title="Hàng khuyến mãi"
      >
        <b-card-text>
          <SaleOff />
        </b-card-text>
      </b-tab>
    </b-tabs>
    <!-- End Table -->

  </b-modal>
  <!-- End Popup -->
</template>

<script>
import Product from './order-details-modal/Product.vue'
import SaleOff from './order-details-modal/SaleOff.vue'

export default {
  components: {
    Product,
    SaleOff,
  },
  props: {
    visible: {
      type: Boolean,
    },

  },
  data() {
    return {
      modalShow: false,
      searchTerm: '',
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
    },
  },
}
</script>
