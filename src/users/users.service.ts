import { Injectable } from '@nestjs/common';
import { PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
}
