export default [
  {
    title: 'Home',
    icon: 'HomeIcon',
    tag: '2',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'eCommerce',
        route: 'dashboard-ecommerce',
        resource: 'DashboardEcommerce',
      },
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
        resource: 'DashboardAnalytics',
      },
    ],
  },
]
