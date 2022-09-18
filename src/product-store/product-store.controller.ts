import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-error.interceptor';
import { StoreEntity } from '../store/store.entity';
import { StoreService } from '../store/store.service';
import { ProductStoreService } from './product-store.service';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductStoreController {
  constructor(
    private readonly productStoreService: ProductStoreService,
    private readonly storeService: StoreService,
  ) {}

  @Post(':productId/stores/:storeId')
  async addStoreToProduct(
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
  ) {
    return await this.productStoreService.addStoreToProduct(productId, storeId);
  }

  @Get(':productId/stores/:storeId')
  async findStoreFromProduct(
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
  ) {
    return await this.productStoreService.findStoreFromProduct(
      productId,
      storeId,
    );
  }

  @Get(':productId/stores')
  async findStoresFromProduct(@Param('productId') productId: string) {
    return await this.productStoreService.findStoresFromProduct(productId);
  }

  @Put(':productId/stores')
  async updateStoresFromProduct(
    @Body() artworksIds: string[],
    @Param('productId') productId: string,
  ) {
    const stores: StoreEntity[] = [];
    for (let i = 0; i < artworksIds.length; i++) {
      const artwork = await this.storeService.findOne(artworksIds[i]);
      stores.push(artwork);
    }

    return await this.productStoreService.updateStoresFromProduct(
      productId,
      stores,
    );
  }

  @Delete(':productId/stores/:storeId')
  @HttpCode(204)
  async deleteStoresFromProduct(
    @Param('productId') productId: string,
    @Param('storeId') storeId: string,
  ) {
    return await this.productStoreService.deleteStoresFromProduct(
      productId,
      storeId,
    );
  }
}
