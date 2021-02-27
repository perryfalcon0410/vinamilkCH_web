<template>
  <b-container
    fluid
    class="d-flex flex-column py-1 px-2"
  >
    <!-- START - Header -->
    <b-row
      align-v="center"
      class="justify-content-between mx-0"
    >

      <!-- START - Back -->
      <b-row
        align-v="center"
        class=""
      >
        <b-icon
          icon="arrow-left"
          font-scale="2"
          color="gray"
        />
        <b-col class="font-weight-bold text-dark">
          Thêm mới khách hàng
        </b-col>
      </b-row>
      <!-- END - Back -->

      <!-- START - Button -->
      <b-button-group>
        <b-button
          variant="info"
          size="sm"
          class="rounded"
        >
          <b-icon
            icon="download"
            width="20"
            height="20"
            class="mr-1"
          />
          Lưu
        </b-button>

        <b-button
          size="sm"
          class="ml-1 rounded"
        >
          <b-icon
            icon="x"
            width="20"
            height="20"
            class=""
          />
          Đóng
        </b-button>
      </b-button-group>
      <!-- END - Button -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Form Container-->

    <b-form-row class="mt-1">

      <!-- START - Form Personal information -->
      <b-col
        class="shadow"
      >
        <b-form-row>
          <!-- START - Section 1 -->
          <b-col
            cols="8"
            class="bg-white p-1 rounded"
          >
            <label class="font-weight-bold w-100 text-center">Thông tin cá nhân</label>
            <!-- START - Customer ID -->
            <b-form-group
              class="mt-2"
              label="Mã khách hàng"
              label-for="customerID"
            >
              <b-form-input
                id="customerID"
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
                  <b-form-input
                    id="customerBirthDay"
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
              />
            </b-form-group>
          <!-- END - Customer Note -->
          </b-col>
          <!-- END - Section 1 -->

          <!-- START - Section 2 -->
          <b-col
            cols="4"
            class="bg-info px-2 pt-5 pb-2 rounded"
          >
            <!-- START - Customer IdentityCard -->
            <b-form-group
              label="CMND"
              label-for="customerIdentityCard"
            >
              <b-form-input
                id="customerIdentityCard"
              />
            </b-form-group>
            <!-- END - Customer IdentityCard -->
            <!-- START - Customer Date -->
            <b-form-group
              label="Ngày cấp"
              label-for="customerDate"
            >
              <b-form-input
                id="customerDate"
              />
            </b-form-group>
            <!-- END - Customer Date -->
            <!-- START - Customer Location -->
            <b-form-group
              label="Nơi cấp"
              label-for="customerLocation"
            >
              <b-form-input
                id="customerLocation"
              />
            </b-form-group>
          <!-- END - Customer Location -->
          </b-col>
          <!-- END - Section 2 -->
        </b-form-row>
      </b-col>
      <!-- END - Form Personal information -->

      <!-- START - Form Contact information -->
      <b-col
        cols="3"
        class="bg-white p-1 ml-1 shadow rounded"
      >
        <label class="font-weight-bold w-100 text-center">Thông tin liên hệ</label>
        <!-- START - Customer Phone Number -->
        <b-form-group
          class="mt-2"
          label="Di động"
          label-for="customerPhoneNumber"
        >
          <b-form-input
            id="customerPhoneNumber"
          />
        </b-form-group>
        <!-- END - Customer Phone Number -->

        <!-- START - Customer Email -->
        <b-form-group
          class="mt-2"
          label="Email"
          label-for="customerEmail"
        >
          <b-form-input
            id="customerEmail"
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
          />
        </b-form-group>
        <!-- END - Customer Organ Address-->

        <!-- START - Customer Tax code-->
        <b-form-group
          label="Mã số thuế"
          label-for="customerTaxCode"
        >
          <b-form-input
            id="customerTaxCode"
          />
        </b-form-group>
        <!-- END - Customer Tax code-->
      </b-col>
      <!-- START - Form Contact information -->

      <!-- START - Form Membership card -->
      <b-col
        cols="3"
        class="bg-white p-1 ml-1 shadow rounded"
      >
        <label class="font-weight-bold w-100 text-center">Thẻ thành viên</label>
        <!-- START - Customer Membership card -->
        <b-form-group
          class="mt-2"
          label="Thẻ thành viên"
          label-for="customerMembershipCard"
        >
          <b-form-input
            id="customerMembershipCard"
          />
        </b-form-group>
        <!-- END - Customer Membership card  -->

        <!-- START - Customer Card Date -->
        <b-form-group
          class="mt-2"
          label="Ngày cấp thẻ"
          label-for="customerCardDate"
        >
          <b-form-input
            id="customerCardDate"
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
          />
        </b-form-group>
        <!-- END - Customer Type -->
      </b-col>
      <!-- START - Form Membership card -->

    </b-form-row>
    <!-- END - Form Container-->

  </b-container>
</template>
