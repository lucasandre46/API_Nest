import {
  Controller,
  Param,
  Get,
  NotFoundException,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateCardDto } from './DTO/create_cards_dto';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Get()
  mostraBanco() {
    return this.cardsService.mostraBanco();
  }

  @Get('banda/:name')
  async getByBandName(@Param('name') name: string) {
    const cards = await this.cardsService.pegaPeloNome(name);

    if (cards.length === 0) {
      throw new NotFoundException(
        `Nenhum cartão encontrado para a banda ${name}`,
      );
    }

    return cards;
  }

  @Post()
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createCard(createCardDto);
  }

  @Put(':id')
  atualizaCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.atualizaCard(id, createCardDto);
  }

  @Delete(':id')
  deletaCard(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.deletaCard(id);
  }

  @Put('compra/:id')
  compraDisco(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantia', ParseIntPipe) quantia: number,
  ) {
    return this.cardsService.compraDisco(id, quantia);
  }
}
