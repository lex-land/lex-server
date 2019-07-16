import { InterfaceModule } from '../interface/interface.module';
import { MigrationController } from './migration.controller';
import { Module } from '@nestjs/common';
import { ModuleModule } from '@/src/module/module.module';
import { OrganizationModule } from '@/src/organization/organization.module';
import { PropertyModule } from '@/src/property/property.module';
import { RepositoryModule } from '@/src/repository/repository.module';

@Module({
  imports: [
    OrganizationModule,
    ModuleModule,
    RepositoryModule,
    InterfaceModule,
    PropertyModule,
  ],
  controllers: [MigrationController],
})
export class MigrationModule {}
