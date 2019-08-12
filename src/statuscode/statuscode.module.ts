import { Module } from '@nestjs/common';
import { StatuscodeController } from './statuscode.controller';

@Module({
  controllers: [StatuscodeController],
})
export class StatuscodeModule {}
