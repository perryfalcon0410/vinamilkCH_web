import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
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
} from './defaultConfig'

export default {
  getWarehouseOutputs(args) {
    return axios.get(getWarehousesOutputsEndpoint, {
      params: formatURLParams(args),
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
    return axios.get(`${getExportAdjustmentDetailEndpoint}/${args}`)
  },
  getExportBorrowingDetail(args) {
    return axios.get(`${getExportBorrowingDetailEndpoint}/${args}`)
  },
  getWareHouseType() {
    return axios.get(`${getWareHouseTypeEndpoint}`)
  },
  createExport(args) {
    return axios.post(createExportEndpoint, args)
  },
  deleteWarehousesOutput(args) {
    console.log(args)
    return axios.put(`${deleteWarehousesOutputEndpoint}/${args.id}?type=${args.type}`)
  },
}
