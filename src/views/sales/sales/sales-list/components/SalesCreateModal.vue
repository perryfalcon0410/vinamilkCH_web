<template>
  <validation-observer
    ref="formContainer"
    class="d-print-none"
  >
    <b-modal
      ref="salesCreateModal"
      hide-footer
      title-class="font-weight-bold text-brand-1"
      title="Thêm khách hàng"
    >
      <b-form-row>
        <b-col
          md="6"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Họ và tên đệm"
          >
            <div class="mt-1">
              Họ và tên đệm <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="lastName"
              autofocus
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col
          md="6"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Tên"
          >
            <div class="mt-1">
              Tên <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="firstName"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!-- START - Customer BirthDay and Gender -->
        <b-col
          md="12"
          class="h7"
        >
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required|dateFormatVNI"
                name="Ngày sinh"
              >
                <div class="mt-1">
                  Ngày sinh <sup class="text-danger">*</sup>
                </div>
                <b-input-group
                  class="input-group-merge"
                >
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
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="Giới tính"
              >
                <div
                  class="mt-1"
                >
                  Giới tính <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="gendersSelected"
                  :options="genderOptions"
                  placeholder="Chọn giới tính"
                  no-options-text="Không có dữ liệu"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
        </b-col>
        <!-- END - Customer BirthDay and Gender -->

        <b-col
          md="6"
          class="h7"
        >
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
              :formatter="$preventPasteSpecialChars"
              @keypress="$onlyNumberInput"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          md="6"
          class="h7"
        >
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

        <b-col
          md="12"
          class="h7"
        >
          <validation-provider
            v-slot="{ errors, passed}"
            name="Số nhà"
          >
            <div class="mt-1">
              Số nhà <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="street"
              :state="touched ? passed : null"
              maxlength="200"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>

        <b-col
          md="12"
          class="h7"
        >
          <!-- START - Customer District and Wards -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="tỉnh/ thành"
              >
                <div
                  class="mt-1"
                >
                  Tỉnh/ Thành <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="provincesSelected"
                  :options="provinceOptions"
                  placeholder="Chọn tỉnh/ thành"
                  no-options-text="Không có dữ liệu"
                  no-results-text="Không tìm thấy kết quả"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="quận/ huyện"
              >
                <div
                  class="mt-1"
                >
                  Quận/ Huyện <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="districtsSelected"
                  :options="districtOptions"
                  placeholder="Chọn quận/ huyện"
                  no-options-text="Vui lòng chọn tỉnh/ thành"
                  no-results-text="Không tìm thấy kết quả"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="phường/ xã"
              >
                <div
                  class="mt-1"
                >
                  Phường/ Xã <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="precinctsSelected"
                  :options="precinctOptions"
                  placeholder="Chọn phường/ xã"
                  no-options-text="Vui lòng chọn quận/ huyện"
                  no-results-text="Không tìm thấy kết quả"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
        <!-- END - Customer District and Wards -->
        </b-col>

        <b-col
          md="12"
          class="h7"
        >
          <!-- START - Customer loyal -->
          <b-form-checkbox
            v-model="customerSpecial"
            class="mt-1"
          >
            Khách hàng riêng của cửa hàng
          </b-form-checkbox>
        <!-- END - Customer loyal -->
        </b-col>

        <b-col
          md="12"
          class="h7"
        >
          <!-- START - Customer Note -->
          <b-form-group
            label="Ghi chú"
            label-for="Note"
            class="mt-1"
            label-class="h7"
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
            variant="someThing"
            class="btn-brand-1 aligns-items-button-center"
            @click="onClickSaveButton()"
          >
            <b-icon
              icon="file-earmark-text-fill"
              class="mr-50"
            />
            Lưu
          </b-button>
          <b-button
            class="aligns-items-button-center ml-1"
            @click="onClickCloseButton()"
          >
            <b-icon-x
              class="mr-50"
              scale="1.5"
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
import { formatVniDateToISO } from '@/@core/utils/filter'
import customerData from '@/@db/customer'
import {
  CUSTOMER,
  // GETTERS
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  SHOP_LOCATIONS_GETTER,
  CREATE_CUSTOMER_GETTER,
  CUSTOMER_TYPES_GETTER,
  GENDERS_GETTER,
  // ACTIONS
  CREATE_CUSTOMER_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
} from '../../../sales-customers/store-module/type'
import {
  SALES,
  // GETTERS
  GET_DEFAULT_CUSTOMER_TYPE_GETTER,
  // ACTIONS
  GET_DEFAULT_CUSTOMER_TYPE_ACTION,
} from '../../store-module/type'

