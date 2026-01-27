import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCardDto } from './DTO/create_cards_dto';
import { card } from '@prisma/client';


@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async mostraBanco(): Promise<card[]> {
    return this.prisma.card.findMany();
  }

  async pegaPeloNome(artist: string): Promise<card[]> {
    return this.prisma.card.findMany({
      where: {
        artist: {
          equals: artist,
          mode: 'insensitive',
        },
      },
    });
  }

  async createCard( createCardDto : CreateCardDto): Promise<card> {
    return this.prisma.$transaction(async (tx) => {
      return tx.card.create({
        data: createCardDto,
      })
    })
  }

  async findOne(id: number): Promise<card> {
    const card = await this.prisma.card.findUnique({
      where: { id: BigInt(id) },
    });

    if (!card) {
      throw new NotFoundException(`Card com id ${id} não encontrado`);
    }

    return card;
  }

  async atualizaCard(id: number, createCardDto: CreateCardDto): Promise<card> {

    return this.prisma.$transaction(async (tx) => {
      const card = await tx.card.findUnique({ where: { id } })
    

    if (!card) {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }

      return tx.card.update({
        where: { id },
        data: createCardDto,
      })
      })
  }

  async deletaCard(id: number): Promise<card> {
    await this.findOne(id);

    return this.prisma.card.delete({
      where: { id: BigInt(id) },
    });
  }

  async compraDisco(id: number, quantia: number): Promise<card> {
    return this.prisma.$transaction(async (tx) => {

    const card = await tx.card.findUnique({ where: { id } });

    if(!card?.quantidade || card.quantidade < quantia) {
      throw new BadRequestException(
        'Erro, quantidade em estoque insuficiente!',
      );
    }

    return tx.card.update({
      where: { id },
      data: {
        quantidade: card.quantidade - quantia,
      },
    });

   })
}

}