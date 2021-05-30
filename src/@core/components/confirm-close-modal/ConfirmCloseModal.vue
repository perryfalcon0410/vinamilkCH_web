<template>
  <b-modal
    title="Xác nhận đóng"
    :visible="visible"
    size="sm"
  >
    <strong>
      Dữ liệu đang được tạo, bạn có muốn đóng ?
    </strong>
    <template #modal-footer="{}">
      <b-button
        size="sm"
        class="btn-brand-1"
        variant="something"
        @click="ok"
      >
        Đồng ý
      </b-button>
      <b-button
        size="sm"
        @click="cancel"
      >
        Hủy bỏ
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  methods: {
    ok() {
      this.$router.back()
    },
    cancel() {
      this.$emit('close')
    },
  },
}
</script>
