import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicBD, Music_Data } from './Model/musicBD';
import { music } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateMusicDto } from './DTO/create_music_dto';


@Injectable()
export class MusicService {

  constructor(private prisma: PrismaService) { }

  async create(createMusicDto: CreateMusicDto): Promise<music> {
    return this.prisma.$transaction(async (tx) => {
      return tx.music.create({
        data: createMusicDto,
      });
    });
  }

  async findAll(): Promise<music[]> {
    return this.prisma.music.findMany();
  }

  async findOne(id: number): Promise<music> {

    const music = await this.prisma.music.findUnique({

      where: { id },

    });

    if (!music) {
      throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
    }

    return music;
  }

  async update(id: number, createMusicDto: CreateMusicDto): Promise<music> {
    return this.prisma.$transaction(async (tx) => {
      const music = await tx.music.findUnique({ where: { id } });

      if (!music) {
        throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
      }

      return tx.music.update({
        where: { id },
        data: createMusicDto,
      });
    });

  }

  async remove(id: number): Promise<void> {

    await this.findOne(id);

    await this.prisma.music.delete({
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
