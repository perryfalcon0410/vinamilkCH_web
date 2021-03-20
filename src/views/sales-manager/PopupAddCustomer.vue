<template>
  <!-- POPUP Add Customers START -->
  <b-modal
    id="modal-center"
    size="md"
    centered
    title="Thêm khách hàng"
    :visible="visible"
    hide-footer="true"
  >

    <!-- Start Customer -->
    <b-row>
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Họ và tên đệm</p>
            <p class="text-danger">
              *
            </p>
          </b-row>

          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <p>Tên</p>
          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Ngày sinh</p>
          </b-row>
          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Giới tính</p>
            <p class="text-danger">
              *
            </p>
          </b-row>

          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Điện thoại</p>
            <p class="text-danger">
              *
            </p>
          </b-row>

          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Email</p>
          </b-row>
          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Số nhà</p>
          </b-row>
          <b-form-input
            id="form-input-customer"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col
        xl
        sm="4"
        md="3"
      >

        <b-form-group>
          <b-row class="pl-1">
            <p>Quận/ Huyện</p>
            <p class="text-danger">
              *
            </p>
          </b-row>
          <b-form-select
            id="customerDistrict"
          />
        </b-form-group>
      </b-col>

      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group>
          <b-row class="pl-1">
            <p>Phường/Xã</p>
            <p class="text-danger">
              *
            </p>
          </b-row>
          <b-form-select
            id="customerWards"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-checkbox class="my-1">
      Khách hàng riêng của cửa hàng
    </b-form-checkbox>

    <b-form-group>
      <b-row class="pl-1">
        <p>Ghi chú</p>
      </b-row>
      <b-form-textarea
        id="customerNote"
        maxlength="4000"
      />
    </b-form-group>

    <b-row
      align-h="center"
      class="mt-2"
    >
      <!-- End Customer -->

      <!-- Start Button Bottom  -->
      <b-button
        class="mr-2"
        variant="primary"
        @click="visible = !visible"
      >
        <b-row class="px-1">
          <b-icon-file-earmark-post-fill />
          <h5 class="text-white">
            LƯU
          </h5>
        </b-row>
      </b-button>

      <b-button
        @click="visible = !visible"
      >
        <b-row>
          <b-icon-x />
          <h5 class="text-white ">
            ĐÓNG
          </h5>
        </b-row>
      </b-button>
      <!-- End Button Bottom -->

    </b-row>
  </b-modal>
  <!-- POPUP Add Customers End -->
</template>

<script>
export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    onPress() {
    },
  },
}
</script>
