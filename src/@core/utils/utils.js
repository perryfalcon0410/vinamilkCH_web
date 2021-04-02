import router from '@/router'
// eslint-disable-next-line object-curly-newline
import { reactive, getCurrentInstance, watch, toRefs } from '@vue/composition-api'

export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
  const { route: resolvedRoute } = router.resolve(route)
  return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy
  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const getGenderLabel = gender => {
  switch (gender) {
    case 0:
      return 'Nữ'
    case 1:
      return 'Nam'
    default:
      return 'Khác'
  }
}
