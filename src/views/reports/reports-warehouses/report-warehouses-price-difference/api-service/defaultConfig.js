const REPORTS = '/reports'
const SALES_PRODUCTS = '/sales/products'

export const getDifferencePriceEndPoint = `${REPORTS}/changePrices`
export const getProductCatListsEndpoint = `${SALES_PRODUCTS}/all-product-cat`
export const getProductListsEndpoint = `${SALES_PRODUCTS}/choose-product`
export const exportDifferencePriceEndPoint = `${REPORTS}/changePrices/excel`
export const printReportDifferencePriceEndPoint = `${REPORTS}/changePrices/pdf`
