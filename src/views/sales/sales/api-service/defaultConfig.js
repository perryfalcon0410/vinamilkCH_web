const PROMOTION = '/promotions'
const VOUCHERS = '/vouchers'
const SALES = '/sales'
const ONLINE_ORDERS = 'online-orders'
const PRODUCT = '/products'
const CUSTOMER = 'customers'
const APPARAM = '/apparams'
const COMMON = '/commons'

export const getVouchersEndpoint = `${PROMOTION}/${VOUCHERS}`

export const getVoucherByIdEndpoint = `${PROMOTION}/${VOUCHERS}`

export const getOnlineOrdersEndpoint = `${SALES}/${ONLINE_ORDERS}`

export const getOnlineOrderByIdEndpoint = `${SALES}/${ONLINE_ORDERS}`

export const checkOnlineOrderCoincideIdEndpoint = `${SALES}/${ONLINE_ORDERS}/order-number`

export const getProductsEndpoint = `${SALES}${PRODUCT}`

export const getProductInfosEndpoint = `${SALES}${PRODUCT}/product-infos`

export const getProductsTopSaleEndpoint = `${SALES}${PRODUCT}/top-sale`

export const getProductsHotEndpoint = `${SALES}${PRODUCT}/top-sale/customer`

export const createSaleOrderEndpoint = `${SALES}`

export const getDiscountByCodeEndpoint = `${SALES}/discount-code`

export const updatePriceTypeCustomerEndpoint = `${SALES}${PRODUCT}/change/customer-type`

export const getProductsTopSaleMonthEndpoint = `${SALES}${PRODUCT}/top-sale/month`

export const getPromotionFreeItemsEndpoint = `${SALES}/promotion-free-item`

export const getPromotionProgramsEndpoint = `${SALES}/order-promotions`

export const getPromotionCalculationEndpoint = `${SALES}/promotion-calculation`

export const getItemsProductsProgramEndpoint = `${SALES}/promotion-products`

export const getVoucherBySerialEndpoint = `${PROMOTION}/${VOUCHERS}/code`

export const getCustomerToSaleEndpoint = `${CUSTOMER}/autocomplete`

export const getScorecumulatedByIdEndpoint = `${CUSTOMER}/scorecumulated`

export const printSalesEndpoint = `${SALES}/sale-orders/print-sale-order`

export const printSalesTempEndpoint = `${SALES}/printtmp`

export const getSalesPaymentTypesEndpoint = `${COMMON}${APPARAM}/type/SALEMT_PAYMENT_TYPE`

export const getLimitAgeCustomerEndpoint = `${COMMON}${APPARAM}/type/SALEMT_LIMIT_AGE_CUS`

export const getProductByBarcodeEndpoint = `${SALES}${PRODUCT}/barcode`

export const getSalemtPromotionObjectTypeEndpoint = `${COMMON}${APPARAM}/type/SALEMT_PROMOTION_OBJECT`

export const getSalemtDeliveryTypeEndpoint = `${COMMON}${APPARAM}/type/SALEMT_DELIVERY_TYPE`

export const getEditOnlinePermissionEndPoint = `${SALES}/valid/online-order`

export const getDefaultCustomerTypeEndPoint = `${CUSTOMER}/customer-types/default`
