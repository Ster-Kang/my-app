// src/users/users.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    if (dto.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('Email already in use');
    }
    const user = this.repo.create({
      email: dto.email ?? null,
      name: dto.name ?? null,
      password_hash: dto.password ? await bcrypt.hash(dto.password, 12) : null,
    });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() } });
  }

  async findById(id: string) {
    const u = await this.repo.findOne({ where: { id, deleted_at: IsNull() } });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email, deleted_at: IsNull() } });
  }

  async updateMe(id: string, dto: UpdateUserDto) {
    await this.repo.update({ id }, { ...dto });
    return this.findById(id);
  }
}