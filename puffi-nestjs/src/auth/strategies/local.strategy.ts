import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDTO } from 'src/commands/dtos/auth.dto';

//This is local strategy.
//This uses the auth service to validate the user.
//Basically the auth service is the one that does the actual validation.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(authDto: AuthDTO): Promise<any> {
    //This returns a User object if the user is valid.
    const user = await this.authService.validateUser(authDto);
    //If the user is not valid, it throws an UnauthorizedException.
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
