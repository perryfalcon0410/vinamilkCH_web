<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >

    <!-- START - Search -->
    <reports-customers-non-transactional-list-search />
    <!-- END - Search -->

    <b-form class="bg-white rounded shadow rounded my-1">
      <!-- START - Header -->
      <b-row
        class="justify-content-between border-bottom p-1 mx-0"
        style="padding: 5px 0"
        align-v="center"
      >
        <strong class="text-brand-1">
          Danh sách khách hàng không giao dịch
        </strong>
        <b-button-group>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickPrintButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            In
          </b-button>
          <b-button
            class="btn-brand-1 h9 align-items-button-center rounded ml-1"
            variant="someThing"
            @click="onClickExcelExportButton"
          >
            <b-icon-file-earmark-x-fill class="mr-05" />
            Xuất excel
          </b-button>
        </b-button-group>
      </b-row>
      <!-- END - Header -->

      <!-- START - Table -->
      <b-col class="py-1">
        <vue-good-table
          :columns="columns"
          :rows="customerNonTransRows"
          style-class="vgt-table striped"
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
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

          <!-- START - Pagination -->
          <!-- <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="adjustmentPagination.totalElements"
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
                  Số hàng hiển thị
                </span>
                <b-form-select
                  v-model="paginationData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="adjustmentPagination.totalElements"
                :per-page="paginationData.size"
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
          </template> -->
          <!-- END - Pagination -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->
    </b-form>
  </b-container>
</template>
<script>
// import {
//   mapActions,
//   mapGetters,
// } from 'vuex'
import commonData from '@/@db/common'
// import {
//   formatISOtoVNI,
//   reverseVniDate,
// } from '@core/utils/filter'
// import {
//   resizeAbleTable,
// } from '@core/utils/utils'
import ReportsCustomersNonTransactionalListSearch from './components/ReportsCustomersNonTransactionalListSearch.vue'

export default {
  components: {
    ReportsCustomersNonTransactionalListSearch,
  },
  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      customerNonTransRows: [],
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
          label: 'Điện thoại',
          field: 'phoneNumber',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Ngày sinh',
          field: 'dateOfBirth',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'gender',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },

  computed: {

  },
  watch: {
  },
  mounted() {
  },

  methods: {
  },
}
</script>
