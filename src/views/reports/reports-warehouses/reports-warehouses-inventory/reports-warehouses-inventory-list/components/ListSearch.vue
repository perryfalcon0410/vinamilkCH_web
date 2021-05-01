<template>
  <b-form>
    <v-card-actions
      title="Điều kiện"
    >
      <b-col
        xl
        md="3"
        sm="4"
      >
        <validation-provider
          rules="dateFormatVNI"
        >
          <div
            class="h8 mt-lg-1 mt-xl-0"
          >
            Ngày
          </div>
          <b-input-group
            id="form-input-date"
            class="input-group-merge"
            size="sm"
          >
            <b-input-group-prepend
              is-text
              data-toggle
            >
              <b-icon-calendar />
            </b-input-group-prepend>
            <vue-flat-pickr
              v-model="date"
              :config="configDate"
              class="form-control h9"
              placeholder="Chọn ngày"
            />
          </b-input-group>
        </validation-provider>
      </b-col>

      <b-col
        xl
        md="3"
        sm="4"
      >
        <div class="h8 mt-lg-1 mt-xl-0">
          Sản phẩm
        </div>
        <b-input-group
          class="input-group-merge"
          size="sm"
        >
          <b-input />
          <b-input-group-append is-text>
            <b-icon-three-dots-vertical
              @click="showFindProductModal"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
        class="h-25"
      >
        <div
          class="h8 text-white"
        >
          Tìm kiếm
        </div>
        <b-button
          id="form-button-search"
          class="shadow-brand-1 rounded bg-brand-1 text-white h9 font-weight-bolder"
          variant="someThing"
          size="sm"
          style="height: 30px;"
          @click="onClickSearchButton()"
        >
          <b-icon-search class="mr-1" />
          Tìm kiếm
        </b-button>
      </b-col>
      <!-- END - Search button -->
    </v-card-actions>
    <find-product-modal :visible="isShowFindProductModal" />
  </b-form>
</template>

<script>
import VCardActions from '@/@core/components/v-card-actions/VCardActions.vue'
import {
  dateFormatVNI,
} from '@/@core/utils/validations/validations'
import FindProductModal from './FindProductModal.vue'

export default {
  components: {
    FindProductModal,
    VCardActions,
  },
  data() {
    return {
      isShowFindProductModal: false,
      dateFormatVNI,
      date: null,
    }
  },
  methods: {
    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
    },
  },
}
</script>
