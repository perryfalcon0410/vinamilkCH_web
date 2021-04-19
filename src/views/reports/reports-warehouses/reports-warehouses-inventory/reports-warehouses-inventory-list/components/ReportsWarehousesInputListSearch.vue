<template>
  <b-form class="bg-white rounded shadow">
    <div
      class="text-primary p-1 "
    >
      <strong>
        Điều kiện
      </strong>
    </div>
    <b-form-row class="v-search-form border-top mx-0 p-1">
      <!--START-date-form-->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          class="ml-lg-1"
          label="Ngày"
          label-for="form-input-date"
        >
          <b-form-datepicker
            id="form-input-date"
            v-model="fromDate"
            :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
            locale="vi"
          />
        </b-form-group>
      </b-col>
      <!--END-date-form-->

      <!--START-Product-form-->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Sản phẩm"
          label-for="form-input-product"
        >
          <b-input-group class="input-group-merge ">
            <b-form-input
              id="form-input-product"
              v-model="product"
            />
            <b-input-group-append is-text>
              <b-icon-three-dots-vertical
                @click="showFindProductModal"
              />
            </b-input-group-append>
          </b-input-group>

        </b-form-group>
      </b-col>
      <!--START-Product-form-->
      <!-- START - Search button -->
      <b-col
        xl
        sm="4"
        md="3"
      >
        <b-form-group
          label="Tìm kiếm"
          label-for="form-button-search"
        >
          <b-button
            id="form-button-search"
            variant="primary"
            @click="onClickSearchButton()"
          >
            <b-icon-search />
            Tìm kiếm
          </b-button>
        </b-form-group>
      </b-col>
      <!-- END - Search button -->
    </b-form-row>
    <find-product-modal :visible="isShowFindProductModal" />
  </b-form>
</template>

<script>
import FindProductModal from './FindProductModal.vue'

export default {
  components: {
    FindProductModal,
  },
  data() {
    return {
      isShowFindProductModal: false,
    }
  },
  methods: {
    showFindProductModal() {
      this.isShowFindProductModal = !this.isShowFindProductModal
      console.log('click')
    },
  },
}
</script>
