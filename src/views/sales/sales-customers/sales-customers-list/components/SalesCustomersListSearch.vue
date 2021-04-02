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
              v-model="areaAddress"
            >
              <b-form-select-option
                v-for="item in shopLocations"
                :key="item.value"
                :value="item.value"
              >
                {{ item.text }}
              </b-form-select-option>
            </b-form-select>
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
  mapActions,
  mapGetters,
} from 'vuex'
import {
  CUSTOMER,
  GET_CUSTOMERS_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  SHOP_LOCATIONS_GETTER,
} from '../../store-module/type'

export default {
  data() {
    return {
      searchKeywords: '',
      fromDate: '',
      toDate: '',
      groupId: '',
      status: '',
      gender: '',
      areaAddress: '',
    }
  },
  computed: {
    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER().map(data => ({
        value: data.value,
        text: data.name,
      }))
    },
  },
  mounted() {
    this.GET_SHOP_LOCATIONS_ACTION({
      shopId: 1, // Hard code
    })
  },
  methods: {
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
      GET_SHOP_LOCATIONS_ACTION,
    ]),
    ...mapGetters(CUSTOMER, [
      SHOP_LOCATIONS_GETTER,
    ]),
    resolveDate(date) {
      return new Date(date).toISOString().slice(0, 10).replaceAll('-', '/')
    },
    search() {
      const searchData = {
        searchKeywords: this.searchKeywords,
        fromDate: this.fromDate,
        toDate: this.toDate,
        groupId: this.groupId,
        gender: this.gender,
        status: this.status,
        areaAddress: this.areaAddress,
      }

      this.GET_CUSTOMERS_ACTION(searchData)
    },
  },
}
</script>
