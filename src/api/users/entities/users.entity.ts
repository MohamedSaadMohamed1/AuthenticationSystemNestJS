import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MainEntity } from 'Database/main.entity';
import { USERS } from 'Database/tables.constant';

@Entity(USERS)
export class User extends MainEntity {
  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  password: string;
}
