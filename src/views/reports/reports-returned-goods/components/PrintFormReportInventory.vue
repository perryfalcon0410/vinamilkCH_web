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
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
        <p class="mt-1">
          Add: 8 Hoàng Hoa Thám - Hải Dương
        </p>
        <p>Tel: (84.320) 3 838 399</p>
      </div>

      <div class="d-flex flex-column align-items-center">
        <strong style="font-size: 30px"> Tồn kho cửa hàng </strong>
        <p class="my-1">
          Từ ngày 01/02/2021 đến 23/04/2021
        </p>
        <p>Ngày in : 23/04/2021 - 11:33:28AM</p>
      </div>

      <!-- START - Invisible element to align title -->
      <div
        class="d-flex flex-column"
        style="opacity: 0"
      >
        <strong style="font-size: 17px"> CH GTSP Hải Dương </strong>
      </div>
      <!-- END - Invisible element to align title -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Total section -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <strong> CH GTSP Hải Dương </strong>
      <div>Tổng SL: <strong><ins>29</ins></strong>
      </div>
      <div>Tổng T.Tiền: <strong><ins>29</ins></strong>
      </div>

    </b-row>
    <!-- END - Total section -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th
              colspan="12"
            >
              <b-row
                class="mx-0"
                align-h="around"
              >
                <div>Ngành hàng: <strong>A</strong>
                </div>
                <div>Tổng SL:
                  <strong>504,161</strong>
                </div>
                <div>Tổng T.Tiền:
                  <strong>31,000</strong>
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              class="text-center"
            >
              STT
            </th>
            <th
              class="text-center"
            >
              Mã KH
            </th>
            <th
              class="text-center"
            >
              Tên KH
            </th>
            <th
              class="text-center"
            >
              Địa chỉ
            </th>
            <th
              class="text-center"
            >
              Tần suất
            </th>
            <th
              class="text-center"
            >
              A
            </th>
            <th
              class="text-center"
            >
              B
            </th>
            <th
              class="text-center"
            >
              C
            </th>
            <th
              class="text-center"
            >
              D
            </th>
            <th
              class="text-center"
            >
              E
            </th>
            <th
              class="text-center"
            >
              G
            </th>
            <th
              class="text-center"
            >
              Tổng cộng
            </th>
          </tr>
          <!-- END - Header 2 -->

        </thead>
        <!-- END - Header -->

        <!-- START - Body -->
        <tbody>
          <tr>
            <td>1</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td>10</td>
            <td />
            <td />
            <td />
            <td />
            <td>43,200</td>
            <td />
            <td />
          </tr>
          <tr>
            <td>2</td>
            <td>02BC10</td>
            <td>SBot Dielac Canxi HG 400g</td>
            <td>Hộp</td>
            <td>10</td>
            <td />
            <td />
            <td />
            <td />
            <td>43,200</td>
            <td />
            <td />
          </tr>
        </tbody>
        <!-- END - Body -->

      </table>
    </b-col>
    <!-- END - Table 1 -->

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
table {
  width: 100%;
}
th {
  border-style: solid;
  border-width: 2px;
}
td {
  border-style: dotted;
  border-width: 2px;
}
</style>
