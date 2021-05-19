<template>

  <!-- START - Search -->
  <v-card-actions
    title="Tìm kiếm"
  >
    <!-- START - License -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Số chứng từ
      </div>
      <b-form-input
        v-model="licenseNumber"
        class="h8"
        placeholder="Nhập số chứng từ"
        @keyup.enter="onClickSearchButton"
      />
    </b-col>
    <!-- END - License -->

    <!-- START - Date From -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Từ ngày
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
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
          :config="configDate"
          class="form-control h8 text-brand-3"
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
        class="h8 mt-sm-1 mt-xl-0"
      >
        Đến ngày
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
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
          :config="configDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Date To -->

    <!-- START - Product -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Sản phẩm
      </div>
      <b-input-group class="input-group-merge ">
        <b-form-input
          v-model.trim="productCode"
          class="h8"
          placeholder="Nhập mã sản phẩm"
        />
        <b-input-group-append
          is-text
          class="cursor-pointer"
          @click="onSelectProductModalClick"
        >
          <b-icon-three-dots-vertical />
        </b-input-group-append>
      </b-input-group>
    </b-col>
    <!-- END - Product -->

    <!-- START - Bill Date From -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Từ ngày hóa đơn
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
      >
        <b-icon-x
          v-show="fromOrderDate"
          style="position: absolute; right: 15px"
          class="cursor-pointer text-gray"
          scale="1.3"
          data-clear
        />
        <vue-flat-pickr
          v-model="fromOrderDate"
          :config="configDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Bill Date From -->

    <!-- START - Bill Date To -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 mt-sm-1 mt-xl-0"
      >
        Đến ngày hóa đơn
      </div>
      <b-row
        class="v-flat-pickr-group mx-0"
        align-v="center"
      >
        <b-icon-x
          v-show="toOrderDate"
          style="position: absolute; right: 15px"
          class="cursor-pointer text-gray"
          scale="1.3"
          data-clear
        />
        <vue-flat-pickr
          v-model="toOrderDate"
          :config="configDate"
          class="form-control h8 text-brand-3"
          placeholder="Chọn ngày"
        />
      </b-row>
    </b-col>
    <!-- END - Bill Date To -->

    <!-- START - Search button -->
    <b-col
      xl
      lg="3"
      sm="4"
    >
      <div
        class="h8 text-white"
        onmousedown="return false;"
        style="cursor: context-menu;"
      >
        Tìm kiếm
      </div>
      <b-button
        class="btn-brand-1 h9 align-items-button-center mt-sm-1 mt-xl-0"
        variant="someThing"
        @click="onClickSearchButton()"
      >
        <b-icon-search class="mr-05" />
        Tìm kiếm
      </b-button>
    </b-col>
    <!-- END - Search button -->

    <!-- START - Modal -->
    <product-select-modal
      :visible="SelectProductModalVisible"
      @onModalClose="onModalCloseClick"
      @onSaveClick="onSaveClick"
    />
    <!-- END - Modal -->
  </v-card-actions>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import ProductSelectModal from '../../components/ProductSelectModal.vue'

export default {
  components: {
    VCardActions,
    ProductSelectModal,
  },

  data() {
    return {
      SelectProductModalVisible: false,

      fromDate: null,
      toDate: null,
      fromOrderDate: null,
      toOrderDate: null,
      product: null,
      licenseNumber: null,
      productCode: null,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },

  computed: {
  },

  mounted() {
    this.fromDate = this.$earlyMonth
    this.toDate = this.$nowDate
    this.fromOrderDate = this.$earlyMonth
    this.toOrderDate = this.$nowDate
  },

  methods: {
    onSelectProductModalClick() {
      this.SelectProductModalVisible = true
    },
    onModalCloseClick() {
      this.SelectProductModalVisible = false
    },
    onClickSearchButton() {
      this.$emit('onClickSearchButton', {
        fromDate: this.fromDate,
        toDate: this.toDate,
        fromOrderDate: this.fromOrderDate,
        toOrderDate: this.toOrderDate,
        licenseNumber: this.licenseNumber,
      })
    },
    onSaveClick(param) {
      this.SelectProductModalVisible = false
      if (param.length > 0) {
        const ids = param.length === 1 ? param[0].productCode : param.reduce((prev, curr) => `${prev.productCode ? prev.productCode : prev},${curr.productCode}`)
        this.$emit('onClickSearchButton', {
          fromDate: this.fromDate,
          toDate: this.toDate,
          fromOrderDate: this.fromOrderDate,
          toOrderDate: this.toOrderDate,
          licenseNumber: this.licenseNumber,
          productCode: ids,
        })
      }
    },
    updateSearchData(data) {
      this.$emit('onClickSearchButton', data)
    },
  },
}
</script>
