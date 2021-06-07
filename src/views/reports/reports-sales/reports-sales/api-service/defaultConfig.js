const REPORTS = '/reports'
const SELLS = '/sells'
const SALES = '/sales'
const PRODUCTS = '/products'

export const getReportSalesEndpoint = `${REPORTS}${SELLS}`
export const exportExcelEndpoint = `${REPORTS}${SELLS}/export`
export const getProductCatsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductsEndpoint = `${SALES}${PRODUCTS}/choose-product`
