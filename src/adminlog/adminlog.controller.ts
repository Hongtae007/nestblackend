import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdminlogService } from './adminlog.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ROLE } from 'src/users/enum/users.enum';

@Controller('adminlog')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(ROLE.ADMIN)
export class AdminlogController {
  constructor(private readonly adminlogService: AdminlogService) {}

  @Post()
  create(@Body() createAdminlogDto: Prisma.AdminLogCreateInput) {
    return this.adminlogService.create(createAdminlogDto);
  }

  @Get()
  findAll() {
    return this.adminlogService.findAll();
  }
}
