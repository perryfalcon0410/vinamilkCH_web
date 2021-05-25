import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehouseInventoriesEndpoint,
  getWarehouseTypesEndpoint,
  getWarehouseInventoryStocksEndpoint,
  exportFilledStocksEndpoint,
  createWarehouseInventoryEndpoint,
  importFilledStocksEndpoint,
  checkExistedWarehouseInventoryEndpoint,
  getSampleImportFileEndpoint,
  getFailedImportFileEndpoint,

} from './defaultConfig'

export default {
  getWarehouseInventories(args) {
    return axios.get(getWarehouseInventoriesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getWarehouseTypes(args) {
    return axios.get(getWarehouseTypesEndpoint, {
      params: formatURLParams(args),
    })
  },
  getWarehouseInventoryStocks(args) {
    return axios.get(getWarehouseInventoryStocksEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportFilledStocks(args) {
    return axios.get(exportFilledStocksEndpoint, {
      params: formatURLParams(args),
      responseType: 'blob',
    })
  },
  createWarehouseInventory(args) {
    return axios.post(createWarehouseInventoryEndpoint, args.lstCreate, {
      params: {
        formId: args.formId,
        ctrlId: args.ctrlId,
        override: args.override,
      },
    })
  },
  importFilledStocks(args) {
    return axios.post(importFilledStocksEndpoint, args, {
      'Content-Type': 'multipart/form-data',
    })
  },
  checkExistedWarehouseInventory(args) {
    return axios.get(checkExistedWarehouseInventoryEndpoint, {
      params: formatURLParams(args),
    })
  },
  getSampleImportFile() {
    return axios.get(getSampleImportFileEndpoint, {
      responseType: 'blob',
    })
  },
  getFailedImportFile(args) {
    return axios.post(getFailedImportFileEndpoint, args, {
      'Content-Type': 'multipart/form-data',
    })
  },
}
