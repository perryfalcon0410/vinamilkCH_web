<template>
  <b-modal
    id="modal"
    size="xl"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
    hide-footer="true"
  >
    <b-card>
      <div class="bg-light w-25 h-25 rounded-right border-top-info border-bottom-info border-right-info m-0">
        <strong class="text-brand-1">
          Tìm kiếm sản phẩm
        </strong>
      </div>
      <!--START search form-->
      <b-form>
        <b-form-row class="v-search-form mx-0 pt-1">
          <b-col
            xl
            md="3"
            sm="4"
          >
            <div>
              Mã sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
              size="md"
            >
              <b-input
                v-model="searchOptions.productCode"
                class="h8 text-brand-3 height-button-brand-1"
                placeholder="Nhập mã sản phẩm"
                @keyup.enter="onSearchClick"
              />
            </b-input-group>
          </b-col>
          <b-col
            xl
            md="3"
            sm="4"
          >
            <div>
              Tên sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
              size="md"
            >
              <b-input
                v-model="searchOptions.productName"
                class="h8 text-brand-3 height-button-brand-1"
                placeholder="Nhập tên sản phẩm"
                @keyup.enter="onSearchClick"
              />
            </b-input-group>
          </b-col>
          <b-col
            xl
            lg="3"
            sm="4"
          >
            <div>
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
          <!-- START - Search button -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <div
              class="h7 text-white"
            >
              Tìm kiếm
            </div>
            <b-button
              class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
              variant="someThing"
              size="sm"
              style="height: 30px;"
              @click="onSearchClick"
            >
              <b-icon-search class="mr-1" />
              Tìm kiếm
            </b-button>
          </b-col>
          <!-- END - Search button -->
        </b-form-row>
        <!--END search form-->
        <div class="pt-2">
          <strong class="text-blue-vinamilk pt-2">
            Tổng cộng: {{ $formatNumberToLocale(totalProductFound) }} sản phẩm
          </strong>
        </div>
        <!-- START - Table -->
        <b-col
          class="py-1"
        >
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

        </b-col>
        <!--END table-->
      </b-form>
      <b-row class="m-1 justify-content-center">
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder d-flex justify-content-center align-items-center"
            variant="someThing"
            size="sm"
            @click="save()"
          >
            <b-icon
              icon="download"
              width="15"
              height="15"
              class="mr-1"
            />
            Chọn
          </b-button>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder d-flex justify-content-center align-items-center ml-1"
            size="sm"
            @click="cancel()"
          >
            <b-icon
              icon="x"
              width="20"
              height="20"
            />
            Đóng
          </b-button>
        </b-button-group>
      </b-row>
    </b-card>
  </b-modal>
</template>

<script>
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
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      products: [],
      perPageSizeOptions: commonData.perPageSizes,
      pageNumber: commonData.pageNumber,
      paginationData: {
        size: commonData.perPageSizes[0],
        page: this.pageNumber,
        sort: null,
      },
      totalProductFound: 0,
      // searchOptions
      searchOptions: {
        productCode: '',
        productName: '',
      },
      selectedProductRow: [],
      selectedCurrentPage: [],
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
      rows: [
        {
          productCode: '04DC10',
          productName: 'Thức uống cacao lúa mạch 180ml',
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
      const minPageSize = this.pageNumber === 1 ? 1 : (this.pageNumber * this.paginationData.size) - this.paginationData.size + 1
      const maxPageSize = (this.paginationData.size * this.pageNumber) > this.productsPagination.totalElements
        ? this.productsPagination.totalElements : (this.paginationData.size * this.pageNumber)

      return `${minPageSize} - ${maxPageSize} của ${this.productsPagination.totalElements} mục`
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
      this.totalProductFound = this.products.length
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
    },
    cancel() {
      this.$emit('close')
    },
    // pagination funcs
    onPaginationChange() {
      this.GET_PRODUCT_LIST_ACTION({
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
      this.GET_PRODUCT_LIST_ACTION({
        ...this.decentralization,
        ...this.searchOptions,
        catId: this.productCategorySelected,
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
  // pagination funcs
}
</script>
