import { Injectable } from '@nestjs/common';
import { ALBUM_DATABASE, CardDB, } from './Model/cardBD';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  
}

//  arrumaOrdem(): CardDB[] {

//   for(let i = 0; i < ALBUM_DATABASE.length -1 ; i++){
//     if(ALBUM_DATABASE[i].year > ALBUM_DATABASE[i + 1].year){

//       let aux = ALBUM_DATABASE[i + 1];

//       ALBUM_DATABASE[i + 1] = ALBUM_DATABASE[i];

//       ALBUM_DATABASE[i] = aux;

//     } 
//   }

//   let card = ALBUM_DATABASE

//   return card


//  }


// mudaBD(id: number, descricao: string, nomebanda: string, years: number): CardDB {
  //     const card = ALBUM_DATABASE[id - 1];
  //     card.description = descricao;
  //     card.bandName = nomebanda;
//     card.year = years;
//     return card;
//   }
  
  
  // filtraBD(id: number): CardDB {
  //   return ALBUM_DATABASE[id];


    // MostraBanco(): CardDB[] {
    // return ALBUM_DATABASE;