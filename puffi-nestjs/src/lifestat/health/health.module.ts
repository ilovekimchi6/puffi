import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { Health } from './data models/health.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Health])],
  providers: [HealthService],
})
export class HealthModule {}
