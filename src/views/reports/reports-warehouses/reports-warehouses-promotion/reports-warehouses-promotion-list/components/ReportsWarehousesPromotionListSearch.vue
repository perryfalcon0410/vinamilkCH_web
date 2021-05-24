<template>

  <!-- START - Search -->
  <b-form>
    <v-card-actions
      title="Tìm kiếm"
    >
      <!-- START - Bill Code -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Số hóa đơn
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="onlineCode"
            class="h8 text-brand-3"
            placeholder="Nhập số hóa đớn"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="onlineCode"
              class="cursor-pointer text-gray"
              @click="onlineCode = null"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Bill code -->
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
      <!-- START - Product Id -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <div
          class="h8 mt-sm-1 mt-xl-0"
        >
          Mã sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            v-model="ids"
            class="h8 text-brand-3"
            placeholder="Nhập mã sản phẩm"
            @keyup.enter="onClickSearchButton"
          />
          <b-input-group-append
            is-text
          >
            <b-icon-x
              v-show="ids"
              class="cursor-pointer text-gray"
              @click="ids = null"
            />
          </b-input-group-append>
          <b-input-group-append
            is-text
          >
            <!-- Icon-- Three-dot -->
            <b-icon-three-dots-vertical
              class="cursor-pointer"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- END - Product ID -->

      <!-- START - Search button -->
      <b-col
        xl
        lg="3"
        sm="4"
      >
        <!--"onmousedown" is prevent hightlight text -->
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

      <!-- START - Modal find product -->
      <find-product-modal
        :visible="selectProductModalVisible"
        @onModalClose="onModalCloseClick"
        @onSaveClick="onSaveClick"
      />
      <!-- START - Modal find product -->
    </v-card-actions>
  </b-form>
  <!-- END - Search -->
</template>

<script>
import VCardActions from '@core/components/v-card-actions/VCardActions.vue'
import FindProductModal from './FindProductsModal.vue'

export default {
  components: {
    VCardActions,
    FindProductModal,
  },
  data() {
    return {
      isSearchFocus: false,
      onlineCode: '',
      ids: null,
      fromDate: this.$earlyMonth,
      toDate: this.$nowDate,

      configDate: {
        wrap: true,
        allowInput: true,
        dateFormat: 'd/m/Y',
      },
    }
  },

  computed: {
  },

  methods: {
    onClickSearchButton() {
      this.$emit('onClickSearchButton', {
        onlineNumber: this.onlineCode,
        fromDate: this.fromDate,
        toDate: this.toDate,
        productCodes: this.ids,
      })
    },
  },
}
</script>
