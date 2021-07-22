const sales = '/sales'
const commons = '/commons'
const apparams = '/apparams'

export const getReturnedGoodsEndPoint = `${sales}/order-return`
export const getSaleOrdersEndPoint = `${sales}/order-return/choose`
export const getSaleOrderDetailEndPoint = `${sales}/order-return/chosen`
export const createReturnOrderEndPoint = `${sales}/order-return`
export const getReturnGoodDetailEnpoint = `${sales}/order-return/detail`
export const getReasonReturnGoodsEndpoint = `${commons}${apparams}/type/SALEMT_MASTER_PAY_ITEM`
