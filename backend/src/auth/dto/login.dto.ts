// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail() email: string;

  // 소셜 로그인 구현 전이라 일단 기본 LoginDTO만 있음 - 비번 필수
  @IsString() @MinLength(8) password: string;
}