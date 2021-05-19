export default [
  {
    header: 'Báo cáo',
    icon: 'BarChartIcon',
    children: [
      {
        title: 'Hàng trả lại',
        route: 'reports-returned-goods',
        icon: 'ArrowLeftCircleIcon',
      },
      {
        title: 'Kho',
        icon: 'ArchiveIcon',
        children: [
          {
            title: 'Nhập hàng',
            route: '',
          },
          {
            title: 'Xuất hàng',
            route: '',
          },
          {
            title: 'Tồn kho',
            route: '',
          },
          {
            title: 'Xuất nhập tồn',
            route: '',
          },
          {
            title: 'Hàng khuyến mãi',
            route: '',
          },
          {
            title: 'Chênh lệch giá',
            route: 'reports-warehouses-difference-price',
          },
          {
            title: 'Đổi hàng hỏng',
            route: '',
          },
          {
            title: 'Nhập xuất điều chỉnh',
            route: '',
          },
        ],
      },
      {
        title: 'Bảng kê chi tiết đơn nhập hàng',
        route: '',
        icon: 'MapIcon',
      },
      {
        title: 'Bán hàng',
        route: '',
        icon: 'ShoppingCartIcon',
      },
      {
        title: 'Khách hàng',
        route: '',
        icon: 'UsersIcon',
      },
      {
        title: 'Danh sách voucher',
        route: '',
        icon: 'GiftIcon',
      },
    ],
  },
]
