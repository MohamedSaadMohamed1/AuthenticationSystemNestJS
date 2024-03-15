import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from 'Api/users/entities/users.entity';
import { TokenPayload } from './dtos/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.usersService.findOne({ username });
    if (user && user.password === password) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    return await this.generateAccessToken(user);
  }

  async signUp(registerUserDto: RegisterUserDto): Promise<string> {
    const user = await this.usersService.create(registerUserDto);
    return this.login(user);
  }

  async generateAccessToken(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
    };
    return await this.jwtService.sign(payload);
  }
}
