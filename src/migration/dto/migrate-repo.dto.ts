import { CreateModuDto } from '@/src/module/dto/create-modu.dto';
import { IsNotEmpty } from 'class-validator';

export class MigrateRepoDto {
  name: string;
  description: string;

  @IsNotEmpty()
  modules: CreateModuDto[];
}
