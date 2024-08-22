import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LlmModule } from './llm/llm.module';
import { LifestatModule } from './lifestat/lifestat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, LlmModule, LifestatModule, AuthModule],
})
export class AppModule {}
