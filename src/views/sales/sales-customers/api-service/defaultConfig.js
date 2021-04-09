const CUSTOMER = '/customers'
// const PROMOTION = '/promotion'
const SALE = '/sale'

export const getCustomersEndpoint = `${CUSTOMER}`
export const getCustomerByIdEndpoint = `${CUSTOMER}`
export const createCustomerEndpoint = `${CUSTOMER}/create`
export const updateCustomerEndpoint = `${CUSTOMER}/update`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-types`
export const exportCustomersEndpoint = `${CUSTOMER}/export`

export const getShopLocationsEndpoint = `${CUSTOMER}/areas/provinces`
export const getProvincesEndpoint = `${CUSTOMER}/areas/provinces`
export const getDistrictsEndpoint = `${CUSTOMER}/areas/districts`
export const getPrecinctsEndpoint = `${CUSTOMER}/areas/precincts`

export const getCardTypesEndpoint = `${SALE}/apparam/cardtypes`
export const getCloselyTypesEndpoint = `${SALE}/apparam/closelytypes`
