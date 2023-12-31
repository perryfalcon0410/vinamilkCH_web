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
  ],
  saleChannels: [
    { id: '1', label: 'Offline' },
    { id: '2', label: 'Online' },
  ],

  outputTypes: [
    { id: '0', label: 'Xuất trả PO' },
    { id: '1', label: 'Xuất điều chỉnh' },
    { id: '2', label: 'Xuất vay mượn' },
  ],
}
