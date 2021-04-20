/* eslint-disable import/prefer-default-export */
const SALE = '/sale'

export const getExportsEndpoint = `${SALE}/export`
export const printExportEndpoint = `${SALE}/report/stock/invoice`
export const getExportByIdEndpoint = `${SALE}/import/stock`
export const updateExportEndpoint = `${SALE}/export/update`
export const getProductsOfExportEndpoint = `${SALE}/import/trans-detail`
