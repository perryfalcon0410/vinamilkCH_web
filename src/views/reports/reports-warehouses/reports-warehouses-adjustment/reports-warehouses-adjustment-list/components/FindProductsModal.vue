<template>
  <b-modal
    size="lg"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bold text-primary"
    footer-class="justify-content-center"
    content-class="bg-light"
    footer-border-variant="light"
    hide-header-close
    centered
    @hidden="onModalClose"
  >
    <b-container fluid>
      <!-- START - Body -->
      <b-row class="d-flex justify-content-between">
        <!-- START - Search -->
        <b-col
          class="bg-white rounded shadow "
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
            class="p-0 m-0 "
            align-v="center"
          >
            <!-- START - Product code -->
            <b-col
              xl
              md="3"
              sm="4"
              class=" pr-0"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Mã sản phẩm
              </div>
              <b-form-input
                id="form-input-customer"
                v-model="searchOptions.productCode"
                class="h8 text-brand-3 height-button-brand-1"
                placeholder="Nhập mã sản phẩm"
                @keyup.enter="onClickSearchButton"
              />
            </b-col>
            <!-- END - Product code -->
            <!-- START - Product name -->
            <b-col
              xl
              md="3"
              sm="4"
              class=" pr-0"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Tên sản phẩm
              </div>
              <b-form-input
                v-model="searchOptions.productName"
                class="h8 text-brand-3 height-button-brand-1"
                placeholder="Nhập tên sản phẩm"
                @keyup.enter="onClickSearchButton"
              />
            </b-col>
            <!-- END - Product name -->
            <!-- START - Product cat -->
            <b-col
              xl
              lg="3"
              sm="4"
              class=" pr-0"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Ngành hàng
              </div>
              <tree-select
                v-model="prodcutCatSelected"
                :options="productCats"
                :searchable="false"
                placeholder="Tất cả"
                no-options-text="Không có dữ liệu"
              />
            </b-col>
            <!-- END - Product cat -->
            <!-- START - Search button -->
            <b-col>
              <div
                class="h8 text-white"
              >
                Tìm kiếm
              </div>
              <b-button
                id="form-button-search"
                class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
                variant="someThing"
                @click="onSearchClick"
              >
                <b-icon-search class="mr-05" />
                Tìm kiếm
              </b-button>
            </b-col>
            <!-- END - Search button -->
          </b-row>
          <vue-good-table
            ref="products-table"
            :columns="columns"
            :rows="rowsProduct"
            class="pb-1 m-1"
            style-class="vgt-table striped"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              selectionText: 'rows selected',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
              multipleColumns: true,
              selected: true
            }"
            @on-selected-rows-change="selectionChanged"
          >
            <!-- START - Empty rows -->
            <div
              slot="emptystate"
              class="text-center"
            >
              Không có dữ liệu
            </div>
            <!-- END - Empty rows -->
            <template
              slot="select-options"
            >
              <b-checkbox :checked="true" />
            </template>

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
            <!-- START - Pagination -->
            <!-- <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <b-row
                class="v-pagination px-1 mx-0"
                align-h="between"
                align-v="center"
              >
                <div
                  class="d-flex align-items-center"
                >
                  <span
                    class="text-nowrap"
                  >
                    Hiển thị 1 đến
                  </span>
                  <b-form-select
                    v-model="elementSize"
                    size="sm"
                    :options="paginationOptions"
                    class="mx-1 mt-1 mb-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span
                    class="text-nowrap"
                  > trong {{ productsPagination.totalElements || 0 }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="productsPagination.totalElements || 0"
                  :per-page="elementSize"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1"
                  @input="(value)=>props.pageChanged({currentPage: value})"
                >
                  <template slot="prev-text">
                    <feather-icon
                      icon="ChevronLeftIcon"
                      size="18"
                    />
                  </template>
                  <template slot="next-text">
                    <feather-icon
                      icon="ChevronRightIcon"
                      size="18"
                    />
                  </template>
                </b-pagination>
              </b-row>
            </template> -->
          <!-- END - Pagination -->
          </vue-good-table>

        </b-col>
        <!-- END Search -->
      </b-row>
      <!-- END Body -->
    </b-container>

    <!-- START - Footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="primary"
        class="d-flex align-items-center text-uppercase"
        @click="onSaveClick"
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

import commonData from '@/@db/common'

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
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      width: window.innerWidth,
      prodcutCatSelected: null,
      searchOptions: {
        productCode: '',
        productName: '',
      },
      selectedProductRow: [],
      selectedCurrentPage: [],
      columns: [
        {
          label: 'STT',
          field: 'stt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },
}

</script>
