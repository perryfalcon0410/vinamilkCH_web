<template>
  <b-modal
    id="borrowed-modal"
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng vay mượn"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <!-- START - Body -->
    <b-container fluid>
      <b-row class="mx-0 ">
        <!-- START - Import/Export List -->
        <b-col
          xl="4"
          class="d-flex flex-column px-0"
        >
          <strong
            class="text-dark mx-1 mb-1 "
          >Danh sách nhập/xuất hàng
          </strong>

          <b-col
            class="bg-white shadow rounded text-dark table my-0"
          >
            <!-- START - Header -->
            <b-row class="py-1 table-row">
              <b-col cols="1" />
              <b-col class="px-50 ws-nowrap">
                <strong>
                  Số chứng từ
                </strong>
              </b-col>
              <b-col class="px-25">
                <strong>
                  Ngày
                </strong>
              </b-col>
              <b-col>
                <strong>
                  Ghi chú
                </strong>
              </b-col>
            </b-row>
            <!-- END - Header -->

            <!-- START - List -->
            <b-row
              v-for="(item, index) in importBorrowings"
              :key="item.id"
              :class="{ 'text-brand-1': current === item.id }"
              class="border-bottom border-white py-1 cursor-pointer"
              @click="selectOrder(item.id,item.borrowDate,item.note)"
            >
              <b-col
                cols="1"
              >
                {{ index + 1 }}
              </b-col>
              <b-col class="px-50">
                {{ item.poBorrowCode }}
              </b-col>
              <b-col class="px-50">
                {{ item.borrowDate }}
              </b-col>
              <b-col
                class="px-50"
              >
                {{ item.note }}
              </b-col>
            </b-row>
            <!-- END - List -->
          </b-col>
        </b-col>
        <!-- END -  Import/Export List -->

        <!-- START -  Import/Export Detail -->
        <b-col class="d-flex flex-column  px-0 ml-xl-1 mt-1 mt-xl-0">
          <strong
            class="text-dark mb-1 mx-1"
          >Chi tiết nhập/xuất hàng
          </strong>

          <b-col
            class="bg-white rounded shadow py-1"
          >
            <vue-good-table
              :columns="columns"
              :rows="importBorrowingsDetail"
              style-class="vgt-table bordered"
              compact-mode
              line-numbers
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
          </b-col>
        </b-col>
        <!-- END -  Import/Export Detail -->

      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{}">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-center"
        variant="someThing"
        @click="inputBorrow"
      >
        <b-icon
          icon="download"
        />
        Lưu ĐC
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
        @click="close"
      >
        <b-icon
          icon="x"
          scale="1.5"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->

  </b-modal>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
import { formatISOtoVNI } from '@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
import {
  WAREHOUSEINPUT,
  // GETTERS
  IMPORT_BORROWINGS_GETTER,
  IMPORT_BORROWINGS_DETAILS_GETTER,
  // ACTIONS
  GET_IMPORT_BORROWINGS_ACTION,
  GET_IMPORT_BORROWINGS_DETAIL_ACTION,
  // MUTATIONS
  CLEAR_BORROW_GRID_VIEW_MUTATION,
} from '../../store-module/type'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      //
      formId: 5,
      ctrlId: 7,
      //
      sysDate: null,
      current: null,
      note: '',
      columns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giá (VAT)',
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(WAREHOUSEINPUT, [
      IMPORT_BORROWINGS_GETTER,
      IMPORT_BORROWINGS_DETAILS_GETTER,
    ]),
    importBorrowings() {
      return this.IMPORT_BORROWINGS_GETTER.map(data => ({
        id: data.id,
        poBorrowCode: data.poBorrowCode,
        borrowDate: formatISOtoVNI(data.borrowDate),
        note: data.note,
      }))
    },
    firstPo() {
      if (this.importBorrowings.length > 0) {
        const obj = {
          id: this.importBorrowings[0].id,
          sysDate: this.importBorrowings[0].borrowDate,
          description: this.importBorrowings[0].note,

        }
        return obj
      }
      return null
    },
    importBorrowingsDetail() {
      if (this.IMPORT_BORROWINGS_DETAILS_GETTER.response) {
        return this.IMPORT_BORROWINGS_DETAILS_GETTER.response.map(data => ({
          licenseNumber: data.licenseNumber,
          productCode: data.productCode,
          productName: data.productName,
          price: this.$formatNumberToLocale(data.price),
          unit: data.unit,
          quantity: data.quantity,
          totalPrice: this.$formatNumberToLocale(data.totalPrice),
        }))
      }
      return []
    },
    importBorrowingInfo() {
      if (this.IMPORT_BORROWINGS_DETAILS_GETTER.info) {
        return this.IMPORT_BORROWINGS_DETAILS_GETTER.info
      }
      return {}
    },
  },
  watch: {
    importBorrowings() {
      if (this.importBorrowings.length > 0) {
        this.selectOrder(this.firstPo.id, this.firstPo.sysDate)
      } else {
        this.CLEAR_BORROW_GRID_VIEW_MUTATION()
      }
    },
  },
  mounted() {
    this.GET_IMPORT_BORROWINGS_ACTION({
      formId: this.formId, // hard code
      ctrlId: this.ctrlId, // hard code
    })
  },
  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_IMPORT_BORROWINGS_ACTION,
      GET_IMPORT_BORROWINGS_DETAIL_ACTION,
    ]),
    ...mapMutations(WAREHOUSEINPUT, [
      CLEAR_BORROW_GRID_VIEW_MUTATION,
    ]),
    inputBorrow() {
      if (this.importBorrowings.length > 0) {
        this.$emit('inputBorrowsChange', [this.sysDate, this.importBorrowingsDetail, this.importBorrowingInfo, this.current, this.note])
        this.close()
      } else {
        toasts.warning('Bạn cần chọn tối thiểu 1 bản ghi')
      }
    },
    selectOrder(id, date, description) {
      this.current = id
      this.sysDate = date
      this.note = description
      this.GET_IMPORT_BORROWINGS_DETAIL_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId })// hard code
    },
    close() {
      this.$bvModal.hide('borrowed-modal')
    },
  },
}
</script>
