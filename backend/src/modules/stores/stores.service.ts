// Path: src/modules/stores/stores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { Rating } from '../ratings/entities/rating.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>,
  ) {}

  /**
   * System Administrator can add new stores.
   * Links store to owner via ownerId.
   */
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = this.storesRepository.create({
      name: createStoreDto.name,
      email: createStoreDto.email,
      address: createStoreDto.address,
      owner: { id: createStoreDto.ownerId } as any, 
    });
    return await this.storesRepository.save(newStore);
  }

  /**
   * Fetches all stores with aggregated average ratings.
   * Fixes "Unnamed Store" issue by mapping raw results back to entity properties.
   */
  async findAll(
  userId?: number, // Added userId to context 
  search?: string, 
  sortBy: string = 'name', 
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<any[]> {
  const query = this.storesRepository.createQueryBuilder('store')
    .leftJoin('store.ratings', 'rating')
    // Left join specifically for the current user's rating 
    .leftJoin('store.ratings', 'userRating', 'userRating.userId = :userId', { userId })
    .select([
      'store.id',
      'store.name',
      'store.address',
      'store.email',
      'userRating.rating as userRating' // Selection for requirement 
    ])
    .addSelect('AVG(rating.rating)', 'overallRating')
    .groupBy('store.id')
    .addGroupBy('userRating.id'); // Group by userRating to prevent row duplication
  
  if (search && search.trim() !== '') {
    query.where('store.name LIKE :search OR store.address LIKE :search', { search: `%${search}%` });
  }

  const allowedSortFields = ['name', 'address'];
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'name';
  query.orderBy(`store.${safeSortBy}`, order);

  const results = await query.getRawAndEntities();

  return results.entities.map((store, index) => ({
    ...store,
    overallRating: results.raw[index].overallRating ? parseFloat(parseFloat(results.raw[index].overallRating).toFixed(1)) : 0,
    userRating: results.raw[index].userRating || null // Map user's specific rating 
  }));
}

  /**
   * Helper for Owner Dashboard.
   */
  async getAverageRating(storeId: number): Promise<number> {
    const ratings = await this.ratingsRepository.find({ where: { store: { id: storeId } } });
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
  }

  async getStoreReviewers(storeId: number) {
    return await this.ratingsRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async findStoreByOwner(ownerId: number): Promise<Store | null> {
    return await this.storesRepository.findOne({
      where: { owner: { id: ownerId } }
    });
  }
}