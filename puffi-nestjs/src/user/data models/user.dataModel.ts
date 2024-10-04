import {
  AfterCreate,
  BeforeCreate,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { hash, verify } from 'argon2';
import { Productivity } from 'src/lifestat/productivity/data models/productivity.dataModel';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: number;

  @Property()
  password: string;

  @Property()
  email: string;

  @Property()
  username: string;

  @ManyToOne(() => Productivity)
  Productivity: Productivity;

  @BeforeCreate()
  @AfterCreate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }

  async verifyPassword(password: string): Promise<boolean> {
    return verify(this.password, password);
  }
}
