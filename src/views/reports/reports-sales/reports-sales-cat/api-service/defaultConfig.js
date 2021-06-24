const REPORT = '/reports'
const CUSTOMER = '/customers'
const SALE_CAT = '/sale-category'

// Reports
export const getReportsSalesCatEndpoint = `${REPORT}${SALE_CAT}`
export const exportReportsSalesCatEndpoint = `${REPORT}${SALE_CAT}/excel`
export const getCustomerTypesEndpoint = `${CUSTOMER}/customer-types`
export const printReportEndpoint = `${REPORT}${SALE_CAT}/print`
