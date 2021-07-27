import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getExchangeDamagedGoodsEndpoint,
  getExchangeDamagedGoodsReasonsEndpoint,
  createExchangeDamagedGoodsEndpoint,
  getExchangeDamagedGoodsByIdEndpoint,
  getCustomersEndpoint,
  getProductsEndPoint,
  updateExchangeDamagedGoodsEndpoint,
  getDamagedGoodsByIdEndpoint,
  removeExchangeDamagedGoodsEndpoint,
  updatePriceProductEndpoint,
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
  updateExchangeDamagedGoods(args) {
    return axios.put(`${updateExchangeDamagedGoodsEndpoint}/${args.id}`, args)
  },
  getExchangeDamagedGoodsById(args) {
    return axios.get(`${getExchangeDamagedGoodsByIdEndpoint}/${args}`)
  },
  getDamagedGoodsById(args) {
    return axios.get(`${getDamagedGoodsByIdEndpoint}/${args}`)
  },
  removeExchangeDamagedGoods(args) {
    return axios.put(`${removeExchangeDamagedGoodsEndpoint}/${args}`)
  },
  updatePriceProduct(args) {
    return axios.post(`${updatePriceProductEndpoint}/${args.customerTypeId}`, args.products, {
      params: formatURLParams(args.params),
    })
  },
}
