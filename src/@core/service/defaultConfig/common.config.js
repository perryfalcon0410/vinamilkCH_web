const COMMON = '/common'
const WARD = '/ward'
const PROVINCE = '/province'
const DISTRICT = '/district'
const COUNTRY = '/country'
const AREA = '/area'

// ward
export const getWardEndpoint = `${COMMON}${WARD}/index`
export const getWardByDistrictIdEndpoint = `${COMMON}${WARD}/find-by-district-ids`

// province
export const getProvinceEndpoint = `${COMMON}${PROVINCE}/index`
export const getProvinceByIdEndpoint = `${COMMON}${PROVINCE}/find-by-ids`
export const getProvinceByAreaIdEndpoint = `${COMMON}${PROVINCE}/find-by-area-ids`

// district
export const getDistrictEndpoint = `${COMMON}${DISTRICT}/index`
export const getDistrictByProvinceIdEndpoint = `${COMMON}${DISTRICT}/find-by-province-ids`
export const getDistrictByIdEndpoint = `${COMMON}${DISTRICT}/find-by-ids`

// contry
export const getCountryEndpoint = `${COMMON}${COUNTRY}/index`

// area
export const getAreaEndpoint = `${COMMON}${AREA}/index`
export const getAreaByCountryIdEndpoint = `${COMMON}${COUNTRY}/find-by-country-ids`
