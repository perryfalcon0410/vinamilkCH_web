const REPORTS = '/reports'
const SELLS = '/sells'
const SALES = '/sales'
const PRODUCTS = '/products'
const COMMONS = '/commons'

export const getReportSalesEndpoint = `${REPORTS}${SELLS}`
export const exportExcelEndpoint = `${REPORTS}${SELLS}/export`
export const getProductCatsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductsEndpoint = `${SALES}${PRODUCTS}/choose-product`
export const getBillCollectorsEndpoint = `${REPORTS}${SELLS}/get-data-user`
export const printReportSalesEndpoint = `${REPORTS}${SELLS}/print`
export const getSalesChannelEndpoint = `${COMMONS}/apparams/type/SALEMT_PROMOTION_OBJECT`
