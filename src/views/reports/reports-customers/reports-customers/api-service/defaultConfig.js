const REPORT = '/reports'
const CUSTOMER = '/customers'
const COMMON = '/commons'
const AREA = '/areas'

// Reports
export const getReportsCustomersEndpoint = `${REPORT}${CUSTOMER}/trade`
export const exportReportsCustomersEndpoint = `${REPORT}${CUSTOMER}/trade/excel`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-types`

export const getShopLocationsSearchEndpoint = `${COMMON}${AREA}/districts/index-customers`
