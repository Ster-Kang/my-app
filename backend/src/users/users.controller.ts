// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from './users.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findById(id);
  }

  // 예: 인증 후 내 정보 수정 라우트 (실전은 Guard로 보호)
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  updateMe(@CurrentUser() user, @Body() dto: UpdateUserDto) {
    return this.users.updateMe(user.id, dto);
  }
}