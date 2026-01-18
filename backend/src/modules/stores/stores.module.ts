// Path: src/modules/stores/stores.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { OwnerController } from './owner.controller'; // Added controller
import { Rating } from '../ratings/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Rating])],
  controllers: [StoresController, OwnerController], // Added OwnerController
  providers: [StoresService],
  exports: [StoresService, TypeOrmModule],
})
export class StoresModule {}