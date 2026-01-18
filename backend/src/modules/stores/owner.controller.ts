// Path: src/modules/stores/owner.controller.ts
import { Controller, Get, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { StoresService } from './stores.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Controller('owner')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.STORE_OWNER)
export class OwnerController {
  constructor(
    private readonly storesService: StoresService,
    @InjectRepository(Store) private storeRepo: Repository<Store>
  ) {}

  /**
   * Requirement: View average rating and list of users who rated their store.
   */
  @Get('ratings')
  async getMyStoreRatings(@Req() req: any) {
    const store = await this.storeRepo.findOne({ 
      where: { owner: { id: req.user.userId } } 
    });
    
    if (!store) throw new NotFoundException('No store registered for this owner');

    const reviewers = await this.storesService.getStoreReviewers(store.id);
    const averageRating = await this.storesService.getAverageRating(store.id);

    return { reviewers, averageRating };
  }
}