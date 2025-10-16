import {Card} from './card';

export interface CardDB extends Card {
  id: number;
}

export const ALBUM_DATABASE: CardDB[] = [
  {
    id: 1,
    bandName: 'Os Paralamas do Sucesso',
    album: 'Cinema Mudo',
    year: 1983,
    description:
      'O álbum de estreia que lançou a banda, com os sucessos "Vital e Sua Moto" e "Patrulha Noturna".',
    imageUrl:
      'https://images.coveralia.com/audio/o/Os_Paralamas_Do_Sucesso-Cinema_Mudo-Frontal.jpg',
    buttonText: 'Músicas',
  },
  {
    id: 2,
    bandName: 'Os Paralamas do Sucesso',
    album: 'O Passo do Lui',
    year: 1984,
    description:
      'Considerado um clássico, contém hits como "Me Chama" e "Óculos". Explorou mais o reggae e o pop.',
    imageUrl:
      'https://tse4.mm.bing.net/th/id/OIP.-u70aF7GGeHyKuNn7tkfHgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    buttonText: 'Músicas',
  },
  {
    id: 3,
    bandName: 'Os Paralamas do Sucesso',
    album: 'Selvagem?',
    year: 1986,
    description:
      'Um disco mais engajado e de rock direto, com "Alagados" e o clássico "A Novidade".',
    imageUrl:
      'https://miro.medium.com/v2/resize:fit:1000/1*HQIW1LcGIF4iDjOzFY40Cw.jpeg',
    buttonText: 'Músicas',
  },
  {
    id: 4,
    bandName: 'Raul Seixas',
    album: 'Gita',
    year: 1974,
    description:
      'Álbum emblemático de Raul Seixas com a faixa-título "Gita" e outros clássicos.',
    imageUrl:
      'https://tse3.mm.bing.net/th/id/OIP.lpp_ZNvTbiynwbeBZazU0wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    buttonText: 'Músicas',
  },
  {
    id: 5,
    bandName: 'Black Sabbath',
    album: 'Master of Reality',
    year: 1971,
    description:
      'Terceiro álbum da banda, referência do heavy metal, com clássicos como "Sweet Leaf".',
    imageUrl:
      'https://th.bing.com/th/id/R.4eb7ac6538c9df4f778f0361c4222c70?rik=ymz185ZMBxdrsg&pid=ImgRaw&r=0',
    buttonText: 'Músicas',
  },
  {
    id: 6,
    bandName: 'Megadeth',
    album: 'Rust in Peace',
    year: 1990,
    description:
      'Um dos álbuns mais aclamados do thrash metal, com faixas como "Holy Wars... The Punishment Due".',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71p0e8px-+L._AC_SL1200_.jpg',
    buttonText: 'Músicas',
  },
  {
    id: 7,
    bandName: 'Dio',
    album: 'Holy Diver',
    year: 1983,
    description:
      'Álbum de estreia solo de Dio, com hits como "Holy Diver" e "Rainbow in the Dark".',
    imageUrl:
      'https://th.bing.com/th/id/R.1983e807694afc3f151db0f1e57b78f9?rik=AA3UiOupL%2foVAg&riu=http%3a%2f%2fpm1.aminoapps.com%2f7191%2f4c0f59d4cbf7ce99325fadf44b417a164aa064f3r1-400-400v2_uhq.jpg&ehk=ML2tsvAeOzjOIOInFwvk5RvlWaaOxM%2bdUQj2GqOuYzg%3d&risl=&pid=ImgRaw&r=0',
    buttonText: 'Músicas',
  },
  {
    id: 8,
    bandName: 'Iron Maiden',
    album: 'The Number of the Beast',
    year: 1982,
    description:
      'Quarto álbum da banda, com clássicos como "Run to the Hills" e "Hallowed Be Thy Name".',
    imageUrl:
      'https://tse2.mm.bing.net/th/id/OIP.vdpDZgYW-9QafxPjJsTm_wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    buttonText: 'Músicas',
  },
];