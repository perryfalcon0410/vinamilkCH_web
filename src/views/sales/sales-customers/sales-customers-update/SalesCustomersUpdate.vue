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
              <label class="font-weight-bold w-100 text-center mb-2 h5"><strong>Thông tin cá nhân</strong></label>

              <!-- START - Customer Code -->
              Mã khách hàng
              <b-form-input
                v-model.trim="customerCode"
                disabled
              />
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
                      v-model.trim="lastName"
                      :state="touched ? passed : null"
                      autocomplete="on"
                      maxlength="200"
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
                      v-model.trim="firstName"
                      autocomplete="on"
                      :state="touched ? passed : null"
                      maxlength="200"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-form-row>
              <!-- END - Customer Name -->

              <!-- START - Customer Barcode -->
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="code"
                name="mã vạch"
              >
                <div class="mt-1">
                  Mã vạch
                </div>
                <b-form-input
                  v-model.trim="barCode"
                  :state="touched ? passed : null"
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
                      <vue-flat-pickr
                        v-model="birthDay"
                        :config="configBitrhDay"
                        class="form-control"
                        placeholder="Chọn ngày"
                      />
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
                      :clearable="false"
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
                    :clearable="false"
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
                v-model.trim="note"
                maxlength="4000"
              />
              <!-- END - Customer Note -->

              <!-- START - Customer Date Created -->
              <div>
                Ngày tạo: <strong>{{ `${$moment(createdAt).format("L")} ${countDays ? `(${countDays})` : ''}` }}</strong>
              </div>
              <!-- END - Customer Date Created -->

            </b-col>
            <!-- END - Section 1 -->

            <!-- START - Section 2 -->
            <b-col
              sm
              style="margin-top: -5px"
              class="bg-light pt-3"
            >
              <!-- START - Customer IdentityCard -->
              <validation-provider
                v-slot="{ errors, passed, touched }"
                rules="identifyCard"
                name="chứng minh nhân dân"
              >
                <b-form-group
                  label="CMND"
                  label-for="IdentityCard"
                  :state="touched ? stateInputValueID = passed : null"
                  :invalid-feedback="invalidFeedbackID"
                >
                  <b-form-input
                    id="IdentityCard"
                    v-model.trim="customerID"
                    maxlength="12"
                    minlength="9"
                    :state="touched ? stateInputValueID = passed : null"
                    @keypress="$onlyNumberInput"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- END - Customer IdentityCard -->

              <!-- START - Customer ID Date -->
              <validation-provider
                v-slot="{ errors, touched, passed }"
                :rules="`${customerID ? 'required' : ''}|dateFormatVNI`"
                name="ngày cấp"
              >
                <div class="mt-1">
                  Ngày cấp
                </div>
                <b-form-group
                  class="m-0"
                  :state="touched ? passed : null"
                  :disabled="customerID ? false : true"
                >
                  <b-input-group @keypress="$onlyDateInput">
                    <vue-flat-pickr
                      v-model="customerIDDate"
                      :config="configIDDate"
                      class="form-control"
                      placeholder="Chọn ngày"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
              <!-- END - Customer ID Date -->

              <!-- START - Customer ID Location -->
              <validation-provider
                v-slot="{ errors, passed, touched }"
                :rules="`${customerID ? 'required' : ''}`"
                name="nơi cấp"
              >
                <div class="mt-1">
                  Nơi cấp
                </div>
                <b-form-input
                  v-model.trim="customerIDLocation"
                  :disabled="customerID ? false : true"
                  :state="touched ? passed : null"
                  maxlength="200"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <!-- END - Customer ID Location -->

              <!-- START - Customer Sales -->
              <b-col class="bg-light my-1 px-0">
                <!-- START - Sales -->
                <b-row>
                  <!-- START - 1 -->
                  <b-col>
                    <div>Doanh số tháng này</div>
                    <strong style="font-size: 20px;">
                      {{ monthOrderAmount || 0 }}
                    </strong>
                  </b-col>
                  <!-- END - 1 -->

                  <!-- START - 2 -->
                  <b-col>
                    <div> Doanh số tổng</div>
                    <strong style="font-size: 20px;">
                      {{ totalBill || 0 }}
                    </strong>
                  </b-col>
                <!-- END - 2 -->
                </b-row>
                <!-- END - Customer Sales -->

              </b-col>
              <!-- END - Section 2 -->
            </b-col>
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
          <label class="font-weight-bold w-100 text-center h5"><strong>Thông tin liên hệ</strong></label>
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
            v-slot="{ errors, passed, touched }"
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
              :state="touched ? passed : null"
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
              v-model.trim="homeNumber"
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
              Tỉnh/ Thành  <sup class="text-danger">*</sup>
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
            v-model.trim="workingOffice"
            maxlength="200"
          />
          <!-- END - Office-->

          <!-- START - Office Address-->
          <div class="mt-1">
            Địa chỉ cơ quan
          </div>
          <b-form-input
            v-model.trim="officeAddress"
            maxlength="200"
          />
          <!-- END - Office Address-->

          <!-- START - Customer Tax code-->
          <validation-provider
            v-slot="{ errors, passed, touched }"
            rules="code"
            name="mã số thuế"
          >
            <div class="mt-1">
              Mã số thuế
            </div>
            <b-form-input
              v-model.trim="taxCode"
              :state="touched ? passed : null"
              maxlength="40"
            />
            <small class="text-danger">{{ errors[0] }}</small>
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
          <label class="font-weight-bold w-100 text-center h5"><strong>Thẻ thành viên</strong></label>

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

    <!-- START - Customer Modal Close -->
    <b-modal
      v-model="isModalShow"
      title="Thông báo"
    >
      Thông tin khách hàng sẽ không được cập nhật khi rời trang
      <template #modal-footer>
        <b-button
          variant="someThing"
          class="btn-brand-1 aligns-items-button-center"
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
import {
  formatVniDateToISO,
  formatISOtoVNI,
  countDays,
} from '@/@core/utils/filter'
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
  CUSTOMER_BY_ID_GETTER,
  // ACTIONS
  GET_CUSTOMER_TYPES_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
  GET_CARD_TYPES_ACTION,
  GET_CLOSELY_TYPES_ACTION,
  UPDATE_CUSTOMER_ACTION,
  GET_CUSTOMER_BY_ID_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  // START - Data
  data() {
    return {
      customerId: `${this.$route.params.id}`,
      isModalShow: false,
      isFieldCheck: true,
      isFirstTimeGetLocations: true,

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
      customerCode: null,
      lastName: null,
      firstName: null,
      barCode: null,
      birthDay: null,
      genderOptions: commonData.genders,
      gendersSelected: null,
      customerTypesSelected: null,
      customerStatusOptions: customerData.status,
      customerStatusSelected: null,
      customerPrivate: false,
      note: null,
      createdAt: null,
      customerID: '',
      stateInputValueID: null,
      invalidFeedbackID: null,
      customerIDDate: '',
      customerIDLocation: null,
      totalBill: null,
      monthOrderAmount: null,
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
      CUSTOMER_BY_ID_GETTER,
    }),
    customer() {
      return this.CUSTOMER_BY_ID_GETTER
    },
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
    countDays() {
      if (this.createdAt) {
        return countDays(this.createdAt)
      }
      return null
    },
  },
  // END - Computed

  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER)
    },

    provincesSelected() {
      this.districtsSelected = null
      if (this.provincesSelected) {
        this.GET_DISTRICTS_ACTION({ ...this.decentralization, provinceId: this.provincesSelected })
      }
      if (this.customer.areaDetailDTO && this.isFirstTimeGetLocations) {
        this.districtsSelected = this.customer.areaDetailDTO.districtId
      }
    },

    districtsSelected() {
      this.precinctsSelected = null
      if (this.districtsSelected) {
        this.GET_PRECINCTS_ACTION({ ...this.decentralization, districtId: this.districtsSelected })
      }
      if (this.customer.areaDetailDTO && this.isFirstTimeGetLocations) {
        this.precinctsSelected = this.customer.areaDetailDTO.precinctId
        this.isFirstTimeGetLocations = false
      }
    },

    customer() {
      this.getCustomerById()
    },
  },

  mounted() {
    this.GET_CUSTOMER_TYPES_ACTION({ ...this.decentralization })
    this.GET_PROVINCES_ACTION({ ...this.decentralization })
    this.GET_CARD_TYPES_ACTION({ ...this.decentralization })
    this.GET_CLOSELY_TYPES_ACTION({ ...this.decentralization })
    this.GET_CUSTOMER_BY_ID_ACTION(`${this.customerId}`)
  },

  // before page leave, this will check
  beforeRouteLeave(to, from, next) {
    if (this.isFieldCheck) {
      if (!this.checkFieldsValueLength()) {
        this.isModalShow = true
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
      GET_CUSTOMER_TYPES_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
      GET_CARD_TYPES_ACTION,
      GET_CLOSELY_TYPES_ACTION,
      UPDATE_CUSTOMER_ACTION,
      GET_CUSTOMER_BY_ID_ACTION,
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

    getCustomerById() {
      if (this.customer) {
        // START - Personal
        this.customerCode = this.customer.customerCode
        this.firstName = this.customer.firstName
        this.lastName = this.customer.lastName
        this.barCode = this.customer.barCode
        this.birthDay = formatISOtoVNI(this.customer.dob)
        this.gendersSelected = this.customer.genderId
        this.customerTypesSelected = this.customer.customerTypeId
        this.customerStatusSelected = this.customer.status
        this.customerPrivate = this.customer.isPrivate || false
        this.note = this.customer.noted || null
        this.createdAt = this.customer.createdAt
        this.customerID = this.customer.idNo || null
        this.customerIDDate = this.customer.idNoIssuedDate ? formatISOtoVNI(this.customer.idNoIssuedDate) : null
        this.customerIDLocation = this.customer.idNoIssuedPlace || null
        this.totalBill = this.customer.totalBill
        this.monthOrderAmount = this.customer.monthOrderAmount
        // START - Contact
        this.phoneNumber = this.customer.mobiPhone || null
        this.customerEmail = this.customer.email || null
        this.homeNumber = this.customer.street || null
        if (this.customer.areaDetailDTO) {
          this.provincesSelected = this.customer.areaDetailDTO.provinceId
        }
        this.workingOffice = this.customer.workingOffice || null
        this.officeAddress = this.customer.officeAddress || null
        this.taxCode = this.customer.taxCode || null
        // START - MembershipCard
        this.cardTypesSelected = this.customer.cardTypeId
        this.closelyTypesSelected = this.customer.closelyTypeId
      }
    },

    updateCustomer() {
      this.checkDuplicationID(this.CREATE_CODE_ERROR)

      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.UPDATE_CUSTOMER_ACTION({
            customer: {
              id: this.customerId,
              customerCode: this.customerCode,
              firstName: this.firstName,
              lastName: this.lastName,
              genderId: this.gendersSelected,
              barCode: this.barCode,
              dob: formatVniDateToISO(this.birthDay),
              customerTypeId: this.customerTypesSelected,
              status: this.customerStatusSelected,
              isPrivate: this.customerPrivate,
              idNo: this.customerID,
              idNoIssuedDate: this.customerID ? formatVniDateToISO(this.customerIDDate) : null,
              idNoIssuedPlace: this.customerID ? this.customerIDLocation : null,
              mobiPhone: this.phoneNumber,
              email: this.customerEmail,
              areaId: this.precinctsSelected,
              street: this.homeNumber,
              workingOffice: this.workingOffice,
              officeAddress: this.officeAddress,
              taxCode: this.taxCode,
              noted: this.note,
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
      // WARNING: Không xóa mấy cái log này, sau này sẽ cần để check lại
      // console.log(`firstName:                 ${this.firstName === this.customer.firstName} | (${typeof this.firstName}) ->|  ${this.firstName} === ${this.customer.firstName} (${typeof this.customer.firstName})`)
      // console.log(`lastName:                  ${this.lastName === this.customer.lastName} | (${typeof this.lastName}) ->|  ${this.lastName} === ${this.customer.lastName} (${typeof this.customer.lastName})`)
      // console.log(`barCode:                   ${(this.barCode || null) === this.customer.barCode} | (${typeof (this.barCode || null)}) ->|  ${(this.barCode || null)} === ${this.customer.barCode} (${typeof this.customer.barCode})`)
      // console.log(`birthDay:                  ${this.birthDay === formatISOtoVNI(this.customer.dob)} | (${typeof this.birthDay}) ->|  ${this.birthDay} === ${formatISOtoVNI(this.customer.dob)} (${typeof formatISOtoVNI(this.customer.dob)})`)
      // console.log(`gendersSelected:           ${(Number(this.gendersSelected) || null) === this.customer.genderId} | (${typeof (Number(this.gendersSelected) || null)}) ->|  ${(Number(this.gendersSelected) || null)} === ${this.customer.genderId} (${typeof this.customer.genderId})`)
      // console.log(`customerTypesSelected:     ${(Number(this.customerTypesSelected) || null) === this.customer.customerTypeId} | (${typeof (Number(this.customerTypesSelected) || null)}) ->|  ${(Number(this.customerTypesSelected) || null)} === ${this.customer.customerTypeId} (${typeof this.customer.customerTypeId})`)
      // console.log(`customerStatusSelected:    ${Number(this.customerStatusSelected) === this.customer.status} | (${typeof Number(this.customerStatusSelected)}) ->|  ${Number(this.customerStatusSelected)} === ${this.customer.status} (${typeof this.customer.status})`)
      // console.log(`customerPrivate:           ${this.customerPrivate === (this.customer.isPrivate || false)} | (${typeof this.customerPrivate})->|  ${this.customerPrivate} === ${(this.customer.isPrivate || false)} (${typeof (this.customer.isPrivate || false)})`)
      // console.log(`note:                      ${(this.note || null) === this.customer.noted} | (${typeof (this.note || null)}) ->|  ${(this.note || null)} === ${this.customer.noted} (${typeof this.customer.noted})`)
      // console.log(`customerID:                ${(this.customerID || null) === this.customer.idNo} | (${typeof (this.customerID || null)}) ->|  ${(this.customerID || null)} === ${this.customer.idNo} (${typeof this.customer.idNo})`)
      // console.log(`customerIDDate:            ${this.customerIDDate === (this.customerID ? formatISOtoVNI(this.customer.idNoIssuedDate) : '')} | (${typeof this.customerIDDate}) ->|  ${this.customerIDDate} === ${(this.customerID ? formatISOtoVNI(this.customer.idNoIssuedDate) : '')} (${typeof (this.customerID ? formatISOtoVNI(this.customer.idNoIssuedDate) : '')})`)
      // console.log(`customerIDLocation:        ${this.customerIDLocation === this.customer.idNoIssuedPlace} | (${typeof this.customerIDLocation}) ->|  ${this.customerIDLocation} === ${this.customer.idNoIssuedPlace} (${typeof this.customer.idNoIssuedPlace})`)
      // console.log(`phoneNumber:               ${(this.phoneNumber || null) === this.customer.mobiPhone} | (${typeof (this.phoneNumber || null)}) ->|  ${(this.phoneNumber || null)} === ${this.customer.mobiPhone} (${typeof this.customer.mobiPhone})`)
      // console.log(`customerEmail:             ${(this.customerEmail || null) === this.customer.email} | (${typeof (this.customerEmail || null)}) ->|  ${(this.customerEmail || null)} === ${this.customer.email} (${typeof this.customer.email})`)
      // console.log(`homeNumber:                ${(this.homeNumber || null) === this.customer.street} | (${typeof (this.homeNumber || null)}) ->|  ${(this.homeNumber || null)} === ${this.customer.street} (${typeof this.customer.street})`)
      // console.log(`provincesSelected:         ${Number(this.provincesSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.provinceId) : 0)} | (${typeof Number(this.provincesSelected)}) ->|  ${Number(this.provincesSelected)} === ${(this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.provinceId) : 0)} (${typeof (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.provinceid) : 0)})`)
      // console.log(`districtsSelected:         ${Number(this.districtsSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.districtId) : 0)} | (${typeof Number(this.districtsSelected)}) ->|  ${Number(this.districtsSelected)} === ${(this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.districtId) : 0)} (${typeof (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.districtId) : 0)})`)
      // console.log(`precinctsSelected:         ${Number(this.precinctsSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.precinctId) : 0)} | (${typeof Number(this.precinctsSelected)}) ->|  ${Number(this.precinctsSelected)} === ${(this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.precinctId) : 0)} (${typeof (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.precinctId) : 0)})`)
      // console.log(`workingOffice:             ${(this.workingOffice || null) === this.customer.workingOffice} | (${typeof (this.workingOffice || null)}) ->|  ${(this.workingOffice || null)} === ${this.customer.workingOffice} (${typeof this.customer.workingOffice})`)
      // console.log(`officeAddress:             ${(this.officeAddress || null) === this.customer.officeAddress} | (${typeof (this.officeAddress || null)}) ->|  ${(this.officeAddress || null)} === ${this.customer.officeAddress} (${typeof this.customer.officeAddress})`)
      // console.log(`taxCodeme:                 ${(this.taxCode || null) === this.customer.taxCode} | (${typeof this.taxCode}) ->|  ${(this.taxCode || null)} === ${(this.customer.taxCode || null)} (${typeof this.customer.taxCode})`)
      // console.log(`cardTypesSelected:         ${(Number(this.cardTypesSelected) || null) === this.customer.cardTypeId} | (${typeof (Number(this.cardTypesSelected) || null)}) ->|  ${(Number(this.cardTypesSelected) || null)} === ${this.customer.cardTypeId} (${typeof this.customer.cardTypeId}`)
      // console.log(`closelyTypesSelected:      ${(Number(this.closelyTypesSelected) || null) === this.customer.closelyTypeId} | (${typeof (Number(this.closelyTypesSelected) || null)}) ->|  ${(Number(this.closelyTypesSelected) || null)} === ${this.customer.closelyTypeId} (${typeof this.customer.closelyTypeId}`)

      if (
        // START - Personal
        this.firstName === this.customer.firstName
        && this.lastName === this.customer.lastName
        && (this.barCode || null) === this.customer.barCode
        && this.birthDay === formatISOtoVNI(this.customer.dob)
        && (Number(this.gendersSelected) || null) === this.customer.genderId
        && (Number(this.customerTypesSelected) || null) === this.customer.customerTypeId
        && Number(this.customerStatusSelected) === this.customer.status
        && this.customerPrivate === (this.customer.isPrivate || false)
        && (this.note || null) === this.customer.noted
        && (this.customerID || null) === this.customer.idNo
        && this.customerIDDate === (this.customerID ? formatISOtoVNI(this.customer.idNoIssuedDate) : '')
        && this.customerIDLocation === this.customer.idNoIssuedPlace
        // START - Contact
        && this.phoneNumber === this.customer.mobiPhone
        && this.customerEmail === this.customer.email
        && this.homeNumber === this.customer.street
        && Number(this.provincesSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.provinceId) : 0)
        && Number(this.districtsSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.districtId) : 0)
        && Number(this.precinctsSelected) === (this.customer.areaDetailDTO ? Number(this.customer.areaDetailDTO.precinctId) : 0)
        && (this.workingOffice || null) === this.customer.workingOffice
        && (this.officeAddress || null) === this.customer.officeAddress
        && (this.taxCode || null) === this.customer.taxCode
        // START - MembershipCard
        && (Number(this.cardTypesSelected) || null) === this.customer.cardTypeId
        && (Number(this.closelyTypesSelected) || null) === this.customer.closelyTypeId
      ) {
        return true
      }
      return false
    },

    onClickAgreeButton() {
      this.isModalShow = false
      this.goNext()
    },

    onClickSaveButton() {
      this.isFieldCheck = false
      this.updateCustomer()
    },

    navigateBack() {
      this.$router.replace({ name: 'sales-customers' })
    },
  },
  // END - Methods

}
</script>
