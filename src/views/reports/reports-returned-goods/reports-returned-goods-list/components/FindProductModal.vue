<template>
  <b-modal
    size="xl"
    :visible="visible"
    title="Chọn sản phẩm"
    hide-footer="true"
  >
    <b-card>
      <div class="bg-light w-25 h-25 m-0">
        <strong class="text-brand-1">
          Tìm kiếm sản phẩm
        </strong>
      </div>
      <!--START search form-->
      <b-form>
        <b-form-row class="v-search-form mx-0 pt-1">
          <!-- START - Products code -->
          <b-col
            xl
            lg="3"
            sm="4"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Mã sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model="productId"
                class="h8 text-brand-3"
                placeholder="Nhập họ tên/mã"
                @keyup.enter="onClickSearchButton"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="productId"
                  class="cursor-pointer text-gray"
                  @click="productId = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- END - Products name -->

          <!-- START - Products Name  -->
          <b-col
            xl
            lg="3"
            sm="4"
          >
            <div
              class="h8 mt-sm-1 mt-xl-0"
            >
              Tên sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
            >
              <b-form-input
                v-model="productName"
                class="h8 text-brand-3"
                placeholder="Nhập họ tên/mã"
                @keyup.enter="onClickSearchButton"
              />
              <b-input-group-append
                is-text
              >
                <b-icon-x
                  v-show="productName"
                  class="cursor-pointer text-gray"
                  @click="productName = null"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- END -  Products Name -->
          <b-col
            lg
            md="3"
            sm="4"
          >
            <div>
              Loại ngành hàng
            </div>
            <tree-select
              v-model="productsCatSelected"
              :options="productsCatOptions"
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
              class="shadow-brand-1 bg-brand-1 text-white h9 align-items-button-center mt-sm-1 mt-xl-0 font-weight-bolder"
              variant="someThing"
              @click="onClickSearchButton()"
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
            Tổng cộng:
          </strong>
        </div>
        <!-- START - Table -->
        <b-col
          class="py-1"
        >
          <vue-good-table
            :columns="columns"
            :rows="rows"
            style-class="vgt-table striped"
            compact-mode
            line-numbers
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true,
              selectionInfoClass: 'custom-class',
              clearSelectionText: 'clear',
              disableSelectInfo: true,
              selectAllByGroup: true,
              multipleColumns: true,
            }"
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
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
                    Hiển thị 1 đến
                  </span>
                  <b-form-select
                    v-model="elementSize"
                    size="sm"
                    :options="paginationOptions"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage: value})"
                  />
                  <span
                    class="text-nowrap"
                  > trong {{ productsPagination.totalElements }} mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="productsPagination.totalElements"
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
            variant="someThing"
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
import {
  mapActions,
  mapGetters,
} from 'vuex'

import commonData from '@/@db/common'

import {
  REPORT_RETURNED_GOODS,
  PRODUCT_CAT_LISTS_GETTER,
  PRODUCT_LISTS_GETTER,
  PRODUCTS_PAGINATION_GETTER,
  // Actions
  GET_PRODUCT_LISTS_ACTIONS,
  GET_PRODUCT_CAT_LISTS_ACTIONS,
} from '../../store-module/type'

export default {
  components: {
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
      productId: null,
      productName: null,
      productsCatSelected: null,

      selectedRow: 0,
      elementSize: commonData.pagination[0],
      pageNumber: 1,
      paginationOptions: commonData.pagination,
      paginationData: {},

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
        {
          productCode: '04DC10',
          productName: 'Thức uống cocacola có gaz 330ml',
        },
        {
          productCode: '04DC10',
          productName: 'Thức uống cacao sữa dừa 2500ml',
        },
        {
          productCode: '04DC10',
          productName: 'Thức uống cacao sữa dừa 2500ml',
        },
        {
          productCode: '04DC10',
          productName: 'Thức uống cacao sữa dừa 2500ml',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      PRODUCT_CAT_LISTS_GETTER,
    ]),
    productsCatOptions() {
      return this.PRODUCT_CAT_LISTS_GETTER.map(data => ({
        id: data.productInfoCode,
        label: data.productInfoName,
      }))
    },

    productLists() {
      return this.PRODUCT_LISTS_GETTER().map(data => ({
        productCodes: data.productCodes,
        productName: data.productName,
      }))
    },

    productsPagination() {
      return this.PRODUCTS_PAGINATION_GETTER
    },
  },

  watch: {
    pageNumber() {
      this.paginationData.page = this.pageNumber - 1
      this.onPaginationChange()
    },
    elementSize() {
      this.paginationData.size = this.elementSize
      this.onPaginationChange()
    },
    paginationData() {
      this.pageNumber = 1
      this.onPaginationChange()
    },
  },

  beforeMount() {
    this.GET_PRODUCT_CAT_LISTS_ACTIONS({ formId: 5, ctrlId: 7 })
  },
  mounted() {
    this.GET_PRODUCT_CAT_LISTS_ACTIONS({ formId: 5, ctrlId: 7 })
  },

  methods: {
    ...mapGetters(REPORT_RETURNED_GOODS, [
      PRODUCT_LISTS_GETTER,
      PRODUCT_CAT_LISTS_GETTER,
      PRODUCTS_PAGINATION_GETTER,
    ]),

    ...mapActions(REPORT_RETURNED_GOODS, [
      GET_PRODUCT_LISTS_ACTIONS,
      GET_PRODUCT_CAT_LISTS_ACTIONS,
    ]),

    onPaginationChange() {
      this.GET_PRODUCT_LISTS_ACTIONS(this.paginationData)
    },
    onClickSearchButton() {
      // this.GET_PRODUCT_LISTS_ACTIONS({
      //   formId: 1,
      //   ctrlId: 1,
      //   productName: this.productName?.trim(),
      //   productCodes: this.productcode,
      //   catId: this.productsCatSelected,
      // })
      console.log({
        productName: this.productName?.trim(),
        productCodes: this.productId?.trim(),
        catId: this.productsCatSelected,
      })
    },

    save() {
      this.$emit('close')
    },

    cancel() {
      this.$emit('close')
    },
  },

}
</script>
