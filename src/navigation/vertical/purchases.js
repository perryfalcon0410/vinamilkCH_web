export default [
  // {
  //   header: 'Purchases',
  // },
  // {
  //   title: 'Purchases',
  //   route: 'purchases',
  //   icon: 'ShoppingCartIcon',
  //   resource: 'Purchases',
  // },
  {
  title: 'Purchases',
    icon: 'ShoppingCartIcon',
    tag: '5',
    tagVariant: 'light-warning',
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
