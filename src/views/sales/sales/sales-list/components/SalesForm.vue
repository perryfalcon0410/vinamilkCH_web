<template>
  <b-col
    lg
    class="bg-white shadow rounded ml-lg-1 mt-sm-1 mt-lg-0"
  >
    <b-form>
      <!-- START - Date and name -->
      <b-row
        class="my-1"
        align-h="between"
      >
        <!-- START - Date  -->
        <b-row
          class="mx-0 "
          align-v="center"
        >
          <b-icon-alarm-fill
            font-scale="2"
            class="mx-1"
          />
          04/11/2020 19:24
        </b-row>
        <!-- END - Date  -->

        <!-- START - Name  -->
        <b-row
          class="mx-0 mt-md-1 mt-xl-0 px-1"
          align-v="center"
        >
          <b-icon-person-fill
            font-scale="2"
            class="mr-1"
          />
          Mặc Nguyễn Hồng
        </b-row>
        <!-- END - Name  -->

      </b-row>
      <!-- END - Date and name -->

      <!-- START - Section customer -->
      <b-row
        v-b-toggle.collapseCustomer
        align-v="center"
        class="bg-light"
      >
        <b-icon-people
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Khách hàng
        <b-icon-chevron-down class="ml-auto mx-1" />
      </b-row>

      <b-collapse
        id="collapseCustomer"
        visible
      >
        <b-col class="px-0">
          <!-- START - Search -->
          <b-input-group class="input-group-merge mt-1">
            <b-input-group-prepend is-text>
              <b-icon-search />
            </b-input-group-prepend>
            <b-form-input
              placeholder="Tìm khách hàng (F4)"
              @focus="inputSearchFocused = true"
              @blur="inputSearchFocused = false"
            />
            <b-input-group-append is-text>
              <b-icon-plus />
            </b-input-group-append>
          </b-input-group>
          <!-- END - Search -->

          <!-- START - Customer Popup -->
          <b-collapse
            v-model="inputSearchFocused"
            class="position-absolute w-100"
            style="zIndex:1"
          >
            <b-container
              class="my-1 bg-white rounded border border-primary shadow-lg"
            >
              <b-col
                v-for="(n,index) in 6"
                :key="index"
                class="px-0 my-1"
              >
                <!-- START - Section Content -->
                <b-col
                  class="text-dark font-weight-bold px-0"
                >
                  Nguyễn Xuân Điểm
                </b-col>
                <b-col class="text-dark px-0">
                  CUS.BN40011.0001 - 0979604450
                </b-col>
                <!-- END - Section Content -->
              </b-col>
            </b-container>
          </b-collapse>
          <!-- END - Customer Popup -->

          <!-- START - Phone Number -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điện thoại
            </b-col>
            <b-col>
              0979811236
            </b-col>
          </b-row>
          <!-- END - Phone Number -->

          <!-- START - Cumulative points -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điểm tích lũy
            </b-col>
            <b-col>
              36,000
            </b-col>
          </b-row>
          <!-- END - Cumulative points -->

          <!-- START - Address -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Điạ chỉ
            </b-col>
            <b-col>
              285 Cách Mạng Tháng Tám, Phường 12, Quận 10
            </b-col>
          <!-- END - Address -->

          </b-row>
        <!-- END - Address -->
        </b-col>
      </b-collapse>
      <!-- END - Section customer -->

      <!-- START - Section delivery -->
      <b-row
        v-b-toggle.collapseDelivery
        align-v="center"
        class="bg-light mt-1"
      >
        <b-icon-truck
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Giao hàng
        <b-icon-chevron-down class="ml-auto mx-1" />
      </b-row>

      <b-collapse
        id="collapseDelivery"
        visible
      >
        <b-col class="px-0">
          <!-- START - Order type -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Loại đơn hàng
            </b-col>
            <b-col>
              <b-form-select />
            </b-col>
          </b-row>
          <!-- END - Order type -->

          <!-- START - Delivery type -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Loại giao hàng
            </b-col>
            <b-col>
              <b-form-select />
            </b-col>
          </b-row>
          <!-- END - Delivery type -->

          <!-- START - Online order number -->
          <b-row
            class="mt-1"
            align-v="center"
          >
            <b-col cols="4">
              Số đơn online
            </b-col>
            <b-col>
              <b-input-group class="input-group-merge">
                <b-form-input />
                <b-input-group-append is-text>
                  <b-icon-three-dots-vertical />
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
        <!-- END - Online order number -->
        </b-col>
      </b-collapse>
      <!-- END - Section delivery -->

      <!-- START - Section pay -->
      <b-row
        align-v="center"
        class="bg-light mt-1"
      >
        <b-icon-cash-stack
          font-scale="2"
          class="m-1"
          variant="info"
        />
        Thanh toán
      </b-row>

      <b-col class="px-0">
        <!-- START - Product amount -->
        <b-row
          class="mt-1"
          align-v="center"
        >
          <b-col>
            Số lượng sản phẩm
          </b-col>
          <b-col class="text-center text-dark font-weight-bold bg-light rounded py-1">
            12
          </b-col>
        </b-row>
        <!-- END - Product amount -->

        <!-- START - Temporary calculation -->
        <b-row
          class="mt-1"
          align-v="center"
        >
          <b-col>
            Tạm tính
          </b-col>
          <b-col class="text-center text-dark font-weight-bold bg-light rounded py-1">
            1,100,100
          </b-col>
        </b-row>
        <!-- END - Temporary calculation -->

        <!-- START - Note -->
        <b-col class="px-0 mt-1">
          <b-input-group class="input-group-merge">

            <b-input-group-prepend is-text>
              <b-icon-pencil-fill />
            </b-input-group-prepend>
            <b-form-input placeholder="Ghi chú" />

          </b-input-group>
        </b-col>
        <!-- END - Note -->

        <!-- START - Button pay -->
        <b-button
          variant="info"
          class="d-flex w-100 my-1 align-items-center justify-content-center"
        >
          <b-icon-cash-stack
            font-scale="2"
            class="mr-1"
          />
          Thanh toán (F8)
        </b-button>
        <!-- END - Button pay -->

      </b-col>
      <!-- END - Section pay -->

    </b-form>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      inputSearchFocused: false,
    }
  },

}
</script>
