import axios from '@axios'
import {
  getReturnedGoodsEndPoint,
  getSaleOrdersEndPoint,
  getSaleOrderDetailEndPoint,
  createReturnOrderEndPoint,
} from './defaultConfig'

export default {
  getOrderReturnedGoods(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getReturnedGoodsEndPoint}?formId=5&ctrlId=1&${queryString}`)
  },

  getSaleOrders(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getSaleOrdersEndPoint}?formId=5&ctrlId=1&${queryString}`)
  },

  getSaleOrderDetail(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios.get(`${getSaleOrderDetailEndPoint}/${args.id}?formId=5&ctrlId=1&${queryString}`)
  },

  createOrderReturn(args) {
    return axios.post(`${createReturnOrderEndPoint}?formId=5&ctrlId=1`, args)
  },
}
