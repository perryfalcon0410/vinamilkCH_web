<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <div
        class="m-1 text-primary"
      >
        <strong class="text-brand-1">
          Tìm kiếm
        </strong>
      </div>

      <b-form-row
        class="border-top p-1"
      >
        <!-- START - PO Number -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Số PO"
            label-for="PONumber"
          >
            <b-form-input
              id="PONumber"
              v-model="poNumber"
              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - PO Number -->

        <!-- START - Code group -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Mã nhóm"
            label-for="CodeGroup"
          >
            <b-form-input
              id="CodeGroup"
              v-model="codeGroup"
              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - Code group -->

        <!-- START - From Date Create -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Từ ngày tạo"
            label-for="FromDateCreate"
          >
            <b-form-datepicker
              id="FromDateCreate"
              v-model="fromDateCreate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - From Date Create -->

        <!-- START - To Date Create -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Đến ngày tạo"
            label-for="ToDateCreate"
          >
            <b-form-datepicker
              id="ToDateCreate"
              v-model="toDateCreate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - To Date Create -->

        <!-- START - From Date Ship -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Từ ngày gửi"
            label-for="FromDateShip"
          >
            <b-form-datepicker
              id="FromDateShip"
              v-model="fromDateShip"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - From Date Ship -->

        <!-- START - To Date Ship -->
        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Đến ngày gửi"
            label-for="ToDateShip"
          >
            <b-form-datepicker
              id="ToDateShip"
              v-model="toDateShip"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - To Date Ship -->

        <b-col
          xl
          lg="3"
          md="4"
        >
          <b-form-group
            label="Trạng thái"
            label-for="Status"
          >
            <b-form-select
              id="Status"
              v-model="sttSelected"
              :options="poStatuses"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md="4"
          sm="12"
        >
          <b-form-group
            label="Tìm kiếm"
            label-for="SearchButton"
          >
            <b-button
              id="SearchButton"
              class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
              variant="someThing"
              @click="searchPoList"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>

      </b-form-row>
    </b-form>
    <!-- END - Search -->

    <!-- START - Product  list -->
    <div class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="align-items-center border-bottom p-1">
        <strong
          class="text-brand-1"
        >
          Danh sách PO
        </strong>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        class="py-1"
      >
        <vue-good-table
          id="my-table"
          ref="my-table"
          :columns="columns"
          :rows="rows"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
          }"
        >
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'Feature'"
              align-h="center"
              class="mx-0 my-0"
            >
              <v-icon-manipulation />
            </b-row>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Column -->

          <!-- START - Row -->
          <template
            slot="table-row"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'Feature'"
              align-h="center"
            >
              <b-button
                variant="someThing"
                class="rounded-circle ml-1 p-1"
                @click="onClickOpenPoAuToDetailProduct(props.formattedRow['poAutoNumber'])"
              >
                <b-icon-eye-fill
                  color="#315899"
                />
              </b-button>
            </b-row>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

      <!-- START - Pagination -->
      <div>
        <b-row
          class="v-pagination px-1 mx-0"
          align-h="between"
          align-v="center"
        >
          <div
            class="d-flex align-items-center"
          />
          <b-pagination
            v-model="pageNumber"
            :total-rows="2"
            :per-page="10"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1"
            @input="(value)=>pageChanged({currentPage: value})"
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
      </div>
      <!-- END - Pagination -->

      <!-- START - Group Button -->
      <b-row
        class="my-1 mx-0"
        align-h="center"
      >
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-lg-0"
          variant="someThing"
          @click="onClickApprovePo()"
        >
          <b-icon-check
            scale="2"
            class="mr-1"
          />
          Duyệt
        </b-button>
        <b-button
          class="btn-brand-2 h8 align-items-button-center mt-sm-1 mt-lg-0"
          variant="someThing"
          @click="onClickCancelPo()"
        >
          <b-icon-x-circle
            scale="1.5"
            class="mr-1"
          />
          Hủy đơn
        </b-button>
      </b-row>
    <!-- END - Group Button -->

    </div>
    <!-- END - Product  list -->

    <!-- START - Modal -->
    <po-detail-modal
      :value="poAutoDetailProductNumber"
      :visible="isModalShow"
    />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import VIconManipulation from '@core/components/v-icons/IconManipulation.vue'
import PoAutoService from '@/views/purchases/api-service'
import PoDetailModal from './components/PODetailModal.vue'
import POdata from '../../../@db/purchase'
import {
  PURCHASES,
  // GETTERS
  GET_PO_LIST_GETTER,
  POST_APPROVE_PO_GETTER,
  POST_CANCEL_PO_GETTER,
  // ACTIONS
  GET_PO_LIST_ACTION,
  GET_PO_SEARCH_LIST_ACTION,
  POST_CANCEL_PO_ACTION,
  POST_APPROVE_PO_ACTION,

} from '../store-module/type'

