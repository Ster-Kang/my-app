// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Request, Response } from 'express';

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx     = host.switchToHttp();
    const req     = ctx.getRequest<Request>();
    const res     = ctx.getResponse<Response>();
    const status  = exception.getStatus();

    const raw: unknown = exception.getResponse();

    let code: string | null = null;
    let messageKey: string | null = null;
    let messageRaw: string | string[] | undefined;
    let meta: any = null;

    if (typeof raw === 'string') {
      messageRaw = raw;
    } else if (isObject(raw)) {
      code       = typeof raw.code === 'string' ? raw.code : null;
      messageKey = typeof raw.messageKey === 'string' ? raw.messageKey : null;
      const m = (raw as any).message;
      if (typeof m === 'string' || Array.isArray(m)) messageRaw = m;
      meta = (raw as any).meta ?? null;
    }

    // 1) 문자열 하나로 정규화
    let message: string;
    if (Array.isArray(messageRaw)) {
      message = messageRaw[0] ?? 'errors.UNEXPECTED';
    } else if (typeof messageRaw === 'string') {
      message = messageRaw;
    } else {
      message = 'errors.UNEXPECTED';
    }

    // 2) i18n 번역 (반환타입 제네릭 명시 + try/catch 분리)
// message는 이미 string으로 정규화되어 있다고 가정
if (messageKey) {
  try {
    const t = await this.i18n.translate(messageKey as any); // 반환: unknown
    message = typeof t === 'string' ? t : String(t);        // ← 여기서 string으로 확정
  } catch {
    // keep fallback message = 번역 실패해도 기존 message 그대로 둔다
  }
} else if (message.startsWith('errors.')) {
  try {
    const t = await this.i18n.translate(message as any);
    message = typeof t === 'string' ? t : String(t);
  } catch { /* fallback 유지 */ }
}

    res.status(status).json({
      success: false,
      status,
      code,
      message,
      meta,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}