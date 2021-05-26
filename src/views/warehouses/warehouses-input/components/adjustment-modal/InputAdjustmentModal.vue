<template>
  <b-modal
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
              v-for="(item, index) in importAdjustments"
              :key="item.id"
              class="border-bottom border-white bg-light py-1"
              :class="{ 'text-brand-1': current == item.id }"
              @click="selectOrder(item.id,item.date)"
            >
              <b-col cols="1">
                {{ index + 1 }}
              </b-col>
              <b-col>
                {{ item.adjustmentCode }}
              </b-col>
              <b-col>
                {{ item.adjustmentDate }}
              </b-col>
              <b-col
                class="text-wrap"
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
              :rows="importAdjustmentsDetail"
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
              <template
                slot="column-filter"
                slot-scope="props"
              >
                <b-row
                  v-if="props.column.field === 'adjustQuantity'"
                  class="mx-0"
                  align-h="end"
                >
                  {{ importAdjustmentInfo.totalQuantity }}
                </b-row>
              </template>
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
        variant="someThing"
        @click="cancel()"
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
} from 'vuex'
import { formatISOtoVNI } from '@core/utils/filter'
import toasts from '@core/utils/toasts/toasts'
// eslint-disable-next-line no-unused-vars
import commonData from '@/@db/common'
import {
  WAREHOUSEINPUT,
  // GETTER
  IMPORT_ADJUSTMENTS_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_GETTER,
  IMPORT_ADJUSTMENTS_DETAIL_INFO_GETTER,
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
      //
      formId: 5,
      ctrlId: 7,
      //
      sysDate: null,
      current: null,
      columns: [
        {
          label: 'Số chứng từ',
          field: 'licenseNumber',
          sortable: false,
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
          label: 'Giá',
          field: 'price',
          sortable: false,
          type: 'number',
          thClass: 'text-right',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng',
          field: 'adjustQuantity',
          sortable: false,
          type: 'number',
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Thành tiền',
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
    importAdjustments() {
      return this.IMPORT_ADJUSTMENTS_GETTER().map(data => ({
        id: data.id,
        adjustmentCode: data.adjustmentCode,
        adjustmentDate: formatISOtoVNI(data.adjustmentDate),
        description: data.description,
      }))
    },
    firstPo() {
      if (this.importAdjustments.length > 0) {
        const obj = {
          id: this.importAdjustments[0].id,
          sysDate: this.importAdjustments[0].adjustmentDate,
        }
        return obj
      }
      return null
    },

    importAdjustmentsDetail() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_GETTER().map(data => ({
        licenseNumber: data.licenseNumber,
        productCode: data.productCode,
        productName: data.productName,
        price: this.$formatNumberToLocale(data.price),
        quantity: data.quantity,
        totalPrice: this.$formatNumberToLocale(data.totalPrice),
      }))
    },
    importAdjustmentInfo() {
      return this.IMPORT_ADJUSTMENTS_DETAIL_INFO_GETTER()
    },
  },
  watch: {
    importAdjustments() {
      if (this.importAdjustments.length > 0) {
        this.selectOrder(this.firstPo.id, this.firstPo.sysDate)
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
    selectOrder(id, date) {
      this.current = id
      this.sysDate = date
      this.GET_IMPORT_ADJUSTMENTS_DETAIL_ACTION({ id: this.current, formId: this.formId, ctrlId: this.ctrlId }) // hard code
    },
    inputAdjustmentConfirm() {
      if (this.importAdjustments.length > 0) {
        this.$emit('inputAdjustChange', [this.sysDate, this.importAdjustmentsDetail, this.importAdjustmentInfo, this.current])
        this.$emit('close')
      } else {
        toasts.warning('Bạn cần chọn tối thiểu 1 bản ghi')
      }
    },
    cancel() {
      this.$emit('close')
    },
  },
  // ---------------------------------- all seacrch funtion ----------------------------------
  // ---------------------------------- all seacrch funtion ----------------------------------
}
</script>
