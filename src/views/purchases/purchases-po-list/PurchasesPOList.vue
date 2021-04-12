<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <div
        class="m-1 text-primary"
      >
        <strong>
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
              v-model="status"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="1">
                Chưa duyệt
              </b-form-select-option>
              <b-form-select-option value="2">
                Đã gửi
              </b-form-select-option>
              <b-form-select-option value="3">
                Đã hủy
              </b-form-select-option>
            </b-form-select>
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
              variant="primary"
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
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="align-items-center border-bottom p-1">
        <strong
          class="text-primary"
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
          @on-selected-rows-change="onSelectionChanged"
        >
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <b-row
              v-if="props.column.field === 'Feature'"
              align-h="center"
              class="mx-0"
            >
              <b-icon-bricks />
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
                variant="light"
                class="rounded-circle p-1 ml-1"
              >
                <b-icon-file-earmark-excel
                  color="blue"
                />
              </b-button>
              <b-button
                variant="light"
                class="rounded-circle ml-1 p-1"
                @click="isModalShow = !isModalShow"
              >
                <b-icon-eye-fill
                  color="blue"
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

      <!-- START - Group Button -->
      <b-row
        class="my-1 mx-0"
        align-h="center"
      >
        <b-button
          variant="primary"
        >
          <b-icon-check
            scale="2"
            class="mr-1"
          />
          Duyệt
        </b-button>
        <b-button
          class="mx-1"
          variant="danger"
        >
          <b-icon-x-circle
            scale="1.5"
            class="mr-1"
          />

          Đóng
        </b-button>
      </b-row>
    <!-- END - Group Button -->

    </b-form>
    <!-- END - Product  list -->

    <!-- START - Modal -->
    <po-detail-modal :visible="isModalShow" />
    <!-- END - Modal -->
  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import toasts from '@core/utils/toasts/toasts'
import PoDetailModal from './components/PODetailModal.vue'

export default {
  components: {
    VueGoodTable,
    PoDetailModal,
  },
  data() {
    return {
      isModalShow: false,

      poNumber: '',
      codeGroup: '',
      fromDateCreate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDateCreate: new Date(),
      fromDateShip: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDateShip: new Date(),
      status: '',

      columns: [
        {
          label: 'Số PO',
          field: 'PoNumber',
          sortable: false,
        },
        {
          label: 'Mã nhóm',
          field: 'GroupCode',
          sortable: false,
        },
        {
          label: 'Trạng thái',
          field: 'Status',
          sortable: false,
        },
        {
          label: 'Ngày tạo',
          field: 'DateCreate',
          sortable: false,
        },
        {
          label: 'Ngày gửi',
          field: 'DateShip',
          sortable: false,
        },
        {
          label: 'Tổng tiền',
          field: 'TotalPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thao tác',
          field: 'Feature',
          sortable: false,
        },
      ],
      rows: [
        {
          PoNumber: 'PO000000000628',
          GroupCode: 'GROUP_NON_POAUTO_GROUP ',
          Status: 'Đã hủy',
          DateCreate: '31/10/2020 11:06:19',
          DateShip: '23/11/2020 11:06:20',
          TotalPrice: '2,046,840,000',
          Feature: 'Chỉnh sửa',
        },
        {
          PoNumber: 'PO000000000628',
          GroupCode: 'GROUP_NON_POAUTO_GROUP ',
          Status: 'Đã gửi',
          DateCreate: '31/10/2020 11:06:19',
          DateShip: '23/11/2020 11:06:20',
          TotalPrice: '2,046,840,000',
          Feature: 'Chỉnh sửa',
        },
        {
          PoNumber: 'PO000000000628',
          GroupCode: 'GROUP_NON_POAUTO_GROUP ',
          Status: 'Đã gửi',
          DateCreate: '31/10/2020 11:06:19',
          DateShip: '23/11/2020 11:06:20',
          TotalPrice: '2,046,840,000',
          Feature: 'Chỉnh sửa',
        },
        {
          PoNumber: 'PO000000000628',
          GroupCode: 'GROUP_NON_POAUTO_GROUP ',
          Status: 'Đã gửi',
          DateCreate: '31/10/2020 11:06:19',
          DateShip: '23/11/2020 11:06:20',
          TotalPrice: '2,046,840,000',
          Feature: 'Chỉnh sửa',
        },
      ],
    }
  },

  methods: {
    onSelectionChanged(params) {
      if (params.selectedRows.map(e => e.Status === 'Đã hủy')[0]) {
        this.$set(this.rows[params.selectedRows.map(e => e.originalIndex)[0]], 'vgtSelected', false)
        toasts.error('Không thể chọn đơn có trạng thái ĐÃ HỦY')
      }
      // toasts.success('Không thể chọn đơn có trạng thái ĐÃ HỦY')
      console.log(params.selectedRows.map(e => e.originalIndex)[0])
    },
    onClickCreateButton() {
      this.$router.push({ name: 'warehouses-input-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-input-update' })
    },
  },
}
</script>
