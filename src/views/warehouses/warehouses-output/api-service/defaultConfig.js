/* eslint-disable import/prefer-default-export */
const SALE = '/sale'

export const getWarehousesOutputsEndpoint = `${SALE}/export`
export const printWarehousesOutputEndpoint = `${SALE}/report/stock/invoice`
export const getWarehousesOutputByIdEndpoint = `${SALE}/import/trans`
export const updateWarehousesOutputEndpoint = `${SALE}/export/update`
export const getProductsOfWarehousesOutputEndpoint = `${SALE}/import/trans-detail`
