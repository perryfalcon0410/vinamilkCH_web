import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'

export default {
  getAllPoAuto() {
    return axios.get('/sales/po-list')
  },

  getSearchPoAuto(args) {
    return axios.get('/sales/po-search-list', {
      params: formatURLParams(args),
    })
  },

  getPoAutoDetailProduct(args) {
    return axios.get('/sales/po-detail-product', {
      params: formatURLParams(args),
    })
  },

  approvePoAUto(args) {
    return axios.post('/sales/approve-po', args)
  },

  cancelPoAuto(args) {
    return axios.post('/sales/cancel-po', args)
  },
}
