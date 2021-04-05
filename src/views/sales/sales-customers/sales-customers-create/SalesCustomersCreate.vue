<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Form Container-->
    <b-row class="mx-0">

      <!-- START - Form Personal information -->
      <b-col
        lg
        class="d-flex shadow bg-white rounded"
      >
        <b-row class="flex-grow-1">
          <!-- START - Section 1 -->
          <b-col sm="8">
            <label class="font-weight-bold w-100 text-center mb-2">Thông tin cá nhân</label>

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
                    v-model="middleName"
                    trim
                    :state="touched ? passed : null"
                    maxlength="200"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
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
                    v-model="name"
                    trim
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
              v-slot="{ errors, passed }"
              rules="code"
              name="Mã vach"
            >
              <div class="mt-1">
                Mã vạch
              </div>
              <b-form-input
                v-model="barCode"
                trim
                :state="barCode.length > 0 ? passed : null"
                maxlength="40"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <!-- END - Customer Barcode -->

            <!-- START - Customer BirthDay and Gender -->
            <b-form-row>
              <b-col>
                <div class="mt-1">
                  Ngày sinh
                </div>
                <b-form-datepicker
                  v-model="birthDay"
                  placeholder="chọn ngày"
                  :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                  locale="vi"
                />
              </b-col>

              <b-col>
                <div class="mt-1">
                  Giới tính
                </div>
                <b-form-select
                  v-model="gender"
                >
                  <b-form-select-option value="2">
                    Khác
                  </b-form-select-option>
                  <b-form-select-option value="1">
                    Nam
                  </b-form-select-option>
                  <b-form-select-option value="0">
                    Nữ
                  </b-form-select-option>
                </b-form-select>
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
                  <b-form-select
                    id="Group"
                    v-model="customerGroup"
                    :state="errors.length > 0 ? false : null"
                  >
                    <b-form-select-option value="">
                      Chọn giá trị
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="item in customerTypes"
                      :key="item.value"
                      :value="item.value"
                    >
                      {{ item.text }}
                    </b-form-select-option>
                  </b-form-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-col>

              <b-col>
                <div class="mt-1">
                  Trạng thái
                </div>
                <b-form-select
                  v-model="customerStatus"
                  disabled
                >
                  <b-form-select-option value="1">
                    Hoạt động
                  </b-form-select-option>
                </b-form-select>
              </b-col>
            </b-form-row>
            <!-- END - Customer Group and State -->

            <!-- START - Customer loyal -->
            <b-form-checkbox
              v-model="customerSpecial"
              value="1"
              unchecked-value="0"
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
              rules="number"
              name="CMND"
            >
              <b-form-group
                label="CMND"
                label-for="IdentityCard"
                :state="customerID.length > 0 ? stateInputValueID = passed : null"
                :invalid-feedback="invalidFeedbackID"
              >
                <b-form-input
                  id="IdentityCard"
                  v-model="customerID"
                  maxlength="15"
                  :state="customerID.length > 0 ? stateInputValueID = passed : null"
                  trim
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
            <!-- END - Customer IdentityCard -->

            <!-- START - Customer ID Date -->
            <b-form-group
              label="Ngày cấp"
              label-for="IdDate"
            >
              <b-form-datepicker
                id="IdDate"
                v-model="customerIDDate"
                placeholder="chọn ngày"
                :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                locale="vi"
              />
            </b-form-group>
            <!-- END - Customer ID Date -->

            <!-- START - Customer ID Location -->
            <b-form-group
              label="Nơi cấp"
              label-for="IdLocation"
            >
              <b-form-input
                id="IdLocation"
                v-model="customerIDLocation"
                maxlength="200"
                trim
              />
            </b-form-group>
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
        <label class="font-weight-bold w-100 text-center mb-2">Thông tin liên hệ</label>
        <!-- START - Customer Phone Number -->
        <validation-provider
          v-slot="{ errors, passed, touched }"
          rules="number|required"
          name="Di động"
        >
          <div class="mt-1">
            Di động <sup class="text-danger">*</sup>
          </div>
          <b-form-input
            v-model="phoneNumber"
            trim
            :state="touched ? passed : null"
            maxlength="15"
          />
          <small class="text-danger">{{ errors[0] }}</small>
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
            trim
            maxlength="200"
            autocomplete="email"
            :state="customerEmail.length > 0 ? passed : null"
          />
          <small class="text-danger">{{ errors[0] }}</small>
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
            trim
            :state="touched ? passed : null"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
        <!-- END - Customer Home number -->

        <!-- START - Customer customerProvinces -->
        <b-form-group
          label="Tỉnh/ thành"
          label-for="Province"
          class="mt-1"
        >
          <b-form-select
            id="Province"
            v-model="customerProvinces"
          >
            <b-form-select-option value="">
              Unknown
            </b-form-select-option>
            <b-form-select-option
              v-for="item in provinces"
              :key="item.value"
              :value="item.value"
            >
              {{ item.text }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <!-- END - Customer customerProvinces -->

        <!-- START - Customer District and Wards -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Quận/Huyện"
              label-for="District"
            >
              <b-form-select
                id="District"
                v-model="customerDistricts"
              >
                <b-form-select-option value="">
                  Unknown
                </b-form-select-option>
                <b-form-select-option
                  v-for="item in districts"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.text }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="Phường/Xã"
              label-for="Wards"
            >
              <b-form-select
                id="Wards"
                v-model="customerPrecincts"
              >
                <b-form-select-option value="">
                  Unknown
                </b-form-select-option>
                <b-form-select-option
                  v-for="item in precincts"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.text }}
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>
        <!-- END - Customer District and Wards -->

        <!-- START - Customer Company-->
        <b-form-group
          label="Cơ quan"
          label-for="Company"
        >
          <b-form-input
            id="Company"
            v-model="inputValueCompany"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Company-->

        <!-- START - Customer Company Address-->
        <b-form-group
          label="Địa chỉ cơ quan"
          label-for="CompanyAddress"
        >
          <b-form-input
            id="CompanyAddress"
            v-model="inputValueCompanyAddress"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Company Address-->

        <!-- START - Customer Tax code-->
        <validation-provider
          v-slot="{ errors, passed }"
          rules="code"
          name="Mã số thuế"
        >
          <div>
            Mã số thuế
          </div>
          <b-form-input
            v-model="taxCode"
            trim
            :state="taxCode.length > 0 ? passed : null"
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
        <!-- START - Customer Membership card -->
        <b-form-group
          label="Thẻ thành viên"
          label-for="MembershipCard"
        >
          <b-form-select
            id="MembershipCard"
            v-model="selectedMembershipCard"
          >
            <b-form-select-option value="">
              Chọn thẻ thành viên
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <!-- END - Customer Membership card  -->

        <!-- START - Customer Card Date -->
        <b-form-group
          label="Ngày cấp thẻ"
          label-for="CardDate"
        >
          <b-form-datepicker
            id="CardDate"
            v-model="inputValueCardDate"
            placeholder="chọn ngày"
            :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
            locale="vi"
          />
        </b-form-group>
        <!-- END - Customer Card Date -->

        <!-- START - Customer Card type -->
        <b-form-group
          label="Loại thẻ"
          label-for="CardType"
        >
          <b-form-select
            id="CardType"
            v-model="selectedCardType"
          >
            <b-form-select-option value="">
              Chọn loại thẻ
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <!-- END - Customer Card type -->

        <!-- START - Customer Type -->
        <b-form-group
          label="Loại khách hàng"
          label-for="Type"
        >
          <b-form-select
            id="Type"
            v-model="selectedType"
          >
            <b-form-select-option value="">
              Chọn loại khách hàng
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <!-- END - Customer Type -->
      </b-col>
      <!-- START - Form Membership card -->

    </b-row>
    <!-- END - Form Container-->

    <!-- START - Group Button -->
    <b-row
      class="mx-5"
      align-v="center"
      align-h="end"
    >
      <b-button
        variant="primary"
      >
        <b-icon-download class="mr-1" />
        Lưu
      </b-button>

      <b-button
        class="ml-1 my-1"
        @click="isModalShow = !isModalShow"
      >
        <b-icon-x class="mr-1" />
        Đóng
      </b-button>
    </b-row>
    <!-- END - Group Button -->

    <!-- START - Customer Modal Close -->
    <b-modal
      v-model="isModalShow"
      title="Thông báo"
    >
      Thông tin khách hàng sẽ không được cập nhật khi rời trang
      <template #modal-footer>
        <b-button
          variant="primary"
          @click="onClickAgreeButton"
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
import { mapActions, mapGetters } from 'vuex'

