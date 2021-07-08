import { shallowMount } from '@vue/test-utils'
import SalesCustomersListSearch from '@/views/sales/sales-customers/sales-customers-list/components/SalesCustomersListSearch.vue'

describe('SalesCustomersListSearch', () => {
  let fieldCustomerName;
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(SalesCustomersListSearch)
    fieldCustomerName = wrapper.find('#customerName')
    wrapper.setData({ customerName: 'Tester' })
    expect(fieldCustomerName.element.value).toEqual('Tester')
  })
})
