export default {
  genders: [
    { id: '1', label: 'Nam' },
    { id: '2', label: 'Nữ' },
    { id: '3', label: 'Khác' },
  ],

  perPageSizes: [
    20,
    40,
    60,
    80,
    100,
    200,
    300,
    500,
  ],
  pageNumber: 1,

  minSearchLength: 4,
  minSearchSize: 20,

  minOnlineOrderLength: 1,

  showStatus: {
    invisible: 1,
    enable: 2,
    disable: 3,
  },

  errorAPIMessage: 'Server không hoạt động, vui lòng liên hệ Quản trị.',
  apiGetIpList: [
    'https://api.ipify.org?format=json',
    'http://ip-api.com/json',
    'http://www.geoplugin.net/json.gp',
    'https://ipinfo.io/json',
  ],
}
