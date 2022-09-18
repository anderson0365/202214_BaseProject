import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  providers: [StoreService],
  controllers: [StoreController]
})
export class StoreModule {}
