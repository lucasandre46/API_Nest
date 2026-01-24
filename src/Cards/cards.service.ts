import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Card } from './Model/card';
import { CreateCardDto } from './DTO/create_cards_dto';


@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async mostraBanco(): Promise<Card[]> {
    return this.prisma.card.findMany();
  }

  async pegaPeloNome(artist: string): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: {
        artist: {
          equals: artist,
          mode: 'insensitive',
        },
      },
    });
  }

  async createCard( createCardDto: CreateCardDto): Promise<Card> {
    return this.prisma.card.create({
      createCardDto,
    });
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id: BigInt(id) },
    });

    if (!card) {
      throw new NotFoundException(`Card com id ${id} não encontrado`);
    }

    return card;
  }

  async atualizaCard(id: number, createCardDto: CreateCardDto): Promise<Card> {
    await this.findOne(id);

    return this.prisma.card.update({
      where: { id: BigInt(id) },
      createCardDto,
    });
  }

  async deletaCard(id: number): Promise<Card> {
    await this.findOne(id);

    return this.prisma.card.delete({
      where: { id: BigInt(id) },
    });
  }

  async compraDisco(id: number, quantia: number): Promise<string> {
    const card = await this.findOne(id);

    if (!card.quantidade || card.quantidade < quantia) {
      throw new BadRequestException(
        'Erro, quantidade em estoque insuficiente!',
      );
    }

    await this.prisma.card.update({
      where: { id: BigInt(id) },
      data: {
        quantidade: card.quantidade - quantia,
      },
    });

    return 'Compra realizada com sucesso';
  }
}
