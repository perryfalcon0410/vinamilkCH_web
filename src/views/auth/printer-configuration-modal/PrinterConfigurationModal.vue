<template>
  <b-modal
    title="Cấu hình máy in"
    :visible="visible"
    title-class="font-weight-bolder text-brand-1"
    class="d-print-none"
    @hidden="cancel()"
  >
    <b-container>
      <b-row
        v-if="!isTrue"
        align-v="center"
        align-h="center"
        class="my-2 d-print-none"
      >
        <div>
          <p>
            Nhấn tải
            <a
              :href="linkDownloadSoftWare"
              target="_blank"
            >JSPrintManager</a> và cài đặt cho {{ nameOS }}.
          </p>
          <p>
            File hướng dẫn sử dụng JSPrintManager:
            <a
              href="/documents/Hướng dẫn sử dụng JSPrintManager.docx"
              download
              target="_blank"
            > Tải về</a>
          </p>
        </div>
      </b-row>
      <b-row
        align-v="center"
        align-h="center"
        class="my-2"
      >
        <b-col
          cols="5"
          class="text-right"
        >
          Máy in mặc định:
        </b-col>
        <b-col cols="6">
          <tree-select
            v-model="printerDefaultSelected"
            :options="printerConfigOptions"
            :searchable="false"
            placeholder="Chọn máy in"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
      </b-row>
      <b-row
        align-v="center"
        align-h="center"
      >
        <b-col
          cols="5"
          class="text-right"
        >
          Máy in hóa đơn:
        </b-col>
        <b-col cols="6">
          <tree-select
            v-model="printerBillSelected"
            :options="printerConfigOptions"
            :searchable="false"
            placeholder="Chọn máy in"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
      </b-row>
      <b-row
        align-v="center"
        align-h="center"
        class="my-2"
      >
        <b-col
          cols="5"
          class="text-right"
        >
          Máy in báo cáo:
        </b-col>
        <b-col cols="6">
          <tree-select
            v-model="printerReportSelected"
            :options="printerConfigOptions"
            :searchable="false"
            placeholder="Chọn máy in"
            no-options-text="Không có dữ liệu"
          />
        </b-col>
      </b-row>
      <b-row
        align-v="center"
        align-h="center"
        class="my-2"
      >
        <b-col
          cols="5"
          class="text-right"
        >
          In hoá đơn không dấu:
        </b-col>
        <b-col cols="6">
          <b-form-checkbox
            v-model="removeAccent"
            class="mt-1"
          />
        </b-col>
      </b-row>

    </b-container>
    <template #modal-footer="{}">
      <b-button
        size="sm"
        class="btn-brand-1"
        variant="something"
        :disabled="isTrue === false"
        @click="onSaveClick"
      >
        Lưu
      </b-button>
    </template>
  </b-modal>
</template>

<script>

import {
  mapActions,
  mapGetters,
} from 'vuex'
import JSPM from 'jsprintmanager'
import toasts from '@core/utils/toasts/toasts'
import { getJSPMDownloadInfo } from '@core/utils/utils'
import {
  PRINTERCONFIG,
  // GETTERS
  PRINTER_CLIENT_GETTER,
  // ACTIONS
  CREATE_PRINTER_CLIENT_ACTIONS,
  UPDATE_PRINTER_CLIENT_ACTIONS,
} from './store-module/type'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    isOpenConfigurationModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      isTrue: false,
      printerDataDefault: {},
      printerConfigOptions: [],
      printerDefaultSelected: null,
      printerReportSelected: null,
      printerBillSelected: null,
      nameOS: '',
      linkDownloadSoftWare: '',
      removeAccent: true,
    }
  },
  computed: {
    ...mapGetters(PRINTERCONFIG, [
      PRINTER_CLIENT_GETTER,
    ]),
    getPrinterData() {
      if (this.PRINTER_CLIENT_GETTER) {
        return this.PRINTER_CLIENT_GETTER
      }
      return {}
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        // if (!this.isTrue) {
        this.jspmWSStatus()
        // }
      }
    },
    getPrinterData() {
      this.printerDataDefault = { ...this.getPrinterData }
      this.printerDefaultSelected = this.printerDataDefault.defaultPrinterName
      this.printerReportSelected = this.printerDataDefault.reportPrinterName
      this.printerBillSelected = this.printerDataDefault.billPrinterName
      this.removeAccent = this.printerDataDefault.removeAccent || true
      // this.ipAddress = this.printerDataDefault.clientIp
    },
  },
  mounted() {
    this.jspmWSStatus()
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [
      CREATE_PRINTER_CLIENT_ACTIONS,
      UPDATE_PRINTER_CLIENT_ACTIONS,
    ]),
    cancel() {
      this.isOpenConfigurationModal = true
      this.$emit('cancel')
    },
    getPrinterConfigOptions() {
      this.printerConfigOptions = []
      // this.jspmWSStatus()
      JSPM.JSPrintManager.WS.onStatusChanged = () => {
        JSPM.JSPrintManager.getPrinters().then(data => {
          data.forEach(e => {
            this.printerConfigOptions.push({ id: e, label: e })
          })
        })
      }
    },
    jspmWSStatus() {
      JSPM.JSPrintManager.license_url = process.env.VUE_APP_JSPM_LICENSE_PRINT
      JSPM.JSPrintManager.start()
      JSPM.JSPrintManager.auto_reconnect = true
      if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Open) {
        this.isTrue = true
        this.getPrinterConfigOptions()
        JSPM.JSPrintManager.auto_reconnect = true
      } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Closed) {
        this.isTrue = false
        JSPM.JSPrintManager.auto_reconnect = false
        if (this.isOpenConfigurationModal) {
          toasts.error('JSPrintManager (JSPM) chưa được cài đặt hoặc chưa được mở')
        }
        this.nameOS = getJSPMDownloadInfo().os
        this.linkDownloadSoftWare = getJSPMDownloadInfo().link
      } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Blocked) {
        if (this.isOpenConfigurationModal) {
          toasts.error('JSPrintManager (JSPM) đã chặn trang web này!')
        }
        this.isTrue = false
        JSPM.JSPrintManager.auto_reconnect = false
      }
    },
    onSaveClick() {
      if (this.printerDefaultSelected && this.printerReportSelected && this.printerBillSelected) {
        if (this.printerDataDefault.id) {
          this.UPDATE_PRINTER_CLIENT_ACTIONS({
            data: {
              id: this.printerDataDefault.id,
              clientIp: this.ipAddress,
              billPrinterName: this.printerBillSelected,
              defaultPrinterName: this.printerDefaultSelected,
              reportPrinterName: this.printerReportSelected,
              removeAccent: this.removeAccent,
            },
            onSuccess: () => {
              this.visible = false
            },
          })
        } else {
          this.CREATE_PRINTER_CLIENT_ACTIONS({
            data: {
              clientIp: this.ipAddress,
              billPrinterName: this.printerBillSelected,
              defaultPrinterName: this.printerDefaultSelected,
              reportPrinterName: this.printerReportSelected,
              removeAccent: this.removeAccent,
            },
            onSuccess: () => {
              this.visible = false
            },
          })
        }
      } else {
        toasts.error('cấu hình máy in không được để trống!')
      }
    },
  },
}
</script>
