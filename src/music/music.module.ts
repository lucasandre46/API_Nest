import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { Music } from './music';
import { MusicService } from './music.service';

@Module({
  controllers: [MusicController],
  providers: [Music, MusicService]
})
export class MusicModule {}
