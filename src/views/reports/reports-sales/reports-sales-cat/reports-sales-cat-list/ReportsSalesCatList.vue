<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <reports-sales-cat-list-search />
    <!-- END - Search -->

    <!-- START - sale receipt list -->
    <div class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Doanh số hóa đơn theo khách hàng
        </strong>
        <b-button
          class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h8 font-weight-bolder height-button-brand-1 align-items-button-center"
          variant="someThing"
          @click="onClickExcelExportButton"
        >
          <b-icon-file-earmark-x-fill class="mr-50" />
          Xuất excel
        </b-button>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
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
    </div>
    <!-- END - sale receipt list -->
  </b-container>
</template>

<script>
import ReportsSalesCatListSearch from './components/ReportsSalesCatListSearch.vue'

export default {
  components: {
    ReportsSalesCatListSearch,
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'customerName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: '01/10/2020',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Tổng cộng',
          field: 'sumTotal',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
      ],
    }
  },
}
</script>
