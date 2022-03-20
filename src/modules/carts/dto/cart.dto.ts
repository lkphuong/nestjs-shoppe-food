import { IsNumber, IsNotEmpty, Min } from 'class-validator';
export class CartDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
