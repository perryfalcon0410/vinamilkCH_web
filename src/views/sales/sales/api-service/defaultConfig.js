const PROMOTION = '/promotions'
const VOUCHERS = '/vouchers'
const SALES = '/sales'
const ONLINE_ORDERS = '/online-orders'
const PRODUCT = '/products'

export const getVouchersEndpoint = `${PROMOTION}/${VOUCHERS}`
export const getVoucherByIdEndpoint = `${PROMOTION}/${VOUCHERS}`
export const getOnlineOrdersEndpoint = `${SALES}/${ONLINE_ORDERS}`
export const getOnlineOrderByIdEndpoint = `${SALES}/${ONLINE_ORDERS}`
export const getProductsEndpoint = `${SALES}${PRODUCT}`
export const getProductInfosEndpoint = `${SALES}${PRODUCT}/product-infos`
export const getProductsTopSaleEndpoint = `${SALES}${PRODUCT}/top-sale`
export const getProductsHotEndpoint = `${SALES}${PRODUCT}/top-sale/customer`
export const createSaleOrderEndpoint = `${SALES}?ctrlId=1&formId=5`
export const getDiscountByCodeEndpoint = `${PROMOTION}/promotion-program-discount/discount-code`
