import axios from '@/libs/axios'
import {
  getCustomerEndpoint,
  deleteCustomerEndpoint,
  createCustomerEndpoint,
  locationCustomerEndpoint,
} from './defaultConfig/customer.config'

export default {
  getAll(args) {
    return axios.get(`${getCustomerEndpoint}${args}`)
  },

  create(args) {
    return axios.post(createCustomerEndpoint, {
      customerCode: args.customerCode,
      barCode: args.barCode,
      firstName: args.firstName,
      lastName: args.lastName,
      phoneNumber: args.phoneNumber,
      gender: args.gender,
      status: args.status,
      birthday: args.birthday,
      customerGroupId: args.customerGroupId,
      specialCustomer: args.specialCustomer,
      noted: args.noted,
      email: args.email,
      countryId: args.countryId,
      areaId: args.areaId,
      provinceId: args.provinceId,
      districtId: args.districtId,
      wardId: args.wardId,
      address: args.address,
      shopId: args.shopId,
      identityCard: {
        identityCardCode: args.identityCardCode,
        identityCardIssueDate: args.identityCardIssueDate,
        identityCardIssuePlace: args.identityCardIssuePlace,
        identityCardExpiryDate: args.identityCardExpiryDate,
        identityCardType: args.identityCardType,
      },
      companyName: args.companyName,
      companyAddress: args.companyAddress,
      taxCode: args.taxCode,
      cardMemberId: args.cardMemberId,
    })
  },

  delete(args) {
    return axios.delete(deleteCustomerEndpoint, {
      data: {
        customerIds: args,
      },
    })
  },

  getLocationShop(args) {
    return axios.get(`${locationCustomerEndpoint}?shopId=${args}`)
  },
}
