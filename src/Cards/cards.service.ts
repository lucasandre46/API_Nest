import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
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
    const card = await this.prisma.card.create({
      data: createCardDto,
    });

    return this.serialize(card);
  }





  async atualizaCard(id: number, createCardDto: CreateCardDto) {
    try {
      const card = await this.prisma.card.update({
        where: { id: id },
        data: createCardDto,
      });
      return this.serialize(card);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }
      throw error;
    }
  }

  async deletaCard(id: number) {
    try {
      const card = await this.prisma.card.delete({
        where: { id: id },
      });
      return this.serialize(card);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Card com o ID #${id} não encontrado`);
      }
      throw error;
    }
  }


  async compraDisco(id: number, quantia: number) {
    const existing = await this.prisma.card.findUnique({
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

    const card = await this.prisma.card.update({
      where: { id: id },
      data: {
        quantidade: existing.quantidade - quantia,
      },
    });

    return this.serialize(card);
  }
}
