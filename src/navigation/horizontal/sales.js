export default [
  {
    header: 'Sales',
    icon: 'ShoppingCartIcon',
    children: [
      {
        title: 'Sales',
        route: 'sales-sales',
        icon: 'ShoppingCartIcon',
        resource: 'Sales',
      },
      {
        title: 'Customer',
        route: 'sales-customers',
        icon: 'UsersIcon',
        resource: 'SalesCustomers',
      },
      {
        title: 'RedBills',
        route: 'sales-red-bills',
        icon: 'ShoppingCartIcon',
        resource: 'SalesRedBills',
      },
      {
        title: 'Receipts',
        route: 'sales-receipts',
        icon: 'ShoppingCartIcon',
        resource: 'SalesReceipts',
      },
      {
        title: 'ReturnGood',
        route: 'sales-returned-goods',
        icon: 'ArrowLeftCircleIcon',
        resource: 'SalesReturnedGoods',
      },
    ],
  },
]
