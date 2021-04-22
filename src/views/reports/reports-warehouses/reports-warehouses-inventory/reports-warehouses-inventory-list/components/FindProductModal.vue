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
        <label class="text-primary">
          Tìm kiếm sản phẩm
        </label>
        <b-form-row class="v-search-form mx-0 pt-1">
          <b-col
            xs
            sm="4"
            md="3"
          >
            <b-form-group
              class="ml-lg-1"
              label="Mã sản phẩm"
              label-for="ProductCode"
            >
              <b-input
                id="ProductCode"
              />
            </b-form-group>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Tên sản phẩm"
              label-for="ProductName"
            >
              <b-input
                id="ProductName"
              /></b-form-group>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Ngành hàng"
              label-for="group"
            >
              <b-form-select
                id="group"
              />
            </b-form-group>
          </b-col>
          <b-col
            xl
            sm="4"
            md="3"
          >
            <b-form-group
              label="Tìm kiếm"
              label-for="form-button-search"
            >
              <b-button
                id="form-button-search"
                variant="primary"
              >
                <b-icon-search />
                Tìm kiếm
              </b-button>
            </b-form-group>
          </b-col>
        </b-form-row>
        <!--END search form-->

        <b-form-row>
          <strong>
            Tổng cộng:
          </strong>
        </b-form-row>

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
          />
        </b-col>
        <!--END table-->
      </b-form>
      <b-row class="m-1 justify-content-center">
        <b-button-group>
          <b-button
            variant="primary"
            class="d-flex align-items-center rounded text-uppercase"
          >
            <b-icon
              icon="download"
              width="20"
              height="20"
              class="mr-1"
            />
            lưu
          </b-button>
          <b-button
            class="d-flex align-items-center ml-1 rounded text-uppercase"
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
