import { CreatePropDto } from '@/src/property/dto/create-prop.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateIntefaceDto {
  @IsNotEmpty()
  method: string;
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;

  properties: CreatePropDto[];
}
