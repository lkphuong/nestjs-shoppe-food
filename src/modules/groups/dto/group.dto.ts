import { IsString, IsNotEmpty } from 'class-validator';

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  role: string;
  description: string;
}
