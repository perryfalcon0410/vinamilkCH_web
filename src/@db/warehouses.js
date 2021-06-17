export default {
  outputTypes: [
    { id: '1', label: 'Xuất trả PO' },
    { id: '2', label: 'Xuất điều chỉnh' },
    { id: '3', label: 'Xuất vay mượn' },
  ],
  inputTypes: [
    { id: '1', label: 'Nhập hàng' },
    { id: '2', label: 'Nhập điều chỉnh' },
    { id: '3', label: 'Nhập vay mượn' },
  ],
  reasonTypes: [
    { id: '0', label: 'Hàng hỏng tại cửa hàng' },
    { id: '1', label: 'Hàng hỏng do khách hàng mua tại cửa hàng' },
    { id: '2', label: 'Hàng hỏng do khách hàng mua tại điểm lẻ' },
  ],
  tradingTypes: [
    { id: '1', label: 'Nhập chuyển đổi' },
    { id: '2', label: 'Xuất chuyển đổi' },
  ],
  transTypes: [
    { id: '1', label: 'Nhập chuyển đổi' },
    { id: '2', label: 'Xuất chuyển đổi' },
  ],
  warehousesType: [
    { id: '1', label: 'Nhập hàng' },
    { id: '2', label: 'Xuất hàng' },
  ],
}
