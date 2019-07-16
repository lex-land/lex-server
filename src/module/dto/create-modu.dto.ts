import { CreateIntefaceDto } from '@/src/interface/dto/create-inte.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateModuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  interfaces: CreateIntefaceDto[];
}
