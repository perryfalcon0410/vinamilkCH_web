<template>
  <b-container
    fluid
    class="d-flex flex-column p-0"
  >
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <!-- START - Label -->
      <label
        for="v-search-form"
        class="m-1 text-primary"
      >
        Tìm kiếm
      </label>
      <!-- END - Label -->

      <!-- START - Section form input -->
      <b-form-row
        class="v-search-form border-top p-1"
      >
        <!-- START - Inventory Code -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Mã kiểm kê"
            label-for="form-input-inventoryId"
          >
            <b-form-input
              id="form-input-inventoryId"
              v-model="InventoryCode"
              maxlength="20"

              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - Inventory Code -->

        <!-- START - Date to -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Từ ngày"
            label-for="form-input-date-from"
          >
            <b-form-datepicker
              id="form-input-date-from"
              v-model="fromDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - Date to -->

        <!-- START - Date from -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Đến ngày"
            label-for="form-input-date-to"
          >
            <b-form-datepicker
              id="form-input-date-to"
              v-model="toDate"
              :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
              locale="vi"
            />
          </b-form-group>
        </b-col>
        <!-- END - Date from -->

        <!-- START - Warehouse -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Kho"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>
        <!-- END - Warehouse -->

        <!-- START - Search Button -->
        <b-col
          md="12"
          lg="4"
        >
          <b-form-group
            class="ml-lg-1"
            label="Tìm kiếm"
            label-for="form-button-search"
          >
            <b-button
              id="form-button-search"
              variant="primary"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>
        <!-- END - Search Button -->

      </b-form-row>
      <!-- END - Section form input -->

    </b-form>
    <!-- END - Search -->

    <!-- START - Product Import list -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Title -->
      <b-form-row class="justify-content-between align-items-center border-bottom p-1">
        <label
          for="listProduct"
          class="text-primary"
        >
          Danh sách đợt kiểm kê
        </label>

        <b-button
          class="rounded"
          size="md"
          variant="primary"
          @click="onClickAddNewButton"
        >
          <b-icon-plus />
          Thêm mới
        </b-button>
      </b-form-row>
      <!-- END - Title -->

      <!-- START - Table -->
      <b-col
        id="listProduct"
        class="py-1"
      >
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
          <!-- START - Column -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div v-if="props.column.field === 'Feature'">
              <b-icon-bricks />
            </div>
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
            <div v-if="props.column.field === 'Feature'">
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="onClickUpdateButton"
              />
            </div>
            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->
        </vue-good-table>
      </b-col>
      <!-- END - Table -->

    </b-form>
    <!-- END - Product Import list -->

  </b-container>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      InventoryCode: '',
      columns: [
        {
          label: 'Ngày',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Mã kiểm kê',
          field: 'InventoryId',
          sortable: false,
        },
        {
          label: 'Kho',
          field: 'Warehouse',
          sortable: false,
        },
        {
          label: 'Người tạo',
          field: 'Creator',
          sortable: false,
        },
        {
          label: 'Chỉnh sửa lần cuối',
          field: 'LastEditDate',
          sortable: false,
        },
        {
          label: 'Người chỉnh sửa',
          field: 'Editor',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Feature',
          sortable: false,
        },
      ],
      rows: [
        {
          Date: '12/03/2021',
          InventoryId: 'KKI.20210312.002',
          Warehouse: 'Cửa hàng',
          Creator: 'Ngô Lan Hương',
          LastEditDate: '12/03/2021',
          Editor: 'Nguyễn Bích',
          Feature: '',
        },
        {
          Date: '12/03/2021',
          InventoryId: 'KKI.20210312.002',
          Warehouse: 'Cửa hàng',
          Creator: 'Ngô Lan Hương',
          LastEditDate: '12/03/2021',
          Editor: 'Nguyễn Bích',
          Feature: '',
        },
        {
          Date: '12/03/2021',
          InventoryId: 'KKI.20210312.002',
          Warehouse: 'Cửa hàng',
          Creator: 'Ngô Lan Hương',
          LastEditDate: '12/03/2021',
          Editor: 'Nguyễn Bích',
          Feature: '',
        },
      ],
    }
  },

  methods: {
    onClickAddNewButton() {
      this.$router.push({ name: 'warehouses-inventory-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'warehouses-inventory-update' })
    },
  },
}
</script>
