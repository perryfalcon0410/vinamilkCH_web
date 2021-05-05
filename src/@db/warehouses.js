export default {
  outputTypes: [
    { id: '0', name: 'Xuất trả PO' },
    { id: '1', name: 'Xuất điều chỉnh' },
    { id: '2', name: 'Xuất vay mượn' },
  ],
  inputTypes: [
    { id: '0', name: 'Nhập hàng' },
    { id: '1', name: 'Nhập điều chỉnh' },
    { id: '2', name: 'Nhập vay mượn' },
  ],
  reasonTypes: [
    { id: '0', name: 'Hàng hỏng tại cửa hàng' },
    { id: '1', name: 'Hàng hỏng do khách hàng mua tại cửa hàng' },
    { id: '2', name: 'Hàng hỏng do khách hàng mua tại điểm lẻ' },
  ],
  pagination: [
    20,
    40,
    60,
    80,
    100,
    200,
    500,
  ],
}
