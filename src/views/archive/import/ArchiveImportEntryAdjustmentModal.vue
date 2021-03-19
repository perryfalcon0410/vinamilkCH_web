<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng điều chỉnh"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <!-- START - Body -->
    <b-container fluid>
      <b-row>
        <!-- START - Import/Export List -->
        <b-col
          xl="4"
          class="px-0 d-flex flex-column"
        >
          <label
            for="tableList"
            class="text-dark font-weight-bold px-1 pb-1 "
          >Danh sách nhập/xuất hàng
          </label>

          <b-col
            id="tableList"
            class="bg-info rounded text-dark d-flex flex-column"
          >
            <!-- START - Header -->
            <b-row class="py-1">
              <b-col cols="1" />
              <b-col>
                Số chứng từ
              </b-col>
              <b-col>
                Ngày
              </b-col>
              <b-col>
                Ghi chú
              </b-col>
            </b-row>
            <!-- END - Header -->

            <!-- START - List -->
            <b-row
              v-for="item in productsList"
              :key="item.id"
              class="border-bottom border-white bg-light py-1"
            >
              <b-col cols="1">
                {{ item.id }}
              </b-col>
              <b-col>
                {{ item.lincenseNumber }}
              </b-col>
              <b-col>
                {{ item.date }}
              </b-col>
              <b-col
                class="text-wrap"
              >
                {{ item.note }}
              </b-col>
            </b-row>
            <!-- END - List -->
          </b-col>
        </b-col>
        <!-- END -  Import/Export List -->

        <!-- START -  Import/Export Detail -->
        <b-col class="px-0 ml-xl-1 mt-1 mt-xl-0">
          <label
            for="tableDetail"
            class="text-dark font-weight-bold pb-1 px-1"
          >Chi tiết nhập/xuất hàng
          </label>
          <b-col
            id="tableDetail"
            class="bg-white rounded shadow py-1"
          >
            <vue-good-table
              :columns="columns"
              :rows="rows"
              style-class="vgt-table bordered"
              compact-mode
              line-numbers
            />
          </b-col>
        </b-col>
        <!-- END -  Import/Export Detail -->
      </b-row>
    </b-container>
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
        Lưu ĐC
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
  data() {
    return {
      productsList: [
        {
          id: '1', lincenseNumber: '24300196', date: '15/10/2020', note: 'Sai lệch',
        },
        {
          id: '2', lincenseNumber: '24300610', date: '15/10/2020', note: 'Sai lệch',
        },
        {
          id: '3', lincenseNumber: '24300650', date: '15/10/2020', note: 'Sai lệch',
        },
      ],
      columns: [
        {
          label: 'Số chứng từ',
          field: 'ArchiveImportEntryAdjustmentLincenseNumber',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ArchiveImportEntryAdjustmentIdProduct',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ArchiveImportEntryAdjustmentNameProduct',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ArchiveImportEntryAdjustmentPriceProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'ArchiveImportEntryAdjustmentAmountProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'ArchiveImportEntryAdjustmentTotalMoney',
          sortable: false,
          type: 'number',
        },
      ],
      rows: [
        {
          ArchiveImportEntryAdjustmentLincenseNumber: '290365412',
          ArchiveImportEntryAdjustmentIdProduct: '04DC10',
          ArchiveImportEntryAdjustmentNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryAdjustmentPriceProduct: '5,000',
          ArchiveImportEntryAdjustmentAmountProduct: '240',
          ArchiveImportEntryAdjustmentTotalMoney: '1,200,000',
        },
        {
          ArchiveImportEntryAdjustmentLincenseNumber: '290365412',
          ArchiveImportEntryAdjustmentIdProduct: '04DC10',
          ArchiveImportEntryAdjustmentNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryAdjustmentPriceProduct: '5,000',
          ArchiveImportEntryAdjustmentAmountProduct: '240',
          ArchiveImportEntryAdjustmentTotalMoney: '1,200,000',
        },
        {
          ArchiveImportEntryAdjustmentLincenseNumber: '290365412',
          ArchiveImportEntryAdjustmentIdProduct: '04DC10',
          ArchiveImportEntryAdjustmentNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryAdjustmentPriceProduct: '5,000',
          ArchiveImportEntryAdjustmentAmountProduct: '240',
          ArchiveImportEntryAdjustmentTotalMoney: '1,200,000',
        },
      ],
    }
  },
  methods: {
    hoverHandler(hovered) {
      this.isHover = hovered
    },
  },
}
</script>
