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
          <v-input-select
            title="Ngành hàng"
            placeholder=""
            title-class="h8 mt-sm-1 mt-xl-0"
            input-class="h9"
            suggestions-class="h9"
            :clear-able="true"
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
          <b-input size="sm" />
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
        <template
          slot="pagination-bottom"
          slot-scope="props"
        >
          <b-row
            class="v-pagination px-1 mx-0"
            align-h="between"
            align-v="center"
          >
            <div class="d-flex align-items-center" />
            <b-pagination
              v-model="pageNumber"
              :total-rows="69"
              :per-page="elementSize"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-2"
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
import purchaseData from '@/@db/purchase'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import {
  PURCHASES,

  GET_PRODUCT_GETTER,

  GET_PRODUCT_ACTION,
} from '../../store-module/type'

export default {
  components: {
    VInputSelect,
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
      elementSize: 20,
      pageNumber: 1,
      paginationOptions: purchaseData.pagination,
      poSelectedList: [],
      userInputMap: [],
      poPassingValue: [],
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
  },

  watch: {
    productList() {
      this.productList.content.forEach(n => {
        n.userInput = 0
        this.rows.push(n)
      })
    },
    getPassValue() {
      this.poPassingValue = this.pochooselist
      console.log('pass value')
      console.log(this.poPassingValue)
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
        page: 0,
      })
    },
    onClickChooseProduct() {
      this.$refs['my-table'].selectedRows.forEach(n => {
        this.poSelectedList.push(n.productCode)
      })
      this.$emit('close')
      this.$emit('passvalue', this.$refs['my-table'].selectedRows)
    },
  },
}
</script>
