import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dtos/user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './data models/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async addUser(userDto: UserDto, em?: EntityManager): Promise<void> {
    this.userRepository.addUser(userDto, em);
  }

  async findUserByEmail(email: string, em?: EntityManager): Promise<User> {
    return this.userRepository.findUserByEmail(email, em);
  }
}
