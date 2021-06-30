<template>
  <b-container
    fluid
  >
    <!-- START - Form Container-->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <b-row>
        <!-- START - Form Personal information -->
        <b-col
          xl="3"
          md="6"
          class="shadow bg-white rounded pb-1"
        >
          <!-- START - Section 1 -->
          <label class="w-100 text-center h5"><strong>Thông tin cá nhân</strong></label>

          <!-- START - Customer Code -->
          <b-col class="px-0">
            <div class="mt-1">
              Mã khách hàng
            </div>
            <b-form-input
              disabled
            />
          </b-col>

          <!-- END - Customer Code -->

          <!-- START - Customer Name -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="họ và tên đệm"
              >
                <div class="mt-1">
                  Họ và tên đệm <sup class="text-danger">*</sup>
                </div>
                <b-form-input
                  v-model="lastName"
                  :state="touched ? passed : null"
                  autocomplete="on"
                  maxlength="250"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>

            <b-col>
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="required"
                name="tên"
              >
                <div class="mt-1">
                  Tên <sup class="text-danger">*</sup>
                </div>
                <b-form-input
                  v-model="firstName"
                  autocomplete="on"
                  :state="touched ? passed : null"
                  maxlength="250"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
          </b-form-row>
          <!-- END - Customer Name -->

          <!-- START - Customer Barcode -->
          <validation-provider
            v-slot="{ errors, passed }"
            rules="code"
            name="mã vạch"
          >
            <div class="mt-1">
              Mã vạch
            </div>
            <b-form-input
              v-model.trim="barCode"
              :state="barCode ? passed : null"
              maxlength="40"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Barcode -->

          <!-- START - Customer BirthDay and Gender -->
          <b-form-row>
            <!-- BirthDay -->
            <b-col
              @keypress="$onlyDateInput"
            >
              <validation-provider
                v-slot="{ errors, touched, passed }"
                rules="required|dateFormatVNI|age"
                name="ngày sinh"
              >
                <div class="mt-1">
                  Ngày sinh <sup class="text-danger">*</sup>
                </div>
                <b-form-group
                  class="m-0"
                  :state="touched ? passed : null"
                >
                  <b-row
                    class="v-flat-pickr-group mx-0"
                    align-v="center"
                  >
                    <b-icon-x
                      v-show="birthDay"
                      style="position: absolute; right: 15px"
                      class="cursor-pointer text-gray"
                      scale="1.3"
                      data-clear
                    />
                    <vue-flat-pickr
                      v-model="birthDay"
                      :config="configBitrhDay"
                      class="form-control"
                      placeholder="Chọn ngày"
                    />
                  </b-row>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- gender -->
            <b-col>
              <div
                class="mt-1"
              >
                Giới tính
              </div>
              <tree-select
                v-model="gendersSelected"
                :options="genderOptions"
                placeholder="Chọn giới tính"
                no-options-text="Không có dữ liệu"
              />
            </b-col>
          </b-form-row>
          <!-- END - Customer BirthDay and Gender -->

          <!-- START - Customer Group and State -->
          <b-form-row>
            <b-col>
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                name="nhóm khách hàng"
              >
                <div
                  class="mt-1"
                >
                  Nhóm khách hàng <sup class="text-danger">*</sup>
                </div>
                <tree-select
                  v-model="customerTypesSelected"
                  :options="customerTypeOptions"
                  placeholder="Chọn nhóm khách hàng"
                  no-options-text="Không có dữ liệu"
                  no-results-text="Không tìm thấy kết quả"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>

            </b-col>

            <b-col>
              <div
                class="mt-1"
              >
                Trạng thái <sup class="text-danger">*</sup>
              </div>
              <tree-select
                v-model="customerStatusSelected"
                :options="customerStatusOptions"
                placeholder="Chọn trạng thái"
                disabled
              />
            </b-col>
          </b-form-row>
          <!-- END - Customer Group and State -->

          <!-- START - Customer loyal -->
          <b-form-checkbox
            v-model="customerPrivate"
            class="mt-1"
          >
            Khách hàng riêng của cửa hàng
          </b-form-checkbox>
          <!-- END - Customer loyal -->

          <!-- START - Customer Note -->
          <div class="mt-1">
            Ghi chú
          </div>
          <b-form-textarea
            v-model="note"
            maxlength="250"
          />
          <!-- END - Customer Note -->
          <!-- END - Section 1 -->
        </b-col>
        <!-- END - Form Personal information -->

        <!-- START - Form Personal ID -->
        <b-col
          xl
          md="6"
          class="bg-light pb-1"
          style="box-shadow: 10px 10px 15px 1px #EEEEEE"
        >
          <label class="h5 text-light"><strong>Label</strong></label>

          <!-- START - Customer IdentityCard -->
          <validation-provider
            v-slot="{ errors, passed }"
            rules="identifyCard"
            name="chứng minh nhân dân"
          >
            <div
              class="mt-1"
            >
              CMND
            </div>
            <b-form-input
              v-model.trim="customerID"
              maxlength="12"
              :state="customerID ? passed : null"
              @keypress="$onlyNumberInput"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer IdentityCard -->

          <!-- START - Customer ID Date -->
          <div
            class="mt-1"
          >
            Ngày cấp
          </div>
          <b-row
            class="v-flat-pickr-group mx-0"
            align-v="center"
            @keypress="$onlyDateInput"
          >
            <b-icon-x
              v-show="customerIDDate && customerID"
              style="position: absolute; right: 20px"
              class="cursor-pointer text-gray"
              scale="1.3"
              data-clear
            />
            <vue-flat-pickr
              v-model="customerIDDate"
              :config="configIDDate"
              class="form-control"
              placeholder="Chọn ngày"
              :disabled="customerID ? false : true"
            />
          </b-row>
          <!-- END - Customer ID Date -->

          <!-- START - Customer ID Location -->
          <div class="mt-1">
            Nơi cấp
          </div>
          <b-form-input
            v-model="customerIDLocation"
            :disabled="customerID ? false : true"
            maxlength="200"
          />
          <!-- END - Customer ID Location -->
        </b-col>
        <!-- END - Form Personal ID -->

        <!-- START - Form Contact information -->
        <b-col
          xl="3"
          md
          class="bg-white shadow rounded pb-1 mt-1 ml-xl-1 mt-xl-0"
        >
          <label class="w-100 text-center h5"><strong>Thông tin liên hệ</strong></label>
          <!-- START - Customer Phone Number -->
          <validation-provider
            v-slot="{ errors, passed, touched}"
            rules="phoneNumber|required"
            name="di động"
          >
            <div class="mt-1">
              Di động <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model.trim="phoneNumber"
              autocomplete="on"
              type="tel"
              :state="touched ? passed : null"
              maxlength="10"
              @keypress="$onlyNumberInput"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Phone Number -->

          <!-- START - Customer Email -->
          <validation-provider
            v-slot="{ errors, passed }"
            rules="email"
            name="email"
          >
            <div class="mt-1">
              Email
            </div>
            <b-form-input
              id="Email"
              v-model.trim="customerEmail"
              type="email"
              autocomplete="on"
              maxlength="200"
              :state="customerEmail ? passed : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Email -->

          <!-- START - Customer Home number -->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="số nhà"
          >
            <div class="mt-1">
              Số nhà <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="homeNumber"
              maxlength="200"
              :state="touched ? passed : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Home number -->

          <!-- START - Customer Province -->
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
          <!-- END - Customer Province -->

          <!-- START - Customer District and Wards -->
          <b-form-row>
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

          <!-- START - Office-->
          <div class="mt-1">
            Cơ quan
          </div>
          <b-form-input
            v-model="workingOffice"
            maxlength="200"
          />
          <!-- END - Office-->

          <!-- START - Office Address-->
          <div class="mt-1">
            Địa chỉ cơ quan
          </div>
          <b-form-input
            v-model="officeAddress"
            maxlength="200"
          />
          <!-- END - Office Address-->

          <!-- START - Customer Tax code-->
          <validation-provider
            v-slot="{ errors, passed }"
            rules="code"
            name="mã số thuế"
          >
            <div class="mt-1">
              Mã số thuế
            </div>
            <b-form-input
              v-model.trim="taxCode"
              :state="taxCode ? passed : null"
              maxlength="40"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        <!-- END - Customer Tax code-->
        </b-col>
        <!-- END - Form Contact information -->

        <!-- START - Form Membership card -->
        <b-col
          xl="3"
          md
          class="bg-white shadow rounded pb-1 mt-1 ml-md-1 mt-xl-0"
        >
          <label class="w-100 text-center h5"><strong>Thẻ thành viên</strong></label>

          <!-- START - Customer Card type -->
          <div
            class="mt-1"
          >
            Loại thẻ
          </div>
          <tree-select
            v-model="cardTypesSelected"
            :options="cardTypeOptions"
            placeholder="Chọn loại thẻ"
            no-options-text="Không có dữ liệu"
            no-results-text="Không tìm thấy kết quả"
          />
          <!-- END - Customer Card type -->

          <!-- START - Customer Type -->
          <div
            class="mt-1"
          >
            Loại khách hàng
          </div>
          <tree-select
            v-model="closelyTypesSelected"
            :options="closelyTypeOptions"
            placeholder="Chọn loại khách hàng"
            no-options-text="Không có dữ liệu"
            no-results-text="Không tìm thấy kết quả"
          />
        <!-- END - Customer Type -->
        </b-col>
        <!-- END - Form Membership card -->
      </b-row>

      <!-- START - Group Button -->
      <b-row
        class="mx-0 my-1"
        align-v="center"
        align-h="end"
      >
        <b-button
          variant="someThing"
          :disabled="invalid"
          class="btn-brand-1 aligns-items-button-center"
          @click="onClickSaveButton()"
        >
          <b-icon-download
            class="mr-50"
          />
          Lưu
        </b-button>

        <b-button
          class="aligns-items-button-center ml-1"
          @click="navigateBack()"
        >
          <b-icon-x
            class="mr-50"
            scale="1.5"
          />
          Đóng
        </b-button>
      </b-row>
      <!-- END - Group Button -->

    </validation-observer>
    <!-- END - Form Container-->

    <!-- START - Confirm Modal -->
    <confirm-modal
      content="Thông tin khách hàng sẽ không được cập nhật khi rời trang"
      @ok="onClickAgreeButton"
    />
    <!-- END - Confirm Modal -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  number,
  required,
  email,
  code,
  dateFormatVNI,
  age,
  identifyCard,
} from '@/@core/utils/validations/validations'
import ConfirmModal from '@/@core/components/confirm-close-modal/ConfirmModal.vue'
import { formatVniDateToISO } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_TYPES_UPDATE_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  CARD_TYPES_GETTER,
  CLOSELY_TYPES_GETTER,
  SHOP_LOCATIONS_GETTER,
  // ACTIONS
  CREATE_CUSTOMER_ACTION,
  GET_CUSTOMER_TYPES_UPDATE_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,
  GET_SHOP_LOCATIONS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ConfirmModal,
  },

  // START - Data
  data() {
    return {
      isFieldCanCheck: true,
      configBitrhDay: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: new Date().fp_incr(-5479),
      },
      configIDDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        maxDate: 'today',
      },

      goNext: () => {},

      isFirstTimeGetLocations: true,

      // validation rules
      number,
      required,
      email,
      code,
      dateFormatVNI,
      age,
      identifyCard,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      // START - Personal
      lastName: null,
      firstName: null,
      barCode: null,
      birthDay: null,
      genderOptions: commonData.genders,
      gendersSelected: null,
      customerTypesSelected: null,
      customerStatusOptions: customerData.status,
      customerStatusSelected: customerData.status[0].id,
      customerPrivate: false,
      note: null,
      customerID: null,
      customerIDDate: null,
      customerIDLocation: null,
      // END - Personal

      // START - Contact
      phoneNumber: null,
      customerEmail: null,
      homeNumber: null,
      provincesSelected: null,
      districtsSelected: null,
      precinctsSelected: null,
      workingOffice: null,
      officeAddress: null,
      taxCode: null,
      // END - Contact

      // START - MembershipCard
      cardTypesSelected: null,
      closelyTypesSelected: null,
      // END - MembershipCard
    }
  },
  // END - Data

  // START - Computed
  computed: {
    ...mapGetters(CUSTOMER, {
      CUSTOMER_TYPES_UPDATE_GETTER,
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
      CARD_TYPES_GETTER,
      CLOSELY_TYPES_GETTER,
      SHOP_LOCATIONS_GETTER,
    }),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_UPDATE_GETTER.map(data => ({
        id: data.id,
        label: data.name,
      }))
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
    cardTypeOptions() {
      return this.CARD_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.apParamName,
      }))
    },
    closelyTypeOptions() {
      return this.CLOSELY_TYPES_GETTER.map(data => ({
        id: data.id,
        label: data.apParamName,
      }))
    },
    shopLocations() {
      return this.SHOP_LOCATIONS_GETTER
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
        this.GET_DISTRICTS_ACTION({ ...this.decentralization, provinceId: this.provincesSelected })
      }
      if (this.shopLocations && this.isFirstTimeGetLocations) {
        this.districtsSelected = this.shopLocations.districtId
      }
    },
    districtsSelected() {
      this.precinctsSelected = null
      if (this.districtsSelected) {
        this.GET_PRECINCTS_ACTION({ ...this.decentralization, districtId: this.districtsSelected })
      }
      if (this.shopLocations && this.isFirstTimeGetLocations) {
        this.precinctsSelected = this.shopLocations.precinctId
        this.isFirstTimeGetLocations = false
      }
    },
  },

  mounted() {
    this.GET_CUSTOMER_TYPES_UPDATE_ACTION({ data: { ...this.decentralization }, onSuccess: () => {} })
    this.GET_PROVINCES_ACTION({ ...this.decentralization })
    this.GET_CARD_TYPES_ACTION({ ...this.decentralization })
    this.GET_CLOSELY_TYPES_ACTION({ ...this.decentralization })
    this.GET_SHOP_LOCATIONS_ACTION({ ...this.decentralization })
  },

  // before page leave, this will check
  beforeRouteLeave(to, from, next) {
    if (this.isFieldCanCheck) {
      if (this.checkFieldsValueLength()) {
        this.$bvModal.show('confirmModal')
        this.goNext = next
      } else {
        next()
      }
    } else {
      next()
    }
  },

  // START - Methods
  methods: {
    ...mapActions(CUSTOMER, [
      CREATE_CUSTOMER_ACTION,
      GET_CUSTOMER_TYPES_UPDATE_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
      GET_CARD_TYPES_ACTION,
      GET_CLOSELY_TYPES_ACTION,
      GET_SHOP_LOCATIONS_ACTION,
    ]),

    createCustomer() {
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.CREATE_CUSTOMER_ACTION({
            customer: {
              firstName: this.firstName?.trim(),
              lastName: this.lastName?.trim(),
              genderId: this.gendersSelected,
              barCode: this.barCode,
              dob: formatVniDateToISO(this.birthDay),
              customerTypeId: this.customerTypesSelected,
              status: this.customerStatusSelected,
              isPrivate: this.customerPrivate,
              idNo: this.customerID,
              idNoIssuedDate: this.customerID ? formatVniDateToISO(this.customerIDDate) : null,
              idNoIssuedPlace: this.customerID ? this.customerIDLocation?.trim() : null,
              mobiPhone: this.phoneNumber,
              email: this.customerEmail,
              areaId: this.precinctsSelected,
              street: this.homeNumber?.trim(),
              address: null,
              workingOffice: this.workingOffice?.trim(),
              officeAddress: this.officeAddress?.trim(),
              taxCode: this.taxCode,
              noted: this.note?.trim(),
              closelyTypeId: this.closelyTypesSelected,
              cardTypeId: this.cardTypesSelected,
            },
            onSuccess: () => {
              this.navigateBack()
            },
          })
        }
      })
    },

    checkFieldsValueLength() {
      // WARNING: Không xóa mấy cái log này, sau này sẽ cần để check lại
      // console.log(`provinces: ${this.provincesSelected !== this.shopLocations.provinceId} | (${typeof this.provincesSelected}) ->|  ${this.provincesSelected} === ${this.shopLocations.provinceId} (${typeof this.shopLocations.provinceId})`)
      // console.log(`districts: ${this.districtsSelected !== this.shopLocations.districtId} | (${typeof this.districtsSelected}) ->|  ${this.districtsSelected} === ${this.shopLocations.districtId} (${typeof this.shopLocations.districtId})`)
      // console.log(`precincts: ${this.precinctsSelected !== this.shopLocations.precinctId} | (${typeof this.precinctsSelected}) ->|  ${this.precinctsSelected} === ${this.shopLocations.precinctId} (${typeof this.shopLocations.precinctId})`)

      if (
      // START - Personal
        this.lastName
        || this.firstName
        || this.barCode
        || this.birthDay
        || this.gendersSelected
        || this.customerTypesSelected
        || this.customerPrivate
        || this.note
        || this.customerID
        || this.customerIDDate
        || this.customerIDLocation
        // START - Contact
        || this.phoneNumber
        || this.customerEmail
        || this.homeNumber
        || this.provincesSelected !== this.shopLocations.provinceId
        || this.districtsSelected !== this.shopLocations.districtId
        || this.precinctsSelected !== this.shopLocations.precinctId
        || this.workingOffice
        || this.officeAddress
        || this.taxCode
        // START - MembershipCard
        || this.cardTypesSelected
        || this.closelyTypesSelected
      ) {
        return true
      }
      return false
    },

    onClickAgreeButton() {
      this.goNext()
    },

    onClickSaveButton() {
      this.isFieldCanCheck = false
      this.createCustomer()
    },

    navigateBack() {
      this.$router.replace({ name: 'sales-customers' })
    },
  },
  // END - Methods

}
</script>
