export default [
  {
    path: '/home/customerList',
    name: 'home-customerList',
    component: () => import('@/views/customer/customerList.vue'),
  },
  {
    path: '/home/customerList/customerAdd',
    name: 'customerList-customerAdd',
    component: () => import('@/views/customer/customerAdd.vue'),
  },
  {
    path: '/home/customerList/customerUpdate',
    name: 'customerList-customerUpdate',
    component: () => import('@/views/customer/customerUpdate.vue'),
  },
]
