const SALE = '/sales/import'
const REPORT = '/sales/report'
const PRODUCT = '/sales/products'
const COMMON = '/commons'

export const getPoConfirmEndpoint = `${SALE}/po-confirm`
export const getPoProductsEndpoint = `${SALE}/po-detail0`
export const getPoPromotionProductsEndpoint = `${SALE}/po-detail1`
export const getImportExcelEndpoint = `${SALE}/excel`
export const getImportAdjustmentsEndpoint = `${SALE}/adjustment`
export const getImportAdjustmentsDetailEndpoint = `${SALE}/adjustment-detail`
export const getImportBorrowingsEndpoint = `${SALE}/borrowing`
export const getImportBorrwingsDetailEndpoint = `${SALE}/borrowing-detail`
export const updateNotImportEndpoint = `${SALE}/not-import`
export const createSaleImportEndpoint = `${SALE}`
export const getReceiptsEndpoint = `${SALE}`
export const exportReceiptsEndpoint = `${SALE}/excel/`
export const removeReceiptEndpoint = `${SALE}/remove`
export const printWarehousesInputEndpoint = `${REPORT}/stock/invoice`
export const getReceiptByIdEndpoint = `${SALE}/trans`
export const getProductsByIdEndpoint = `${SALE}/trans-detail`
export const getProductsEndPoint = `${PRODUCT}/find`
export const updateReceiptEndpoint = `${SALE}/update`
export const getWarehousesTypeEndpoint = `${SALE}/warehouse-type`
export const getNotImportReasonsEndpoint = `${COMMON}/apparams/sale-mt-deny`
