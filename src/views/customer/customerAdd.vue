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
        class="shadow bg-white rounded"
      >
        <b-row>
          <!-- START - Section 1 -->
          <b-col
            sm="7"
            class="rounded"
          >
            <label class="font-weight-bold w-100 text-center mb-2">Thông tin cá nhân</label>
            <!-- START - Customer ID -->
            <b-form-group
              label="Mã khách hàng"
              label-for="customerID"
              :state="stateInputCustomerID"
              invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
            >
              <b-form-input
                id="customerID"
                v-model="inputValueCustomerID"
                maxlength="40"
                :state="stateInputCustomerID"
                required
                trim
                disabled
              />
            </b-form-group>
            <!-- END - Customer ID -->

            <!-- START - Customer Name -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Họ và tên đệm"
                  label-for="customerSurnameAndMiddleName"
                >
                  <b-form-input
                    id="customerSurnameAndMiddleName"
                    required
                    trim
                    maxlength="200"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Tên"
                  label-for="customerName"
                >
                  <b-form-input
                    id="customerName"
                    required
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
              label-for="customerBarcode"
            >
              <b-form-input
                id="customerBarcode"
                trim
                maxlength="200"
              />
            </b-form-group>
            <!-- END - Customer Barcode -->

            <!-- START - Customer BirthDay and Gender -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Ngày sinh"
                  label-for="customerBirthDay"
                >
                  <b-form-datepicker
                    id="customerBirthDay"
                    placeholder="chọn ngày"
                    :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                    locale="vi"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Giới tính"
                  label-for="customerGender"
                >
                  <b-form-select
                    id="customerGender"
                    v-model="selectedCustomerGender"
                    :options="optionsCustomerGender"
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Customer BirthDay and Gender -->

            <!-- START - Customer Group and State -->
            <b-form-row>
              <b-col>
                <b-form-group
                  label="Nhóm khách hàng"
                  label-for="customerGroup"
                >
                  <b-form-select
                    id="customerGroup"
                    v-model="selectedCustomerGroup"
                    required
                    :options="optionsCustomerGroup"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Trạng thái"
                  label-for="customerState"
                >
                  <b-form-select
                    id="customerState"
                    v-model="selectedCustomerState"
                    :options="optionsCustomerState"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-form-row>
            <!-- END - Customer Group and State -->

            <!-- START - Customer loyal -->
            <b-form-checkbox>
              Khách hàng riêng của cửa hàng
            </b-form-checkbox>
            <!-- END - Customer loyal -->

            <!-- START - Customer Note -->
            <b-form-group
              label="Ghi chú"
              label-for="customerNote"
              class="mt-1"
            >
              <b-form-textarea
                id="customerNote"
                maxlength="4000"
              />
            </b-form-group>
          <!-- END - Customer Note -->
          </b-col>
          <!-- END - Section 1 -->

          <!-- START - Section 2 -->
          <b-col
            sm
            class="bg-light rounded py-2"
          >
            <!-- START - Customer IdentityCard -->
            <b-form-group
              label="CMND"
              label-for="customerIdentityCard"
              :state="stateInputIdentityCard"
              invalid-feedback="Chỉ nhập ký tự số"
            >
              <b-form-input
                id="customerIdentityCard"
                v-model="inputValueIdentityCard"
                maxlength="15"
                :state="stateInputIdentityCard"
                trim
              />
            </b-form-group>
            <!-- END - Customer IdentityCard -->

            <!-- START - Customer Date -->
            <b-form-group
              label="Ngày cấp"
              label-for="customerIdDate"
            >
              <b-form-datepicker
                id="customerIdDate"
                placeholder="chọn ngày"
                :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
                locale="vi"
              />
            </b-form-group>
            <!-- END - Customer Date -->

            <!-- START - Customer Location -->
            <b-form-group
              label="Nơi cấp"
              label-for="customerIdLocation"
            >
              <b-form-input
                id="customerIdLocation"
                maxlength="200"
                trim
              />
            </b-form-group>
          <!-- END - Customer Location -->
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
          label-for="customerPhoneNumber"
          :state="stateInputPhoneNumber"
          invalid-feedback="Chỉ nhập ký tự số"
        >
          <b-form-input
            id="customerPhoneNumber"
            v-model="inputValuePhoneNumber"
            required
            trim
            maxlength="15"
            :state="stateInputPhoneNumber"
          />
        </b-form-group>
        <!-- END - Customer Phone Number -->

        <!-- START - Customer Email -->
        <b-form-group
          label="Email"
          label-for="customerEmail"
        >
          <b-form-input
            id="customerEmail"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Email -->

        <!-- START - Customer Apartment number -->
        <b-form-group
          label="Số nhà"
          label-for="customerApartmentNumber"
        >
          <b-form-input
            id="customerApartmentNumber"
            required
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Apartment number -->

        <!-- START - Customer District and Wards -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Quận/ Huyện"
              label-for="customerDistrict"
            >
              <b-form-select
                id="customerDistrict"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="Phường/ Xã"
              label-for="customerWards"
            >
              <b-form-select
                id="customerWards"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <!-- END - Customer District and Wards -->

        <!-- START - Customer Organ-->
        <b-form-group
          label="Cơ quan"
          label-for="customerOrgan"
        >
          <b-form-input
            id="customerOrgan"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Organ-->

        <!-- START - Customer Organ Address-->
        <b-form-group
          label="Địa chỉ cơ quan"
          label-for="customerOrganAddress"
        >
          <b-form-input
            id="customerOrganAddress"
            trim
            maxlength="200"
          />
        </b-form-group>
        <!-- END - Customer Organ Address-->

        <!-- START - Customer Tax code-->
        <b-form-group
          label="Mã số thuế"
          label-for="customerTaxCode"
          :state="stateInputTaxCode"
          invalid-feedback="Chỉ bao gồm các ký tự [0-9], [a-Z], dấu chấm(.), dấu gạch dưới (_)"
        >
          <b-form-input
            id="customerTaxCode"
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
        class="bg-white shadow rounded mt-1 ml-md-1 ml-lg-0 mt-xl-0 ml-xl-1"
      >
        <label class="font-weight-bold w-100 text-center mb-2">Thẻ thành viên</label>
        <!-- START - Customer Membership card -->
        <b-form-group
          label="Thẻ thành viên"
          label-for="customerMembershipCard"
        >
          <b-form-select
            id="customerMembershipCard"
            v-model="selectedMembershipCard"
            :options="optionsMembershipCard"
          />
        </b-form-group>
        <!-- END - Customer Membership card  -->

        <!-- START - Customer Card Date -->
        <b-form-group
          label="Ngày cấp thẻ"
          label-for="customerCardDate"
        >
          <b-form-datepicker
            id="customerCardDate"
            placeholder="chọn ngày"
            :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
            locale="vi"
          />
        </b-form-group>
        <!-- END - Customer Card Date -->

        <!-- START - Customer Card type -->
        <b-form-group
          label="Loại thẻ"
          label-for="customerCardType"
        >
          <b-form-select
            id="customerCardType"
            v-model="selectedCardType"
            :options="optionsCardType"
          />
        </b-form-group>
        <!-- END - Customer Card type -->

        <!-- START - Customer Type -->
        <b-form-group
          label="Loại khách hàng"
          label-for="customerType"
        >
          <b-form-select
            id="customerType"
            v-model="selectedCustomerType"
            :options="optionsCustomerType"
          />
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
export default {
  data() {
    return {
      inputValueIdentityCard: '',
      inputValueCustomerID: '',
      inputValuePhoneNumber: '',
      inputValueTaxCode: '',

      isModalShow: false,

      selectedCustomerGender: null,
      optionsCustomerGender: [
        { value: null, text: 'Khác' },
        { value: 'Male', text: 'Nam' },
        { value: 'Female', text: 'Nữ' },
      ],

      selectedCustomerGroup: null,
      optionsCustomerGroup: [
        { value: null, text: '--Chọn giá trị--' },
      ],

      selectedCustomerState: 'active',
      optionsCustomerState: [
        { value: 'active', text: 'Hoạt động' },
      ],

      selectedMembershipCard: null,
      optionsMembershipCard: [
        { value: null, text: '--Chọn thẻ thành viên--' },
      ],

      selectedCardType: null,
      optionsCardType: [
        { value: null, text: '--Chọn loại thẻ--' },
      ],

      selectedCustomerType: null,
      optionsCustomerType: [
        { value: null, text: '--Chọn loại khách hàng--' },
      ],
    }
  },
  computed: {
    stateInputCustomerID() {
      const valid = /^([\w\\.]{0,40})$/
      const result = valid.test(this.inputValueCustomerID)
      if (this.inputValueCustomerID.length >= 1) {
        return result
      }
      return null
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
      const valid = /^(\d{0,15})$/
      const result = valid.test(this.inputValuePhoneNumber)
      if (this.inputValuePhoneNumber.length >= 1) {
        return result
      }
      return null
    },

    stateInputTaxCode() {
      const valid = /^([\w\\.]{0,40})$/
      const result = valid.test(this.inputValueTaxCode)
      if (this.inputValueTaxCode.length >= 1) {
        return result
      }
      return null
    },
  },
  methods: {
    routeBack() {
      this.isModalShow = !this.isModalShow
      this.$router.back()
    },
  },
}
</script>
