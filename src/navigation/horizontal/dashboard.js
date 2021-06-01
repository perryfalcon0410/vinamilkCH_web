export default [
  {
    header: 'Trang chủ',
    icon: 'HomeIcon',
    children: [
      {
        title: 'Thương mại điện tử',
        route: 'dashboard-ecommerce',
        icon: 'ShoppingCartIcon',
        resource: 'DashboardEcommerce',
      },
      {
        title: 'Phân tích',
        route: 'dashboard-analytics',
        icon: 'ActivityIcon',
        resource: 'DashboardAnalytics',
      },
    ],
  },
]
