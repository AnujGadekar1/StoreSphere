// Path: src/modules/users/users.controller.ts
import { Controller, Post, Body, UseGuards, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  /**
   * Requirement: Update password logic.
   */
  @Patch('change-password')
  updatePassword(@Req() req: any, @Body('newPassword') newPassword: string) {
    return this.usersService.updatePassword(req.user.userId, newPassword);
  }
}