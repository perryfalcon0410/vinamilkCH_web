import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getExchangeDamagedGoodsEndpoint,
  getExchangeDamagedGoodsReasonsEndpoint,
  createExchangeDamagedGoodsEndpoint,
  getExchangeDamagedGoodsByIdEndpoint,
  getCustomersEndpoint,
  getProductsEndPoint,
} from './defaultConfig'

export default {
  getExchangeDamagedGoods(args) {
    return axios.get(`${getExchangeDamagedGoodsEndpoint}`, {
      params: formatURLParams(args),
    })
  },
  getExchangeDamagedGoodsReasons() {
    return axios.get(`${getExchangeDamagedGoodsReasonsEndpoint}`)
  },
  createExchangeDamagedGoods(args) {
    return axios.post(createExchangeDamagedGoodsEndpoint, args)
  },
  getExchangeDamagedGoodsById(args) {
    return axios.get(getExchangeDamagedGoodsByIdEndpoint, args)
  },
  getCustomers(args) {
    return axios.get(getCustomersEndpoint, {
      params: formatURLParams(args),
    })
  },
  getProducts(args) {
    return axios.get(getProductsEndPoint, {
      params: formatURLParams(args),
    })
  },
}
