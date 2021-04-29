<template>
  <div>
    <!-- START - Search -->
    <b-form
      class="bg-white rounded shadow"
      @keyup.enter="onClickSearchButton"
    >
      <b-row
        v-b-toggle.collapseDelivery
        class="text-primary mx-0 p-1"
        align-v="center"
        align-h="between"
      >
        <strong class="text-brand-1">Tìm kiếm</strong>

        <b-icon-chevron-down
          scale="1.3"
          color="#203181"
        />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-form-row class="v-search-form border-top mx-0 p-1">
          <b-col
            lg="2"
            md
          >
            <b-form-group
              label="Số hóa đơn"
              label-class="h8"
              label-for="form-input-red-invoice-no"
            >
              <b-form-input
                id="form-input-red-invoice-no"
                v-model="billNumber"
                class="h9"
                size="sm"
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
                label-class="h8"
                label-for="form-input-date-from"
              >
                <b-input-group
                  id="form-input-date-from"
                  class="input-group-merge"
                  size="sm"
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
                    class="form-control h9"
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
                label-class="h8"
                label-for="form-input-date-to"
              >
                <b-input-group
                  id="form-input-date-to"
                  class="input-group-merge"
                  size="sm"
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
                    class="form-control h9"
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
              label-class="h8"
              label="Loại nhập"
              label-for="form-input-input-type"
            >
              <v-select
                id="form-input-input-type"
                v-model="inputType"
                :options="warehousesInputOptions"
                class="h9"
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
              label-class="text-white"
            >
              <b-button
                id="form-button-search"
                class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
                variant="someThing"
                style="height: 30px;"
                @click="onClickSearchButton()"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-collapse>
    </b-form>
    <!-- END - Search -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { reverseVniDate, formatDateToLocale } from '@/@core/utils/filter'
import warehousesData from '@/@db/warehouses'
import { ValidationProvider } from 'vee-validate'
import { dateFormatVNI } from '@/@core/utils/validations/validations'
import { WAREHOUSEINPUT, GET_RECEIPTS_ACTION } from '../../store-module/type'

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      dateFormatVNI,

      billNumber: '',
      fromDate: formatDateToLocale(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      toDate: formatDateToLocale(new Date()),
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
  computed: {},
  mounted() {},
  methods: {
    ...mapActions(WAREHOUSEINPUT, [GET_RECEIPTS_ACTION]),
    onClickSearchButton() {
      const searchData = {
        redInvoiceNo: this.billNumber,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        type: this.inputType?.id,
        formId: 5,
        ctrlId: 7,
      }

      this.GET_RECEIPTS_ACTION(searchData)
    },
  },
}
</script>
