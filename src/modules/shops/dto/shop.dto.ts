import { IsString, IsNotEmpty } from 'class-validator';
export class ShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
}
