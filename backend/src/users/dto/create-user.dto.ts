// src/users/dto/create-user.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    // 생략 가능 옵션 - @IsOptional
    @IsEmail() @IsOptional() email?: string;

    // 비밀번호는 소셜로그인 대비해 생략 가능.
    // 그럼 name만 있으면 로그인? 
    // -> solution => {로그인 서비스에서 분기처리}
    @IsString() @MinLength(8) @IsOptional() password?: string; 
    @IsString() @IsOptional() name?: string;

}