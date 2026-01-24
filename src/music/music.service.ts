import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicBD, Music_Data } from './Model/musicBD';
import { Music } from './Model/music';
import { PrismaService } from 'src/prisma.service';
import { CreateMusicDto } from './DTO/create_music_dto';


@Injectable()
export class MusicService {

  constructor( private prisma: PrismaService ) { }

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    return this.prisma.music.create({
      data: createMusicDto
    })
  }

  async findAll(): Promise<Music[]> {
    return this.prisma.music.findMany();
  }

  async findOne(id: number): Promise<Music> {

    const music = await this.prisma.music.findUnique({
      
      where: { id },

    });

    if(!music) {
       throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
    }

    return music;
  }

  async update(id: number, createMusicDto: CreateMusicDto): Promise<Music> {

    await this.findOne(id);

    return this.prisma.music.update({
      where: { id },
      data: createMusicDto,
    });

  }

  async remove( id: number): Promise<void> {

    await this.findOne(id);

    await this.prisma.card.delete({
      where: { id },
    });

  }



} 

  // pegaBD(): MusicBD[] {
  //   return Music_Data;

  // }

  // createMusic(dataCard: any) {
  //   const newMusic = { id: Date.now(), ...dataCard }
  //   Music_Data.push(newMusic);
  //   return newMusic;
  // }

  // deletaMusic(id: number) {
  //   const index = Music_Data.findIndex((c) => c.id === id)

  //   if (!index) {
  //     throw new NotFoundException('Error: 404');
  //   }

  //   const deleted = Music_Data.splice(index, 1);
  //   return deleted[0]
  // }

  // atualizaMusic(id: number, bodydata: any) {

  //   const index = Music_Data.findIndex((c) => c.id === id);

  //   if (!index) {
  //     throw new NotFoundException('Error: 404');
  //   }

  //   Music_Data[index] = { ...Music_Data[index], ...bodydata }

  //   return Music_Data[index]
  // }

//   pegaMusica(id: number) {
//     const index = Music_Data.findIndex((c) => c.id === id);

//     if (!index) {
//       throw new NotFoundException('Error: 404');
//     }

//     return { audioUrl: Music_Data[index].audioUrl }
//   }

// }
