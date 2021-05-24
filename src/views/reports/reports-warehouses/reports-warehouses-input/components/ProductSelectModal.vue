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
    @hidden="onModalClose"
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
            class="h8 text-brand-3 height-button-brand-1"
            placeholder="Nhập mã sản phẩm"
            @keyup.enter="onClickSearchButton"
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
        >
          <div
            class="h8 mt-sm-1 mt-xl-0"
          >
            Ngành hàng
          </div>
          <tree-select
            v-model="prodcutCatSelected"
            :options="productOptions"
            :searchable="false"
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
          :rows="rowsProduct"
          style-class="vgt-table bordered"
          :pagination-options="{
            enabled: true,
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

<script>import VCardActions from '@core/components/v-card-actions/VCardActions.vue'

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
      prodcutCatSelected: null,
      searchOptions: {
        productCode: null,
        productName: null,
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
