<template>
  <b-modal
    id="find-product-modal"
    size="lg"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bold text-brand-1"
    footer-class="justify-content-center"
    content-class="bg-light"
    class="d-print-none"
    footer-border-variant="light"
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Mã sản phẩm
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="searchOptions.productCode"
              autofocus
              trim
              class="h7 text-brand-3 height-button-brand-1"
              @keyup.enter="onSearchClick"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="searchOptions.productCode"
                class="cursor-pointer text-gray"
                @click="searchOptions.productCode = null"
              />
            </b-input-group-append>
          </b-input-group>
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Tên sản phẩm
          </div>
          <b-input-group
            class="input-group-merge"
          >
            <b-form-input
              v-model="searchOptions.productName"
              trim
              class="h7 text-brand-3 height-button-brand-1"
              @keyup.enter="onSearchClick"
            />
            <b-input-group-append
              is-text
            >
              <b-icon-x
                v-show="searchOptions.productName"
                class="cursor-pointer text-gray"
                @click="searchOptions.productName = null"
              />
            </b-input-group-append>
          </b-input-group>
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
            class="h7 mt-sm-1 mt-xl-0"
          >
            Ngành hàng
          </div>
          <tree-select
            v-model="productCategorySelected"
            :options="productCategory"
            :searchable="false"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Product cat -->
        <!-- START - Search button -->
        <b-col>
          <div
            class="h7 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h8 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
            variant="someThing"
            @click="onSearchClick"
          >
            <b-icon-search class="mr-50" />
            Tìm kiếm
          </b-button>
        </b-col>
        <!-- END - Search button -->
      </v-card-actions>
      <!-- START- Table -->
      <div class="bg-white rounded shadow rounded mt-1 p-1">
        <div class="pt-0">
          <strong class="text-blue-vinamilk pt-2">
            Tổng cộng: {{ $formatNumberToLocale(selectedProductRow.length) }} sản phẩm được chọn
          </strong>
        </div>
        <vue-good-table
          ref="products-table"
          :columns="columns"
          mode="remote"
          :rows="products"
          class="pb-1"
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
      </div>
      <!-- END Body -->
    </b-container>

    <!-- START - Footer -->
    <template #modal-footer="{ }">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder d-flex justify-content-center align-items-center"
        variant="someThing"
        size="sm"
        @click="save()"
      >
        <b-icon
          icon="check2"
          width="20"
          height="20"
          class="mr-50"
        />
        Chọn
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h8 font-weight-bolder d-flex justify-content-center align-items-center ml-1"
        size="sm"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
          class="mr-50"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Footer -->

  </b-modal>
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import commonData from '@/@db/common'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  REPORT_WAREHOUSES_INVENTORY,
  // Getters
  PRODUCT_LIST_GETTER,
  PRODUCT_LIST_PAGINATION_GETTER,
  PRODUCT_CAT_LIST_GETTER,
  // Actions
  GET_PRODUCT_LIST_ACTION,
  GET_PRODUCT_CAT_LIST_ACTION,
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
    rowSelected: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      products: [],
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: commonData.pageNumber - 1,
        sort: null,
      },
      // searchOptions
      searchOptions: {
        productCode: '',
        productName: '',
      },
      selectedProductRow: [],
      selectedCurrentPage: [],
      allProducts: [],
      productCategorySelected: null,
      // searchOptions
      decentralization: {
        formId: 5,
        ctrlId: 7,
      },
      columns: [
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
    // pagination vars
    productsPagination() {
      if (this.PRODUCT_LIST_PAGINATION_GETTER) {
        return this.PRODUCT_LIST_PAGINATION_GETTER()
      }
      return {}
    },
    paginationDetailContent() {
      const { page, size } = this.paginationData
      const { totalElements } = this.productsPagination

      const minPageSize = page === 0 ? 1 : ((page + 1) * size) - size + 1
      const maxPageSize = (size * (page + 1)) > totalElements
        ? totalElements : (size * (page + 1))

      return `${minPageSize} - ${maxPageSize} của ${totalElements} mục`
    },
    // pagination vars
    getProducts() {
      return this.PRODUCT_LIST_GETTER().map(data => ({
        productName: data.productName,
        productCode: data.productCode,
        id: data.id,
      }))
    },
    productCategory() {
      return this.PRODUCT_CAT_LIST_GETTER().map(data => ({
        id: data.id,
        label: data.productInfoName,
      }))
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
        // func delete products name
        this.allProducts = []
        this.rowSelected.forEach(data => {
          const index = this.selectedProductRow.findIndex((item => item.productCode.toUpperCase() === data.toUpperCase()))
          if (index > -1) {
            if (!this.allProducts.find(dta => dta.id === this.selectedProductRow[index].id)) {
              this.allProducts.push(this.selectedProductRow[index])
            }
          }
        })
        this.selectedProductRow = this.allProducts
        // func delete products name
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
    this.GET_PRODUCT_CAT_LIST_ACTION({ ...this.decentralization })
    this.GET_PRODUCT_LIST_ACTION({
      ...this.decentralization,
      ...this.paginationData,
    })
  },
  methods: {
    ...mapGetters(REPORT_WAREHOUSES_INVENTORY, [
      PRODUCT_LIST_GETTER,
      PRODUCT_LIST_PAGINATION_GETTER,
      PRODUCT_CAT_LIST_GETTER,
    ]),
    ...mapActions(REPORT_WAREHOUSES_INVENTORY, [
      GET_PRODUCT_LIST_ACTION,
      GET_PRODUCT_CAT_LIST_ACTION,
    ]),
    save() {
      this.$emit('onSaveClick', this.selectedProductRow)
      this.isCheckAllRows = false
      this.$bvModal.hide('find-product-modal')
    },
    cancel() {
      this.$bvModal.hide('find-product-modal')
      this.isCheckAllRows = false
    },
    onModalClose() {
      this.isCheckAllRows = false
      this.$emit('onModalClose')
    },
    updateSearchData(newProps) {
      this.paginationData = { ...this.paginationData, ...newProps }
    },
    onPaginationChange() {
      this.GET_PRODUCT_LIST_ACTION({ ...this.paginationData })
    },
    onPageChange(params) {
      this.updateSearchData({ page: params.currentPage - 1 })
      this.onPaginationChange()
    },
    onPerPageChange(params) {
      this.updateSearchData({
        size: params.currentPerPage,
        page: commonData.pageNumber - 1,
      })
      this.onPaginationChange()
    },
    onSearchClick() {
      this.updateSearchData({
        ...this.decentralization,
        ...this.searchOptions,
        catId: this.productCategorySelected,
      })
      this.onPaginationChange()
    },
    selectAllRows(params) {
      if (params.selected) {
        params.selectedRows.forEach(item => {
          if (!this.selectedProductRow.find(data => data.id === item.id)) {
            this.selectedProductRow.push(item)
          }
        })
        this.isCheckAllRows = true
      } else if (this.isCheckAllRows) {
        this.products.forEach(item => {
          const index = this.selectedProductRow.findIndex(data => data.id === item.id)
          this.selectedProductRow.splice(index, 1)
        })
      }
      this.isCheckAllRows = true
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
  // pagination funcs
}
</script>
