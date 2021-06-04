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
        <strong style="font-size: 30px"> Cửa hàng Xuất hàng </strong>
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

    <!-- START - Total section 1 -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="background-color: gray"
    >
      <div>Tổng cộng: <strong>29</strong></div>
      <div>Tổng SL: <strong>29</strong></div>
      <div>T.Tiền: <strong>29</strong></div>
    </b-row>
    <!-- END - Total section 1 -->

    <!-- START - Table section 1 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất điều chỉnh</strong>
      <div>Tổng SL: <strong>29</strong></div>
      <div>T.Tiền: <strong>29</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th colspan="10">
              <b-row
                align-h="around"
              >
                <div>Số HĐ: SAL.MT10</div>
                <div>- Ngày HĐ: 01/03/2021</div>
                <div>- Số PO:</div>
                <div>- Số nội bộ: EXS.MT1008</div>
                <div>- Mã xuất hàng: DCG_0000061</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: 16</div>
                <div>T.Tiền: 16</div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              rowspan="2"
              class="text-center"
            >
              STT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Mã SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Tên SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              ĐVT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              SL
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu vào
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu ra
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Chênh lệch
            </th>
          </tr>
          <!-- END - Header 2 -->

          <!-- START - Header 3 -->
          <tr>
            <!-- Đầu vào -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
            <!-- Đầu ra -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 3 -->

          <!-- START - Header 4 -->
          <tr>
            <th
              colspan="10"
            >
              <b-row
                align-h="around"
              >
                <div>
                  Ngành hàng: A
                </div>
                <div>
                  Tổng SL: 16
                </div>
                <div>
                  T.Tiền: 16
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 4 -->
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
            <td />
          </tr>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 1 -->

    <!-- START - Table section 2 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0 mt-2"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất trả PO</strong>
      <div>Tổng SL: <strong>29</strong></div>
      <div>T.Tiền: <strong>29</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th colspan="10">
              <b-row
                align-h="around"
              >
                <div>Số HĐ: SAL.MT10</div>
                <div>- Ngày HĐ: 01/03/2021</div>
                <div>- Số PO:</div>
                <div>- Số nội bộ: EXS.MT1008</div>
                <div>- Mã xuất hàng: DCG_0000061</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: 16</div>
                <div>T.Tiền: 16</div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              rowspan="2"
              class="text-center"
            >
              STT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Mã SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Tên SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              ĐVT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              SL
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu vào
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu ra
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Chênh lệch
            </th>
          </tr>
          <!-- END - Header 2 -->

          <!-- START - Header 3 -->
          <tr>
            <!-- Đầu vào -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
            <!-- Đầu ra -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 3 -->

          <!-- START - Header 4 -->
          <tr>
            <th
              colspan="10"
            >
              <b-row
                align-h="around"
              >
                <div>
                  Ngành hàng: A
                </div>
                <div>
                  Tổng SL: 16
                </div>
                <div>
                  T.Tiền: 16
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 4 -->
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
            <td />
          </tr>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 2 -->

    <!-- START - Table section 3 -->
    <!-- START - Total section 2 -->
    <b-row
      class="mx-0 mt-2"
      align-h="around"
      align-v="end"
      style="border-top: 2px solid; margin-top: 1px"
    >
      <strong style="font-size: 16px;">Loại: Xuất vay mượn</strong>
      <div>Tổng SL: <strong>29</strong></div>
      <div>T.Tiền: <strong>29</strong></div>
    </b-row>
    <!-- END - Total section 2 -->

    <!-- START - Table 1 -->
    <b-col class="px-0">
      <table>
        <!-- START - Header -->
        <thead>
          <!-- START - Header 1 -->
          <tr>
            <th colspan="10">
              <b-row
                align-h="around"
              >
                <div>Số HĐ: SAL.MT10</div>
                <div>- Ngày HĐ: 01/03/2021</div>
                <div>- Số PO:</div>
                <div>- Số nội bộ: EXS.MT1008</div>
                <div>- Mã xuất hàng: DCG_0000061</div>
              </b-row>
              <b-row
                class="mt-1"
                align-h="around"
              >
                <div>Tổng SL: 16</div>
                <div>T.Tiền: 16</div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 1 -->

          <!-- START - Header 2 -->
          <tr>
            <th
              rowspan="2"
              class="text-center"
            >
              STT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Mã SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Tên SP
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              ĐVT
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              SL
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu vào
            </th>
            <th
              colspan="2"
              class="text-center"
            >
              Đầu ra
            </th>
            <th
              rowspan="2"
              class="text-center"
            >
              Chênh lệch
            </th>
          </tr>
          <!-- END - Header 2 -->

          <!-- START - Header 3 -->
          <tr>
            <!-- Đầu vào -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
            <!-- Đầu ra -->
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              T.Tiền
            </th>
          </tr>
          <!-- END - Header 3 -->

          <!-- START - Header 4 -->
          <tr>
            <th
              colspan="10"
            >
              <b-row
                align-h="around"
              >
                <div>
                  Ngành hàng: A
                </div>
                <div>
                  Tổng SL: 16
                </div>
                <div>
                  T.Tiền: 16
                </div>
              </b-row>
            </th>
          </tr>
          <!-- END - Header 4 -->
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
            <td />
          </tr>
        </tbody>
        <!-- END - Body -->
      </table>
    </b-col>
    <!-- END - Table 1 -->

    <!-- START - Total section 3 -->
    <b-row
      class="mx-0"
      align-h="end"
    >
      <div
        class="rounded"
        style="border: 2px dotted; margin-top: 4px; padding: 0 150px 0 20px;"
      >
        <p>Điều chỉnh:</p>
        <p>Tổng cộng:</p>
      </div>
    </b-row>
    <!-- END - Total section 3 -->
    <!-- END - Table section 3 -->

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
