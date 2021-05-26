const SALE = '/sales'
const EXPORT = '/export'
const IMPORT = '/import'

export const getWarehousesOutputsEndpoint = `${SALE}${EXPORT}`
export const printWarehousesOutputEndpoint = `${SALE}/report/stock/invoice`
export const getWarehousesOutputByIdEndpoint = `${SALE}${IMPORT}/trans`
export const updateWarehousesOutputEndpoint = `${SALE}${EXPORT}/update`
export const getProductsOfWarehousesOutputEndpoint = `${SALE}${IMPORT}/trans-detail`
export const getExportBorrowingEndpoint = `${SALE}${EXPORT}/borrowing`
export const getExportPoTransEndpoint = `${SALE}${EXPORT}/po-trans`
export const getExportAdjustmentEndpoint = `${SALE}${EXPORT}/adjustment`
export const getExportBorrowingDetailEndpoint = `${SALE}${IMPORT}/borrowing-detail`
export const getExportPoTransDetailEndpoint = `${SALE}${IMPORT}/trans-detail`
export const getExportAdjustmentDetailEndpoint = `${SALE}${IMPORT}/adjustment-detail`
export const getWareHouseTypeEndpoint = `${SALE}${IMPORT}/warehouse-type`
export const createExportEndpoint = `${SALE}${EXPORT}`
export const deleteWarehousesOutputEndpoint = `${SALE}${EXPORT}/remove`
