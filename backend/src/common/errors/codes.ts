// codes.ts
export enum ErrorCode {
  USER_EMAIL_TAKEN = 'USER_EMAIL_TAKEN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.USER_EMAIL_TAKEN]: '이미 사용 중인 이메일입니다.',
  [ErrorCode.USER_NOT_FOUND]: '사용자를 찾을 수 없습니다.'};