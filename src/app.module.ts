
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { MusicFModule } from './musicF/musicF.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [CardsModule, MusicFModule, AuthModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

