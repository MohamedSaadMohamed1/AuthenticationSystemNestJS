import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(4, 32)
  username: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  @Matches(/[a-z]+/g, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]+/g, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]+/g, {
    message: 'Password must contain at least one number',
  })
  password: string;
}
