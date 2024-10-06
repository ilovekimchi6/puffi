import { Module } from '@nestjs/common';
import { Relationships } from './data models/relationships.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RelationshipsService } from './relationships.service';

@Module({
  imports: [MikroOrmModule.forFeature([Relationships])],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
