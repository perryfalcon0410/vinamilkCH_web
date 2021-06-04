const SALES = '/sales'
const EXPORT = '/export'
const IMPORT = '/import'

export const getWarehousesOutputsEndpoint = `${SALES}${EXPORT}`
export const printWarehousesOutputEndpoint = `${SALES}/report/stock/invoice`
export const getWarehousesOutputByIdEndpoint = `${SALES}${IMPORT}/trans`
export const updateWarehousesOutputEndpoint = `${SALES}${EXPORT}/update`
export const getProductsOfWarehousesOutputEndpoint = `${SALES}${IMPORT}/trans-detail`
export const getExportBorrowingEndpoint = `${SALES}${EXPORT}/borrowing`
export const getExportPoTransEndpoint = `${SALES}${EXPORT}/po-trans`
export const getExportAdjustmentEndpoint = `${SALES}${EXPORT}/adjustment`
export const getExportBorrowingDetailEndpoint = `${SALES}${IMPORT}/borrowing-detail`
export const getExportPoTransDetailEndpoint = `${SALES}${IMPORT}/trans-detail`
export const getExportAdjustmentDetailEndpoint = `${SALES}${IMPORT}/adjustment-detail`
export const getWareHouseTypeEndpoint = `${SALES}${IMPORT}/warehouse-type`
export const createExportEndpoint = `${SALES}${EXPORT}`
export const deleteWarehousesOutputEndpoint = `${SALES}${EXPORT}/remove`
export const printOutInputOrderEndpoint = `${SALES}/invoices/product-trans`
