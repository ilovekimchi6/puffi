import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  email: string;
}