export default {
  name: 'SalesCreateModal',
  components: {
    BFormInput,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    customerDefault: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      configBitrhDay: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      goNext: () => {},

      decentralization: {
        formId: 9,
        ctrlId: 6,
      },

      // validation rules
      number,
      required,
      email,

      isFirstTimeGetLocations: true,

      id: null,
      customerTypesSelected: null,
      customerEmail: null,
      shopId: null,
      scoreCumulated: null,
      lastName: null,
      firstName: null,
      birthDay: null,
      gendersSelected: null,
      phoneNumber: null,
      street: null,
      customerSpecial: false,
      note: null,
      createdAt: null,
      customerGroups: null,
      provincesSelected: null,
      districtsSelected: null,
      precinctsSelected: null,
      customerStatusSelected: customerData.status[0].id,
      customerCreate: {},
    }
  },
  // START - Computed
  computed: {
    ...mapGetters(CUSTOMER, {
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
      SHOP_LOCATIONS_GETTER,
      CREATE_CUSTOMER_GETTER,
      CUSTOMER_TYPES_GETTER,
      GENDERS_GETTER,
    }),
    ...mapGetters(SALES, [
      GET_DEFAULT_CUSTOMER_TYPE_GETTER,
    ]),
    defaultCustomerType() {
      return this.GET_DEFAULT_CUSTOMER_TYPE_GETTER
    },
    provinceOptions() {
      return this.PROVINCES_GETTER.map(data => ({
        id: data.id,
        label: data.areaName,
      }))
    },
    districtOptions() {
      if (this.provincesSelected) {
        return this.DISTRICTS_GETTER.map(data => ({
          id: data.id,
          label: data.areaName,
        }))
      }
      return []
    },
    precinctOptions() {
      if (this.districtsSelected) {
        return this.PRECINCTS_GETTER.map(data => ({
          id: data.id,
          label: data.areaName,
        }))
      }
      return []
    },
    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER
    },
    genderOptions() {
      return this.GENDERS_GETTER.map(data => ({
        id: data.id,
        label: data.categoryName,
      }))
    },
    getCustomerCreate() {
      return this.CREATE_CUSTOMER_GETTER
    },
  },
  // END - Computed

  watch: {
    shopLocations() {
      this.provincesSelected = this.shopLocations.provinceId
    },
    provincesSelected() {
      this.districtsSelected = null
      if (this.provincesSelected) {
        this.GET_DISTRICTS_ACTION({
          data: {
            ...this.decentralization,
            provinceId: this.provincesSelected,
          },
          onSuccess: () => {
            if (this.isFirstTimeGetLocations === false) {
              this.districtsSelected = this.districtOptions[0].id
            }
            // Load quận huyện mặc định từ api về lần đầu
            // Load default district from api first
            if (this.shopLocations && this.isFirstTimeGetLocations) {
              this.districtsSelected = this.shopLocations.districtId
            }
          },
        })
      }
    },
    districtsSelected() {
      this.precinctsSelected = null
      if (this.districtsSelected) {
        this.GET_PRECINCTS_ACTION({
          data: { ...this.decentralization, districtId: this.districtsSelected },
          onSuccess: () => {
            if (this.isFirstTimeGetLocations === false) {
              this.precinctsSelected = this.precinctOptions[0].id
            }
            // Load default ward,commune from api first
            if (this.shopLocations && this.isFirstTimeGetLocations) {
              this.precinctsSelected = this.shopLocations.precinctId
              this.isFirstTimeGetLocations = false
            }
          },
        })
      }
    },
    getCustomerCreate() {
      this.customerCreate = { ...this.getCustomerCreate }
      this.getCreateInfo()
    },
  },

  mounted() {
    this.GET_PROVINCES_ACTION({ ...this.decentralization })
    this.GET_SHOP_LOCATIONS_ACTION({ ...this.decentralization })
    this.GET_CUSTOMER_TYPES_ACTION({ data: { ...this.decentralization }, onSuccess: () => {} })
    this.GET_DEFAULT_CUSTOMER_TYPE_ACTION({ ...this.decentralization })
  },

  // START - Methods
  methods: {
    ...mapActions(CUSTOMER, [
      CREATE_CUSTOMER_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
      GET_SHOP_LOCATIONS_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
    ]),
    ...mapActions(SALES, [
      GET_DEFAULT_CUSTOMER_TYPE_ACTION,
    ]),

    create() {
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.CREATE_CUSTOMER_ACTION({
            customer: {
              firstName: this.firstName,
              lastName: this.lastName,
              genderId: this.gendersSelected,
              dob: formatVniDateToISO(this.birthDay),
              status: this.customerStatusSelected,
              isPrivate: this.customerSpecial,
              mobiPhone: this.phoneNumber,
              email: this.customerEmail,
              street: this.street,
              noted: this.note,
              areaId: this.precinctsSelected,
              customerTypeId: this.defaultCustomerType.id,
            },
            onSuccess: () => {
              this.getCreateInfo()
              this.onClickCloseButton()
              this.resetInput()
            },
          })
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
        id: this.customerCreate.id,
        shopId: this.customerCreate.shopId,
        firstName: this.customerCreate.firstName,
        lastName: this.customerCreate.lastName,
        phoneNumber: this.customerCreate.mobiPhone,
        address: this.customerCreate.address,
        scoreCumulated: this.customerCreate.scoreCumulated,
        customerTypeId: this.customerCreate.customerTypeId,
        createdAt: this.customerCreate.createdAt,
      })
    },

    resetInput() {
      this.firstName = null
      this.lastName = null
      this.birthDay = null
      this.phoneNumber = null
      this.customerEmail = null
      this.street = null
      this.note = null
      this.customerSpecial = null
      this.provincesSelected = null
      this.districtsSelected = null
      this.precinctsSelected = null
      this.districtCurrent = 0
    },
  },
  // END - Methods
}
</script>
