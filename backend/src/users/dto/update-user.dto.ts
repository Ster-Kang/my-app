// src/users/dto/update-user.dto.ts
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() nickname?: string;
  @IsString() @IsOptional() avatar_url?: string;
}