<template>
  <validation-observer
    ref="formContainer"
  >
    <b-modal
      ref="salesCreateModal"
      modal-class="modal-primary"
      hide-footer
      title="Thêm khách hàng"
    >
      <b-form-row>
        <b-col md="6">
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Họ và tên đệm"
          >
            <div class="mt-1">
              Họ và tên đệm <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="lastName"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col md="6">
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Tên"
          >
            <div class="mt-1">
              Tên <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="firstName"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- START - Customer BirthDay and Gender -->
        <b-col md="12">
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required|dateFormatVNI|age"
                name="Ngày sinh"
              >
                <div class="mt-1">
                  Ngày sinh <sup class="text-danger">*</sup>
                </div>
                <b-input-group class="input-group-merge">
                  <vue-flat-pickr
                    id="form-input-birth-date"
                    v-model="birthDay"
                    :config="configBitrhDay"
                    class="form-control"
                    placeholder="chọn ngày"
                  />
                  <b-input-group-append
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <v-input-select
                title="Giới tính"
                :suggestions="genderOptions"
                :data-input="gendersSelected.name"
                placeholder="Chọn giới tính"
                title-class="mt-1"
                clear-able
                @updateSelection="gendersSelected = $event"
              />
            </b-col>
          </b-form-row>
        </b-col>
        <!-- END - Customer BirthDay and Gender -->

        <b-col md="6">
          <validation-provider
            v-slot="{ errors, passed }"
            rules="phoneNumber|required"
            name="Điện thoại"
          >
            <div class="mt-1">
              Điện thoại <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="phoneNumber"
              autocomplete="on"
              type="tel"
              :state="phoneNumber ? passed : null"
              maxlength="10"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col md="6">
          <validation-provider
            v-slot="{ errors, passed}"
            rules="email"
            name="Email"
          >
            <div class="mt-1">
              Email
            </div>
            <b-form-input
              id="Email"
              v-model="customerEmail"
              :state="touched ? passed : null"
              type="email"
              autocomplete="on"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col md="12">
          <validation-provider
            v-slot="{ errors, passed}"
            name="Số nhà"
          >
            <div class="mt-1">
              Số nhà
            </div>
            <b-form-input
              v-model="address"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col md="12">
          <b-form-group
            label="Tỉnh/ Thành"
            label-for="Province"
            class="mt-1"
          >
            <v-select
              id="Province"
              v-model="customerProvince"
              :options="provinces"
              label="name"
              autocomplete="on"
              placeholder="Chọn tỉnh/ thành"
              :state="touched ? passed : null"
            />
          </b-form-group></b-col>

        <b-col md="12">
          <!-- START - Customer District and Wards -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Quận/ Huyện"
                label-for="District"
                class="mt-1"
              >
                <v-select
                  id="District"
                  v-model="customerDistrict"
                  :options="districts"
                  label="name"
                  autocomplete="on"
                  placeholder="Chọn quận/ huyện"
                >
                  <template #no-options="{}">
                    Vui lòng chọn tỉnh/ thành trước
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Phường/ Xã"
                label-for="Wards"
                class="mt-1"
              >
                <v-select
                  id="Wards"
                  v-model="customerPrecinct"
                  :options="precincts"
                  label="name"
                  autocomplete="on"
                  placeholder="Chọn phường/ xã"
                >
                  <template #no-options="{}">
                    Vui lòng chọn quận/ huyện trước
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
          </b-form-row>
        <!-- END - Customer District and Wards -->
        </b-col>

        <b-col md="12">
          <!-- START - Customer loyal -->
          <b-form-checkbox
            v-model="customerSpecial"
            class="mt-1"
          >
            Khách hàng riêng của cửa hàng
          </b-form-checkbox>
        <!-- END - Customer loyal -->
        </b-col>

        <b-col md="12">
          <!-- START - Customer Note -->
          <b-form-group
            label="Ghi chú"
            label-for="Note"
            class="mt-1"
          >
            <b-form-textarea
              id="Note"
              v-model="note"
              maxlength="4000"
            />
          </b-form-group>
        <!-- END - Customer Note -->
        </b-col>

        <b-col class="text-center">
          <b-button
            variant="primary"
            class="mr-2"
            @click="onClickSaveButton()"
          >
            <b-icon
              icon="file-earmark-text-fill"
              width="20"
              height="20"
              class="mr-1"
            />
            Lưu
          </b-button>
          <b-button @click="onClickCloseButton()">
            <b-icon-x
              width="20"
              height="20"
            />
            Đóng
          </b-button>
        </b-col>
      </b-form-row>
    </b-modal>
  </validation-observer>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  number,
  required,
  email,
} from '@/@core/utils/validations/validations'
import {
  VBModal, BFormInput,
} from 'bootstrap-vue'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import { formatVniDateToISO } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'
import {
  CUSTOMER,
  // GETTERS
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  // ACTIONS
  CREATE_CUSTOMER_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
} from '../../../sales-customers/store-module/type'

