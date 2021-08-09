import axios from '@axios'
import {
  getPrinterClientEndpoint,
  createPrinterClientEndpoint,
  updatePrinterClientEndpoint,
} from './defaultConfig'

export default {

  getPrinterClient(args) {
    return axios.get(`${getPrinterClientEndpoint}/${args.clientId}`, args)
  },

  createPrinterClient(args) {
    return axios.post(createPrinterClientEndpoint, args)
  },

  updatePrinterClient(args) {
    return axios.patch(`${updatePrinterClientEndpoint}/${args.id}`, args)
  },
}
