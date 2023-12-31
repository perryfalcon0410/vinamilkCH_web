import axios from '@axios'
import { formatURLParams, formatSortUrl, sortFilterParams } from '@/@core/utils/utils'
import {
  getWarehousesOutputsEndpoint,
  printWarehousesOutputEndpoint,
  getWarehousesOutputByIdEndpoint,
  updateWarehousesOutputEndpoint,
  getProductsOfWarehousesOutputEndpoint,
  getExportBorrowingEndpoint,
  getExportAdjustmentEndpoint,
  getExportPoTransEndpoint,
  getExportPoTransDetailEndpoint,
  getExportAdjustmentDetailEndpoint,
  getExportBorrowingDetailEndpoint,
  getWareHouseTypeEndpoint,
  createExportEndpoint,
  deleteWarehousesOutputEndpoint,
  printOutInputOrderEndpoint,
} from './defaultConfig'

export default {
  getWarehouseOutputs(args) {
    return axios.get(`${getWarehousesOutputsEndpoint}${formatSortUrl(args)}`, {
      params: formatURLParams(sortFilterParams(args)),
    })
  },
  printWarehouseOutput(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios(`${printWarehousesOutputEndpoint}?${queryString}`, {
      method: 'GET',
      responseType: 'blob', // Force to receive data in a Blob Format
    })
  },
  getWarehouseOutputById(args) {
    return axios.get(`${getWarehousesOutputByIdEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getProductsOfWarehouseOutput(args) {
    return axios.get(`${getProductsOfWarehousesOutputEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  updateWarehouseOutput(args) {
    return axios.patch(`${updateWarehousesOutputEndpoint}/${args.id}`, args)
  },
  getExportBorrowing() {
    return axios.get(`${getExportBorrowingEndpoint}`)
  },
  getExportAdjustment() {
    return axios.get(`${getExportAdjustmentEndpoint}`)
  },
  getExportPoTrans(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getExportPoTransEndpoint}?${queryString}`)
  },
  getExportPoTransDetail(args) {
    return axios.get(`${getExportPoTransDetailEndpoint}/${args}?type=0`)
  },
  getExportAdjustmentDetail(args) {
    return axios.get(`${getExportAdjustmentDetailEndpoint}/${args}?type=0`)
  },
  getExportBorrowingDetail(args) {
    return axios.get(`${getExportBorrowingDetailEndpoint}/${args}?type=0`)
  },
  getWareHouseType() {
    return axios.get(`${getWareHouseTypeEndpoint}`)
  },
  createExport(args) {
    return axios.post(createExportEndpoint, args)
  },
  deleteWarehousesOutput(args) {
    return axios.put(`${deleteWarehousesOutputEndpoint}/${args.id}?type=${args.type}`)
  },
  printOutInputOrder(args) {
    return axios.get(`${printOutInputOrderEndpoint}/${args.transCode}`, {
      params: formatURLParams(args.params),
    })
  },
}
