import { EntityRepository } from '@mikro-orm/core';
import { User } from './data models/user.entity';
import { UserDto } from './dtos/user.dto';
import { EntityManager } from '@mikro-orm/postgresql';

export class UserRepository extends EntityRepository<User> {
  async addUser(userDto: UserDto, em?: EntityManager): Promise<void> {
    const { email, username, password } = userDto;

    const manager = em || this.em;

    try {
      const user = manager.create(User, { email, password, username });

      await manager.persist(user).flush();
    } catch (error) {
      console.error(error);
    }
  }

  async findUserByEmail(email: string, em?: EntityManager): Promise<User> {
    try {
      const manager = em || this.em;
      return manager.findOne(User, { email });
    } catch (error) {
      console.error(error);
    }
  }
}
