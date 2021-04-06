const CUSTOMER = '/customer'
const PROMOTION = '/promotion'
const SALE = '/sale'

export const getCustomersEndpoint = `${CUSTOMER}/index`
export const getCustomerByIdEndpoint = `${CUSTOMER}/getById`
export const createCustomerEndpoint = `${CUSTOMER}/create`
export const updateCustomerEndpoint = `${CUSTOMER}/update`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customertypes`
export const getShopLocationsEndpoint = `${CUSTOMER}/area/provinces`
export const getProvincesEndpoint = `${CUSTOMER}/area/provinces`
export const getDistrictsEndpoint = `${CUSTOMER}/area/districts`
export const getPrecinctsEndpoint = `${CUSTOMER}/area/precincts`
export const getMemberCardsEndpoint = `${PROMOTION}/membercard/find-by-customer-type-id`
export const getCardTypesEndpoint = `${SALE}/apparam/cardtypes`
export const getCloselyTypesEndpoint = `${SALE}/apparam/closelytypes`
