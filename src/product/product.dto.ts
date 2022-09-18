import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductType } from "./product.entity";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsEnum(ProductType)
    @IsNotEmpty()
    type: ProductType;
  }