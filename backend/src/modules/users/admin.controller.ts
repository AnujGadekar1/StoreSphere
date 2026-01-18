// Path: src/modules/users/admin.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // =========================
  // POST /admin/users
  // Create User
  // =========================
  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.adminService.createUser(dto);
  }

  // =========================
  // GET /admin/dashboard
  // Dashboard Stats
  // =========================
  @Get('dashboard')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // =========================
  // GET /admin/users
  // Get All Users
  // =========================
  @Get('users')
  getAllUsers(@Query() query: any) {
    return this.adminService.getAllUsers(query);
  }
}
