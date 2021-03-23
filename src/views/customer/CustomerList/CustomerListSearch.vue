<template>
  <div>
    <!-- START - Search -->
    <b-form class="bg-white rounded shadow">
      <label
        for="v-search-form"
        class="text-primary m-1"
      >
        Tìm kiếm
      </label>

      <b-form-row class="v-search-form border-top mx-0 p-1">
        <!-- START - Full Name -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Khách hàng"
            label-for="form-input-customer"
          >
            <b-form-input
              id="form-input-customer"
              v-model="searchKeywords"
              placeholder="Nhập họ tên/mã"
              trim
            />
          </b-form-group>
        </b-col>
        <!-- END - Full Name -->

        <!-- START - Date From -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
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
        <!-- END - Date From -->

        <!-- START - Date To -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
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
        <!-- END - Date To -->

        <!-- START - Group -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Nhóm khách hàng"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
              v-model="groupId"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="1">
                Khách hàng thân thiết
              </b-form-select-option>
              <b-form-select-option value="2">
                Khách hàng thường
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- END - Group -->

        <!-- START - Status -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Trạng thái"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
              v-model="status"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="0">
                Ngưng hoạt động
              </b-form-select-option>
              <b-form-select-option value="1">
                Hoạt động
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- END - Status -->

        <!-- START - Gender -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Giới tính"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
              v-model="gender"
            >
              <b-form-select-option value="">
                Tất cả
              </b-form-select-option>
              <b-form-select-option value="0">
                Nữ
              </b-form-select-option>
              <b-form-select-option value="1">
                Nam
              </b-form-select-option>
              <b-form-select-option value="2">
                Khác
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <!-- END - Gender -->

        <!-- START - Location -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Khu vực"
            label-for="form-input-customer-group"
          >
            <b-form-select
              id="form-input-customer-group"
            />
          </b-form-group>
        </b-col>
        <!-- END - Location -->

        <!-- START - Search button -->
        <b-col
          xl
          sm="4"
          md="3"
        >
          <b-form-group
            label="Tìm kiếm"
            label-for="form-button-search"
          >
            <b-button
              id="form-button-search"
              variant="primary"
              @click="search()"
            >
              <b-icon-search />
              Tìm kiếm
            </b-button>
          </b-form-group>
        </b-col>
        <!-- END - Search button -->

      </b-form-row>
    </b-form>
    <!-- END - Search -->
  </div>
</template>

<script>
import {
  GET_ALL,
  CUSTOMER,
} from '@/store/customer/type'

import {
  mapActions,
} from 'vuex'

export default {
  data() {
    return {
      searchKeywords: '',
      fromDate: '',
      toDate: '',
      groupId: '',
      status: '',
      gender: '',
    }
  },
  methods: {
    ...mapActions(CUSTOMER, [
      GET_ALL,
    ]),

    formatDate(date) {
      return new Date(date).toISOString().slice(0, 10).replaceAll('-', '/')
    },

    search() {
      let query = ''
      if (this.searchKeywords) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}searchKeywords=${this.searchKeywords}`
      }
      if (this.fromDate) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}fromDate=${this.formatDate(this.fromDate)}`
      }
      if (this.toDate) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}toDate=${this.formatDate(this.toDate)}`
      }
      if (this.groupId) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}groupId=${this.groupId}`
      }
      if (this.gender) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}gender=${this.gender}`
      }
      if (this.status) {
        const sQuery = (query ? '&' : '?')
        query += `${sQuery}status=${this.status}`
      }
      this.GET_ALL(query)
    },
  },
}
</script>
