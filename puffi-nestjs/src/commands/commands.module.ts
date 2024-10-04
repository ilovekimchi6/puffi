import { Module } from '@nestjs/common';
import { LlmModule } from 'src/llm/llm.module';
import { ProductivityModule } from 'src/lifestat/productivity/productivity.module';
import { CommandsController } from './commands.controller';

@Module({
  imports: [ProductivityModule, LlmModule],
  providers: [],
  controllers: [CommandsController],
})
export class CommandsModule {}
