import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicBD, Music_Data } from './Model/musicBD';

@Injectable()
export class MusicService {

  pegaBD(): MusicBD[] {
    return Music_Data;

  }

  createMusic(dataCard: any) {
    const newMusic = { id: Date.now(), ...dataCard }
    Music_Data.push(newMusic);
    return newMusic;
  }

  deletaMusic(id: number) {
    const index = Music_Data.findIndex((c) => c.id === id)

    if (!index) {
      throw new NotFoundException('Error: 404');
    }

    const deleted = Music_Data.splice(index, 1);
    return deleted[0]
  }

  atualizaMusic(id: number, bodydata: any) {

    const index = Music_Data.findIndex((c) => c.id === id);

    if (!index) {
      throw new NotFoundException('Error: 404');
    }

    Music_Data[index] = { ...Music_Data[index], ...bodydata }

    return Music_Data[index]
  }

  pegaMusica(id: number) {
    const index = Music_Data.findIndex((c) => c.id === id);

    if (!index) {
      throw new NotFoundException('Error: 404');
    }

    return { audioUrl: Music_Data[index].audioUrl }
  }

}
