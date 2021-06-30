<template>
  <b-modal
    id="confirmModal"
    :title="title"
    title-class="font-weight-bolder text-brand-1"
  >
    {{ content }}
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
    title: {
      type: String,
      default: 'Thông báo',
    },
    content: {
      type: String,
      default: 'Dữ liệu đang được tạo, bạn có muốn đóng?',
    },
  },

  methods: {
    ok() {
      this.$emit('ok')
      this.$bvModal.hide('confirmModal')
    },
    cancel() {
      this.$emit('cancel')
      this.$bvModal.hide('confirmModal')
    },
  },
}
</script>
