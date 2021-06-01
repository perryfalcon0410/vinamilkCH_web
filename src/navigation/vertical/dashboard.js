export default [
  {
    title: 'Trang chủ',
    icon: 'HomeIcon',
    tag: '2',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Thương mại điện tử',
        route: 'dashboard-ecommerce',
        resource: 'DashboardEcommerce',
      },
      {
        title: 'Phân tích',
        route: 'dashboard-analytics',
        resource: 'DashboardAnalytics',
      },
    ],
  },
]
