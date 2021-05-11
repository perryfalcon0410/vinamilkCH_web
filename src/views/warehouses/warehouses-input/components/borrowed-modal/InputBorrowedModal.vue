<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng vay mượn"
    title-class="text-uppercase font-weight-bold text-primary"
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
            class="bg-white shadow rounded text-dark"
          >
            <!-- START - Header -->
            <b-row class="py-1">
              <b-col cols="1" />
              <b-col>
                <strong>
                  Số chứng từ
                </strong>
              </b-col>
              <b-col>
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
              v-for="(item, index) in importBorrowingslist"
              :key="item.id"
              :class="{ 'text-primary': current == item.id }"
              class="border-bottom border-white bg-light py-1"
              @click="selectOrder(item.id)"
            >
              <b-col cols="1">
                {{ index + 1 }}
              </b-col>
              <b-col>
                {{ item.licenseNumber }}
              </b-col>
              <b-col>
                {{ item.date }}
              </b-col>
              <b-col
                class="text-wrap"
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
              :rows="importBorrowingsDetailList"
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
    <template #modal-footer="{ cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center"
        @click="inputBorrow"
      >
        <b-icon
          icon="download"
          width="20"
          height="20"
          class="mr-1"
        />
        Lưu ĐC
      </b-button>
      <b-button
        variant="secondary"
        class="d-flex align-items-center"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
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
} from 'vuex'
import { formatDateToLocale, formatNumberToLocale } from '@core/utils/filter'
import {
  WAREHOUSEINPUT,
  // GETTERS
  IMPORT_BORROWINGS_GETTER,
  IMPORT_BORROWINGS_DETAIL_GETTER,
  // ACTIONS
  GET_IMPORT_BORROWINGS_ACTION,
  GET_IMPORT_BORROWINGS_DETAIL_ACTION,
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
      current: null,
      columns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
        },
      ],
    }
  },
  computed: {
    importBorrowingslist() {
      return this.IMPORT_BORROWINGS_GETTER().map(data => ({
        id: data.id,
        licenseNumber: data.poBorrowCode,
        date: formatDateToLocale(data.borrowDate),
        note: data.note,
      }))
    },
    firstId() {
      if (this.importBorrowingslist.length > 0) {
        return this.importBorrowingslist[0].id
      }
      return 0
    },
    importBorrowingsDetailList() {
      return this.IMPORT_BORROWINGS_DETAIL_GETTER().map(data => ({
        id: data.id,
        licenseNumber: data.licenseNumber,
        productCode: data.productCode,
        productName: data.productName,
        price: formatNumberToLocale(data.price),
        quantity: data.quantity,
        totalPrice: formatNumberToLocale(data.totalPrice),
      }))
    },
    listImportProduct() {
      return this.IMPORT_BORROWINGS_DETAIL_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        price: formatNumberToLocale(data.price),
        quantity: data.quantity,
        totalPrice: formatNumberToLocale(data.totalPrice),
      }))
    },
  },
  watch: {
    importBorrowingslist() {
      this.selectOrder(this.firstId)
    },
  },
  mounted() {
    this.GET_IMPORT_BORROWINGS_ACTION({
      formId: 5, // hard code
      ctrlId: 7, // hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      IMPORT_BORROWINGS_GETTER,
      IMPORT_BORROWINGS_DETAIL_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_IMPORT_BORROWINGS_ACTION,
      GET_IMPORT_BORROWINGS_DETAIL_ACTION,
    ]),
    hoverHandler(hovered) {
      this.isHover = hovered
    },
    inputBorrow() {
      this.$emit('inputBorrowsChange', [this.importBorrowingsDetailList, false, this.listImportProduct, this.current])
    },
    selectOrder(id) {
      this.current = id
      this.GET_IMPORT_BORROWINGS_DETAIL_ACTION({ id: this.current, formId: 5, ctrlId: 7 })// hard code
    },
  },
}
</script>
