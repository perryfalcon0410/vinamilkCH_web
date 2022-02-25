export default [
  {
    header: 'Purchases',
    icon: 'ShoppingCartIcon',
    children: [
      {
        title: 'CreatePO',
        route: 'purchases-create',
        icon: 'ShoppingCartIcon',
        resource: 'PurchasesPOCreate',
      },
      {
        title: 'ListPO',
        route: 'purchases-list',
        icon: 'ShoppingCartIcon',
        resource: 'PurchasesPOList',
      },
    ],
  },
]
