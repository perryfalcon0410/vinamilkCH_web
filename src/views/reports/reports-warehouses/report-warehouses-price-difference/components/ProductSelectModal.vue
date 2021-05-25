<template>
  <b-modal
    size="lg"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bolder text-brand-1"
    content-class="bg-light"
    footer-border-variant="light"
    hide-header-close
    centered
    @hidden="onCloseClick"
  >
    <!-- START - Modal body -->
    <b-container fluid>
      <!-- START - Search -->
      <v-card-actions
        class="bg-white rounded shadow "
        title="Tìm kiếm"
      >
        <!-- START - Product code -->
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
          <b-form-input
            v-model="searchOptions.productCode"
            class="h8 text-brand-3"
            placeholder="Nhập mã sản phẩm"
            @keyup.enter="onSearchClick"
          />
        </b-col>
        <!-- END - Product code -->

        <!-- START - Product name -->
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
          <b-form-input
            v-model="searchOptions.productName"
            class="h8 text-brand-3"
            placeholder="Nhập tên sản phẩm"
            @keyup.enter="onSearchClick"
          />
        </b-col>
        <!-- END - Product name -->

        <!-- START - Product cat -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Ngành hàng
          </div>
          <tree-select
            v-model="searchOptions.productCategorySelected"
            :options="productOptions"
            placeholder="Tất cả"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
        <!-- END - Product cat -->

        <!-- START - Search button -->
        <b-col
          xl
          lg="3"
          sm="4"
        >
          <div
            class="h8 text-white"
            onmousedown="return false;"
            style="cursor: context-menu;"
          >
            Tìm kiếm
          </div>
          <b-button
            class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
            variant="someThing"
            @click="onSearchClick"
          >
            <b-icon-search class="mr-05" />
            Tìm kiếm
          </b-button>
        </b-col>
        <!-- END - Search button -->
      </v-card-actions>
      <!-- END - Search -->

      <!-- START- Table -->
      <b-form class="bg-white rounded shadow rounded mt-1 p-1">
        <vue-good-table
          :columns="columns"
          :rows="productRows"
          style-class="vgt-table bordered"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
          }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
            multipleColumns: true,
            selected: true
          }"
          @on-row-click="selection"
        >
          <!-- START - Empty rows -->
          <div
            slot="emptystate"
            class="text-center"
          >
            Không có dữ liệu
          </div>
          <!-- END - Empty rows -->

          <!-- START- Custom select -->
          <template
            slot="select-options"
          >
            <b-checkbox :checked="true" />
          </template>
        <!-- END- Custom select -->
        </vue-good-table>
      </b-form>
      <!-- END- Table -->

    </b-container>
    <!-- END Modal body -->

    <!-- START - Modal footer -->
    <template #modal-footer="{ cancel }">
      <b-button
        variant="unknown"
        class="btn-brand-1 aligns-items-button-center"
        @click="onSaveClick"
      >
        <b-icon-check2
          scale="1.3"
          class="mr-05"
        />
        Lưu
      </b-button>
      <b-button
        variant="secondary"
        class="aligns-items-button-center"
        @click="cancel()"
      >
        <b-icon-x
          scale="1.5"
          class="mr-05"
        />
        Đóng
      </b-button>
    </template>
  <!-- END - Modal footer -->

  </b-modal>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import {
  resizeAbleTable,
} from '@core/utils/utils'
import {
  REPORT_WAREHOUSES_DIFFERENCE_PRICE,
  // GETTERS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_GETTER,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER,
  // ACTIONS
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_ACTION,
  GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION,
} from '../store-module/type'

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
      searchOptions: {
        productCode: null,
        productName: null,
        productCategorySelected: null,

      },
      selectedProductRow: [],
      selectedCurrentPage: [],
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },
      columns: [
        {
          label: 'STT',
          field: 'stt',
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
    }
  },

  computed: {
    ...mapGetters(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_GETTER,
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER,
    ]),

    productOptions() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_GETTER.map(data => ({
          id: data.id,
          label: data.productInfoName,
        }))
      }
      return {}
    },

    productRows() {
      if (this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER) {
        return this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_GETTER.map((data, index) => ({
          stt: index + 1,
          productName: data.productName,
          productCode: data.productCode,
          id: data.id,
        }))
      }
      return {}
    },
  },

  watch: {
    productRows() {
      this.productRows.forEach((item, index) => {
        const productSelectedFoundIndex = this.selectedProductRow.findIndex(data => item.id === data.id)
        if (productSelectedFoundIndex > -1) {
          this.$set(this.productRows[index], 'vgtSelected', true)
          this.selectedCurrentPage.push(item)
        } else {
          this.$set(this.productRows[index], 'vgtSelected', false)
        }
      })
    },

    visible() {
      if (this.selectedProductRow.length > 0 && this.visible) {
        this.productRows.forEach((item, index) => {
          const productSelectedFoundIndex = this.selectedProductRow.findIndex(data => item.id === data.id)
          if (productSelectedFoundIndex > -1) {
            this.$set(this.productRows[index], 'vgtSelected', true)
            this.selectedCurrentPage.push(item)
          } else {
            this.$set(this.productRows[index], 'vgtSelected', false)
          }
        })
      }
    },
  },

  mounted() {
    resizeAbleTable()
    this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_ACTION({
      ...this.decentralization,
    })
    this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION({
      ...this.decentralization,
    })
  },

  methods: {
    ...mapActions(REPORT_WAREHOUSES_DIFFERENCE_PRICE, [
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_PRODUCT_CATS_ACTION,
      GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION,
    ]),

    onCloseClick() {
      this.$emit('onCloseClick')
    },

    onSaveClick() {
      this.$emit('onSaveClick', this.selectedProductRow)
    },

    onSearchClick() {
      this.GET_REPORT_WAREHOUSES_DIFFERENCE_PRICE_CHOOSE_PRODUCTS_ACTION({
        ...this.searchOptions,
        prodcutCatSelected: this.productCategorySelected,
        ...this.decentralization,
      })
    },

    selection(params) {
      if (params.selected) {
        if (!this.selectedProductRow.find(data => data.id === params.row.id)) {
          this.selectedProductRow.push(params.row)
        }
      } else {
        const Index = this.selectedProductRow.findIndex(data => data.id === params.row.id)
        this.selectedProductRow.splice(Index, 1)
      }
    },
  },
}
</script>
