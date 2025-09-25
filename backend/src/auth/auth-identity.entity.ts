import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  APPLE = 'apple',
  GITHUB = 'github',
  KAKAO = 'kakao',
  NAVER = 'naver',
}

@Entity({ name: 'auth_identities' })
@Unique('uq_provider_uid', ['provider', 'provider_user_id'])
@Index('idx_auth_user', ['user_id'])
@Index('idx_auth_provider', ['provider', 'provider_user_id'])
export class AuthIdentity {
  // BIGINT AUTO_INCREMENT
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  // FK는 컬럼으로도 보유
  @Column({ type: 'char', length: 36 })
  user_id!: string;

  @ManyToOne(() => User, (u) => u.identities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'enum', enum: AuthProvider })
  provider!: AuthProvider;

  @Column({ type: 'varchar', length: 255 })
  provider_user_id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email_at_provider!: string | null;

  @Column({ type: 'text', nullable: true })
  access_token!: string | null;

  @Column({ type: 'text', nullable: true })
  refresh_token!: string | null;

  @Column({ type: 'text', nullable: true })
  scopes!: string | null;

  // MySQL 5.7+ JSON
  @Column({ type: 'json', nullable: true })
  raw_profile_json!: Record<string, any> | null;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  linked_at!: Date;

  @Column({ type: 'datetime', nullable: true })
  last_used_at!: Date | null;
}