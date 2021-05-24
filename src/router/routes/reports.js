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
  // Bao cao hang khuyen mai
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
    },
  },

  // Bao cao nhap xuat dieu chinh
  {
    path: '/reports/warehouses/adjustment',
    name: 'reports-warehouses-adjustment',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-adjustment/reports-warehouses-adjustment-list/ReportsWarehousesAdjustmentList.vue'),
    meta: {
      pageTitle: 'Báo cáo nhập xuất điều chỉnh',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm nhập xuất điểu chỉnh',
        },
      ],
    },
  },
  // Báo cáo nhập hàng
  {
    path: '/reports/warehouses/input',
    name: 'reports-warehouses-input',
    component: () => import('@/views/reports/reports-warehouses/reports-warehouses-input/reports-warehouses-input-list/ReportsWarehousesInputList.vue'),
    meta: {
      pageTitle: 'Báo cáo nhập hàng',
      breadcrumb: [
        {
          text: 'Danh sách sản phẩm',
          active: true,
        },
      ],
    },
  },
]
