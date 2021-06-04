const REPORTS = '/reports'
const SALES = '/sales'
const PRODUCTS = '/products'
export const getReportExchangeDamagedGoodListEndpoint = `${REPORTS}/exchange-trans`
export const getReasonExchangeEndpoint = `${REPORTS}/exchange-trans/reason-exchange`
export const exportReportExchangeDamagedGoodsEndpoint = `${REPORTS}/exchange-trans/excel`
export const getProductCatListsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductListsEndpoint = `${SALES}${PRODUCTS}/choose-product`
