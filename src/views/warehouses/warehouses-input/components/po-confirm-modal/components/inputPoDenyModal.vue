<template>
  <b-modal
    id="po-deny-modal"
    size="md"
    :visible="visible"
    title="Lý do không nhập hàng"
    title-class="text-uppercase font-weight-bold text-brand-1"
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
  mapMutations,
} from 'vuex'
import toasts from '@core/utils/toasts/toasts'
import {
  WAREHOUSEINPUT,
  NOT_IMPORT_REASONS_GETTER,
  STATUS_NOT_IMPORT_GETTER,
  GET_POCONFIRMS_ACTION,
  UPDATE_NOT_IMPORT_ACTION,
  GET_NOT_IMPORT_REASONS_ACTION,
  CLEAR_STATUS_NOT_IMPORT_MUTATION,
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
    status() {
      return this.STATUS_NOT_IMPORT_GETTER()
    },
  },
  watch: {
    reasonOptions() {
      this.reasonSelected = this.reasonOptions[0].id
    },
    status() {
      if (this.status === true) {
        this.CLEAR_STATUS_NOT_IMPORT_MUTATION()
        this.$emit('deny')
      }
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
      STATUS_NOT_IMPORT_GETTER,
    ]),
    ...mapActions(WAREHOUSEINPUT, [
      UPDATE_NOT_IMPORT_ACTION,
      GET_POCONFIRMS_ACTION,
      GET_NOT_IMPORT_REASONS_ACTION,
    ]),
    ...mapMutations(WAREHOUSEINPUT, [
      CLEAR_STATUS_NOT_IMPORT_MUTATION,
    ]),
    denyImport() {
      if (this.reasonSelected) {
        this.UPDATE_NOT_IMPORT_ACTION({
          id: this.id,
          reasonDeny: this.reasonSelected,
          formId: this.formId, // hard code
          ctrlId: this.ctrlId, // hard code
        })
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
