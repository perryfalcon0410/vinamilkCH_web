export default [
  {
    header: 'Kho',
    icon: 'ArchiveIcon',
    children: [
      {
        title: 'Nhập hàng',
        route: 'warehouses-input',
        icon: 'SkipBackIcon',
      },
      {
        title: 'Xuất hàng',
        route: 'warehouses-output',
        icon: 'SkipForwardIcon',
      },
      {
        title: 'Kiểm kê',
        route: 'warehouses-inventory',
        icon: 'FileTextIcon',
      },
      {
        title: 'Đổi hàng hỏng',
        route: 'warehouses-exchange-damaged-goods',
        icon: 'RepeatIcon',
      },
      {
        title: 'Combo',
        route: 'warehouses-combo',
        icon: 'LayersIcon',
      },
    ],
  },
]
