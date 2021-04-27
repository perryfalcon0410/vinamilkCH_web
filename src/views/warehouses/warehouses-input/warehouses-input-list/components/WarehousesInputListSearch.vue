<template>
  <div>
    <!-- START - Search -->
    <b-form class="bg-white shadow rounded">
      <label
        for="v-search-form"
        class="text-primary m-1"
      >
        Tìm kiếm
      </label>

      <b-form-row
        class="v-search-form border-top mx-0 p-1"
      >
        <b-col
          lg="2"
          md
        >
          <b-form-group
            label="Số hóa đơn"
            label-for="form-input-red-invoice-no"
          >
            <b-form-input
              id="form-input-red-invoice-no"
              v-model="billNumber"
              maxlength="20"
              trim
            />
          </b-form-group>
        </b-col>

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
              reset-button
              label-reset-button="Xóa"
              placeholder="chọn ngày"
            />
          </b-form-group>
        </b-col>

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
              reset-button
              label-reset-button="Xóa"
              placeholder="chọn ngày"
            />
          </b-form-group>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <b-form-group
            class="ml-lg-1"
            label="Loại nhập"
            label-for="form-input-input-type"
          >
            <b-form-select
              id="form-input-input-type"
              v-model="inputType"
              :options="warehousesInputOptions"
              placeholder="Tất cả"
            >
              <template #first>
                <b-form-select-option value="">Tất cả</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>

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
              @click="onClickSearchButton()"
            >
              <b-icon-search />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>

      </b-form-row>
    </b-form>
    <!-- END - Search -->
    </div>
</template>

<script>
import {
  mapActions,
} from 'vuex'
import { formatDate } from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import {
  WAREHOUSEINPUT,
  GET_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  data() {
    return {
      billNumber: '',
      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      inputType: '',
      warehousesInputOptions: warehousesData.inputTypes,
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      GET_RECEIPTS_ACTION,
    ]),
    onClickSearchButton() {
      const searchData = {
        redInvoiceNo: this.billNumber,
        fromDate: formatDate(this.fromDate),
        toDate: formatDate(this.toDate),
        type: this.inputType,
      }

      this.GET_RECEIPTS_ACTION(searchData)
    },
  },
}
</script>
