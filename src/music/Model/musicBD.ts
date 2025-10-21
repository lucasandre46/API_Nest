import { Music } from "../music";

export type  MusicBD = Music

export const Music_Data: MusicBD[] = [
 {
    id: 1,
    title: 'S.O.S.',
    description: 'Um dos clássicos de Raul Seixas, com crítica social e ritmo marcante.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Raul_Seixas_-_Novo_Aeon.jpg',
    audioUrl: 'https://example.com/audio/sos_raul.mp3',
  },
  {
    id: 2,
    title: 'Ska',
    description: 'Faixa vibrante do álbum *O Passo de Lui*, dos Paralamas do Sucesso.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Os_Paralamas_Do_Sucesso_-_Cinema_Mudo.jpg',
    audioUrl: 'https://example.com/audio/ska_paralamas.mp3',
  },
  {
    id: 3,
    title: 'Romance Ideal',
    description: 'Canção icônica dos Paralamas do Sucesso, misturando pop e ska brasileiro.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Os_Paralamas_Do_Sucesso_-_O_Pass%C3%83%C2%83%C3%82%C2%83%C3%83%C2%82%C3%82%C2%83%C3%83%C2%83%C3%82%C2%82%C3%83%C2%82%C3%82%C2%A1o_Do_Luar.jpg',
    audioUrl: 'https://example.com/audio/romance_ideal_paralamas.mp3',
  },
  {
    id: 4,
    title: 'Vital e Sua Moto',
    description: 'O primeiro grande sucesso dos Paralamas, faixa de estreia do álbum *Cinema Mudo*.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Os_Paralamas_Do_Sucesso_-_Cinema_Mudo.jpg',
    audioUrl: 'https://example.com/audio/vital_e_sua_moto.mp3',
  },
  {
    id: 5,
    title: 'Garoto Maravilhoso',
    description: 'Raul Seixas em uma de suas músicas mais provocantes e bem-humoradas.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/31/Raul_Seixas_-_Gita.jpg',
    audioUrl: 'https://example.com/audio/garoto_maravilhoso.mp3',
  },
];