<template>
  <!-- START Popup -->
  <b-modal
    id="VoucherModal"
    size="xl"
    title="Chọn voucher"
    title-class="text-uppercase font-weight-bold text-brand-1 d-print-none"
    content-class="bg-white"
    footer-border-variant="white"
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0 d-print-none"
    >
      <b-col class="px-0">
        <strong class="text-brand-1">
          Voucher
        </strong>

        <b-form-row
          class="mt-1"
          @keyup.enter="onClickSearchButton()"
        >
          <b-col
            cols="4"
          >
            <b-input
              v-model="keyword"
              placeholder="Nhập serial voucher"
              :disabled="isLocked"
              @keyup="checkKeywordSearch()"
            />
          </b-col>
          <b-button
            class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
            variant="someThing"
            :disabled="isDisableSearch"
            @click="onClickSearchButton()"
          >
            <b-icon-search
              class="mr-0.5"
            />
            Tìm kiếm
          </b-button>
        </b-form-row>
      </b-col>

      <vue-good-table
        ref="table-voucher"
        :columns="columns"
        :rows="vouchers"
        style-class="vgt-table"
        compact-mode
        line-numbers
        class="my-1"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectionInfoClass: 'custom-class',
          clearSelectionText: 'clear',
          disableSelectInfo: true,
          selectAllByGroup: true,
          multipleColumns: true,
        }"
      >
        <!-- START - Empty rows -->
        <div
          slot="emptystate"
          class="text-center"
        >
          Không có dữ liệu
        </div>
        <!-- END - Empty rows -->
      </vue-good-table>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{}">
      <b-row
        class="mx-auto"
      >
        <b-button
          variant="none"
          class="d-flex align-items-center text-uppercase btn-brand-1 h8"
          @click="onClickChooeseVouchers()"
        >
          Chọn
        </b-button>
        <b-button
          variant="secondary"
          class="ml-1 d-flex align-items-center text-uppercase h8"
          @click="cancel()"
        >
          <b-icon-x
            scale="2"
            class="mr-50"
          />
          Đóng
        </b-button>
      </b-row>
    </template>
  <!-- END - Footer -->
  </b-modal>
  <!-- End Popup -->
</template>

<script>
import toasts from '@/@core/utils/toasts/toasts'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  SALES,
  // GETTERS
  GET_VOUCHER_BY_SERIAL_GETTER,
  // ACTIONS
  GET_VOUCHER_BY_SERIAL_ACTION,
} from '../../store-module/type'

export default {
  components: {
  },

  props: {
    visible: {
      type: Boolean,
    },
    orderProducts: {
      type: Array,
      default: () => [],
    },
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      modalShow: false,
      searchTerm: '',
      columns: [
        {
          label: 'Mã chương trình voucher',
          field: 'programCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên chương trình voucher',
          field: 'programName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã voucher',
          field: 'voucherCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên voucher',
          field: 'voucherName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số serial',
          field: 'serialNumber',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mệnh giá',
          field: 'price',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thời gian hiệu lực',
          field: 'activeTime',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],

      keyword: '',
      formId: 5,
      ctrlId: 7,
      vouchers: [],
      isLocked: false,
      message: '',
      isDisableSearch: false,
    }
  },
  computed: {
    ...mapGetters(SALES, [
      GET_VOUCHER_BY_SERIAL_GETTER,
    ]),

    getVoucher() {
      return this.GET_VOUCHER_BY_SERIAL_GETTER
    },
  },
  watch: {
    getVoucher() {
      const voucher = {
        id: this.getVoucher.id,
        programCode: this.getVoucher.voucherProgramCode,
        programName: this.getVoucher.voucherProgramName,
        voucherCode: this.getVoucher.voucherCode,
        voucherName: this.getVoucher.voucherName,
        serialNumber: this.getVoucher.serial,
        price: this.getVoucher.price,
        activeTime: this.getVoucher.activeTime,
      }
      const indexVoucher = this.vouchers.findIndex(v => v.id === voucher.id)
      if (indexVoucher === -1) {
        this.vouchers.push(voucher)
        this.keyword = ''
      }
    },
  },
  mounted() {
    this.isDisableSearch = true
  },

  methods: {
    ...mapActions(SALES, [
      GET_VOUCHER_BY_SERIAL_ACTION,
    ]),

    onClickSearchButton() {
      const productIds = this.orderProducts.map(item => item.productId)
      if (this.keyword !== '') {
        this.GET_VOUCHER_BY_SERIAL_ACTION({
          data: {
            serial: this.keyword,
            customerId: this.customer.id,
            productIds: productIds.toString(),
            ctrlId: this.ctrlId,
            formId: this.formId,
          },
          onSuccess: () => {

          },
          onFailure: () => {
            this.keyword = ''
            this.isLocked = true
            this.isDisableSearch = true
          },
        })
      }
    },
    onClickChooeseVouchers() {
      if (this.$refs['table-voucher'].selectedRows.length === 0) {
        toasts.error('Bạn chưa chọn Voucher')
      } else {
        this.keyword = ''
        this.vouchers = []
        this.$emit('getVoucherInfo', this.$refs['table-voucher'].selectedRows)
        this.$bvModal.hide('VoucherModal')
      }
    },
    cancel() {
      this.keyword = ''
      this.vouchers = []
      this.$bvModal.hide('VoucherModal')
    },
    checkKeywordSearch() {
      this.isDisableSearch = this.keyword === ''
    },
  },
}
</script>
