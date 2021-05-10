import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import dashboard from './routes/dashboard'
import sales from './routes/sales'
import purchases from './routes/purchases'
import warehouses from './routes/warehouses'
import reports from './routes/reports'
import auth from './routes/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_HREF,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-ecommerce' } },
    ...auth, // Xác thực
    ...dashboard, // Trang chủ
    ...sales, // Bán hàng
    ...purchases, // Mua hàng
    ...warehouses, // Kho
    ...reports, // Báo cáo
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'auth-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  if (to.meta.breadcrumb || to.meta.pageTitle) {
    const lastItemBreadcrumb = to.meta.breadcrumb.length - 1
    document.title = `${to.meta.pageTitle} | ${to.meta.breadcrumb[lastItemBreadcrumb].text}` || 'Kênh cửa hàng'
  }

  return next()
})

export default router
