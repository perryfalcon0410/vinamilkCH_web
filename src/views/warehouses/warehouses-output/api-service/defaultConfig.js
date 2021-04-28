/* eslint-disable import/prefer-default-export */
const SALE = '/sales'

export const getWarehousesOutputsEndpoint = `${SALE}/export`
export const printWarehousesOutputEndpoint = `${SALE}/report/stock/invoice`
export const getWarehousesOutputByIdEndpoint = `${SALE}/import/trans`
export const updateWarehousesOutputEndpoint = `${SALE}/export/update`
export const getProductsOfWarehousesOutputEndpoint = `${SALE}/import/trans-detail`
export const getExportBorrowingEndpoint = `${SALE}/export/borrowing`
export const getExportPoTransEndpoint = `${SALE}/export/po-trans`
export const getExportAdjustmentEndpoint = `${SALE}/export/adjustment`
export const getExportBorrowingDetailEndpoint = `${SALE}/import/borrowing-detail`
export const getExportPoTransDetailEndpoint = `${SALE}/import/trans-detail`
export const getExportAdjustmentDetailEndpoint = `${SALE}/import/adjustment-detail`
export const getWareHouseTypeEndpoint = `${SALE}/import/warehouse-type`
export const createExportEndpoint = `${SALE}/export`
