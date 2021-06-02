const REPORTS = '/reports'
const SALES = '/sales'
const PRODUCTS = '/products'
export const getReportsWarehousesInventoryEndpoint = `${REPORTS}/stock-total`
export const exportReportInventoriesEndpoint = `${REPORTS}/stock-total/excel`
export const getProductCatListsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductListsEndpoint = `${SALES}${PRODUCTS}/choose-product`
