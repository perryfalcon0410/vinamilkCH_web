<template>
  <!-- START Popup -->
  <b-modal
    id="modal"
    size="xl"
    title="Chọn sản phẩm"
    :visible="visible"
    hide-footer="true"
    hide-header-close="true"
  >
    <div class="p-1">
      <b-row>
        <b-col
          xl
          md="3"
          sm="4"
          class="pr-0"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Ngành hàng
          </div>
          <b-input
            title="Ngành hàng"
            placeholder=""
            title-class="h8 mt-sm-1 mt-xl-0"
            input-class="h9"
            suggestions-class="h9"
          />
        </b-col>
        <b-col
          xl
          md="3"
          sm="4"
          class="pr-0"
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Sản phẩm
          </div>
          <b-input
            v-model="searchKeyword"
            size="sm"
          />
        </b-col>
        <b-col
          xl
          sm="4"
          md="3"
          class="h-25"
        >
          <div
            class="h8 text-white"
          >
            Tìm kiếm
          </div>
          <b-button
            id="form-button-search"
            class="shadow-brand-1 bg-brand-1 text-white h9 d-flex justify-content-center align-items-center mt-sm-1 mt-xl-0 font-weight-bolder"
            variant="someThing"
            style="height: 30px;"
            @click="searchWithKeyword()"
          >
            <b-icon-search />
            Tìm kiếm
          </b-button>
        </b-col>
      </b-row>
      <vue-good-table
        id="my-table"
        ref="my-table"
        :columns="columns"
        :rows="rows"
        class="pt-2"
        style-class="vgt-table striped"
        :pagination-options="{
          enabled: false
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
          slot="table-row"
          slot-scope="props"
        >
          <div v-if="props.column.field === 'userInput'">
            <b-input
              v-model="props.row.userInput"
              type="number"
            />
          </div>
          <div v-else>
            {{ props.formattedRow[props.column.field] }}
          </div>
        </template>

        <!-- START - Pagination -->
        <!-- <template
          slot="pagination-bottom"
        >
          <b-row
            class="v-pagination px-1 mx-0"
            align-h="between"
            align-v="center"
          >
            <div class="d-flex align-items-center" />
            <b-pagination
              v-model="pageNumber"
              :total-rows="maxRow"
              :per-page="perPage"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-2"
              @input="(value)=>pageChanged({currentPage: value})"
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
      <b-row class="justify-content-center mt-4 mr-1">
        <b-button-group>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
            variant="someThing"
            @click="onClickChooseProduct()"
          >
            <b-icon
              icon="download"
            />
            Chọn
          </b-button>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
            @click="hide"
          >
            <b-icon
              icon="x"
              scale="1.5"
            />
            Đóng
          </b-button>
        </b-button-group>
      </b-row>
    </div>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  PURCHASES,

  GET_PRODUCT_GETTER,

  GET_PRODUCT_ACTION,
} from '../../store-module/type'

export default {
  components: {
  },
  props: {
    visible: {
      type: Boolean,
    },
    pochooselist: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      pageNumber: 1,
      poSelectedList: [],
      userInputMap: [],
      poPassingValue: [],
      // currentPage: 1,
      // maxPage: 1,
      // maxRow: 1,
      // perPage: 10,
      select: ['Vuetify', 'Programming'],
      items: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
      ],
      searchKeyword: '',
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
        {
          label: 'Số lượng đặt',
          field: 'userInput',
          type: 'number',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      rows: [],
    }
  },

  computed: {
    ...mapGetters(PURCHASES, [
      GET_PRODUCT_GETTER,
    ]),

    productList() {
      return this.GET_PRODUCT_GETTER
    },

    getPassValue() {
      return this.pochooselist
    },
    getMaxPage() {
      return this.maxRow
    },
  },

  watch: {
    productList() {
      this.rows = []
      this.productList.forEach(n => {
        n.userInput = null
      })
      this.rows = this.productList
      // this.maxRow = this.productList.totalElements
    },
    getPassValue() {
      this.poPassingValue = this.pochooselist
    },
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions(PURCHASES, [
      GET_PRODUCT_ACTION,
    ]),
    hide() {
      this.$emit('close')
    },
    init() {
      this.GET_PRODUCT_ACTION({
        // page: (this.currentPage - 1),
        // size: 10,
      })
    },
    onClickChooseProduct() {
      this.$refs['my-table'].selectedRows.forEach(n => {
        this.poSelectedList.push(n)
      })
      this.$emit('close')
      this.$emit('passvalue', this.poSelectedList)
    },
    // pageChanged(page) {
    //   this.$refs['my-table'].selectedRows.forEach(n => {
    //     this.poSelectedList.push(n)
    //   })
    //   this.GET_PRODUCT_ACTION({
    //     page: (page.currentPage - 1),
    //     size: 10,
    //   })
    // },
    searchWithKeyword() {
      this.GET_PRODUCT_ACTION({
        keyword: this.searchKeyword,
        // page: (this.currentPage - 1),
        // size: 10,
      })
    },
  },
}
</script>
