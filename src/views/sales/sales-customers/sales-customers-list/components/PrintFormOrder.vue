<template>
  <b-container
    fluid
    class="d-none d-print-block px-0 text-brand-3"
  >
    <!-- START - Header -->
    <b-row
      class="mx-0 my-1"
      align-h="between"
      align-v="center"
    >
      <div class="d-flex flex-column">
        <strong style="font-size: 17px;">
          CH GTSP Hải Dương
        </strong>
        <p class="mt-1">
          Add: 8 Hoàng Hoa Thám - Hải Dương
        </p>
        <p>
          Tel: (84.320) 3 838 399
        </p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px;">
          Báo cáo bán hàng
        </strong>
        <p class="my-1">
          Từ ngày 01/02/2021 đến 23/04/2021
        </p>
        <p>
          Ngày in : 23/04/2021 - 11:33:28AM
        </p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px;">
          CH GTSP Hải Dương
        </strong>
      </div>
      <!-- END - Invisible element to align title -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Total view -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <div>
        Tổng số HĐ: <strong>12</strong>
      </div>
      <div>Tổng cộng: <strong>29</strong> </div>
      <strong>504,161</strong>
      <strong>31,000</strong>
      <strong>470,061</strong>
    </b-row>
    <!-- END - Total view -->

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
      class="mx-5 my-3"
      align-h="between"
    >
      <strong>Người in</strong>

      <div class="d-flex flex-column align-items-center">
        <p>....., Ngày.....Tháng.....Năm.....</p>
        <strong>Cửa hàng trưởng</strong>
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
