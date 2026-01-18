// Path: src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Store,   // ✅ REQUIRED
      Rating,  // ✅ REQUIRED
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class UsersModule {}
