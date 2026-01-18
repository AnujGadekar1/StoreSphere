// Path: src/modules/users/dto/admin-user-filter.dto.ts

import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class AdminUserFilterDto {
  // 🔍 Filters

  @IsOptional()
  @IsString()
  @Length(1, 60)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 400)
  address?: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.USER, UserRole.STORE_OWNER])
  role?: UserRole;

  // 🔃 Sorting

  @IsOptional()
  @IsIn(['name', 'email', 'address', 'role'])
  sortBy?: 'name' | 'email' | 'address' | 'role';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
