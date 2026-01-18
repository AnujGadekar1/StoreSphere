// Path: src/modules/ratings/ratings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Store } from '../stores/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Store])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [TypeOrmModule],
})
export class RatingsModule {}