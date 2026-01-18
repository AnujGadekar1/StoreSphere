// Path: src/modules/ratings/dto/submit-rating.dto.ts
import { IsInt, Max, Min, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class SubmitRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  rating: number;

  @IsNotEmpty()
  @IsInt()
  storeId: number;

  @IsOptional()
  @IsString()
  @MaxLength(400, { message: 'Feedback cannot exceed 400 characters' })
  // Requirement: Address and text fields follow a Max 400 characters rule.
  feedback?: string;
}