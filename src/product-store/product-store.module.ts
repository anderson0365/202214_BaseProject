import { Module } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';
import { ProductStoreController } from './product-store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { StoreEntity } from '../store/store.entity';
import { StoreService } from '../store/store.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, StoreEntity])],
  providers: [ProductStoreService, StoreService],
  controllers: [ProductStoreController],
})
export class ProductStoreModule {}
