const CUSTOMER = '/customers'
const COMMON = '/commons'
const AREA = '/areas'
const APPARAM = '/apparams'
// const PROMOTION = '/promotion'
// const SALE = '/sale'

export const getCustomersEndpoint = `${CUSTOMER}`
export const getCustomerByIdEndpoint = `${CUSTOMER}`
export const createCustomerEndpoint = `${CUSTOMER}/create`
export const updateCustomerEndpoint = `${CUSTOMER}/update`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-types`
export const getCustomerTypesUpdateEndpoint = `${CUSTOMER}/customer-types/customers`
export const exportCustomersEndpoint = `${CUSTOMER}/export`
export const getCustomerDefaultEndpoint = `${CUSTOMER}/default`

export const getShopLocationsSearchEndpoint = `${COMMON}/${AREA}/districts/index-customers`
export const getShopLocationsEndpoint = `${COMMON}/${AREA}/default`
export const getProvincesEndpoint = `${COMMON}/${AREA}/provinces`
export const getDistrictsEndpoint = `${COMMON}/${AREA}/districts`
export const getPrecinctsEndpoint = `${COMMON}/${AREA}/precincts`

export const getCardTypesEndpoint = `${COMMON}/${APPARAM}/cardtypes`
export const getCloselyTypesEndpoint = `${COMMON}/${APPARAM}/closelytypes`
export const getGendersEndpoint = `${COMMON}/categorydata/genders`
