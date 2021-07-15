export default {
  // Endpoints
  preLoginEndpoint: '/users/preLogin',
  loginEndpoint: '/users/login',
  registerEndpoint: '/users/register',
  changePasswordEndpoint: '/users/change-password',
  refreshEndpoint: '/users/refresh-token',
  logoutEndpoint: '/users/logout',
  reloadCaptchaEndpoint: '/users/reload-captcha',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
