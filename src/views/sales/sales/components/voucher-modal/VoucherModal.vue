<template>
  <!-- START Popup -->
  <b-modal
    id="VoucherModal"
    size="xl"
    title="Chọn voucher"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-white"
    footer-border-variant="white"
    hide-header-close
  >
    <!-- START - Body -->
    <b-container
      fluid
      class="px-0"
    >
      <b-col class="px-0">
        <strong class="text-brand-1">
          Voucher
        </strong>

        <b-form-row
          class="mt-1"
          @keyup.enter="onClickSearchButton"
        >
          <b-col
            cols="4"
          >
            <b-input
              v-model="keyword"
              placeholder="Nhập mã/ tên/ serial"
              :disabled="isLocked"
            />
          </b-col>
          <b-button
            class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
            variant="someThing"
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
    <template #modal-footer="{ cancel }">
      <b-row
        class="mx-auto"
      >
        <b-button
          variant="none"
          class="d-flex align-items-center text-uppercase btn-brand-1"
          @click="onClickChooeseVouchers()"
        >
          Chọn
        </b-button>
        <b-button
          variant="none"
          class="d-flex align-items-center text-uppercase"
          @click="cancel()"
        >
          <b-icon-x
            scale="2"
            class="mr-1"
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
import {
  mapActions,
  mapGetters,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
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
          field: 'poucherCode',
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
      this.isLocked = this.getVoucher.isLocked
      this.message = this.getVoucher.message
      if (this.isLocked) {
        toasts.error(this.message)
      } else {
        this.vouchers.push(voucher)
      }
    },
  },
  mounted() {
  },

  methods: {
    ...mapActions(SALES, [
      GET_VOUCHER_BY_SERIAL_ACTION,
    ]),

    // getVoucherInfo(id) {
    //   this.$emit('getVoucherInfo', id)
    //   this.$root.$emit('bv::hide::modal', 'VoucherModal')
    // },

    onClickSearchButton() {
      const productIds = this.orderProducts.map(item => item.productId)
      const paramsGetVoucherBySerial = {
        serial: this.keyword,
        customerId: this.customer.id,
        productIds: productIds.toString(),
        ctrlId: this.ctrlId,
        formId: this.formId,
      }

      this.GET_VOUCHER_BY_SERIAL_ACTION(paramsGetVoucherBySerial)
    },
    onClickChooeseVouchers() {
      this.$emit('getVoucherInfo', this.$refs['table-voucher'].selectedRows)
      this.$root.$emit('bv::hide::modal', 'VoucherModal')
    },
  },
}
</script>
