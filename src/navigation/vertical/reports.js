export default [
  {
    header: 'Báo cáo',
  },
  {
    title: 'Hàng trả lại',
    route: 'reports-returned-goods',
    icon: 'ArrowLeftCircleIcon',
    resource: 'ReportsReturnedGoods',
  },
  {
    title: 'Kho',
    route: '',
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
    route: 'reports-purchases',
    resource: 'ReportsPurchases',
    icon: 'MapIcon',
  },
  {
    title: 'Bán hàng',
    route: 'reports-sales',
    resource: 'ReportsSales',
    icon: 'ShoppingCartIcon',
  },
  {
    title: 'Khách hàng',
    route: 'reports-customers',
    resource: 'ReportsCustomers',
    icon: 'UsersIcon',
  },
  {
    title: 'Danh sách voucher',
    route: 'reports-vouchers',
    resource: 'ReportsVouchers',
    icon: 'GiftIcon',
  },
]
