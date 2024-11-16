import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    const lastProduct = await this.databaseService.product.findFirst({
      orderBy: { id: 'desc' }
    });
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    return this.databaseService.product.create({
      data: {
        ...createProductDto,
        id: newId,
      },
    });
  }
  

  async findAll() {
    const products = await this.databaseService.product.findMany({
      orderBy: {
        id: 'asc', // จัดเรียงตาม id
      },
    });
    return products;
  }
  

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    try {
      console.log('Update request data:', updateProductDto);
      const product = await this.databaseService.product.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  

  async remove(id: number) {
    const product = await this.databaseService.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.databaseService.product.delete({ where: { id } });
  }
}
