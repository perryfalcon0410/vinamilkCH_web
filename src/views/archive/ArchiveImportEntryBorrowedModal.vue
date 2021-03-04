<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng vay mượn"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
    modal-class="px-5 pt-2"
  >
    <!-- START - Body -->
    <b-container
      fluid
    >
      <b-row>

        <!-- START - Import/Export List -->
        <b-col
          cols="4"
          class="d-flex flex-column"
        >
          <label
            for="tableList"
            class="pb-1 text-dark font-weight-bold"
          >Danh sách nhập/xuất hàng
          </label>

          <b-col class="bg-info pb-5 rounded text-dark">
            <!-- START - Header -->
            <b-row class="py-1">
              <b-col cols="1" />
              <b-col cols="4">
                Số chứng từ
              </b-col>
              <b-col cols="3">
                Ngày
              </b-col>
              <b-col cols="4">
                Ghi chú
              </b-col>
            </b-row>
            <!-- END - Header -->

            <!-- START - Body -->
            <b-row
              v-for="item in productsList"
              :key="item.id"
              class="border-bottom border-white bg-light py-1"
            >
              <b-col cols="1">
                {{ item.id }}
              </b-col>
              <b-col cols="4">
                {{ item.lincenseNumber }}
              </b-col>
              <b-col cols="3">
                {{ item.date }}
              </b-col>
              <b-col
                cols="4"
                class="text-wrap"
              >
                {{ item.note }}

              </b-col>
            </b-row>
            <!-- END - Body -->
          </b-col>
        </b-col>
        <!-- END -  Import/Export List -->

        <!-- START -  Import/Export Detail -->
        <b-col class="d-flex flex-column">
          <label
            for="tableDetail"
            class="pb-1 text-dark font-weight-bold"
          >Chi tiết nhập/xuất hàng
          </label>
          <b-col class="bg-white py-1 rounded shadow h-100">
            <vue-good-table
              :columns="columns"
              :rows="rows"
              style-class="vgt-table bordered"
              compact-mode
              line-numbers="true"
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
          field: 'ArchiveImportEntryBorrowedLincenseNumber',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ArchiveImportEntryBorrowedIdProduct',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ArchiveImportEntryBorrowedNameProduct',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ArchiveImportEntryBorrowedPriceProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'ArchiveImportEntryBorrowedAmountProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'ArchiveImportEntryBorrowedTotalMoney',
          sortable: false,
          type: 'number',
        },
      ],
      rows: [
        {
          ArchiveImportEntryBorrowedLincenseNumber: '290365412',
          ArchiveImportEntryBorrowedIdProduct: '04DC10',
          ArchiveImportEntryBorrowedNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryBorrowedPriceProduct: '5,000',
          ArchiveImportEntryBorrowedAmountProduct: '240',
          ArchiveImportEntryBorrowedTotalMoney: '1,200,000',
        },
        {
          ArchiveImportEntryBorrowedLincenseNumber: '290365412',
          ArchiveImportEntryBorrowedIdProduct: '04DC10',
          ArchiveImportEntryBorrowedNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryBorrowedPriceProduct: '5,000',
          ArchiveImportEntryBorrowedAmountProduct: '240',
          ArchiveImportEntryBorrowedTotalMoney: '1,200,000',
        },
        {
          ArchiveImportEntryBorrowedLincenseNumber: '290365412',
          ArchiveImportEntryBorrowedIdProduct: '04DC10',
          ArchiveImportEntryBorrowedNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportEntryBorrowedPriceProduct: '5,000',
          ArchiveImportEntryBorrowedAmountProduct: '240',
          ArchiveImportEntryBorrowedTotalMoney: '1,200,000',
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
