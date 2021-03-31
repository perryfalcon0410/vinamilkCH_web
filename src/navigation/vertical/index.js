import dashboard from './dashboard'
import sales from './sales'
import purchases from './purchases'
import warehouses from './warehouses'
import reports from './reports'

// Array of sections
export default [
  ...dashboard, // Trang chủ
  ...sales, // Bán hàng
  ...purchases, // Mua hàng
  ...warehouses, // Kho
  ...reports, // Báo cáo
]
