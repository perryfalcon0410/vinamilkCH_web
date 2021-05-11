<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Form Container-->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
      slim
    >
      <b-row
        class="mx-0"
      >
        <!-- START - Form Personal information -->
        <b-col
          lg
          class="d-flex shadow bg-white rounded px-0"
        >
          <b-row class="flex-grow-1 mx-0">
            <!-- START - Section 1 -->
            <b-col sm="8">
              <label class="font-weight-bold w-100 text-center mb-2 h5">Thông tin cá nhân</label>

              <!-- START - Customer Code -->
              Mã khách hàng
              <b-form-input
                disabled
              />
              <!-- END - Customer Code -->

              <!-- START - Customer Name -->
              <b-form-row>
                <b-col>
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
                      autocomplete="on"
                      maxlength="200"
                    />
                    <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
                  </validation-provider>
                </b-col>

                <b-col>
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
                      autocomplete="on"
                      :state="touched ? passed : null"
                      maxlength="200"
                    />
                    <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
                  </validation-provider>
                </b-col>
              </b-form-row>
              <!-- END - Customer Name -->

              <!-- START - Customer Barcode -->
              <validation-provider
                v-slot="{ errors, passed }"
                rules="code"
                name="Mã vạch"
              >
                <div class="mt-1">
                  Mã vạch
                </div>
                <b-form-input
                  v-model="barCode"

                  :state="barCode ? passed : null"
                  maxlength="40"
                />
                <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
              </validation-provider>
              <!-- END - Customer Barcode -->

              <!-- START - Customer BirthDay and Gender -->
              <b-form-row>
                <!-- BirthDay -->
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
                      <b-input-group-prepend
                        is-text
                        data-toggle
                      >
                        <b-icon-calendar />
                      </b-input-group-prepend>
                      <vue-flat-pickr
                        id="form-input-date-from"
                        v-model="birthDay"
                        :config="configBitrhDay"
                        class="form-control"
                        placeholder="Chọn ngày"
                      />
                      <b-input-group-append
                        is-text
                      >
                        <b-icon-x
                          v-show="birthDay"
                          class="cursor-pointer text-gray"
                          @click="birthDay = null"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
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
                    name="Nhóm khách hàng"
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
                    <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
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
                maxlength="4000"
              />
              <!-- END - Customer Note -->
            </b-col>
            <!-- END - Section 1 -->

            <!-- START - Section 2 -->
            <b-col
              sm
              class="bg-light py-2"
            >
              <!-- START - Customer IdentityCard -->
              <validation-provider
                v-slot="{ errors, passed }"
                rules="identifyCard"
                name="CMND"
              >
                <b-form-group
                  label="CMND"
                  label-for="IdentityCard"
                  :state="customerID ? stateInputValueID = passed : null"
                  :invalid-feedback="invalidFeedbackID"
                >
                  <b-form-input
                    id="IdentityCard"
                    v-model="customerID"
                    maxlength="12"
                    minlength="9"
                    :state="customerID ? stateInputValueID = passed : null"
                  />
                  <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
                </b-form-group>
              </validation-provider>
              <!-- END - Customer IdentityCard -->

              <!-- START - Customer ID Date -->
              <validation-provider
                v-slot="{ errors }"
                rules="dateFormatVNI"
                name="Ngày cấp"
              >
                <div class="mt-1">
                  Ngày cấp
                </div>
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend
                    is-text
                    data-toggle
                  >
                    <b-icon-calendar />
                  </b-input-group-prepend>
                  <vue-flat-pickr
                    v-model="customerIDDate"
                    :config="configIDDate"
                    class="form-control"
                    placeholder="Chọn ngày"
                  />
                  <b-input-group-append
                    is-text
                  >
                    <b-icon-x
                      v-show="customerIDDate"
                      class="cursor-pointer text-gray"
                      @click="customerIDDate = null"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
              </validation-provider>
              <!-- END - Customer ID Date -->

              <!-- START - Customer ID Location -->
              <div class="mt-1">
                Nơi cấp
              </div>
              <b-form-input
                v-model="customerIDLocation"
                maxlength="200"
              />
              <!-- END - Customer ID Location -->
            </b-col>
          <!-- END - Section 2 -->
          </b-row>
        </b-col>
        <!-- END - Form Personal information -->

        <!-- START - Form Contact information -->
        <b-col
          md
          lg="6"
          xl="3"
          class="bg-white shadow rounded ml-lg-1 mt-1 mt-lg-0 pb-1"
        >
          <label class="font-weight-bold w-100 text-center mb-2 h5">Thông tin liên hệ</label>
          <!-- START - Customer Phone Number -->
          <validation-provider
            v-slot="{ errors, passed,}"
            rules="phoneNumber|required"
            name="Di động"
          >
            <div class="mt-1">
              Di động <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="phoneNumber"
              autocomplete="on"
              type="tel"
              :state="phoneNumber ? passed : null"
              maxlength="10"
            />
            <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
          </validation-provider>
          <!-- END - Customer Phone Number -->

          <!-- START - Customer Email -->
          <validation-provider
            v-slot="{ errors, passed }"
            rules="email"
            name="Email"
          >
            <div class="mt-1">
              Email
            </div>
            <b-form-input
              id="Email"
              v-model="customerEmail"
              type="email"
              autocomplete="on"
              maxlength="200"
              :state="customerEmail ? passed : null"
            />
            <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
          </validation-provider>
          <!-- END - Customer Email -->

          <!-- START - Customer Home number -->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="required"
            name="Số nhà"
          >
            <div class="mt-1">
              Số nhà <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="homeNumber"
              maxlength="200"
              :state="touched ? passed : null"
            />
            <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
          </validation-provider>
          <!-- END - Customer Home number -->

          <!-- START - Customer Province -->
          <div
            class="mt-1"
          >
            Tỉnh/ Thành
          </div>
          <tree-select
            v-model="provincesSelected"
            :options="provinceOptions"
            placeholder="Chọn tỉnh/ thành"
            no-options-text="Không có dữ liệu"
            no-results-text="Không tìm thấy kết quả"
          />
          <!-- END - Customer Province -->

          <!-- START - Customer District and Wards -->
          <b-form-row>
            <b-col>
              <div
                class="mt-1"
              >
                Quận/ Huyện
              </div>
              <tree-select
                v-model="districtsSelected"
                :options="districtOptions"
                placeholder="Chọn quận/ huyện"
                no-options-text="Không có dữ liệu"
                no-results-text="Không tìm thấy kết quả"
              />
            </b-col>

            <b-col>
              <div
                class="mt-1"
              >
                Phường/ Xã
              </div>
              <tree-select
                v-model="precinctsSelected"
                :options="precinctOptions"
                placeholder="Chọn phường/ xã"
                no-options-text="Không có dữ liệu"
                no-results-text="Không tìm thấy kết quả"
              />
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
            name="Mã số thuế"
          >
            <div class="mt-1">
              Mã số thuế
            </div>
            <b-form-input
              v-model="taxCode"
              :state="taxCode ? passed : null"
              maxlength="40"
            />
            <small class="text-danger">{{ $capFirstString(errors[0]) }}</small>
          </validation-provider>
        <!-- END - Customer Tax code-->
        </b-col>
        <!-- START - Form Contact information -->

        <!-- START - Form Membership card -->
        <b-col
          md
          lg="6"
          xl="3"
          class="bg-white shadow rounded mt-1 ml-md-1 ml-lg-0 mt-xl-0 ml-xl-1"
        >
          <label class="font-weight-bold w-100 text-center mb-2 h5">Thẻ thành viên</label>

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
      <!-- START - Form Membership card -->

      </b-row>

      <!-- START - Group Button -->
      <b-row
        class="mx-5"
        align-v="center"
        align-h="end"
      >
        <b-button
          variant="primary"
          :disabled="invalid"
          class="aligns-items-button-center"
          @click="onClickSaveButton()"
        >
          <b-icon-download
            class="mr-05"
          />
          Lưu
        </b-button>

        <b-button
          class="aligns-items-button-center ml-1 my-1"
          @click="navigateBack()"
        >
          <b-icon-x
            class="mr-05"
            scale="1.5"
          />
          Đóng
        </b-button>
      </b-row>
    <!-- END - Group Button -->
    </validation-observer>
    <!-- END - Form Container-->

    <!-- START - Customer Modal Close -->
    <b-modal
      v-model="isModalShow"
      title="Thông báo"
    >
      Thông tin khách hàng sẽ không được cập nhật khi rời trang
      <template #modal-footer>
        <b-button
          variant="primary"
          class="aligns-items-button-center"
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button
          class="aligns-items-button-center"
          @click="isModalShow = !isModalShow"
        >
          Đóng
        </b-button>
      </template>
    </b-modal>
    <!-- END - Customer Modal Close -->
  </b-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import router from '@/router/index'
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
import { formatVniDateToISO } from '@/@core/utils/filter'
import commonData from '@/@db/common'
import customerData from '@/@db/customer'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_TYPES_GETTER,
  ERROR_CODE_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  CARD_TYPES_GETTER,
  CLOSELY_TYPES_GETTER,
  // ACTIONS
  CREATE_CUSTOMER_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  // START - Data
  data() {
    return {
      isModalShow: false,
      isFieldCheck: true,
      configBitrhDay: {
        wrap: true,
        allowInput: true,
        allowInvalidPreload: true,
        dateFormat: 'd/m/Y',
        maxDate: new Date().fp_incr(-5479),
      },
      configIDDate: {
        wrap: true,
        allowInput: true,
        allowInvalidPreload: true,
        dateFormat: 'd/m/Y',
        maxDate: 'today',
      },
      goNext: () => {},

      // validation rules
      number,
      required,
      email,
      code,
      dateFormatVNI,
      age,
      identifyCard,

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
      stateInputValueID: null,
      invalidFeedbackID: null,
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
      CUSTOMER_TYPES_GETTER,
      ERROR_CODE_GETTER,
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
      CARD_TYPES_GETTER,
      CLOSELY_TYPES_GETTER,
    }),
    customerTypeOptions() {
      return this.CUSTOMER_TYPES_GETTER.map(data => ({
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
      return this.DISTRICTS_GETTER.map(data => ({
        id: data.id,
        label: data.areaName,
      }))
    },
    precinctOptions() {
      return this.PRECINCTS_GETTER.map(data => ({
        id: data.id,
        label: data.areaName,
      }))
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
  },
  // END - Computed

  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER)
    },
    provincesSelected() {
      this.districtsSelected = null
      this.GET_DISTRICTS_ACTION({ formId: 9, ctrlId: 6, provinceId: this.provincesSelected })
    },
    districtsSelected() {
      this.precinctsSelected = null
      this.GET_PRECINCTS_ACTION({ formId: 9, ctrlId: 6, districtId: this.districtsSelected })
    },
  },

  mounted() {
    this.GET_CUSTOMER_TYPES_ACTION({ formId: 9, ctrlId: 6 })
    this.GET_PROVINCES_ACTION({ formId: 9, ctrlId: 6 })
    this.GET_CARD_TYPES_ACTION({ formId: 9, ctrlId: 6 })
    this.GET_CLOSELY_TYPES_ACTION({ formId: 9, ctrlId: 6 })
  },

  // before page leave, this will check
  beforeRouteLeave(to, from, next) {
    if (this.isFieldCheck) {
      if (this.checkFieldsValueLength()) {
        this.isModalShow = !this.isModalShow
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
      GET_CUSTOMER_TYPES_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
      GET_CARD_TYPES_ACTION,
      GET_CLOSELY_TYPES_ACTION,
    ]),

    checkDuplicationID(errCode) {
      switch (errCode) {
        case 65000:
          this.stateInputValueID = false
          this.invalidFeedbackID = 'Số CMND đã tồn tại'
          break
        case 200:
          this.stateInputValueID = true
          break
        default:
          this.stateInputValueID = true
          break
      }
    },

    createCustomer() {
      this.checkDuplicationID(this.CREATE_CODE_ERROR)
      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.CREATE_CUSTOMER_ACTION({
            customer: {
              firstName: this.firstName?.trim(),
              lastName: this.lastName?.trim(),
              genderId: this.gendersSelected,
              barCode: this.barCode?.trim(),
              dob: formatVniDateToISO(this.birthDay),
              customerTypeId: this.customerTypesSelected,
              status: this.customerStatusSelected,
              isPrivate: this.customerPrivate,
              idNo: this.customerID,
              idNoIssuedDate: formatVniDateToISO(this.customerIDDate),
              idNoIssuedPlace: this.customerIDLocation?.trim(),
              mobiPhone: this.phoneNumber,
              email: this.customerEmail?.trim(),
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
              router.replace({ name: 'sales-customers' })
            },
          })
        }
      })
    },

    checkFieldsValueLength() {
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
        || this.provincesSelected
        || this.districtsSelected
        || this.precinctsSelected
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
      this.isModalShow = !this.isModalShow
      this.goNext()
    },

    onClickSaveButton() {
      this.isFieldCheck = false
      this.createCustomer()
    },

    navigateBack() {
      router.replace({ name: 'sales-customers' })
    },
  },
  // END - Methods

}
</script>
