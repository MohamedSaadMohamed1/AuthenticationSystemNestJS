import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/users.entity';
import { UsersRepository } from './users.repository';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(user: Partial<User>): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: user,
    });
  }

  async create(user: CreateUserDto) {
    const oldUser = await this.findOne({ username: user.username });
    if (oldUser) {
      throw new ConflictException(
        `Username '${user.username}' is already exists`,
      );
    }
    return this.usersRepository.save(user);
  }
}
