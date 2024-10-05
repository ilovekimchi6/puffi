import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LlmModule } from './llm/llm.module';
import { LifestatModule } from './lifestat/lifestat.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    UserModule,
    LlmModule,
    LifestatModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    CommandsModule,
  ],
})
export class AppModule {}
