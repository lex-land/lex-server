import { IsNotEmpty } from 'class-validator';
// import { User } from '@/src/user/user.entity';

export class CreateOrgDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly description: string;
}
