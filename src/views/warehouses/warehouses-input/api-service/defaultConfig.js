const SALES = '/sales'
const COMMON = '/commons'

export const getImportPoConfirmEndpoint = `${SALES}/po-confirm/xml`
export const getPoConfirmEndpoint = `${SALES}/import/po-confirm`
export const getPoProductsEndpoint = `${SALES}/import/po-detail0`
export const getPoPromotionProductsEndpoint = `${SALES}/import/po-detail1`
export const getImportExcelEndpoint = `${SALES}/import/excel`
export const getImportAdjustmentsEndpoint = `${SALES}/import/adjustment`
export const getImportAdjustmentsDetailEndpoint = `${SALES}/import/adjustment-detail`
export const getImportBorrowingsEndpoint = `${SALES}/import/borrowing`
export const getImportBorrwingsDetailEndpoint = `${SALES}/import/borrowing-detail`
export const updateNotImportEndpoint = `${SALES}/import/not-import`
export const createSaleImportEndpoint = `${SALES}/import`
export const getReceiptsEndpoint = `${SALES}/import`
export const exportReceiptsEndpoint = `${SALES}/import/excel/`
export const removeReceiptEndpoint = `${SALES}/import/remove`
export const printWarehousesInputEndpoint = `${SALES}/report/stock/invoice`
export const getReceiptByIdEndpoint = `${SALES}/import/trans`
export const getProductsByIdEndpoint = `${SALES}/import/trans-detail`
export const getProductsEndPoint = `${SALES}/products/find`
export const updateReceiptEndpoint = `${SALES}/import/update`
export const getNotImportReasonsEndpoint = `${COMMON}/apparams/sale-mt-deny`
export const printOutInputOrderEndpoint = `${SALES}/invoices/product-trans`
export const getWarehousesListEndpoint = `${SALES}/warehouse`
