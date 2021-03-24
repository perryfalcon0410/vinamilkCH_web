<template>
  <!-- POPUP Invoice Details START -->
  <b-modal
    size="xl"
    title="Chi tiết hóa đơn"
    :visible="visible"
    hide-footer="true"
  >
    <!-- <div> -->
    <!-- <b-card no-body> -->
    <b-tabs card>
      <b-tab
        title="Chi tiết hóa đơn"
        active
      >
        <b-card-text>
          <InvoiceDetail />
        </b-card-text>
      </b-tab>
      <b-tab title="Thông tin thanh toán">
        <b-card-text>
          <BillingInformation />
        </b-card-text>
      </b-tab>
      <b-tab title="Giảm giá & chiết khấu">
        <b-card-text>
          <DiscountsDiscounts />
        </b-card-text>
      </b-tab>
      <b-tab title="Khuyến mãi">
        <b-card-text>
          <Promotion />
        </b-card-text>
      </b-tab>
    </b-tabs>
    <!-- </b-card> -->
    <!-- </div> -->

    <b-row
      align-h="center"
      class="mt-2"
    >
      <b-button
        @click="visible = !visible"
      >
        <b-row>
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
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import Vue from 'vue'
import InvoiceDetail from './invoice-detail/InvoiceDetail.vue'
import BillingInformation from './invoice-detail/BillingInformation.vue'
import DiscountsDiscounts from './invoice-detail/DiscountsDiscounts.vue'
import Promotion from './invoice-detail/Promotion.vue'

Vue.use(VueGoodTablePlugin)

export default {
  components: {
    InvoiceDetail,
    BillingInformation,
    DiscountsDiscounts,
    Promotion,
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
