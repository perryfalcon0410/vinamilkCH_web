const reports = '/reports'
const sales = '/sales'
const products = '/products'
const commons = '/commons'
const apparams = '/apparams'
// Reports
export const getReportsReturnedGoodsEndpoint = `${reports}/returnGoods`
export const exportReportsReturnedGoodsEndpoint = `${reports}/returnGoods/export`
export const printInputOrderDetailEndpoint = `${reports}/returnGoods/print` // temp
export const printSellsEndpoint = `${reports}/sells/print` // temp
export const printReturnGoodsEndpoint = `${reports}/returnGoods/print`
export const getReasonReturnGoodsEndpoint = `${commons}${apparams}/type/SALEMT_MASTER_PAY_ITEM`

// Sales
export const getProductCatListsEndpoint = `${sales}${products}/all-product-cat`
export const getProductListsEndpoint = `${sales}${products}/choose-product`
