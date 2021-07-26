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
  getWarehouseInventoryDetailEndpoint,
  updateWarehouseInventoryEndpoint,

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
        wareHouseTypeId: args.wareHouseTypeId,
      },
    })
  },
  importFilledStocks(args) {
    return axios.post(importFilledStocksEndpoint, args.data, {
      'Content-Type': 'multipart/form-data',
      params: {
        wareHouseTypeId: args.wareHouseTypeId,
      },
    })
  },
  checkExistedWarehouseInventory(args) {
    return axios.get(`${checkExistedWarehouseInventoryEndpoint}/${args.wareHouseTypeId}`, {
      params: formatURLParams(args),
    })
  },
  getSampleImportFile() {
    return axios.get(getSampleImportFileEndpoint, {
      responseType: 'blob',
    })
  },
  getFailedImportFile(args) {
    return axios.post(getFailedImportFileEndpoint, args.data, {
      'Content-Type': 'multipart/form-data',
      responseType: 'blob',
      params: {
        wareHouseTypeId: args.wareHouseTypeId,
      },
    })
  },
  getWarehouseInventoryDetail(args) {
    return axios.get(`${getWarehouseInventoryDetailEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  updateWarehouseInventory(args) {
    return axios.put(`${updateWarehouseInventoryEndpoint}/${args.id}`, args.lstUpdate, {
      params: {
        formId: args.formId,
        ctrlId: args.ctrlId,
      },
    })
  },
}
