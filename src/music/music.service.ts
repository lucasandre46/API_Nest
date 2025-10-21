import { Injectable } from '@nestjs/common';
import { MusicBD, Music_Data } from './Model/musicBD';

@Injectable()
export class MusicService {
  
 pegaBD(): MusicBD[]{
    
    return Music_Data;

 }

}