import { ValidationProvider } from 'vee-validate'
import { number, required, email } from '@/@core/utils/validations/validations'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_TYPES_GETTER,
  ERROR_CODE_GETTER,
  PROVINCES_GETTER,
  DISTRICTS_GETTER,
  PRECINCTS_GETTER,
  // ACTIONS
  CREATE_CUSTOMER_ACTION,
  GET_CUSTOMER_TYPES_ACTION,
  GET_PROVINCES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRECINCTS_ACTION,
} from '../store-module/type'

export default {
  components: {
    ValidationProvider,
  },

  // START - Data
  data() {
    return {

      isModalShow: false,
      isFieldPassed: false,

      // validation rules
      number,
      required,
      email,

      // START - Personal
      middleName: '',
      name: '',
      barCode: '',
      birthDay: '',
      gender: 2,
      customerGroup: '',
      customerStatus: '1',
      customerSpecial: 0,
      note: '',
      customerID: '',
      stateInputValueID: null,
      invalidFeedbackID: '',
      customerIDDate: '',
      customerIDLocation: '',
      // END - Personal

      // START - Contact
      phoneNumber: '',
      customerEmail: '',
      homeNumber: '',
      customerProvinces: '',
      customerDistricts: '',
      customerPrecincts: '',
      inputValueCompany: '',
      inputValueCompanyAddress: '',
      taxCode: '',
      // END - Contact

      // START - MembershipCard
      selectedMembershipCard: '',
      inputValueCardDate: '',
      selectedCardType: '',
      selectedType: '',
      // END - MembershipCard
    }
  },
  // END - Data

  // START - Computed
  computed: {
    customerTypes() {
      return this.CUSTOMER_TYPES_GETTER().map(data => ({
        value: data.id,
        text: data.name,
      }))
    },
    provinces() {
      return this.PROVINCES_GETTER().map(data => ({
        value: data.id,
        text: data.areaName,
      }))
    },
    districts() {
      return this.DISTRICTS_GETTER().map(data => ({
        value: data.id,
        text: data.areaName,
      }))
    },

    precincts() {
      return this.PRECINCTS_GETTER().map(data => ({
        value: data.id,
        text: data.areaName,
      }))
    },

  },
  // END - Computed

  watch: {
    ERROR_CODE_GETTER() {
      this.checkDuplicationID(this.ERROR_CODE_GETTER())
    },
    customerProvinces() {
      this.customerDistricts = ''
      this.GET_DISTRICTS_ACTION(this.customerProvinces)
    },
    customerDistricts() {
      this.customerPrecincts = ''
      this.GET_PRECINCTS_ACTION(this.customerDistricts)
    },
  },

  mounted() {
    this.customerID = this.randomStr(11, '1234567890')
    this.GET_CUSTOMER_TYPES_ACTION()
    this.GET_PROVINCES_ACTION()
  },

  // START - Methods
  methods: {
    ...mapGetters(CUSTOMER, {
      ERROR_CODE_GETTER,
      CUSTOMER_TYPES_GETTER,
      PROVINCES_GETTER,
      DISTRICTS_GETTER,
      PRECINCTS_GETTER,
    }),
    ...mapActions(CUSTOMER, [
      CREATE_CUSTOMER_ACTION,
      GET_CUSTOMER_TYPES_ACTION,
      GET_PROVINCES_ACTION,
      GET_DISTRICTS_ACTION,
      GET_PRECINCTS_ACTION,
    ]),

    randomStr(len, arr) {
      let ans = ''
      for (let i = len; i > 0; i) {
        ans += arr[Math.floor(Math.random() * arr.length)]
        i -= 1
      }
      return ans
    },

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

    create() {
      const customerId = Math.random()
      this.checkDuplicationID(this.CREATE_CODE_ERROR)
      // TODO: Sửa lại các trưởng
      // TODO: Thêm api thẻ thành viên
      this.CREATE_CUSTOMER_ACTION({
        id: customerId,
        firstName: this.middleName,
        lastName: this.name,
        genderId: this.gender,
        customerCode: customerId,
        barCode: this.barCode,
        dob: this.birthDay !== '' ? (new Date(this.birthDay).toISOString()) : '',
        customerTypeId: this.customerGroup,
        status: this.customerStatus,
        shopId: 0,
        isPrivate: this.customerSpecial,
        noted: this.note,
        email: this.customerEmail,
        phoneNumber: this.phoneNumber,
        countryId: 0,
        areaId: 0,
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        address: this.homeNumber,
        identityCardCode: this.customerID,
        identityCardIssueDate: this.customerIDDate !== '' ? new Date(this.customerIDDate).toISOString() : '',
        identityCardIssuePlace: this.customerIDLocation,
        identityCardExpiryDate: '2021-03-23T12:11:40.781Z',
        identityCardType: 0,
        companyName: this.inputValueCompany,
        companyAddress: this.inputValueCompanyAddress,
        taxCode: this.taxCode,
        cardMemberId: 0,
      })
    },

    onClickAgreeButton() {
      this.isModalShow = !this.isModalShow
      this.$router.back()
    },
  },
  // END - Methods

}
</script>
