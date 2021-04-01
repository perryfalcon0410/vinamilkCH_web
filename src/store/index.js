import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from '@/views/dashboard/store-module'
import purchases from '@/views/purchases/store-module'
import sales from '@/views/sales/sales/store-module'
import salesCustomers from '@/views/sales/sales-customers/store-module'
import salesReceipts from '@/views/sales/sales-receipts/store-module'
import salesRedBills from '@/views/sales/sales-red-bills/store-module'
import salesReturnedGoods from '@/views/sales/sales-returned-goods/store-module'
import warehousesCombo from '@/views/warehouses/warehouses-combo/store-module'
import warehousesExchangeDamagedGoods from '@/views/warehouses/warehouses-exchange-damaged-goods/store-module'
import warehousesInput from '@/views/warehouses/warehouses-input/store-module'
import warehousesOutput from '@/views/warehouses/warehouses-output/store-module'
import warehousesInventory from '@/views/warehouses/warehouses-inventory/store-module'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    dashboard,
    purchases,
    sales,
    salesCustomers,
    salesReceipts,
    salesRedBills,
    salesReturnedGoods,
    warehousesCombo,
    warehousesExchangeDamagedGoods,
    warehousesInput,
    warehousesOutput,
    warehousesInventory,
  },
  strict: process.env.DEV,
})
