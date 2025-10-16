import { Controller, Param, Get, NotFoundException, Post, Body, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CardsService } from './cards.service';



@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Get()
  mostraBanco() {
    return this.cardsService.mostraBanco();
  }

  @Get('banda/:name')
  getByBandName(@Param('name') name: string) {

    const cards = this.cardsService.pegaPeloNome(name);

    if (!cards || cards.length === 0) {
      throw new NotFoundException(`Nenhum cartão encontrado para a banda ${name}`);
    }

    return cards;
  }

  @Post()
  createCard(@Body() bodyData: any) {
    return this.cardsService.createCard(bodyData)
  }

  @Delete(':id')
    deletaCard(@Param('id', ParseIntPipe) id : number){
    return this.cardsService.deletaCard(id);
   }

  @Put(':id')
   atualizaCard(
    @Body() bodydata: any,
    @Param( 'id', ParseIntPipe) id : number){
      return this.cardsService.atualizaCard(id, bodydata);
    }

}



// arrumaOrdem(): CardDB[] {
//   return this.cardsService.arrumaOrdem();

//  @Get()
//   mudaBD(): CardDB | undefined {
//     return this.cardsService.mudaBD(1, 'Nova descrição', 'Nova Banda', 2025);
