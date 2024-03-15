import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTime(): Date {
    return new Date();
  }
}
