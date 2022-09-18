import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.repository.find({ relations: ['stores'] });
  }
  async findOne(id: string): Promise<ProductEntity> {
    const product: ProductEntity = await this.repository.findOne({
      where: { id },
      relations: ['stores'],
    });
    if (!product)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return product;
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return await this.repository.save(product);
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    const persistedProduct: ProductEntity = await this.repository.findOne({
      where: { id },
    });
    if (!persistedProduct)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    product.id = id;

    return await this.repository.save(product);
  }

  async delete(id: string) {
    const product: ProductEntity = await this.repository.findOne({
      where: { id },
    });
    if (!product)
      throw new BusinessLogicException(
        'The product with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.repository.remove(product);
  }
}
