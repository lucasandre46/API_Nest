import { Controller, Put, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CardDB } from './Model/cardBD';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
   
   }
  


  // arrumaOrdem(): CardDB[] {
  //   return this.appService.arrumaOrdem();

//  @Get()
//   mudaBD(): CardDB | undefined {
//     return this.appService.mudaBD(1, 'Nova descrição', 'Nova Banda', 2025);

// @Get()
// MostraBanco(): CardDB[] {
//   return this.appService.MostraBanco();
// }