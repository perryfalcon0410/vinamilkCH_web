import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import SalesCustomersListSearch from '@/views/sales/sales-customers/sales-customers-list/components/SalesCustomersListSearch.vue'
import TreeSelect from '@riophae/vue-treeselect'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.use(TreeSelect)

describe('SalesCustomersListSearch', () => {
  let actions
  let getters
  let store
  let wrapper
  beforeEach(() => {
    actions = {
      onClickSearchButton: jest.fn(),
    }
    getters = {
      SHOP_LOCATIONS_SEARCH_GETTER: () => [
        {
          areaCode: '760',
          areaName: 'Quận 1',
          createdAt: '2021-03-30T10:31:59.428',
          createdBy: null,
          default: false,
          id: 49,
          provinceAndDistrictName: 'TP Hồ Chí Minh - Quận 1',
          updatedAt: null,
          updatedBy: null,
        },
        {
          areaCode: '001',
          areaName: 'Quận Ba Đình',
          createdAt: '2021-03-30T10:31:59.428',
          createdBy: null,
          default: false,
          id: 47,
          provinceAndDistrictName: 'Hà Nội - Quận Ba Đình',
          updatedAt: null,
          updatedBy: null,
        },
      ],
    }
    store = new Vuex.Store({
      actions,
      getters,
    })
    wrapper = shallowMount(SalesCustomersListSearch, { store, localVue })
  })

  it('test field phoneNumber of SalesCustomerListSearch', async () => {
    await wrapper.setData({ phoneNumber: '0364121908' })
    // phoneNumber
    const fieldPhoneNumber = wrapper.find('[data-test="phoneNumber"]')
    expect(fieldPhoneNumber.exists()).toBe(true)
    expect(fieldPhoneNumber.element.attributes.getNamedItem('value').value).toEqual('0364121908')
  })
  it('test field customerName of SalesCustomerListSearch', async () => {
    await wrapper.setData({ customerName: 'Nguyen Van A' })
    const fieldCustomerName = wrapper.find('[data-test="customerName"]')
    expect(fieldCustomerName.exists()).toBe(true)
    expect(fieldCustomerName.element.attributes.getNamedItem('value').value).toEqual('Nguyen Van A')
  })

  it('has a button search on SalesCustomerListSearch', async () => {
    expect(wrapper.contains('#btnSearch')).toBe(true)
    const btnSearch = wrapper.find('#btnSearch')
    const onClickSearchButton = jest.fn()
    wrapper.setMethods({ onClickSearchButton })
    // const spy = jest.spyOn(wrapper.vm, 'onClickSearchButton')
    // btnSearch.trigger('click')
    // await wrapper.vm.$nextTick()
    // expect(spy).toHaveBeenCalled()
    // jest.restoreAllMocks()
    btnSearch.trigger('click')
    expect(onClickSearchButton).toHaveBeenCalledTimes(1)
  })

  it('has class on search button', () => {
    const btnSearch = wrapper.find('#btnSearch')
    expect(btnSearch.contains('.btn-brand-1')).toBe(true)
    expect(btnSearch.contains('.h8')).toBe(true)
    expect(btnSearch.contains('.align-items-button-center')).toBe(true)
  })

  it('test snapshoot of SalesCustomerListSearch.vue', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // it('test field customerTypes of SalesCustomerListSearch', async () => {
  //   await wrapper.setData({
  //     customerTypeOptions: [
  //       { id: '0', label: 'Khách hàng thân thiên DLĐộng' },
  //       { id: '1', label: 'Khách hàng thường' },
  //       { id: '2', label: 'Khách hàng VIP' },
  //     ],
  //     customerTypesSelected: '1',
  //   })
  //   const fieldCustomerTypes = wrapper.find('[data-test="customerTypes"]')
  //   expect(fieldCustomerTypes.exists()).toBe(true)
  //   expect(fieldCustomerTypes.forest).toEqual('Khách hàng thường')
  //   expect(fieldCustomerTypes.vm).toEqual(['anything'])
  // })
})
