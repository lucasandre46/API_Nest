import { Controller, Param, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';



@Controller('cards')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  mostraBanco() {
    return this.appService.mostraBanco();
  }

  @Get(':id')
  pegaPeloID(@Param('id') id: string){

    let card = this.appService.pegaPeloID(Number(id))

    if(!card){
        throw new NotFoundException(`Cartão ${id} inexistente, não encontrado`);
    }

    return card;
  }
   
   }
  


  // arrumaOrdem(): CardDB[] {
  //   return this.appService.arrumaOrdem();

//  @Get()
//   mudaBD(): CardDB | undefined {
//     return this.appService.mudaBD(1, 'Nova descrição', 'Nova Banda', 2025);
