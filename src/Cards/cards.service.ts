import { Injectable, NotFoundException } from '@nestjs/common';
import { ALBUM_DATABASE, CardDB, } from './Model/cardBD';
import { findIndex } from 'rxjs';



@Injectable()
export class CardsService {
  getHello(): string {
    return 'Hello World!';
  }

  mostraBanco(): CardDB[]{

    return ALBUM_DATABASE;

  }

  pegaPeloNome(name: string): CardDB[] {

    return ALBUM_DATABASE.filter(
      (c) => c.bandName.toLowerCase() === name.toLowerCase()
    );


  }

  createCard(dataCard : any){
  const newCard = { id: Date.now(), ...dataCard };
  ALBUM_DATABASE.push(newCard);
  return newCard;
  }

  deletaCard(id: number){
    
    const index = ALBUM_DATABASE.findIndex((c) => c.id === id);

    const deleted = ALBUM_DATABASE.splice(index, 1);

    return deleted[0]
  }

  atualizaCard(id : number, bodydata : any){
    
      const index = ALBUM_DATABASE.findIndex((c) => c.id === id);

      ALBUM_DATABASE[index] = { ...ALBUM_DATABASE[index], ...bodydata};

      return ALBUM_DATABASE[index];
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