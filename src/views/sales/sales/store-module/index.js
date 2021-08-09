import SalesServices from '@/views/sales/sales/api-service'
import toasts from '@core/utils/toasts/toasts'
import commonData from '@/@db/common'
import {
  // GETTERS
  VOUCHERS_GETTER,
  VOUCHER_BY_ID_GETTER,
  ONLINE_ORDERS_GETTER,
  ONLINE_ORDERS_PAGINATION_GETTER,
  ONLINE_ORDER_BY_ID_GETTER,
  ONLINE_ORDER_COINCIDE_ID_GETTER,
  GET_PRODUCTS_GETTER,
  GET_PRODUCT_INFOS_GETTER,
  GET_TOP_SALE_PRODUCTS_GETTER,
  GET_HOT_PRODUCTS_GETTER,
  GET_ALL_PRODUCT_GETTER,
  GET_DISCOUNT_BY_CODE_GETTER,
  UPDATE_PRICE_TYPE_CUSTOMER_GETTER,
  GET_TOP_SALE_PRODUCTS_IN_MONTH_GETTER,
  GET_PROMOTION_FREE_ITEMS_GETTER,
  GET_PROMOTION_PROGRAMS_GETTER,
  GET_PROMOTION_CALCULATION_GETTER,
  GET_ITEMS_PRODUCTS_PROGRAM_GETTER,
  GET_VOUCHER_BY_SERIAL_GETTER,
  CUSTOMERS_SALE_GETTER,
  PRINT_SALES_GETTER,
  CREATE_SALE_ORDER_GETTER,
  PRINT_SALES_TEMP_GETTER,
  GET_SALE_PAYMENT_TYPES_GETTER,
  GET_LIMIT_AGE_CUSTOMERS_GETTER,
  GET_PRODUCT_BY_BARCODE_GETTER,
  SALEMT_PROMOTION_OBJECT_GETTER,
  SALEMT_DELIVERY_TYPE_GETTER,
  GET_EDIT_ONLINE_PERMISSION_GETTER,

  // ACTIONS
  GET_VOUCHERS_ACTION,
  GET_VOUCHER_BY_ID_ACTION,
  GET_ONLINE_ORDERS_ACTION,
  GET_ONLINE_ORDER_BY_ID_ACTION,
  GET_ONLINE_ORDER_COINCIDE_ID_ACTION,
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_INFOS_ACTION,
  GET_TOP_SALE_PRODUCTS_ACTION,
  GET_HOT_PRODUCTS_ACTION,
  GET_ALL_PRODUCT_ACTION,
  CREATE_SALE_ORDER_ACTION,
  GET_DISCOUNT_BY_CODE_ACTION,
  UPDATE_PRICE_TYPE_CUSTOMER_ACTION,
  GET_TOP_SALE_PRODUCTS_IN_MONTH_ACTION,
  GET_PROMOTION_FREE_ITEMS_ACTION,
  GET_PROMOTION_PROGRAMS_ACTION,
  GET_PROMOTION_CALCULATION_ACTION,
  GET_ITEMS_PRODUCTS_PROGRAM_ACTION,
  GET_VOUCHER_BY_SERIAL_ACTION,
  GET_CUSTOMERS_SALE_ACTION,
  PRINT_SALES_ACTION,
  PRINT_SALES_TEMP_ACTION,
  GET_SALE_PAYMENT_TYPES_ACTION,
  GET_LIMIT_AGE_CUSTOMERS_ACTION,
  GET_PRODUCT_BY_BARCODE_ACTION,
  GET_SALEMT_PROMOTION_OBJECT_ACTION,
  GET_SALEMT_DELIVERY_TYPE_ACTION,
  GET_EDIT_ONLINE_PERMISSION_ACTION,
} from './type'

