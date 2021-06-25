export default [
  {
    path: '/reports/returned-goods',
    name: 'reports-returned-goods',
    component: () => import('@/views/reports/reports-returned-goods/reports-returned-goods-list/ReportsReturnedGoodsList.vue'),
    meta: {
      pageTitle: 'Hàng trả lại',
      breadcrumb: [
        {
          text: 'Danh sách đơn trả hàng',
          active: true,
        },
      ],
      resource: 'ReportsReturnedGoods',
    },
  },
  {
    path: '/reports/warehouses/output',
    name: 'reports-warehouses-output',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-output/reports-warehouses-output-list/ReportsWarehousesOutputList.vue'),
    meta: {
      pageTitle: 'Báo cáo xuất hàng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo xuất hàng',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesOutput',
    },
  },
  {
    path: '/reports/warehouses/inventory',
    name: 'reports-warehouses-inventory',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-inventory/reports-warehouses-inventory-list/ReportsWarehousesInventoryList.vue'),
    meta: {
      pageTitle: 'Báo cáo tồn kho',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm tồn kho',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesInventory',
    },
  },
  {
    path: '/reports/warehouses/difference-price',
    name: 'reports-warehouses-difference-price',
    component: () => import('@/views/reports/reports-warehouses/report-warehouses-price-difference/reports-warehouses-price-difference-list/ReportsWarehousesPriceDifferenceList.vue'),
    meta: {
      pageTitle: 'Báo cáo chênh lệch giá',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesPriceDifference',
    },
  },
  {
    path: '/reports/warehouses/promotion',
    name: 'reports-warehouses-promotion',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-promotion/reports-warehouses-promotion-list/ReportsWarehousesPromotionList.vue'),
    meta: {
      pageTitle: 'Báo cáo hàng khuyến mãi',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm khuyến mãi',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesPromotions',
    },
  },
  {
    path: '/reports/warehouses/adjustment',
    name: 'reports-warehouses-adjustment',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-adjustment/reports-warehouses-adjustment-list/ReportsWarehousesAdjustmentList.vue'),
    meta: {
      pageTitle: 'Báo cáo nhập xuất điều chỉnh',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm nhập xuất điều chỉnh',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesAdjustment',
    },
  },
  {
    path: '/reports/warehouses/input',
    name: 'reports-warehouses-input',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-input/reports-warehouses-input-list/ReportsWarehousesInputList.vue'),
    meta: {
      pageTitle: 'Báo cáo nhập hàng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo nhập hàng',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesInput',
    },
  },
  // Báo cáo xuất nhập tồn
  {
    path: '/reports/warehouses/input-output-inventory',
    name: 'reports-warehouses-input-output-inventory',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-input-output-inventory/reports-warehouses-input-output-inventory-list/ReportsWarehousesInputOutputInventoryList.vue'),
    meta: {
      pageTitle: 'Báo cáo xuất nhập tồn',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo xuất nhập tồn',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesInputOutputInventory',
    },
  },
  // Báo cáo đổi hàng hỏng
  {
    path: '/reports/warehouses/exchange-damaged-goods',
    name: 'reports-warehouses-exchange-damaged-goods',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-exchange-damaged-goods/exchange-damaged-goods-list/ExchangeDamagedGoodsList.vue'),
    meta: {
      pageTitle: 'Báo cáo đổi hàng hỏng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo đổi hàng hỏng',
          active: true,
        },
      ],
      resource: 'ReportsWarehousesExchangeDamagedGoods',
    },
  },
  // Báo cáo doanh số hóa đơn theo KH
  {
    path: '/reports/sales/sale-per-customer',
    name: 'reports-sales-sale-per-customer',
    component: () => import('@/views/reports/reports-sales/reports-sales-sale-receipt-per-customer/sale-receipt-list/SaleReceiptList.vue'),
    meta: {
      pageTitle: 'Báo cáo doanh số hóa đơn theo khách hàng',
      breadcrumb: [
        {
          text: 'Báo cáo doanh số hóa đơn theo khách hàng',
          active: true,
        },
      ],
      resource: 'ReportsSalesSaleReceiptPerCustomer',
    },
  },
  // báo cáo khách hàng
  {
    path: '/reports/customers/customers',
    name: 'reports-customers',
    component: () => import('@/views/reports/reports-customers/reports-customers/reports-customers-list/ReportsCustomersList.vue'),
    meta: {
      pageTitle: 'Báo cáo khách hàng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo khách hàng',
          active: true,
        },
      ],
      resource: 'ReportsCustomers',
    },
  },
  // báo cáo khách hàng không giao dịch
  {
    path: '/reports/customers/customers-non-transactional',
    name: 'reports-customers-non-transactional',
    component: () => import('@/views/reports/reports-customers/reports-customers-non-transactional/reports-customers-non-transactional-list/ReportsCustomersNonTransactionalList.vue'),
    meta: {
      pageTitle: 'Báo cáo khách hàng không giao dịch',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo khách hàng không giao dịch',
          active: true,
        },
      ],
      resource: 'ReportsCustomersNonTransactional',
    },
  },
  // báo cáo hóa đơn theo loại giao hàng
  {
    path: '/reports/sales/receipt-on-delivery-type',
    name: 'reports-sales-receipt-on-delivery-type',
    component: () => import('@/views/reports/reports-sales/reports-sales-sale-receipt-on-delivery-type/sale-receipt-on-delivery-list/SaleReceiptOnDeliveryTypeList.vue'),
    meta: {
      pageTitle: 'Báo cáo hóa đơn theo loại giao hàng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo hóa đơn theo loại giao hàng',
          active: true,
        },
      ],
      resource: 'ReportsSalesReceiptOnDeliveryType',
    },
  },
  // báo cáo bảng kê chi tiết đơn nhập hàng
  {
    path: '/reports/purchases',
    name: 'reports-purchases',
    component: () => import('@/views/reports/reports-purchases/reports-purchases-list/ReportsPuchasesList.vue'),
    meta: {
      pageTitle: 'Bảng kê chi tiết đơn nhập hàng',
      breadcrumb: [
        {
          text: 'Bảng kê chi tiết đơn nhập hàng',
          active: true,
        },
      ],
      resource: 'ReportsPurchases',
    },
  },
  // báo cáo bán hàng
  {
    path: '/reports/sales',
    name: 'reports-sales',
    component: () => import('@/views/reports/reports-sales/reports-sales/reports-sales-list/ReportsSalesList.vue'),
    meta: {
      pageTitle: 'Báo cáo bán hàng',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo bán hàng',
          active: true,
        },
      ],
      resource: 'ReportsSales',
    },
  },
  // báo cáo doanh số CAT
  {
    path: '/reports/sales/cat-sale',
    name: 'reports-sales-cat-sale',
    component: () => import('@/views/reports/reports-sales/reports-sales-cat/reports-sales-cat-list/ReportsSalesCatList.vue'),
    meta: {
      pageTitle: 'Báo cáo doanh số CAT',
      breadcrumb: [
        {
          text: 'Danh sách báo cáo doanh số CAT',
          active: true,
        },
      ],
      resource: 'ReportsSalesCatSale',
    },
  },
  // báo cáo số lượng hóa đơn theo khách hàng
  {
    path: '/reports/sales/amount-per-customer',
    name: 'reports-sales-amount-per-customer',
    component: () => import('@/views/reports/reports-sales/reports-sales-amount-receipt-per-customers/reports-sales-amount-receipt-per-customers-list/ReportsSalesAmountReceiptPerCustomersList.vue'),
    meta: {
      pageTitle: 'Báo cáo số lượng hóa đơn theo khách hàng',
      breadcrumb: [
        {
          text: 'Danh sách số lượng hóa đơn theo khách hàng',
          active: true,
        },
      ],
      resource: 'ReportsSalesAmountReceiptPerCustomer',
    },
  },
  // báo cáo danh sách voucher
  {
    path: '/reports/vouchers',
    name: 'reports-vouchers',
    component: () => import('@/views/reports/reports-vouchers/reports-vouchers-list/ReportsVouchersList.vue'),
    meta: {
      pageTitle: 'Báo cáo danh sách voucher',
      breadcrumb: [
        {
          text: 'Danh sách voucher',
          active: true,
        },
      ],
      resource: 'ReportsVouchers',
    },
  },
]
