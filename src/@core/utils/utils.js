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
    case 1:
      return 'Nam'
    case 2:
      return 'Nữ'
    default:
      return 'Khác'
  }
}

export const formatURLParams = obj => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName]
    }
  }
  return obj
}

export const formatDate = date => {
  if (date) {
    return new Date(date).toISOString().slice(0, 10).replaceAll('-', '/')
  }
  return ''
}
