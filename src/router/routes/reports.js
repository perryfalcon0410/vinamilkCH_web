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
    },
  },

  // Bao cao Xuat hang
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
    },
  },

  // Bao cao Ton kho
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
    },
  },

  // Báo cáo chênh lệch giá
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
    },
  },
]
