<template>
  <b-modal
    id="adjustment-modal"
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng điều chỉnh"
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
          >
            Danh sách nhập/xuất hàng
          </strong>

          <b-col
            class="bg-white shadow rounded text-dark table"
          >
            <!-- START - Header -->
            <b-row class="py-1 table-row">
              <b-col
                cols="1"
              />
              <b-col class="pl-11 table-cell-sm ws-nowrap">
                <strong>
                  Số chứng từ
                </strong>
              </b-col>
              <b-col
                class="pl-11 table-cell-sm"
              >
                <strong>
                  Ngày
                </strong>
              </b-col>
              <b-col class="pl-11 table-cell-xl">
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
              class="border-bottom border-white bg-light py-1 cursor-pointer table-row"
              :class="{ 'text-brand-1': current == item.id }"
              @click="selectOrder(item.id,item.adjustmentDate,item.description)"
            >
              <b-col
                cols="1"
                class="table-cell-sm"
              >
                {{ index + 1 }}
              </b-col>
              <b-col
                class="table-cell-sm"
              >
                {{ item.adjustmentCode }}
              </b-col>
              <b-col class="table-cell-sm">
                {{ item.adjustmentDate }}
              </b-col>
              <b-col
                class="text-wrap table-cell-xl"
              >
                {{ item.description }}
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
              :rows="importAdjustmentsDetails"
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

              <!-- START - Row filter -->
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div
                  v-if="props.column.field === 'totalPrice' || 'price' || 'quantity'"
                  class="pr-70"
                >
                  {{ props.formattedRow[props.column.field] }}
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                </div>
              </template>
              <!-- END - Row filter -->
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
        @click="inputAdjustmentConfirm"
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
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_INFO_GETTER,
  // ACTIONS
  GET_IMPORT_ADJUSTMENTS_ACTION,
  GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
  // MUTATIONS
  CLEAR_ADJUST_GRID_VIEW_MUTATION,
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
          thClass: 'text-left ws-nowrap',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left ws-nowrap',
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
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Số lượng',
          field: 'quantity',
          sortable: false,
          type: 'number',
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền (VAT)',
          field: 'totalPrice',
          sortable: false,
          type: 'number',
          thClass: 'text-right ws-nowrap',
          tdClass: 'text-right',
        },
      ],
    }
  },
  computed: {
    importAdjustmentsList() {
      return this.IMPORT_ADJUSTMENTS_GETTER().map(data => ({
        id: data.id,
        adjustmentCode: data.adjustmentCode,
        adjustmentDate: formatISOtoVNI(data.adjustmentDate),
        description: data.description,
      }))
    },
    firstPo() {
      if (this.importAdjustmentsList.length > 0) {
        const obj = {
          id: this.importAdjustmentsList[0].id,
          sysDate: this.importAdjustmentsList[0].adjustmentDate,
          description: this.importAdjustmentsList[0].description,
        }
        return obj
      }
      return null
    },

    importAdjustmentsDetails() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_GETTER().map(data => ({
        licenseNumber: data.licenseNumber,
        productCode: data.productCode,
        productName: data.productName,
        price: this.$formatNumberToLocale(data.price),
        unit: data.unit,
        quantity: this.$formatNumberToLocale(data.quantity),
        totalPrice: this.$formatNumberToLocale(data.totalPrice),
      }))
    },
    importAdjustmentInfo() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_INFO_GETTER()
    },
  },
  watch: {
    importAdjustmentsList() {
      if (this.importAdjustmentsList.length > 0) {
        this.selectOrder(this.firstPo.id, this.firstPo.sysDate, this.firstPo.description)
      } else {
        // will clear grid view if the last po been imported
        this.CLEAR_ADJUST_GRID_VIEW_MUTATION()
      }
    },
  },
  mounted() {
    this.GET_IMPORT_ADJUSTMENTS_ACTION({
      formId: this.formId, // hard code
      ctrlId: this.ctrlId, // hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      IMPORT_ADJUSTMENTS_GETTER,
      IMPORT_ADJUSTMENTS_DETAIL_GETTER,
      IMPORT_ADJUSTMENTS_DETAIL_INFO_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      GET_IMPORT_ADJUSTMENTS_ACTION,
      GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION,
    ]),
    ...mapMutations(WAREHOUSEINPUT, [
      CLEAR_ADJUST_GRID_VIEW_MUTATION,
    ]),
    selectOrder(id, date, description) {
      this.current = id
      this.sysDate = date
      this.note = description
      this.GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId }) // hard code
    },
    inputAdjustmentConfirm() {
      if (this.importAdjustmentsList.length > 0) {
        this.$emit('inputAdjustChange', [this.sysDate, this.importAdjustmentsDetails, this.importAdjustmentInfo, this.current, this.note])
        this.close()
      } else {
        toasts.warning('Bạn cần chọn tối thiểu 1 bản ghi')
      }
    },
    close() {
      this.$bvModal.hide('adjustment-modal')
    },
  },
}
</script>
