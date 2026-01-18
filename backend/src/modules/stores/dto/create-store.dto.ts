import { IsEmail, IsNotEmpty, Length, MaxLength, IsNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @Length(20, 60, { message: 'Store name must be between 20 and 60 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid store email' })
  email: string;

  @IsNotEmpty()
  @MaxLength(400)
  address: string;

  @IsNotEmpty()
  @IsNumber() // Ensures ownerId is numeric
  ownerId: number;
}