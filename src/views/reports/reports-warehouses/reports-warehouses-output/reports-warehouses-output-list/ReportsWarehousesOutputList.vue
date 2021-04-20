<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Search -->
    <reports-warehouses-output-list-search />
    <!-- END - Search -->

    <!-- START - Report Output list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-primary">
          Danh sách phiếu xuất hàng
        </strong>
        <b-button-group>
          <b-button
            class="rounded"
            variant="primary"
            @click="onClickPrintExportButton"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="ml-1 rounded"
            variant="primary"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true
          }"
          compact-mode
          line-numbers
        >
          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.label === 'Chức năng'">
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'feature'">
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="navigateToUpdate(props.row.id)"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->
          <!-- START - Column filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'Quantity'"
              class="mx-0"
              align-h="end"
            >
              506,000
            </b-row>

            <b-row
              v-else-if="props.column.field === 'packetQuantity'"
              class="mx-0"
              align-h="end"
            >
              182,580
            </b-row>
            <b-row
              v-else-if="props.column.field === 'outpacketQuantity'"
              class="mx-0"
              align-h="end"
            >
              6,824
            </b-row>
            <b-row
              v-else-if="props.column.field === 'intoPrice'"
              class="mx-0"
              align-h="end"
            >
              0
            </b-row>
            <b-row
              v-else-if="props.column.field === 'finalPrice'"
              class="mx-0"
              align-h="end"
            >
              3,852,069,000
            </b-row>
          </template>
          <!-- START - Column filter -->

        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Report Output list -->
  </b-container>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { getGenderLabel } from '@core/utils/utils'
import { formatIsoDateToVNI } from '@core/utils/filter'
import ReportsWarehousesOutputListSearch from './components/ReportsWarehousesOutputListSearch.vue'

export default {
  components: {
    ReportsWarehousesOutputListSearch,
  },
  data() {
    return {
      isShowDeleteModal: false,
      columns: [
        {
          label: 'Ngày xuất',
          field: 'transDate',
          sortable: false,
        },
        {
          label: 'Loại xuất',
          field: 'transType',
          sortable: false,
        },
        {
          label: 'Số hóa đơn',
          field: 'billNumber',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Số PO',
          field: 'poNumber',
          sortable: false,
        },
        {
          label: 'Số nội bộ',
          field: 'internalNumber',
          sortable: false,
        },
        {
          label: 'Ngày hóa đơn',
          field: 'recieptDate',
          sortable: false,
        },
        {
          label: 'Ngành hàng',
          field: 'group',
          sortable: false,
        },
        {
          label: 'Mã sản phẩm',
          field: 'productId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số lượng lẻ',
          field: 'outpacketQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá trước thế',
          field: 'preTaxPrice',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'intoPrice',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Giá sau thuế',
          field: 'afTaxPrice',
          sortable: false,
        },
        {
          label: 'Tổng cộng',
          field: 'finalPrice',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Quy cách',
          field: 'specifications',
          sortable: false,
        },
        {
          label: 'Mã nhập hàng',
          field: 'importId',
          sortable: false,
        },
        {
          label: 'Cửa hàng',
          field: 'store',
          sortable: false,
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'chainStore',
          sortable: false,
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
        },
        {
          label: 'Ghi chú',
          field: 'note',
          sortable: false,
        },
        {
          label: 'Số đơn nhập PO',
          field: 'poNo',
          sortable: false,
        },
      ],
      rows: [
        {
          transDate: '01/10/2020',
          transType: 'Xuất điều chỉnh',
          billNumber: 'SAL.BH40011.20102100001',
          poNumber: '',
          internalNumber: 'EDC.BN40011.20.00001',
          recieptDate: '01/10/2020',
          group: 'E',
          productId: '04AA10',
          productName: 'STT dâu ADM GOLD 180ml',
          Quantity: '1000',
          packetQuantity: '1,000',
          outpacketQuantity: '41',
          preTaxPrice: '',
          intoPrice: '0',
          afTaxPrice: '33,000',
          finalPrice: '33,000,000',
          specifications: 'Thùng 24 hộp',
          importId: 'DCG_0000341',
          store: 'CHGTSP Vinamilk Lê Văn Sỹ',
          chainStore: 'Cao cấp',
          productGroup: '',
          note: '',
          poNo: '',
        },
        {
          transDate: '01/10/2020',
          transType: 'Xuất điều chỉnh',
          billNumber: 'SAL.BH40011.20102100001',
          poNumber: '',
          internalNumber: 'EDC.BN40011.20.00001',
          recieptDate: '01/10/2020',
          group: 'E',
          productId: '04AA10',
          productName: 'STT dâu ADM GOLD 180ml',
          Quantity: '1000',
          packetQuantity: '1,000',
          outpacketQuantity: '41',
          preTaxPrice: '',
          intoPrice: '0',
          afTaxPrice: '33,000',
          finalPrice: '33,000,000',
          specifications: 'Thùng 24 hộp',
          importId: 'DCG_0000341',
          store: 'CHGTSP Vinamilk Lê Văn Sỹ',
          chainStore: 'Cao cấp',
          productGroup: '',
          note: '',
          poNo: '',
        },
        {
          transDate: '01/10/2020',
          transType: 'Xuất điều chỉnh',
          billNumber: 'SAL.BH40011.20102100001',
          poNumber: '',
          internalNumber: 'EDC.BN40011.20.00001',
          recieptDate: '01/10/2020',
          group: 'E',
          productId: '04AA10',
          productName: 'STT dâu ADM GOLD 180ml',
          Quantity: '1000',
          packetQuantity: '1,000',
          outpacketQuantity: '41',
          preTaxPrice: '',
          intoPrice: '0',
          afTaxPrice: '33,000',
          finalPrice: '33,000,000',
          specifications: 'Thùng 24 hộp',
          importId: 'DCG_0000341',
          store: 'CHGTSP Vinamilk Lê Văn Sỹ',
          chainStore: 'Cao cấp',
          productGroup: '',
          note: '',
          poNo: '',
        },
      ],
    }
  },
  computed: {
    customers() {
      return this.CUSTOMERS_GETTER().map(data => ({
        id: data.id,
        code: data.customerCode,
        fullName: `${data.lastName} ${data.firstName}`,
        phoneNumber: data.mobiPhone,
        birthDay: formatIsoDateToVNI(data.dob),
        gender: getGenderLabel(data.genderId),
        status: this.resolveStatus(data.status),
        group: data.customerType,
        date: formatIsoDateToVNI(data.createdAt),
        feature: '',
      }))
    },
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION({})
  },
  methods: {
    navigateToCreate() {
      this.$router.push({ name: 'sales-customers-create' })
    },
    navigateToUpdate(id) {
      this.$router.push({
        name: 'sales-customers-update',
        params: {
          id,
        },
      })
    },
    onClickExcelExportButton() {
    },
    onClickPrintExportButton() {
    },
  },
}
</script>
