import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { ProductStoreModule } from './product-store/product-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/product.entity';
import { StoreEntity } from './store/store.entity';

@Module({
  imports: [ProductModule, StoreModule, ProductStoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'stores',
      entities: [ProductEntity, StoreEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
