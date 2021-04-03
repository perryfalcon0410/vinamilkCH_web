<template>
  <b-container
    fluid
    class=" p-0"
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
        <!-- START - Minute Code -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Số biên bản"
            label-for="form-input-minuteCode"
            :state="validatorCode"
            invalid-feedback="Chỉ bao gồm các ký tự [0-9][a-Z] dấu chấm(.), dấu gạch dưới (_)"
          >
            <b-form-input
              id="form-input-minuteCode"
              v-model="MinuteCode"
              maxlength="20"
              :state="validatorCode"
              required
              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - Minute Code -->

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

        <!-- START - Reason -->
        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Lý do"
            label-for="form-select-reason"
          >
            <b-form-select
              id="form-select-reason"
            />
          </b-form-group>
        </b-col>
        <!-- END - Reason -->

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
          Danh sách phiếu đổi hàng hỏng
        </label>

        <b-button
          class="rounded"
          size="sm"
          variant="primary"
          @click="onClickAddNewButton"
        >
          <b-icon-plus scale="1.5" />
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
            <b-row
              v-if="props.column.field === 'Feature'"
              align-h="center"
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
              class="mx-0"
              align-h="around"
            >
              <b-icon-pencil-fill
                class="cursor-pointer"
                @click="onClickUpdateButton"
              />

              <b-icon-trash-fill
                class="cursor-pointer"
                color="red"
              />
            </b-row>

            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Row -->

          <!-- START - Filter -->
          <template
            slot="column-filter"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'Amount'"
            >
              0
            </div>
            <div
              v-else-if="props.column.field === 'Price'"
            >
              0
            </div>
          </template>
          <!-- END - Filter -->

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
      MinuteCode: '',
      columns: [
        {
          label: 'Ngày',
          field: 'Date',
          sortable: false,
        },
        {
          label: 'Số biên bản',
          field: 'MinuteCode',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'Amount',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Số tiền',
          field: 'Price',
          sortable: false,
          filterOptions: {
            enabled: true,
          },
        },
        {
          label: 'Lý do',
          field: 'Reason',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Feature',
          sortable: false,
          width: '100px',
        },
      ],
      rows: [
        {
          Date: '12/03/2021',
          MinuteCode: 'CA.CH40235.002',
          Amount: '1020',
          Price: '25.300.000',
          Reason: 'Hàng hỏng do khách hàng mua tại cửa hàng',
          Feature: '',
        },
        {
          Date: '12/03/2021',
          MinuteCode: 'CA.CH40235.002',
          Amount: '1020',
          Price: '25.300.000',
          Reason: 'Hàng hỏng do khách hàng mua tại cửa hàng',
          Feature: '',
        },
        {
          Date: '12/03/2021',
          MinuteCode: 'CA.CH40235.002',
          Amount: '1020',
          Price: '25.300.000',
          Reason: 'Hàng hỏng do khách hàng mua tại cửa hàng',
          Feature: '',
        },
      ],
    }
  },
  computed: {
    validatorCode() {
      const validID = /^([\w\\.]{0,40})$/
      const result = validID.test(this.MinuteCode)
      if (this.MinuteCode.length >= 1) {
        return result
      }
      return null
    },
  },
  methods: {
    onClickAddNewButton() {
      this.$router.push({ name: 'warehouses-exchange-damaged-goods-create' })
    },
    onClickUpdateButton() {
      this.$router.push({ name: 'archive-changeProductsUpdate' })
    },
  },
}
</script>
