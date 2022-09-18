import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { StoreEntity } from './store.entity';
import { StoreService } from './store.service';
import { faker } from '@faker-js/faker';

describe('StoreService', () => {
  let service: StoreService;
  let repository: Repository<StoreEntity>;
  let storesList: Array<StoreEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
    repository = module.get<Repository<StoreEntity>>(
      getRepositoryToken(StoreEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    storesList = [];
    for (let i = 0; i < 5; i++) {
      const store: StoreEntity = await repository.save({
        name: faker.company.name(),
        city: 'BOG',
        address: faker.address.city(),
        products: [],
      });
      storesList.push(store);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all stores', async () => {
    const stores: StoreEntity[] = await service.findAll();
    expect(stores).not.toBeNull();
    expect(stores).toHaveLength(storesList.length);
  });

  it('findOne should return a store by id', async () => {
    const storedStore: StoreEntity = storesList[0];
    const store: StoreEntity = await service.findOne(storedStore.id);
    expect(store).not.toBeNull();
    expect(store.name).toEqual(storedStore.name);
    expect(store.city).toEqual(storedStore.city);
    expect(store.address).toEqual(storedStore.address);
  });

  it('findOne should throw an exception for an invalid store', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The store with the given id was not found',
    );
  });

  it('create should return a new store', async () => {
    const store: StoreEntity = {
      id: '',
      name: faker.company.name(),
      city: 'BOG',
      address: faker.address.city(),
      products: [],
    };

    const newProduct: StoreEntity = await service.create(store);
    expect(newProduct).not.toBeNull();

    const storedStore: StoreEntity = await repository.findOne({
      where: { id: newProduct.id },
    });
    expect(storedStore).not.toBeNull();
    expect(storedStore.name).toEqual(newProduct.name);
    expect(storedStore.city).toEqual(newProduct.city);
    expect(storedStore.address).toEqual(newProduct.address);
  });

  it('update should modify a store', async () => {
    const store: StoreEntity = storesList[0];
    store.name = 'New name';
    store.address = faker.address.city();
    const updatedProduct: StoreEntity = await service.update(store.id, store);
    expect(updatedProduct).not.toBeNull();
    const storedStore: StoreEntity = await repository.findOne({
      where: { id: store.id },
    });
    expect(storedStore).not.toBeNull();
    expect(storedStore.name).toEqual(store.name);
    expect(storedStore.address).toEqual(store.address);
  });

  it('update should throw an exception for an invalid store', async () => {
    let store: StoreEntity = storesList[0];
    store = {
      ...store,
      name: 'New name',
      city: 'BAQ',
    };
    await expect(() => service.update('0', store)).rejects.toHaveProperty(
      'message',
      'The store with the given id was not found',
    );
  });

  it('delete should remove a store', async () => {
    const store: StoreEntity = storesList[0];
    await service.delete(store.id);
    const deletedMuseum: StoreEntity = await repository.findOne({
      where: { id: store.id },
    });
    expect(deletedMuseum).toBeNull();
  });

  it('delete should throw an exception for an invalid store', async () => {
    const store: StoreEntity = storesList[0];
    await service.delete(store.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The store with the given id was not found',
    );
  });
});
