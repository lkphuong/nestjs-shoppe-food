import { IsNotEmpty, IsString, Min } from 'class-validator';
export class OrderDto {
  @IsNotEmpty()
  @IsString()
  @Min(0)
  total: number;
  @IsNotEmpty()
  @IsString()
  @Min(0)
  amount: number;
}
