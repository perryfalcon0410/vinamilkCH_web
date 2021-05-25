import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getDifferencePriceEndPoint,
  getDifferencePriceProductCatsEndPoint,
  getDifferencePriceChooseProductsEndPoint,
} from './defaultConfig'

export default {
  getDifferencePrice(args) {
    return axios.get(getDifferencePriceEndPoint, {
      params: formatURLParams(args),
    })
  },
  getDifferencePriceProductCats(args) {
    return axios.get(getDifferencePriceProductCatsEndPoint, args)
  },
  getDifferencePriceChooseProducts(args) {
    return axios.get(getDifferencePriceChooseProductsEndPoint, {
      params: formatURLParams(args),
    })
  },
}
