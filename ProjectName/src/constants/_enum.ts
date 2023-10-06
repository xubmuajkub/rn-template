export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum StorageKeys {
  TOKEN = 'token',
  TOKEN_EXPIRE_DATE = 'tokenExpireDate',
  REFRESH_TOKEN = 'refreshToken',
  REFRESH_TOKEN_EXPIRE_DATE = 'refreshTokenExpireDate',
  FCM_TOKEN = 'fcmToken',
}

export enum ToastTypes {
  SUCCESS = 'success',
  ERROR = 'danger',
  NORMAL = 'normal',
  WARNING = 'warning',
  CUSTOM = 'custom',
  INFO = 'info',
}

export enum NotificationStates {
  BACKGROUND,
  FOREGROUND,
  QUIT,
}
