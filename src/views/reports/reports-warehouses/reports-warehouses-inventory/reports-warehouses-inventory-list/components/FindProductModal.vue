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
      <!--START search form-->
      <b-form>
        <div class="bg-light w-25 h-25 rounded-right border-top-info border-bottom-info border-right-info">
          <strong class="text-blue-vinamilk">
            Tìm kiếm sản phẩm
          </strong>
        </div>
        <b-form-row class="v-search-form mx-0 pt-1">
          <b-col
            lg
            md="3"
            sm="4"
          >
            <div>
              Mã sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
              size="sm"
            >
              <b-input />
            </b-input-group>
          </b-col>
          <b-col
            lg
            md="3"
            sm="4"
          >
            <div>
              Tên sản phẩm
            </div>
            <b-input-group
              class="input-group-merge"
              size="sm"
            >
              <b-input />
            </b-input-group>
          </b-col>
          <b-col
            lg
            md="3"
            sm="4"
          >
            <b-input-group>
              <v-input-select
                :title="'Ngành hàng'"
                :placeholder="' '"
              />
            </b-input-group>
          </b-col>
          <!-- START - Search button -->
          <b-col
            xl
            sm="4"
            md="3"
          >
            <div
              class="h8 text-white"
            >
              Tìm kiếm
            </div>
            <b-button
              class="bg-blue-vinamilk text-white h9 d-flex justify-content-center align-items-center"
              variant="someThing"
              style="height: 30px;"
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
          /></b-col>
        <!--END table-->
      </b-form>
      <b-row class="m-1 justify-content-center">
        <b-button-group>
          <b-button
            class="d-flex justify-content-center align-items-center ml-1 rounded text-uppercase bg-blue-vinamilk text-white h9"
            variant="someThing"
          >
            <b-icon
              icon="download"
              width="15"
              height="15"
              class="mr-1"
            />
            lưu
          </b-button>
          <b-button
            class="d-flex justify-content-center align-items-center ml-1 rounded text-uppercase bg-blue-vinamilk text-white h9"
            variant="someThing"
            @click="$bvModal.hide('modal')"
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
import VInputSelect from '@/@core/components/v-input-select/VInputSelect.vue'

export default {
  components: {
    VInputSelect,
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
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'productCode',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'productName',
          sortable: false,
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
}
</script>