export default {
  components: {
    PoDetailModal,
    VIconManipulation,
  },
  data() {
    return {
      isModalShow: false,
      poAutoDetailProductNumber: 0,
      options: { year: 'numeric', month: '2-digit', day: '2-digit' },
      poNumber: '',
      codeGroup: '',
      newDate: new Date(),
      fromDateCreate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDateCreate: new Date(),
      fromDateShip: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDateShip: new Date(),
      sttSelected: POdata.poStatus[0].value,
      poStatuses: POdata.poStatus,
      poNumberSelectedList: [],
      rows: [],
      pageNumber: 1,
      totalRows: 1,
      columns: [
        {
          label: 'Số PO',
          field: 'poAutoNumber',
          sortable: false,
        },
        {
          label: 'Mã nhóm',
          field: 'groupCode',
          sortable: false,
        },
        {
          label: 'Trạng thái',
          field: 'status',
          sortable: false,
        },
        {
          label: 'Ngày tạo',
          field: 'createAt',
          sortable: false,
        },
        {
          label: 'Ngày gửi',
          field: 'approveDate',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'amount',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'Feature',
          sortable: false,
        },
      ],
    }
  },

  computed: {
    ...mapGetters(PURCHASES, [
      GET_PO_LIST_GETTER,
      POST_APPROVE_PO_GETTER,
      POST_CANCEL_PO_GETTER,
    ]),

    allPoList() {
      return this.GET_PO_LIST_GETTER
    },

    updateList() {
      return this.POST_CANCEL_PO_GETTER
    },
  },

  watch: {
    allPoList() {
      if (this.allPoList.content) {
        this.rows = this.allPoList.content
        this.rows.forEach(n => {
          const objIndex = POdata.poStatus.findIndex((obj => obj.value === n.status))
          n.status = POdata.poStatus[objIndex].text
          n.createAt = new Date(n.createAt)
          let dateString = ('0' + n.createAt.getUTCDate()).slice(-2) + '/'
            + ('0' + n.createAt.getUTCMonth() + 1).slice(-2) + '/'
            + n.createAt.getUTCFullYear() + ' '
            + ('0' + n.createAt.getUTCHours()).slice(-2) + ':'
            + ('0' + n.createAt.getUTCMinutes()).slice(-2) + ':'
            + ('0' + n.createAt.getUTCSeconds()).slice(-2)
          n.createAt = dateString

          n.approveDate = new Date(n.approveDate)
          dateString = ('0' + n.approveDate.getUTCDate()).slice(-2) + '/'
            + ('0' + n.approveDate.getUTCMonth() + 1).slice(-2) + '/'
            + n.approveDate.getUTCFullYear() + ' '
            + ('0' + n.approveDate.getUTCHours()).slice(-2) + ':'
            + ('0' + n.approveDate.getUTCMinutes()).slice(-2) + ':'
            + ('0' + n.approveDate.getUTCSeconds()).slice(-2)
          n.approveDate = dateString
        })

        this.totalRows = this.allPoList.totalElements
      }
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions(PURCHASES, [
      GET_PO_LIST_ACTION,
      GET_PO_SEARCH_LIST_ACTION,
      POST_CANCEL_PO_ACTION,
      POST_APPROVE_PO_ACTION,
    ]),
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-input-update' })
    },
    init() {
      this.page = 1
      this.GET_PO_LIST_ACTION({
        page: this.page - 1,
      })
    },
    searchPoList() {
      this.page = 1
      this.GET_PO_SEARCH_LIST_ACTION({
        poAutoNumber: this.poNumber,
        poGroupCode: this.codeGroup,
        fromCreateDate: this.fromDateCreate.toLocaleString('en-CA', this.options),
        toCreateDate: this.toDateCreate.toLocaleString('en-CA', this.options),
        fromApproveDate: this.fromDateShip.toLocaleString('en-CA', this.options),
        toApproveDate: this.toDateShip.toLocaleString('en-CA', this.options),
        poStatus: this.sttSelected,
        page: (this.page - 1),
      })
    },
    onClickOpenPoAuToDetailProduct(poAutoNumber) {
      this.poAutoDetailProductNumber = poAutoNumber
      this.isModalShow = !this.isModalShow
    },
    onClickCancelPo() {
      this.$refs['my-table'].selectedRows.forEach(n => {
        this.poNumberSelectedList.push(n.poAutoNumber)
      })
      PoAutoService.cancelPoAuto({ poAutoNumberList: this.poNumberSelectedList }).then(res => {
        if (res.data.data === 1) {
          this.GET_PO_LIST_ACTION()
        }
      })
      this.poNumberSelectedList = []
    },
    onClickApprovePo() {
      this.$refs['my-table'].selectedRows.forEach(n => {
        this.poNumberSelectedList.push(n.poAutoNumber)
      })
      PoAutoService.approvePoAUto({ poAutoNumberList: this.poNumberSelectedList }).then(res => {
        if (res.data.data === 1) {
          this.GET_PO_LIST_ACTION()
        }
      })
      this.poNumberSelectedList = []
    },
    pageChanged(value) {
      this.page = value.currentPage
      this.GET_PO_LIST_ACTION({
        page: (this.page - 1),
      })
    },

  },

}
</script>
