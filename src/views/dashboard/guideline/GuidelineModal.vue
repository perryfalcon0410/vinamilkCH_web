<template>
  <b-modal
    title="Hướng dẫn"
    :visible="show"
    title-class="font-weight-bolder text-brand-1"
    class="d-print-none"
    @hidden="cancelGuideline()"
  >
    <b-container>
      <b-row
        align-v="left"
        align-h="left"
      >
        <div>
          <h5 style="font-weight: bold;">
            Tài liệu
          </h5>
        </div>
      </b-row>
      <b-row
        align-v="left"
        align-h="left"
        class="my-2"
        style="margin-left: 10px;"
      >
        <div>
          <p>
            1. Tài liệu hướng dẫn sử dụng JSPrintManager:
            <a
              href="/documents/Hướng dẫn sử dụng JSPrintManager.docx"
              download
              target="_blank"
            > Tải về</a>
          </p>
        </div>
        <div>
          <p>
            2. Tài liệu hướng dẫn sử dụng chức năng:
            <a
              href="/documents/HDSD_KCH_POS.pdf"
              download
              target="_blank"
            > Tải về</a>
          </p>
        </div>
        <div>
          <p>
            3. Tài liệu hướng dẫn xử lý các vấn đề thường gặp:
            <a
              href="/documents/Cac van de thuong gap trong POS.pdf"
              download
              target="_blank"
            > Tải về</a>
          </p>
        </div>
      </b-row>
    </b-container>
    <template #modal-footer="{}">
      <b-button
        size="sm"
        class="btn-secondary"
        variant="something"
        @click="cancelGuideline"
      >
        Đóng
      </b-button>
    </template>
  </b-modal>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOpenGuidelineModal: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  methods: {
    cancelGuideline() {
      this.isOpenGuidelineModal = true
      this.$emit('cancelGuideline')
    },
  },

}
</script>
