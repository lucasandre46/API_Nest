import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './Cards/cards.module';

@Module({
  imports: [CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
