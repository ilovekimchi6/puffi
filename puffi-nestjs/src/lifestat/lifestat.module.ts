import { Module } from '@nestjs/common';
import { ProductivityModule } from './productivity/productivity.module';
import { HealthModule } from './health/health.module';
import { FinanceModule } from './finance/finance.module';
import { RelationshipsModule } from './relationships/relationships.module';

@Module({
  imports: [
    ProductivityModule,
    HealthModule,
    FinanceModule,
    RelationshipsModule,
  ],
})
export class LifestatModule {}
