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
  putNotImportEndpoint,
  getReceiptsEndpoint,
  exportReceiptsEndpoint,
  postSaleImportEndpoint,
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
  putNotImport(args) {
    return axios.put(`${putNotImportEndpoint}/${args}`)
  },
  getReceiptImport(args) {
    return axios.get(getReceiptsEndpoint, {
      params: formatURLParams(args),
    })
  },
  exportReceiptImport(args) {
    return axios.get(`${exportReceiptsEndpoint}${args}`)
  },
  postSaleImport(args) {
    return axios.post(postSaleImportEndpoint, args)
  },
}
