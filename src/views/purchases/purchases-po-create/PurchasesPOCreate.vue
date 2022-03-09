<template>
  <b-container
    fluid
    class="d-flex flex-column px-0"
  >
    <!-- START - Common infomations -->
    <common-info />
    <!-- END - Common infomations -->
    <b-form class="bg-white rounded shadow my-1">
      <!-- START - Select Po type -->
      <b-row
        class="border-bottom pr-1 mx-0"
        align-v="center"
      >
        <div
          class="m-1 text-primary"
        >
          <strong class="text-brand-1">
            Đơn đặt hàng
          </strong>
        </div>
        <b-form-radio-group
          v-model="selected"
          :options="options"
          value-field="type"
          text-field="value"
          class="ml-5"
        />
      </b-row>
      <!--  - Select Po type -->
      <b-row>
        <b-col class="py-1">
          <!--START - Recommend Po-->
          <vue-good-table
            v-if="selected == 'A'"
            :columns="recommendPoColumns"
            :rows="recommendPoRows"
            style-class="vgt-table striped"
            line-numbers
            :pagination-options="{
              enabled: true,
              perPage: elementSize
            }"
            class="pb-1 mx-1"
          >

            <template
              slot="table-row"
              slot-scope="props"
            >
              <div v-if="props.column.field === 'slt'">
                <b-input
                  type="number"
                  size="sm"
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
                  > trong 69 mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="69"
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
          <!--END - Recommend Po-->

          <!--START - Manual Po-->
          <vue-good-table
            v-if="selected == 'B'"
            :columns="manualPoColumns"
            :rows="manualRows"
            style-class="vgt-table striped"
            line-numbers
            :pagination-options="{
              enabled: true
            }"
            class="pb-1 mx-1"
          >
            <!--START-Create Po-->
            <template
              slot="table-column"
              slot-scope="props"
            >
              <span v-if="props.column.field === 'button'">
                <b-icon-plus
                  v-b-popover.hover="'Chọn sản phẩm'"
                  class="cursor-pointer ml-2"
                  scale="2.5"
                  @click="showChooseProductsModal"
                />
              </span>
              <span v-else>
                {{ props.column.label }}
              </span>
            </template>
            <!--END-Create Po-->

            <!--START-Delete-Create Po-->
            <template
              slot="table-row"
              slot-scope="props"
            >
              <span v-if="props.column.field === 'userInput'">
                <b-input
                  v-model="props.row.userInput"
                  type="number"
                />
              </span>
              <span v-if="props.column.field === 'button'">
                <b-icon-x
                  v-b-popover.hover="'Xóa'"
                  class="cursor-pointer ml-1"
                  scale="2.5"
                />
              </span>
              <span v-if="props.column.field != 'button' && props.column.field != 'userInput' ">
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
            <!--END-Delete-Create Po-->

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
                  > trong 69 mục </span>
                </div>
                <b-pagination
                  v-model="pageNumber"
                  :total-rows="69"
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
          <!--END - Manual Po-->
        </b-col>
      </b-row>

      <b-row class="d-flex flex-row justify-content-end pr-2">
        <label class="px-1">
          Tổng SL:<strong class="text-brand-1"> 45</strong>
        </label>
        <label class="px-1">
          Tổng tiền(bao gồm VAT):<strong class="text-brand-1"> 45</strong>
        </label>
        <label class="px-1">
          Tổng trọng lượng:<strong class="text-brand-1"> 45</strong>
        </label>
      </b-row>

      <!--START-BUTTON-GROUP-->
      <b-row class="justify-content-center mt-2 pb-2">
        <!--START - Recommend Po Button Group-->
        <b-button-group
          v-if="selected == 'A'"
        >
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
          >
            <b-icon
              icon="download"
            />
            Lưu
          </b-button>
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder ml-1"
            variant="someThing"
          >
            <b-icon
              icon="file-earmark-text-fill"
            />
            Xuất excel
          </b-button>
        </b-button-group>
        <!--END - Recommend Po Button Group-->

        <!--START - Manual Po Button Group-->
        <b-button-group
          v-if="selected == 'B'"
        >
          <b-button
            class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
            variant="someThing"
          >
            <b-icon-download />
            Lưu
          </b-button>
        </b-button-group>
      <!--END - Manual Po Button Group-->
      </b-row>
    <!--END-BUTTON-GROUP-->
    </b-form>

    <choose-products-modal
      :visible="isChooseProductsModal"
      :pochooselist="poChooseList"
      @close="closeChooseProductsModal()"
      @passvalue="passValue($event)"
    />
  </b-container>
</template>

<script>
import purchaseData from '@/@db/purchase'
import ChooseProductsModal from './components/ChooseProductModal.vue'
import CommonInfo from './components/CommonInfo.vue'

export default {
  components: {
    ChooseProductsModal,
    CommonInfo,
  },
  data() {
    return {
      elementSize: 20,
      pageNumber: 1,
      paginationOptions: purchaseData.pagination,
      isChooseProductsModal: false,
      selected: 0,
      options: purchaseData.poType,
      poChooseList: [],
      manualRows: [],
      recommendPoColumns: [
        {
          label: 'Mã SP',
          field: 'productCode', // custom filed name
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên SP',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Đầu kỳ',
          field: 'firstPeriod',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Nhập',
          field: 'input',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Xuất',
          field: 'output',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'LKTTT',
          field: 'lkttt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'KHTTT',
          field: 'khttt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'DMKH',
          field: 'dmkh',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Dự trữ(KH)',
          field: 'kh',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Dự trữ(TT)',
          field: 'tt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho(Min)',
          field: 'min',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho(Max)',
          field: 'max',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Tồn kho(Lead)',
          field: 'lead',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Y/c tồn SL',
          field: 'amountInventory',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'PO nhập hàng',
          field: 'poInput',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Yêu cầu(QC)',
          field: 'qc',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Yêu cầu(SLT)',
          field: 'slt',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Yêu cầu(Thành tiền)',
          field: 'totalPaid',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Yêu cầu(Trọng lượng)',
          field: 'weight',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'CB',
          field: 'cb',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      recommendPoRows: [
        {
          productCode: '04AA10',
          productName: 'STT dâu ADM GOLD 180ml',
        },
      ],
      // Manual Po
      manualPoColumns: [
        {
          label: 'Mã SP',
          field: 'productCode', // custom filed name
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên SP',
          field: 'productName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên kho',
          field: 'warehouseName',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Số lượng đặt',
          field: 'userInput',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Đơn giá',
          field: 'price',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Thành tiền',
          field: 'totalPrice',
          sortable: false,
          thClass: 'text-right',
          tdClass: 'text-right',
        },
        {
          label: 'Chức năng',
          field: 'button',
          sortable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
    }
  },
  methods: {
    showChooseProductsModal() {
      this.isChooseProductsModal = !this.isChooseProductsModal
    },
    closeChooseProductsModal() {
      this.isChooseProductsModal = false
    },
    passValue(value) {
      this.manualRows = value
      this.poChooseList = this.manualRows
    },
  },
}
</script>
