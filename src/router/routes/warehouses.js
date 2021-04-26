export default [
  // Nhập hàng
  {
    path: '/warehouses/input',
    name: 'warehouses-input',
    component: () => import('@/views/warehouses/warehouses-input/warehouses-input-list/WarehousesInputList.vue'),
    meta: {
      pageTitle: 'Nhập hàng',
      breadcrumb: [
        {
          text: 'Danh sách nhập hàng',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/input/create',
    name: 'warehouses-input-create',
    component: () => import('@/views/warehouses/warehouses-input/warehouses-input-create/WarehousesInputCreate.vue'),
    meta: {
      pageTitle: 'Nhập hàng',
      breadcrumb: [
        {
          text: 'Danh sách nhập hàng',
          to: '/warehouses/input',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/input/update',
    name: 'warehouses-input-update',
    component: () => import('@/views/warehouses/warehouses-input/warehouses-input-update/WarehousesInputUpdate.vue'),
    meta: {
      pageTitle: 'Nhập hàng',
      breadcrumb: [
        {
          text: 'Danh sách nhập hàng',
          to: '/warehouses/input',
        },
        {
          text: 'Cập nhật',
          active: true,
        },
      ],
    },
  },
  // Xuất hàng
  {
    path: '/warehouses/output',
    name: 'warehouses-output',
    component: () => import('@/views/warehouses/warehouses-output/warehouses-output-list/WarehousesOutputList.vue'),
    meta: {
      pageTitle: 'Xuất hàng',
      breadcrumb: [
        {
          text: 'Danh sách xuất hàng',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/output/create',
    name: 'warehouses-output-create',
    component: () => import('@/views/warehouses/warehouses-output/warehouses-output-create/WarehousesOutputCreate.vue'),
    meta: {
      pageTitle: 'Xuất hàng',
      breadcrumb: [
        {
          text: 'Danh sách xuất hàng',
          to: '/warehouses/output',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/output/:id/type/:type/update',
    name: 'warehouses-output-update',
    component: () => import('@/views/warehouses/warehouses-output/warehouses-output-update/WarehousesOutputUpdate.vue'),
    meta: {
      pageTitle: 'Xuất hàng',
      breadcrumb: [
        {
          text: 'Danh sách xuất hàng',
          to: '/warehouses/output',
        },
        {
          text: 'Cập nhật',
          active: true,
        },
      ],
    },
  },
  // Kiểm kê
  {
    path: '/warehouses/inventory',
    name: 'warehouses-inventory',
    component: () => import('@/views/warehouses/warehouses-inventory/warehouses-inventory-list/WarehousesInventoryList.vue'),
    meta: {
      pageTitle: 'Kiểm kê',
      breadcrumb: [
        {
          text: 'Danh sách kiểm kê',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/inventory/create',
    name: 'warehouses-inventory-create',
    component: () => import('@/views/warehouses/warehouses-inventory/warehouses-inventory-create/WarehousesInventoryCreate.vue'),
    meta: {
      pageTitle: 'Kiểm kê',
      breadcrumb: [
        {
          text: 'Danh sách kiểm kê',
          to: '/warehouses/inventory',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/inventory/update',
    name: 'warehouses-inventory-update',
    component: () => import('@/views/warehouses/warehouses-inventory/warehouses-inventory-update/WarehousesInventoryUpdate.vue'),
    meta: {
      pageTitle: 'Kiểm kê',
      breadcrumb: [
        {
          text: 'Danh sách kiểm kê',
          to: '/warehouses/inventory',
        },
        {
          text: 'Cập nhật',
          active: true,
        },
      ],
    },
  },
  // Đổi hàng hỏng
  {
    path: '/warehouses/exchange-damaged-goods',
    name: 'warehouses-exchange-damaged-goods',
    component: () => import('@/views/warehouses/warehouses-exchange-damaged-goods/warehouses-exchange-damaged-goods-list/WarehousesExchangeDamagedGoodsList.vue'),
    meta: {
      pageTitle: 'Đổi hàng hỏng',
      breadcrumb: [
        {
          text: 'Danh sách đổi hàng hỏng',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/exchange-damaged-goods/create',
    name: 'warehouses-exchange-damaged-goods-create',
    component: () => import('@/views/warehouses/warehouses-exchange-damaged-goods/warehouses-exchange-damaged-goods-create/WarehousesExchangeDamagedGoodsCreate.vue'),
    meta: {
      pageTitle: 'Đổi hàng hỏng',
      breadcrumb: [
        {
          text: 'Danh sách đổi hàng hỏng',
          to: '/warehouses/exchange-damaged-goods',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
    },
  },
  // Combo
  {
    path: '/warehouses/combo',
    name: 'warehouses-combo',
    component: () => import('@/views/warehouses/warehouses-combo/warehouses-combo-list/WarehousesComboList.vue'),
    meta: {
      pageTitle: 'Combo',
      breadcrumb: [
        {
          text: 'Danh sách combo',
          active: true,
        },
      ],
    },
  },
  {
    path: '/warehouses/combo/create',
    name: 'warehouses-combo-create',
    component: () => import('@/views/warehouses/warehouses-combo/warehouses-combo-create/WarehousesComboCreate.vue'),
    meta: {
      pageTitle: 'Kho',
      breadcrumb: [
        {
          text: 'Danh sách combo',
          to: '/warehouses/combo',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
    },
  },
]
