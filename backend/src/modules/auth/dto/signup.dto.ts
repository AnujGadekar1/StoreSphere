// Path: src/modules/auth/dto/signup.dto.ts
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/, {
    message: 'Password must include 1 uppercase & 1 special character',
  })
  password: string;

  @IsString()
  @Length(1, 400)
  address: string;
}
