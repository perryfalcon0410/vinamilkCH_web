<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Nhập xuất hàng vay mượn"
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
          class="d-flex flex-column px-0"
        >
          <label
            for="tableList"
            class="p-1 text-dark font-weight-bold"
          >Danh sách nhập/xuất hàng
          </label>

          <b-col
            id="tableList"
            class="bg-info rounded text-dark"
          >
            <!-- START - Title -->
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
            <!-- END - Title -->

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
            class="p-1 text-dark font-weight-bold"
          >Chi tiết nhập/xuất hàng
          </label>
          <b-col class="bg-white py-1 rounded shadow">
            <vue-good-table
              id="tableDetail"
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
