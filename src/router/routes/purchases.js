export default [
  {
    path: '/purchases/list',
    name: 'purchases-list',
    component: () => import('@/views/purchases/purchases-po-list/PurchasesPOList.vue'),
    meta: {
      pageTitle: 'Mua hàng',
      breadcrumb: [
        {
          text: 'Danh sách PO',
          active: true,
        },
      ],
      resource: 'PurchasesPOList',
    },
  },

  {
    path: '/purchases/create',
    name: 'purchases-create',
    component: () => import('@/views/purchases/purchases-po-create/PurchasesPOCreate.vue'),
    meta: {
      pageTitle: 'Mua hàng',
      breadcrumb: [
        {
          text: 'Danh sách PO',
          to: '/purchases',
        },
        {
          text: 'Lập đơn PO',
          active: true,
        },
      ],
      resource: 'PurchasesPOCreate',
    },
  },
]
