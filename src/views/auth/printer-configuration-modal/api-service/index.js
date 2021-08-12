import axios from '@axios'
import {
  crudPrinterClientEndpoint,
} from './defaultConfig'

export default {

  getPrinterClient(args) {
    return axios.get(`${crudPrinterClientEndpoint}/${args.clientId}`, args)
  },

  createPrinterClient(args) {
    return axios.post(crudPrinterClientEndpoint, args)
  },

  updatePrinterClient(args) {
    return axios.put(`${crudPrinterClientEndpoint}/${args.id}`, args)
  },
}
