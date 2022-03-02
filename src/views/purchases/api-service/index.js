import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'

export default {
  getAllPoAuto() {
    return axios.get('/sales/po-auto/po-list')
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

  approvePoAUto(args) {
    return axios.post('/sales/po-auto/approve-po', args)
  },

  cancelPoAuto(args) {
    return axios.post('/sales/po-auto/cancel-po', args)
  },
}
