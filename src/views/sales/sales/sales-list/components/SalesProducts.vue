<template>
  <b-container

    class="bg-white shadow rounded mt-1 flex-grow-1"
  >
    <b-row class="mx-0 mt-1 pb-1">
      <b-col class="px-0">
        <b-row class="mx-0">
          <div
            class="bg-info text-white mt-1 mr-1 px-1 rounded-pill cursor-pointer"
            @click="onClickAllProduct"
          >
            Tất cả
          </div>
          <div
            class="bg-info text-white mt-1 mr-1 px-1 rounded-pill cursor-pointer"
            @click="onClickTopSaleProduct"
          >
            Bán chạy
          </div>
          <div
            class="bg-info text-white mt-1 mr-1 px-1 rounded-pill cursor-pointer"
            @click="onClickHotProduct"
          >
            Hay mua
          </div>

          <div
            v-for="(value,index) in productInfos"
            :key="index"
            class="bg-info text-white mt-1 mr-1 px-1 rounded-pill cursor-pointer"
            @click="onClickProductWithCatId(value.catId)"
          >
            {{ value.productInfoName }}
          </div>
        </b-row>
      </b-col>
      <b-icon-chevron-down
        v-b-toggle.collapse-1
        class="m-1 cursor-pointer"
        font-scale="2"
      />
    </b-row>

    <!-- START - List Product -->
    <b-collapse
      id="collapse-1"
      visible
    >
      <b-row class="mx-0">
        <b-col
          v-for="(value, index) in recommendProducts"
          :key="index"
          class="my-1"
          xl="3"
          md="4"
          sm="6"
        >
          <b-row>
            <b-col
              cols="4"
              class="px-0"
            >
              <b-img-lazy
                src="https://pngimg.com/uploads/nuclear_bomb/nuclear_bomb_PNG18.png"
                fluid
                width="90px"
              />
            </b-col>

            <b-col>
              <div
                class="text-dark"
              >
                {{ value.productName }}
              </div>
              <div
                class="my-1"
              >
                {{ value.productCode }}
              </div>
              <div class="text-dark font-weight-bold">
                {{ value.productPrice }}
              </div>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
    </b-collapse>
    <!-- END - List Product -->

  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import saleData from '@/@db/sale'
import {
  SALES,
  // Getter
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  GET_HOT_PRODUCTS_GETTER,
  GET_ALL_PRODUCT_GETTER,
  // Action
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  GET_HOT_PRODUCTS_ACTION,
  GET_ALL_PRODUCT_ACTION,
} from '../../store-module/type'

export default {
  props: {
    productInfos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      recommendProducts: [],
      allProducts: [],
      topSaleProducts: [],
      hotProducts: [],
    }
  },
  computed: {
    getAllProduct() {
      return this.GET_ALL_PRODUCT_GETTER().map(data => ({
        productName: data.productName,
        productCode: data.productCode,
        productPrice: data.price,
      }))
    },
    getTopSaleProducts() {
      return this.GET_TOP_SALE_PRODUCTS_GETTER().map(data => ({
        productName: data.productName,
        productCode: data.productCode,
        productPrice: data.price,
      }))
    },
    getHotProducts() {
      return this.GET_HOT_PRODUCTS_GETTER().map(data => ({
        productName: data.productName,
        productCode: data.productCode,
        productPrice: data.price,
      }))
    },
  },
  watch: {
    getAllProduct() {
      this.allProducts = [...this.getAllProduct]
      this.recommendProducts = this.allProducts
    },
    getTopSaleProducts() {
      this.topSaleProducts = [...this.getTopSaleProducts]
    },
    getHotProducts() {
      this.hotProducts = [...this.getHotProducts]
    },
  },
  mounted() {
    const paramGetAllProduct = {
      keyWord: '',
      catId: null,
      customerTypeId: 1, // Hard code
      status: 1,
      size: saleData.pageSizeRecommendProducts,
      page: saleData.pageNumberRecommendProducts,
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_ALL_PRODUCT_ACTION(paramGetAllProduct)
    const paramGetTopSaleProduct = {
      keyWord: 'BOT',
      customerTypeId: 1, // Hard code
      size: saleData.pageSizeRecommendProducts,
      page: saleData.pageNumberRecommendProducts,
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_TOP_SALE_PRODUCTS_ACTION(paramGetTopSaleProduct)
    const paramGetHotProduct = {
      customerId: 232, // Hard code customerId
      size: saleData.pageSizeRecommendProducts,
      page: saleData.pageNumberRecommendProducts,
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
    }
    this.GET_HOT_PRODUCTS_ACTION(paramGetHotProduct)
  },
  methods: {
    ...mapGetters(SALES, [
      GET_PRODUCTS_GETTER,
      GET_PRODUCT_INFOS_GETTER,
      GET_TOP_SALE_PRODUCTS_GETTER,
      GET_HOT_PRODUCTS_GETTER,
      GET_ALL_PRODUCT_GETTER,
    ]),
    ...mapActions(SALES, [
      GET_PRODUCTS_ACTION,
      GET_PRODUCT_INFOS_ACTION,
      GET_TOP_SALE_PRODUCTS_ACTION,
      GET_HOT_PRODUCTS_ACTION,
      GET_ALL_PRODUCT_ACTION,
    ]),
    onClickAllProduct() {
      this.recommendProducts = this.allProducts
    },
    onClickTopSaleProduct() {
      this.recommendProducts = this.topSaleProducts
    },
    onClickHotProduct() {
      this.recommendProducts = this.hotProducts
    },
    onClickProductWithCatId(catId) {
      const paramGetProductsWithCatId = {
        keyWord: '',
        catId: Number(catId),
        customerTypeId: 1, // Hard code
        status: 1,
        size: 8,
        page: 0,
      // formId: 5, // Hard code
      // ctrlId: 7, // Hard code
      }
      this.GET_PRODUCTS_ACTION(paramGetProductsWithCatId)
      this.recommendProducts = this.GET_PRODUCTS_GETTER().map(data => ({
        productName: data.productName,
        productCode: data.productCode,
        productPrice: data.price,
      }))
    },
  },
}
</script>
