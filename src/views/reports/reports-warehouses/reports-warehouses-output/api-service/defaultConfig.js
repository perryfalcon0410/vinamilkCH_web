const OUTPUT_GOODS = 'reports/export-goods'
const products = '/products'
const sales = '/sales'

export const getOutputGoodsEndpoint = `${OUTPUT_GOODS}`
export const exportOutputGoodsEndpoint = `${OUTPUT_GOODS}/excel`
export const printOutputGoodsEndpoint = `${OUTPUT_GOODS}/print`

// Sales
export const getProductCatListsEndpoint = `${sales}${products}/all-product-cat`
export const getProductListsEndpoint = `${sales}${products}/choose-product`
