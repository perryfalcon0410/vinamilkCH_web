<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Danh sách PO Confirm"
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
          <b-col class="bg-info pb-5 rounded text-dark">
            <!-- START - Header -->
            <b-row class="py-1">
              <b-col cols="1" />
              <b-col cols="3">
                PO No
              </b-col>
              <b-col cols="4">
                Số nội bộ
              </b-col>
              <b-col cols="4">
                Ngày
              </b-col>
            </b-row>
            <!-- END - Header -->

            <b-row
              v-for="item in productsList"
              :key="item.id"
              class="border-bottom border-white bg-light py-1"
            >
              <b-col cols="1">
                {{ item.id }}
              </b-col>
              <b-col cols="3">
                {{ item.poNo }}
              </b-col>
              <b-col cols="4">
                {{ item.internalNumber }}
              </b-col>
              <b-col
                cols="4"
                class="text-wrap"
              >
                {{ item.date }}

              </b-col>
            </b-row>
          </b-col>
        </b-col>
        <!-- END -  Import/Export List -->

        <!-- START - List -->
        <b-col class="ml-1 bg-white shadow rounded p-1">

          <!-- START - Table Product -->
          <div class="d-flex flex-row justify-content-between">
            <div class="bg-info d-flex align-items-center text-primary rounded-top font-weight-bold px-1">
              Sản phẩm
            </div>
            <b-button
              variant="primary"
              class="d-flex align-items-center"
            >
              <b-icon
                icon="arrow-repeat"
                width="20"
                height="20"
                class="mr-1"
              />
              Tải PO
            </b-button>
          </div>

          <vue-good-table
            :columns="columns"
            :rows="rowsProduct"
            style-class="vgt-table bordered"
            compact-mode
            line-numbers="true"
            class="py-1 mb-1"
          />
          <!-- END - Table Product -->

          <!-- START - Table Product promotion -->
          <div class="bg-info d-inline-flex text-primary rounded-top font-weight-bold px-1">
            Hàng khuyến mãi
          </div>

          <vue-good-table
            :columns="columns"
            :rows="rowsProductPromotion"
            style-class="vgt-table bordered"
            compact-mode
            line-numbers="true"
            class="py-1"
          />
          <!-- END - Table Product promotion -->
        </b-col>
      <!-- END - List -->
      </b-row>
    </b-container>
    <!-- END - Body -->

    <!-- START - Footer -->
    <template #modal-footer="{ ok, cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="ok()"
      >
        <b-icon
          icon="download"
          width="20"
          height="20"
          class="mr-1"
        />
        Nhập hàng
      </b-button>
      <b-button
        variant="danger"
        class="d-flex align-items-center text-uppercase"
        @click="cancel()"
      >
        <b-icon
          icon="slash-circle"
          width="20"
          height="20"
          class="mr-1"
        />
        Không nhập
      </b-button>
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="cancel()"
      >
        <b-icon
          icon="file-earmark-excel-fill"
          width="20"
          height="20"
          class="mr-1"
        />
        Xuất excel
      </b-button>
      <b-button
        variant="secondary"
        class="d-flex align-items-center text-uppercase"
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
          id: 1, poNo: '24300196', internalNumber: '3934880', date: '15/10/2020',
        },
        {
          id: 2, poNo: '24300196', internalNumber: '3934880', date: '15/10/2020', note: 'Sai lệch',
        },
        {
          id: 3, poNo: '24300196', internalNumber: '3934880', date: '15/10/2020',
        },
      ],
      columns: [
        {
          label: 'SO No',
          field: 'ArchiveImportPoConfirmSoNo',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ArchiveImportPoConfirmIdProduct',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ArchiveImportPoConfirmNameProduct',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'ArchiveImportPoConfirmPriceProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'ArchiveImportPoConfirmAmountProduct',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'ArchiveImportPoConfirmTotalMoney',
          sortable: false,
          type: 'number',
        },
      ],
      rowsProduct: [
        {
          ArchiveImportPoConfirmSoNo: '',
          ArchiveImportPoConfirmIdProduct: '',
          ArchiveImportPoConfirmNameProduct: '',
          ArchiveImportPoConfirmPriceProduct: '',
          ArchiveImportPoConfirmAmountProduct: '360',
          ArchiveImportPoConfirmTotalMoney: '1,860,720',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
      ],
      rowsProductPromotion: [
        {
          ArchiveImportPoConfirmSoNo: '',
          ArchiveImportPoConfirmIdProduct: '',
          ArchiveImportPoConfirmNameProduct: '',
          ArchiveImportPoConfirmPriceProduct: '',
          ArchiveImportPoConfirmAmountProduct: '360',
          ArchiveImportPoConfirmTotalMoney: '1,860,720',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
        {
          ArchiveImportPoConfirmSoNo: '290365412',
          ArchiveImportPoConfirmIdProduct: '04DC10',
          ArchiveImportPoConfirmNameProduct: 'Thức uống cacao lúa mạch 180ml',
          ArchiveImportPoConfirmPriceProduct: '5,000',
          ArchiveImportPoConfirmAmountProduct: '240',
          ArchiveImportPoConfirmTotalMoney: '1,200,000',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
