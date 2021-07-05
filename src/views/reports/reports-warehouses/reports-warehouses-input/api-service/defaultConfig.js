const REPORTS = '/reports'
const SALES = '/sales'
const PRODUCTS = '/products'

export const getWarehousesInputEndpoint = `${REPORTS}/shop-import`
export const exportExcelEndpoint = `${REPORTS}/shop-import/excel`
export const getProductCatListsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductListsEndpoint = `${SALES}${PRODUCTS}/choose-product`
export const printShopImportReportEndpoint = `${REPORTS}/shop-import/print`
