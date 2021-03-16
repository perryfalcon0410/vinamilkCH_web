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
  methods: {
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
  },
}
</script>

<template>
  <b-modal
    id="modal-scoped"
    ref="my-modal"
    variant="primary"
    hide-footer
    header-bg-variant="primary"
    :visible="visible"
  >
    <template #modal-header="{}">
      <div class="w-100 text-center">
        <h2 class=" mt-1 font-weight-bold text-white">
          ĐỔI MẬT KHẨU
        </h2>
      </div>
    </template>
    <b-col>
      <b-input-group class="input-group-merge mt-4">
        <b-input-group-prepend is-text>
          <b-icon-person-fill />
        </b-input-group-prepend>
        <b-form-input
          id="input-live"
          v-model="username"
          placeholder="Tên đăng nhập"
          maxlength="20"
        />
      </b-input-group>
    </b-col>
    <b-col>
      <b-input-group class="input-group-merge mt-4">
        <b-input-group-prepend is-text>
          <b-icon-lock-fill />
        </b-input-group-prepend>
        <b-form-input
          id="input-live"
          v-model="password"
          placeholder="Mật khẩu cũ"
          maxlength="20"
          type="password"
        />
      </b-input-group>
    </b-col>
    <b-col>
      <b-input-group class="input-group-merge mt-4">
        <b-input-group-prepend is-text>
          <b-icon-lock-fill />
        </b-input-group-prepend>
        <b-form-input
          id="input-live"
          v-model="newPassword"
          placeholder="Mật khẩu mới"
          maxlength="20"
          type="password"
        />
      </b-input-group>
    </b-col>
    <b-col>
      <b-input-group class="input-group-merge mt-4">
        <b-input-group-prepend is-text>
          <b-icon-lock-fill />
        </b-input-group-prepend>
        <b-form-input
          id="input-live"
          v-model="reconfirmPassword"
          placeholder="Xác nhập mật khẩu"
          maxlength="20"
          type="password"
        /></b-input-group>
    </b-col>

    <b-col>
      <b-button
        class="mt-4"
        variant="primary"
        block
      >
        ĐỔI MẬT KHẨU
      </b-button>
      <b-button
        class="mt-1"
        block
        @click="toggleModal"
      >
        HỦY BỎ
      </b-button>
    </b-col>
    <b-col>
      <h5 class="mt-3 text-danger font-weight-light">
        Để đảm bảo an toàn, Khách hàng nên sử dụng mật khẩu mạnh: độ dài tối thiểu 8 ký tự, bao gồm: chữ hoa, thường, số và ký tự đặc biệt
      </h5>
    </b-col>
    <b-col />

    <b-navbar
      id="v-navbar"
      type="primary"
      class="mt-2"
    >
      <img
        src="../../../assets/images/banner/banner-27.jpg"
        width="60"
        height="50"
        class="mr-2"
      >
      <h6 class="font-weight-bold mr-auto">
        Copyright © Viettel
      </h6>
      <h6 class="text-primary small">
        http://viettel.com.vn
      </h6>
    </b-navbar>
  </b-modal>
</template>
