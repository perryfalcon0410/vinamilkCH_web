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
    <b-form-row>
      <b-col
        xl
        sm="4"
        md="3"
        class="mt-1 pl-3"
      >
        <b-form-group
          label="Ngành hàng"
          label-for="form-input-Producttype"
        >
          <b-form-select
            id="form-input-Producttype"
          />
        </b-form-group>
      </b-col>
      <b-col
        xl
        sm="4"
        md="3"
        class="mt-1"
      >
        <b-form-group
          label="Sản phẩm"
          label-for="form-input-Product"
        >
          <b-form-input
            id="form-input-Product"
          />
        </b-form-group>
      </b-col>
      <b-col
        xl
        sm="4"
        md="3"
        class="mt-1"
      >
        <b-form-group
          label="Tìm kiếm"
          label-for="form-button-search"
        >
          <b-button
            id="form-button-search"
            variant="primary"
            @click="search()"
          >
            <b-icon-search />
          </b-button>
        </b-form-group>
      </b-col>
    </b-form-row>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      class="pb-1 px-3"
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
        <div v-if="props.column.field === 'Quantity'">
          <b-input
            type="number"
          />
        </div>
        <div v-else>
          {{ props.formattedRow[props.column.field] }}
        </div>
      </template>
    </vue-good-table>
    <b-row class="justify-content-center mt-4 mr-1">
      <b-button-group>
        <b-button
          class="d-flex align-items-center ml-1 rounded text-uppercase"
          variant="primary"
        >
          <b-icon
            icon="download"
            width="20"
            height="20"
            class="mr-1"
          />
          Chọn
        </b-button>
        <b-button
          class="d-flex align-items-center ml-1 rounded text-uppercase"
          @click="hide"
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
  </b-modal>
</template>
<script>

export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      columns: [
        {
          label: 'Mã sản phẩm',
          field: 'Producttype',
          sortable: false,
        },
        {
          label: 'Tên sản phẩm',
          field: 'ProductName',
          sortable: false,
        },
        {
          label: 'Số lượng đặt',
          field: 'Quantity',
          type: 'number',
          sortable: false,
        },
      ],
      rows: [
        {
          Producttype: '04DC10',
          ProductName: 'Thức uống cacao lúa mạch 180ml',
          Quantity: '',
        },
      ],
    }
  },
  methods: {
    hide() {
      // this.$bvModal.hide('modal')
      this.$emit('closeModal', false)
    },
  },
}
</script>
