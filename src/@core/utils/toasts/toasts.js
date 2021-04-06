import Vue from 'vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const success = text => {
  Vue.$toast({
    component: ToastificationContent,
    position: 'top-right',
    props: {
      title: 'Thông báo',
      icon: 'CheckIcon',
      variant: 'success',
      text,
    },
  })
}

const warning = text => {
  Vue.$toast({
    component: ToastificationContent,
    position: 'top-right',
    props: {
      title: 'Thông báo',
      icon: 'AlertCircleIcon',
      variant: 'warning',
      text,
    },
  })
}

const error = text => {
  Vue.$toast({
    component: ToastificationContent,
    position: 'top-right',
    props: {
      title: 'Thông báo',
      icon: 'AlertCircleIcon',
      variant: 'danger',
      text,
    },
  })
}

export default {
  success,
  warning,
  error,
}
