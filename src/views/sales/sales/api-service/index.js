import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getVouchersEndpoint,
  getVoucherByIdEndpoint,
  getOnlineOrdersEndpoint,
  getOnlineOrderByIdEndpoint,
  getProductsEndpoint,
  getProductInfosEndpoint,
  getProductsTopSaleEndpoint,
  getProductsHotEndpoint,
  createSaleOrderEndpoint,
  getDiscountByCodeEndpoint,
  updatePriceTypeCustomerEndpoint,
  getProductsTopSaleMonthEndpoint,
  getPromotionFreeItemsEndpoint,
  getPromotionProgramsEndpoint,
  getPromotionCalculationEndpoint,
  getItemsProductsProgramEndpoint,
  getVoucherBySerialEndpoint,
  getCustomerToSaleEndpoint,
  printSalesEndpoint,
  printSalesTempEndpoint,
  getSalesPaymentTypesEndpoint,
} from './defaultConfig'

export default {
  getVouchers(args) {
    return axios.get(getVouchersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getVoucherById(args) {
    return axios.get(`${getVoucherByIdEndpoint}/${args}`, {
      params: {
        customerId: args.customerId,
        products: args.productIds,
        formId: args.formId,
        ctrlId: args.ctrlId,
      },
    })
  },

  getOnlineOrder(args) {
    return axios.get(getOnlineOrdersEndpoint, {
      params: formatURLParams(args),
    })
  },

  getOnlineOrderById(args) {
    return axios.get((`${getOnlineOrderByIdEndpoint}/${args}`))
  },

  getProducts(args) {
    return axios.get(getProductsEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductsTopSale(args) {
    return axios.get(getProductsTopSaleEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductInfos(args) {
    return axios.get(getProductInfosEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProductsHot(args) {
    return axios.get(`${getProductsHotEndpoint}/${args.customerId}`)
  },

  createSaleOrder(args) {
    return axios.post(createSaleOrderEndpoint, args)
  },

  getDiscountByCode(args) {
    return axios.post(`${getDiscountByCodeEndpoint}/${args.code}`, args.data, {
      params: {
        formId: args.formId,
        ctrlId: args.ctrlId,
      },
    })
  },

  updatePriceTypeCustomer(args) {
    return axios.post(`${updatePriceTypeCustomerEndpoint}/${args.customerTypeId}`, args.listProducts)
  },
  getProductsTopSaleInMonth(args) {
    return axios.get(getProductsTopSaleMonthEndpoint, {
      params: formatURLParams(args),
    })
  },
  getPromotionFreeItems(args) {
    return axios.post(getPromotionFreeItemsEndpoint, args)
  },
  getPromotionPrograms(args) {
    return axios.post(getPromotionProgramsEndpoint, args)
  },
  getPromotionCalculation(args) {
    return axios.post(getPromotionCalculationEndpoint, args)
  },
  getItemsProductsProgram(args) {
    return axios.get(getItemsProductsProgramEndpoint, {
      params: formatURLParams(args),
    })
  },

  getVoucherBySerial(args) {
    return axios.get(`${getVoucherBySerialEndpoint}/${args.serial}`, {
      params: formatURLParams(args),
    })
  },

  getCustomersToSale(args) {
    return axios.get(getCustomerToSaleEndpoint, {
      params: formatURLParams(args),
    })
  },
  printSales(args) {
    return axios.get(`${printSalesEndpoint}/${args.salesReceiptId}`, {
      params: formatURLParams(args),
    })
  },
  printSalesTemp(args) {
    return axios.post(printSalesTempEndpoint, args)
  },
  getSalesPaymentTypes(args) {
    return axios.get(getSalesPaymentTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
}
