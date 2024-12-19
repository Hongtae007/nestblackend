import { Global, Module } from '@nestjs/common';
import { AdminlogService } from './adminlog.service';
import { AdminlogController } from './adminlog.controller';
import { PrismaService } from 'src/prisma.service';

@Global()
@Module({
  controllers: [AdminlogController],
  providers: [AdminlogService, PrismaService],
  exports: [AdminlogService],
})
export class AdminlogModule {}
