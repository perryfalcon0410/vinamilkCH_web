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
      <v-card-actions
        class="bg-white rounded shadow "
        title="Tìm kiếm"
      >
        <!-- START - Product code -->
        <b-col
          xl
          md="3"
          sm="4"
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
      </v-card-actions>
      <!-- START- Table -->
      <b-form class="bg-white rounded shadow rounded mt-1 p-1">
        <vue-good-table
          ref="products-table"
          :columns="columns"
          mode="remote"
          :rows="products"
          class="pb-1 m-1"
          style-class="vgt-table striped"
          compact-mode
          line-numbers
          :pagination-options="{
            enabled: true,
            perPage: paginationData.size,
            setCurrentPage: pageNumber,
          }"
          :total-rows="productsPagination.totalElements"
          :sort-options="{
            enabled: false,
            multipleColumns: true,
          }"
          :select-options="{
            enabled: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
            selected: true
          }"
          @on-sort-change="onSortChange"
          @on-page-change="onPageChange"
          @on-per-page-change="onPerPageChange"
          @on-row-click="selectionRow"
          @on-select-all="selectAllRows"
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
          <template
            slot="pagination-bottom"
            slot-scope="props"
          >
            <b-row
              v-show="productsPagination.totalElements"
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
                  Số hàng hiển thị
                </span>
                <b-form-select
                  v-model="paginationData.size"
                  size="sm"
                  :options="perPageSizeOptions"
                  class="mx-1"
                  @input="(value)=>props.perPageChanged({currentPerPage: value})"
                />
                <span class="text-nowrap">{{ paginationDetailContent }}</span>
              </div>
              <b-pagination
                v-model="pageNumber"
                :total-rows="productsPagination.totalElements"
                :per-page="paginationData.size"
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
          </template>
          <!-- END - Pagination -->
        </vue-good-table>
      </b-form>
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
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import commonData from '@/@db/common'
import {
  REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY,
  // GETTERS
  PRODUCT_CAT_LISTS_GETTER,
  PRODUCT_LISTS_GETTER,
  // Actions
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
} from '../../store-module/type'

export default {
  components: {
    VCardActions,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  data() {
    return {
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      width: window.innerWidth,
      prodcutCatSelected: null,
      searchOptions: {
        productCode: '',
        productName: '',
      },
      selectedProductRow: [],
      selectedCurrentPage: [],
      products: [],
      isCheckAllRows: false, //  check click all rows textbox

      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        // {
        //   label: 'STT',
        //   field: 'stt',
        //   sortable: false,
        //   thClass: 'text-center',
        //   tdClass: 'text-center',
        // },
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
  computed: {
    ...mapGetters(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [
      PRODUCT_LISTS_GETTER,
      PRODUCT_CAT_LISTS_GETTER,
    ]),
    productCats() {
      if (this.PRODUCT_CAT_LISTS_GETTER) {
        return this.PRODUCT_CAT_LISTS_GETTER.map(data => ({
          id: data.id,
          label: data.productInfoName,
        }))
      }
      return []
    },
    productsPagination() {
      if (this.PRODUCT_LISTS_GETTER) {
        return this.PRODUCT_LISTS_GETTER
      }
      return {}
    },
    getProducts() {
      if (this.PRODUCT_LISTS_GETTER.content) {
        return this.PRODUCT_LISTS_GETTER.content.map(data => ({
          // stt: index + 1,
          productName: data.productName,
          productCode: data.productCode,
          id: data.id,
        }))
      }
      return {}
    },
    paginationDetailContent() {
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.productsPagination.totalElements
        ? this.productsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.productsPagination.totalElements} mục`
    },
  },
  watch: {
    getProducts() {
      this.products = [...this.getProducts]
    },
    pageNumber() {
      this.onPaginationChange()
    },
    elementSize() {
      this.onPaginationChange()
    },
    products() {
      this.products.forEach((item, index) => {
        const productSelectedFoundIndex = this.selectedProductRow.findIndex(data => item.id === data.id)
        if (productSelectedFoundIndex > -1) {
          this.$set(this.products[index], 'vgtSelected', true)
          this.selectedCurrentPage.push(item)
        } else {
          this.$set(this.products[index], 'vgtSelected', false)
        }
      })
    },
    visible() {
      if (this.visible) {
        this.products.forEach((item, index) => {
          const productSelectedFoundIndex = this.selectedProductRow.findIndex(data => item.id === data.id)
          if (productSelectedFoundIndex > -1) {
            this.$set(this.products[index], 'vgtSelected', true)
            this.selectedCurrentPage.push(item)
          } else {
            this.$set(this.products[index], 'vgtSelected', false)
          }
        })
      }
    },
  },
  mounted() {
    resizeAbleTable()
    this.GET_PRODUCT_CAT_LISTS_ACTIONS({
      ...this.decentralization,
    })
    this.GET_PRODUCT_LISTS_ACTIONS({
      ...this.decentralization,
      ...this.paginationData,
    })
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_INPUT_OUTPUT_INVENTORY, [
      GET_PRODUCT_LISTS_ACTIONS,
      GET_PRODUCT_CAT_LISTS_ACTIONS,
    ]),
    onModalClose() {
      this.$emit('onModalClose')
    },
    onSaveClick() {
      this.$emit('onSaveClick', this.selectedProductRow)
    },
    onPaginationChange() {
      this.GET_PRODUCT_LISTS_ACTIONS({
        ...this.paginationData,
        ...this.decentralization,
        ...this.searchOptions,
        catId: this.prodcutCatSelected,
      })
      this.selectedCurrentPage = []
    },
    updatePaginationData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updatePaginationData({ page: params.currentPage - 1, size: params.currentPerPage })
      this.onPaginationChange()
    },
    onSearchClick() {
      this.GET_PRODUCT_LISTS_ACTIONS({
        ...this.decentralization,
        ...this.searchOptions,
        catId: this.prodcutCatSelected,
      })
      this.pageNumber = 1
    },
    selectAllRows(params) {
      if (params.selected) {
        this.selectedProductRow = []
        params.selectedRows.forEach(item => {
          if (!this.selectedProductRow.find(data => data.id === item.id)) {
            this.selectedProductRow.push(item)
          }
        })
        this.isCheckAllRows = true
      } else if (this.isCheckAllRows) {
        this.selectedProductRow = []
        this.isCheckAllRows = false
      }
    },
    selectionRow(params) {
      if (params.selected) {
        if (!this.selectedProductRow.find(data => data.id === params.row.id)) {
          this.selectedProductRow.push(params.row)
        }
      } else {
        const index = this.selectedProductRow.findIndex(data => data.id === params.row.id)
        this.selectedProductRow.splice(index, 1)
      }
    },
  },
}
</script>
