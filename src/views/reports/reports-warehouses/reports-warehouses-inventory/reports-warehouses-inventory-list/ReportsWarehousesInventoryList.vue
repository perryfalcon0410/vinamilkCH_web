<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <list-search />

    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        align-v="center"
      >
        <strong class="text-blue-vinamilk">
          Tồn kho sản phẩm
        </strong>
        <b-button-group>
          <b-button
            class="rounded bg-blue-vinamilk text-white h9 mr-1"
            variant="someThing"
            size="sm"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="rounded bg-blue-vinamilk text-white h9"
            variant="someThing"
            size="sm"
          >
            <b-icon-file-earmark-x-fill />
            Xuất Excel
          </b-button>
        </b-button-group>
      </b-row>
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
              v-if="props.column.field === 'quantity'"
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
    </b-form>
  </b-container>
</template>

<script>
import ListSearch from './components/ListSearch.vue'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      columns: [
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
          field: 'quantity',
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
          label: 'Giá',
          field: 'price',
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
          label: 'Quy cách',
          field: 'specifications',
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
          label: 'Tồn kho min',
          field: 'minInventory',
          sortable: false,
        },
        {
          label: 'Tồn kho max',
          field: 'minInventory',
          sortable: false,
        },
        {
          label: 'Báo cáo',
          field: 'report',
          sortable: false,
        },
      ],
      rows: [
        {
          group: 'E',
          productId: '04AA10',
          productName: 'STT Dâu ADM GOLD 180ml',
          quantity: '1000',
          packetQuantity: '41',
          outpacketQuantity: '16',
          price: '8,400',
          intoPrice: '16,800',
          specifications: 'Thùng 24 hộp',
          store: 'CHGTSP Vinamilk Lê Văn Sỹ',
          chainStore: 'Cao cấp',
          productGroup: '',
          minInventory: '',
          maxInventory: '',
          reports: '',
        },
        {
          group: 'E',
          productId: '04AA10',
          productName: 'STT Dâu ADM GOLD 180ml',
          quantity: '1000',
          packetQuantity: '41',
          outpacketQuantity: '16',
          price: '8,400',
          intoPrice: '16,800',
          specifications: 'Thùng 24 hộp',
          store: 'CHGTSP Vinamilk Lê Văn Sỹ',
          chainStore: 'Cao cấp',
          productGroup: '',
          minInventory: '',
          maxInventory: '',
          reports: '',
        },
      ],
    }
  },
}
</script>
