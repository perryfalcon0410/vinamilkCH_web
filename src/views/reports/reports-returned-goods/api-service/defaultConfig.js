const reports = '/reports'
const sales = '/sales'
const products = '/products'
// Reports
export const getReportsReturnedGoodsEndpoint = `${reports}/returnGoods`
export const exportReportsReturnedGoodsEndpoint = `${reports}/returnGoods/export`
export const printInputOrderDetailEndpoint = `${reports}/entryMenuDetails/print` // temp
export const printSellsEndpoint = `${reports}/sells/print` // temp
export const printReturnGoodsEndpoint = `${reports}/returnGoods/print`

// Sales
export const getProductCatListsEndpoint = `${sales}${products}/all-product-cat`
export const getProductListsEndpoint = `${sales}${products}/choose-product`
