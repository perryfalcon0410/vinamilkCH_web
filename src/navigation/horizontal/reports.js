export default [
  {
    header: 'Báo cáo',
    icon: 'BarChartIcon',
    children: [
      {
        title: 'Hàng trả lại',
        route: 'reports-returned-goods',
        icon: 'ArrowLeftCircleIcon',
        resource: 'ReportsReturnedGoods',
      },
      {
        title: 'Kho',
        icon: 'ArchiveIcon',
        children: [
          {
            title: 'Nhập hàng',
            route: 'reports-warehouses-input',
            resource: 'ReportsWarehousesInput',
          },
          {
            title: 'Xuất hàng',
            route: 'reports-warehouses-output',
            resource: 'ReportsWarehousesOutput',
          },
          {
            title: 'Tồn kho',
            route: 'reports-warehouses-inventory',
            resource: 'ReportsWarehousesInventory',
          },
          {
            title: 'Xuất nhập tồn',
            route: 'reports-warehouses-input-output-inventory',
            resource: 'ReportsWarehousesInputOutputInventory',
          },
          {
            title: 'Hàng khuyến mãi',
            route: 'reports-warehouses-promotion',
            resource: 'ReportsWarehousesPromotions',
          },
          {
            title: 'Chênh lệch giá',
            route: 'reports-warehouses-difference-price',
            resource: 'ReportsWarehousesPriceDifference',
          },
          {
            title: 'Đổi hàng hỏng',
            route: 'reports-warehouses-exchange-damaged-goods',
            resource: 'ReportsWarehousesExchangeDamagedGoods',
          },
          {
            title: 'Nhập xuất điều chỉnh',
            route: 'reports-warehouses-adjustment',
            resource: 'ReportsWarehousesAdjustment',
          },
        ],
      },
      {
        title: 'Bảng kê chi tiết đơn nhập hàng',
        route: 'reports-input-details',
        resource: 'ReportsWarehouseInputDetails',
        icon: 'MapIcon',
      },
      {
        title: 'Bán hàng',
        icon: 'ShoppingCartIcon',
        children: [
          {
            title: 'Bán hàng',
            route: 'reports-sales',
            resource: 'ReportsSales',
          },
          {
            title: 'Doanh số CAT',
            route: 'reports-sales-cat-sale',
            resource: 'ReportsSalesCatSale',
          },
          {
            title: 'Doanh số hóa đơn theo KH',
            route: 'reports-sales-sale-per-customer',
            resource: 'ReportsSalesSaleReceiptPerCustomer',
          },
          {
            title: 'Số lượng hóa đơn theo KH',
            route: 'reports-sales-amount-per-customer',
            resource: 'ReportsSalesAmountReceiptPerCustomer',
          },
          {
            title: 'Hóa đơn theo loại giao hàng',
            route: 'reports-sales-receipt-on-delivery-type',
            resource: 'ReportsSalesReceiptOnDeliveryType',
          },
        ],
      },
      {
        title: 'Khách hàng',
        icon: 'UsersIcon',
        children: [
          {
            title: 'Khách hàng',
            route: 'reports-customers',
            resource: 'ReportsCustomers',
          },
          {
            title: 'Khách hàng không giao dịch',
            route: 'reports-customers-non-transactional',
            resource: 'ReportsCustomersNonTransactional',
          },
        ],
      },
      {
        title: 'Danh sách voucher',
        route: 'reports-vouchers',
        resource: 'ReportsVouchers',
        icon: 'GiftIcon',
      },
    ],
  },
]
