// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus();
    const payload = exception.getResponse();
    res.status(status).json({
      success: false,
      status,
      ...(typeof payload === 'string' ? { message: payload } : payload),
      timestamp: new Date().toISOString(),
    });
  }
}