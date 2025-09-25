import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AuthIdentity } from '../auth/auth-identity.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  PENDING = 'pending',
}

@Entity({ name: 'users' })
@Index('idx_users_email', ['email'])
@Index('idx_users_last_login_at', ['last_login_at'])
@Index('idx_users_status', ['status'])
export class User {
  // MySQL: CHAR(36)로 UUID 문자열 저장
  @PrimaryColumn({ type: 'char', length: 36 })
  id!: string;

  // 소셜-only 계정 고려: nullable
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'datetime', nullable: true })
  email_verified_at!: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_hash!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname!: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar_url!: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone!: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  // MySQL의 BOOLEAN은 내부적으로 TINYINT(1)
  @Column({ type: 'tinyint', width: 1, default: 0 })
  mfa_enabled!: boolean;

  @Column({ type: 'text', nullable: true })
  mfa_secret!: string | null;

  @Column({ type: 'datetime', nullable: true })
  last_login_at!: Date | null;

  @Column({ type: 'varchar', length: 45, nullable: true })
  last_login_ip!: string | null;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at!: Date | null;

  @OneToMany(() => AuthIdentity, (ai) => ai.user)
  identities!: AuthIdentity[];

  // 앱 레벨에서 UUID를 생성해 PK에 넣는다.
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
    if (!this.id) this.id = uuidv4();
  }
}