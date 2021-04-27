<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
    hide-header-close
  >

    <b-container fluid>
      <!-- START - Body -->
      <b-row class="d-flex justify-content-between">
        <!-- START - Search -->
        <b-col
          xl="5"
          lg="12"
          md="12"
          class="bg-white rounded shadow ml-3 ml-lg-0 ml-md-0"
        >
          <!-- START - Label -->
          <div
            class="mt-1 py-1"
          >
            <strong class="text-primary p-1">
              Tìm kiếm sản phẩm
            </strong>
          </div>
          <!-- END - Label -->

          <!-- START - INPUT -->
          <b-row
            class="pt-1"
            align-v="center"
          >
            <!-- START - Product name -->
            <b-col
              md="7"
              lg="8"
              class="ml-1"
            >
              <b-form-group
                label="Sản phẩm"
                label-for="product"
              >
                <b-form-input
                  id="product"
                  maxlength="20"
                  trim
                  placeholder="04DC10, 04DC02, 04PC04"
                />
              </b-form-group>
            </b-col>
            <!-- END - Product name -->
            <!-- START - Button search -->
            <b-col
              md="2"
              lg="1"
              class="mr-lg-1 mr-md-0"
            >
              <b-form-group
                class="mt-2"
              >
                <b-button
                  id="SearchButton"
                  variant="primary"
                >
                  <b-icon-search />
                </b-button>
              </b-form-group>
            </b-col>
            <!-- END - Button search -->

            <!-- START - Button excel -->
            <b-col
              md="2"
              lg="1"
              class="mr-1"
            >
              <b-form-group
                class="ml-lg-1 mt-2"
                label-for="ExcelButton"
              >
                <b-button
                  id="ExcelButton"
                  variant="primary"
                >
                  <b-icon-file-earmark-excel-fill />
                </b-button>
              </b-form-group>
            </b-col>
            <!-- END - Button excel -->
          </b-row>

          <b-row>
            <b-form class="my-1 ml-1">
              <!-- START - Title -->
              <b-form-row class="align-items-center ml-1 mt-1">
                <strong
                  class="text-primary"
                >
                  Tổng cộng: 123 sản phẩm
                </strong>
              </b-form-row>
              <!-- END - Title -->

              <!-- Start table -->
              <b-col class="py-1">
                <vue-good-table
                  :columns="columns"
                  :rows="rowsProduct"
                  class="pb-1"
                  style-class="vgt-table striped"
                  :pagination-options="{
                    enabled: true
                  }"
                  line-numbers
                  :select-options="{
                    enabled: true,
                    selectOnCheckboxOnly: true,
                    selectionInfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                    disableSelectInfo: true,
                    selectAllByGroup: true,
                    multipleColumns: true,
                  }"
                >

                  <template
                    slot="table-column"
                    slot-scope="props"
                  >
                    <div v-if="props.column.label === 'Chức năng'">
                      <b-icon-bricks class="ml-1" />
                    </div>
                    <div v-else>
                      {{ props.column.label }}
                    </div>
                  </template>

                </vue-good-table>
              </b-col>
              <!-- End table -->

            </b-form>
          </b-row>
        </b-col>
        <!-- END Search -->

        <!-- START - Group button -->
        <b-col
          xl="1"
          md="12"
          class="align-self-end mb-xl-5 mb-md-0 mt-md-1 ml-md-4 my-lg-1 ml-lg-0"
        >
          <b-row
            align="center"
          >
            <!-- START - Button select all -->
            <b-col
              class="mb-1"
              xl="12"
              md="3"
            >
              <b-button
                id="selectAll"
                variant="primary"
                class="px-0"
              >
                Chọn tất cả
              </b-button>
            </b-col>
            <!-- END - Button select all -->

            <!-- START - Button select to the right -->
            <b-col
              class="mb-1"
              xl="12"
              md="3"
            >
              <b-button
                id="selectToRight"
                variant="primary"
              >
                <div v-show="width >= 1200">
                  <b-icon-chevron-right />
                </div>
                <div v-show="width < 1200">
                  <b-icon-chevron-down />
                </div>
              </b-button>
            </b-col>
            <!-- END - Button select to the right -->

            <!-- START - Button select to the left -->
            <b-col
              class="mb-xl-5"
              xl="12"
              md="3"
            >
              <b-button
                id="selectToLeft"
                variant="primary"
              >
                <div v-show="width >= 1200">
                  <b-icon-chevron-left />
                </div>
                <div v-show="width < 1200">
                  <b-icon-chevron-up />
                </div>
              </b-button>
            </b-col>
          <!-- END - Button select to the left -->
          </b-row>

        </b-col>
        <!-- END - Group button -->

        <!-- START - Choose -->
        <b-col
          xl="5"
          lg="12"
          md="12"
          class="bg-white rounded shadow d-flex flex-column mr-3"
        >
          <!-- START - Label -->
          <div
            class="mt-xl-1 mt-md-0 py-1 mb-auto"
          >
            <strong class="text-primary p-1">
              Danh sách được chọn
            </strong>
          </div>
          <!-- END - Label -->

          <b-row class="align-items-end">
            <b-form class="mb-1 ml-1">
              <!-- START - Title -->
              <b-form-row class="align-items-end ml-1 mt-1">
                <b-col>
                  <strong
                    class="text-primary mr-auto"
                  >
                    Tổng cộng: 123 sản phẩm
                  </strong>
                </b-col>
                <!-- START - Button import -->
                <b-button
                  id="importButton"
                  variant="primary"
                  class="mr-1 px-md-0 px-lg-1"
                >
                  <b-icon-arrow-repeat />
                  Import
                </b-button>

                <!-- START - Button delete -->
                <b-button
                  id="deleteButton"
                  variant="danger"
                  class="mr-2 px-md-0 px-lg-1"
                >
                  <b-icon-x-circle />
                  Xóa tất cả
                </b-button>
              <!-- END - Button delete -->
              </b-form-row>
              <!-- END - Title -->

              <!-- Start table -->
              <b-col class="py-1">
                <vue-good-table
                  :columns="columns"
                  :rows="rowsProduct"
                  class="pb-1"
                  style-class="vgt-table striped"
                  :pagination-options="{
                    enabled: true
                  }"
                  line-numbers
                  :select-options="{
                    enabled: true,
                    selectOnCheckboxOnly: true,
                    selectionInfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                    disableSelectInfo: true,
                    selectAllByGroup: true,
                    multipleColumns: true,
                  }"
                >
                  <template
                    slot="table-column"
                    slot-scope="props"
                  >
                    <div v-if="props.column.label === 'Chức năng'">
                      <b-icon-bricks class="ml-1" />
                    </div>
                    <div v-else>
                      {{ props.column.label }}
                    </div>
                  </template>
                </vue-good-table>
              </b-col>
              <!-- End table -->

            </b-form>
          </b-row>
        </b-col>
        <!-- END Choose -->
      </b-row>
      <!-- END Body -->
    </b-container>

    <!-- START - Footer -->
    <template #modal-footer="{ ok, cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="ok()"
      >
        <b-icon
          icon="check2"
          width="20"
          height="20"
          class="mr-1"
        />
        Lưu
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
      width: window.innerWidth,
      columns: [
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
      ],
      rowsProduct: [
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
