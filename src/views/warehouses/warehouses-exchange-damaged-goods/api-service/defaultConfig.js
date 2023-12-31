const EXCHANGE_DAMAGED_GOODS = 'sales/exchangetrans'
const CUSTOMER = '/customers'
const PRODUCT = '/sales/products'

export const getExchangeDamagedGoodsEndpoint = `${EXCHANGE_DAMAGED_GOODS}`
export const getExchangeDamagedGoodsReasonsEndpoint = `${EXCHANGE_DAMAGED_GOODS}/reasons`
export const createExchangeDamagedGoodsEndpoint = `${EXCHANGE_DAMAGED_GOODS}/create`
export const getExchangeDamagedGoodsByIdEndpoint = `${EXCHANGE_DAMAGED_GOODS}`
export const getCustomersEndpoint = `${CUSTOMER}/customers-to-sale`
export const getProductsEndPoint = `${PRODUCT}/find`
export const updateExchangeDamagedGoodsEndpoint = `${EXCHANGE_DAMAGED_GOODS}/update`
export const getDamagedGoodsByIdEndpoint = `${EXCHANGE_DAMAGED_GOODS}/products`
export const removeExchangeDamagedGoodsEndpoint = `${EXCHANGE_DAMAGED_GOODS}/remove`
export const updatePriceProductEndpoint = `${PRODUCT}/change/customer-type`
