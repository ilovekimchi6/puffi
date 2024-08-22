import { Test, TestingModule } from '@nestjs/testing';
import { ProductivityService } from './productivity.service';

describe('ProductivityService', () => {
  let service: ProductivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductivityService],
    }).compile();

    service = module.get<ProductivityService>(ProductivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
