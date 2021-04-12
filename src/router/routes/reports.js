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
    path: '/reports/warehouses-output',
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
]
