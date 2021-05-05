import axios from '@axios'
import {
  getReturnedGoodsEndPoint,
  getSaleOdersEndPoint,
  getSaleOderDetailEndPoint,
  createReturnOrderEndPoint,
} from './defaultConfig'

export default {
  getOderReturns(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getReturnedGoodsEndPoint}?formId=5&ctrlId=1&${queryString}`)
  },

  getSaleOders(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getSaleOdersEndPoint}?formId=5&ctrlId=1&${queryString}`)
  },

  getSaleOderDetail(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getSaleOderDetailEndPoint}/${args.id}?formId=5&ctrlId=1&${queryString}`)
  },

  createOderReturn(args) {
    return axios.post(`${createReturnOrderEndPoint}?formId=5&ctrlId=1`, args)
  },
}
