<template>
  <b-modal
    title="Cấu hình máy in"
    :visible="visible"
    title-class="font-weight-bolder text-brand-1"
    @hidden="cancel()"
  >
    <b-container>
      <b-row
        v-if="!isTrue"
        align-v="center"
        align-h="center"
        class="my-2"
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
            File hướng dẫn sử dùng JSPrintManager:
            <a
              href="/documents/Hướng dẫn sử dùng JSPrintManager.docx"
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
          cols="4"
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
          cols="4"
          class="text-right"
        >
          Máy in hóa đơn:
        </b-col>
        <b-col cols="6">
          <tree-select
            v-model="printerReceiptSelected"
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
          cols="4"
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
    </b-container>
    <template #modal-footer="{}">
      <b-button
        size="sm"
        class="btn-brand-1"
        variant="something"
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
import {
  hostName,
} from '@/@core/utils/filter'
import JSPM from 'jsprintmanager'
import toasts from '@core/utils/toasts/toasts'
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
  },
  data() {
    return {
      ipAddress: null,
      isTrue: false,
      printerDataDefault: {},
      printerConfigOptions: [],
      printerDefaultSelected: null,
      printerReportSelected: null,
      printerReceiptSelected: null,
      nameOS: '',
      linkDownloadSoftWare: '',
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
        if (!this.isTrue) {
          this.jspmWSStatus()
        }
      }
    },
    printerConfigOptions() {
      if (this.printerConfigOptions.find(data => data.id === this.printerDataDefault.defaultPrinterName)) {
        this.printerDefaultSelected = this.printerDataDefault.defaultPrinterName
      } else {
        this.printerDefaultSelected = null
      }
      // selected printer report
      if (this.printerConfigOptions.find(data => data.id === this.printerDataDefault.reportPrinterName)) {
        this.printerReportSelected = this.printerDataDefault.reportPrinterName
      } else {
        this.printerReportSelected = null
      }
      // selected printer bills
      if (this.printerConfigOptions.find(data => data.id === this.printerDataDefault.billPrinterName)) {
        this.printerReceiptSelected = this.printerDataDefault.billPrinterName
      } else {
        this.printerReceiptSelected = null
      }
    },

    getPrinterData() {
      this.printerDataDefault = { ...this.getPrinterData }
    },
  },
  mounted() {
    hostName().then(dta => { this.ipAddress = dta.ip })
    // this.getPrinterConfigOptions()
    this.jspmWSStatus()
  },
  methods: {
    ...mapActions(PRINTERCONFIG, [
      CREATE_PRINTER_CLIENT_ACTIONS,
      UPDATE_PRINTER_CLIENT_ACTIONS,
    ]),
    cancel() {
      this.$emit('cancel')
    },
    getPrinterConfigOptions() {
      this.printerConfigOptions = []
      // JSPM.JSPrintManager.start()
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
        toasts.error('JSPrintManager (JSPM) chưa được cài đặt hoặc chưa được mở')
        if (navigator.appVersion.indexOf('Win64') !== -1 || navigator.oscpu.indexOf('Win64') !== -1) {
          this.nameOS = 'Windows 64-bit'
          this.linkDownloadSoftWare = 'https://www.neodynamic.com/downloads/jspm/jspm-4.0.0-win64.msi'
        }
        if (navigator.appVersion.indexOf('Win32') !== -1 || navigator.oscpu.indexOf('Win32') !== -1) {
          this.nameOS = 'Windows 32-bit'
          this.linkDownloadSoftWare = 'https://www.neodynamic.com/downloads/jspm/jspm-4.0.0-win32.msi'
        }
        if (navigator.appVersion.indexOf('Mac') !== -1 || navigator.oscpu.indexOf('Mac') !== -1) {
          this.nameOS = 'MacOS'
          this.linkDownloadSoftWare = 'https://www.neodynamic.com/downloads/jspm/jspm-4.0.0.0-macOS.pkg'
        }
      } else if (JSPM.JSPrintManager.websocket_status === JSPM.WSStatus.Blocked) {
        toasts.error('JSPrintManager (JSPM) đã chặn trang web này!')
        this.isTrue = false
        JSPM.JSPrintManager.auto_reconnect = false
      }
    },
    onSaveClick() {
      if (this.printerDefaultSelected && this.printerReportSelected && this.printerReceiptSelected) {
        if (this.printerDataDefault.id) {
          this.UPDATE_PRINTER_CLIENT_ACTIONS({
            data: {
              id: this.printerDataDefault.id,
              clientIp: this.ipAddress,
              billPrinterName: this.printerReceiptSelected,
              defaultPrinterName: this.printerDefaultSelected,
              reportPrinterName: this.printerReportSelected,
            },
            onSuccess: () => {
              this.visible = false
            },
          })
        } else {
          this.CREATE_PRINTER_CLIENT_ACTIONS({
            data: {
              clientIp: this.ipAddress,
              billPrinterName: this.printerReceiptSelected,
              defaultPrinterName: this.printerDefaultSelected,
              reportPrinterName: this.printerReportSelected,
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
