<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - search -->
    <list-search />
    <!-- END - search -->

    <!-- START - Voucher list -->
    <b-form class="v-search bg-white rounded shadow rounded my-1 d-print-none">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom px-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách voucher đã sử dụng
        </strong>
        <b-button-group>
          <b-button
            class="shadow-brand-1 ml-1 rounded bg-brand-1 text-white h9 font-weight-bolder height-button-brand-1 align-items-button-center"
            variant="someThing"
            @click="exportReport"
          >
            <b-icon-file-earmark-x-fill class="mr-50" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          mode="remote"
          :rows="rows"
        />
      </b-col>
      <!-- END - Table -->
    </b-form>
    <!-- END - Voucher list -->
  </b-container>
</template>

<script>
import ListSearch from '../components/ListSearch.vue'

export default {
  components: {
    ListSearch,
  },
  data() {
    return {
      rows: [],
      columns: [
        {
          label: 'Mã cửa hàng',
          field: 'storeCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã chương trình voucher',
          field: 'voucherProgramCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên chương trình voucher',
          field: 'voucherProgramName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mã voucher',
          field: 'voucherCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên voucher',
          field: 'voucherName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Serial',
          field: 'serial',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Mệnh giá',
          field: 'price',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Người chuyển cửa hàng',
          field: 'author',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Khách hàng sử dụng',
          field: 'customerUsed',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Đơn hàng sử dụng',
          field: 'orderUsed',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Cửa hàng sử dụng',
          field: 'storeOrdered',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sử dụng',
          field: 'dateUsed',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Doanh số',
          field: 'sales',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'function',
          field: 'function',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
}
</script>
