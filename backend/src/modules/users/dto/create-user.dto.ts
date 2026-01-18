// Path: src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(20, 60, { message: 'Name must be 20-60 characters' }) // Requirement Fix
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 400, { message: 'Address maximum 400 characters' }) // Requirement Fix
  address: string;

  @IsString()
  @Length(8, 16, { message: 'Password must be 8-16 characters' }) // Requirement Fix
  @Matches(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, {
    message: 'Password must include at least one uppercase letter and one special character',
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}