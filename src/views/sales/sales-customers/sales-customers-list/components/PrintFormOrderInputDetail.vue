<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="end"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 20px;">
          CÔNG TY CP SỮA VIỆT NAM
        </strong>
        <strong style="font-size: 17px;">
          CH GTSP Hải Dương
        </strong>
        <strong>
          8 Hoàng Hoa Thám - Hải Dương
        </strong>
        <strong>
          Ngày in : 23/04/2021
        </strong>
      </div>
      <b-img
        src="https://cdn.shopify.com/s/files/1/0506/2613/4215/files/vinamilk_logo_3869x.png?v=1603646389"
        alt="logo"
        width="200px"
      />
    </b-row>
    <!-- END - Header -->

    <!-- START - Title -->
    <b-row
      class="mx-0"
      align-h="center"
      align-v="center"
    >
      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px;">
          BẢNG KÊ CHI TIẾT CÁC HOÁ ĐƠN NHẬP HÀNG
        </strong>
        <p class="my-1">
          Từ ngày 01/02/2021 đến 23/04/2021
        </p>
      </div>

    </b-row>
    <!-- END - Title -->

    <!-- START - Table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      style-class="vgt-table bordered"
      line-numbers
      :sort-options="{
        enabled: false,
      }"
    />
    <!-- END - Table -->

    <!-- START - Fotter -->
    <b-row
      class="mx-0"
      style="width: 85%"
      align-h="end"
    >
      <strong>
        Tổng cộng: <ins class="ml-5">281,717,732</ins>
      </strong>
    </b-row>

    <b-row
      class="mx-5 my-3"
      align-h="between"
    >
      <p>Nhân viên nhập hàng</p>

      <div class="d-flex flex-column align-items-center">
        <p>Cửa hàng trưởng</p>
        <p class="mt-5">
          Nguyễn Thị Thu Vân
        </p>
      </div>

    </b-row>
    <!-- END - Fotter -->

  </b-container>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      columns: [
        {
          label: 'Mã khách hàng',
          field: 'customerCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Họ tên',
          field: 'nameText',
          width: '140px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Điện thoại',
          field: 'mobiPhone',
          type: 'number',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày sinh',
          field: 'dob',
          type: 'date',
          dateInputFormat: 'dd/MM/yyyy',
          dateOutputFormat: 'dd/MM/yyyy',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Giới tính',
          field: 'genderId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Trạng thái',
          field: 'status',
          type: 'boolean',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Nhóm',
          field: 'customerTypeId',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Ngày tạo',
          field: 'createdAt',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
table, th, td {
border-style: solid !important;
}
// END - Layout Table

</style>
