<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- START - Header -->
    <b-row
      align-v="center"
      class="justify-content-between mx-0 pb-1"
    >
      <!-- START - Back -->
      <b-row
        align-v="center"
        class="mx-0"
      >
        <b-icon-arrow-left
          class="cursor-pointer"
          font-scale="2"
          color="gray"
          @click="isModalShow = true"
        />
        <b-col class="font-weight-bold text-dark">
          Thêm mới khách hàng
        </b-col>
      </b-row>
      <!-- END - Back -->

      <!-- START - Button -->
      <b-button-group>
        <b-button
          variant="primary"
          class="rounded mr-1"
          @click="create()"
        >
          <b-icon
            icon="download"
            font-scale="1"
          />
          Lưu
        </b-button>

        <b-button
          class="rounded"
          @click="isModalShow = true"
        >
          <b-icon
            icon="x"
            font-scale="1"
          />
          Đóng
        </b-button>
      </b-button-group>
      <!-- END - Button -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Form Container-->
    <b-row class="mx-0 pb-1">

      <!-- START - Form Personal information -->
      <b-col
        lg
        class="d-flex shadow bg-white rounded"
      >
        <b-row class="flex-grow-1">
          <!-- START - Section 1 -->
          <b-col sm="8">
            <label class="font-weight-bold w-100 text-center mb-2">Thông tin cá nhân</label>
            <!-- START - Customer ID -->
            <b-form-group
              label="Mã khách hàng"
              label-for="ID"
            >
              <b-form-input
                id="ID"
                disabled
              />
            </b-form-group>
            <!-- END - Customer ID -->

            <!-- START - Customer Name -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Họ và tên đệm"
                  label-for="FullName"
                  :state="stateInputFullName"
                >
                  <b-form-input
                    id="FullName"
                    v-model="inputValueFullName"
                    :state="stateInputFullName"
                    trim
                    maxlength="200"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Tên"
                  label-for="Name"
                  :state="stateInputName"
                >
                  <b-form-input
                    id="Name"
                    v-model="inputValueName"
                    :state="stateInputName"
                    trim
                    maxlength="200"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Customer Name -->

            <!-- START - Customer Barcode -->
            <b-form-group
              label="Mã vạch"
              label-for="Barcode"
              :state="stateInputBarCode"
              invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
            >
              <b-form-input
                id="Barcode"
                v-model="inputValueBarCode"
                trim
                maxlength="200"
                :state="stateInputBarCode"
              />
            </b-form-group>
            <!-- END - Customer Barcode -->

            <!-- START - Customer BirthDay and Gender -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Ngày sinh"
                  label-for="BirthDay"
                >
                  <b-form-datepicker
                    id="BirthDay"
                    v-model="inputValueBirthDay"
                    placeholder="chọn ngày"
                    :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                    locale="vi"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Giới tính"
                  label-for="Gender"
                >
                  <b-form-select
                    id="Gender"
                    v-model="selectedGender"
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
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Customer BirthDay and Gender -->

            <!-- START - Customer Group and State -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Nhóm khách hàng"
                  label-for="Group"
                >
                  <b-form-select
                    id="Group"
                    v-model="selectedGroup"
                    :state="stateSelectGroup"
                    required
                  >
                    <b-form-select-option value="">
                      Chọn giá trị
                    </b-form-select-option>
                    <b-form-select-option value="0">
                      Khách hàng thường
                    </b-form-select-option>
                    <b-form-select-option value="1">
                      Khách hàng thân thiết
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Trạng thái"
                  label-for="State"
                >
                  <b-form-select
                    id="State"
                    v-model="selectedStatus"
                    disabled
                  >
                    <b-form-select-option value="1">
                      Hoạt động
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Customer Group and State -->

            <!-- START - Customer loyal -->
            <b-form-checkbox
              v-model="ownCustomer"
              value="1"
              unchecked-value="0"
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
                v-model="inputValueNote"
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
            <b-form-group
              label="CMND"
              label-for="IdentityCard"
              :state="stateInputValueID"
              :invalid-feedback="invalidFeedbackID"
            >
              <b-form-input
                id="IdentityCard"
                v-model="inputValueIdentityCard"
                maxlength="15"
                :state="stateInputValueID"
                trim
              />
            </b-form-group>
            <!-- END - Customer IdentityCard -->

            <!-- START - Customer ID Date -->
            <b-form-group
              label="Ngày cấp"
              label-for="IdDate"
            >
              <b-form-datepicker
                id="IdDate"
                v-model="inputValueIDDate"
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
                v-model="inputValueIDLocation"
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
        class="bg-white shadow rounded ml-lg-1 mt-1 mt-lg-0"
      >
        <label class="font-weight-bold w-100 text-center mb-2">Thông tin liên hệ</label>
        <!-- START - Customer Phone Number -->
        <b-form-group
          label="Di động"
          label-for="PhoneNumber"
          :state="stateInputPhoneNumber"
          :invalid-feedback="inputValuePhoneNumber.length >= 1 ? 'Chỉ nhập ký tự số' : ''"
        >
          <b-form-input
            id="PhoneNumber"
            v-model="inputValuePhoneNumber"
            trim
            maxlength="15"
            :state="stateInputPhoneNumber"
          />
        </b-form-group>
        <!-- END - Customer Phone Number -->

        <!-- START - Customer Email -->
        <b-form-group
          label="Email"
          label-for="Email"
        >
          <b-form-input
            id="Email"
            v-model="inputValueEmail"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Email -->

        <!-- START - Customer Apartment number -->
        <b-form-group
          label="Số nhà"
          label-for="ApartmentNumber"
          :state="stateInputApartmentNumber"
        >
          <b-form-input
            id="ApartmentNumber"
            v-model="inputValueApartmentNumber"
            trim
            maxlength="200"
            :state="stateInputApartmentNumber"
          />
        </b-form-group>
        <!-- END - Customer Apartment number -->

        <!-- START - Customer province -->
        <b-form-group
          label="Tỉnh/ thành"
          label-for="Province"
        >
          <b-form-select
            id="District"
            v-model="selectedProvince"
          >
            <b-form-select-option value="">
              TP.Hồ Chí Minh
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <!-- END - Customer province -->

        <!-- START - Customer District and Wards -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Quận/Huyện"
              label-for="District"
            >
              <b-form-select
                id="District"
                v-model="selectedDistrict"
              >
                <b-form-select-option value="">
                  Quận 1
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
                v-model="selectedWard"
              >
                <b-form-select-option value="">
                  Phường 9
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
        <b-form-group
          label="Mã số thuế"
          label-for="TaxCode"
          :state="stateInputTaxCode"
          invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
        >
          <b-form-input
            id="TaxCode"
            v-model="inputValueTaxCode"
            maxlength="40"
            trim
            :state="stateInputTaxCode"
          />
        </b-form-group>
        <!-- END - Customer Tax code-->
      </b-col>
      <!-- START - Form Contact information -->

      <!-- START - Form Membership card -->
      <b-col
        md
        lg="6"
        xl="3"
        class="shadow rounded mt-1 ml-md-1 ml-lg-0 mt-xl-0 ml-xl-1"
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

    <!-- START - Customer Modal Close -->
    <b-modal
      v-model="isModalShow"
      title="Thông báo"
    >
      Thông tin khách hàng sẽ không được cập nhật khi rời trang
      <template #modal-footer>
        <b-button
          variant="primary"
          @click="routeBack"
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

