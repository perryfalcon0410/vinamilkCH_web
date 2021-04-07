const CUSTOMER = '/customer'
// const PROMOTION = '/promotion'
const SALE = '/sale'

export const getCustomersEndpoint = `${CUSTOMER}`
export const getCustomerByIdEndpoint = `${CUSTOMER}`
export const createCustomerEndpoint = `${CUSTOMER}/create`
export const updateCustomerEndpoint = `${CUSTOMER}/update`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-type`
export const getShopLocationsEndpoint = `${CUSTOMER}/area/provinces`
export const getProvincesEndpoint = `${CUSTOMER}/area/provinces`
export const getDistrictsEndpoint = `${CUSTOMER}/area/districts`
export const getPrecinctsEndpoint = `${CUSTOMER}/area/precincts`
export const getCardTypesEndpoint = `${SALE}/apparam/cardtypes`
export const getCloselyTypesEndpoint = `${SALE}/apparam/closelytypes`
