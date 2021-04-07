<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Danh sách PO Confirm"
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
          class="bg-white pb-4 rounded shadow text-dark"
        >
          <!-- START - Title -->
          <b-row class="py-1">
            <b-col
              cols="1"
            />
            <b-col>
              <strong>
                PO No
              </strong>
            </b-col>
            <b-col>
              <strong>
                Số nội bộ
              </strong>
            </b-col>
            <b-col>
              <strong>
                Ngày
              </strong>
            </b-col>
          </b-row>
          <!-- END - Title -->

          <b-row
            v-for="item in productsList"
            :key="item.id"
            class="border-bottom border-white bg-light py-1"
          >
            <b-col cols="1">
              {{ item.id }}
            </b-col>
            <b-col>
              {{ item.poNo }}
            </b-col>
            <b-col>
              {{ item.internalNumber }}
            </b-col>
            <b-col

              class="text-wrap"
            >
              {{ item.date }}

            </b-col>
          </b-row>
        </b-col>
        <!-- END -  Import/Export List -->

        <!-- START - List -->
        <b-col class="ml-xl-1 mt-1 mt-xl-0 pt-1 bg-white shadow rounded">

          <!-- START - Table Product -->
          <!-- START - Title Product -->
          <b-row
            align-v="end"
            class="justify-content-between mx-0"
          >

            <strong class="d-flex h-25 align-items-center rounded-top px-1">
              Sản phẩm
            </strong>
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
          </b-row>
          <!-- END - Title Product -->

          <vue-good-table
            :columns="columns"
            :rows="rowsProduct"
            style-class="vgt-table bordered"
            compact-mode
            line-numbers
            class="py-1"
          />
          <!-- END - Table Product -->

          <!-- START - Table Product promotion -->
          <!-- START - Title Product promotion -->
          <strong class="d-inline-flex rounded-top px-1">
            Hàng khuyến mãi
          </strong>
          <!-- END - Title Product promotion -->

          <vue-good-table
            :columns="columns"
            :rows="rowsProductPromotion"
            style-class="vgt-table bordered"
            compact-mode
            line-numbers
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
          field: 'SoNo',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Mã sản phẩm',
          field: 'ProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'Name',
          sortable: false,
        },
        {
          label: 'Giá',
          field: 'Price',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Số lượng',
          field: 'Quantity',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          sortable: false,
          type: 'number',
        },
      ],
      rowsProduct: [
        {
          SoNo: '',
          ProductId: '',
          Name: '',
          Price: '',
          Quantity: '360',
          TotalPrice: '1,860,720',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
      ],
      rowsProductPromotion: [
        {
          SoNo: '',
          ProductId: '',
          Name: '',
          Price: '',
          Quantity: '360',
          TotalPrice: '1,860,720',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
        {
          SoNo: '290365412',
          ProductId: '04DC10',
          Name: 'Thức uống cacao lúa mạch 180ml',
          Price: '5,000',
          Quantity: '240',
          TotalPrice: '1,200,000',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
