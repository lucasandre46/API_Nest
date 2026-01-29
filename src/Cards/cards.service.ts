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
  constructor(private readonly prisma: PrismaService) { }

  private serialize(card: card) {
    return {
      ...card,
      id: card.id.toString(),
    };
  }

  async mostraBanco() {
    const cards = await this.prisma.card.findMany();
    return cards.map(card => this.serialize(card));
  }


  async pegaPeloNome(artist: string) {
    const cards = await this.prisma.card.findMany({
      where: {
        artist: {
          equals: artist,
          mode: 'insensitive',
        },
      },
    });

    return cards.map(card => this.serialize(card));
  }


  async createCard(createCardDto: CreateCardDto) {
    const card = await this.prisma.$transaction(async (tx) => {
      return tx.card.create({
        data: createCardDto,
      });
    });

    return this.serialize(card);
  }


  async findOne(id: number) {
    const card = await this.prisma.card.findUnique({
      where: { id: id },
    });

    if (!card) {
      throw new NotFoundException(`Card com id ${id} não encontrado`);
    }

    return this.serialize(card);
  }


  async atualizaCard(id: number, createCardDto: CreateCardDto) {
    const card = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.card.findUnique({
        where: { id: id },
      });

      if (!existing) {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }

      return tx.card.update({
        where: { id: id },
        data: createCardDto,
      });
    });

    return this.serialize(card);
  }

  async deletaCard(id: number) {
    const card = await this.prisma.card.delete({
      where: { id: id },
    });

    return this.serialize(card);
  }


  async compraDisco(id: number, quantia: number) {
    const card = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.card.findUnique({
        where: { id: id },
      });

      if (!existing) {
        throw new NotFoundException(`Card com id ${id} não encontrado`);
      }

      if (!existing.quantidade || existing.quantidade < quantia) {
        throw new BadRequestException(
          'Erro, quantidade em estoque insuficiente!',
        );
      }

      return tx.card.update({
        where: { id: id },
        data: {
          quantidade: existing.quantidade - quantia,
        },
      });
    });

    return this.serialize(card);
  }
}
