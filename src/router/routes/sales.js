export default [
  {
    path: '/sales/sales',
    name: 'sales-sales',
    component: () => import('@/views/sales/sales/sales-list/SalesList.vue'),
    meta: {
      pageTitle: 'Bán hàng',
      breadcrumb: [
        {
          text: 'Bán hàng',
          active: true,
        },
      ],
      resource: 'Sales',
    },
  },
  // Khách hàng
  {
    path: '/sales/customers',
    name: 'sales-customers',
    component: () => import('@/views/sales/sales-customers/sales-customers-list/SalesCustomersList.vue'),
    meta: {
      pageTitle: 'Khách hàng',
      breadcrumb: [
        {
          text: 'Danh sách khách hàng',
          active: true,
        },
      ],
      resource: 'SalesCustomers',
    },
  },
  {
    path: '/sales/customers/create',
    name: 'sales-customers-create',
    component: () => import('@/views/sales/sales-customers/sales-customers-create/SalesCustomersCreate.vue'),
    meta: {
      pageTitle: 'Khách hàng',
      breadcrumb: [
        {
          text: 'Danh sách khách hàng',
          to: '/sales/customers',
        },
        {
          text: 'Thêm mới',
          active: true,
        },
      ],
      resource: 'SalesCustomersCreate',
    },
  },
  {
    path: '/sales/customers/:id/update',
    name: 'sales-customers-update',
    component: () => import('@/views/sales/sales-customers/sales-customers-update/SalesCustomersUpdate.vue'),
    meta: {
      pageTitle: 'Khách hàng',
      breadcrumb: [
        {
          text: 'Danh sách khách hàng',
          to: '/sales/customers',
        },
        {
          text: 'Cập nhật',
          active: true,
        },
      ],
      resource: 'SalesCustomersUpdate',
    },
  },
  // Hoá đơn đỏ
  {
    path: '/sales/red-bills',
    name: 'sales-red-bills',
    component: () => import('@/views/sales/sales-red-bills/sales-red-bills-list/SalesRedBillsList.vue'),
    meta: {
      pageTitle: 'Hoá đơn đỏ',
      breadcrumb: [
        {
          text: 'Danh sách hoá đơn đỏ',
          active: true,
        },
      ],
      resource: 'SalesRedBills',
    },
  },
  {
    path: '/sales/red-bills/create',
    name: 'sales-red-bills-create',
    component: () => import('@/views/sales/sales-red-bills/sales-red-bills-create/SalesRedBillsCreate.vue'),
    meta: {
      pageTitle: 'Hoá đơn đỏ',
      breadcrumb: [
        {
          text: 'Danh sách hoá đơn đỏ',
          to: '/sales/red-bills',
        },
        {
          text: 'Tạo hoá đơn đỏ',
          active: true,
        },
      ],
      resource: 'SalesRedBillsCreate',
    },
  },
  // Hoá đơn bán hàng
  {
    path: '/sales/receipts',
    name: 'sales-receipts',
    component: () => import('@/views/sales/sales-receipts/sales-receipts-list/SalesReceiptsList.vue'),
    meta: {
      pageTitle: 'Hoá đơn bán hàng',
      breadcrumb: [
        {
          text: 'Danh sách hoá đơn bán hàng',
          active: true,
        },
      ],
      resource: 'SalesReceipts',
    },
  },
  // Hàng trả lại
  {
    path: '/sales/returned-goods',
    name: 'sales-returned-goods',
    component: () => import('@/views/sales/sales-returned-goods/sales-returned-goods-list/SalesReturnedGoodsList.vue'),
    meta: {
      pageTitle: 'Hàng trả lại',
      breadcrumb: [
        {
          text: 'Danh sách đơn trả hàng',
          active: true,
        },
      ],
      resource: 'SalesReturnedGoods',
    },
  },
  {
    path: '/sales/returned-goods/create',
    name: 'sales-returned-goods-create',
    component: () => import('@/views/sales/sales-returned-goods/sales-returned-goods-create/SalesReturnedGoodsCreate.vue'),
    meta: {
      pageTitle: 'Hàng trả lại',
      breadcrumb: [
        {
          text: 'Danh sách đơn trả hàng',
          to: '/sales/returned-goods',
        },
        {
          text: 'Tạo đơn trả hàng',
          active: true,
        },
      ],
      resource: 'SalesReturnedGoodsCreate',
    },
  },
]