export default {
  namespaced: true,

  state: {
    vouchers: [],
    voucherInfo: {},
    onlineOrders: [],
    onlineOrderProducts: [],
    onlineOrder: {},
    messageCoincide: {},
    onlineOrderPagination: {},
    products: [],
    productInfos: [],
    topSaleProducts: [],
    hotProducts: [],
    allProduct: [],
    discount: {},
    customerTypeProducts: [],
    productsInMonth: [],
    promotionFreeItems: [],
    promotionPrograms: {},
    promotionCalculation: {},
    itemsProductsProgram: [],
    voucherBySerial: {},
    customer: {},
    printSaleData: {},
    createSaleData: {},
    printSaleTempData: {},
    salePaymentTypes: [],
    limitAge: [],
    productByBarcode: {},
    salemtPromotions: [],
    salemtDeliveries: [],
    editOnlinePermission: {},
  },

  getters: {
    [VOUCHERS_GETTER](state) {
      return state.vouchers
    },
    [VOUCHER_BY_ID_GETTER](state) {
      return state.voucherInfo || {}
    },
    [ONLINE_ORDERS_GETTER](state) {
      return state.onlineOrders
    },
    [ONLINE_ORDERS_PAGINATION_GETTER](state) {
      return state.onlineOrderPagination
    },
    [ONLINE_ORDER_BY_ID_GETTER](state) {
      return state.onlineOrder
    },
    [ONLINE_ORDER_COINCIDE_ID_GETTER](state) {
      return state.messageCoincide
    },
    [GET_PRODUCTS_GETTER](state) {
      return state.products
    },
    [GET_PRODUCT_INFOS_GETTER](state) {
      return state.productInfos
    },
    [GET_TOP_SALE_PRODUCTS_GETTER](state) {
      return state.topSaleProducts
    },
    [GET_HOT_PRODUCTS_GETTER](state) {
      return state.hotProducts
    },
    [GET_ALL_PRODUCT_GETTER](state) {
      return state.allProduct
    },
    [GET_DISCOUNT_BY_CODE_GETTER](state) {
      return state.discount
    },
    [UPDATE_PRICE_TYPE_CUSTOMER_GETTER](state) {
      return state.customerTypeProducts
    },
    [GET_TOP_SALE_PRODUCTS_IN_MONTH_GETTER](state) {
      return state.productsInMonth
    },
    [GET_PROMOTION_FREE_ITEMS_GETTER](state) {
      return state.promotionFreeItems
    },
    [GET_PROMOTION_PROGRAMS_GETTER](state) {
      return state.promotionPrograms || {}
    },
    [GET_PROMOTION_CALCULATION_GETTER](state) {
      return state.promotionCalculation || {}
    },
    [GET_ITEMS_PRODUCTS_PROGRAM_GETTER](state) {
      return state.itemsProductsProgram || []
    },
    [GET_VOUCHER_BY_SERIAL_GETTER](state) {
      return state.voucherBySerial || {}
    },
    [CUSTOMERS_SALE_GETTER](state) {
      return state.customer
    },
    [PRINT_SALES_GETTER](state) {
      return state.printSaleData || {}
    },
    [PRINT_SALES_TEMP_GETTER](state) {
      return state.printSaleTempData || {}
    },
    [CREATE_SALE_ORDER_GETTER](state) {
      return state.createSaleData || {}
    },
    [GET_SALE_PAYMENT_TYPES_GETTER](state) {
      return state.salePaymentTypes || []
    },
    [GET_LIMIT_AGE_CUSTOMERS_GETTER](state) {
      return state.limitAge
    },
    [GET_PRODUCT_BY_BARCODE_GETTER](state) {
      return state.productByBarcode || {}
    },
    [SALEMT_PROMOTION_OBJECT_GETTER](state) {
      return state.salemtPromotions
    },
    [SALEMT_DELIVERY_TYPE_GETTER](state) {
      return state.salemtDeliveries
    },
    [GET_EDIT_ONLINE_PERMISSION_GETTER](state) {
      return state.editOnlinePermission || {}
    },
  },

  mutations: {},

  actions: {
    [GET_VOUCHERS_ACTION]({ state }, val) {
      SalesServices
        .getVouchers(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.vouchers = res.data.content
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

    [GET_VOUCHER_BY_ID_ACTION]({ state }, val) {
      SalesServices
        .getVoucherById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.voucherInfo = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

    [GET_DISCOUNT_BY_CODE_ACTION]({ state }, val) {
      SalesServices
        .getDiscountByCode(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.discount = res.data
            val.onSuccess()
          } else {
            val.onFailure()
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },

    [GET_ONLINE_ORDERS_ACTION]({ state }, val) {
      SalesServices
        .getOnlineOrder(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.onlineOrders = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_ONLINE_ORDER_BY_ID_ACTION]({ state }, val) {
      SalesServices
        .getOnlineOrderById(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            if (res.data !== null) {
              state.onlineOrder = res.data
            }
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_ONLINE_ORDER_COINCIDE_ID_ACTION]({ state }, val) {
      SalesServices
        .checkOnlineOrderCoincideId(val)
        .then(response => response.data)
        .then(res => {
          state.messageCoincide = res
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.products = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PRODUCT_INFOS_ACTION]({ state }, val) {
      SalesServices
        .getProductInfos(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productInfos = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_TOP_SALE_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProductsTopSale(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            if (res.data != null) {
              state.topSaleProducts = res.data.content
            } else {
              state.topSaleProducts = []
            }
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_HOT_PRODUCTS_ACTION]({ state }, val) {
      SalesServices
        .getProductsHot(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.hotProducts = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_ALL_PRODUCT_ACTION]({ state }, val) {
      SalesServices
        .getProducts(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.allProduct = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [CREATE_SALE_ORDER_ACTION]({ state }, val) {
      SalesServices
        .createSaleOrder(val.orderSale)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.createSaleData = res.data
            val.onSuccess()
          } else {
            val.onFailure()
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [UPDATE_PRICE_TYPE_CUSTOMER_ACTION]({ state }, val) {
      SalesServices
        .updatePriceTypeCustomer(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            // toasts.success(res.statusValue)
            state.customerTypeProducts = res.data.products
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_TOP_SALE_PRODUCTS_IN_MONTH_ACTION]({ state }, val) {
      SalesServices
        .getProductsTopSaleInMonth(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productsInMonth = res.data.content || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PROMOTION_FREE_ITEMS_ACTION]({ state }, val) {
      SalesServices
        .getPromotionFreeItems(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.promotionFreeItems = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PROMOTION_PROGRAMS_ACTION]({ state }, val) {
      SalesServices
        .getPromotionPrograms(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.promotionPrograms = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PROMOTION_CALCULATION_ACTION]({ state }, val) {
      SalesServices
        .getPromotionCalculation(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.promotionCalculation = res.data || []
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_ITEMS_PRODUCTS_PROGRAM_ACTION]({ state }, val) {
      SalesServices
        .getItemsProductsProgram(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.itemsProductsProgram = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_VOUCHER_BY_SERIAL_ACTION]({ state }, val) {
      SalesServices
        .getVoucherBySerial(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.voucherBySerial = res.data
            val.onSuccess()
          } else {
            // 11008 do bên BE quy định, dùng để check cho trường hợp voucher bị khoá
            if (res.statusCode === 11008) {
              val.onFailure()
            }
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_CUSTOMERS_SALE_ACTION]({ state }, val) {
      SalesServices
        .getCustomersToSale(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            if (res.data !== null) {
              state.customer = res.data
            }
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [PRINT_SALES_ACTION]({ state }, val) {
      SalesServices
        .printSales(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printSaleData = res.data
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [PRINT_SALES_TEMP_ACTION]({}, val) {
      SalesServices
        .printSalesTemp(val.orderSale)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_SALE_PAYMENT_TYPES_ACTION]({ state }, val) {
      SalesServices
        .getSalesPaymentTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salePaymentTypes = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [PRINT_SALES_TEMP_ACTION]({ state }, val) {
      SalesServices
        .printSalesTemp(val.orderSale)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.printSaleTempData = res.data
            val.onSuccess()
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_LIMIT_AGE_CUSTOMERS_ACTION]({ state }, val) {
      SalesServices
        .getLimitAgeCustomer(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.limitAge = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_PRODUCT_BY_BARCODE_ACTION]({ state }, val) {
      SalesServices
        .getProductByBarcode(val.data)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.productByBarcode = res.data
            val.onSuccess()
          } else {
            val.onFailure()
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_SALEMT_PROMOTION_OBJECT_ACTION]({ state }, val) {
      SalesServices
        .getSalemtPromotionObjects(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salemtPromotions = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_SALEMT_DELIVERY_TYPE_ACTION]({ state }, val) {
      SalesServices
        .getSalemtDeliveryTypes(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.salemtDeliveries = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
    [GET_EDIT_ONLINE_PERMISSION_ACTION]({ state }, val) {
      SalesServices
        .getEditOnlinePermission(val)
        .then(response => response.data)
        .then(res => {
          if (res.success) {
            state.editOnlinePermission = res.data
          } else {
            throw new Error(res.statusValue)
          }
        })
        .catch(() => {
          toasts.error(commonData.errorAPIMessage)
        })
    },
  },
}
