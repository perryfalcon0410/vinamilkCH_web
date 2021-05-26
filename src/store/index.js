import Vue from 'vue'
import Vuex from 'vuex'

// Home
import dashboard from '@/views/dashboard/store-module'
// Purchases
import purchases from '@/views/purchases/store-module'
// Sales
import sales from '@/views/sales/sales/store-module'
import salesCustomers from '@/views/sales/sales-customers/store-module'
import salesReceipts from '@/views/sales/sales-receipts/store-module'
import salesRedBills from '@/views/sales/sales-red-bills/store-module'
import salesReturnedGoods from '@/views/sales/sales-returned-goods/store-module'
// Warehouses
import warehousesCombo from '@/views/warehouses/warehouses-combo/store-module'
import warehousesExchangeDamagedGoods from '@/views/warehouses/warehouses-exchange-damaged-goods/store-module'
import warehousesInput from '@/views/warehouses/warehouses-input/store-module'
import warehousesOutput from '@/views/warehouses/warehouses-output/store-module'
import warehousesInventory from '@/views/warehouses/warehouses-inventory/store-module'
// Reports
import reportWarehousesDifferencePrice from '@/views/reports/reports-warehouses/report-warehouses-price-difference/store-module'
import reportsReturnedGoods from '@/views/reports/reports-returned-goods/store-module'

// Systems
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Common
import commonCustomer from './common-customer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // System
    app,
    appConfig,
    verticalMenu,
    // Common
    commonCustomer,
    // Home
    dashboard,
    // Purchases
    purchases,
    // Sales
    sales,
    salesCustomers,
    salesReceipts,
    salesRedBills,
    salesReturnedGoods,
    // Warehouses
    warehousesCombo,
    warehousesExchangeDamagedGoods,
    warehousesInput,
    warehousesOutput,
    warehousesInventory,
    // Reports
    reportWarehousesDifferencePrice,
    reportsReturnedGoods,
  },
  strict: process.env.DEV,
})
