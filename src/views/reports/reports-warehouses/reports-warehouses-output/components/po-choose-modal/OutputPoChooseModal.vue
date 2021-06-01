<template>
  <b-modal
    size="lg"
    :visible="visible"
    title="Chọn sản phẩm"
    title-class="text-uppercase font-weight-bold text-brand-1"
    content-class="bg-light"
    hide-footer
    hide-header-close
  >
    <b-container fluid>
      <!-- START - Body -->

      <!-- START - Search -->
      <b-col
        class="bg-white rounded shadow"
      >
        <b-col class="pl-2">
          <!-- START - Label -->
          <div
            class="pt-1"
          >
            <strong class="text-brand-1">
              Tìm kiếm sản phẩm
            </strong>
          </div>
          <!-- END - Label -->

          <!-- START - INPUT -->
          <b-row
            class="pt-1"
          >
            <!-- START - Product code -->
            <b-col
              sm="4"
              md="2"
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
                  v-model.trim="productCode"
                  :state="productCode ? passed : null"
                  maxlength="20"
                  class="h9"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="productCode"
                    class="cursor-pointer text-gray"
                    @click="productCode = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - Product code -->

            <!-- START - Product name -->
            <b-col
              sm="4"
              md="4"
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
                  v-model.trim="productName"
                  :state="productName ? passed : null"
                  maxlength="20"
                  class="h9"
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
            <!-- END - Product name -->

            <!-- START - Industry -->
            <b-col
              sm="4"
              md="3"
            >
              <div
                class="h8 mt-sm-1 mt-xl-0"
              >
                Ngành hàng
              </div>
              <b-input-group
                class="input-group-merge"
              >
                <b-form-input
                  v-model.trim="industry"
                  :state="industry ? passed : null"
                  maxlength="20"
                  class="h9"
                />
                <b-input-group-append
                  is-text
                >
                  <b-icon-x
                    v-show="industry"
                    class="cursor-pointer text-gray"
                    @click="industry = null"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <!-- END - Industry -->

            <!-- START - Button search -->
            <b-col
              sm="4"
              md="3"
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
                @click="onClickSearchButton()"
              >
                <b-icon-search class="mr-1" />
                Tìm kiếm
              </b-button>
            </b-col>
          <!-- END - Button search -->

          </b-row>
          <!-- END - INPUT -->
          <b-row>
            <b-form>
              <!-- START - Title -->
              <b-form-row class="align-items-center ml-1 mt-1">
                <strong
                  class="text-brand-1 pb-1"
                >
                  Tổng cộng: 123 sản phẩm
                </strong>
              </b-form-row>
              <!-- END - Title -->

              <!-- Start table -->
              <b-col>
                <vue-good-table
                  :columns="columns"
                  :rows="rowsProduct"
                  class="pb-1"
                  style-class="vgt-table striped"
                  :pagination-options="{
                    enabled: true
                  }"
                  compact-mode
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

                </vue-good-table>
              </b-col>
            <!-- End table -->

            </b-form>
          </b-row>
        </b-col>
      </b-col>
      <!-- END Search -->
      <!-- END Body -->
    </b-container>

  </b-modal>
</template>

<script>
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
      width: window.innerWidth,
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'ProductId',
          sortable: false,
          width: '200px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
        {
          label: 'Tên sản phẩm',
          field: 'Name',
          sortable: false,
          width: '400px',
          thClass: 'text-left',
          tdClass: 'text-left',
        },
      ],
      rowsProduct: [
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
        {
          productId: '04DC10',
          name: 'Thức uống cacao lúa mạch 180ml',
        },
      ],
    }
  },
  methods: {
  },
}
</script>
