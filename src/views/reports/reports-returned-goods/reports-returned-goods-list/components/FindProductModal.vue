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
            <div>
              Loại ngành hàng
            </div>
            <tree-select
              v-model="reasonSelected"
              title="Nhóm khách hàng"
              :options="reasonOptions"
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
import reportData from '@/@db/report'

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
      toDate: null,
      reasonOptions: reportData.reasonTypes,
      reasonSelected: null,

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
  methods: {
    save() {
      this.$emit('close')
    },
    cancel() {
      this.$emit('close')
    },
  },
}
</script>
