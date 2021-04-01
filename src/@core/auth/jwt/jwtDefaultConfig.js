export default {
  // Endpoints
  preLoginEndpoint: '/user/preLogin',
  loginEndpoint: '/user/login',
  registerEndpoint: '/user/register',
  changePasswordEndpoint: '/user/change-password',
  refreshEndpoint: '/user/refresh-token',
  logoutEndpoint: '/user/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
