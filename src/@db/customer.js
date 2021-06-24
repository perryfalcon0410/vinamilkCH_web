import store from '@/store'
import Vue from 'vue'
import {
  CUSTOMER,
  // GETTERS
  CUSTOMER_TYPES_GETTER,
} from '@/views/sales/sales-customers/store-module/type'

const vm = new Vue({
  computed: {
    getCustomerTypes() {
      return store.getters[`${CUSTOMER}/${CUSTOMER_TYPES_GETTER}`]
    },
    customerTypeOptions() {
      return this.getCustomerTypes.map(e => ({
        id: e.id,
        label: e.name,
      }))
    },
  },
})

// setTimeout(() => {
//   console.log(vm.customerTypeOptions)
// }, 3000)

export default {
  status: [
    { id: '1', label: 'Hoạt động' },
    { id: '0', label: 'Ngưng hoạt động' },
  ],
  // TODO:  Anh Sang cứu em chỗ này với ạ, thằng vm.customerTypeOptions có dữ liệu
  // nhưng hàm getCustomerTypeLabel ở @core/ultils thì bị lặp và ko có dữ liệu của thằng vm.customerTypeOptions
  customerTypes: vm.customerTypeOptions.length ? vm.customerTypeOptions : [
    { id: '1', label: 'Khách hàng thân thiết' },
    { id: '2', label: 'Khách hàng thường' },
    { id: '21', label: 'Khách hàng VIP' },
  ],
}
