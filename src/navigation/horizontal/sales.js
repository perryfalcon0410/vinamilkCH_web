export default [
  {
    header: 'Bán hàng',
    icon: 'ShoppingCartIcon',
    children: [
      {
        title: 'Bán hàng',
        route: 'sales-sales',
        icon: 'ShoppingCartIcon',
        resource: 'Sales',
      },
      {
        title: 'Khách hàng',
        route: 'sales-customers',
        icon: 'UsersIcon',
        resource: 'SalesCustomers',
      },
      {
        title: 'Hoá đơn đỏ',
        route: 'sales-red-bills',
        icon: 'ShoppingCartIcon',
        resource: 'SalesRedBills',
      },
      {
        title: 'Hoá đơn bán hàng',
        route: 'sales-receipts',
        icon: 'ShoppingCartIcon',
        resource: 'SalesReceipts',
      },
      {
        title: 'Hàng trả lại',
        route: 'sales-returned-goods',
        icon: 'ArrowLeftCircleIcon',
        resource: 'SalesReturnedGoods',
      },
    ],
  },
]
