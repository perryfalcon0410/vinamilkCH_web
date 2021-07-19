export default [
  {
    header: 'Home',
    icon: 'HomeIcon',
    children: [
      {
        title: 'eCommerce',
        route: 'dashboard-ecommerce',
        icon: 'ShoppingCartIcon',
        resource: 'DashboardEcommerce',
      },
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
        icon: 'ActivityIcon',
        resource: 'DashboardAnalytics',
      },
    ],
  },
]
