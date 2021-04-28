<template>
  <b-container
    fluid
    class="d-flex flex-column"
  >
    <!-- START - Common infomations -->
    <b-form class="bg-white shadow rounded">
      <div
        class="m-1 text-primary"
      >
        <strong>
          Tìm kiếm
        </strong>
      </div>
      <b-form-row
        class="border-top p-2"
      >
        <b-col
          lg="2"
          md
        >
          <label>
            Thời gian:
          </label>
        </b-col>
        <b-col
          lg="2"
          md
        >
          <label>
            Số ngày bán hàng thực tế:
          </label>
        </b-col>
        <b-col
          lg="2"
          md
        >
          <label>
            Số ngày bán hàng trong tháng:
          </label>
        </b-col>
      </b-form-row>
    </b-form>
    <!-- END - Common infomations -->
    <b-form class="v-search bg-white rounded shadow rounded my-1">
      <!-- START - Select Po type -->
      <b-row
        class="border-bottom p-1 mx-0"
        align-v="center"
      >
        <label class="text-primary">
          Đơn đặt hàng
        </label>
        <b-form-radio-group
          v-model="selected"
          :options="options"
          value-field="type"
          text-field="value"
          class="ml-5"
        />
      </b-row>
      <!--  - Select Po type -->
      <b-row>
        <b-col class="py-1">
          <!--START - Recommend Po-->
          <vue-good-table
            v-if="selected == 'A'"
            :columns="A_Columns"
            :rows="A_rows"
            style-class="vgt-table striped"
            line-numbers
            :pagination-options="{
              enabled: true
            }"
            class="mx-1"
          />
          <!--END - Recommend Po-->
          <!--START - Manual Po-->
          <vue-good-table
            v-if="selected == 'B'"
            :columns="B_columns"
            :rows="B_rows"
            style-class="vgt-table striped"
            line-numbers
            :pagination-options="{
              enabled: true
            }"
            class="pb-1 mx-1"
          >
            <!--START-Create Po-->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <span v-if="props.column.label === 'Chức năng'">
                <b-button
                  variant="light"
                  class="rounded-circle px-1"
                  @click="showChooseProductsModal"
                >
                  <b-icon-plus
                    font-scale="1.5"
                  />
                </b-button>
              </span>
              <span v-else>
                {{ props.column.label }}
              </span>
            </template>
            <!--END-Create Po-->
            <!--START-Delete-Create Po-->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.label === 'Số lượng đặt'">
                <b-input />
              </span>
              <span v-if="props.column.label === 'Chức năng'">
                <b-button
                  variant="light"
                  class="rounded-circle px-1"
                >
                  <b-icon-x
                    font-scale="1.5"
                  />
                </b-button>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <!--END-Delete-Create Po-->
          </vue-good-table>
          <!--END - Manual Po-->
        </b-col>
      </b-row>
    </b-form>
    <b-row class="justify-content-center mt-4 mr-1">
      <b-button-group>
        <!--START - Manual Po Button Group-->
        <b-button
          v-if="selected == 'B'"
          class="ml-1 rounded"
          variant="primary"
        >
          <b-icon
            icon="file-earmark-text-fill"
            width="20"
            height="20"
            class="mr-1"
          />
          Lưu
        </b-button>
      </b-button-group>
    </b-row>
    <!-- END - List of orders returned -->
    <choose-products-modal
      :visible="isChooseProductsModal"
      @closeModal="closeChooseProductsModal($event)"
    />
  </b-container>
</template>

<script>
import options from '@/@db/purchase'
import ChooseProductsModal from './components/ChooseProductModal.vue'

export default {
  components: {
    ChooseProductsModal,
  },
  data() {
    return {
      isChooseProductsModal: false,
      selected: 'A',
      options: options.poType,
      A_Columns: [
        {
          label: 'Mã SP',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tên SP',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Đầu kỳ',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Nhập',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Xuất',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'LKTTT',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'KHTTT',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'DMKH',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Dự trữ(KH)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Dự trữ(TT)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Max)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Lead)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
        {
          label: 'Tồn kho(Min)',
          field: 'NumberBill',
          sortable: false,
        },
      ],
      A_rows: [
        {
          NumberBill: '123',
        },
      ],
      // Manual Po
      B_columns: [
        {
          label: 'Mã SP',
          field: 'ProductCode',
          sortable: false,
        },
        {
          label: 'Tên SP',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Tên kho',
          field: 'WarehouseName',
          sortable: false,
        },
        {
          label: 'Số lượng đặt',
          field: 'Quantity',
          sortable: false,
        },
        {
          label: 'Đơn giá',
          field: 'Price',
          sortable: false,
        },
        {
          label: 'Thành tiền',
          field: 'TotalPrice',
          sortable: false,
        },
        {
          label: 'Chức năng',
          field: 'Button',
          sortable: false,
        },
      ],
      B_rows: [
        {
          ProductCode: '04AA10',
          ProductName: 'STT dâu ADM GOLD 180ml',
          WarehouseName: '1500',
          Price: '20.333',
          Button: '',
        },
      ],
    }
  },
  methods: {
    showChooseProductsModal() {
      this.isChooseProductsModal = !this.isChooseProductsModal
    },
    closeChooseProductsModal(data) {
      this.isChooseProductsModal = data
    },
  },
}
</script>
