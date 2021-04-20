<template>
  <!-- START Popup -->
  <b-modal
    id="VoucherModal"
    size="xl"
    :visible="visible"
    title="Chọn voucher"
    title-class="text-uppercase font-weight-bold text-primary"
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
        <strong>
          Voucher
        </strong>

        <b-row class="mt-1">
          <b-col
            cols="4"
          >
            <b-input placeholder="Nhập mã/ tên/ serial" />
          </b-col>
          <b-button variant="primary">
            <b-icon-search
              class="mr-1"
              scale="1.3"
            />
            Tìm kiếm
          </b-button>
        </b-row>
      </b-col>

      <vue-good-table
        :columns="columns"
        :rows="vouchers"
        style-class="vgt-table"
        compact-mode
        line-numbers
        class="my-1"
      >
        <!-- START - Row -->
        <template
          slot="table-row"
          slot-scope="props"
        >
          <div v-if="props.column.field === 'Manipulation'">
            <b-button variant="primary">
              <b-icon-hand-index-thumb
                class="mr-1"
                scale="1.3"
              />
              Chọn
            </b-button>
          </div>
          <div v-else>
            {{ props.formattedRow[props.column.field] }}
          </div>
        </template>
        <!-- END - Row -->
      </vue-good-table>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-row
        class="mx-auto"
      >
        <b-button
          variant="secondary"
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
import {
  SALES,
  // GETTERS
  VOUCHERS_GETTER,
  // ACTIONS
  GET_VOUCHERS_ACTION,
} from '../../store-module/type'

export default {
  components: {
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
          field: 'ProgramCode',
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
          field: 'SerialNumber',
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
          field: 'EffectiveTime',
          sortable: false,
        },
        {
          label: '',
          field: 'Manipulation',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    vouchers() {
      return this.VOUCHERS_GETTER().map(data => ({
        id: data.id,
        ProgramCode: data.voucherProgramCode,
        ProgramName: data.voucherProgramName,
        VoucherCode: data.voucherCode,
        VoucherName: data.voucherName,
        SerialNumber: data.serial,
        Denominations: data.price,
        EffectiveTime: data.activeTime,
        Manipulation: null,
      }))
    },
  },

  mounted() {
    this.GET_VOUCHERS_ACTION({})
  },

  methods: {
    ...mapGetters(SALES, [
      VOUCHERS_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_VOUCHERS_ACTION,
    ]),

  },
}
</script>
