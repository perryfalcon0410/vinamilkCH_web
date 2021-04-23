<template>
  <b-modal
    size="md"
    :visible="visible"
    title="Lý do không nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <b-form-group
      label="Lý do"
      label-for="reason"
    >
      <b-form-select
        id="reason"
        v-model="selected"
        :options="options"
      />
    </b-form-group>
    {{ selectedItem }}
    <template #modal-footer="{ cancel }">
      <b-button
        variant="danger"
        class="d-flex align-items-center text-uppercase"
        @click="denyImport"
      >
        <b-icon
          icon="slash-circle"
          width="20"
          height="20"
          class="mr-1"
        />
        Không nhập
      </b-button>
      <b-button
        variant="secondary"
        class="d-flex align-items-center text-uppercase"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          width="20"
          height="20"
        />
        Đóng
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {
  mapActions,
} from 'vuex'
import {
  WAREHOUSEINPUT,
  GET_POCONFIRMS_ACTION,
  UPDATE_NOT_IMPORT_ACTION,
} from '../../../store-module/type'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: '',
      options: [
        { value: 'A', text: 'Po không muốn nhập' },
        { value: 'B', text: 'Chính sách không cho nhập' },
      ],
    }
  },
  methods: {
    ...mapActions(WAREHOUSEINPUT, [
      UPDATE_NOT_IMPORT_ACTION,
      GET_POCONFIRMS_ACTION,
    ]),
    denyImport() {
      this.UPDATE_NOT_IMPORT_ACTION(this.$props.id)
      this.GET_POCONFIRMS_ACTION()
    },
  },
}
</script>
