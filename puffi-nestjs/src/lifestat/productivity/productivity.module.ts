import { Module } from '@nestjs/common';
import { ProductivityService } from './productivity.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Productivity } from './data models/productivity.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Productivity])],
  providers: [ProductivityService],
})
export class ProductivityModule {}
