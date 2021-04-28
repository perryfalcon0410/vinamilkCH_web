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
          <validation-provider
            v-slot="{ errors }"
            rules="dateFormatVNI"
          >
            <b-form-group
              label="Từ ngày"
              label-for="form-input-date-from"
            >
              <b-input-group
                id="form-input-date-from"
                class="input-group-merge"
              >
                <b-input-group-prepend
                  is-text
                  data-toggle
                >
                  <b-icon-calendar />
                </b-input-group-prepend>
                <vue-flat-pickr
                  v-model="fromDate"
                  :config="configDate"
                  class="form-control"
                  placeholder="Chọn ngày"
                />
              </b-input-group>
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          lg="2"
          md
        >
          <validation-provider
            v-slot="{ errors }"
            rules="dateFormatVNI"
          >
            <b-form-group
              label="Đến ngày"
              label-for="form-input-date-to"
            >
              <b-input-group
                id="form-input-date-to"
                class="input-group-merge"
              >
                <b-input-group-prepend
                  is-text
                  data-toggle
                >
                  <b-icon-calendar />
                </b-input-group-prepend>
                <vue-flat-pickr
                  v-model="toDate"
                  :config="configDate"
                  class="form-control"
                  placeholder="Chọn ngày"
                />
              </b-input-group>
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
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
            <v-select
              id="form-input-input-type"
              v-model="inputType"
              :options="warehousesInputOptions"
              label="name"
              autocomplete="on"
              placeholder="Tất cả"
            />
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
import { reverseVniDate } from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import {
  ValidationProvider,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import {
  WAREHOUSEINPUT,
  GET_RECEIPTS_ACTION,
} from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      dateFormatVNI,

      billNumber: '',
      fromDate: '',
      toDate: '',
      inputType: '',
      warehousesInputOptions: warehousesData.inputTypes,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        allowInvalidPreload: false,
      },
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
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.inputType?.id,
      }

      this.GET_RECEIPTS_ACTION(searchData)
    },
  },
}
</script>
