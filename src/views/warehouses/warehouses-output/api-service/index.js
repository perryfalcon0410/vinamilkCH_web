import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getExportsEndpoint,
  printExportEndpoint,
  getExportByIdEndpoint,
  updateExportEndpoint,
  getProductsOfExportEndpoint,
} from './defaultConfig'

export default {
  getReceiptExports(args) {
    return axios.get(getExportsEndpoint, {
      params: formatURLParams(args),
    })
  },
  printReceiptExports(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios(`${printExportEndpoint}?${queryString}`, {
      method: 'GET',
      responseType: 'blob', // Force to receive data in a Blob Format
    })
  },
  getExportById(args) {
    return axios.get(`${getExportByIdEndpoint}/${args}`)
  },
  getProductsOfExport(args) {
    return axios.get(`${getProductsOfExportEndpoint}/${args}`)
  },
  UpdateExport(args) {
    return axios.patch(`${updateExportEndpoint}/${args.id}`, args)
  },
}
