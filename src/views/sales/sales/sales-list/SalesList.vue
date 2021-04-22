<template>
  <b-container
    fluid
    class="p-0"
  >
    <!-- START - Header -->
    <b-row
      class="m-0"
    >
      <!-- START - Search -->
      <b-col
        sm="7"
        xl="4"
        class="px-0 mr-1 shadow mb-1 mb-sm-0"
      >
        <b-input
          placeholder="Tìm sản phẩm (F3)"
          @focus="inputSearchFocused = true"
          @blur="inputSearchFocused = false"
        />

        <!-- START - Product Popup -->
        <b-collapse
          v-model="inputSearchFocused"
          class="position-absolute w-100"
          style="zIndex:1"
        >
          <b-container
            class="my-1 px-1 bg-white rounded border border-primary shadow-lg"
          >
            <b-row
              v-for="(n,index) in 6"
              :key="index"
              class="mx-0 my-1"
            >
              <!-- START - Section Image -->
              <b-col
                cols="2"
                class="px-0"
              >
                <b-img-lazy
                  src="https://pngimg.com/uploads/nuclear_bomb/nuclear_bomb_PNG18.png"
                  fluid
                  width="60px"
                />
              </b-col>
              <!-- END - Section Image -->

              <!-- START - Section Label -->
              <b-col>
                <b-col
                  class="text-dark"
                >
                  Sữa dinh dưỡng Vinamilk không đường- Bịch 220m
                </b-col>
                <b-col
                  class="my-1"
                >
                  SP002
                </b-col>
                <b-col class="text-dark font-weight-bold">
                  7.000
                </b-col>
              </b-col>
            <!-- END - Section Label -->
            </b-row>
          </b-container>
        </b-collapse>
        <!-- END - Product Popup -->

      </b-col>
      <!-- END - Search -->

      <!-- START - Bills -->
      <div
        class="d-flex align-items-center justify-content-center bg-white rounded shadow mr-1 px-1"
      >
        Hóa đơn 1
        <b-icon-x
          class="cursor-pointer ml-1"
          font-scale="1.6"
        />
      </div>

      <div
        class="d-flex align-items-center justify-content-center bg-white rounded shadow mr-1 px-1"
      >
        Hóa đơn 2
        <b-icon-x
          class="cursor-pointer ml-1"
          font-scale="1.6"
        />
      </div>

      <div>
        <b-icon-plus
          font-scale="2.5"
          class="cursor-pointer"
        />
      </div>
      <!-- END - Bills -->

    </b-row>
    <!-- END - Header -->

    <!-- START - Body -->
    <b-row
      class="mx-0 my-1"
    >
      <!-- START - Section Table product and list suggestion  -->
      <b-col
        sm="12"
        lg="8"
        class="d-flex flex-column rounded px-0"
      >
        <!-- START - Table product -->
        <vue-good-table
          :columns="columns"
          :rows="rows"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          class="shadow"
        >
          <!-- START - Columns -->
          <template
            slot="table-column"
            slot-scope="props"
          >
            <div
              v-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-bricks />
            </div>
            <div v-else>
              {{ props.column.label }}
            </div>
          </template>
          <!-- END - Columns -->

          <!-- START - Rows -->
          <template
            slot="table-row"
            slot-scope="props"
          >

            <!-- START - tableProductInventory -->
            <b-row
              v-if="props.column.field === 'tableProductInventory'"
              align-v="center"
              align-h="end"
              class="mx-0"
            >
              {{ props.row.tableProductInventory }}
              <b-icon-shield-exclamation
                v-if="props.row.tableProductInventory < props.row.tableProductAmount"
                color="red"
                class="cursor-pointer ml-1"
                font-scale="1.5"
              />
            </b-row>
            <!-- END - tableProductInventory -->

            <!-- START - tableProductAmount -->
            <b-row
              v-else-if="props.column.field === 'tableProductAmount'"
              align-v="center"
              align-h="end"
              class="mx-0"
            >
              <b-icon-caret-down-fill
                class="cursor-pointer mr-1"
                font-scale="1.5"
                @click="props.row.tableProductAmount --"
              />
              {{ props.row.tableProductAmount }}
              <b-icon-caret-up-fill
                class="cursor-pointer ml-1"
                font-scale="1.5"
                @click="props.row.tableProductAmount ++"
              />
            </b-row>
            <!-- END - tableProductAmount -->

            <!-- START - tableProductFeature -->
            <div
              v-else-if="props.column.field === 'tableProductFeature'"
            >
              <b-icon-trash-fill
                color="red"
                class="cursor-pointer"
              />
            </div>
            <!-- END - tableProductFeature -->

            <div v-else>
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <!-- END - Rows -->

        </vue-good-table>
        <!-- END - Table product -->

        <!-- START - List suggestion -->
        <sales-products />
        <!-- END - List suggestion -->

      </b-col>
      <!-- END - Section Table product and list suggestion-->

      <!-- START - Section Form pay -->
      <sales-form />
      <!-- END - Section Form pay -->

    </b-row>
    <!-- END - Body -->

  </b-container>
</template>

<script>
import SalesForm from './components/SalesForm.vue'
import SalesProducts from './components/SalesProducts.vue'

export default {
  components: {
    SalesForm,
    SalesProducts,
  },
  data() {
    return {
      inputSearchFocused: false,

      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'tableProductId',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'tableProductName',
          sortable: false,
        },
        {
          label: 'ĐVT',
          field: 'tableProductUnit',
          sortable: false,
        },
        {
          label: 'Tồn kho',
          field: 'tableProductInventory',
          type: 'number',
          sortable: false,
          width: '80px',
        },
        {
          label: 'Số lượng',
          field: 'tableProductAmount',
          type: 'number',
          sortable: false,
          width: '120px',
        },
        {
          label: 'Đơn giá',
          field: 'tableProductUnitPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Thành tiền',
          field: 'tableProductTotalPrice',
          sortable: false,
          type: 'number',
        },
        {
          label: 'Chức năng',
          field: 'tableProductFeature',
          sortable: false,
        },
      ],

      rows: [
        {
          tableProductId: 'SP001',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
        {
          tableProductId: 'SP002',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
        {
          tableProductId: 'SP003',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
        {
          tableProductId: 'SP004',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
        {
          tableProductId: 'SP005',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
        {
          tableProductId: 'SP006',
          tableProductName: 'Hộp STTT Vinamilk 100% Ít Đường 180ml',
          tableProductUnit: 'Hộp',
          tableProductInventory: 10,
          tableProductAmount: 12,
          tableProductUnitPrice: 15.000,
          tableProductTotalPrice: 120.145,
        },
      ],
    }
  },
}
</script>

<style>

</style>
