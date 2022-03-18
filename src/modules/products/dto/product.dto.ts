import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  image: string;
  @IsNumber()
  price: number;
}