export default {
  name: 'SalesCreateModal',
  components: {
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    VInputSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      configBitrhDay: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: new Date().fp_incr(-5479),
      },
      goNext: () => {},

      // validation rules
      number,
      required,
      email,

      customerEmail: '',
      lastName: '',
      firstName: '',
      birthDay: '',
      genderOptions: commonData.genders,
      gendersSelected: { name: null, id: null },
      phoneNumber: '',
      address: '',
      customerSpecial: false,
      note: '',
      customerStatus: customerData.status[0],
      customerGroups: null,
      customerProvince: null,
      customerDistrict: null,
      customerPrecinct: null,
    }
  },
  // START - Computed
  computed: {
    customerTypes() {
      return this.CUSTOMER_TYPES_GETTER().map(data => ({
        id: data.id,
        name: data.name,
      }))
    },
    provinces() {
      return this.PROVINCES_GETTER().map(data => ({
        id: data.id,
        name: data.areaName,
      }))
    },
    districts() {
      return this.DISTRICTS_GETTER().map(data => ({
        id: data.id,
        name: data.areaName,
      }))
    },
    precincts() {
      return this.PRECINCTS_GETTER().map(data => ({
        id: data.id,
        name: data.areaName,
      }))
    },
  },
  // END - Computed

  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER())
    },
    customerProvince() {
      this.customerDistrict = null
      this.GET_DISTRICTS_ACTION(this.customerProvince.id)
    },
    customerDistrict() {
      this.customerPrecinct = null
      this.GET_PRECINCTS_ACTION(this.customerDistrict.id)
    },
  },

  mounted() {
    this.GET_PROVINCES_ACTION()
    this.CREATE_CUSTOMER_ACTION({ formId: 4, ctrlId: 1 }) // Hard
  },

  // START - Methods
  methods: {
    ...mapGetters(CUSTOMER, {
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
    }),
    ...mapActions(CUSTOMER, [
      CREATE_CUSTOMER_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
    ]),

    create() {
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.CREATE_CUSTOMER_ACTION({
            firstName: this.firstName,
            lastName: this.lastName,
            genderId: this.gendersSelected?.id,
            dob: formatVniDateToISO(this.birthDay),
            status: this.customerStatus?.id, // Hard
            isPrivate: this.customerSpecial,
            mobiPhone: this.phoneNumber,
            phone: this.phoneNumber, // temp
            email: this.customerEmail,
            address: this.address,
            noted: this.note,
            customerTypeId: 2, // Hard
          })
          this.getCreateInfo()
          this.onClickCloseButton()
          this.resetInput()
        }
      })
    },

    onClickCloseButton() {
      this.$refs.salesCreateModal.hide()
    },

    onClickSaveButton() {
      this.create()
    },

    getCreateInfo() {
      this.onClickCloseButton()
      this.$emit('getCreateInfo', {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        address: this.address,
      })
    },

    resetInput() {
      this.firstName = ''
      this.lastName = ''
      this.birthDay = ''
      this.phoneNumber = ''
      this.customerEmail = ''
      this.address = ''
      this.note = ''
      this.customerProvince = null
      this.customerDistrict = null
      this.customerPrecinct = null
    },
  },
  // END - Methods
}
</script>
