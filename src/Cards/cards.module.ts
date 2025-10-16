import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}