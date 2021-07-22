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
  getWarehousesTypeEndpoint,
  getNotImportReasonsEndpoint,
  printOutInputOrderEndpoint,
  getImportPoConfirmEndpoint,
} from './defaultConfig'

export default {
  getPoConfirm(args) {
    return axios.get(getPoConfirmEndpoint, {
      params: formatURLParams(args),
    })
  },
  getPoProducts(args) {
    return axios.get(`${getPoProductsEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getPoPromotionProducts(args) {
    return axios.get(`${getPoPromotionProductsEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getImportExcel(args) {
    return axios.get(`${getImportExcelEndpoint}/${args.id}`, {
      params: formatURLParams(args),
      responseType: 'blob',
      config: {
        header: {
          'Content-Type': 'application/json',
        },
      },
    })
  },
  getImportAdjustments(args) {
    return axios.get(`${getImportAdjustmentsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  getImportAdjustmentsDetail(args) {
    return axios.get(`${getImportAdjustmentsDetailEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getImportBorrowings(args) {
    return axios.get(`${getImportBorrowingsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  getImportBorrwingsDetail(args) {
    return axios.get(`${getImportBorrwingsDetailEndpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  updateNotImport(args) {
    return axios.put(`${updateNotImportEndpoint}/${args.id}`, args)
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
    return axios.patch(`${removeReceiptEndpoint}/${args.id}?type=${args.type}`)
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
    return axios.get(getProductsEndPoint, {
      params: formatURLParams(args),
    })
  },
  updateReceipt(args) {
    return axios.patch(`${updateReceiptEndpoint}/${args.id}?formId=${args.formId}&ctrlId=${args.ctrlId}`, args)
  },
  getWarehousesType(args) {
    return axios.get(getWarehousesTypeEndpoint, {
      params: formatURLParams(args),
    })
  },
  getNotImportReasons(args) {
    return axios.get(getNotImportReasonsEndpoint, {
      params: formatURLParams(args),
    })
  },
  printOutInputOrder(args) {
    return axios.get(`${printOutInputOrderEndpoint}/${args.transCode}`, {
      params: formatURLParams(args.params),
    })
  },
  getImportPoConfirm(args) {
    return axios.get(getImportPoConfirmEndpoint, {
      params: formatURLParams(args),
    })
  },
}
