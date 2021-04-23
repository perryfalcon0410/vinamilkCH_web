import axios from '@axios'
import { formatURLParams } from '@/@core/utils/utils'
import {
  getWarehousesOutputsEndpoint,
  printWarehousesOutputEndpoint,
  getWarehousesOutputByIdEndpoint,
  updateWarehousesOutputEndpoint,
  getProductsOfWarehousesOutputEndpoint,
} from './defaultConfig'

export default {
  getWarehouseOutputs(args) {
    return axios.get(getWarehousesOutputsEndpoint, {
      params: formatURLParams(args),
    })
  },
  printWarehouseOutput(args) {
    const queryString = new URLSearchParams(args).toString()
    return axios(`${printWarehousesOutputEndpoint}?${queryString}`, {
      method: 'GET',
      responseType: 'blob', // Force to receive data in a Blob Format
    })
  },
  getWarehouseOutputById(args) {
    return axios.get(`${getWarehousesOutputByIdEndpoint}/${args}`)
  },
  getProductsOfWarehouseOutput(args) {
    return axios.get(`${getProductsOfWarehousesOutputEndpoint}/${args}`)
  },
  updateWarehouseOutput(args) {
    return axios.patch(`${updateWarehousesOutputEndpoint}/${args.id}`, args)
  },
}
