import { Test, TestingModule } from '@nestjs/testing';
import { ProductivityCommandsService } from './services/productivity-commands.service';

describe('CommandsService', () => {
  let service: ProductivityCommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductivityCommandsService],
    }).compile();

    service = module.get<ProductivityCommandsService>(
      ProductivityCommandsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
