// exceptions.ts
import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorMessages } from './codes';

export class AppHttpException extends HttpException {
  constructor(code: ErrorCode, status: number, message?: string) {
    super(
      { code, message: message ?? ErrorMessages[code] },
      status,
    );
  }
}