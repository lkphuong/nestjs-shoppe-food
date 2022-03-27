import { IsNotEmpty, IsString } from 'class-validator';
export class SubcategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
}
