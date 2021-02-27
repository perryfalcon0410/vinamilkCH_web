<template>
  <b-container
    fluid
    class="d-flex flex-column py-1 px-2"
  >
    <!-- START - Header -->
    <b-row
      align-v="center"
      class="justify-content-between mx-0"
    >

      <!-- START - Back -->
      <b-row
        align-v="center"
        class=""
      >
        <b-icon
          icon="arrow-left"
          font-scale="2"
          color="gray"
        />
        <b-col class="font-weight-bold text-dark">
          Tạo phiếu xuất hàng
        </b-col>
      </b-row>
      <!-- END - Back -->
    </b-row>
    <!-- END - Header -->

    <!-- START - Form and list -->
    <b-row no-gutters>

      <!-- START - Form -->
      <b-col
        cols="4"
        class="bg-white shadow rounded mt-4 px-1"
      >
        <!-- START - Archive Export Date  -->
        <b-row class="d-flex my-1">
          <b-col cols="3">
            Ngày xuất:
          </b-col>
          <b-col class="font-weight-bold">
            29/10/2020 lúc 16:16
          </b-col>
        </b-row>
        <!-- END - Archive Export Date -->

        <!-- START - Archive Export ID and Type -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Mã xuất hàng"
              label-for="archiveExportID"
            >
              <b-form-input
                id="archiveExportID"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="Loại xuất"
              label-for="archiveExportType"
            >
              <b-form-select
                id="archiveExportType"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <!-- END - Archive Export ID and Type -->

        <!-- START - Archive Export Archive -->
        <b-form-group
          label="Kho hàng"
          label-for="archiveExportArchive"
        >
          <b-form-select
            id="archiveExportArchive"
          />
        </b-form-group>
        <!-- END - Archive Export Archive -->

        <!-- START - Archive Export Bill Number and Date -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Số hóa đơn"
              label-for="archiveExportBillNumber"
            >
              <b-form-input
                id="archiveExportBillNumber"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="Ngày hóa đơn"
              label-for="archiveExportBillDate"
            >
              <b-form-input
                id="archiveExportBillDate"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <!-- END - Archive Export Bill Number and Date -->

        <!-- START - Archive Export Internal number and PO no -->
        <b-form-row>
          <b-col>
            <b-form-group
              label="Số nội bộ"
              label-for="archiveExportInternalNumber"
            >
              <b-form-input
                id="archiveExportInternalNumber"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              label="PO No"
              label-for="archiveExportPoNo"
            >
              <b-form-input
                id="archiveExportPoNo"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <!-- END - Archive Export Internal number and PO no -->

        <!-- START - Archive Export Note -->
        <b-form-group
          label="Ghi chú"
          label-for="customerType"
        >
          <b-form-textarea
            id="customerType"
          />
        </b-form-group>
        <!-- END - Archive Export Note -->
      </b-col>
      <!-- END - Form -->

      <!-- START - List -->
      <b-col class="d-flex flex-column ml-1">
        <b-row class="ml-2">
          <div class="bg-white text-primary p-1 rounded-top">
            Sản phẩm
          </div>
          <div class="text-dark ml-1 py-1">
            Hàng khuyến mãi
          </div>
        </b-row>
        <b-col class="bg-white h-95 rounded">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            style-class="vgt-table striped"
            compact-mode
            line-numbers="true"
            class="py-1"
          />

          <!-- START - Button -->

          <b-row class="m-1 justify-content-end">
            <b-button-group>
              <b-button
                variant="primary"
                size="sm"
                class="rounded"
              >
                <b-icon
                  icon="download"
                  width="20"
                  height="20"
                  class="mr-1"
                />
                Xuất hàng
              </b-button>

              <b-button
                size="sm"
                class="ml-1 rounded"
              >
                <b-icon
                  icon="x"
                  width="20"
                  height="20"
                  class=""
                />
                Đóng
              </b-button>
            </b-button-group>
          </b-row>
          <!-- END - Button -->
        </b-col>

      </b-col>
      <!-- END - List -->

    </b-row>
    <!-- END - Form and list -->

  </b-container>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã hàng',
          field: 'ArchiveExportProductID',
          sortable: false,
        },
        {
          label: 'Số lượng',
          field: 'ArchiveExportProductAmount',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ArchiveExportProductPrice',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Tên hàng',
          field: 'ArchiveExportProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'ArchiveExportProductDVT',
          type: 'number',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'ArchiveExportProductMoney',
          type: 'number',
          sortable: false,
        },
        {
          label: 'SO No',
          field: 'ArchiveExportProductSONo',
          sortable: false,
        },
      ],
      rows: [
        {
          ArchiveExportProductID: '23',
          ArchiveExportProductAmount: '560',
          ArchiveExportProductPrice: '',
          ArchiveExportProductName: '',
          ArchiveExportProductDVT: '',
          ArchiveExportProductMoney: '25,123,000',
          ArchiveExportProductSONo: '',
        },
        {
          ArchiveExportProductID: '04AA10',
          ArchiveExportProductAmount: '12',
          ArchiveExportProductPrice: '6,300',
          ArchiveExportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveExportProductDVT: 'Hộp',
          ArchiveExportProductMoney: '2,531,000',
          ArchiveExportProductSONo: 'SO.1345',
        },
        {
          ArchiveExportProductID: '04AA10',
          ArchiveExportProductAmount: '12',
          ArchiveExportProductPrice: '6,300',
          ArchiveExportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveExportProductDVT: 'Hộp',
          ArchiveExportProductMoney: '2,531,000',
          ArchiveExportProductSONo: 'SO.1345',
        },
        {
          ArchiveExportProductID: '04AA10',
          ArchiveExportProductAmount: '12',
          ArchiveExportProductPrice: '6,300',
          ArchiveExportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveExportProductDVT: 'Hộp',
          ArchiveExportProductMoney: '2,531,000',
          ArchiveExportProductSONo: 'SO.1345',
        },
        {
          ArchiveExportProductID: '04AA10',
          ArchiveExportProductAmount: '12',
          ArchiveExportProductPrice: '6,300',
          ArchiveExportProductName: 'STT Dâu ADM GOLD 180ml',
          ArchiveExportProductDVT: 'Hộp',
          ArchiveExportProductMoney: '2,531,000',
          ArchiveExportProductSONo: 'SO.1345',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
