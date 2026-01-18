// Path: src/modules/stores/stores.controller.ts
import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('stores')
export class StoresController { // FIX: Changed from UsersController to StoresController
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN) // Requirement: System Administrator can add new stores
  async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

 @Get()
async findAll(
  @Query('search') search: string,
  @Query('sortBy') sortBy: string,
  @Query('order') order: 'ASC' | 'DESC',
) {
  // Passes search, sortBy, and order to the service
  return this.storesService.findAll(search, sortBy, order);
}
}