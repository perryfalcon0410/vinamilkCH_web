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
        <strong class="text-brand-1">
          Tồn kho sản phẩm
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
            variant="someThing"
            size="sm"
          >
            <b-icon-printer-fill />
            In
          </b-button>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
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
            enabled: true,
            perPage: elementSize,
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
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              class="v-pagination px-1 mx-0"
              align-h="between"
              align-v="center"
            >
              <div
                class="d-flex align-items-center"
              >
                <span
                  class="text-nowrap"
                >
                  Hiển thị 1 đến
                </span>
                <b-form-select
                  v-model="elementSize"
                  size="sm"
                  :options="paginationOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span
                  class="text-nowrap"
                > trong 69 mục </span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="1"
                :per-page="elementSize"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1"
                @input="(value)=>props.pageChanged({currentPage: value})"
              >
                <template slot="prev-text">
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template slot="next-text">
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </b-row>
          </template>
          <!-- START - Column filter -->
        </vue-good-table>
      </b-col>
    </b-form>
  </b-container>
</template>

<script>
import reportData from '@/@db/report'
import ListSearch from './components/ListSearch.vue'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      pageNumber: 1,
      elementSize: 20,
      paginationOptions: reportData.pagination,

      columns: [
        {
          label: 'Ngành hàng',
          field: 'group',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productId',
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
          label: 'Số lượng',
          field: 'quantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng packet',
          field: 'packetQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Số lượng lẻ',
          field: 'outpacketQuantity',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'intoPrice',
          type: 'number',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Quy cách',
          field: 'specifications',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Cửa hàng',
          field: 'store',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Chuỗi cửa hàng',
          field: 'chainStore',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm sản phẩm',
          field: 'productGroup',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tồn kho min',
          field: 'minInventory',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho max',
          field: 'minInventory',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Báo cáo',
          field: 'report',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
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
