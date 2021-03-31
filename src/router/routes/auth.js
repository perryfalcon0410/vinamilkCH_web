export default [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/reset-password',
    name: 'auth-reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/not-authorized',
    name: 'auth-not-authorized',
    component: () => import('@/views/auth/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
]
