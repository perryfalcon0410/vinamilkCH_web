<template>
  <b-modal
    title="Xác nhận đóng"
    :visible="visible"
    size="sm"
  >
    <strong>
      Bạn có muốn lưu thông tin input không
    </strong>
    <template #modal-footer="{}">
      <b-button
        size="sm"
        variant="somgThing"
        @click="ok"
      >
        Có
      </b-button>
      <b-button
        size="sm"
        variant="somThing"
        @click="cancel"
      >
        Không
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
      this.$emit('close')
    },
    cancel() {
      this.$router.back()
    },
  },
}
</script>
