<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng điều chỉnh"
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
              v-for="(item, index) in importAdjustmentsList"
              :key="item.id"
              class="border-bottom border-white bg-light py-1"
              :class="{ 'text-brand-1': current == item.id }"
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
              :rows="importAdjustmentsDetailList"
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
        @click="inputAdjustmentConfirm"
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
  // GETTER
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_GETTER,
  // ACTION
  GET_IMPORT_ADJUSTMENTS_ACTION,
  GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
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
    importAdjustmentsList() {
      return this.IMPORT_ADJUSTMENTS_GETTER().map(data => ({
        id: data.id,
        licenseNumber: data.adjustmentCode,
        date: formatDateToLocale(data.adjustmentDate),
        status: data.status,
      }))
    },
    firstId() {
      if (this.importAdjustmentsList[0]) {
        return this.importAdjustmentsList[0].id
      }
      return 0
    },
    importAdjustmentsDetailList() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_GETTER().map(data => ({
        id: data.id,
        productCode: data.productCode,
        productName: data.productName,
        price: formatNumberToLocale(data.price),
        quantity: data.quantity,
        licenseNumber: data.licenseNumber,
        totalPrice: formatNumberToLocale(data.totalPrice),
      }))
    },
    listImportProduct() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_GETTER().map(data => ({
        productCode: data.productCode,
        productName: data.productName,
        price: formatNumberToLocale(data.price),
        quantity: data.quantity,
        totalPrice: formatNumberToLocale(data.totalPrice),
      }))
    },
  },
  watch: {
    importAdjustmentsList() {
      this.selectOrder(this.firstId)
    },
  },
  mounted() {
    this.GET_IMPORT_ADJUSTMENTS_ACTION({
      formId: 5, // hard code
      ctrlId: 7, // hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      IMPORT_ADJUSTMENTS_GETTER,
      IMPORT_ADJUSTMENTS_DETAIL_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_IMPORT_ADJUSTMENTS_ACTION,
      GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
    ]),
    hoverHandler(hovered) {
      this.isHover = hovered
    },
    selectOrder(id) {
      this.current = id
      this.GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION({ id: this.current, formId: 5, ctrlId: 7 }) // hard code
    },
    inputAdjustmentConfirm() {
      this.$emit('inputAdjustChange', [this.importAdjustmentsDetailList, false, this.listImportProduct, this.current])
    },
  },
}
</script>
