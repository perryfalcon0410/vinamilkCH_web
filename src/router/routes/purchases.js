export default [
  {
    path: '/purchases',
    name: 'purchases',
    component: () => import('@/views/purchases/purchases-po-list/PurchasesPOList.vue'),
    meta: {
      pageTitle: 'Mua hàng',
      breadcrumb: [
        {
          text: 'Danh sách PO',
          active: true,
        },
      ],
      resource: 'Purchases',
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
      resource: 'PurchasesCreate',
    },
  },
]
