import { ApiProperty } from '@nestjs/swagger';
import { User } from 'Api/users/entities/users.entity';

export class LoginResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  accessToken: string;
}
