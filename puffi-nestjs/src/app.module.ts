import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LlmModule } from './llm/llm.module';
import { LifestatModule } from './lifestat/lifestat.module';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from 'mikro-orm.config';

@Module({
  imports: [
    UserModule,
    LlmModule,
    LifestatModule,
    AuthModule,
    CommandsModule,
    MikroOrmModule.forRoot(mikroOrmConfig),
  ],
})
export class AppModule {}
