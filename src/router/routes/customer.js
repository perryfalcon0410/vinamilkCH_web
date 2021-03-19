export default [
  {
    path: '/home/customerList',
    name: 'home-customerList',
    component: () => import('@/views/customer/CustomerList/CustomerList.vue'),
  },
  {
    path: '/home/customerList/customerAdd',
    name: 'customerList-customerAdd',
    component: () => import('@/views/customer/CustomerAdd.vue'),
  },
  {
    path: '/home/customerList/customerUpdate',
    name: 'customerList-customerUpdate',
    component: () => import('@/views/customer/CustomerUpdate.vue'),
  },
]
