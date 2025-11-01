import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './Cards/cards.module';
import { MusicModule } from './music/music.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CardsModule, MusicModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
