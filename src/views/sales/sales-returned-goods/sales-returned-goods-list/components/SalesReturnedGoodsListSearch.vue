<template>

  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Full Name -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Khách hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            ref="focusInput"
            v-model="searchKeywords"
            trim
            class="h7"
            placeholder="Nhập họ tên/mã"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="searchKeywords"
              class="cursor-pointer text-gray"
              @click="searchKeywords = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Full Name -->

      <!-- START - Phone -->
      <b-col
        xl
        lg="3"
        sm="4"
        class="h7"
      >
        <div
          class="mt-sm-1 mt-xl-0"
        >
          Số điện thoại
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model.trim="customerPhone"
            autocomplete="on"
            placeholder="Nhập chính xác 4 số cuối"
            maxlength="10"
            @keypress="$onlyNumberInput"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="customerPhone"
              class="cursor-pointer text-gray"
              @click="customerPhone = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Phone -->
      <!-- START - Return Code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Mã trả hàng
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="returnCode"
            trim
            class="h7"
            placeholder="Nhập mã trả hàng"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="returnCode"
              class="cursor-pointer text-gray"
              @click="returnCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Return Code -->

      <!-- START - Date From -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Từ ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @change="validateFromDate"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="fromDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="fromDate"
            :config="configFromDate"
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>
      </b-col>
      <!-- END - Date From -->

      <!-- START - Date To -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h7 mt-sm-1 mt-xl-0"
        >
          Đến ngày
        </div>
        <b-row
          class="v-flat-pickr-group mx-0"
          align-v="center"
          @change="validateToDate"
          @keypress="$onlyDateInput"
        >
          <b-icon-x
            v-show="toDate"
            style="position: absolute; right: 15px"
            class="cursor-pointer text-gray"
            scale="1.3"
            data-clear
          />
          <vue-flat-pickr
            v-model="toDate"
            :config="configToDate"
            class="form-control h7"
            placeholder="Chọn ngày"
          />
        </b-row>

      </b-col>
      <!-- END - Date To -->

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <!--"onmousedown" is prevent hightlight text -->
        <div
          class="h7 text-white"
          onmousedown="return false;"
          style="cursor: context-menu;"
        >
          Tìm kiếm
        </div>
        <b-button
          class="btn-brand-1 h8 align-items-button-center mt-sm-1 mt-xl-0"
          variant="someThing"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-50" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import toasts from '@/@core/utils/toasts/toasts'
import {
  reverseVniDate,
  earlyMonth,
  nowDate,
} from '@/@core/utils/filter'

export default {
  components: {
    VCardActions,
  },
  data() {
    return {
      searchKeywords: '',
      returnCode: '',
      fromDate: earlyMonth(),
      toDate: nowDate(),
      customerPhone: null,

      // decentralization
      decentralization: {
        formId: 1,
        ctrlId: 1,
      },

      configFromDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
      configToDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
        minDate: this.fromDate,
      },
    }
  },

  computed: {
  },

  watch: {
    fromDate() {
      this.configToDate = {
        ...this.configToDate,
        minDate: this.fromDate,
      }
    },
  },

  mounted() {
    this.onSearch()
    this.configToDate = {
      ...this.configToDate,
      minDate: this.fromDate,
    }
    this.$refs.focusInput.focus()
  },

  methods: {
    onSearch() {
      const searchData = {
        searchKeywords: this.searchKeywords,
        customerPhone: this.customerPhone,
        returnNumber: this.returnCode,
        fromDate: reverseVniDate(this.fromDate),
        toDate: reverseVniDate(this.toDate),
        ...this.decentralization,
      }
      this.updateSearchData(searchData)
    },
    onClickSearchButton() {
      this.onSearch()
    },
    updateSearchData(data) {
      this.$emit('onClickSearchButton', data)
    },

    validateFromDate() {
      const validate = this.$moment(this.fromDate, 'DD/MM/YYYY').isValid()
      const pattern = /^\d{2}[./-]\d{2}[./-]\d{4}$/
      if (pattern.test(this.fromDate) === false || validate === false) {
        toasts.error('Ngày tháng không tồn tại')
        this.fromDate = earlyMonth()
      }
    },
    validateToDate() {
      const validate = this.$moment(this.toDate, 'DD/MM/YYYY').isValid()
      const pattern = /^\d{2}[./-]\d{2}[./-]\d{4}$/
      if (pattern.test(this.toDate) === false || validate === false) {
        toasts.error('Ngày tháng không tồn tại')
        this.toDate = nowDate()
      }
    },
  },
}
</script>
