<template>
  <b-modal
    ref="salesSearchModal"
    size="xl"
    title="Tìm kiếm khách hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    hide-footer
  >
    <b-container
      fluid
      class="d-flex flex-column"
    >
      <!-- START - Search -->
      <b-form class="bg-white rounded shadow">
        <b-form-row
          class="v-search-form border-top mx-0 p-1"
          @keyup.enter="onClickSearchButton"
        >
          <b-col
            xl
            sm="6"
          >
            <!-- START - Full Name -->
            <b-form-group
              label="Khách hàng"
              label-for="form-input-customer"
            >
              <b-form-input
                id="form-input-customer"
                v-model="searchKeywords"
                placeholder="Nhập mã/ họ tên"
                trim
              />
            </b-form-group>
            <!-- END - Full Name -->
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="Số điện thoại"
              label-for="form-input-phoneNumber"
            >
              <b-form-input
                id="form-input-phoneNumber"
                v-model="phone"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
          >
            <b-form-group
              label="CMND"
              label-for="form-input-idNo"
            >
              <b-form-input
                id="form-input-idNo"
                v-model="idNo"
                trim
              />
            </b-form-group>
          </b-col>

          <b-col
            xl
            sm="6"
            md="12"
          >
            <b-form-group
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

      <!-- START - Coupon list -->
      <b-form class="v-search bg-white rounded shadow rounded mt-1">
        <!-- START - Table -->
        <b-col class="py-1">
          <vue-good-table
            :columns="columns"
            :rows="customers"
            style-class="vgt-table bordered"
            :pagination-options="{
              enabled: true
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
            <!-- START - Columns -->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <div v-if="props.column.label === 'Chức năng'">
                <b-icon-bricks v-b-popover.hover="'Thao tác'" />
              </div>
              <div v-else>
                {{ props.column.label }}
              </div>
            </template>
            <!-- END - Columns -->

            <!-- START - Rows -->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'feature'">
                <b-button
                  variant="primary"
                  @click="getId(props.row.id)"
                >
                  Chọn
                </b-button>
              </div>
              <div v-else>
                {{ props.formattedRow[props.column.field] }}
              </div>
            </template>
          <!-- END - Rows -->

          </vue-good-table>
        </b-col>
        <!-- END - Table -->
        <b-col class="text-center mb-2">
          <b-button @click="onClickCloseButton()">
            Đóng
          </b-button>
        </b-col>
        <div class="mt-1">
          Di động <sup class="text-danger">*</sup>
        </div>
        <b-form-input
          v-model="phoneNumber"
          type="tel"
          autocomplete="on"
          maxlength="10"
        />
      </b-form>
      <!-- END - Coupon list -->
    </b-container>
  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import { formatDateToVNI } from '@core/utils/filter'
import {
  CUSTOMER,
  CUSTOMERS_GETTER,
  GET_CUSTOMERS_ACTION,
} from '../../../sales-customers/store-module/type'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      valueDateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      valueDateTo: new Date(),
      searchKeywords: '',
      phone: '',
      idNo: '',
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'code',
          sortable: false,
        },
        {
          label: 'Tên khách hàng',
          field: 'fullName',
          sortable: false,
        },
        {
          label: 'Địa chỉ',
          field: 'address',
          sortable: false,
        },
        {
          label: 'Số điện thoại',
          field: 'phoneNumber',
          sortable: false,
        },
        {
          label: 'Ngày sinh',
          field: 'birthDay',
          sortable: false,
        },
        {
          label: 'Số CMND',
          field: 'idNo',
          sortable: false,
        },
        {
          label: '',
          field: 'feature',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    customers() {
      return this.CUSTOMERS_GETTER().map(data => ({
        id: data.id,
        code: data.customerCode,
        fullName: `${data.lastName} ${data.firstName}`,
        phoneNumber: data.mobiPhone || data.phone,
        birthDay: formatDateToVNI(data.dob),
        date: formatDateToVNI(data.createdAt),
        address: data.address,
        idNo: data.idNo,
        feature: '',
      }))
    },
  },
  mounted() {
    this.GET_CUSTOMERS_ACTION({})
  },
  created() {
    window.addEventListener('keydown', e => {
      if (e.key === 'F4') {
        this.$refs.salesSearchModal.show()
      }
    })
  },
  methods: {
    ...mapGetters(CUSTOMER, [
      CUSTOMERS_GETTER,
    ]),
    ...mapActions(CUSTOMER, [
      GET_CUSTOMERS_ACTION,
    ]),
    onClickSearchButton() {
      const searchData = {
        searchKeywords: this.searchKeywords.trim(),
        phone: this.phone.trim(),
        idNo: this.idNo.trim(),
      }

      this.GET_CUSTOMERS_ACTION(searchData)
    },
    onClickCloseButton() {
      this.$refs.salesSearchModal.hide()
    },
    getId(event) {
      this.onClickCloseButton()
      console.log('id customer: ', event)
    },
  },
}
</script>
