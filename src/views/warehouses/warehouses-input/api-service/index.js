import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getPoConfirmEndpoint,
  getPoProductsEndpoint,
  getPoPromotionProductsEndpoint,
  getImportExcelEndpoint,
  getImportAdjustmentsEndpoint,
  getImportAdjustmentsDetailEndpoint,
  getImportBorrowingsEndpoint,
  getImportBorrwingsDetailEndpoint,
  updateNotImportEndpoint,
  getReceiptsEndpoint,
  exportReceiptsEndpoint,
  createSaleImportEndpoint,
  removeReceiptEndpoint,
  printWarehousesInputEndpoint,
  getReceiptByIdEndpoint,
  getProductsByIdEndpoint,
  getProductsEndPoint,
  updateReceiptEndpoint,
} from './defaultConfig'

export default {
  getPoConfirm() {
    return axios.get(`${getPoConfirmEndpoint}`)
  },
  getPoProducts(args) {
    return axios.get(`${getPoProductsEndpoint}/${args}`)
  },
  getPoPromotionProducts(args) {
    return axios.get(`${getPoPromotionProductsEndpoint}/${args}`)
  },
  getImportExcel(args) {
    return axios.get(`${getImportExcelEndpoint}/${args}`)
  },
  getImportAdjustments() {
    return axios.get(`${getImportAdjustmentsEndpoint}`)
  },
  getImportAdjustmentsDetail(args) {
    return axios.get(`${getImportAdjustmentsDetailEndpoint}/${args}`)
  },
  getImportBorrowings() {
    return axios.get(`${getImportBorrowingsEndpoint}`)
  },
  getImportBorrwingsDetail(args) {
    return axios.get(`${getImportBorrwingsDetailEndpoint}/${args}`)
  },
  updateNotImport(args) {
    return axios.put(`${updateNotImportEndpoint}/${args}`)
  },
  getReceiptImport(args) {
    return axios.get(getReceiptsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReceiptImport(args) {
    return axios.get(`${exportReceiptsEndpoint}${args}`)
  },
  createSaleImport(args) {
    return axios.post(createSaleImportEndpoint, args)
  },
  removeReceipt(args) {
    return axios.patch(`${removeReceiptEndpoint}/${args}`)
  },
  printWarehouseInput(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios(`${printWarehousesInputEndpoint}?${queryString}`, {
      method: 'GET',
      responseType: 'blob', // Force to receive data in a Blob Format
    })
  },
  getReceiptImportById(args) {
    return axios.get(`${getReceiptByIdEndpoint}/${args}`)
  },
  getProductsById(args) {
    return axios.get(`${getProductsByIdEndpoint}/${args}`)
  },
  getProducts(args) {
    return axios.post(getProductsEndPoint, args)
  },
  updateReceipt(args) {
    return axios.patch(`${updateReceiptEndpoint}/${args.id}`, args)
  },
}
