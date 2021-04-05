<template>
  <b-modal
    size="lg"
    :visible="visible"
    title="Import dữ liệu"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <!-- START - Body -->
    <div
      class="bg-white py-1"
    >
      <b-col class="px-0">
        <div class="d-inline-flex text-primary bg-light mb-1 px-1 rounded-right">
          Tập tin
        </div>
        <b-row
          align-v="center"
          class="mx-1"
        >
          <b-col class="px-0">
            <b-form-file
              placeholder="Vui lòng chọn file import kiểm kê"
              accept=".xlsx, .xls"
            />
          </b-col>
          <ins class="cursor-pointer text-primary mx-1">Tải mẫu</ins>
        </b-row>

      </b-col>
      <b-col class="px-0">
        <div class="d-inline-flex text-primary bg-light my-1 px-1 rounded-right">
          Thông tin import
        </div>
        <b-col>
          - Chỉ cho phép nhập file định dạng (xlsx, xls)
        </b-col>

        <b-col class="my-1">
          - Số dòng tối đa để nhập file là 5000
        </b-col>

        <b-col class="text-danger ml-1">
          Nhập thành công 3 dòng, thất bại 5 dòng <ins class="text-primary cursor-pointer">Xem</ins>
        </b-col>
      </b-col>
    </div>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ ok, cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center"
        size="sm"
        @click="ok()"
      >
        <b-icon
          icon="download"
          width="20"
          height="20"
          class="mr-1"
        />
        Import
      </b-button>
      <b-button
        variant="secondary"
        class="d-flex align-items-center"
        size="sm"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->

  </b-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>
