import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Productivity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @ManyToOne(() => User)
  user!: User;
}
