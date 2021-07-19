export default [
  {
    header: 'Report',
    icon: 'BarChartIcon',
    children: [
      {
        title: 'ReturnGood',
        route: 'reports-returned-goods',
        icon: 'ArrowLeftCircleIcon',
        resource: 'ReportsReturnedGoods',
      },
      {
        title: 'Warehouse',
        icon: 'ArchiveIcon',
        children: [
          {
            title: 'Input',
            route: 'reports-warehouses-input',
            resource: 'ReportsWarehousesInput',
          },
          {
            title: 'Output',
            route: 'reports-warehouses-output',
            resource: 'ReportsWarehousesOutput',
          },
          {
            title: 'Stock',
            route: 'reports-warehouses-inventory',
            resource: 'ReportsWarehousesInventory',
          },
          {
            title: 'InputOutputInventory',
            route: 'reports-warehouses-input-output-inventory',
            resource: 'ReportsWarehousesInputOutputInventory',
          },
          {
            title: 'Promotion',
            route: 'reports-warehouses-promotion',
            resource: 'ReportsWarehousesPromotions',
          },
          {
            title: 'DifferencePrice',
            route: 'reports-warehouses-difference-price',
            resource: 'ReportsWarehousesPriceDifference',
          },
          {
            title: 'ExchangeGoods',
            route: 'reports-warehouses-exchange-damaged-goods',
            resource: 'ReportsWarehousesExchangeDamagedGoods',
          },
          {
            title: 'Adjustment',
            route: 'reports-warehouses-adjustment',
            resource: 'ReportsWarehousesAdjustment',
          },
        ],
      },
      {
        title: 'InputDetails',
        route: 'reports-input-details',
        resource: 'ReportsWarehouseInputDetails',
        icon: 'MapIcon',
      },
      {
        title: 'Sales',
        icon: 'ShoppingCartIcon',
        children: [
          {
            title: 'Sales',
            route: 'reports-sales',
            resource: 'ReportsSales',
          },
          {
            title: 'CatSale',
            route: 'reports-sales-cat-sale',
            resource: 'ReportsSalesCatSale',
          },
          {
            title: 'SalePerCustomer',
            route: 'reports-sales-sale-per-customer',
            resource: 'ReportsSalesSaleReceiptPerCustomer',
          },
          {
            title: 'BillPerCustomer',
            route: 'reports-sales-amount-per-customer',
            resource: 'ReportsSalesAmountReceiptPerCustomer',
          },
          {
            title: 'ReceiptOnDeliveryType',
            route: 'reports-sales-receipt-on-delivery-type',
            resource: 'ReportsSalesReceiptOnDeliveryType',
          },
        ],
      },
      {
        title: 'Customer',
        icon: 'UsersIcon',
        children: [
          {
            title: 'Customer',
            route: 'reports-customers',
            resource: 'ReportsCustomers',
          },
          {
            title: 'CustomerNonTransactional',
            route: 'reports-customers-non-transactional',
            resource: 'ReportsCustomersNonTransactional',
          },
        ],
      },
      {
        title: 'Vouchers',
        route: 'reports-vouchers',
        resource: 'ReportsVouchers',
        icon: 'GiftIcon',
      },
    ],
  },
]
