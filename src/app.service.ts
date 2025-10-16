import { Injectable } from '@nestjs/common';
import { ALBUM_DATABASE, CardDB, } from './Cards/Model/cardBD';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  
}
