<template>
  <div>
    <!-- START - Search -->
    <b-form
      class="bg-white rounded shadow"
    >
      <b-row
        v-b-toggle.collapseDelivery
        class="text-primary mx-0 p-1"
        align-v="center"
        align-h="between"
      >
        <strong class="text-blue-vinamilk">
          Tìm kiếm
        </strong>
        <b-icon-chevron-down
          scale="1.3"
          color="#203181"
        />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-form-row class="border-top mx-0 p-1">

          <!-- START - Date From -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Từ ngày xuất"
                label-for="form-input-date-to"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-prepend>
                  <vue-flat-pickr
                    id="form-input-date-from"
                    v-model="fromDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                </b-input-group>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date From -->

          <!-- START - Date To -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Đến ngày"
                label-for="form-input-date-to"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-prepend>
                  <vue-flat-pickr
                    id="form-input-date-to"
                    v-model="toDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                </b-input-group>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Date To -->

          <!-- START - Product -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Sản phẩm"
              label-for="form-input-product"
            >
              <b-input-group class="input-group-merge ">
                <b-form-input
                  id="form-input-product"
                  v-model="product"
                  trim
                />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical
                    @click="PoChooseModalVisible=!PoChooseModalVisible"
                  />
                </b-input-group-append>
              </b-input-group>

            </b-form-group>
          </b-col>
          <!-- END - Product -->

          <!-- START - Type -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Loại xuất"
              label-for="form-output-type"
            >
              <v-select
                id="form-output-type"
                v-model="outputTypes"
                :options="outputTypeOptions"
                label="name"
                placeholder="Tất cả"
                :searchable="false"
              />
            </b-form-group>
          </b-col>
          <!-- END - Type -->

          <!-- START - License -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Số chứng từ"
              label-for="form-input-license"
            >
              <b-form-input
                id="form-input-license"
                v-model="license"
                placeholder="Số hóa đơn/ số nội bộ/ PO"
              />
            </b-form-group>
          </b-col>
          <!-- END - License -->

          <!-- START - Bill Date From -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Hóa đơn từ ngày"
                label-for="form-bill-date-from"
              >
                <b-input-group class="bill-group-merge">
                  <b-input-group-prepend
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-prepend>
                  <vue-flat-pickr
                    id="form-bill-date-from"
                    v-model="billFromDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                </b-input-group>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
          <!-- END - Bill Date From -->

          <!-- START - Bill Date To -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="dateFormatVNI"
            >
              <b-form-group
                label="Hóa đơn đến ngày"
                label-for="form-bill-date-to"
              >
                <b-input-group class="bill-group-merge">
                  <b-input-group-prepend
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-prepend>
                  <vue-flat-pickr
                    id="form-bill-date-to"
                    v-model="billToDate"
                    :config="configDate"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                </b-input-group>
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        <!-- END - Search button -->

        </b-form-row>
      </b-collapse></b-form>
    <!-- END - Search -->
    <!-- START - Modal -->
    <po-choose-modal :visible="PoChooseModalVisible" />
    <!-- END - Modal -->
  </div>
</template>

<script>
import {
  ValidationProvider,
} from 'vee-validate'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import outputData from '@/@db/warehouses'
import PoChooseModal from '../../components/po-choose-modal/OutputPoChooseModal.vue'

export default {
  components: {
    PoChooseModal,
    ValidationProvider,
  },
  data() {
    return {
      // validation rules
      dateFormatVNI,
      PoChooseModalVisible: false,

      fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      toDate: new Date(),
      product: '',
      outputTypes: '',
      outputTypeOptions: outputData.outputTypes,
      license: '',
      billFromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      billToDate: new Date(),

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
  },
}
</script>
