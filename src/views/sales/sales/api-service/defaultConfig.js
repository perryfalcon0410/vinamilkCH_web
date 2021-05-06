const PROMOTION = '/promotions'
const VOUCHERS = '/vouchers'
const SALES = '/sales'
const ONLINE_ORDERS = '/online-orders'

export const getVouchersEndpoint = `${PROMOTION}/${VOUCHERS}`
export const getOnlineOrdersEndpoint = `${SALES}/${ONLINE_ORDERS}`
export const getProductsEndpoint = `${SALES}/products`
export const getProductInfosEndpoint = `${SALES}/products/product-infos`
export const getProductsTopSaleEndpoint = `${SALES}/products/top-sale`
