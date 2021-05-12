export default {
  outputTypes: [
    { id: '0', name: 'Xuất trả PO' },
    { id: '1', name: 'Xuất điều chỉnh' },
    { id: '2', name: 'Xuất vay mượn' },
  ],
  inputTypes: [
    { id: '0', label: 'Nhập hàng' },
    { id: '1', label: 'Nhập điều chỉnh' },
    { id: '2', label: 'Nhập vay mượn' },
  ],
  reasonTypes: [
    { id: '0', name: 'Hàng hỏng tại cửa hàng' },
    { id: '1', name: 'Hàng hỏng do khách hàng mua tại cửa hàng' },
    { id: '2', name: 'Hàng hỏng do khách hàng mua tại điểm lẻ' },
  ],
  tradingTypes: [
    { id: '0', name: 'Nhập chuyển đổi' },
    { id: '1', name: 'Xuất chuyển đổi' },
  ],
  transTypes: [
    { id: '1', label: 'Nhập chuyển đổi' },
    { id: '2', label: 'Xuất chuyển đổi' },
  ],
}
