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
    return axios.get(`${getWarehousesOutputByIdEndpoint}/${args}`)
  },
  getProductsOfWarehouseOutput(args) {
    return axios.get(`${getProductsOfWarehousesOutputEndpoint}/${args}`)
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
    console.log(`${getExportPoTransDetailEndpoint}/${args}?type=0`)
    return axios.get(`${getExportPoTransDetailEndpoint}/${args}?type=0`)
  },
  getExportAdjustmentDetail(args) {
    return axios.get(`${getExportAdjustmentDetailEndpoint}/${args}`)
  },
  getExportBorrowingDetail(args) {
    console.log(`${getExportBorrowingDetailEndpoint}/${args}`)
    return axios.get(`${getExportBorrowingDetailEndpoint}/${args}`)
  },
  getWareHouseType() {
    return axios.get(`${getWareHouseTypeEndpoint}`)
  },
  createExport(args) {
    return axios.post(createExportEndpoint, args)
  },
}
