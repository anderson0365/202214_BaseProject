import { IsAlpha, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class StoreDto{
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @Matches(`^[A-Z]{3}$`)
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
}