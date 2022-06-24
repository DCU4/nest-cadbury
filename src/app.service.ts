import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!';
  }
  getGoodbye(): string {
    return 'Goodbye World!!!';
  }
  getString(string: string): string {
    return string;
  }
}
