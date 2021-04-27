const CUSTOMER = '/customers'
const COMMON = '/commons'
// const PROMOTION = '/promotion'
// const SALE = '/sale'

export const getCustomersEndpoint = `${CUSTOMER}`
export const getCustomerByIdEndpoint = `${CUSTOMER}`
export const createCustomerEndpoint = `${CUSTOMER}/create`
export const updateCustomerEndpoint = `${CUSTOMER}/update`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-types`
export const exportCustomersEndpoint = `${CUSTOMER}/export`

export const getShopLocationsEndpoint = `${COMMON}/areas/provinces`
export const getProvincesEndpoint = `${COMMON}/areas/provinces`
export const getDistrictsEndpoint = `${COMMON}/areas/districts`
export const getPrecinctsEndpoint = `${COMMON}/areas/precincts`

export const getCardTypesEndpoint = `${COMMON}/apparams/cardtypes`
export const getCloselyTypesEndpoint = `${COMMON}/apparams/closelytypes`
