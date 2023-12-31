import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'

export default {
  getAllPoAuto(args) {
    return axios.get('/sales/po-auto/po-list', {
      params: formatURLParams(args),
    })
  },

  getSearchPoAuto(args) {
    return axios.get('/sales/po-auto/po-search-list', {
      params: formatURLParams(args),
    })
  },

  getPoAutoDetailProduct(args) {
    return axios.get('/sales/po-auto/po-detail-product', {
      params: formatURLParams(args),
    })
  },

  approvePoAuto(args) {
    return axios.post('/sales/po-auto/approve-po', args)
  },

  cancelPoAuto(args) {
    return axios.post('/sales/po-auto/cancel-po', args)
  },

  getProduct(args) {
    return axios.get('/sales/po-auto/product-list', {
      params: formatURLParams(args),
    })
  },

  savePoAuto(args) {
    return axios.post('/sales/po-auto/save-po', args)
  },

  getProductOfferPo(args) {
    return axios.get('/sales/po-auto/request-po-list', {
      params: formatURLParams(args),
    })
  },

  getPoCreateBasicInfo(args) {
    return axios.get('/sales/po-auto/po-create-basic-info', {
      params: formatURLParams(args),
    })
  },
}
