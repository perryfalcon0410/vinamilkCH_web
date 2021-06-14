const REPORTS = '/reports'
const SALES = '/sales'
const PRODUCTS = '/products'
const INVENTORIES = '/inventories'

export const getWarehousesInputOutputInventoryEndpoint = `${REPORTS}${INVENTORIES}/import-export`
export const exportExcelEndpoint = `${REPORTS}${INVENTORIES}/import-export/excel`
export const getProductCatListsEndpoint = `${SALES}${PRODUCTS}/all-product-cat`
export const getProductListsEndpoint = `${SALES}${PRODUCTS}/choose-product`
export const printOutInputInventoryEndpoint = `${REPORTS}${INVENTORIES}/import-export/print`
