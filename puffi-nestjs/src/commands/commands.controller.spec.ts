import { Test, TestingModule } from '@nestjs/testing';
import { ProductivityCommandsController } from './controllers/productivity-commands.controller';

describe('CommandsController', () => {
  let controller: ProductivityCommandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductivityCommandsController],
    }).compile();

    controller = module.get<ProductivityCommandsController>(
      ProductivityCommandsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
