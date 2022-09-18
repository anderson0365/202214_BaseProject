import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { StoreEntity } from './store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly repository: Repository<StoreEntity>,
  ) {}

  async findAll(): Promise<StoreEntity[]> {
    return await this.repository.find({ relations: ['products'] });
  }
  async findOne(id: string): Promise<StoreEntity> {
    const store: StoreEntity = await this.repository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!store)
      throw new BusinessLogicException(
        'The store with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return store;
  }

  async create(store: StoreEntity): Promise<StoreEntity> {
    this.validateCityField(store);

    return await this.repository.save(store);
  }

  async update(id: string, store: StoreEntity): Promise<StoreEntity> {
    const persistedProduct: StoreEntity = await this.repository.findOne({
      where: { id },
    });
    if (!persistedProduct)
      throw new BusinessLogicException(
        'The store with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    this.validateCityField(store)

    store.id = id;

    return await this.repository.save(store);
  }

  async delete(id: string) {
    const store: StoreEntity = await this.repository.findOne({
      where: { id },
    });
    if (!store)
      throw new BusinessLogicException(
        'The store with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.repository.remove(store);
  }

  private validateCityField(store: StoreEntity) {
    const regex: RegExp = new RegExp(`^[A-Z]{3}$`);
    if (!regex.test(store.city))
      throw new BusinessLogicException(
        `"city" field of product must be valid according to the following regular expression: ^[A-Z]{3}$`,
        BusinessError.BAD_REQUEST,
      );
  }
}