import {
  CUSTOMER,
  CREATE,
  CREATE_CODE_ERROR,
} from '@/store/customer/type'

export default {
  // START - Data
  data() {
    return {
      // START - Personal
      inputValueFullName: '',
      inputValueName: '',
      inputValueBarCode: '',
      inputValueBirthDay: '',
      selectedGender: 2,
      selectedGroup: '',
      selectedStatus: '1',
      ownCustomer: 0,
      inputValueNote: '',
      inputValueIdentityCard: '',
      stateInputValueID: null,
      invalidFeedbackID: '',
      inputValueIDDate: '',
      inputValueIDLocation: '',
      // END - Personal

      // START - Contact
      inputValuePhoneNumber: '',
      inputValueEmail: '',
      inputValueApartmentNumber: '',
      selectedProvince: '',
      selectedDistrict: '',
      selectedWard: '',
      inputValueCompany: '',
      inputValueCompanyAddress: '',
      inputValueTaxCode: '',
      // END - Contact

      // START - MembershipCard
      selectedMembershipCard: '',
      inputValueCardDate: '',
      selectedCardType: '',
      selectedType: '',
      // END - MembershipCard

      isModalShow: false,
    }
  },
  // END - Data

  // START - Computed
  computed: {
    stateInputFullName() {
      return this.inputValueFullName !== ''
    },

    stateInputName() {
      return this.inputValueName !== ''
    },

    stateInputBarCode() {
      const valid = /^([\w\\.]{0,40})$/
      const result = valid.test(this.inputValueBarCode)
      if (this.inputValueBarCode.length >= 1) {
        return result
      }
      return null
    },

    stateSelectGroup() {
      return this.selectedGroup !== ''
    },

    stateInputIdentityCard() {
      const valid = /^(\d{0,15})$/
      const result = valid.test(this.inputValueIdentityCard)
      if (this.inputValueIdentityCard.length >= 1) {
        return result
      }
      return null
    },

    stateInputPhoneNumber() {
      const valid = /^(\d{1,15})$/
      const result = valid.test(this.inputValuePhoneNumber)
      return result
    },

    stateInputApartmentNumber() {
      return this.inputValueApartmentNumber !== ''
    },

    stateInputTaxCode() {
      const valid = /^([\w\\.]{0,40})$/
      const result = valid.test(this.inputValueTaxCode)
      if (this.inputValueTaxCode.length >= 1) {
        return result
      }
      return null
    },

    ...mapGetters(CUSTOMER, {
      CREATE_CODE_ERROR,
    }),
  },
  // END - Computed

  watch: {
    inputValueIdentityCard() {
      this.stateInputValueID = this.stateInputIdentityCard
      this.invalidFeedbackID = this.stateInputValueID ? null : 'Chỉ nhập ký tự số'
    },
    CREATE_CODE_ERROR() {
      this.checkDuplicationID(this.CREATE_CODE_ERROR)
    },
    inputValueBirthDay() {
      console.log(this.inputValueBirthDay)
      console.log('--------------')
      console.log(new Date(this.inputValueIDDate).toISOString())
    },
  },

  mounted() {
    this.inputValueIdentityCard = this.randomStr(15, '1234567890')
  },

  // START - Methods
  methods: {
    ...mapActions(CUSTOMER, [
      CREATE,
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

      this.CREATE({
        customerCode: customerId,
        barCode: this.inputValueBarCode,
        firstName: this.inputValueFullName,
        lastName: this.inputValueName,
        phoneNumber: this.inputValuePhoneNumber,
        gender: this.selectedGender,
        status: this.selectedStatus,
        birthday: this.inputValueBirthDay !== '' ? (new Date(this.inputValueBirthDay).toISOString()) : '',
        customerGroupId: this.selectedGroup,
        specialCustomer: this.ownCustomer,
        noted: this.inputValueNote,
        email: this.inputValueEmail,
        countryId: 0,
        areaId: 0,
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        address: this.inputValueApartmentNumber,
        shopId: 0,
        identityCardCode: this.inputValueIdentityCard,
        identityCardIssueDate: this.inputValueIDDate !== '' ? new Date(this.inputValueIDDate).toISOString() : '',
        identityCardIssuePlace: this.inputValueIDLocation,
        identityCardExpiryDate: '2021-03-23T12:11:40.781Z',
        identityCardType: 0,
        companyName: this.inputValueCompany,
        companyAddress: this.inputValueCompanyAddress,
        taxCode: this.inputValueTaxCode,
        cardMemberId: 0,
      })
    },

    routeBack() {
      this.isModalShow = !this.isModalShow
      this.$router.back()
    },
  },
  // END - Methods

}
</script>
