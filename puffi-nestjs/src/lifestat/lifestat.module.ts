import { Module } from '@nestjs/common';
import { ProductivityModule } from './productivity/productivity.module';

@Module({
  imports: [ProductivityModule],
})
export class LifestatModule {}
