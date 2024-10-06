import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Finance } from './data models/finance.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Finance])],
  providers: [FinanceService],
})
export class FinanceModule {}
