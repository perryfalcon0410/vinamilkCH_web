<template>
  <b-modal
    size="md"
    :visible="visible"
    title="Lý do không nhập hàng"
    title-class="text-uppercase font-weight-bold text-primary"
    content-class="bg-light"
    footer-border-variant="light"
  >
    <tree-select
      v-model="reasonSelected"
      :options="reasonOptions"
    />
    <template #modal-footer="{}">
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
        variant="someThing"
        @click="denyImport"
      >
        <b-icon
          icon="slash-circle"
        />
        Không nhập
      </b-button>
      <b-button
        class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder mr-1"
        variant="someThing"
        @click="cancel()"
      >
        <b-icon
          icon="x"
          scale="1.5"
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
import toasts from '@core/utils/toasts/toasts'
import {
  WAREHOUSEINPUT,
  NOT_IMPORT_REASONS_GETTER,
  GET_POCONFIRMS_ACTION,
  UPDATE_NOT_IMPORT_ACTION,
  GET_NOT_IMPORT_REASONS_ACTION,
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
      //
      formId: 5,
      ctrlId: 7,
      //
      reasonSelected: null,
    }
  },
  computed: {
    reasonOptions() {
      return this.NOT_IMPORT_REASONS_GETTER().map((data, index) => ({
        id: index + 1,
        label: data.apParamName,
      }))
    },
  },
  watch: {
    reasonOptions() {
      this.reasonSelected = this.reasonOptions[0].id
    },
  },
  mounted() {
    this.GET_NOT_IMPORT_REASONS_ACTION({
      formId: this.formId, // hard code
      ctrlId: this.ctrlId, // hard code
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
      if (this.reasonSelected) {
        this.UPDATE_NOT_IMPORT_ACTION({
          id: this.reasonSelected,
          formId: this.formId, // hard code
          ctrlId: this.ctrlId, // hard code
        })
        this.GET_POCONFIRMS_ACTION({
          formId: this.formId, // hard code
          ctrlId: this.ctrlId, // hard code
        })
        this.$emit('close')
      } else {
        toasts.error('Cần chọn tối thiểu 1 lý do')
      }
    },
    cancel() {
      this.$emit('close')
    },
  },
}
</script>
