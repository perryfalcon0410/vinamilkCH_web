<template>
  <b-modal
    size="md"
    :visible="visible"
    title="Lý do không nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <v-input-select
      :title="'Lý do'"
      :placeholder="''"
      :data-input="reasonSelected.name"
      :suggestions="reasonOptions"
      @updateSelection="reasonSelected = $event"
    />
    <span> {{ reasonOptions }}</span>
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
  mapGetters,
  mapActions,
} from 'vuex'
import VInputSelect from '@core/components/v-input-select/VInputSelect.vue'
import {
  WAREHOUSEINPUT,
  NOT_IMPORT_REASONS_GETTER,
  GET_POCONFIRMS_ACTION,
  UPDATE_NOT_IMPORT_ACTION,
  GET_NOT_IMPORT_REASONS_ACTION,
} from '../../../store-module/type'

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
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      reasonSelected: { id: null, name: null },
    }
  },
  computed: {
    reasonOptions() {
      return this.NOT_IMPORT_REASONS_GETTER().map((data, index) => ({
        id: index + 1,
        name: data.apParamName,
      }))
    },
  },
  mounted() {
    this.GET_NOT_IMPORT_REASONS_ACTION({
      formId: 5, // hard code
      ctrlId: 7, // hard code
    })
  },
  methods: {
    ...mapGetters(WAREHOUSEINPUT, [
      NOT_IMPORT_REASONS_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      UPDATE_NOT_IMPORT_ACTION,
      GET_POCONFIRMS_ACTION,
      GET_NOT_IMPORT_REASONS_ACTION,
    ]),
    denyImport() {
      this.UPDATE_NOT_IMPORT_ACTION(this.$props.id)
      this.GET_POCONFIRMS_ACTION()
    },
  },
}
</script>
