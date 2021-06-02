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
        :columns="columns"
        :rows="vouchers"
        style-class="vgt-table"
        compact-mode
        line-numbers
        class="my-1"
      >
        <!-- START - Empty rows -->
        <div
          slot="emptystate"
          class="text-center"
        >
          Không có dữ liệu
        </div>
        <!-- END - Empty rows -->

        <!-- START - Row -->
        <template
          slot="table-row"
          slot-scope="props"
        >
          <div v-if="props.column.field === 'Manipulation'">
            <b-button
              class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
              variant="someThing"
              @click="getVoucherInfo(props.row.id)"
            >
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
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên chương trình voucher',
          field: 'ProgramName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã voucher',
          field: 'VoucherCode',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tên voucher',
          field: 'VoucherName',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số serial',
          field: 'SerialNumber',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mệnh giá',
          field: 'Denominations',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thời gian hiệu lực',
          field: 'EffectiveTime',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: '',
          field: 'Manipulation',
          sortable: false,
        },
      ],

      keyword: null,
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
  },

  methods: {
    ...mapGetters(SALES, [
      VOUCHERS_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_VOUCHERS_ACTION,
    ]),

    getVoucherInfo(id) {
      this.$emit('getVoucherInfo', id)
      this.$root.$emit('bv::hide::modal', 'VoucherModal')
    },

    onClickSearchButton() {
      const searchData = {
        keyWord: this.keyword.trim(),
        formId: 5, // Hard code
        ctrlId: 7, // Hard code
      }
      this.GET_VOUCHERS_ACTION(searchData)
    },
  },
}
</script>
