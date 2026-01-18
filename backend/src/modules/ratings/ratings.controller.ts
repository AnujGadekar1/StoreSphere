// Path: src/modules/ratings/ratings.controller.ts
import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RatingsService } from './ratings.service';
import { SubmitRatingDto } from './dto/submit-rating.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('ratings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @Roles(UserRole.USER) // Restricted to Normal Users.
  async submit(@Req() req: any, @Body() submitRatingDto: SubmitRatingDto) {
    return this.ratingsService.submitRating(req.user.userId, submitRatingDto);
  }

  @Get('my-ratings')
  @Roles(UserRole.USER)
  async getMyRatings(@Req() req: any) {
    return this.ratingsService.getUserRatings(req.user.userId);
  }
}