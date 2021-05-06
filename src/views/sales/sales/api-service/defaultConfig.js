const PROMOTION = '/promotions'
const VOUCHERS = '/vouchers'
const SALES = '/sales'
const ONLINEORDER = '/online-orders?ctrlId=1&formId=4' // HARD

export const getVouchersEndpoint = `${PROMOTION}/${VOUCHERS}`
export const getOnlineOrderEndpoint = `${SALES}/${ONLINEORDER}`
