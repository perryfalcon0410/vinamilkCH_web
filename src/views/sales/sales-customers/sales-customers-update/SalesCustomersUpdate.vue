<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Form Container-->
    <validation-observer
      ref="formContainer"
      v-slot="{invalid}"
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
              <label class="font-weight-bold w-100 text-center mb-2">Thông tin cá nhân</label>

              <!-- START - Customer Code -->
              Mã khách hàng
              <b-form-input
                v-model="customerCode"
                disabled
              />
              <!-- END - Customer Code -->

              <!-- START - Customer Name -->
              <b-form-row>
                <b-col>
                  <validation-provider
                    v-slot="{ errors, valid }"
                    rules="required"
                    name="Họ và tên đệm"
                  >
                    <div class="mt-1">
                      Họ và tên đệm <sup class="text-danger">*</sup>
                    </div>
                    <b-form-input
                      v-model="lastName"
                      :state="lastName ? valid : null"
                      maxlength="200"
                      autocomplete="on"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>

                <b-col>
                  <validation-provider
                    v-slot="{ errors, valid }"
                    rules="required"
                    name="Tên"
                  >
                    <div class="mt-1">
                      Tên <sup class="text-danger">*</sup>
                    </div>
                    <b-form-input
                      v-model="firstName"
                      :state="firstName ? valid : null"
                      maxlength="200"
                      autocomplete="on"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-form-row>
              <!-- END - Customer Name -->

              <!-- START - Customer Barcode -->
              <validation-provider
                v-slot="{ errors, valid }"
                rules="code"
                name="Mã vạch"
              >
                <div class="mt-1">
                  Mã vạch
                </div>
                <b-form-input
                  v-model="barCode"
                  :state="barCode ? valid : null"
                  maxlength="40"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <!-- END - Customer Barcode -->

              <!-- START - Customer BirthDay and Gender -->
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
                      <flat-pickr
                        id="form-input-date-from"
                        v-model="birthDay"
                        :config="configDate"
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
                  <div class="mt-1">
                    Giới tính
                  </div>
                  <v-select
                    v-model="genders"
                    :options="[{ name: 'Nam', id: 1 }, { name: 'Nữ', id: 2 }, { name: 'Khác', id: 3 }]"
                    label="name"
                    :searchable="false"
                    :reduce="options => options.id"
                  />
                </b-col>
              </b-form-row>
              <!-- END - Customer BirthDay and Gender -->

              <!-- START - Customer Group and State -->
              <b-form-row>
                <b-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="Nhóm khách hàng"
                  >
                    <div class="mt-1">
                      Nhóm khách hàng <sup class="text-danger">*</sup>
                    </div>
                    <v-select
                      v-model="customerGroups"
                      :options="customerTypes"
                      label="name"
                      :searchable="false"
                      placeholder="Chọn loại khách hàng"
                      :reduce="options => options.id"
                    >
                      <template #no-options="{}">
                        Không có dữ liệu
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>

                </b-col>

                <b-col>
                  <div class="mt-1">
                    Trạng thái
                  </div>
                  <v-select
                    v-model="customerStatus"
                    :options="[{name: 'Hoạt động', id: 1}, {name: 'Ngưng hoạt động', id: 0}]"
                    label="name"
                    :searchable="false"
                    :reduce="options => options.id"
                  />
                </b-col>
              </b-form-row>
              <!-- END - Customer Group and State -->

              <!-- START - Customer loyal -->
              <b-form-checkbox
                v-model="customerSpecial"
                class="mt-1"
              >
                Khách hàng riêng của cửa hàng
              </b-form-checkbox>
              <!-- END - Customer loyal -->

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

              <!-- START - Customer Date Created -->
              <div>
                Ngày tạo: <strong>{{ `${createdAt} (${countDays} ngày)` }}</strong>
              </div>
              <!-- END - Customer Date Created -->

            </b-col>
            <!-- END - Section 1 -->

            <!-- START - Section 2 -->
            <b-col
              sm
              class="bg-light py-2"
            >
              <!-- START - Customer IdentityCard -->
              <validation-provider
                v-slot="{ errors, valid }"
                rules="number"
                name="CMND"
              >
                <b-form-group
                  label="CMND"
                  label-for="IdentityCard"
                  :state="customerID ? stateInputValueID = valid : null"
                  :invalid-feedback="invalidFeedbackID"
                >
                  <b-form-input
                    id="IdentityCard"
                    v-model="customerID"
                    maxlength="15"
                    :state="customerID ? stateInputValueID = valid : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
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
                  <flat-pickr
                    v-model="customerIDDate"
                    :config="configDate"
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
              <!-- END - Customer ID Date -->

              <!-- START - Customer ID Location -->
              <b-form-group
                label="Nơi cấp"
                label-for="IdLocation"
                class="mt-1"
              >
                <b-form-input
                  id="IdLocation"
                  v-model="customerIDLocation"
                  maxlength="200"
                />
              </b-form-group>
              <!-- END - Customer ID Location -->

              <!-- START - Customer Sales -->
              <b-col class="bg-light py-1 px-0">
                <!-- START - Sales -->
                <b-row>
                  <!-- START - 1 -->
                  <b-col>
                    <div>Doanh số tháng này</div>
                    <strong>
                      {{ monthOrderNumber || 0 }}
                    </strong>
                  </b-col>
                  <!-- END - 1 -->

                  <!-- START - 2 -->
                  <b-col>
                    <div> Doanh số tổng</div>
                    <strong>
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
          <label class="font-weight-bold w-100 text-center mb-2">Thông tin liên hệ</label>
          <!-- START - Customer Phone Number -->
          <validation-provider
            v-slot="{ errors, valid}"
            rules="phoneNumber|required"
            name="Di động"
          >
            <div class="mt-1">
              Di động <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="phoneNumber"
              type="tel"
              autocomplete="on"
              :state="phoneNumber ? valid : null"
              maxlength="10"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Phone Number -->

          <!-- START - Customer Email -->
          <validation-provider
            v-slot="{ errors, valid }"
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
              maxlength="200"
              autocomplete="on"
              :state="customerEmail ? valid : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Email -->

          <!-- START - Customer Home number -->
          <validation-provider
            v-slot="{ errors, valid }"
            rules="required"
            name="Số nhà"
          >
            <div class="mt-1">
              Số nhà <sup class="text-danger">*</sup>
            </div>
            <b-form-input
              v-model="homeNumber"
              maxlength="200"
              :state="homeNumber ? valid : null"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <!-- END - Customer Home number -->

          <!-- START - Customer Province -->
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
              :reduce="options => options.id"
            />
          </b-form-group>
          <!-- END - Customer Province -->

          <!-- START - Customer District and Wards -->
          <b-form-row>
            <b-col>
              <b-form-group
                label="Quận/ Huyện"
                label-for="District"
              >
                <v-select
                  id="District"
                  v-model="customerDistrict"
                  :options="districts"
                  label="name"
                  autocomplete="on"
                  :reduce="options => options.id"
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
              >
                <v-select
                  id="Wards"
                  v-model="customerPrecinct"
                  :options="precincts"
                  label="name"
                  autocomplete="on"
                  :reduce="options => options.id"
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

          <!-- START - Office-->
          <b-form-group
            label="Cơ quan"
            label-for="Office"
          >
            <b-form-input
              id="Office"
              v-model="workingOffice"
              maxlength="200"
            />
          </b-form-group>
          <!-- END - Office-->

          <!-- START - Office Address-->
          <b-form-group
            label="Địa chỉ cơ quan"
            label-for="OfficeAddress"
          >
            <b-form-input
              id="OfficeAddress"
              v-model="officeAddress"
              maxlength="200"
            />
          </b-form-group>
          <!-- END - Office Address-->

          <!-- START - Customer Tax code-->
          <validation-provider
            v-slot="{ errors, valid }"
            rules="code"
            name="Mã số thuế"
          >
            <div>
              Mã số thuế
            </div>
            <b-form-input
              v-model="taxCode"
              :state="taxCode ? valid : null"
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
          <label class="font-weight-bold w-100 text-center mb-2">Thẻ thành viên</label>

          <!-- START - Customer Card type -->
          <b-form-group
            label="Loại thẻ"
            label-for="CardType"
          >
            <v-select
              id="CardType"
              v-model="selectedCardTypes"
              :options="cardTypes"
              label="name"
              autocomplete="on"
              placeholder="Chọn loại thẻ"
              :reduce="options => options.id"
            >
              <template #no-options="{}">
                Không có dữ liệu
              </template>
            </v-select>
          </b-form-group>
          <!-- END - Customer Card type -->

          <!-- START - Customer Type -->
          <b-form-group
            label="Loại khách hàng"
            label-for="Type"
          >
            <v-select
              id="Type"
              v-model="selectedCloselyTypes"
              :options="closelyTypes"
              label="name"
              autocomplete="on"
              placeholder="Chọn loại khách hàng"
              :reduce="options => options.id"
            >
              <template #no-options="{}">
                Không có dữ liệu
              </template>
            </v-select>
          </b-form-group>
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
          @click="onClickSaveButton()"
        >
          <b-icon-download class="mr-1" />
          Lưu
        </b-button>

        <b-button
          class="ml-1 my-1"
          @click="navigateBack()"
        >
          <b-icon-x class="mr-1" />
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
          @click="onClickAgreeButton()"
        >
          Đồng ý
        </b-button>
        <b-button @click="isModalShow = !isModalShow">
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
} from '@/@core/utils/validations/validations'
import { formatDateToVNI, formatVniDateToISO, formatVniDateToGlobal } from '@/@core/utils/filter'
import { dateDiffIndays } from '@/@core/utils/utils'

