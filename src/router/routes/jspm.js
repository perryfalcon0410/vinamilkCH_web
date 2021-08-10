export default [
  {
    path: '/jspm',
    name: 'jspm',
    component: () => import('@/views/jspm/PrinterLicenseRegistration.vue'),
    meta: {
      layout: 'full',
      resource: 'PrinterLicenseRegistration',
      // redirectIfLoggedIn: true,
    },
  },
]
