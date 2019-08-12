import { Test, TestingModule } from '@nestjs/testing';
import { StatuscodeController } from './statuscode.controller';

describe('Statuscode Controller', () => {
  let controller: StatuscodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatuscodeController],
    }).compile();

    controller = module.get<StatuscodeController>(StatuscodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
