export enum SuccessCode {
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  LOGIN_OK     = 'LOGIN_OK',
}

export const DefaultSuccessKey: Record<SuccessCode, string> = {
  [SuccessCode.USER_CREATED]: 'success.USER_CREATED',
  [SuccessCode.USER_UPDATED]: 'success.USER_UPDATED',
  [SuccessCode.LOGIN_OK]:     'success.LOGIN_OK',
};