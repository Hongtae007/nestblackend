import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminlogService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAdminlogDto: Prisma.AdminLogCreateInput) {
    try {
      return this.prisma.adminLog.create({
        data: createAdminlogDto,
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.prisma.adminLog.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
