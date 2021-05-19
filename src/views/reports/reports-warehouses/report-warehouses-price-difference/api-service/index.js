import axios from '@axios'
import {
  getDifferencePriceEndPoint,
  getDifferencePriceProductCatsEndPoint,
  getDifferencePriceChooseProductsEndPoint,
} from './defaultConfig'

export default {
  getDifferencePrice(args) {
    return axios.get(getDifferencePriceEndPoint, args)
  },
  getDifferencePriceProductCats(args) {
    return axios.get(getDifferencePriceProductCatsEndPoint, args)
  },
  getDifferencePriceChooseProducts(args) {
    return axios.get(getDifferencePriceChooseProductsEndPoint, args)
  },
}
