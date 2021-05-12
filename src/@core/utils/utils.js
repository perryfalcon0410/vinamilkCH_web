import router from '@/router'
import {
  reactive,
  getCurrentInstance,
  watch,
  toRefs,
} from '@vue/composition-api'
import customerData from '@/@db/customer'
import commonData from '@/@db/common'
import warehousesData from '@/@db/warehouses'

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

export const getGenderLabel = id => {
  if (id) {
    return commonData.genders.find(item => `${item.id}` === `${id}`).label
  }
  return null
}

export const getCustomerTypeLabel = id => {
  if (id) {
    return customerData.customerTypes.find(item => `${item.id}` === `${id}`).label
  }
  return null
}

export const getCustomerStatusLabel = id => {
  if (id) {
    return customerData.status.find(item => `${item.id}` === `${id}`).label
  }
  return ''
}
export const getWarehousesStatuslabel = id => {
  if (id) {
    return warehousesData.transTypes.find(item => `${item.id}` === `${id}`).label
  }
  return ''
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

export const capitalizeFirstLetter = string => {
  if (string) {
    const sentence = string.toLowerCase()
    const titleCaseSentence = sentence.replace(/^[a-zA-Z]/, string[0].toUpperCase())
    return titleCaseSentence
  }
  return string
}

export const getNow = () => {
  const date = this.$moment().format('DD/MM/YYYY')
  const time = this.$moment().format('hh:mm')
  const dateTime = `${date} lúc ${time}`
  return dateTime
}

export const isEmpty = value => value === undefined || value === '' || value === null

export const getDateNow = () => {
  const date = new Date()

  const yyyy = date.getFullYear()
  let MM = date.getMonth() + 1
  let dd = date.getDate()
  let mm = date.getMinutes()
  let hh = date.getHours()

  if (dd < 10) {
    dd = `0${dd}`
  }
  if (MM < 10) {
    MM = `0${MM}`
  }

  if (mm < 10) {
    mm = `0${mm}`
  }

  if (hh < 10) {
    hh = `0${hh}`
  }

  return `${yyyy}-${MM}-${dd} lúc ${hh}:${mm}`
}
