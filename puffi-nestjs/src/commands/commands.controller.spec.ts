import { Test, TestingModule } from '@nestjs/testing';
import { CommandsController } from './commands.controller';

describe('CommandsController', () => {
  let controller: CommandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandsController],
    }).compile();

    controller = module.get<CommandsController>(CommandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
