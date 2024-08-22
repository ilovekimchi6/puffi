import { Module } from '@nestjs/common';
import { ProductivityService } from './productivity.service';

@Module({
  providers: [ProductivityService],
})
export class ProductivityModule {}
