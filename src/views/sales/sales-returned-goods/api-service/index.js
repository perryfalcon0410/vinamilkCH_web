import { formatURLParams } from '@/@core/utils/utils'
import axios from '@axios'
import {
  getReturnedGoodsEndPoint,
  getSaleOrdersEndPoint,
  getSaleOrderDetailEndPoint,
  createReturnOrderEndPoint,
  getReturnGoodDetailEnpoint,
  getReasonReturnGoodsEndpoint,
} from './defaultConfig'

export default {
  getOrderReturnedGoods(args) {
    return axios.get(getReturnedGoodsEndPoint, {
      params: formatURLParams(args),
    })
  },

  getSaleOrders(args) {
    return axios.get(getSaleOrdersEndPoint, {
      params: formatURLParams(args),
    })
  },

  getSaleOrderDetail(args) {
    return axios.get(`${getSaleOrderDetailEndPoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },

  createOrderReturn(args) {
    return axios.post(createReturnOrderEndPoint, args)
  },

  getReturnGoodDetail(args) {
    return axios.get(`${getReturnGoodDetailEnpoint}/${args.id}`, {
      params: formatURLParams(args),
    })
  },
  getReasonReturnGoods(args) {
    return axios.get(getReasonReturnGoodsEndpoint, {
      params: formatURLParams(args),
    })
  },
}
