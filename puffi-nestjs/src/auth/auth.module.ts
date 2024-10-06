import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
