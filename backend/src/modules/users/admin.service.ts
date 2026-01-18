// Path: src/modules/users/admin.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,

    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
  ) {}

  // =========================
  // Create User
  // =========================
  async createUser(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      address: dto.address,
      password: hashedPassword,
      role: dto.role,
    });

    await this.userRepo.save(user);

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // =========================
  // Dashboard Stats
  // =========================
  async getDashboardStats() {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      this.userRepo.count(),
      this.storeRepo.count(),
      this.ratingRepo.count(),
    ]);

    return {
      totalUsers,
      totalStores,
      totalRatings,
    };
  }

  // =========================
  // Get All Users (Admin)
  // =========================
 async getAllUsers(filters: any) {
  const { search, role, sortBy = 'name', order = 'ASC' } = filters;

  const qb = this.userRepo.createQueryBuilder('user')
    // Join stores and calculate average if they are an owner 
    .leftJoin('stores', 'store', 'store.ownerId = user.id')
    .leftJoin('ratings', 'rating', 'rating.storeId = store.id')
    .select([
      'user.id',
      'user.name',
      'user.email',
      'user.role',
      'user.address',
    ])
    .addSelect('AVG(rating.rating)', 'averageRating') // Requirement Fix 
    .groupBy('user.id');

  if (role) qb.andWhere('user.role = :role', { role });
  if (search) {
    qb.andWhere('(user.name LIKE :search OR user.email LIKE :search OR user.address LIKE :search)', { search: `%${search}%` });
  }

  const allowedSorts = ['name', 'email', 'address', 'role'];
  const safeSort = allowedSorts.includes(sortBy) ? sortBy : 'name';
  qb.orderBy(`user.${safeSort}`, order);

  const rawResults = await qb.getRawMany();
  return {
    data: rawResults.map(r => ({
      id: r.user_id,
      name: r.user_name,
      email: r.user_email,
      role: r.user_role,
      address: r.user_address,
      averageRating: r.averageRating ? parseFloat(parseFloat(r.averageRating).toFixed(1)) : null
    }))
  };
}
}
