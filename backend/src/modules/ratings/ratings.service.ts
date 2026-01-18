// Path: src/modules/ratings/ratings.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { SubmitRatingDto } from './dto/submit-rating.dto';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingsRepository: Repository<Rating>,
    @InjectRepository(Store) private storesRepository: Repository<Store>,
  ) {}

  async submitRating(userId: number, dto: SubmitRatingDto) {
    const { storeId, rating, feedback } = dto;

    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new BadRequestException('Store not found');

    let existingRating = await this.ratingsRepository.findOne({
      where: { user: { id: userId }, store: { id: storeId } },
    });

    if (existingRating) {
      // Requirement: Option to modify their submitted rating.
      existingRating.rating = rating;
      existingRating.feedback = feedback || null;
      return await this.ratingsRepository.save(existingRating);
    }

    // Requirement: Option to submit a rating.
    const newRating = this.ratingsRepository.create({
      rating,
      feedback,
      user: { id: userId } as any,
      store: { id: storeId } as any,
    });

    return await this.ratingsRepository.save(newRating);
  }

  async getUserRatings(userId: number) {
    // Requirement: User's submitted rating should be displayed in listings.
    return await this.ratingsRepository.find({
      where: { user: { id: userId } },
      relations: ['store'],
    });
  }
}