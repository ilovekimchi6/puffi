import { Module } from '@nestjs/common';
import { LlmModule } from 'src/llm/llm.module';
import { ProductivityModule } from 'src/lifestat/productivity/productivity.module';

@Module({
  imports: [ProductivityModule, LlmModule],
  providers: [],
})
export class CommandsModule {}