import flatPickr from 'vue-flatpickr-component'
import '@core/scss/vue/libs/vue-flatpicker.scss'
import vSelect from 'vue-select'
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
    flatPickr,
    vSelect,
  },

  // START - Data
  data() {
    return {
      isModalShow: false,
      isFieldCheck: true,
      customerId: `${this.$route.params.id}`,
      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      goNext: () => {},

      // validation rules
      number,
      required,
      email,
      code,
      dateFormatVNI,
      age,

      // START - Personal
      customerCode: '',
      lastName: '',
      firstName: '',
      barCode: '',
      birthDay: '',
      genders: null,
      customerGroups: null,
      customerStatus: null,
      customerSpecial: false,
      note: '',
      createdAt: '',
      customerID: '',
      stateInputValueID: '',
      invalidFeedbackID: '',
      customerIDDate: '',
      customerIDLocation: '',
      totalBill: '',
      monthOrderNumber: '',
      // END - Personal

      // START - Contact
      phoneNumber: '',
      customerEmail: '',
      homeNumber: '',
      customerProvince: null,
      customerDistrict: null,
      customerPrecinct: null,
      workingOffice: '',
      officeAddress: '',
      taxCode: '',
      // END - Contact

      // START - MembershipCard
      selectedCardTypes: 'null',
      selectedCloselyTypes: 'null',
      // END - MembershipCard
    }
  },
  // END - Data

  // START - Computed
  computed: {
    customer() {
      return this.CUSTOMER_BY_ID_GETTER()
    },
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
    cardTypes() {
      return this.CARD_TYPES_GETTER().map(data => ({
        id: data.id,
        name: data.apParamName,
      }))
    },

    closelyTypes() {
      return this.CLOSELY_TYPES_GETTER().map(data => ({
        id: data.id,
        name: data.apParamName,
      }))
    },
    countDays() {
      return dateDiffIndays(formatVniDateToGlobal(this.createdAt), new Date())
    },
  },
  // END - Computed

  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER())
    },
    customerProvince() {
      if (this.customerProvince) {
        this.customerDistrict = null
        this.GET_DISTRICTS_ACTION(this.customerProvince)
        this.customerDistrict = this.customer.areaDTO.districtId
      }
    },
    customerDistrict() {
      if (this.customerDistrict) {
        this.customerPrecinct = null
        this.GET_PRECINCTS_ACTION(this.customerDistrict)
        this.customerPrecinct = this.customer.areaDTO.precinctId
      }
    },
    customer() {
      this.getCustomer()
    },
  },

  mounted() {
    this.GET_CUSTOMER_TYPES_ACTION()
    this.GET_PROVINCES_ACTION()
    this.GET_CARD_TYPES_ACTION()
    this.GET_CLOSELY_TYPES_ACTION()
    this.GET_CUSTOMER_BY_ID_ACTION(`${this.customerId}`)
  },

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
    ...mapGetters(CUSTOMER, {
      ERROR_CODE_GETTER,
      CUSTOMER_TYPES_GETTER,
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
      CARD_TYPES_GETTER,
      CLOSELY_TYPES_GETTER,
      CUSTOMER_BY_ID_GETTER,
    }),
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

    getCustomer() {
      // START - Personal
      this.customerCode = this.customer.customerCode
      this.firstName = this.customer.firstName
      this.lastName = this.customer.lastName
      this.barCode = this.customer.barCode
      this.birthDay = formatDateToVNI(this.customer.dob)
      this.genders = this.customer.genderId
      this.customerGroups = this.customer.customerTypeId
      this.customerStatus = this.customer.status
      this.customerSpecial = this.customer.isPrivate
      this.note = this.customer.noted
      this.createdAt = formatDateToVNI(this.customer.createdAt)
      this.customerID = this.customer.idNo
      this.customerIDDate = formatDateToVNI(this.customer.idNoIssuedDate)
      this.customerIDLocation = this.customer.idNoIssuedPlace
      this.totalBill = this.customer.totalBill
      this.monthOrderNumber = this.customer.monthOrderNumber
      // START - Contact
      this.phoneNumber = this.customer.mobiPhone
      this.customerEmail = this.customer.email
      this.homeNumber = this.customer.street
      this.customerProvince = this.customer.areaDTO.provinceId
      this.customerDistrict = this.customer.areaDTO.districtId
      this.customerPrecinct = this.customer.areaDTO.precinctId
      this.workingOffice = this.customer.workingOffice
      this.officeAddress = this.customer.officeAddress
      this.taxCode = this.customer.taxCode
      // START - MembershipCard
      this.selectedCardTypes = this.customer.cardTypeId
      this.selectedCloselyTypes = this.customer.closelyTypeId
    },

    create() {
      this.checkDuplicationID(this.CREATE_CODE_ERROR)

      this.$refs.formContainer.validate().then(success => {
        if (success) {
          this.UPDATE_CUSTOMER_ACTION({
            id: this.customerId,
            customerCode: this.customerCode,
            firstName: this.firstName,
            lastName: this.lastName,
            genderId: this.genders,
            barCode: this.barCode,
            dob: formatVniDateToISO(this.birthDay),
            customerTypeId: this.customerGroups,
            status: this.customerStatus,
            shopId: 1,
            isPrivate: this.customerSpecial,
            idNo: this.customerID,
            idNoIssuedDate: formatVniDateToISO(this.customerIDDate),
            idNoIssuedPlace: this.customerIDLocation,
            phone: this.phoneNumber,
            mobiPhone: this.phoneNumber,
            email: this.customerEmail,
            areaId: this.customerPrecinct,
            street: this.homeNumber,
            address: null,
            workingOffice: this.workingOffice,
            officeAddress: this.officeAddress,
            taxCode: this.taxCode,
            isDefault: true,
            noted: this.note,
            closelyTypeId: this.selectedCloselyTypes,
            cardTypeId: this.selectedCardTypes,
          })
        }
      })
    },

    checkFieldsValueLength() {
      if (
      // START - Personal
        this.firstName !== this.customer.firstName
     || this.lastName !== this.customer.lastName
     || this.barCode !== this.customer.barCode
     || this.birthDay !== formatDateToVNI(this.customer.dob)
     || this.genders !== this.customer.genderId
     || this.customerGroups !== this.customer.customerTypeId
     || this.customerStatus !== this.customer.status
     || this.customerSpecial !== this.customer.isPrivate
     || this.note !== this.customer.noted
     || this.customerID !== this.customer.idNo
     || this.customerIDDate !== formatDateToVNI(this.customer.idNoIssuedDate)
     || this.customerIDLocation !== this.customer.idNoIssuedPlace
        // START - Contact
     || this.phoneNumber !== this.customer.mobiPhone
     || this.customerEmail !== this.customer.email
     || this.homeNumber !== this.customer.street
     || this.customerProvince !== this.customer.areaDTO.provinceId
     || this.customerDistrict !== this.customer.areaDTO.districtId
     || this.customerPrecinct !== this.customer.areaDTO.precinctId
     || this.workingOffice !== this.customer.workingOffice
     || this.officeAddress !== this.customer.officeAddress
     || this.taxCode !== this.customer.taxCode
        // START - MembershipCard
     || this.selectedCardTypes !== this.customer.cardTypeId
     || this.selectedCloselyTypes !== this.customer.closelyTypeId
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
      this.create()
    },

    navigateBack() {
      this.$router.back()
    },
  },
  // END - Methods

}
</script>
