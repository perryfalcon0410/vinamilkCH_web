export default {
  reasonTypes: [
    { id: 'BUYMORE', label: 'Mua thêm' },
    { id: 'CHANGEITEM', label: 'Trả hàng' },
    { id: 'BREAKITEM', label: 'Hàng hỏng' },
  ],

  inputTypes: [
    { id: '0', label: 'Nhập hàng' },
    { id: '1', label: 'Nhập điều chỉnh' },
    { id: '2', label: 'Nhập vay mượn' },
    { id: '3', label: 'Xuất trả PO' },
  ],
  saleChannels: [
    { id: '1', label: 'Offline' },
    { id: '2', label: 'Online' },
  ],
  deliveryTypes: [
    { id: '1', label: 'Tất cả' },
    { id: '2', label: 'Giao tại cửa hàng ' },
    { id: '3', label: 'Giao hàng tận nhà' },
    { id: '4', label: 'Giao hàng đơn online' },
    { id: '5', label: 'Giao hàng grab' },
  ],
}
